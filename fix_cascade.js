const fs = require('fs');

let html = fs.readFileSync('public/index.html', 'utf-8');
html = html.replace(/<link rel="stylesheet" href="index\.css" \/>\r?\n?/g, '');
html = html.replace(/(<\/head>)/i, '  <link rel="stylesheet" href="index.css" />\n$1');
fs.writeFileSync('public/index.html', html);

let css = fs.readFileSync('public/index.css', 'utf-8');
css = css.replace(/width: 270px;\s*height: 350px;/g, 'width: 270px !important; height: 350px !important;');
css = css.replace(/width: 280px;\s*height: 350px;/g, 'width: 280px !important; height: 350px !important;');
// Garantizando el height y padding
css = css.replace(/height: 55%; object-fit: contain; padding: 30px;/g, 'height: 55% !important; object-fit: contain !important; padding: 30px !important;');
fs.writeFileSync('public/index.css', css);
console.log('Cascade fixed.');
