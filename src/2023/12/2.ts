import * as fs from 'fs';

const input = fs.readFileSync('input.txt', 'utf8');
const rows = input.trim().split('\n');

const START_CHAR = 'E';
const END_CHAR = 'S';

const chars: string[][] = [];
const visited: boolean[][] = [];

rows.forEach((row) => {
	chars.push(row.split(''));
	const visitRow: boolean[] = [];
	row.split('').map(() => visitRow.push(false));
	visited.push(visitRow);
});

const directions: number[][] = [
	[1, 0],
	[-1, 0],
	[0, 1],
	[0, -1],
];

let start = [0, 0];
let end = [0, 0];
chars.forEach((row, i) => {
	row.forEach((ele, j) => {
		if (ele === END_CHAR) {
			end = [i, j];
		}
		if (ele === START_CHAR) {
			start = [i, j];
		}
	});
});

const elevationAlphabet = 'abcdefghijklmnopqrstuvwxyz';
chars[start[0]][start[1]] = 'z';
chars[end[0]][end[1]] = 'a';

const Q: number[][] = [[start[0], start[1], 0]];

while (Q.length > 0) {
	const curr = Q.shift();
	if (!curr) break;
	for (const direction of directions) {
		const currRow = curr[0];
		const currCol = curr[1];
		const nextRow = currRow + direction[0];
		const nextCol = currCol + direction[1];

		if (
			nextRow < 0 ||
			nextCol < 0 ||
			nextRow >= chars.length ||
			nextCol >= chars[0].length
		) {
			continue;
		}

		// check that we haven't visited this location
		if (visited[nextRow][nextCol]) {
			continue;
		}

		// check that the next location is a valid elevation change
		const currElevation = elevationAlphabet.indexOf(chars[currRow][currCol]);
		const nextElevation = elevationAlphabet.indexOf(chars[nextRow][nextCol]);
		if (nextElevation - currElevation < -1) {
			continue;
		}

		// check if we've reached the end
		if (nextRow === end[0] && nextCol === end[1]) {
			console.log('PART 2 : ', curr[2]); // Remove + 1 for PART 2
			break;
		}
		visited[nextRow][nextCol] = true;
		Q.push([nextRow, nextCol, curr[2] + 1]);
	}
}
