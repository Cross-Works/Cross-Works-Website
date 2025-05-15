import React from 'react';
import { useNavigate } from 'react-router-dom';
import type { Card } from '../../types';

const STRAPI_BASE = import.meta.env.VITE_STRAPI_URL?.replace(/\/$/, '') ?? '';

export interface CardItemProps {
    card: Card;
    showDate?: boolean;
    linkPrefix?: string;
    showDescription?: boolean;
    style?: React.CSSProperties;
}

export const CardItem: React.FC<CardItemProps> = ({
    card,
    showDate = false,
    showDescription = false,
    linkPrefix,
    style,
}) => {
    const navigate = useNavigate();
    const handleClick = () => {
        if (linkPrefix && card.link?.documentId) {
            navigate(`${linkPrefix}${card.link.documentId}`);
        }
    };

    // Helper to render a description that might be a string or rich-text nodes
    const renderDescription = (desc: string | any[] | null | undefined) => {
        if (!desc) return null;

        // if it is a plain string then just render it
        if (typeof desc === 'string') {
            return <p style={{ margin: '8px 0 0', fontSize: 14, color: '#444' }}>{desc}</p>;
        }

        // otherwise assume array of rich-text blocks
        return desc.map((node: any, idx: number) => {
            if (node.type === 'paragraph') {
                const text = node.children?.map((c: any) => c.text).join('') || '';
                return (
                    <p key={idx} style={{ margin: '8px 0 0', fontSize: 14, color: '#444' }}>
                        {text}
                    </p>
                );
            }
            return null;
        });
    };

    return (
        <article
            onClick={handleClick}
            style={{
                cursor: linkPrefix ? 'pointer' : 'default',
                border: '1px solid #eee',
                borderRadius: 4,
                overflow: 'hidden',
                ...style,
            }}
        >
            {card.image && (
                <img
                    src={
                        card.image.url.startsWith('http')
                            ? card.image.url
                            : `${STRAPI_BASE}${card.image.url}`
                    }
                    alt={card.image.alternativeText ?? ''}
                    style={{ width: '100%', height: 160, objectFit: 'cover' }}
                />
            )}

            <div style={{ padding: 12 }}>
                {showDate && card.publishedDate && (
                    <p style={{ margin: 0, fontSize: 12, color: '#666' }}>
                        {new Date(card.publishedDate).toLocaleDateString(undefined, {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                        })}
                    </p>
                )}
                <h3 style={{ margin: '8px 0 0', fontSize: 16 }}>{card.title}</h3>
                {showDescription && renderDescription(card.description)}
            </div>
        </article>
    );
};
