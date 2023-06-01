interface IBingoResult {
	bingo: boolean;
	numCalls: number;
	cardState: string[][];
}

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

	private checkHasBingo(calledNumbers: Set<number>): boolean {
		for (let rowIndex = 0; rowIndex < this.height; rowIndex++) {
			if (this.card[rowIndex].every((num) => calledNumbers.has(num))) {
				return true;
			}
		}

		for (let colIndex = 0; colIndex < this.height; colIndex++) {
			if (this.card.every((row) => calledNumbers.has(row[colIndex]))) {
				return true;
			}
		}

		return false;
	}

	callNumbers(numbers: number[]): IBingoResult {
		const calledNumbers = new Set<number>();
		for (let i = 0; i < numbers.length; i++) {
			calledNumbers.add(numbers[i]);
			if (this.checkHasBingo(calledNumbers)) {
				return {
					bingo: true,
					numCalls: i + 1,
					cardState: this.getCardState(calledNumbers),
				};
			}
		}
		return {
			bingo: false,
			numCalls: -1,
			cardState: this.getCardState(calledNumbers),
		};
	}

	private getCardState(calledNumbers: Set<number>): string[][] {
		return this.card.map((row) =>
			row.map((num) => (calledNumbers.has(num) ? num.toString() : "-"))
		);
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
