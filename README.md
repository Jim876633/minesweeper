# Minesweeper Game 💣

This project is a Minesweeper game implemented using Vite + React.

💻 [Live Demo](https://jim876633.github.io/minesweeper/)

## Technologies Used

- Vite
- React
- Redux Toolkit
- TypeScript
- CSS Modules

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/Jim876633/minesweeper.git
```

2. install dependencies:

```bash
cd minesweeper
npm install
```

3. Run the application:

```bash
npm run dev
```

The app will be available at http://localhost:5173 by default.

## How to Play

1. **Reveal Cells:**

   - Click on a cell to reveal its content.
   - The number on a revealed cell indicates how many mines are adjacent to that cell.
   - If you reveal a cell with a mine, the game ends.

2. **Winning the Game:**

   - Successfully reveal all cells that do not contain mines to win the game.
   - Use the number clues to strategically deduce the locations of mines.

3. **Losing the Game:**

   - The game ends if you reveal a cell with a mine.
   - Be cautious and use logical deduction to avoid hitting mines.

4. **Changing Game Level:**
   - The Minesweeper game offers different difficulty levels:
     - **Easy:** 9x9 grid with 10 mines.
     - **Medium:** 16x16 grid with 40 mines.
     - **Hard:** 30x16 grid with 99 mines.
   - Adjust the game level according to your preference before starting a new game.

<!-- 5. **Flags:**
   - Right-click on a cell to place a flag if you suspect it contains a mine.
   - Placing a flag prevents accidentally revealing a mine. -->

<!-- 6. **Custom Mine Emoji:**
   - Enjoy a customized mine emoji for a personalized touch! -->

Good luck and have fun!

## Features

- [x] Basic Minesweeper functionality
- [ ] Responsive Web Design (RWD)
- [x] First step can't be a mine
- [ ] Ability to add flags
- [ ] Custom mine emoji

## Contributing

Feel free to contribute to the project. Fork the repository, make your changes, and submit a pull request.

## License

This Minesweeper game is open-source and available under the [MIT License](https://github.com/Jim876633/minesweeper/blob/main/LICENSE).
