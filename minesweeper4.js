const generatePlayerBoard = (numberOfRows, numberOfColumns) =>
{
	let board = [];	

	for (x = 0; x < numberOfRows; x++) {
		let row = [];
		
		for (y = 0; y < numberOfColumns; y++) {
			row.push(' ');
		}

		board.push(row);
	}

	return board;
}

const generateBombBoard = (numberOfRows, numberOfColumns, numberOfBombs) =>
{
	let board = [];	

	for (x = 0; x < numberOfRows; x++) {
		let row = [];
		
		for (y = 0; y < numberOfColumns; y++) {
			row.push(null);
		}

		board.push(row);
	}

	let numberOfBombsPlaced = 0;

	while (numberOfBombsPlaced < numberOfBombs) {

		let randomRowIndex = Math.floor(Math.random() * numberOfRows);
		let randomColumnIndex = Math.floor(Math.random() * numberOfColumns);

		if (board[randomRowIndex][randomColumnIndex] !== 'B') {
			board[randomRowIndex][randomColumnIndex] = 'B';
			numberOfBombsPlaced++;
		}

		// The code in this while loop has the potential to place bombs on top of already existing bombs. 
		//This will be fixed with control flow.
	}

	return board;
}

const getNumberOfNeighborBombs = (bombBoard, rowIndex, columnIndex) => 
{
	const neighborOffsets = [
	[-1,-1],
	[-1,0],
	[-1,1],
	[0,-1],
	[0,0],
	[0,1],
	[1,-1],
	[1,0]
	[1,1]
	];

	const numberOfRows = bombBoard.length;
	const numberOfColumns = bombBoard[0].length;
	let numberOfBombs = 0;

	neighborOffsets.forEach(offset => {
		const neighborRowIndex = rowIndex + offset[0];
		const neighborColumnIndex = columnIndex + offset[1];
		if (neighborRowIndex >= 0 && neighborRowIndex < numberOfRows && 
			neighborColumnIndex >= 0 && neighborColumnIndex < numberOfColumns) {
			if (bombBoard[neighborRowIndex][neighborColumnIndex] === 'B') { 
				numberOfBombs++;
			}
		}
	});

	return numberOfBombs;
}

const flipTile = (playerBoard, bombBoard, rowIndex, columnIndex) => 
{
	if (playerBoard[rowIndex][columnIndex] !== ' ') {
		console.log('This tile has already been flipped!');
		return;
	} else if (bombBoard[rowIndex][columnIndex] === 'B') {
		playerBoard[rowIndex][columnIndex] = 'B';
	} else {
		playerBoard[rowIndex][columnIndex] = getNumberOfNeighborBombs(bombBoard,rowIndex,columnIndex);
	}
}

const printBoard = board => 
{
	return board.map(row => row.join(' | ')).join('\n');
}

let playerBoard = generatePlayerBoard(3,4);
let bombBoard = generateBombBoard(3,4,5);
console.log('Player Board: \n' + printBoard(playerBoard));
console.log('Bomb Board: \n' + printBoard(bombBoard));
flipTile(playerBoard,bombBoard,0,0);
console.log('Updated Player Board: \n' + printBoard(playerBoard));
