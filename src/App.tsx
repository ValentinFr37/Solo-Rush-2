import { useState } from 'react';
import './App.css';
import Games from './data/game-data';
import GameCard from './Components/GameCard';

function App() {
  const [search, setSearch] = useState("");  // État pour la recherche
  const [likedGames, setLikedGames] = useState<number[]>([]); // Liste des jeux likés

  const gameFiltered = Games.filter((game) => {
    return game.title.toLocaleLowerCase().includes(search.toLocaleLowerCase());
  });

  // Fonction pour liker ou retirer un like d'un jeu
  const handleLike = (gameId: number) => {
    setLikedGames((prevLikedGames) => {
      if (prevLikedGames.includes(gameId)) {
        return prevLikedGames.filter(id => id !== gameId);
      } else {
        return [...prevLikedGames, gameId];
      }
    });
  };

  // Fonction pour obtenir le dernier jeu liké
  const getLastLikedGame = () => {
    if (likedGames.length === 0) return null;
    const lastLikedGameId = likedGames[likedGames.length - 1];
    return Games.find(game => game.id === lastLikedGameId);
  };

  // Fonction pour obtenir des jeux recommandés
  const getRecommendedGame = () => {
    const lastLikedGame = getLastLikedGame();
    if (!lastLikedGame) return null;

    return Games.filter(game =>
      game.genre === lastLikedGame.genre && !likedGames.includes(game.id)
    );
  };

  const recommendedGames = getRecommendedGame();

  return (
    <>
      <nav>
        <h1>GameList</h1>
        <input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          type="text"
          placeholder="Cherche un jeu"
        />
      </nav>

      <div
        id="Main-container"
        className={recommendedGames && recommendedGames.length > 0 ? 'has-recommendations' : 'no-recommendations'}
      >
        <section id='Game-list'>
          {gameFiltered.map((game) => {
            const isLiked = likedGames.includes(game.id);
            return (
              <div key={game.id}>
                <GameCard game={game} />
                <button 
                  onClick={() => handleLike(game.id)}
                  className={isLiked ? "liked" : ""}
                >
                  {isLiked ? "Retirer le like" : "Aimer ce jeu"}
                </button>
              </div>
            );
          })}
        </section>

        {recommendedGames && recommendedGames.length > 0 && (
          <section id='Recommended'>
            <h2>Recommandation :</h2>
            {recommendedGames.map((game) => (
              <div key={game.id}>
                <GameCard game={game} />
                <button 
                  onClick={() => handleLike(game.id)}
                  className={likedGames.includes(game.id) ? "liked" : ""}
                >
                  {likedGames.includes(game.id) ? "Retirer le like" : "Aimer ce jeu"}
                </button>
              </div>
            ))}
          </section>
        )}
      </div>
      <footer>
        <p>GameList™</p>
        <p>2025</p>
      </footer>
    </>
  );
}

export default App;
