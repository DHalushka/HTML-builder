const path = require('path');
const fs = require('fs');

const filePath = path.join(__dirname, 'text.txt');
const readableStream = fs.createReadStream(filePath, 'utf-8');

readableStream.on('data', (chunk) => console.log(chunk));
