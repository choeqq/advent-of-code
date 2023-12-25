import * as fs from 'fs';

const input = fs.readFileSync('input.txt', 'utf8');
const inputArray = input.split('\n');

let X = 1;
let cycle = 1;
let rowNum = 0;
let isExecuting = false;
let CRT = [];

while (rowNum < inputArray.length) {
	// first is instruction, second is value.
	const [first, second] = inputArray[rowNum].split(' ');

	if (isExecuting) {
		X += parseInt(second, 10);
		isExecuting = false;
		rowNum++;
	} else {
		if (first === 'noop') {
			rowNum++;
		}
		if (first === 'addx') {
			isExecuting = true;
		}
	}

	// define pixel positions of register.
	let registerRange = [X - 1, X, X + 1];

	// use cycle % 40 because register assume one line.
	if (registerRange.includes(cycle % 40)) {
		CRT.push('#');
	} else {
		CRT.push('.');
	}
	cycle++;
}

let strCRT = '';
const writeScreen = () => {
	for (let i = 0; i < cycle; i++) {
		if (i % 40 === 0) {
			strCRT += `\n${CRT[i]}`;
		} else {
			strCRT += `${CRT[i]}`;
		}
	}
};
writeScreen();
console.log(strCRT);
