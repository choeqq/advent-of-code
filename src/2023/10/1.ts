import * as fs from 'fs';

const input = fs.readFileSync('input.txt', 'utf8');
const inputArray = input.split('\n');

let X = 1;
let cycle = 1;
let rowNum = 0;
let isExecuting = false;

const cyclesOfInterest = [20, 60, 100, 140, 180, 220];
let signalSum = 0;

const getSignalStrength = (cycle: number, X: number) => X * cycle;

while (rowNum < inputArray.length) {
	const [first, second] = inputArray[rowNum].split(' ');

	// calculate signal strength if we are at a cycle of interest.
	if (cyclesOfInterest.includes(cycle)) {
		const signalStrength = getSignalStrength(cycle, X);
		signalSum += signalStrength;
	}

	// If we are in execution mode, add instruction value to X register,
	// reset execution mode toggle, and advance to next instruction
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

	cycle++;
}

console.log(`Signal sum: ${signalSum}`);
