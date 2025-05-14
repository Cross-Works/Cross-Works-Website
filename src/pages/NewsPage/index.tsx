import React, { useState } from 'react'
import useFetch from '../../hooks/useFetch'
import { useNavigate } from 'react-router-dom'

interface Pagination {
    page: number
    pageSize: number
    pageCount: number
    total: number
}

interface ApiResponse<T> {
    data: T[]
    meta: { pagination: Pagination }
}

type Card = {
    id: number
    title: string
    description: string | null
    slug: string
    publishedDate: string
    image: {
        id: number
        url: string
        alternativeText: string | null
    } | null
    link?: {
        id: number
        slug: string
        documentId: string
    }
}

const NewsPage: React.FC = () => {
    const [page, setPage] = useState(1)
    const navigate = useNavigate()

    const { data: response, loading, error } =
        useFetch<ApiResponse<Card>>(
            `http://localhost:1337/api/cards` +
            `?populate=*` +
            `&pagination[page]=${page}` +
            `&pagination[pageSize]=12`
        )

    if (loading) return <p>Loading…</p>
    if (error) return <p className="error">{error.message}</p>

    const cards = response?.data ?? []
    const pageCount =
        response?.meta?.pagination?.pageCount ?? 1

    return (
        <div className="news-container">
            <div className="news-grid">
                {cards.map(card => {
                    const newsDocId = card.link?.documentId
                    return (
                        <article
                            key={card.id}
                            className="news-card"
                            onClick={() => {
                                if (newsDocId) navigate(`/news/${newsDocId}`)
                            }}
                        >
                            {card.image && (
                                <img
                                    className="news-image"
                                    src={`http://localhost:1337${card.image.url}`}
                                    alt={card.image.alternativeText || ''}
                                />
                            )}
                            <p className="news-date">
                                {new Date(card.publishedDate).toLocaleDateString(undefined, {
                                    day: 'numeric',
                                    month: 'short',
                                    year: 'numeric',
                                })}
                            </p>
                            <h3 className="news-title">{card.title}</h3>
                        </article>
                    )

                })}
            </div>

            <div className="pagination">
                <button
                    className="pagination-button"
                    disabled={page <= 1}
                    onClick={() => setPage(p => Math.max(p - 1, 1))}
                >
                    ← Previous
                </button>

                <div className="pagination-pages">
                    {Array.from({ length: pageCount }, (_, i) => i + 1).map(p => (
                        <button
                            key={p}
                            className={
                                'pagination-button' + (p === page ? ' active' : '')
                            }
                            onClick={() => setPage(p)}
                        >
                            {p}
                        </button>
                    ))}
                </div>

                <button
                    className="pagination-button"
                    disabled={page >= pageCount}
                    onClick={() => setPage(p => Math.min(p + 1, pageCount))}
                >
                    Next →
                </button>
            </div>
        </div>
    )
}

export default NewsPage
