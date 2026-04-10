const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, 'public');
if (!fs.existsSync(publicDir)) {
    console.error('No public dir found');
    process.exit(1);
}
const files = fs.readdirSync(publicDir).filter(f => f.endsWith('.html'));

files.forEach(file => {
    const filePath = path.join(publicDir, file);
    let content = fs.readFileSync(filePath, 'utf-8');

    // Remove prices
    content = content.replace(/<p class="price">.*?<\/p>\s*/g, '');
    content = content.replace(/<div class="price">.*?<\/div>\s*/g, '');

    // Replace Add to Cart
    content = content.replace(/<button class="add-to-cart".*?>.*?<\/button>/g, '<button class="contact-btn" onclick="window.location.href=\'contacto.html\'">Solicitar Información</button>');

    // Remove floating cart and containers
    content = content.replace(/<!-- Icono flotante del carrito -->[\s\S]*?<\/div>/g, '');
    content = content.replace(/<!-- Contenedor del carrito[\s\S]*?<\/span>/g, '');
    content = content.replace(/<script src="carrito\.js"><\/script>/g, '');

    // Add explicit Outfit font link to all pages
    if (!content.includes('fonts.googleapis.com/css2?family=Outfit')) {
        content = content.replace(/<\/head>/, '  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;800&display=swap" rel="stylesheet">\n</head>');
    }

    fs.writeFileSync(filePath, content, 'utf-8');
});

console.log('HTML files modified successfully.');
