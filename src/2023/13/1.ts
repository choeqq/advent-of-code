import * as fs from 'fs';

const input = fs.readFileSync('input.txt', 'utf8');
const pairs = input.trim().split('\n\n');

const comparePackets = (a: number[] | number, b: number[] | number) => {
	// handle type mismatches
	if (Array.isArray(a) && typeof b === 'number') {
		b = [b];
	}
	if (typeof a === 'number' && Array.isArray(b)) {
		a = [a];
	}

	// base case
	// compare integers
	if (typeof a === 'number' && typeof b === 'number') {
		if (a < b) {
			return 1;
		} else if (a === b) {
			return 0;
		} else {
			return -1;
		}
	}

	// recursive case
	// compare arrays
	if (Array.isArray(a) && Array.isArray(b)) {
		let i = 0;
		while (i < a.length && i < b.length) {
			const result = comparePackets(a[i], b[i]);
			if (result === 1) {
				return 1;
			} else if (result === -1) {
				return -1;
			}
			i++;
		}
		if (i === a.length) {
			if (a.length === b.length) {
				return 0;
			} else {
				// left side packet (a) was smaller
				return 1;
			}
		}
		if (i === b.length) {
			// right side packet (b) was smaller
			return -1;
		}
	}
};

let result = 0;

pairs.forEach((pair, index) => {
	const splitPair = pair.split('\n');
	// use eval() and map each packet from string to javascript syntax
	const [packetA, packetB] = splitPair.map(eval, splitPair);
	if (comparePackets(packetA, packetB) === 1) {
		// packet pairs are 1-indexed
		result += index + 1;
	}
});

console.log({ result });
