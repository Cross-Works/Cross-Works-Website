import React from 'react';
import { CardGrid } from '../../components/Cards/CardGrid';
import { useContent } from '../../context/Content';

const HomePage: React.FC = () => {
  const { cards, loading, error } = useContent();
  const homepage = cards.homepage || [];

  if (loading) return <p>Loading…</p>;
  if (error) return <p style={{ color: 'red' }}>{error.message}</p>;

  return (
    <div>
      <CardGrid
        title="What we do"
        cards={homepage}
        linkPrefix={undefined}
        showDate={false}
      />
    </div>
  );
};

export default HomePage;
