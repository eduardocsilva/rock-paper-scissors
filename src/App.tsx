import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import './App.css';
import rockImg from "./assets/rock.png"
import paperImg from "./assets/paper.png"
import scissorsImg from "./assets/scissors.png"

function App() {

    // Constants
    const HANDS = {
        rock: {
            "desc": "rock",
            "img": rockImg
        },
        paper: {
            "desc": "paper",
            "img": paperImg
        },
        scissors: {
            "desc": "scissors",
            "img": scissorsImg
        }
    };

    // State
    const [game, setGame] = useState({
        started: false,
        playingRound: false,
        roundWinner: "none",
        gameOver: false,
        score: {
            player: 0,
            computer: 0
        },
        hands: {
            player: HANDS.rock,
            computer: HANDS.rock
        }
    });

    // Methods
    const startGame = async () => setGame({ ...game, started: true });

    const playRound = (playerHand: any) => {
        const computerHand = determineComputerHand();
        const roundWinner = determineRoundWinner(playerHand, computerHand);
        const newScore = determineNewScore(roundWinner);
        updateGame(roundWinner, newScore, playerHand, computerHand);
    };

    const determineComputerHand = () => {
        // Generates a random hand for the computer (index between 0 and 2)
        const computerHandIndex = Math.floor(Math.random() * 3);
        const computerHandKey = Object.keys(HANDS)[computerHandIndex];
        const computerHand = (HANDS as any)[computerHandKey];
        return computerHand;
    };

    const determineRoundWinner = (playerHand: any, computerHand: any) => {
        if (playerHand.desc === "rock") {
            if (computerHand.desc === "paper") return "computer";
            if (computerHand.desc === "scissors") return "player";
        }

        if (playerHand.desc === "paper") {
            if (computerHand.desc === "rock") return "player";
            if (computerHand.desc === "scissors") return "computer";
        }

        if (playerHand.desc === "scissors") {
            if (computerHand.desc === "rock") return "computer";
            if (computerHand.desc === "paper") return "player";
        }

        return "draw";
    };

    const determineNewScore = (roundWinner: string) => {
        let newScore: any = { ...game.score };

        // If the round wasn't a draw, increment the winner's score
        if (roundWinner !== "draw") {
            ++newScore[roundWinner];
        }

        return newScore;
    };

    const updateGame = (roundWinner: string, newScore: any, playerHand: any, computerHand: any) => {
        const newGame = {
            ...game,
            playingRound: true
        };

        setGame(newGame);

        // After 2 seconds, the round is complete
        setTimeout(() => setGame({
            ...newGame,
            score: newScore,
            roundWinner: roundWinner,
            playingRound: false,
            hands: {
                player: playerHand,
                computer: computerHand
            }
        }), 2000);
    };

    return (
        <section className="background">
            {
                !game.started ? (
                    <div className="fade">
                        <h1 className="mb-4">Rock Paper Scissors</h1>
                        <Button className="btn-primary" onClick={startGame}>Start Game</Button>
                    </div>
                ) : (
                    <div className="container fade">
                        <div className="scoreboard">
                            <div className="score">
                                <h1>Player</h1>
                                <h2>{game.score.player}</h2>
                            </div>
                            <div className="score">
                                <h1>Computer</h1>
                                <h2>{game.score.computer}</h2>
                            </div>
                        </div>
                        <div className="game">
                            {
                                (!game.playingRound ?
                                    (game.roundWinner === "player") ? (
                                        <h1 className="announcer">Player wins!</h1>
                                    ) : (game.roundWinner === "computer") ? (
                                        <h1 className="announcer">Computer wins!</h1>
                                    ) : (game.roundWinner === "draw") ? (
                                        <h1 className="announcer">It's a draw!</h1>
                                    ) : (
                                        <h1 className="announcer">Let the game begin!</h1>
                                    )
                                    : <h1 className="announcer">Rock, Paper, Scissors, go!</h1>)
                            }
                            <div className="hands">
                                <img className={"player-hand " + (!game.playingRound ? "" : "shake-player")}
                                    src={!game.playingRound ? game.hands.player.img : HANDS.rock.img}
                                    alt="Player hand" />
                                <img className={"computer-hand " + (!game.playingRound ? "" : "shake-computer")}
                                    src={!game.playingRound ? game.hands.computer.img : HANDS.rock.img}
                                    alt="Computer hand" />
                            </div>
                            <div className="options row">
                                <Button disabled={game.playingRound} className="col-sm-3 mb-4" onClick={() => playRound(HANDS.rock)}>Rock</Button>
                                <Button disabled={game.playingRound} className="col-sm-3 mb-4" onClick={() => playRound(HANDS.paper)}>Paper</Button>
                                <Button disabled={game.playingRound} className="col-sm-3 mb-4" onClick={() => playRound(HANDS.scissors)}>Scissors</Button>
                            </div>
                        </div>
                    </div>
                )
            }
        </section>
    );
}

export default App;
