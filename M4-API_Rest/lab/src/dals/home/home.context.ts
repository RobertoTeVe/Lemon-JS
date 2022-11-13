import { db } from 'core/servers';
import { HomeBasic, Home, Review } from './home.model';

export const getListContext = () => db.collection<HomeBasic>('listingsAndReviews');
export const getHomeContext = () => db.collection<Home>('listingsAndReviews');
export const getReviewContext = () => db.collection<Review>('listingsAndReviews');