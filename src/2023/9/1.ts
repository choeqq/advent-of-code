import * as fs from 'fs';

const input = fs.readFileSync('input.txt', 'utf8');
const inputArray = input.trim().split('\n');

const getValues = (line: number[]) =>
	line.map((val, i, arr) => arr[i + 1] - val).slice(0, -1);

const sum = inputArray
	.map((line) => line.split(' ').map(Number))
	.reduce((acc, line) => {
		const list = [line[line.length - 1]];
		let val = line;

		do {
			val = getValues(val);
			list.push(val[val.length - 1]);
		} while (!val.every((v) => v === val[0]));

		return acc + list.reverse().reduce((acc, val) => acc + val, 0);
	}, 0);

console.log(sum);
