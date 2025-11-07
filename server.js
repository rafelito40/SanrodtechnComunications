const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = 3000;

// Servir archivos estáticos desde /public
app.use(express.static(path.join(__dirname, 'public')));

// Archivo donde guardaremos las visitas
const contadorPath = path.join(__dirname, 'contador.json');

// Inicializar el archivo si no existe
if (!fs.existsSync(contadorPath)) {
  fs.writeFileSync(contadorPath, JSON.stringify({ visitas: 0 }, null, 2));
}

// Ruta para obtener e incrementar el contador
app.get('/api/visitas', (req, res) => {
  const data = JSON.parse(fs.readFileSync(contadorPath, 'utf8'));
  data.visitas += 1;
  fs.writeFileSync(contadorPath, JSON.stringify(data, null, 2));
  res.json({ visitas: data.visitas });
});

// Rutas normales
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/catalogo', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'catalogo.html'));
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
