import { ObjectId } from 'mongodb';
import { HomeRepository } from './home.repository';
import { Home, HomeBasic, Review } from '../home.model';
import { db } from '../../mock-data';

const insertHome = (home: Home) => {
  const _id = '12'
  const newHome: Home = {
    ...home,
    _id,
  };

  db.homes = [...db.homes, newHome];
  return newHome;
};

const updateHome = (home: Home) => {
  db.homes = db.homes.map((b) => (b._id.toString() === home._id.toString() ? { ...b, ...home } : b));
  return home;
};

const paginatedCountryList = (
  homeList: Home[],
  country: string
): HomeBasic[] => {
  let HomeList: any = [...homeList];
  let paginatedHouseList = (country ? HomeList.filter((b) => b.address.country === country) : [...homeList]);
  return paginatedHouseList;
};

const addReviewToHouse = (id: string, review: Review) => {
  const emptyReview: Review = { date: new Date(), reviewer_name: "", comments: "" }
  const homeID = db.homes.findIndex((b) => b._id.toString() === id)
  if (homeID != -1) {
    db.homes[homeID].reviews.push(review);
    return review;
  } else {
    return emptyReview;
  }
};

export const mockRepository: HomeRepository = {
  getHome: async (id: string) => db.homes.find((b) => b._id.toString() === id),
  getHomeList: async (country?: string, page?: number, pageSize?: number) =>
    paginatedCountryList(db.homes, country),
  addReview: async (id: string, review: Review) => addReviewToHouse(id, review),
  updateHome: async (id, updatedHome) => Boolean(updateHome(updatedHome)),
};
