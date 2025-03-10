import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  // Representation of the nine squares on the board
  squares: ('X' | 'O' | null)[];
  // Help us track whose turn it is
  xIsNext: boolean;
  // Will either be 'X', 'O', null, or undefined
  winner: 'X' | 'O' | null | undefined;

  ngOnInit() {
    this.newGame();
  }

  // Initialize the game
  newGame() {
    this.squares = Array(9).fill(null);
    this.winner = undefined;
    // X is the first player
    this.xIsNext = true;
  }

  // Identify the current player
  get player(): 'X' | 'O' {
    return this.xIsNext ? 'X' : 'O';
  }

  // Simulate a move
  makeMove(idx: number) {
    if (!this.squares[idx]) {
      // If the square is falsy, we fill it with the current player
      this.squares.splice(idx, 1, this.player);
      // We switch the player
      this.xIsNext = !this.xIsNext;
    }

    // We check if there is a winner
    this.winner = this.calculateWinner();
  }

  // Check if there is a winner
  calculateWinner(): 'X' | 'O' | null | undefined {
    // Define the winning combinations
    const lines: number[][] = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    // Loop through the winning combinations
    for (const [a, b, c] of lines) {
      // If the squares at the winning combination indexes are all equal and not falsy
      if (
        this.squares[a] &&
        this.squares[a] === this.squares[b] &&
        this.squares[a] === this.squares[c]
      ) {
        // Return the winner
        return this.winner ?? this.squares[a];
      }
    }
    // If there is no winner yet, return undefined, if it's a draw, return null
    return this.squares.includes(null) ? undefined : null;
  }
}
