export class BingoCard {
	private card: number[][];
	
	static parseStringToCard(str: string) {
		return str
			.trim()
			.split("\n")
			.map((line) => {
				return line
					.trim()
					.split(/\s+/)
					.map((item) => parseInt(item, 10));
			});
	}

	constructor(input: string) {
		this.card = BingoCard.parseStringToCard(input);
	}

	getCard(): number[][] {
		return this.card;
	}
}
