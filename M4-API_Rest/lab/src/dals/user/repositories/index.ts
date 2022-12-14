import { dbRepository } from './user.db-repository';
import { mockRepository } from './user.mock-repository';
import { envConstants } from 'core/constants';

export const userRepository = envConstants.isApiMock
    ? mockRepository
    : dbRepository;