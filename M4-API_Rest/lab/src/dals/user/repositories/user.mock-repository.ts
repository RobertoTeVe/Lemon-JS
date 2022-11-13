import { UserRepository } from './user.repository';
import { db } from '../../mock-data';

export const mockRepository: UserRepository = {
    getUserByEmailAndPassword: async (email: string, password: string) => {
        return db.users
            .find(user => user.email === email && user.password === password);
    }
};