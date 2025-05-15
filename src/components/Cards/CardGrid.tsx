import React from 'react';
import { CardItem } from './CardItem';
import type { Card } from '../../types';

export interface CardGridProps {
    title: string;
    cards: Card[];
    linkPrefix?: string;
    showDate?: boolean;
    showDescription?: boolean;
}

export const CardGrid: React.FC<CardGridProps> = ({
    title,
    cards,
    linkPrefix,
    showDate = false,
    showDescription = false,
}) => {
    const gridStyle: React.CSSProperties = {
        display: 'flex',
        flexWrap: 'wrap',
        gap: 16,
    };
    const itemStyle: React.CSSProperties = {
        flex: '0 0 calc(33.333% - 16px)',
        boxSizing: 'border-box',
    };

    return (
        <section style={{ maxWidth: 1000, margin: '0 auto', padding: '20px' }}>
            <h2 style={{ fontSize: 24, marginBottom: 16 }}>{title}</h2>
            <div style={gridStyle}>
                {cards.map(card => (
                    <CardItem
                        key={card.id}
                        card={card}
                        showDate={showDate}
                        showDescription={showDescription}
                        linkPrefix={linkPrefix}
                        style={itemStyle}
                    />
                ))}
            </div>
        </section>
    );
};
