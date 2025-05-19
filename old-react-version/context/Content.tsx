import React, { createContext, useContext, useMemo, type ReactNode } from 'react';
import useFetch from '../hooks/useFetch';
import type { Card, Block } from '../types';

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
  loading: boolean;
  error: Error | null;
}

const ContentContext = createContext<ContentContextValue>({
  cards: {},
  blocks: {},
  loading: false,
  error: null,
});

export const ContentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // fetch data from strapi
  const { data: cardData, loading: loadingCards, error: errorCards } =
    useFetch<StrapiListResponse<RawCard>>('http://localhost:1337/api/cards?populate=*');
  const { data: blockData, loading: loadingBlocks, error: errorBlocks } =
    useFetch<StrapiListResponse<RawBlock>>('http://localhost:1337/api/text-media-blocks?populate=*');

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

  const loading = loadingCards || loadingBlocks;
  const error = errorCards || errorBlocks;

  return (
    <ContentContext.Provider
      value={{
        cards: cardsByCategory,
        blocks: blocksByCategory,
        loading,
        error,
      }}
    >
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => useContext(ContentContext);