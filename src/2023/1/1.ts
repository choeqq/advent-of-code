import * as fs from 'fs';

const input = fs.readFileSync('input.txt', 'utf-8');
const inputArray = input.split('\n');

const values = inputArray.map((line) => {
	const first = line.split('').find((item) => !isNaN(+item));
	const last = line
		.split('')
		.reverse()
		.find((item) => !isNaN(+item));

	return Number(first + last);
});

console.log(values.reduce((acc, cur) => acc + cur, 0));
