import React from 'react';
import { useContent } from '../../context/Content';
import { CardGrid } from '../../components/Cards/CardGrid';

const NewsPage: React.FC = () => {
    const { cards, loading, error } = useContent();
    const news = cards.news || [];
    if (loading) return <p>Loading…</p>;
    if (error) return <p className="error">Error: {error.message}</p>;

    return (
        <CardGrid
            title="News"
            cards={news}
            linkPrefix="/news/"
            showDate={true}
        />
    );
};

export default NewsPage;