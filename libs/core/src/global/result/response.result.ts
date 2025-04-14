/**
 * 응답 형식 정의
 */
export interface EGResponse<T = any> {
  code: string;
  message: string | string[];
  result: T | null;
}
