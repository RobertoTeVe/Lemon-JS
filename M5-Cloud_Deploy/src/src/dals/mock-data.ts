import { Home } from './home';
import { ObjectId } from 'mongodb';
import { User } from './user/user.model';

export interface DB {
  users: User[];
  homes: Home[];
}

export const db: DB = {
  users: [
    {
      _id: '412114',
      email: 'jefaza@email.com',
      password: 'jefaza',
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
  ],
  homes: [
    {
      _id: '12512521',
      name: 'Casa No medio do monte',
      description: 'E unha casa que esta no medio do monte',
      address: {
        street: 'Rua sen nome, numero un',
        country: 'Spain'
      },
      images: {
        picture_url: 'casa-gallega.jpg'
      },
      bedrooms: 2,
      beds: 4,
      bathrooms: 1,
      reviews: [
        {
          date: new Date('2016-01-03T05:00:00.000+00:00'),
          reviewer_name: 'pepe',
          comments: 'Buena atencion y muy comoda!'
        },
        {
          date: new Date('2016-01-03T05:00:00.000+00:00'),
          reviewer_name: 'Alex',
          comments: 'We could not sleep because of the noise...'
        },
      ]
    },
    {
      _id: '12315',
      name: 'Loft in the city center with beautiful views',
      description: 'Awesome modern chick loft right in the heart of the city.',
      address: {
        street: 'Beautiful Street, 2131',
        country: 'EEUU'
      },
      images: {
        picture_url: 'american-house.jpg'
      },
      bedrooms: 2,
      beds: 4,
      bathrooms: 1,
      reviews: [
        {
          date: new Date('2016-01-03T05:00:00.000+00:00'),
          reviewer_name: 'Alex',
          comments: 'We could not sleep because of the noise...'
        },
      ]
    },
    {
      _id: '132315',
      name: 'Kleines Haus',
      description: 'Viele Forst zusammen',
      address: {
        street: 'Pferd Strasse, 2',
        country: 'Germany'
      },
      images: {
        picture_url: 'deutsches-haus.jpg'
      },
      bedrooms: 2,
      beds: 4,
      bathrooms: 1,
      reviews: [
        {
          date: new Date('2016-01-03T05:00:00.000+00:00'),
          reviewer_name: 'pepe',
          comments: 'Buena atencion y muy comoda!'
        },
      ]
    }, {
      _id: '122315',
      name: 'Habitacion Compartida en Madrid Centro',
      description: 'Cama y mesa no muy comodas, sin ventana',
      address: {
        street: 'C/ La Espanhola, 13124',
        country: 'Spain'
      },
      images: {
        picture_url: 'casa-gallega.jpg'
      },
      bedrooms: 2,
      beds: 4,
      bathrooms: 1,
      reviews: [
        {
          date: new Date('2016-01-03T05:00:00.000+00:00'),
          reviewer_name: 'pepe',
          comments: 'Buena atencion y muy comoda!'
        },
      ]
    },
    {
      _id: '123145',
      name: 'Loft in the city center with beautiful views',
      description: 'Awesome modern chick loft right in the middle of the city.',
      address: {
        street: 'Awesome Shiny Street, 14251',
        country: 'EEUU'
      },
      images: {
        picture_url: 'american-house.jpg'
      },
      bedrooms: 2,
      beds: 4,
      bathrooms: 1,
      reviews: [
        {
          date: new Date('2016-01-03T05:00:00.000+00:00'),
          reviewer_name: 'Alex',
          comments: 'We could not sleep because of the noise...'
        },
      ]
    },
    {
      _id: '123115',
      name: 'Gross Haus im altstadt',
      description: 'Viele Fenster und hohe Decken',
      address: {
        street: 'Altstadt, 5',
        country: 'Germany'
      },
      images: {
        picture_url: 'deutsches-haus.jpg'
      },
      bedrooms: 2,
      beds: 4,
      bathrooms: 1,
      reviews: [
        {
          date: new Date('2016-01-03T05:00:00.000+00:00'),
          reviewer_name: 'Andreas',
          comments: 'Eine Scheisse!'
        },
      ]
    },
  ]
}

