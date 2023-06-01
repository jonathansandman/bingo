export function splitStringByEmptyLine(str: string) {
	return str.split(/\n\s*\n/).filter((block) => block.trim().length > 0);
}
