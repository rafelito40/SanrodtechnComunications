const fs = require('fs');
const path = require('path');
const publicDir = path.join(__dirname, 'public');

// 1. Modificar HTMLs para WhatsApp
const files = fs.readdirSync(publicDir).filter(f => f.endsWith('.html'));
files.forEach(f => {
    let txt = fs.readFileSync(path.join(publicDir, f), 'utf-8');
    
    // Cambiar la acción del botón de la tarjeta
    txt = txt.replace(/onclick="window\.location\.href='contacto\.html'"/g, 'onclick="window.location.href=\'https://wa.me/18296232138?text=Hola,%20me%20gustaría%20solicitar%20información%20sobre%20sus%20productos.\'"');
    
    // Cambiar enlaces duros de flotantes y demás
    txt = txt.replace(/https:\/\/wa\.me\/18496232138/g, 'https://wa.me/18296232138');

    // Mover Google Font si no existe
    if (!txt.includes('Outfit')) {
        txt = txt.replace(/<\/head>/, '  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;800&display=swap" rel="stylesheet">\n</head>');
    }

    fs.writeFileSync(path.join(publicDir, f), txt);
});
console.log("HTMLs actualizados para WhatsApp.");

// 2. Modificar CSS para inyectar el Dark Premium theme sin dañar estructuras
function updateCSS(file) {
    const filePath = path.join(publicDir, file);
    if (!fs.existsSync(filePath)) return;
    let css = fs.readFileSync(filePath, 'utf-8');
    
    // Tipografías
    css = css.replace(/font-family:\s*["']?Poppins["']?,\s*sans-serif;/gi, "font-family: 'Outfit', sans-serif !important;");
    
    // Fondos Blancos a Paneles Dark
    css = css.replace(/background:\s*#fff/gi, 'background: rgba(30, 41, 59, 0.5)');
    css = css.replace(/background-color:\s*#fff/gi, 'background: rgba(30, 41, 59, 0.5)');
    
    // Textos Claros
    css = css.replace(/color:\s*#333/gi, 'color: #e2e8f0');
    css = css.replace(/color:\s*#0a2e5d/gi, 'color: #e2e8f0');
    css = css.replace(/color:\s*#003f7f/gi, 'color: #00e5ff');
    css = css.replace(/color:\s*#006699/gi, 'color: #00e5ff');
    
    // Fondos Azules al Radial Dark
    css = css.replace(/background:\s*#f5f7fa/gi, 'background: radial-gradient(circle at top, #0f172a, #020617 80%)');
    css = css.replace(/background:\s*linear-gradient\(circle at top right, #002b55, #001428 70%\)/gi, 'background: radial-gradient(circle at top, #0f172a, #020617 80%)');
    css = css.replace(/background:\s*linear-gradient\(120deg, #006699, #00bcd4\)/gi, 'background: linear-gradient(135deg, #1e293b, #0f172a)');
    
    // Reemplazar headers y colores estandarizados de marca (Neón Cyan / Dark Blue)
    css = css.replace(/#00bcd4/gi, '#00e5ff');
    css = css.replace(/#004aad/gi, '#0f172a');
    css = css.replace(/#003f7f/gi, '#00e5ff');
    css = css.replace(/#006699/gi, '#1e293b');
    
    css = css.replace(/rgba\(0,\s*0,\s*0,\s*0\.7\)/gi, 'rgba(15, 23, 42, 0.85)');
    
    // En contacto.css el header
    css = css.replace(/background:\s*linear-gradient\(45deg, #001f3f, #003f7f, #0099ff\)/gi, 'background: rgba(15, 23, 42, 0.85); backdrop-filter: blur(16px);');
    
    fs.writeFileSync(filePath, css);
}

updateCSS('index.css');
updateCSS('contacto.css');
console.log("CSS unificados con estética Neón.");
