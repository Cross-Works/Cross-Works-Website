// src/types.ts
export interface Category {
  id: number;
  name: string;
  slug: string; // e.g. 'news', 'design', 'tech', 'homepage'
}

export interface Card {
  id: number;
  title: string;
  description?: string | any[] | null;
  slug: string;
  publishedDate: string | null;
  image: {
    id: number;
    url: string;
    alternativeText: string | null;
  } | null;
  categories: Category[];
  link?: {
    id: number;
    slug: string;
    documentId: string;
  };
}
 
export interface Block {
    id: number
    Title: string
    Description: any[]
    Media: Array<{
        id: number
        url: string
        alternativeText: string | null
    }>
      categories: Category[];
}