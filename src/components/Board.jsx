import { useState } from 'react';
import Square from './Square';

export default function Board() {
    const [history, setHistory] = useState(Array(9).fill(null));
    const [currentMove, setCurrentMove] = useState(0);
    const currentSquares = history[currentMove] || Array(9).fill(null);
    const isXNext = currentMove % 2 === 0;


    const winner = calculateWinner(currentSquares);
    const isBoardFull = currentSquares.every((square) => square !== null);
    const status = winner
        ? `Winner: ${winner}`
        : isBoardFull
            ? "It's a draw!"
            : `Next player: ${isXNext ? 'X' : 'O'}`;

    function handleClick(i) {
        if (currentSquares[i] || winner || isBoardFull) return;

        const nextSquares = currentSquares.slice();
        nextSquares[i] = isXNext ? 'X' : 'O';
        const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
        setHistory(nextHistory);
        setCurrentMove(nextHistory.length - 1);
    };

    function handleRestart() {
        setHistory(Array(9).fill(null));
        setCurrentMove(0);
    };

    function jumpTo(move) {
        setCurrentMove(move);
    };

    const moves = history.map((squares, move) => {
        const description = move > 0 ? `Go to move #${move}` : 'Go to game start';
        return (
            <li key={move}>
                <button onClick={() => jumpTo(move)}>{description}</button>
            </li>
        );
    });


    return (
        <>
            <div className='game'>
                <div className="status">{status}</div>
                <div className='board'>
                    <div className="board-row">
                        <Square value={currentSquares[0]} onSquareClick={() => handleClick(0)} />
                        <Square value={currentSquares[1]} onSquareClick={() => handleClick(1)} />
                        <Square value={currentSquares[2]} onSquareClick={() => handleClick(2)} />
                    </div>
                    <div className="board-row">
                        <Square value={currentSquares[3]} onSquareClick={() => handleClick(3)} />
                        <Square value={currentSquares[4]} onSquareClick={() => handleClick(4)} />
                        <Square value={currentSquares[5]} onSquareClick={() => handleClick(5)} />
                    </div>
                    <div className="board-row">
                        <Square value={currentSquares[6]} onSquareClick={() => handleClick(6)} />
                        <Square value={currentSquares[7]} onSquareClick={() => handleClick(7)} />
                        <Square value={currentSquares[8]} onSquareClick={() => handleClick(8)} />
                    </div>
                </div>
                <button className="restart-button" onClick={handleRestart}>
                    Restart Game
                </button>
            </div>    
            <div className="game-info">
                <ol>{moves}</ol>
            </div>
            
        </>
    );
}
function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    for (let line of lines) {
        const [a, b, c] = line;
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}