// ANSI 텍스트 색상 코드 Enum
export enum TextColor {
  Black = 30,
  Red = 31,
  Green = 32,
  Yellow = 33,
  Blue = 34,
  Magenta = 35,
  Cyan = 36,
  White = 37,
}

// ANSI 배경 색상 코드 Enum
export enum BackgroundColor {
  Black = 40,
  Red = 41,
  Green = 42,
  Yellow = 43,
  Blue = 44,
  Magenta = 45,
  Cyan = 46,
  White = 47,
}

// 텍스트와 배경 색상을 설정하는 함수
export const coloredText = (
  text: string,
  textColor: TextColor = TextColor.White,
  bgColor: BackgroundColor = BackgroundColor.Black,
): string => {
  const reset = '\x1b[0m'; // 색상 리셋 코드
  return `\x1b[${bgColor}m\x1b[${textColor}m${text}${reset}`;
};
