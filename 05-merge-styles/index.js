const fs = require('fs/promises');
const path = require('path');

const copyPath = path.join(__dirname, 'styles');
const destinationPath = path.join(__dirname, 'project-dist', 'bundle.css');

async function mergeStyles() {
  try {
    await fs.writeFile(destinationPath, '', 'utf-8');
    const files = await fs.readdir(copyPath, { withFileTypes: true });
    const cssFiles = files.filter(
      file => file.isFile() && path.extname(file.name) === '.css'
    );
    let mergedContent = '';
    for (const file of cssFiles) {
      const filePath = path.join(copyPath, file.name);
      const fileContent = await fs.readFile(filePath, 'utf-8');
      mergedContent += fileContent + '\n';
    }
    await fs.writeFile(destinationPath, mergedContent, 'utf-8');
    console.log('CSS files have been successfully merged!');
  } catch (err) {
    console.error('An error occurred while merging CSS files:', err);
  }
}

mergeStyles();
