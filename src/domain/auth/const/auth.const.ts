import { ms2sec } from 'src/global/utils/time.utils';

export const ACCESS_TOKEN_TTL = '180d';
export const ACCESS_TOKEN_TTL_SEC = ms2sec(ACCESS_TOKEN_TTL);

export const ACCESS_TOKEN_TYPE = 'Bearer';
export const ACCESS_TOKEN_PREFIX = `${ACCESS_TOKEN_TYPE} `;
export const ACCESS_TOKEN_SUBJECT = 'AccessToken';

export const REFRESH_TOKEN_TTL = '365d';
export const REFRESH_TOKEN_TTL_SEC = ms2sec(REFRESH_TOKEN_TTL);
