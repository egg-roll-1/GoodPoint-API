import { Agency } from '@core/domain/agency/entity/agency.entity';
import { AgencyRepository } from '@core/domain/agency/repository/agency.repository';
import { DayOfWeek } from '@core/domain/enum/day.enum';
import { Manager } from '@core/domain/manager/entity/manager.entity';
import { ManagerRepository } from '@core/domain/manager/repository/manager.repository';
import { Tag } from '@core/domain/tag/entity/tag.entity';
import { TagRepository } from '@core/domain/tag/repository/tag.repository';
import { VolunteerTag } from '@core/domain/volunteer-work/entity/volunteer-tag.entity';
import { VolunteerWork } from '@core/domain/volunteer-work/entity/volunteer-work.entity';
import { VolunteerTagRepository } from '@core/domain/volunteer-work/repository/volunteer-tag.repository';
import { VolunteerWorkRepository } from '@core/domain/volunteer-work/repository/volunteer-work.repository';
import {
  generateNChars,
  generateNDigitRandomInt,
} from '@core/global/utils/string';
import { delay } from '@core/global/utils/time.utils';
import { fakerKO as faker } from '@faker-js/faker';
import { Injectable, OnModuleInit } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import * as cheerio from 'cheerio';
import { readdir, readFile, writeFile } from 'fs/promises';
import { uniqBy } from 'lodash';
import qs from 'qs';
import { MyTest } from '../../common/decorator/test.decorator';

interface Item {
  id: string;
  title: string;
  tag: '시간인증,오프라인,생활편의';
  recruitDate: [string, string];
  workDate: [string, string];
  workTime: ['11:30', '13:30'];
  nationAgency: string;
  agency: string;
  maxHour: number;
  dayOfWeek: DayOfWeek[];
  targetType: '성인';
  place: string;
  notice: string;
  latitude: string;
  longitude: string;
  address: string;
}

@Injectable()
export class v1365Test implements OnModuleInit {
  private readonly client: AxiosInstance;

  constructor(
    private readonly managerRepository: ManagerRepository,
    private readonly agencyRepository: AgencyRepository,
    private readonly volunteerWorkRepository: VolunteerWorkRepository,
    private readonly volunteerTagRepository: VolunteerTagRepository,
    private readonly tagRepository: TagRepository,
  ) {
    this.client = axios.create();
  }

  async onModuleInit() {
    await delay(500);
    // await this.목록데이터가져오기();
    // await this.상세데이터가져오기();
    // await this.데이터합치기();

    // await this.봉사기관DB채우기();
    // await this.봉사활동DB채우기();
  }

  @MyTest()
  private async 봉사활동DB채우기() {
    const buffer = await readFile('1365.json');
    const itemList = JSON.parse(buffer.toString()) as Item[];

    const agencyList = await this.agencyRepository.find({
      relations: {
        managerList: true,
      },
    });

    const existTagList = await this.tagRepository.find();
    const tagMap = Object.fromEntries(existTagList.map((x) => [x.title, x]));

    const agencyMap = Object.fromEntries(agencyList.map((x) => [x.title, x]));

    for (const item of itemList) {
      const [startDate, endDate] = (item.workDate ?? []).map((x) =>
        x ? new Date(x) : undefined,
      );

      const [startTime, endTime] = item.workTime ?? [];

      const time2min = (time: string) => {
        const [hour, minute] = time.split(':').map(Number);
        return hour * 60 + minute;
      };

      const [recruitStartDate, recruitEndDate] = (item.recruitDate ?? []).map(
        (x) => (x ? new Date(x) : undefined),
      );

      const volunteerWork = await this.volunteerWorkRepository.save(
        VolunteerWork.createOne({
          title: item.title,
          notice: item.notice,
          startDate: startDate,
          endDate: endDate,
          startMinute: time2min(startTime),
          endMinute: time2min(endTime),
          recruitStartDate: recruitStartDate,
          recruitEndDate: recruitEndDate,
          latitude: item.latitude || undefined,
          longitude: item.longitude || undefined,
          workPlace: item.place,
          workAddress: item.address,
          dayOfWeek: item.dayOfWeek as unknown as DayOfWeek[],
          agencyId: agencyMap[item.agency].id,
          recruitPeopleCount: Number(generateNDigitRandomInt(2)),
        }),
      );

      const tagList = item.tag.split(',') ?? [];
      for (const title of tagList) {
        let tag = tagMap[title];
        if (!tag) {
          tagMap[title] = await this.tagRepository.save(
            Tag.create({ title: title }),
          );

          tag = tagMap[title];
        }

        await this.volunteerTagRepository.save(
          VolunteerTag.create({
            volunteerWorkId: volunteerWork.id,
            tagId: tag.id,
          }),
        );
      }
    }
  }

  @MyTest()
  private async 봉사기관DB채우기() {
    const buffer = await readFile('1365.json');
    const itemList = JSON.parse(buffer.toString()) as Item[];

    const agencyUniqueList = uniqBy(itemList, (item) => item.agency);
    for (const [i, agencyItem] of agencyUniqueList.entries()) {
      const agency = await this.agencyRepository.save(
        Agency.createOne({
          title: agencyItem.agency,
          nationAgency: agencyItem.nationAgency,
        }),
      );

      const manager = await this.managerRepository.save(
        Manager.create({
          name: faker.person.fullName({
            sex: ['male', 'female'][i % 2] as 'male' | 'female',
          }),
          phoneNumber: `010${generateNDigitRandomInt(8)}`,
          password: generateNChars(10),
          agencyId: agency.id,
        }),
      );

      await this.agencyRepository.update(agency.id, {
        ownerManagerId: manager.id,
      });
    }
  }

  @MyTest()
  private async 데이터합치기() {
    const dirname = '1365';
    const fileList = await readdir(dirname);
    const result = [];

    for (const filename of fileList) {
      const buffer = await readFile(`${dirname}/${filename}`);
      const itemList = JSON.parse(buffer.toString());

      result.push(...itemList);
    }

    await writeFile('1365.json', JSON.stringify(result));
  }

  @MyTest()
  private async 상세데이터가져오기() {
    const fileList = [...new Array(817).keys()]
      .map((x) => x + 1)
      .map((x) => `1365/1365_${x}.json`);

    console.log('file list: ', fileList.length);
    const REGEX = /[^가-힣A-z ,|~0-9-:()]*/g;
    const dayOfWeekMap = {
      일: DayOfWeek.Sun,
      월: DayOfWeek.Mon,
      화: DayOfWeek.Tue,
      수: DayOfWeek.Wed,
      목: DayOfWeek.Thu,
      금: DayOfWeek.Fri,
      토: DayOfWeek.Sat,
    };

    for (const filename of fileList.slice(542)) {
      const buffer = await readFile(filename);
      const itemList = JSON.parse(buffer.toString());

      console.log('cur: ', filename);

      const result = [];
      for (const item of itemList) {
        const detail = await this.fetchVolunteerDetail(item.id);
        await delay(100);

        const $ = cheerio.load(detail);
        const dayOfWeek = $(
          '#contents .board_view .board_data .group:nth-child(2) dl:nth-child(2)',
        )
          .text()
          .replace(REGEX, '')
          .replace('활동요일', '')
          .split(',')
          .map((x) => x.trim())
          .map((x) => dayOfWeekMap[x]);

        const targetType = $(
          '#contents .board_view .board_data .group:nth-child(4) dl:nth-child(2)',
        )
          .text()
          .replace(REGEX, '')
          .replace('봉사자유형', '')
          .trim();

        const place = $(
          '#contents .board_view .board_data .group:nth-child(6) dl:nth-child(1)',
        )
          .text()
          .replace(REGEX, '')
          .replace('봉사장소', '')
          .trim();

        const notice = $('#contents .board_view .board_body pre')
          .text()
          .replace(/[^가-힣A-z ,|~0-9-:()\r\n]*/g, '')
          .trim();

        let location = $('#contents .board_view .board_body #lalo1').val();

        if (location instanceof Array) {
          location = location[0];
        }

        location = location?.split(',') ?? [];
        const [latitude, longitude] = location;

        const address = (
          $('#contents .board_view .board_body a').text().split(':')?.[1] ?? ''
        )
          .replace(REGEX, '')
          .trim();

        result.push({
          ...item,
          dayOfWeek,
          targetType,
          place,
          notice,
          latitude,
          longitude,
          address,
        });
      }

      await writeFile(filename, JSON.stringify(result));
      console.log(result);
    }
  }

  @MyTest()
  private async 목록데이터가져오기() {
    for (let i = 1; i < 2000; i++) {
      try {
        const epoch = await this.fetchVolunteerList(i);
        await writeFile(`1365_${i}.json`, JSON.stringify(epoch));
        await delay(500);
        console.log('done: ', i);
      } catch {
        console.error('error: ', i);
      }
    }
  }

  private async fetchVolunteerDetail(id: string) {
    const body = (page: number = 1) => ({
      jsonUrl: '/vols/P9210/mber/volsMberJson.do',
      cPage: page,
      searchFlag: 'search',
      requstSe: '',
      reqConfirm: '',
      firstSearch: 'N',
      hopea1: '',
      hopea2: '',
      flag: 'A01',
      listType: '',
      searchRcognSrvcTime: '',
      titleNm: '상세보기',
      searchHopeArea1: '',
      searchHopeArea2: '',
      searchHopeSrvc1: '',
      searchActOnline: '',
      searchSrvcTarget: '',
      searchSrvcStts: 0,
      searchProgrmBgnde: '2025-05-01',
      searchProgrmEndde: '2025-08-01',
      adultPosblAt: 'Y',
      yngbgsPosblAt: 'Y',
      searchRequstSe: 'on',
      searchWeek: 0,
      searchKeyword: '',
      searchNanmmbyNm: '',
    });

    const { data } = await this.client.post(
      `https://www.1365.go.kr/vols/1572247904127/partcptn/timeCptn.do?type=show&progrmRegistNo=${id}`,
      qs.stringify(body()),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Referer:
            'https://www.1365.go.kr/vols/1572247904127/partcptn/timeCptn.do',
          'User-Agent':
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36',
        },
      },
    );

    // const $ = cheerio.load(data);
    // const result = [];

    return data;
  }

  private async fetchVolunteerList(page: number) {
    const body = (page: number = 1) => ({
      cPage: page,
      searchFlag: 'search',
      requstSe: '',
      reqConfirm: '',
      firstSearch: '',
      hopea1: '',
      hopea2: '',
      flag: 'A01',
      listType: '',
      searchRcognSrvcTime: '',
      titleNm: '',
      searchHopeArea1: '',
      searchHopeArea2: '',
      searchHopeSrvc1: '',
      searchActOnline: '',
      searchSrvcTarget: '',
      searchSrvcStts: 0,
      searchProgrmBgnde: '2025-05-01',
      searchProgrmEndde: '2025-08-01',
      adultPosblAt: 'Y',
      yngbgsPosblAt: 'Y',
      searchRequstSe: 'on',
      searchWeek: 0,
      searchKeyword: '',
      searchNanmmbyNm: '',
    });

    const { data } = await this.client.post(
      `https://www.1365.go.kr/vols/1572247904127/partcptn/timeCptn.do`,
      qs.stringify(body(page)),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Referer:
            'https://www.1365.go.kr/vols/1572247904127/partcptn/timeCptn.do',
          'User-Agent':
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36',
        },
      },
    );

    const $ = cheerio.load(data);
    const result = [];

    $('.board_list > ul li .list').each((i, el) => {
      const $el = cheerio.load(el);
      const REGEX = /[^가-힣A-z ,|~0-9-:]*/g;
      const id = el.attribs['href'].replace(/[^0-9]/g, '');

      const tag = $el('.tag_g')
        .text()
        .replace(REGEX, '')
        .split('|')
        .map((x) => x.trim())
        .join(',');

      const title = $el('.tit_board_list').text().replace(REGEX, '');
      const recruitDate = $el('.board_data dl:nth-child(1)')
        .text()
        .replace(REGEX, '')
        .split('~')
        .map((x) => x.replace(/[^0-9-]/g, ''));

      const workDate = $el('.board_data  dl:nth-child(2)')
        .text()
        .replace(REGEX, '')
        .split('~')
        .map((x) => x.replace(/[^0-9-]/g, ''));

      const workTime = $el('.board_data  dl:nth-child(3)')
        .text()
        .replace(REGEX, '')
        .split('~')
        .map((x) => x.replace(/[^0-9:]/g, ''));

      const nationAgency =
        $el('.board_data dl:nth-child(4)')
          .text()
          .replace(REGEX, '')
          .split(']')?.[1] ?? '';

      const agency =
        $el('.board_data dl:nth-child(5)')
          .text()
          .replace(REGEX, '')
          .split(']')?.[1] ?? '';

      const maxHour = Number(
        (
          $el('.board_data dl:nth-child(6)')
            .text()
            .replace(REGEX, '')
            .split(']')?.[1] ?? ''
        ).replace(/[^0-9]/g, ''),
      );

      const item = {
        id,
        title,
        tag,
        recruitDate,
        workDate,
        workTime,
        nationAgency,
        agency,
        maxHour,
      };

      result.push(item);
    });

    return result;
  }
}
