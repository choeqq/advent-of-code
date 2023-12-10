import * as fs from 'fs';

const input = fs.readFileSync('input.txt', 'utf8');
const [instructions, ...lines_] = input.trim().split('\n\n');

const orders = instructions.split('');
const lines = new Map(
	lines_
		.join('')
		.split('\n')
		.map((line) => {
			const [key, value] = line.split(' = ');
			return [key, value.slice(1, -1).split(', ')] as [string, string[]];
		}),
);

const currentKey = [...lines.keys()].filter((key) => key[2] === 'A');

const solve = (key: string) => {
	let steps = 0;
	let currentKey = key;

	while (currentKey[2] !== 'Z') {
		const order = orders[steps % orders.length];
		currentKey = lines.get(currentKey)[order === 'L' ? 0 : 1];
		steps++;
	}

	return steps;
};

const gcd = (a: number, b: number): number => (b ? gcd(b, a % b) : a);
const lcm = (a: number, b: number): number => (a * b) / gcd(a, b);

console.log(currentKey.map(solve).reduce(lcm));
