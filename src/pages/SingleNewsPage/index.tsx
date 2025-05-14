import { useParams } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import './singlenews.css';

interface MediaFile {
    id: number;
    url: string;
    alternativeText: string | null;
}

interface SingleNewsEntry {
    id: number;
    title: string;
    slug: string;
    publishedDate: string;
    newsShortText: { type: string; children: { text: string }[] }[];
    newsContent: { type: string; children: { text: string }[] }[];
    featuredImage: MediaFile;
    featuredImage2: MediaFile;
    shareLink: string | null;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
}

interface SingleNewsResponse {
    data: SingleNewsEntry[];
    meta: { pagination: { page: number; pageSize: number; pageCount: number; total: number } };
}

export default function SingleNews() {
    const { docId } = useParams<{ docId: string }>()
    const { data: res, loading, error } = useFetch<SingleNewsResponse>(
        `http://localhost:1337/api/news?filters[documentId][$eq]=${docId}&populate=*`
    );

    if (loading) return <p>Loading…</p>;
    if (error) return <p style={{ color: 'red' }}>{error.message}</p>;

    // pull out the one entry
    const entry = res?.data[0];
    if (!entry) return <p>No content found.</p>;

    return (
        <section className="single-news-page">
            <aside className="news-sidebar">
                <h1 className="news-title">{entry.title}</h1>
                <p className="news-date">
                    {new Date(entry.publishedDate).toLocaleDateString(undefined, {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                    })}
                </p>
                {entry.shareLink && (
                    <button
                        className="news-share"
                        onClick={() => navigator.clipboard.writeText(entry.shareLink!)}
                    >
                        Copy link
                    </button>
                )}
            </aside>

            <article className="news-content">
                {entry.featuredImage && (
                    <img
                        className="news-featured"
                        src={`http://localhost:1337${entry.featuredImage.url}`}
                        alt={entry.featuredImage.alternativeText || ''}
                    />
                )}
                <div className="news-intro">
                    {entry.newsShortText.map((block, i) => {
                        if (block.type === 'paragraph') {
                            const text = block.children.map(c => c.text).join('')
                            return <p key={i}>{text}</p>
                        }
                        return null
                    })}
                </div>
                {entry.featuredImage2 && (
                    <img
                        className="news-featured"
                        src={`http://localhost:1337${entry.featuredImage2.url}`}
                        alt={entry.featuredImage2.alternativeText || ''}
                    />
                )}
                <div className="news-body">
                    {entry.newsContent.map((block, i) => {
                        if (block.type === 'paragraph') {
                            const text = block.children.map(c => c.text).join('')
                            return <p key={i}>{text}</p>
                        }
                        return null
                    })}
                </div>
            </article>
        </section>
    );
}
