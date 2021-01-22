import fs from 'fs';
import csvWriter from 'csv-write-stream';

export function writeData(data) {
	const {id, isCorrect } = data;
	const writer = csvWriter()
	writer.pipe(fs.createWriteStream('out.csv', {flags: 'a'}));
	writer.write(data);
	writer.end()
}