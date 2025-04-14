import { ms2sec } from '@core/global/utils/time.utils';

export const ACCESS_TOKEN_TTL = '1y';
export const ACCESS_TOKEN_TTL_SEC = ms2sec(ACCESS_TOKEN_TTL);

export const ACCESS_TOKEN_TYPE = 'Bearer';
export const ACCESS_TOKEN_PREFIX = `${ACCESS_TOKEN_TYPE} `;
export const ACCESS_TOKEN_SUBJECT = 'AccessToken';
export const ACCESS_TOKEN_BLACK_CACHE_KEY = 'AccessToken:BlackList';
export const REMOVED_USER_CACHE_KEY = 'Removed:User:Id';

export const REFRESH_TOKEN_TTL = '180d';
export const REFRESH_TOKEN_TTL_SEC = ms2sec(REFRESH_TOKEN_TTL);
export const REFRESH_TOKEN_SUBJECT = 'RefreshToken';
export const REFRESH_TOKEN_SAVE_KEY = 'RefreshToken';
