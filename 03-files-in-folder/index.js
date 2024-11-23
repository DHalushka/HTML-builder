const fs = require('fs');
const path = require('path');

const folderPath = path.join(__dirname, 'secret-folder');

fs.readdir(folderPath, { withFileTypes: true }, (err, files) => {
  if (err) {
    return console.error(err);
  }
  files.forEach((file) => {
    if (file.isFile()) {
      const filePath = path.join(file.path, file.name);
      const ext = path.extname(file.name).slice(1);
      const name = path.basename(file.name, path.extname(file.name));
      fs.stat(filePath, (err, stats) => {
        if (err) {
          console.error(err);
        }
        console.log(`${name} - ${ext} - ${(stats.size / 1024).toFixed(2)}kb`);
      });
    }
  });
});
