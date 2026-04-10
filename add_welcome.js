const fs = require('fs');
const path = require('path');
const publicDir = path.join(__dirname, 'public');

const files = fs.readdirSync(publicDir).filter(f => f.endsWith('.html'));

const sweetAlertSnippet = `
<!-- SweetAlert2 Bienvenido -->
<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
<script>
  document.addEventListener("DOMContentLoaded", () => {
    if (!sessionStorage.getItem('welcomed')) {
      Swal.fire({
        title: '¡Qué alegría tenerte aquí! 🚀',
        html: 'Estás a un paso de llevar la <b>tecnología</b> de tu hogar y tu negocio al máximo nivel con nosotros.<br><br>Explora nuestras soluciones premium y siéntete como en casa.',
        icon: 'success',
        iconColor: '#00e5ff',
        background: 'rgba(15, 23, 42, 0.95)',
        color: '#e2e8f0',
        confirmButtonColor: '#00e5ff',
        confirmButtonText: '<span style="color:#0f172a; font-weight:800;">Adelante, descubrir</span>',
        backdrop: 'rgba(2, 6, 23, 0.9)',
        showClass: { popup: 'animate__animated animate__zoomIn' }
      });
      sessionStorage.setItem('welcomed', 'true');
    }
  });
</script>
</body>
`;

files.forEach(f => {
    let txt = fs.readFileSync(path.join(publicDir, f), 'utf-8');
    
    if (!txt.includes('SweetAlert2')) {
        txt = txt.replace(/<\/body>/i, sweetAlertSnippet);
        fs.writeFileSync(path.join(publicDir, f), txt);
    }
});
console.log("Welcome message added to all html pages.");
