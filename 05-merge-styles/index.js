const fs = require('fs');
const promises = require('fs/promises');
const path = require('path');

const copyPath = path.join(__dirname, 'styles');
const destinationPath = path.join(__dirname, 'project-dist', 'bundle.css');

async function mergeStyles() {
  try {
    const files = await promises.readdir(copyPath, { withFileTypes: true });
    for (const file of files) {
      if (file.isFile() && path.extname(file.name).slice(1) === 'css') {
        try {
          let mergedContent = '';
          const fileContent = fs.readFileSync(
            path.join(file.path, file.name),
            'utf-8',
          );
          mergedContent += fileContent;
          fs.writeFileSync(destinationPath, mergedContent);
        } catch (err) {
          console.error(err);
        }
      }
    }
  } catch {
    console.log('error');
  }
}
mergeStyles();
