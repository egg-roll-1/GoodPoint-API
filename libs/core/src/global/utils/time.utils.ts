import ms from 'ms';

export const delay = (ms: number) => {
  return new Promise((r) => setTimeout(r, ms));
};

export const ms2sec = (time: string) => {
  return ms(time) / 1000;
};

export const ms2min = (time: string) => {
  return ms2sec(time) / 60;
};
