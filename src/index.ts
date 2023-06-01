import { BingoCard } from "./classes/BingoCard";
import { splitStringByEmptyLine } from "./utils/splitStringByEmptyLine";

const input = `
7,4,9,5,11,17,23,2,0,14,21,24,10,16,13,6,15,25,12,22,18,20,8,19,3,26,1

22 13 17 11 0
8 2 23 4 24
21 9 14 16 7
6 10 3 18 5
1 12 20 15 19
`;

export function main(input: string) {
	const [calledStr, cardStr] = splitStringByEmptyLine(input);
	const numbersToCall = calledStr.split(",").map((x) => parseInt(x, 10));
	const card = new BingoCard(cardStr);
	const result = card.callNumbers(numbersToCall);
	console.log(result);
}

main(input);
