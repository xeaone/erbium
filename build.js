const Muleify = require('muleify');
const Path = require('path');
const Util = require('util');
const Fs = require('fs');

const Read = Util.promisify(Fs.readFile);
const Write = Util.promisify(Fs.writeFile);

(async function () {

	const navBarDistPath = Path.join('nav-bar', 'dist', 'nav-bar.min.js');
	const navBarJsPath = Path.join(__dirname, 'nav-bar', 'src', 'index.js');
	const navBarCssPath = Path.join(__dirname, 'nav-bar', 'src', 'index.css');

	let navBarCssFile = await Read(navBarCssPath, 'utf8');
	let navBarJsFile = await Read(navBarJsPath, 'utf8');

	navBarCssFile = navBarCssFile.replace(/\/\/.*?/g, '');
	navBarCssFile = navBarCssFile.replace(/\n|\t/g, '');
	navBarCssFile = navBarCssFile.replace(/\/\*.*?\*\//g, '');
	navBarJsFile = navBarJsFile.replace('${sStyle}', navBarCssFile);

	Write(navBarDistPath, navBarJsFile);

	Muleify.pack(navBarDistPath, navBarDistPath, {
		minify: true
	});

}()).catch(console.error);
