const Path = require('path');
const Util = require('util');
const Fs = require('fs');

const Read = Util.promisify(Fs.readFile);
const Write = Util.promisify(Fs.writeFile);

(async function () {
	const path = Path.resolve(process.argv[2]);

	let data = await Read(path, 'utf8');

	data = data.replace(/\\n|\\t/g, '');

	Write(path, data);

}()).catch(console.error);
