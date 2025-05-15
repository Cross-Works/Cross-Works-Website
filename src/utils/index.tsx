import useFetch from "../hooks/useFetch";

interface SingleNewsEntry {
  id: number;
  title: string;
  slug: string;
  publishedDate: string;
  newsShortText: { type: string; children: { text: string }[] }[];
  newsContent: { type: string; children: { text: string }[] }[];
  featuredImage: { id: number; url: string; alternativeText: string | null } | null;
  featuredImage2: { id: number; url: string; alternativeText: string | null } | null;
  shareLink: string | null;
}

interface SingleNewsResponse {
  data: SingleNewsEntry[];
  meta: { pagination: any };
}

/**
 * Fetch one news entry by its Strapi `documentId`.
 */
export function useSingleNews(documentId?: string) {
  const endpoint = documentId
    ? `http://localhost:1337/api/news?filters[documentId][$eq]=${documentId}&populate=*`
    : null;

  if (!endpoint) {
    return { entry: null, loading: false, error: null };
  }

  const { data, loading, error } =
    useFetch<SingleNewsResponse>(endpoint);

  // pull out the first item, or null if none
  const entry = data?.data?.[0] ?? null;

  return { entry, loading, error };
}