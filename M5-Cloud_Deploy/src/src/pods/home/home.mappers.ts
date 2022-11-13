import * as model from 'dals';
import * as apiModel from './home.api-model';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { GetObjectCommand } from '@aws-sdk/client-s3';
import { s3Client } from 'core/clients';
import { envConstants } from 'core/constants';


const mapImage = async (avatar: string): Promise<string> => {
  const command = new GetObjectCommand({
    Bucket: envConstants.AWS_S3_BUCKET,
    Key: avatar,
  });
  const expiresIn = 60 * 60 * 24; // 1 day expiration time.
  return await getSignedUrl(s3Client, command, { expiresIn });
};

// home mapping (all data)
export const mapHomeFromModelToApi = (home: model.Home): apiModel.Home => (
  {
  id: home._id,
  name: home.name,
  description: home.description,
  address: {
    street: home.address.street,
    country: home.address.country
  },
  images: {
    picture_url: home.images.picture_url
  },
  count: {
    bedrooms: home.bedrooms,
    beds: home.beds,
    bathrooms: home.bathrooms
  },
  reviews: home.reviews,
});

export const mapHomeFromApiToModel = (home: apiModel.Home): model.Home => ({
  _id: home.id,
  name: home.name,
  description: home.description,
  address: {
    street: home.address.street,
    country: home.address.country
  },
  images: {
    picture_url: home.images.picture_url
  },
  bedrooms: home.count.bedrooms,
  beds: home.count.beds,
  bathrooms: home.count.bathrooms,
  reviews: home.reviews,
});

// Review mapping
export const mapReviewFromApiToModel = (home: apiModel.Review): model.Review => ({
  date: home.date,
  reviewer_name: home.reviewer_name,
  comments: home.comments,
});

export const mapReviewFromModeltoApi = (home: model.Review): apiModel.Review => ({
  date: home.date,
  reviewer_name: home.reviewer_name,
  comments: home.comments,
});

// Each home in List Mapping (Data simplified)
export const mapHomeInListFromApiToModel = (home: apiModel.HomeBasic): model.HomeBasic => ({
  _id: home.id,
  name: home.name,
  images: {
    picture_url: home.images.picture_url
  }
});

export const mapHomeInListFromModelToApi = (home: model.HomeBasic): apiModel.HomeBasic => ({
  id: home._id,
  name: home.name,
  images: {
    picture_url: home.images.picture_url
  }
});

// homeList mapping From Model To Api
export const mapHomeListFromModelToApi = (homeList: model.HomeBasic[]): apiModel.HomeBasic[] =>
  Array.isArray(homeList) ? homeList.map(mapHomeInListFromModelToApi) : [];