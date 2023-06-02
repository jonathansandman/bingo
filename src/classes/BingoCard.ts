/**
 * Represents the result of a Bingo game.
 * @interface
 */
interface IBingoResult {
	/** Whether 'Bingo!' was achieved. */
	bingo: boolean;
	/** The number of calls made before a bingo was achieved. Returns -1 if it won't win. */
	numCalls: number;
	/** The state of the Bingo card, where '-' indicates a number that wasn't called. */
	cardState: string[][];
}

export class BingoCard {
	/** The numbers on the Bingo card. */
	private card: number[][];
	/** The width of the Bingo card grid. */
	private width: number;
	/** The height of the Bingo card grid. */
	private height: number;

	/**
	 * Parses a string representation of a Bingo card into a 2D array of numbers.
	 * @param {string} str - The string representation of the Bingo card.
	 * @returns {number[][]} A grid of numbers representing a Bingo card.
	 * @static
	 */
	static parseStringToCard(str: string) {
		return str
			.trim()
			.split("\n")
			.map((line) => line.trim())
			.filter((line) => line.length > 0)
			.map((line) => {
				return line
					.trim()
					.split(/\s+/)
					.map((item) => parseInt(item, 10));
			});
	}

	/**
	 * Constructs a Bingo card instance.
	 * @param {string} input - The string representation of a Bingo card, as a space and line separated list of numbers.
	 */
	constructor(input: string) {
		this.card = BingoCard.parseStringToCard(input);
		this.width = this.card[0]?.length || 0;
		this.height = this.card.length;
	}

	/**
	 * Checks if a Bingo is achieved with the given set of called numbers.
	 * @param {Set<number>} calledNumbers - The set of called numbers.
	 * @returns {boolean} A boolean value indicating if a Bingo is achieved.
	 * @private
	 */
	private checkHasBingo(calledNumbers: Set<number>): boolean {
		for (let rowIndex = 0; rowIndex < this.height; rowIndex++) {
			if (this.card[rowIndex].every((num) => calledNumbers.has(num))) {
				return true;
			}
		}

		for (let colIndex = 0; colIndex < this.width; colIndex++) {
			if (this.card.every((row) => calledNumbers.has(row[colIndex]))) {
				return true;
			}
		}

		return false;
	}

	/**
	 * Calls a list of numbers and returns the Bingo result.
	 * @param {number[]} numbers - The list of numbers to call.
	 * @returns {IBingoResult} The Bingo result.
	 */
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

	/**
	 * Retrieves the final state of the Bingo card based on the called numbers.
	 * @param {Set<number>} calledNumbers - The set of called numbers.
	 * @returns {string[][]} The state of the Bingo card.
	 * @private
	 */
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
