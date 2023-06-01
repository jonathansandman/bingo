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
});
