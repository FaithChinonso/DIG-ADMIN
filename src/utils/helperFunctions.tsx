export const isNotEmpty = (value: string) => value?.trim() !== "";
export const isNotEmptyNumber = (value: number) => value > 0;
export const isEmail = (value: any) =>
  /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value);
