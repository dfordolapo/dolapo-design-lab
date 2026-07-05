import fs from 'fs';
const content = fs.readFileSync('src/components/CaseStudyViewer.jsx', 'utf-8');
const newContent = content.replace(/<img /g, '<img loading="lazy" ');
fs.writeFileSync('src/components/CaseStudyViewer.jsx', newContent, 'utf-8');
console.log('Replaced');
