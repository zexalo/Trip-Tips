export interface ICountry {
  id?: number;
  currency?: string;
  name?: string;
  description?: string | null;
}

export const defaultValue: Readonly<ICountry> = {};
