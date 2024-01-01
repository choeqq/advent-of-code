import * as fs from 'fs';

const input = fs.readFileSync('input.txt', 'utf8');
const pairs = input.trim().split('\n\n');

const arr = [];

const comparePackets = (a: number[] | number, b: number[] | number) => {
	if (Array.isArray(a) && typeof b === 'number') {
		b = [b];
	}
	if (typeof a === 'number' && Array.isArray(b)) {
		a = [a];
	}

	if (typeof a === 'number' && typeof b === 'number') {
		if (a < b) {
			return 1;
		} else if (a === b) {
			return 0;
		} else {
			return -1;
		}
	}

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

pairs.forEach((pair) => {
	const splitPair = pair.split('\n');
	const [packetA, packetB] = splitPair.map(eval, splitPair);

	arr.push(packetA);
	arr.push(packetB);
});

arr.push([[2]]);
arr.push([[6]]);

arr.sort(comparePackets);
arr.reverse();

let indexOf2: number, indexOf6: number;

// get 1-indexed values for [[2]] and [[6]]
arr.forEach((packet, index) => {
	if (packet.toString() === '2') {
		indexOf2 = index + 1;
	}
	if (packet.toString() === '6') {
		indexOf6 = index + 1;
	}
});

console.log({ indexOf2 });
console.log({ indexOf6 });
console.log(indexOf2 * indexOf6);
