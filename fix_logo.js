const fs = require('fs');
const path = require('path');
const dir = path.join(__dirname, 'public');

fs.readdirSync(dir).filter(f => f.endsWith('.css')).forEach(f => {
    fs.appendFileSync(path.join(dir, f), `\n\n/* Fix Logo Visibilidad */\n.logo, .logo-container img.logo { background-color: #ffffff !important; padding: 5px !important; border-radius: 12px !important; border: 2px solid #00e5ff !important; box-shadow: 0 0 15px rgba(0, 229, 255, 0.4) !important; }\n`);
});
console.log("Logos fixed in all CSS.");
