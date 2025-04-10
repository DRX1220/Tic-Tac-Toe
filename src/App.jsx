import { useState } from "react";
import "./App.css"

/*每一个小格子，点击'X'*/
/*接收value值和点击事件*/
/*Square组件*/
function Square({value,onSquareClick}){
  return (
    <button className='square' onClick={onSquareClick}>{value}</button>
  );
} 

/*接受值是'X'还是'O'*/
function Board({ xIsNext, squares, onPlay }) {

  /*点击事件*/
    function handleClick(i) {
      /*是否已经出现赢家*/
      if (squares[i] || calculateWinner(squares)) {
    return;
  }
  /*将'X'和'O',每一次点击结果存入一个新的数组*/
    const nextSquares = squares.slice()
    /*判断*/
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    onPlay(nextSquares);
  }

  //打印出结果
  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  return (
    <div>
      <div className="board-row">
        <Square value={squares[1]} onSquareClick={() => handleClick(1)}/>
        <Square value={squares[2]} onSquareClick={() => handleClick(2)}/>
        <Square value={squares[3]} onSquareClick={() => handleClick(3)}/>
      </div>
       <div className="board-row">
        <Square value={squares[4]} onSquareClick={() => handleClick(4)}/>
        <Square value={squares[5]} onSquareClick={() => handleClick(5)}/>
        <Square value={squares[6]} onSquareClick={() => handleClick(6)}/>
      </div>
      <div className="board-row">
        <Square value={squares[7]} onSquareClick={() => handleClick(7)}/>
        <Square value={squares[8]} onSquareClick={() => handleClick(8)}/>
        <Square value={squares[9]} onSquareClick={() => handleClick(9)}/>
      </div>
    </div>
  );
}

/*计算赢家*/
function calculateWinner(squares) {
  /*八种获胜的可能*/
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

//渲染组件
function App(){
  //当前状态（value），以及使您更新它的功能（setValue）
  /*数组都设置为空*/
  const [history, setHistory] = useState([Array(9).fill(null)]);
  /*从0开始计数*/
  const [currentMove, setCurrentMove] = useState(0);
  /*实现'X'和'O'交换*/
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    /*从0开始，数组存放'X'还是'O'*/
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    /*加一*/
    setCurrentMove(nextHistory.length - 1);
  }

  /*跳转到当前状态*/
  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  /*遍历*/
  const moves = history.map((square, move) => {
    let description;
    if (move > 0) {
      description = 'Go to move #' + move;
    } else {
      description = 'Go to game start';
    }
    return (
      /*渲染列表*/
      <li key={move}>
      {/*点击触发事件撤回*/}
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

export default App;
