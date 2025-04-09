

function GameCard({game}){
    return (
        <article>
            <h2>{game.title}</h2>
            <img src={game.image} alt={game.title}></img>
        </article>
    )
}
export default GameCard