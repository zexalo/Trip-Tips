import { ICategory } from 'app/shared/model/category.model';
import { ICountry } from 'app/shared/model/country.model';
import { IPicture } from 'app/shared/model/picture.model';

export interface IRecommendation {
  id?: number;
  title?: string;
  content?: string | null;
  price?: number | null;
  city?: string | null;
  globalRating?: number | null;
  category?: ICategory;
  country?: ICountry;
  picture?: IPicture | null;
}

export const defaultValue: Readonly<IRecommendation> = {};
