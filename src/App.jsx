import Board from './components/Board'; // Импортиране на Board компонента
import './App.css'

export default function App() {
  return (
    <div className="app">
      <h1>Tic-Tac-Toe</h1>
      <Board />
    </div>
  );
}