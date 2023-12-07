import * as fs from 'fs';

const input = fs.readFileSync('input.txt', 'utf-8');
const inputArray = input.trim().split('\n');

const sum = inputArray.reduce((totalSum, line) => {
	const draws = line.split(': ')[1];
	const map = new Map<string, number>();

	for (const subsets of draws.split(/; /g)) {
		for (const subset of subsets.split(/, /g)) {
			const [nmbr, color] = subset.trim().split(' ');
			map.set(color, Math.max(map.get(color) ?? 0, Number(nmbr)));
		}
	}

	return totalSum + [...map.values()].reduce((acc, value) => acc * value, 1);
}, 0);

console.log(sum);
