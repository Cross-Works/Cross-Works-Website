import { useContent } from '../../context/Content'

const Blocks: React.FC<{ categorySlug: string }> = ({ categorySlug }) => {
    const { blocks, loading, error } = useContent();
    const items = blocks[categorySlug] || [];

    if (loading) return <p>Loading…</p>
    if (error) return <p style={{ color: 'red' }}>{error.message}</p>
    return (
        <section className="blocks">
            {items.map((block, idx) => {
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

export default Blocks;