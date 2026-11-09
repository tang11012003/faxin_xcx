const fs = require('fs');

// 1. Clean project_detail.html
let detailHtml = fs.readFileSync('d:/Desktop/发薪竞品分析/project_detail.html', 'utf8');
detailHtml = detailHtml.replace(/function handlePayAction\(\) \{[\s\S]*?\}/, 'function handlePayAction() {\n      window.location.href = "pay_salary.html";\n    }');
detailHtml = detailHtml.replace(/showToast\([^)]*\);?/g, '');
detailHtml = detailHtml.replace(/<div class="toast-overlay" id="toast">[\s\S]*?<\/div>/g, '');
detailHtml = detailHtml.replace(/function showToast\([^)]*\) \{[\s\S]*?\}/g, '');
fs.writeFileSync('d:/Desktop/发薪竞品分析/project_detail.html', detailHtml, 'utf8');
console.log('Cleaned project_detail.html');

// 2. Clean create_project.html
let createHtml = fs.readFileSync('d:/Desktop/发薪竞品分析/create_project.html', 'utf8');
createHtml = createHtml.replace(/function submitForm\(\) \{[\s\S]*?\}/, 'function submitForm() {\n      window.location.href = "project_detail.html";\n    }');
createHtml = createHtml.replace(/<div class="toast-overlay" id="toast">[\s\S]*?<\/div>/g, '');
fs.writeFileSync('d:/Desktop/发薪竞品分析/create_project.html', createHtml, 'utf8');
console.log('Cleaned create_project.html');

// 3. Clean project_info.html
let infoHtml = fs.readFileSync('d:/Desktop/发薪竞品分析/project_info.html', 'utf8');
infoHtml = infoHtml.replace(/function saveProjectChanges\(\) \{[\s\S]*?\}/, 'function saveProjectChanges() {\n      window.location.href = "project_detail.html";\n    }');
infoHtml = infoHtml.replace(/showToast\([^)]*\);?/g, '');
infoHtml = infoHtml.replace(/<div class="toast-popup" id="toast">[\s\S]*?<\/div>/g, '');
infoHtml = infoHtml.replace(/function showToast\([^)]*\) \{[\s\S]*?\}/g, '');
fs.writeFileSync('d:/Desktop/发薪竞品分析/project_info.html', infoHtml, 'utf8');
console.log('Cleaned project_info.html');
