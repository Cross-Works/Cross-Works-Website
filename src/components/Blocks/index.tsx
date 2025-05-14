import useFetch from '../../hooks/useFetch'

interface StrapiMeta {
    pagination: { page: number; pageSize: number; pageCount: number; total: number }
}
interface APIJSON<T> {
    data: T[]
    meta: StrapiMeta
}

// shape of each block in JSON
type Block = {
    id: number
    Title: string
    Description: any[]
    Media: Array<{
        id: number
        url: string
        alternativeText: string | null
    }>
}

const Blocks: React.FC = () => {
    const {
        data: response,
        loading,
        error
    } = useFetch<APIJSON<Block>>(
        'http://localhost:1337/api/text-media-blocks?populate=Media'
    )

    if (loading) return <p>Loading…</p>
    if (error) return <p style={{ color: 'red' }}>{error.message}</p>
    const blocks = response?.data ?? []
    return (
        <section className="blocks">
            {blocks.map((block, idx) => {
                const isEven = idx % 2 === 1

                return (
                    <div
                        key={block.id}
                        className={`block-row ${isEven ? 'reverse' : ''}`}
                    >
                        <div className="block-media">
                            <img
                                src={`http://localhost:1337${block.Media[0].url}`}
                                alt={block.Media[0].alternativeText ?? ''}
                            />
                        </div>

                        <div className="block-text">
                            <h2>{block.Title}</h2>
                            {block.Description.map((node, i) => {
                                if (node.type === 'paragraph') {
                                    const text = node.children.map((c: { text: any; }) => c.text).join('')
                                    return <p key={i}>{text}</p>
                                }
                                return null
                            })}
                        </div>
                    </div>
                )
            })}
        </section>
    );

}

export default Blocks