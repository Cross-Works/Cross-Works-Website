import React from 'react';
import Blocks from '../ImageTextBlock';
import { useContent } from '../../context/Content';
import { CardGrid } from '../Cards/CardGrid';

const CitiesPanel: React.FC = () => {
    const { cards, loading, error } = useContent();
    const design = cards.design || [];
    if (loading) return <p>Loading…</p>;
    if (error) return <p style={{ color: 'red' }}>{error.message}</p>;
    return (
        <div>
            <Blocks categorySlug="design" />
            <CardGrid
                title="Services"
                cards={design}
                linkPrefix={undefined}
                showDescription={true}
            />
        </div>
    );
};

export default CitiesPanel;
