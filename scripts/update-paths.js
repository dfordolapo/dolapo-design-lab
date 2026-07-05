import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SRC_DIR = path.join(__dirname, '../src');

function replaceInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf-8');
  // First, replace all .png with .webp globally
  content = content.replace(/\.png/g, '.webp');
  
  // Revert specific files that couldn't be converted
  content = content.replace(/awwja-case-study\.webp/g, 'awwja-case-study.png');
  content = content.replace(/shiftsyncd-case-study\.webp/g, 'shiftsyncd-case-study.png');
  
  // Revert .jpg since we only searched for .png (wait, the convert script also checked for .jpg, but we didn't search for it. scan2supper-before.jpg was converted to .webp so replacing .jpg to .webp is good!)
  content = content.replace(/scan2supper-before\.jpg/g, 'scan2supper-before.webp');
  
  fs.writeFileSync(filePath, content, 'utf-8');
  console.log(`Updated ${filePath}`);
}

const filesToUpdate = [
  'utils/caseStudies.jsx',
  'styles/vault.css',
  'styles/global.css',
  'components/DepartmentSelect.jsx',
  'components/ElevatorScreen.jsx',
  'components/LoadingSequence.jsx',
  'components/TopBar.jsx',
  'components/WelcomeScreen.jsx'
];

for (const file of filesToUpdate) {
  const filePath = path.join(SRC_DIR, file);
  if (fs.existsSync(filePath)) {
    replaceInFile(filePath);
  } else {
    console.warn(`File not found: ${filePath}`);
  }
}
