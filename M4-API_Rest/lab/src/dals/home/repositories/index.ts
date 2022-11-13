import { mockRepository } from './home.mock-repository';
import { dbRepository } from './home.db-repository';
import { envConstants } from 'core/constants';

export const homeRepository = envConstants.isApiMock
  ? mockRepository
  : dbRepository;
