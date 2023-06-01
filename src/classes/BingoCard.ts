export class BingoCard {
	private card: number[][];
	private width: number;
	private height: number;

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
		this.width = this.card[0]?.length || 0;
		this.height = this.card.length;
	}

	getCard(): number[][] {
		return this.card;
	}

	getWidth(): number {
		return this.width;
	}

	getHeight(): number {
		return this.height;
	}
}
