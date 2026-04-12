const fs = require('fs');

let html = fs.readFileSync('public/catalogo.html', 'utf8');

const replacements = [
    { search: /https:\/\/static\.mercusys\.com\/local\/upload\/image\/20230526\/6470559ebc285\.png/g, replace: 'images/productos/Repetidor Mercusys AX1500 Wi-Fi 6.png' },
    { search: /https:\/\/static\.mercusys\.com\/local\/upload\/image\/20190530\/5cef8af33bde7\.jpg/g, replace: 'images/productos/Repetidores de Señal Mercusys.jpg' },
    { search: /https:\/\/store\.storeimages\.cdn-apple\.com\/[^"]+/g, replace: 'images/productos/cables_iphone_original.jpg' },
    { search: /images\/productos\/accesorios\.jpg" alt="Cable iPhone Original"/g, replace: 'images/productos/Cables de iPhone Originales.jpg" alt="Cable iPhone Original"' },
    { search: /images\/productos\/accesorios\.jpg" alt="Cable TPE"/g, replace: 'images/productos/Cables de Carga Marca TPE.jpg" alt="Cable TPE"' },
    { search: /images\/productos\/accesorios\.jpg" alt="Cable Tipo C"/g, replace: 'images/productos/cables_iphone_original.jpg" alt="Cable Tipo C"' },
    { search: /https:\/\/m\.media-amazon\.com\/images\/I\/71rP1rQIfqL\._AC_SL1500_\.jpg/g, replace: 'images/productos/Regletas Eléctricas con USB.jpg' },
    { search: /https:\/\/m\.media-amazon\.com\/images\/I\/71R2bF-yW5S\._AC_SS450_\.jpg/g, replace: 'images/productos/Cable-XTECH-UTP-Cat5e.jpg' },
    { search: /https:\/\/mediaserver\.goepson\.com\/[^"]+/g, replace: 'images/productos/epson scaner DS-C330_left-feed1_690x460.jpg' },
    { search: /images\/productos\/dinero1\.jfif" alt="Caja Registradora"/g, replace: 'images/productos/cajaregistradora.jpg" alt="Caja Registradora"' }
];

replacements.forEach(r => {
    html = html.replace(r.search, r.replace);
});

// Update slider logos
const swiperBlockStart = html.indexOf('<div class="swiper swiperCatalog">');
const swiperBlockEnd = html.indexOf('</section>', swiperBlockStart);

if(swiperBlockStart > -1 && swiperBlockEnd > -1) {
    let block = html.substring(swiperBlockStart, swiperBlockEnd);

    block = block.replace(/<img class="logo-w" src="https:\/\/upload\.wikimedia\.org\/wikipedia\/commons\/thumb\/1\/18\/Dell_logo_2016\.svg\/512px-Dell_logo_2016\.svg\.png" alt="Dell">/, '<img class="logo-w" src="images/productos/Dell_logo_2016.svg.png" alt="Dell">');
    
    // Replace text XTECH with image XTech-logo-500x500-1.png
    block = block.replace(/<h2[^>]*>XTECH<\/h2>/, '<img src="images/productos/XTech-logo-500x500-1.png" alt="XTECH" class="logo-w">');

    // Replace text 2CONNECT with image logo-2connect.png
    block = block.replace(/<h2[^>]*>2CONNECT<\/h2>/, '<img src="images/productos/logo-2connect.png" alt="2CONNECT" class="logo-w">');

    // Replace Apple Wikipedia logo with iPhone-Logo-2007.png
    block = block.replace(/<img class="logo-w" src="https:\/\/upload\.wikimedia\.org\/wikipedia\/commons\/thumb\/f\/fa\/Apple_logo_black\.svg\/512px-Apple_logo_black\.svg\.png" alt="Apple iPhone">/, '<img class="logo-w" src="images/productos/iPhone-Logo-2007.png" alt="Apple iPhone">');

    html = html.substring(0, swiperBlockStart) + block + html.substring(swiperBlockEnd);
}

// Encode URIs that have spaces without encoding quotes
html = html.replace(/src="([^"]+)"/g, (match, src) => {
    if (src.includes(' ') && !src.includes('%20')) {
        return \`src="\${encodeURI(src)}"\`;
    }
    return match;
});

fs.writeFileSync('public/catalogo.html', html);
console.log('Images fixed and correctly encoded');
