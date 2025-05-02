export const generateNChars = (length: number) => {
  let result = '';
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
};

/**
 * 맨 앞자리가 0이 아닌, 랜덤한 자릿수를 생성한다.
 * @param n 생성하고 싶은 자릿수. 기본값 = 6
 * @returns
 */
export function generateNDigitRandomInt(n: number = 6) {
  const digit = Math.pow(10, n);
  const prefix = Math.floor(Math.random() * 9) + 1;
  const body = (Math.floor(Math.random() * digit) + digit)
    .toString()
    .substring(2);
  return `${prefix}${body}`;
}
