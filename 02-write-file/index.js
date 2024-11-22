const path = require('path');
const fs = require('fs');

const { stdin, stdout } = process;
const filePath = path.join(__dirname, 'text.txt');

stdout.write('Hello! Write some data here: \n');

const output = fs.createWriteStream(filePath, 'utf-8');
stdin.on('data', (data) => {
  if (data.toString().trim() === 'exit') {
    process.exit();
  }
  output.write(data);
});

process.on('exit', () => stdout.write('Successfully saved to file!'));
