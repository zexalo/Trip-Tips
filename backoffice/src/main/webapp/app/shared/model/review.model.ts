import dayjs from 'dayjs';
import { IUser } from 'app/shared/model/user.model';
import { IRecommendation } from 'app/shared/model/recommendation.model';
import { IPicture } from 'app/shared/model/picture.model';

export interface IReview {
  id?: number;
  rating?: number;
  content?: string | null;
  createdAt?: string;
  user?: IUser;
  recommendation?: IRecommendation;
  picture?: IPicture | null;
}

export const defaultValue: Readonly<IReview> = {};
