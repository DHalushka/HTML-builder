const fs = require('fs/promises');
const path = require('path');

const directoryCopyPath = path.join(__dirname, 'assets');
const stylesCopyPath = path.join(__dirname, 'styles');
const componentsPath = path.join(__dirname, 'components');
const htmlTemplatePath = path.join(__dirname, 'template.html');
const projectDir = path.join(__dirname, 'project-dist');
const stylesPath = path.join(projectDir, 'style.css');
const htmlPath = path.join(projectDir, 'index.html');

async function generateHTML() {
  const templateContent = await fs.readFile(htmlTemplatePath, 'utf-8');
  let htmlContent = templateContent;
  const matches = templateContent.match(/{{\s*[\w-]+\s*}}/g) || [];
  for (const match of matches) {
    const tagName = match.replace(/{{\s*|\s*}}/g, '');
    const componentPath = path.join(componentsPath, `${tagName}.html`);
    try {
      const componentContent = await fs.readFile(componentPath, 'utf-8');
      htmlContent = htmlContent.replace(match, componentContent);
    } catch (err) {
      console.warn(`Component not found for tag: ${tagName}`);
    }
  }
  await fs.writeFile(htmlPath, htmlContent, 'utf-8');
  console.log('index.html has been updated!');
}

async function copyDir(source, destination) {
  try {
    await fs.mkdir(destination, { recursive: true });
    const entries = await fs.readdir(source, { withFileTypes: true });
    for (const entry of entries) {
      const sourcePath = path.join(source, entry.name);
      const destinationPath = path.join(destination, entry.name);
      if (entry.isDirectory()) {
        await copyDir(sourcePath, destinationPath);
      } else if (entry.isFile()) {
        await fs.copyFile(sourcePath, destinationPath);
      }
    }
  } catch (err) {
    console.error('Error copying directory:', err);
  }
}
async function mergeStyles() {
  try {
    await fs.mkdir(projectDir, { recursive: true });
    await fs.writeFile(stylesPath, '', 'utf-8');
    const files = await fs.readdir(stylesCopyPath, { withFileTypes: true });
    const cssFiles = files.filter(
      (file) => file.isFile() && path.extname(file.name) === '.css',
    );
    let mergedContent = '';
    for (const file of cssFiles) {
      const filePath = path.join(stylesCopyPath, file.name);
      const fileContent = await fs.readFile(filePath, 'utf-8');
      mergedContent += fileContent + '\n';
    }
    await fs.writeFile(stylesPath, mergedContent, 'utf-8');
    console.log('CSS files have been successfully merged!');
  } catch (err) {
    console.error('An error occurred while merging CSS files:', err);
  }
}

mergeStyles();
copyDir(directoryCopyPath, path.join(projectDir, 'assets'));
generateHTML();
