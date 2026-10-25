const fs = require('fs');
const path = require('path');

const srcMd = path.join(__dirname, 'MASH-VENTURES-SOURCE-CODE.md');
const content = fs.readFileSync(srcMd, 'utf8');

// The markdown format uses:
// ### `relative/path/to/file`
//
// ```extension
// file content
// ```

const regex = /### `([^`]+)`\r?\n\r?\n```[^\r\n]*\r?\n([\s\S]*?)\r?\n```/g;

let match;
let count = 0;
while ((match = regex.exec(content)) !== null) {
  const filePath = match[1].trim();
  const fileContent = match[2];
  const targetPath = path.join(__dirname, filePath);

  fs.mkdirSync(path.dirname(targetPath), { recursive: true });
  fs.writeFileSync(targetPath, fileContent, 'utf8');
  console.log(`Extracted: ${filePath}`);
  count++;
}

console.log(`Total files extracted: ${count}`);
