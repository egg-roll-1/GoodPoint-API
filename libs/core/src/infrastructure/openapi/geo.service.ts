import { OPEN_API_KEY } from '@core/global/config/const.config';
import { AsyncTimeLogger } from '@core/global/decorator/time.decorator';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

export interface Response {
  response: {
    service: {
      name: 'address';
      version: '2.0';
      operation: 'getCoord';
      time: '19(ms)';
    };
    status: 'OK';
    input: { type: 'PARCEL'; address: string };
    result: {
      crs: 'EPSG:4326';
      point: { x: string; y: string };
    };
  };
}

@Injectable()
export class GeoService {
  private readonly OPEN_API_KEY: string;

  constructor(private readonly configService: ConfigService) {
    this.OPEN_API_KEY = this.configService.get(OPEN_API_KEY);
  }

  @AsyncTimeLogger()
  public async addressToCoord(address: string) {
    const result = {
      latitude: '',
      longitude: '',
    };

    if (!address) {
      return result;
    }

    const TYPE_LIST = ['PARCEL', 'ROAD'];

    try {
      for (const type of TYPE_LIST) {
        const { data } = await axios.get<Response>(
          `https://api.vworld.kr/req/address`,
          {
            params: {
              service: 'address',
              request: 'getCoord',
              key: this.OPEN_API_KEY,
              address,
              type: type,
              refine: false,
            },
          },
        );

        const point = data?.response?.result?.point;
        if (point) {
          result.longitude = point.x;
          result.latitude = point.y;

          return result;
        }
      }

      return result;
    } catch {
      return result;
    }
  }
}
