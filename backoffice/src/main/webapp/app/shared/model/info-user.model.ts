import { IUser } from 'app/shared/model/user.model';
import { IRecommendation } from 'app/shared/model/recommendation.model';

export interface IInfoUser {
  id?: number;
  user?: IUser;
  recommendations?: IRecommendation[] | null;
}

export const defaultValue: Readonly<IInfoUser> = {};
