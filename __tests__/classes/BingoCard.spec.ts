import { BingoCard } from "../../src/classes/BingoCard";

const basicBingoCard = `
1 2 3
4 5 6
7 8 9
`;

describe("BingoCard", () => {
	it("should correctly parse the input string and create a card", () => {
		const card = new BingoCard(basicBingoCard);
		expect(card.getCard()).toEqual([
			[1, 2, 3],
			[4, 5, 6],
			[7, 8, 9],
		]);
	});

	it("should correctly handle different input strings and create cards with the correct height and width", () => {
		const input1 = `
			1 2
			3 4
		`;
		const card1 = new BingoCard(input1);
		expect(card1.getCard()).toEqual([
			[1, 2],
			[3, 4],
		]);
		expect(card1.getWidth()).toBe(2);
		expect(card1.getHeight()).toBe(2);

		const input2 = `
			1 2 3 4
			5 6 7 8
			9 10 11 12
		`;
		const card2 = new BingoCard(input2);
		expect(card2.getCard()).toEqual([
			[1, 2, 3, 4],
			[5, 6, 7, 8],
			[9, 10, 11, 12],
		]);
		expect(card2.getWidth()).toBe(4);
		expect(card2.getHeight()).toBe(3);
	});

	it("should correctly indicate a column win", () => {
		const card = new BingoCard(basicBingoCard);
		const result = card.callNumbers([1, 4, 7]);
		expect(result).toEqual({ bingo: true, numCalls: 3 });
	});

	it("should correctly indicate a row win", () => {
		const card = new BingoCard(basicBingoCard);
		const result = card.callNumbers([1, 2, 3]);
		expect(result).toEqual({ bingo: true, numCalls: 3 });
	});

	it("should correctly indicate a card has not won", () => {
		const card = new BingoCard(basicBingoCard);
		const result = card.callNumbers([1, 5, 9]);
		expect(result).toEqual({ bingo: false, numCalls: -1 });
	});
});
