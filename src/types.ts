import type { Key } from "react";

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
  id: number;
  Title: string;
  Description: any[];
  Media: Array<{
    id: number;
    url: string;
    alternativeText: string | null;
  }>;
  categories: Category[];
}

// Define the shape of your Footer single type
export interface FooterSection {
  findTitle: string;
  addressLine1: string;
  addressLine2: string;
  mapLink: string;
  contactTitle: string;
  contactPhone: string;
  contactHours: string;
  contactEmail: string;
  socialLinks: { platform: string; url: string }[];
  copyrightText: string;
}

export interface ContactSection {
  title: string;
  description: string;
  phoneNumber: string;
  contactItems: {
    id: Key | null | undefined;
    label: string;
    email: string;
  }[];
}
