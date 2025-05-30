import { Component } from '@angular/core';

// PUBLIC_INTERFACE
@Component({
  selector: 'app-tic-tac-toe',
  templateUrl: './tic-tac-toe.component.html',
  styleUrl: './tic-tac-toe.component.css',
  standalone: true
})
export class TicTacToeComponent {
  board: Array<('X' | 'O' | null)[]> = [];
  currentPlayer: 'X' | 'O' = 'X';
  winner: 'X' | 'O' | 'draw' | null = null;
  moves: number = 0;

  constructor() {
    this.resetGame();
  }

  // PUBLIC_INTERFACE
  resetGame(): void {
    /** Resets board state and variables for a new game. */
    this.board = Array(3).fill(null).map(() => Array(3).fill(null));
    this.currentPlayer = 'X';
    this.winner = null;
    this.moves = 0;
  }

  // PUBLIC_INTERFACE
  handleClick(row: number, col: number): void {
    /** Handles cell clicks: marks, flips turn, checks for win/draw if game ongoing. */
    if (this.board[row][col] || this.winner) return;

    this.board[row][col] = this.currentPlayer;
    this.moves++;
    if (this.checkWinner(row, col)) {
      this.winner = this.currentPlayer;
    } else if (this.moves === 9) {
      this.winner = 'draw';
    } else {
      this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
    }
  }

  // PUBLIC_INTERFACE
  getCellAccessibleLabel(row: number, col: number): string {
    /** Provides an accessible label for each cell. */
    const cell = this.board[row][col];
    if (cell) {
      return `Cell ${row + 1}, ${col + 1}, ${cell}`;
    } else {
      return `Cell ${row + 1}, ${col + 1}, empty`;
    }
  }

  // PUBLIC_INTERFACE
  checkWinner(row: number, col: number): boolean {
    /**
     * Checks all directions from the last move for win condition (horizontal, vertical, diagonal).
     */
    const player = this.currentPlayer;
    // Check row
    if (this.board[row].every(cell => cell === player)) return true;
    // Check column
    if ([0, 1, 2].every(r => this.board[r][col] === player)) return true;
    // Diagonal \
    if (row === col && [0, 1, 2].every(i => this.board[i][i] === player)) return true;
    // Diagonal /
    if (row + col === 2 && [0, 1, 2].every(i => this.board[i][2 - i] === player)) return true;
    return false;
  }
}
