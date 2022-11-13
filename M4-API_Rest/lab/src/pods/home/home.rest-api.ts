import { Router } from 'express';
import { homeRepository } from 'dals';
import jwt from 'jsonwebtoken';
import {
  mapHomeListFromModelToApi,
  mapHomeFromModelToApi,
  mapReviewFromApiToModel,
  mapReviewFromModeltoApi,
  mapHomeFromApiToModel
} from './home.mappers';
import { authenticationMiddleware, authorizationMiddleware } from 'pods/security'

export const listApi = Router();
export const houseApi = Router();

listApi
  // Display all places. If country is given, it wil short it out. Sames happens with page & pageSize
  .get('/:country?', async (req, res, next) => {
    try {
      const { country } = req.params;
      const page = Number(req.query.page);
      const pageSize = Number(req.query.pageSize);
      const home = await homeRepository.getHomeList(country, page, pageSize);
      home.length == 0
        ? res.send('No houses found in that country!')
        : res.send(mapHomeListFromModelToApi(home));
    } catch (error) {
      next(error);
    }
  })


houseApi
  // Display all details
  .get('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const home = await homeRepository.getHome(id);
      home
        ? res.send(mapHomeFromModelToApi(home))
        : res.send('Ups! Seems like we could not find that house!');
    } catch (error) {
      next(error);
    }
  })
  // Post a new review
  .post('/:id', authenticationMiddleware, async (req, res, next) => {
    try {
      const { id } = req.params;
      const review = mapReviewFromApiToModel(req.body);
      let newReview = await homeRepository.addReview(id, review);
      res.status(201).send(mapReviewFromModeltoApi(newReview));
    } catch (error) {
      next(error);
    }
  })
  // Update home's data
  .patch('/:id', authorizationMiddleware(['admin']), async (req, res, next) => {
  // .patch('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const newValue = mapHomeFromApiToModel(req.body);
      let response = await homeRepository.updateHome(id, newValue);
      response ? res.sendStatus(202) : res.sendStatus(304);
    } catch (error) {
      next(error);
    }
  })