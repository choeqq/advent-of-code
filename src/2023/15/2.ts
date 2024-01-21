import * as fs from 'fs';

const input = fs.readFileSync('input.txt', 'utf8');
const inputArray = input.trim().split('\n');

function hash(string: string) {
	return string
		.split('')
		.map((char) => char.charCodeAt(0))
		.reduce((a, b) => ((a + b) * 17) % 256, 0);
}

const boxes = new Map<number, Map<string, number>>();

inputArray.forEach((word) => {
	const operator = word.includes('-') ? '-' : '=';
	const [label, focalStr] = word.split(/[-=]/);
	const focalLength = parseInt(focalStr);
	const boxId = hash(label);

	if (operator == '=') {
		const lenses = boxes.has(boxId)
			? boxes.get(boxId)
			: new Map<string, number>().set(label, focalLength);
		lenses.set(label, focalLength);
		boxes.set(boxId, lenses);
	} else {
		boxes.get(boxId)?.delete(label);
	}
});

let sum = 0;

boxes.forEach((box, boxId) => {
	let i = 0;
	box.forEach((focal) => {
		i++;
		sum += (boxId + 1) * i * focal;
	});
});

console.log(sum);
