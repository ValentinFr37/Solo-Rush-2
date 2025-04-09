// src/Components/GameCardWithLike.js
import React from 'react';
import GameCard from './GameCard';

interface GameCardWithLikeProps {
  game: { id: number; title: string; genre: string };
  isLiked: boolean;
  onLike: () => void;
}

const GameCardWithLike: React.FC<GameCardWithLikeProps> = ({ game, isLiked, onLike }) => {
  return (
    <div>
      <GameCard game={game} />
      <button onClick={onLike} className={isLiked ? "liked" : ""}>
        {isLiked ? "Retirer le like" : "Aimer ce jeu"}
      </button>
    </div>
  );
};

export default GameCardWithLike;
