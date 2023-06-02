/**
 * Splits a string into blocks based on empty lines. Discards any empty strings.
 * @param {string} str - The input string to split.
 * @returns {string[]} An array of blocks split from the input string.
 */
export function splitStringByEmptyLine(str: string) {
	return str.split(/\n\s*\n/).filter((block) => block.trim().length > 0);
}
