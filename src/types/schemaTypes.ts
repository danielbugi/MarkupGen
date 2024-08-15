import { z } from 'zod';

export type SchemaType =
  | 'LocalBusiness'
  | 'Restaurant'
  | 'Hotel'
  | 'Product'
  | 'Review'
  | 'Article'
  | 'BlogPosting'
  | 'NewsArticle'
  | 'Recipe'
  | 'Movie'
  | 'Book'
  | 'Event'
  | 'JobPosting'
  | 'Person'
  | 'Organization'
  | 'FAQPage'
  | 'WebSite';

export const schemaTypeDescriptions: Record<SchemaType, string> = {
  LocalBusiness: 'For businesses with a physical location',
  Restaurant: 'For food service establishments',
  Hotel: 'For lodging businesses',
  Product: 'For individual products or services',
  Review: 'For critiques or evaluations of items',
  Article: 'For general articles or reports',
  BlogPosting: 'For blog posts or entries',
  NewsArticle: 'For news articles',
  Recipe: 'For cooking or food preparation instructions',
  Movie: 'For film or motion picture content',
  Book: 'For written works or publications',
  Event: 'For events or happenings',
  JobPosting: 'For job listings or openings',
  Person: 'For information about individuals',
  Organization: 'For details about companies or institutions',
  FAQPage: 'For frequently asked questions pages',
  WebSite: 'For overall website information',
};

export const schemaTypes: SchemaType[] = [
  'LocalBusiness',
  'Restaurant',
  'Hotel',
  'Product',
  'Review',
  'Article',
  'BlogPosting',
  'NewsArticle',
  'Recipe',
  'Movie',
  'Book',
  'Event',
  'JobPosting',
  'Person',
  'Organization',
  'FAQPage',
  'WebSite',
];

export type FieldType =
  | 'text'
  | 'number'
  | 'url'
  | 'array'
  | 'object'
  | 'date'
  | 'datetime-local';

export const schemaTypeCategories = [
  {
    name: 'Business & Organizations',
    types: ['LocalBusiness', 'Restaurant', 'Hotel', 'Organization'],
  },
  {
    name: 'Products & Commerce',
    types: ['Product', 'Review'],
  },
  {
    name: 'Creative Works',
    types: ['Article', 'BlogPosting', 'NewsArticle', 'Book', 'Movie'],
  },
  {
    name: 'Food & Recipes',
    types: ['Recipe'],
  },
  {
    name: 'Events & Activities',
    types: ['Event', 'JobPosting'],
  },
  {
    name: 'People',
    types: ['Person'],
  },
  {
    name: 'Web Content',
    types: ['FAQPage', 'WebSite'],
  },
];

export interface SchemaField {
  name: string;
  type: FieldType;
  label: string;
  required: boolean;
  subfields?: SchemaField[];
}

export interface SchemaTypeConfig {
  fields: SchemaField[];
  zodSchema: z.ZodObject<any>;
}

export const schemaConfigs: Record<SchemaType, SchemaTypeConfig> = {
  LocalBusiness: {
    fields: [
      { name: 'name', type: 'text', label: 'Business Name', required: true },
      {
        name: 'address',
        type: 'object',
        label: 'Address',
        required: true,
        subfields: [
          {
            name: 'streetAddress',
            type: 'text',
            label: 'Street Address',
            required: true,
          },
          {
            name: 'addressLocality',
            type: 'text',
            label: 'City',
            required: true,
          },
          {
            name: 'addressRegion',
            type: 'text',
            label: 'State',
            required: true,
          },
          {
            name: 'postalCode',
            type: 'text',
            label: 'Postal Code',
            required: true,
          },
          {
            name: 'addressCountry',
            type: 'text',
            label: 'Country',
            required: true,
          },
        ],
      },
      { name: 'telephone', type: 'text', label: 'Telephone', required: false },
      {
        name: 'openingHours',
        type: 'array',
        label: 'Opening Hours',
        required: false,
        subfields: [
          {
            name: 'dayOfWeek',
            type: 'text',
            label: 'Day of Week',
            required: true,
          },
          { name: 'opens', type: 'text', label: 'Opens', required: true },
          { name: 'closes', type: 'text', label: 'Closes', required: true },
        ],
      },
    ],
    zodSchema: z.object({
      name: z.string().min(1, 'Business name is required'),
      address: z.object({
        streetAddress: z.string().min(1, 'Street address is required'),
        addressLocality: z.string().min(1, 'City is required'),
        addressRegion: z.string().min(1, 'State is required'),
        postalCode: z.string().min(1, 'Postal code is required'),
        addressCountry: z.string().min(1, 'Country is required'),
      }),
      telephone: z.string().optional(),
      openingHours: z
        .array(
          z.object({
            dayOfWeek: z.string().min(1, 'Day of week is required'),
            opens: z.string().min(1, 'Opening time is required'),
            closes: z.string().min(1, 'Closing time is required'),
          })
        )
        .optional(),
    }),
  },
  Product: {
    fields: [
      { name: 'name', type: 'text', label: 'Product Name', required: true },
      {
        name: 'description',
        type: 'text',
        label: 'Description',
        required: true,
      },
      { name: 'image', type: 'url', label: 'Image URL', required: true },
      {
        name: 'brand',
        type: 'object',
        label: 'Brand',
        required: true,
        subfields: [
          { name: 'name', type: 'text', label: 'Brand Name', required: true },
        ],
      },
      {
        name: 'offers',
        type: 'object',
        label: 'Offer',
        required: true,
        subfields: [
          { name: 'price', type: 'number', label: 'Price', required: true },
          {
            name: 'priceCurrency',
            type: 'text',
            label: 'Price Currency',
            required: true,
          },
          {
            name: 'availability',
            type: 'text',
            label: 'Availability',
            required: true,
          },
        ],
      },
      {
        name: 'aggregateRating',
        type: 'object',
        label: 'Aggregate Rating',
        required: false,
        subfields: [
          {
            name: 'ratingValue',
            type: 'number',
            label: 'Rating Value',
            required: true,
          },
          {
            name: 'reviewCount',
            type: 'number',
            label: 'Review Count',
            required: true,
          },
        ],
      },
    ],
    zodSchema: z.object({
      name: z.string().min(1, 'Product name is required'),
      description: z.string().min(1, 'Description is required'),
      image: z.string().url('Invalid image URL'),
      brand: z.object({
        name: z.string().min(1, 'Brand name is required'),
      }),
      offers: z.object({
        price: z.number().positive('Price must be positive'),
        priceCurrency: z.string().min(1, 'Price currency is required'),
        availability: z.string().min(1, 'Availability is required'),
      }),
      aggregateRating: z
        .object({
          ratingValue: z
            .number()
            .min(0)
            .max(5, 'Rating must be between 0 and 5'),
          reviewCount: z
            .number()
            .int()
            .positive('Review count must be a positive integer'),
        })
        .optional(),
    }),
  },
  Article: {
    fields: [
      { name: 'headline', type: 'text', label: 'Headline', required: true },
      {
        name: 'description',
        type: 'text',
        label: 'Description',
        required: true,
      },
      { name: 'image', type: 'url', label: 'Image URL', required: true },
      {
        name: 'datePublished',
        type: 'date',
        label: 'Date Published',
        required: true,
      },
      {
        name: 'dateModified',
        type: 'date',
        label: 'Date Modified',
        required: true,
      },
      {
        name: 'author',
        type: 'object',
        label: 'Author',
        required: true,
        subfields: [
          { name: 'name', type: 'text', label: 'Author Name', required: true },
        ],
      },
      {
        name: 'publisher',
        type: 'object',
        label: 'Publisher',
        required: true,
        subfields: [
          {
            name: 'name',
            type: 'text',
            label: 'Publisher Name',
            required: true,
          },
          {
            name: 'logo',
            type: 'object',
            label: 'Publisher Logo',
            required: true,
            subfields: [
              { name: 'url', type: 'url', label: 'Logo URL', required: true },
            ],
          },
        ],
      },
      {
        name: 'mainEntityOfPage',
        type: 'object',
        label: 'Main Entity of Page',
        required: true,
        subfields: [
          { name: 'url', type: 'url', label: 'Page URL', required: true },
        ],
      },
    ],
    zodSchema: z.object({
      headline: z.string().min(1, 'Headline is required'),
      description: z.string().min(1, 'Description is required'),
      image: z.string().url('Invalid image URL'),
      datePublished: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format. Use YYYY-MM-DD'),
      dateModified: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format. Use YYYY-MM-DD'),
      author: z.object({
        name: z.string().min(1, 'Author name is required'),
      }),
      publisher: z.object({
        name: z.string().min(1, 'Publisher name is required'),
        logo: z.object({
          url: z.string().url('Invalid logo URL'),
        }),
      }),
      mainEntityOfPage: z.object({
        url: z.string().url('Invalid page URL'),
      }),
    }),
  },
  Event: {
    fields: [
      { name: 'name', type: 'text', label: 'Event Name', required: true },
      {
        name: 'startDate',
        type: 'datetime-local',
        label: 'Start Date and Time',
        required: true,
      },
      {
        name: 'endDate',
        type: 'datetime-local',
        label: 'End Date and Time',
        required: true,
      },
      {
        name: 'location',
        type: 'object',
        label: 'Location',
        required: true,
        subfields: [
          { name: 'name', type: 'text', label: 'Venue Name', required: true },
          { name: 'address', type: 'text', label: 'Address', required: true },
        ],
      },
      {
        name: 'description',
        type: 'text',
        label: 'Description',
        required: true,
      },
      { name: 'image', type: 'url', label: 'Image URL', required: false },
      {
        name: 'organizer',
        type: 'object',
        label: 'Organizer',
        required: false,
        subfields: [
          {
            name: 'name',
            type: 'text',
            label: 'Organizer Name',
            required: true,
          },
          {
            name: 'url',
            type: 'url',
            label: 'Organizer Website',
            required: false,
          },
        ],
      },
    ],
    zodSchema: z.object({
      name: z.string().min(1, 'Event name is required'),
      startDate: z.string().min(1, 'Start date is required'),
      endDate: z.string().min(1, 'End date is required'),
      location: z.object({
        name: z.string().min(1, 'Venue name is required'),
        address: z.string().min(1, 'Address is required'),
      }),
      description: z.string().min(1, 'Description is required'),
      image: z.string().url('Invalid image URL').optional(),
      organizer: z
        .object({
          name: z.string().min(1, 'Organizer name is required'),
          url: z.string().url('Invalid organizer website URL').optional(),
        })
        .optional(),
    }),
  },
  Recipe: {
    fields: [
      { name: 'name', type: 'text', label: 'Recipe Name', required: true },
      { name: 'image', type: 'url', label: 'Image URL', required: true },
      {
        name: 'description',
        type: 'text',
        label: 'Description',
        required: true,
      },
      {
        name: 'prepTime',
        type: 'text',
        label: 'Prep Time (e.g., PT15M)',
        required: true,
      },
      {
        name: 'cookTime',
        type: 'text',
        label: 'Cook Time (e.g., PT1H)',
        required: true,
      },
      {
        name: 'totalTime',
        type: 'text',
        label: 'Total Time (e.g., PT1H15M)',
        required: true,
      },
      {
        name: 'recipeYield',
        type: 'text',
        label: 'Recipe Yield (e.g., 4 servings)',
        required: true,
      },
      {
        name: 'ingredients',
        type: 'array',
        label: 'Ingredients',
        required: true,
        subfields: [
          { name: 'item', type: 'text', label: 'Ingredient', required: true },
        ],
      },
      {
        name: 'instructions',
        type: 'array',
        label: 'Instructions',
        required: true,
        subfields: [
          { name: 'step', type: 'text', label: 'Step', required: true },
        ],
      },
    ],
    zodSchema: z.object({
      name: z.string().min(1, 'Recipe name is required'),
      image: z.string().url('Invalid image URL'),
      description: z.string().min(1, 'Description is required'),
      prepTime: z.string().min(1, 'Prep time is required'),
      cookTime: z.string().min(1, 'Cook time is required'),
      totalTime: z.string().min(1, 'Total time is required'),
      recipeYield: z.string().min(1, 'Recipe yield is required'),
      ingredients: z
        .array(
          z.object({
            item: z.string().min(1, 'Ingredient is required'),
          })
        )
        .min(1, 'At least one ingredient is required'),
      instructions: z
        .array(
          z.object({
            step: z.string().min(1, 'Instruction step is required'),
          })
        )
        .min(1, 'At least one instruction step is required'),
    }),
  },
  FAQPage: {
    fields: [
      {
        name: 'mainEntity',
        type: 'array',
        label: 'FAQ Items',
        required: true,
        subfields: [
          { name: 'question', type: 'text', label: 'Question', required: true },
          { name: 'answer', type: 'text', label: 'Answer', required: true },
        ],
      },
    ],
    zodSchema: z.object({
      mainEntity: z
        .array(
          z.object({
            question: z.string().min(1, 'Question is required'),
            answer: z.string().min(1, 'Answer is required'),
          })
        )
        .min(1, 'At least one FAQ item is required'),
    }),
  },
  Restaurant: {
    fields: [
      { name: 'name', type: 'text', label: 'Restaurant Name', required: true },
      {
        name: 'description',
        type: 'text',
        label: 'Description',
        required: true,
      },
      {
        name: 'address',
        type: 'object',
        label: 'Address',
        required: true,
        subfields: [
          {
            name: 'streetAddress',
            type: 'text',
            label: 'Street Address',
            required: true,
          },
          {
            name: 'addressLocality',
            type: 'text',
            label: 'City',
            required: true,
          },
          {
            name: 'addressRegion',
            type: 'text',
            label: 'State',
            required: true,
          },
          {
            name: 'postalCode',
            type: 'text',
            label: 'Postal Code',
            required: true,
          },
          {
            name: 'addressCountry',
            type: 'text',
            label: 'Country',
            required: true,
          },
        ],
      },
      { name: 'telephone', type: 'text', label: 'Telephone', required: true },
      { name: 'servesCuisine', type: 'text', label: 'Cuisine', required: true },
    ],
    zodSchema: z.object({
      name: z.string().min(1, 'Restaurant name is required'),
      description: z.string().min(1, 'Description is required'),
      address: z.object({
        streetAddress: z.string().min(1, 'Street address is required'),
        addressLocality: z.string().min(1, 'City is required'),
        addressRegion: z.string().min(1, 'State is required'),
        postalCode: z.string().min(1, 'Postal code is required'),
        addressCountry: z.string().min(1, 'Country is required'),
      }),
      telephone: z.string().min(1, 'Telephone is required'),
      servesCuisine: z.string().min(1, 'Cuisine is required'),
    }),
  },
  Hotel: {
    fields: [
      { name: 'name', type: 'text', label: 'Hotel Name', required: true },
      {
        name: 'description',
        type: 'text',
        label: 'Description',
        required: true,
      },
      {
        name: 'address',
        type: 'object',
        label: 'Address',
        required: true,
        subfields: [
          {
            name: 'streetAddress',
            type: 'text',
            label: 'Street Address',
            required: true,
          },
          {
            name: 'addressLocality',
            type: 'text',
            label: 'City',
            required: true,
          },
          {
            name: 'addressRegion',
            type: 'text',
            label: 'State',
            required: true,
          },
          {
            name: 'postalCode',
            type: 'text',
            label: 'Postal Code',
            required: true,
          },
          {
            name: 'addressCountry',
            type: 'text',
            label: 'Country',
            required: true,
          },
        ],
      },
      { name: 'telephone', type: 'text', label: 'Telephone', required: true },
      {
        name: 'starRating',
        type: 'object',
        label: 'Star Rating',
        required: true,
        subfields: [
          {
            name: 'ratingValue',
            type: 'number',
            label: 'Rating Value',
            required: true,
          },
        ],
      },
    ],
    zodSchema: z.object({
      name: z.string().min(1, 'Hotel name is required'),
      description: z.string().min(1, 'Description is required'),
      address: z.object({
        streetAddress: z.string().min(1, 'Street address is required'),
        addressLocality: z.string().min(1, 'City is required'),
        addressRegion: z.string().min(1, 'State is required'),
        postalCode: z.string().min(1, 'Postal code is required'),
        addressCountry: z.string().min(1, 'Country is required'),
      }),
      telephone: z.string().min(1, 'Telephone is required'),
      starRating: z.object({
        ratingValue: z.number().min(1).max(5, 'Rating must be between 1 and 5'),
      }),
    }),
  },
  // ... (add configurations for other new types)
  WebSite: {
    fields: [
      { name: 'name', type: 'text', label: 'Website Name', required: true },
      { name: 'url', type: 'url', label: 'URL', required: true },
      {
        name: 'description',
        type: 'text',
        label: 'Description',
        required: true,
      },
    ],
    zodSchema: z.object({
      name: z.string().min(1, 'Website name is required'),
      url: z.string().url('Invalid URL'),
      description: z.string().min(1, 'Description is required'),
    }),
  },
  Review: {
    fields: [
      {
        name: 'itemReviewed',
        type: 'object',
        label: 'Item Reviewed',
        required: true,
        subfields: [
          { name: 'name', type: 'text', label: 'Item Name', required: true },
          { name: 'type', type: 'text', label: 'Item Type', required: true },
        ],
      },
      {
        name: 'reviewRating',
        type: 'object',
        label: 'Review Rating',
        required: true,
        subfields: [
          {
            name: 'ratingValue',
            type: 'number',
            label: 'Rating Value',
            required: true,
          },
          {
            name: 'bestRating',
            type: 'number',
            label: 'Best Rating',
            required: true,
          },
          {
            name: 'worstRating',
            type: 'number',
            label: 'Worst Rating',
            required: true,
          },
        ],
      },
      {
        name: 'author',
        type: 'object',
        label: 'Author',
        required: true,
        subfields: [
          { name: 'name', type: 'text', label: 'Author Name', required: true },
        ],
      },
      {
        name: 'reviewBody',
        type: 'text',
        label: 'Review Body',
        required: true,
      },
    ],
    zodSchema: z.object({
      itemReviewed: z.object({
        name: z.string().min(1, 'Item name is required'),
        type: z.string().min(1, 'Item type is required'),
      }),
      reviewRating: z.object({
        ratingValue: z.number().min(0, 'Rating value must be non-negative'),
        bestRating: z.number().min(0, 'Best rating must be non-negative'),
        worstRating: z.number().min(0, 'Worst rating must be non-negative'),
      }),
      author: z.object({
        name: z.string().min(1, 'Author name is required'),
      }),
      reviewBody: z.string().min(1, 'Review body is required'),
    }),
  },
  BlogPosting: {
    fields: [
      { name: 'headline', type: 'text', label: 'Headline', required: true },
      {
        name: 'author',
        type: 'object',
        label: 'Author',
        required: true,
        subfields: [
          { name: 'name', type: 'text', label: 'Author Name', required: true },
        ],
      },
      {
        name: 'datePublished',
        type: 'date',
        label: 'Date Published',
        required: true,
      },
      { name: 'image', type: 'url', label: 'Image URL', required: true },
      {
        name: 'articleBody',
        type: 'text',
        label: 'Article Body',
        required: true,
      },
    ],
    zodSchema: z.object({
      headline: z.string().min(1, 'Headline is required'),
      author: z.object({
        name: z.string().min(1, 'Author name is required'),
      }),
      datePublished: z.string().min(1, 'Date published is required'),
      image: z.string().url('Invalid image URL'),
      articleBody: z.string().min(1, 'Article body is required'),
    }),
  },
  NewsArticle: {
    fields: [
      { name: 'headline', type: 'text', label: 'Headline', required: true },
      {
        name: 'author',
        type: 'object',
        label: 'Author',
        required: true,
        subfields: [
          { name: 'name', type: 'text', label: 'Author Name', required: true },
        ],
      },
      {
        name: 'datePublished',
        type: 'date',
        label: 'Date Published',
        required: true,
      },
      { name: 'image', type: 'url', label: 'Image URL', required: true },
      {
        name: 'articleBody',
        type: 'text',
        label: 'Article Body',
        required: true,
      },
      { name: 'dateline', type: 'text', label: 'Dateline', required: false },
    ],
    zodSchema: z.object({
      headline: z.string().min(1, 'Headline is required'),
      author: z.object({
        name: z.string().min(1, 'Author name is required'),
      }),
      datePublished: z.string().min(1, 'Date published is required'),
      image: z.string().url('Invalid image URL'),
      articleBody: z.string().min(1, 'Article body is required'),
      dateline: z.string().optional(),
    }),
  },
  Movie: {
    fields: [
      { name: 'name', type: 'text', label: 'Movie Title', required: true },
      {
        name: 'director',
        type: 'object',
        label: 'Director',
        required: true,
        subfields: [
          {
            name: 'name',
            type: 'text',
            label: 'Director Name',
            required: true,
          },
        ],
      },
      {
        name: 'actor',
        type: 'array',
        label: 'Actors',
        required: true,
        subfields: [
          { name: 'name', type: 'text', label: 'Actor Name', required: true },
        ],
      },
      {
        name: 'datePublished',
        type: 'date',
        label: 'Release Date',
        required: true,
      },
      { name: 'image', type: 'url', label: 'Poster Image URL', required: true },
      {
        name: 'description',
        type: 'text',
        label: 'Description',
        required: true,
      },
    ],
    zodSchema: z.object({
      name: z.string().min(1, 'Movie title is required'),
      director: z.object({
        name: z.string().min(1, 'Director name is required'),
      }),
      actor: z
        .array(
          z.object({
            name: z.string().min(1, 'Actor name is required'),
          })
        )
        .min(1, 'At least one actor is required'),
      datePublished: z.string().min(1, 'Release date is required'),
      image: z.string().url('Invalid image URL'),
      description: z.string().min(1, 'Description is required'),
    }),
  },
  Book: {
    fields: [
      { name: 'name', type: 'text', label: 'Book Title', required: true },
      {
        name: 'author',
        type: 'object',
        label: 'Author',
        required: true,
        subfields: [
          { name: 'name', type: 'text', label: 'Author Name', required: true },
        ],
      },
      { name: 'isbn', type: 'text', label: 'ISBN', required: true },
      {
        name: 'datePublished',
        type: 'date',
        label: 'Publication Date',
        required: true,
      },
      { name: 'image', type: 'url', label: 'Book Cover URL', required: true },
      {
        name: 'description',
        type: 'text',
        label: 'Description',
        required: true,
      },
    ],
    zodSchema: z.object({
      name: z.string().min(1, 'Book title is required'),
      author: z.object({
        name: z.string().min(1, 'Author name is required'),
      }),
      isbn: z.string().min(1, 'ISBN is required'),
      datePublished: z.string().min(1, 'Publication date is required'),
      image: z.string().url('Invalid image URL'),
      description: z.string().min(1, 'Description is required'),
    }),
  },
  JobPosting: {
    fields: [
      { name: 'title', type: 'text', label: 'Job Title', required: true },
      {
        name: 'description',
        type: 'text',
        label: 'Job Description',
        required: true,
      },
      {
        name: 'datePosted',
        type: 'date',
        label: 'Date Posted',
        required: true,
      },
      {
        name: 'validThrough',
        type: 'date',
        label: 'Valid Through',
        required: true,
      },
      {
        name: 'employmentType',
        type: 'text',
        label: 'Employment Type',
        required: true,
      },
      {
        name: 'hiringOrganization',
        type: 'object',
        label: 'Hiring Organization',
        required: true,
        subfields: [
          {
            name: 'name',
            type: 'text',
            label: 'Organization Name',
            required: true,
          },
        ],
      },
      {
        name: 'jobLocation',
        type: 'object',
        label: 'Job Location',
        required: true,
        subfields: [
          {
            name: 'addressLocality',
            type: 'text',
            label: 'City',
            required: true,
          },
          {
            name: 'addressRegion',
            type: 'text',
            label: 'State',
            required: true,
          },
          {
            name: 'addressCountry',
            type: 'text',
            label: 'Country',
            required: true,
          },
        ],
      },
    ],
    zodSchema: z.object({
      title: z.string().min(1, 'Job title is required'),
      description: z.string().min(1, 'Job description is required'),
      datePosted: z.string().min(1, 'Date posted is required'),
      validThrough: z.string().min(1, 'Valid through date is required'),
      employmentType: z.string().min(1, 'Employment type is required'),
      hiringOrganization: z.object({
        name: z.string().min(1, 'Organization name is required'),
      }),
      jobLocation: z.object({
        addressLocality: z.string().min(1, 'City is required'),
        addressRegion: z.string().min(1, 'State is required'),
        addressCountry: z.string().min(1, 'Country is required'),
      }),
    }),
  },
  Person: {
    fields: [
      { name: 'name', type: 'text', label: 'Full Name', required: true },
      { name: 'givenName', type: 'text', label: 'Given Name', required: false },
      {
        name: 'familyName',
        type: 'text',
        label: 'Family Name',
        required: false,
      },
      { name: 'birthDate', type: 'date', label: 'Birth Date', required: false },
      { name: 'image', type: 'url', label: 'Image URL', required: false },
      { name: 'jobTitle', type: 'text', label: 'Job Title', required: false },
      { name: 'email', type: 'text', label: 'Email', required: false },
      { name: 'telephone', type: 'text', label: 'Telephone', required: false },
    ],
    zodSchema: z.object({
      name: z.string().min(1, 'Full name is required'),
      givenName: z.string().optional(),
      familyName: z.string().optional(),
      birthDate: z.string().optional(),
      image: z.string().url('Invalid image URL').optional(),
      jobTitle: z.string().optional(),
      email: z.string().email('Invalid email').optional(),
      telephone: z.string().optional(),
    }),
  },
  Organization: {
    fields: [
      {
        name: 'name',
        type: 'text',
        label: 'Organization Name',
        required: true,
      },
      {
        name: 'description',
        type: 'text',
        label: 'Description',
        required: true,
      },
      { name: 'url', type: 'url', label: 'Website URL', required: true },
      { name: 'logo', type: 'url', label: 'Logo URL', required: true },
      {
        name: 'address',
        type: 'object',
        label: 'Address',
        required: true,
        subfields: [
          {
            name: 'streetAddress',
            type: 'text',
            label: 'Street Address',
            required: true,
          },
          {
            name: 'addressLocality',
            type: 'text',
            label: 'City',
            required: true,
          },
          {
            name: 'addressRegion',
            type: 'text',
            label: 'State',
            required: true,
          },
          {
            name: 'postalCode',
            type: 'text',
            label: 'Postal Code',
            required: true,
          },
          {
            name: 'addressCountry',
            type: 'text',
            label: 'Country',
            required: true,
          },
        ],
      },
    ],
    zodSchema: z.object({
      name: z.string().min(1, 'Organization name is required'),
      description: z.string().min(1, 'Description is required'),
      url: z.string().url('Invalid website URL'),
      logo: z.string().url('Invalid logo URL'),
      address: z.object({
        streetAddress: z.string().min(1, 'Street address is required'),
        addressLocality: z.string().min(1, 'City is required'),
        addressRegion: z.string().min(1, 'State is required'),
        postalCode: z.string().min(1, 'Postal code is required'),
        addressCountry: z.string().min(1, 'Country is required'),
      }),
    }),
  },

  // ... (similar updates for Product and Article)
};
