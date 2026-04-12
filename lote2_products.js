const fs = require('fs');

let html = fs.readFileSync('public/catalogo.html', 'utf-8');

// 1. Actualizar el Repetidor Mercusys al modelo AX1500 Wi-Fi 6 (ME60X) de la foto
html = html.replace(
    /<img src="https:\/\/static\.mercusys\.com[^>]+>\s*<h3>Repetidores de Señal Mercusys<\/h3>/i,
    \`<img src="https://static.mercusys.com/local/upload/image/20230526/6470559ebc285.png" alt="Repetidor Mercusys AX1500">
        <h3>Repetidor Mercusys AX1500 Wi-Fi 6</h3>\`
);

// 2. Nuevos Productos
const nuevosLote2 = \`
    <div class="product-card" data-tilt data-tilt-glare data-tilt-max-glare="0.5" data-tilt-scale="1.05" data-category="tv">
        <div class="premium-badge neon-blue">⭐ Smart</div>
        <img src="images/productos/tv1.jfif" alt="TV KTC 32">
        <h3>Televisor KTC 32 Pulgadas</h3>
        <p>Resolución cristalina y colores vivos para tu entretenimiento en casa.</p>
        <button class="contact-btn" onclick="window.location.href='https://wa.me/18296232138?text=Hola,%20solicito%20el%20Televisor%20KTC.'">Solicitar Información</button>
    </div>
    
    <div class="product-card" data-tilt data-tilt-glare data-tilt-max-glare="0.5" data-tilt-scale="1.05" data-category="telefono">
        <img src="images/productos/accesorios.jpg" alt="Cables iPhone">
        <h3>Cables de iPhone Originales</h3>
        <p>Carga rápida y transferencia de datos segura sin dañar la batería.</p>
        <button class="contact-btn" onclick="window.location.href='https://wa.me/18296232138?text=Hola,%20solicito%20Cables%20de%20iPhone.'">Solicitar Información</button>
    </div>
    
    <div class="product-card" data-tilt data-tilt-glare data-tilt-max-glare="0.5" data-tilt-scale="1.05" data-category="telefono">
        <img src="images/productos/accesorios.jpg" alt="Cables TPE">
        <h3>Cables de Datos Marca TPE</h3>
        <p>Extra reforzados, resistencia superior contra dobleces y tirones.</p>
        <button class="contact-btn" onclick="window.location.href='https://wa.me/18296232138?text=Hola,%20solicito%20Cables%20TPE.'">Solicitar Información</button>
    </div>
    
    <div class="product-card" data-tilt data-tilt-glare data-tilt-max-glare="0.5" data-tilt-scale="1.05" data-category="telefono">
        <img src="images/productos/accesorios.jpg" alt="Cables Tipo C">
        <h3>Cables Tipo-C Originales</h3>
        <p>Transmisión de energía ininterrumpida para carga super rápida.</p>
        <button class="contact-btn" onclick="window.location.href='https://wa.me/18296232138?text=Hola,%20solicito%20Cables%20Tipo%20C.'">Solicitar Información</button>
    </div>
    
    <div class="product-card" data-tilt data-tilt-glare data-tilt-max-glare="0.5" data-tilt-scale="1.05" data-category="computadora">
        <div class="premium-badge neon-red">🔥 Top Ventas</div>
        <img src="images/productos/moni1.jfif" alt="Monitor 2Connect 20">
        <h3>Monitor 2Connect 20 Pulgadas</h3>
        <p>Elegancia compacta y excelente nitidez para labores de oficina.</p>
        <button class="contact-btn" onclick="window.location.href='https://wa.me/18296232138?text=Hola,%20solicito%20el%20Monitor%202Connect%2020.'">Solicitar Información</button>
    </div>
    
    <div class="product-card" data-tilt data-tilt-glare data-tilt-max-glare="0.5" data-tilt-scale="1.05" data-category="computadora">
        <img src="images/productos/moni2.jfif" alt="Monitor 2Connect 24">
        <h3>Monitor 2Connect 24 Pulgadas</h3>
        <p>Pantalla panorámica amplia, ideal para edición y máximo confort visual.</p>
        <button class="contact-btn" onclick="window.location.href='https://wa.me/18296232138?text=Hola,%20solicito%20el%20Monitor%202Connect%2024.'">Solicitar Información</button>
    </div>
    
    <div class="product-card" data-tilt data-tilt-glare data-tilt-max-glare="0.5" data-tilt-scale="1.05" data-category="otro">
        <div class="premium-badge neon-blue">⭐ Negocios</div>
        <img src="images/productos/dinero1.jfif" alt="Caja Registradora">
        <h3>Caja Registradora (4 Billetes)</h3>
        <p>Bandeja metálica de alta seguridad con divisiones para comercios.</p>
        <button class="contact-btn" onclick="window.location.href='https://wa.me/18296232138?text=Hola,%20solicito%20la%20Caja%20Registradora.'">Solicitar Información</button>
    </div>
\`;

if (!html.includes('Televisor KTC 32 Pulgadas')) {
    // Insert after the first product to make them highly visible, or just at the beginning
    html = html.replace('<!-- INYECCIÓN MASIVA DE INVENTARIO -->', '<!-- INYECCIÓN MASIVA DE INVENTARIO -->\\n' + nuevosLote2);
    fs.writeFileSync('public/catalogo.html', html);
    console.log("Segundo lote inyectado exitosamente.");
}
