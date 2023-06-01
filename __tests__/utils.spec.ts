import { splitStringByEmptyLine } from "../src/utils/splitStringByEmptyLine";

describe("splitStringByEmptyLine", () => {
	test("it splits the string by empty line", () => {
		const input = "Hello\n\nThere";
		const output = splitStringByEmptyLine(input);

		expect(output).toEqual(["Hello", "There"]);
	});

	test("it removes empty blocks", () => {
		const input = "Hello\n\n\nThere\n\n\n\n";
		const output = splitStringByEmptyLine(input);

		expect(output).toEqual(["Hello", "There"]);
	});

	test("it ignores blocks of whitespace", () => {
		const input = "Hello\n  \n\t \nThere";
		const output = splitStringByEmptyLine(input);

		expect(output).toEqual(["Hello", "There"]);
	});

	test("it returns an empty array for empty input", () => {
		const input = "";
		const output = splitStringByEmptyLine(input);

		expect(output).toEqual([]);
	});
});
