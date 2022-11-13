import { HomeRepository } from './home.repository';
import { Home, HomeBasic, Review } from '../home.model';
import { getHomeContext, getListContext } from '../home.context';


export const dbRepository: HomeRepository = {
  getHome: async (id: string) => {
    return await getHomeContext().findOne(
      { _id: id }
    );

  },
  getHomeList: async (country?: string, page?: number, pageSize?: number) => {
    const skip = Boolean(page) ? (page - 1) * pageSize : 0;
    const limit = pageSize ?? 0;
    let returnDb;
    country
      ? returnDb = getListContext().find({ 'address.country': country })
      : returnDb = getListContext().find();
    return await returnDb.skip(skip).limit(limit).toArray();
  },
  updateHome: async (id: string, updatedHome: Home) => {
    return Boolean(await getHomeContext().updateOne(
      { '_id': id },
      {
        $set: {
          name: updatedHome.name,
          description: updatedHome.description,
          address: {
            street: updatedHome.address.street,
            country: updatedHome.address.country
          },
          images: {
            picture_url: updatedHome.images.picture_url
          },
          bedrooms: updatedHome.bedrooms,
          beds: updatedHome.beds,
          bathrooms: updatedHome.bathrooms,
        }
      },
      { upsert: false }
    ));
  },
  addReview: async (id: string, review: Review) => {
    const { } = await getHomeContext().findOneAndUpdate(
      { '_id': id },
      { $push: { reviews: { ...review, date: new Date() } } }
    );
    return review;
  },
};
