import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);
dayjs.extend(timezone);

export const KSTDate = (date?: dayjs.ConfigType) =>
  dayjs(date).tz('Asia/Seoul');
