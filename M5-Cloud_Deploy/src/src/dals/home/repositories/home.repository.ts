import { ObjectId } from 'mongodb';
import { Home, HomeBasic, Review } from '../home.model';

export interface HomeRepository {
  getHome: (id: string) => Promise<Home>;
  getHomeList: (country?: string, page?: number, pageSize?: number) => Promise<HomeBasic[]>;
  addReview: (id: string, review: Review) => Promise<Review>;
  updateHome: (id: string, updatedHome: Home) => Promise<Boolean>;
}
