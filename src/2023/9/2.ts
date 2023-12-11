import * as fs from 'fs';

const input = fs.readFileSync('input.txt', 'utf8');
const inputArray = input.trim().split('\n');

const getValues = (line: number[]) =>
	line.map((val, i, arr) => arr[i + 1] - val).slice(0, -1);

const sum = inputArray
	.map((line) => line.split(' ').map(Number))
	.reduce((acc, line) => {
		const list = [line[0]];
		let val = line;

		do {
			val = getValues(val);
			list.push(val[0]);
		} while (!val.every((v) => v === val[0]));

		const toAdd = list
			.reverse()
			.reduce(
				(listAcc, current, i) => (i === 0 ? current : current - listAcc),
				0,
			);

		return acc + toAdd;
	}, 0);

console.log(sum);
