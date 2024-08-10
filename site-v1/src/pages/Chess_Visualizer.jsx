import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Chess_Visualizer.css';

const pieceImages = {
  'P': '/images/white-pawn.png',
  'R': '/images/white-rook.png',
  'N': '/images/white-knight.png',
  'B': '/images/white-bishop.png',
  'Q': '/images/white-queen.png',
  'K': '/images/white-king.png',
  'p': '/images/black-pawn.png',
  'r': '/images/black-rook.png',
  'n': '/images/black-knight.png',
  'b': '/images/black-bishop.png',
  'q': '/images/black-queen.png',
  'k': '/images/black-king.png'
};

const initialBoard = [
  ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
  ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
  [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
  [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
  [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
  [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
  ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
  ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R']
];

function Chess_Visualizer() {
  const [board, setBoard] = useState(initialBoard);
  const [prediction, setPrediction] = useState('');

  const fetchPrediction = async () => {
    const response = await axios.get('http://localhost:8000/generate');
    setPrediction(response.data.result);
  };

  useEffect(() => {
    fetchPrediction();
  }, []);

  var moveList = " " + prediction + " ";
  var moveNumber = 1;
  var hasMoves = true;

  console.log(moveList);

  const makeMove = () => {

  }

  const undoMove = () => {

  }

  // const fetchMove = async () => {
  //     try {
  //         const response = await axios.get('http://localhost:5000/get_move');
  //         const move = response.data.move;
  //         if (move) {
  //             makeMove(move.from, move.to);
  //         }
  //     } catch (error) {
  //         console.error('Error fetching move:', error);
  //     }
  // };

  // const makeMove = (from, to) => {
  //     const fromRow = 8 - parseInt(from[1], 10);
  //     const fromCol = from.charCodeAt(0) - 'a'.charCodeAt(0);
  //     const toRow = 8 - parseInt(to[1], 10);
  //     const toCol = to.charCodeAt(0) - 'a'.charCodeAt(0);

  //     const newBoard = board.map(row => [...row]);
  //     newBoard[toRow][toCol] = newBoard[fromRow][fromCol];
  //     newBoard[fromRow][fromCol] = ' ';
  //     setBoard(newBoard);
  // };

  return (
    <div className="container">
      <div className="chessboard">
        {board.map((row, rowIndex) => (
          <div key={rowIndex} className="row">
            {row.map((square, colIndex) => (
              <div key={colIndex} className={`square ${(rowIndex + colIndex) % 2 === 0 ? 'white' : 'black'}`}>
                {square !== ' ' && <img src={pieceImages[square]} alt={square} className="piece" />}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="info">
        <h2>Generated Result</h2>
        <p>{moveList}</p>
        <button onClick={undoMove} className="previous-move-button">Previous Move</button>
        <button onClick={makeMove} className="next-move-button">Next Move</button>
      </div>
    </div>
  );
};


export default Chess_Visualizer