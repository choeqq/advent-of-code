import * as fs from 'fs';

const input = fs.readFileSync('input.txt', 'utf8');
const inputArray = input.trim().split('\n');

const [time, distance] = inputArray
	.map((line) => line.trim().split(': ')[1].trim().split(/\s+/).join(''))
	.map(Number);

const x = Math.floor((time - Math.sqrt(time ** 2 - 4 * distance)) / 2);
const y = Math.floor((time + Math.sqrt(time ** 2 - 4 * distance)) / 2);
const count = y - x;

console.log(count);
