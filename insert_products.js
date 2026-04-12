const fs = require('fs');

const productosNuevos = `
    <!-- INYECCIÓN MASIVA DE INVENTARIO -->
    <div class="product-card" data-tilt data-tilt-glare data-tilt-max-glare="0.5" data-tilt-scale="1.05" data-category="computadora">
        <div class="premium-badge neon-blue">Novedad</div>
        <img src="images/productos/mouse1.jfif" alt="Mouse Gaming">
        <h3>Mouse Óptico Inalámbrico</h3>
        <p>Alta precisión y diseño ergonómico corporativo.</p>
        <button class="contact-btn" onclick="window.location.href='https://wa.me/18296232138?text=Hola,%20solicito%20el%20Mouse%20Óptico.'">Solicitar Información</button>
    </div>
    
    <div class="product-card" data-tilt data-tilt-glare data-tilt-max-glare="0.5" data-tilt-scale="1.05" data-category="impresora">
        <img src="images/productos/epsonl5590.jfif" alt="Impresora Connect">
        <h3>Impresora EPSON Connect Series</h3>
        <p>Conectividad Inalámbrica y Wi-Fi de alto rendimiento.</p>
        <button class="contact-btn" onclick="window.location.href='https://wa.me/18296232138?text=Hola,%20solicito%20la%20Impresora%20Epson%20Connect.'">Solicitar Información</button>
    </div>
    
    <div class="product-card" data-tilt data-tilt-glare data-tilt-max-glare="0.5" data-tilt-scale="1.05" data-category="telefono">
        <div class="premium-badge neon-red">🔥 Alta Demanda</div>
        <img src="https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MHJA3_AV1?wid=1144&hei=1144&fmt=jpeg&qlt=90&.v=1605053424000" alt="Cargador iPhone">
        <h3>Cargadores Originales de iPhone</h3>
        <p>Adaptadores de pared USB-C y cubitos lightning ultrarrápidos.</p>
        <button class="contact-btn" onclick="window.location.href='https://wa.me/18296232138?text=Hola,%20solicito%20Cargador%20de%20iPhone.'">Solicitar Información</button>
    </div>
    
    <div class="product-card" data-tilt data-tilt-glare data-tilt-max-glare="0.5" data-tilt-scale="1.05" data-category="computadora">
        <div class="premium-badge neon-blue">⭐ Conectividad</div>
        <img src="https://static.mercusys.com/local/upload/image/20190530/5cef8af33bde7.jpg" alt="Repetidor Mercusys">
        <h3>Repetidores de Señal Mercusys</h3>
        <p>Extensor de rango Wi-Fi de extrema penetración.</p>
        <button class="contact-btn" onclick="window.location.href='https://wa.me/18296232138?text=Hola,%20solicito%20el%20Repetidor%20Mercusys.'">Solicitar Información</button>
    </div>
    
    <div class="product-card" data-tilt data-tilt-glare data-tilt-max-glare="0.5" data-tilt-scale="1.05" data-category="computadora">
        <img src="images/productos/router.jpg" alt="Router Mercusys">
        <h3>Router Mercusys Multi-Antena</h3>
        <p>Transmisión de red impecable para negocios y hogares exigentes.</p>
        <button class="contact-btn" onclick="window.location.href='https://wa.me/18296232138?text=Hola,%20solicito%20el%20Router%20Mercusys.'">Solicitar Información</button>
    </div>
    
    <div class="product-card" data-tilt data-tilt-glare data-tilt-max-glare="0.5" data-tilt-scale="1.05" data-category="computadora">
        <img src="images/productos/teclado.jpg" alt="Teclado Xtech">
        <h3>Teclados Inalámbricos Xtech</h3>
        <p>Libertad absoluta sin cables y respuesta táctil perfecta.</p>
        <button class="contact-btn" onclick="window.location.href='https://wa.me/18296232138?text=Hola,%20solicito%20el%20Teclado%20Xtech.'">Solicitar Información</button>
    </div>
    
    <div class="product-card" data-tilt data-tilt-glare data-tilt-max-glare="0.5" data-tilt-scale="1.05" data-category="computadora">
        <img src="https://m.media-amazon.com/images/I/71rP1rQIfqL._AC_SL1500_.jpg" alt="Regleta USB">
        <h3>Regletas Eléctricas con USB</h3>
        <p>Protección contra picos y múltiples puertos integrados.</p>
        <button class="contact-btn" onclick="window.location.href='https://wa.me/18296232138?text=Hola,%20solicito%20la%20Regleta%20USB.'">Solicitar Información</button>
    </div>
    
    <div class="product-card" data-tilt data-tilt-glare data-tilt-max-glare="0.5" data-tilt-scale="1.05" data-category="computadora">
        <div class="premium-badge neon-red">Indispensable</div>
        <img src="https://m.media-amazon.com/images/I/71R2bF-yW5S._AC_SS450_.jpg" alt="Cable Cat5">
        <h3>Cables de Red CAT5 UTP</h3>
        <p>Garantía de transferencia de datos robusta de alta velocidad.</p>
        <button class="contact-btn" onclick="window.location.href='https://wa.me/18296232138?text=Hola,%20solicito%20el%20Cable%20de%20Red.'">Solicitar Información</button>
    </div>
    
    <div class="product-card" data-tilt data-tilt-glare data-tilt-max-glare="0.5" data-tilt-scale="1.05" data-category="impresora">
        <div class="premium-badge neon-blue">⭐ Premium</div>
        <img src="https://mediaserver.goepson.com/ImConvServlet/imconv/3ce63901b08ccf99f36ac2a967f6f1fbeba9d16a/1200Wx1200H?use=banner&assetDescr=Epson-DS-C330-Scanner-7-Hero.jpg" alt="Epson Scanner">
        <h3>Escáner EPSON Workforce DS-C330</h3>
        <p>Digitalización documental empresarial a un nivel magistral.</p>
        <button class="contact-btn" onclick="window.location.href='https://wa.me/18296232138?text=Hola,%20solicito%20el%20Scanner%20Workforce.'">Solicitar Información</button>
    </div>
    
    <div class="product-card" data-tilt data-tilt-glare data-tilt-max-glare="0.5" data-tilt-scale="1.05" data-category="impresora">
        <img src="images/productos/rollo.jfif" alt="Rollo Termico">
        <h3>Rollos de Papel Térmico</h3>
        <p>Compatibilidad absoluta con todas tus terminales de punto de venta.</p>
        <button class="contact-btn" onclick="window.location.href='https://wa.me/18296232138?text=Hola,%20solicito%20Rollos%20Térmicos.'">Solicitar Información</button>
    </div>
    
    <div class="product-card" data-tilt data-tilt-glare data-tilt-max-glare="0.5" data-tilt-scale="1.05" data-category="impresora">
        <img src="images/productos/rollo.jfif" alt="Rollo Calculadora">
        <h3>Rollos para Calculadoras</h3>
        <p>Ajuste estricto y nitidez impecable en cada impresión financiera.</p>
        <button class="contact-btn" onclick="window.location.href='https://wa.me/18296232138?text=Hola,%20solicito%20Rollos%20de%20Calculadora.'">Solicitar Información</button>
    </div>
    
    <div class="product-card" data-tilt data-tilt-glare data-tilt-max-glare="0.5" data-tilt-scale="1.05" data-category="impresora">
        <img src="images/productos/rollo.jfif" alt="Rollo Portatil">
        <h3>Rollos para Impresoras Portátiles</h3>
        <p>La máxima calidad para facturación en movilidad y entregas.</p>
        <button class="contact-btn" onclick="window.location.href='https://wa.me/18296232138?text=Hola,%20solicito%20Rollos%20para%20Impresora%20Portátil.'">Solicitar Información</button>
    </div>
`;

let html = fs.readFileSync('public/catalogo.html', 'utf-8');

if (!html.includes('Workforce DS-C330')) {
    html = html.replace('<div class="product-grid">', '<div class="product-grid">\n' + productosNuevos);
    fs.writeFileSync('public/catalogo.html', html);
    console.log("Inventario Actualizado Exitosamente.");
} else {
    console.log("El inventario ya existía en el archivo.");
}
