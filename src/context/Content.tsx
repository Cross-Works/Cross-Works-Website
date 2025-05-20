import React, { createContext, useContext, useMemo, type ReactNode } from 'react';
import useFetch from '../hooks/useFetch';
import type { Card, Block, FooterSection, ContactSection } from '../types';

interface StrapiListResponse<T> {
  data: T[];
  meta: any;
}

interface RawCard extends Card { }
interface RawBlock extends Block { }

type ByCategory<T> = Record<string, T[]>;

interface ContentContextValue {
  cards: ByCategory<Card>;
  blocks: ByCategory<RawBlock>;
  contactSection: ContactSection[] | null;
  footerSection: FooterSection[] | null;
  loading: boolean;
  error: Error | null;
}

const ContentContext = createContext<ContentContextValue>({
  cards: {},
  blocks: {},
  contactSection: null,
  footerSection: null,
  loading: false,
  error: null,
});

export const ContentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // fetch data from strapi
  const { data: cardData, loading: loadingCards, error: errorCards } =
    useFetch<StrapiListResponse<RawCard>>('http://localhost:1337/api/cards?populate=*');
  const { data: blockData, loading: loadingBlocks, error: errorBlocks } =
    useFetch<StrapiListResponse<RawBlock>>('http://localhost:1337/api/text-media-blocks?populate=*');

  // fetch the Contact-Section single type
  const { data: contactData, loading: loadingContact, error: errorContact } =
    useFetch<StrapiListResponse<ContactSection>>(
      'http://localhost:1337/api/contact-sections?populate=*'
    );

  const { data: footerData, loading: loadingFooter, error: errorFooter } =
    useFetch<StrapiListResponse<FooterSection>>(
      'http://localhost:1337/api/footers?populate=*'
    );

  // helper to group any array of items by their first-level `categories` slug
  const groupByCategory = <T extends { categories: { slug: string }[] }>(items: T[]): ByCategory<T> => {
    return items.reduce<ByCategory<T>>((acc, item) => {
      item.categories.forEach(cat => {
        if (!acc[cat.slug]) acc[cat.slug] = [];
        acc[cat.slug].push(item);
      });
      return acc;
    }, {});
  };

  // only regroup when the data changes
  const cardsByCategory = useMemo(
    () => (cardData?.data ? groupByCategory(cardData.data) : {}),
    [cardData]
  );

  const blocksByCategory = useMemo(
    () => (blockData?.data ? groupByCategory(blockData.data) : {}),
    [blockData]
  );

  const loading = loadingCards || loadingBlocks || loadingContact || loadingFooter;
  const error = errorCards || errorBlocks || errorContact || errorFooter;

  return (
    <ContentContext.Provider
      value={{
        cards: cardsByCategory,
        blocks: blocksByCategory,
        contactSection: contactData?.data ?? null,
        footerSection: footerData?.data ?? null,
        loading,
        error,
      }}
    >
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => useContext(ContentContext);