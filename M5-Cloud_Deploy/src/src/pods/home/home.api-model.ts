
// House's Review Interface
export interface Review {
  date: Date,
  reviewer_name: string,
  comments: string
}

// Interface with all the data
export interface Home {
  id: string,
  name: string,
  description: string,
  address:{
    street: string,
    country: string
  },
  images: {
    picture_url: string
  },
  count: {
    bedrooms: number,
    beds: number,
    bathrooms: number
  },
  reviews: Review[],
}

// Interface only for listing
export interface HomeBasic {
  id: string,
  name: string,
  images: {
    picture_url: string
  },
}
