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

	callNumbers(numbers: number[]): boolean {
		const calledNumbers = new Set<number>();
		for (let i = 0; i < numbers.length; i++) {
			calledNumbers.add(numbers[i]);
			if (this.checkHasBingo(calledNumbers)) {
				return true
			}
		}
		return false;
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
