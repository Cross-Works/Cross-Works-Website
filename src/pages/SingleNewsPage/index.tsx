import { useParams } from 'react-router-dom';
import './singlenews.css';
import { useSingleNews } from '../../utils';

const SingleNews: React.FC = () => {
    const { docId } = useParams<{ docId: string }>()
    const { entry, loading, error } = useSingleNews(docId);
    if (loading) return <p>Loading…</p>;
    if (error) return <p style={{ color: 'red' }}>{error.message}</p>;
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
};

export default SingleNews;