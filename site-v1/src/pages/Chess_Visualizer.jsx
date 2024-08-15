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
  const current_move_Number = useRef(0)
  const board_states = useRef([initialBoard])

  const fetchPrediction = async () => {
    const response = await axios.get('http://localhost:8000/generate');
    setPrediction(response.data.result);
    console.log(response.data.result)
  };

  useEffect(() => {
    fetchPrediction();
  }, []);

  var moveList = " " + prediction + " ";
  var hasMoves = true;
  var separated_moves = moveList.split(" ");

  const makeMove = () => {
    var newBoard = board.map(row => [...row]);
    var move = separated_moves[current_move_Number.current];
    let x_destination2 = -1;
    let y_destination2 = -1;
    let x_start2 = -1;
    let y_start2 = -1;
    //ADD CHECKS FOR ILLEGAL MOVES (NONE AT THE MOMENT)
    if (current_move_Number.current < separated_moves.length - 1) {
      const newBoard = board.map(row => [...row]);
      const move = separated_moves[current_move_Number.current];
      current_move_Number.current += 1;
      let pieces_moved = 1;
      if (board_states.length - 1 >= current_move_Number.current) {
        setBoard(board_states[current_move_Number.current]);
      } else {
        if (move == "0-0-0") {
          pieces_moved += 1;
          if (current_move_Number.current % 2 == 0) {
            x_destination = 2;
            y_destination = 0;
            x_start = 4;
            y_start = 0;
            x_destination2 = 3;
            y_destination2 = 0;
            x_start2 = 0;
            y_start2 = 0;
          } else {
            x_destination = 2;
            y_destination = 7;
            x_start = 4;
            y_start = 7;
            x_destination2 = 3;
            y_destination2 = 7;
            x_start2 = 0;
            y_start2 = 7;
          }
        } else if (move == "0-0") {
          pieces_moved += 1;
          if (current_move_Number.current % 2 == 0) {
            x_destination = 6;
            y_destination = 0;
            x_start = 4;
            y_start = 0;
            x_destination2 = 5;
            y_destination2 = 0;
            x_start2 = 7;
            y_start2 = 0;
          } else {
            x_destination = 6;
            y_destination = 7;
            x_start = 4;
            y_start = 7;
            x_destination2 = 5;
            y_destination2 = 7;
            x_start2 = 7;
            y_start2 = 7;
          }
        } else {
          while(!(1 <= move[move.length-1] && move[move.length-1] <= 8)) {
            move = move.slice(0, -1);
          }
          destination_square = move.slice(-2);
          x_destination = destination_square.charCodeAt(1) - "1".charCodeAt(0);
          y_destination = destination_square.charCodeAt(0) - "a".charCodeAt(0);
          if (current_move_Number.current % 2 == 0) {
            piece_letter = move[0].toLowerCase();
          }
          if (move[0] == 'K') {
            for (let i = 0; i < 8; i++) {
              for (let j = 0; j < 8; j++) {
                if (board[i][j] == piece_letter) {
                  x_start = i;
                  y_start = j;
                }
              }
            }
          } else if (move[0] == 'Q') {
            for (let i = 0; i < 8; i++) {
              for (let j = 0; j < 8; j++) {
                if (board[i][j] == piece_letter) {
                  x_start = i;
                  y_start = j;
                }
              }
            }
          } else if (move[0] == 'R') {
            //add implementation for ambiguity of which rook
            let rooks = 0;
            for (let i = 0; i < 8; i++) {
              for (let j = 0; j < 8; j++) {
                if (board[i][j] == piece_letter) {
                  x_start = i;
                  y_start = j;
                  rooks += 1;
                  if (x_start == x_destination || y_start == y_destination) {
                    rooks += 1;
                  }
                }
              }
              if (knights >= 1) {
                break;
              }
            }
          } else if (move[0] == 'N') {
            //add implementation for ambiguity of which pawn
            let knights = 0;
            for (let i = 0; i < 8; i++) {
              for (let j = 0; j < 8; j++) {
                if (board[i][j] == piece_letter) {
                  x_start = i;
                  y_start = j;
                  knights += 1;
                  if ((Math.abs(x_destination-x_start) == 1 && 2 == Math.abs(y_destination - y_start)) || (Math.abs(x_destination-x_start) == 2 && 1 == Math.abs(y_destination - y_start))) {
                    knights += 1;
                  }
                }
              }
              if (knights >= 1) {
                break;
              }
            }
          } else if (move[0] == 'B') {
            let bishops = 0;
            for (let i = 0; i < 8; i++) {
              for (let j = 0; j < 8; j++) {
                if (board[i][j] == piece_letter) {
                  x_start = i;
                  y_start = j;
                  bishops += 1;
                  if (Math.abs(x_destination-x_start) == Math.abs(y_destination - y_start)) {
                    bishops += 1;
                  }
                }
              }
              if (bishops >= 1) {
                break;
              }
            }
          } else {
            //pawn move
            if (move.length == 2) {
              //direct pawn move, no other considerations
              if (current_move_Number.current % 2 == 0) {
                x_start = x_destination;
                y_start = y_destination - 1;
                if (board[x_start][y_start] == ' ') {
                  y_start -= 1;
                }
              } else {
                x_start = x_destination;
                y_start = y_destination + 1;
                if (board[x_start][y_start] == ' ') {
                  y_destination += 1;
                }
              }
            } else {
              //is a capture, move from one of the neighbouring files, check the first letter to decide which column
              y_start = move.charCodeAt(0) - 'a'.charCodeAt(0);
              if (current_move_Number.current % 2 == 0) {
                x_start = x_destination - 1;
              } else {
                x_start = x_destination + 1;
              }
            }
          }
        }
        newBoard[x_destination][y_destination] = newBoard[x_start][y_start];
        newBoard[x_start][y_start] = ' ';
        if (pieces_moved == 2) {
          newBoard[x_destination2][y_destination2] = newBoard[x_start2][y_start2];
          newBoard[x_start2][y_start2] = ' '; 
        }
        setBoard(newBoard);

        //push the new boardstate (to allow for undo)
        board_states.current.push(newBoard)
      }
    }
    console.log("made move successfully");
  }

  const undoMove = () => {
    if (current_move_Number.current > 0) {
      current_move_Number.current -= 1;
      setBoard(board_states.current[current_move_Number.current]);
    }
  }

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