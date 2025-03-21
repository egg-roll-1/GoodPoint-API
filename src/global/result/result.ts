export interface EGResponse<T = any> {
  code: string;
  message: string | string[];
  result: T | null;
}
