import * as fs from 'fs';

const input = fs.readFileSync('input.txt', 'utf-8');
const inputArray = input.trim().split('\n');

const max: Record<string, number> = {
	red: 12,
	green: 13,
	blue: 14,
};

const sum = inputArray.reduce((acc, line) => {
	const [gameid, draws] = line.split(': ');
	const id = parseInt(gameid.split(' ')[1]);

	return draws.split(/; /g).some((subsets) =>
		subsets.split(/, /g).some((subset) => {
			const [num, color] = subset.trim().split(' ');
			return parseInt(num) > max[color];
		}),
	)
		? acc
		: acc + id;
}, 0);

console.log(sum);
