import * as fs from 'fs';

const input = fs.readFileSync('input.txt', 'utf8');
const inputArray = input.trim().split('\n');

const sum = (input: string[]) => {
	let total = 0;
	const initLines = input;
	const lines = input;

	const countCardWins = (numbers: string) => {
		let wins = 0;

		const [winningNumbers, betNums] = [
			numbers
				.split(' | ')[0]
				.split(' ')
				.map((n) => Number(n)),
			numbers
				.split(' | ')[1]
				.split(' ')
				.map((n) => Number(n)),
		];

		betNums.forEach((betNum) => {
			if (winningNumbers.indexOf(betNum) !== -1 && betNum !== 0) {
				wins++;
			}
		});

		return wins;
	};

	const recProcess = (lines: string[]) => {
		lines.forEach((line) => {
			total++;

			const [card, numbers] = line.split(': ');
			const cardNum = card.match(/\d+/g)[0];

			const cardWins = countCardWins(numbers);
			const sliceTo = Number(cardNum) + cardWins;

			if (cardWins > 0) {
				recProcess(initLines.slice(Number(cardNum), sliceTo));
			}
		});
	};

	recProcess(lines);

	console.log('running!');

	return total;
};

console.log(sum(inputArray));
