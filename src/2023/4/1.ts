import * as fs from 'fs';

const input = fs.readFileSync('input.txt', 'utf8');
const inputArray = input.trim().split('\n');

const calculateCardPoints = (card: string): number => {
	const winningNumbers = new Set(
		card.split('|')[0].split(':')[1].trim().split(/\s+/).map(Number),
	);

	return card
		.split('|')[1]
		.trim()
		.split(' ')
		.map(Number)
		.reduce(
			(acc, curr) =>
				winningNumbers.has(curr) ? (acc === 0 ? 1 : acc * 2) : acc,
			0,
		);
};

const sum = inputArray.reduce(
	(acc, card) => acc + calculateCardPoints(card),
	0,
);

console.log(sum);
