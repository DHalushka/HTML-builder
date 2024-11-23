const fs = require('fs/promises');
const path = require('path');

const copyPath = path.join(__dirname, 'files');

async function copyDir() {
  try {
    const destinationPath = path.join(__dirname, 'files-copy');
    await fs.mkdir(destinationPath, { recursive: true });

    const existingFiles = await fs.readdir(destinationPath);
    for (const file of existingFiles) {
      await fs.rm(path.join(destinationPath, file), { force: true });
    }
    const files = await fs.readdir(copyPath);

    for (const file of files) {
      const sourceFile = path.join(copyPath, file);
      const destinationFile = path.join(destinationPath, file);
      await fs.copyFile(sourceFile, destinationFile);
    }

    console.log('All files copied successfully!');
  } catch (err) {
    console.error('Error copying files:', err);
  }
}

copyDir();
