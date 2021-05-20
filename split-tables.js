let {table, tableGroup} = require('./tables/giddy-tables.json');

const { writeFile } = require('fs');
const { join } = require('path');

const parseTable = ({ caption, rows, name }) => {
	const filename = `${name.replace(/\s'";:/g, '').toLowerCase()}.js`;
	console.log('Writing ', filename);
	path = join(__dirname, 'tables', filename);
	writeFile(path,
		`module.exports = ${JSON.stringify({ caption, rows, name }, null, '\t')};`, () => { console.log('Finished ', filename)});
};

const parseTableGroup = ({ name, tables, page, type }) => {
	let trueTables = tables.filter(({ type }) => type === 'table' );
	let subGroups = tables.filter(({ type }) => type === 'tableGroup' );

	trueTables.forEach(parseTable);
	subGroups.forEach(parseTableGroup);
};

table.forEach(parseTable);

tableGroup.forEach(parseTableGroup);
