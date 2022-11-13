import { User } from './user/user.model';

export interface DB {
  users: User[];
}

export const db: DB = {
  users: [
    {
      _id: '412114',
      email: 'admin@email.com',
      password: 'admin',
      salt: '',
      role: 'admin'
    },
    {
      _id: '241512',
      email: 'user1@email.com',
      password: 'user1',
      salt: '',
      role: 'standard'
    },
    {
      _id: '152362',
      email: 'user2@email.com',
      password: 'user2',
      salt: '',
      role: 'standard'
    },
  ]

}

