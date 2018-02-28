const generatePlayerBoard = (numberOfRows, numberOfColumns) =>
{
	var board = [];	

	for (x = 0; x < numberOfRows; x++) {
		var row = [];
		
		for (y = 0; y < numberOfColumns; y++) {
			row.push(' ');
		}

		board.push(row);
	}

	return board;
}

const generateBombBoard = (numberOfRows, numberOfColumns, numberOfBombs) =>
{
	var board = [];	

	for (x = 0; x < numberOfRows; x++) {
		var row = [];
		
		for (y = 0; y < numberOfColumns; y++) {
			row.push(null);
		}

		board.push(row);
	}

	var numberOfBombsPlaced = 0;

	while (numberOfBombsPlaced != numberOfBombs) {

		var randomRowIndex = Math.floor(Math.random() * numberOfRows);
		var randomColumnIndex = Math.floor(Math.random() * numberOfColumns);

		board[randomRowIndex][randomColumnIndex] = 'B';
		numberOfBombsPlaced ++;

		// The code in this while loop has the potential to place bombs on top of already existing bombs. 
		//This will be fixed with control flow.
	}

	return board;
}

const printBoard = board => 
{
	return board.map(row => row.join(' | ')).join('\n');
}

let playerBoard = generatePlayerBoard(3,4);
let bombBoard = generateBombBoard(3,4,5);

console.log('Player Board: \n' + printBoard(playerBoard));
console.log('Bomb Board: \n' + printBoard(bombBoard));
