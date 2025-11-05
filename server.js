const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// Servir todo desde /public
app.use(express.static(path.join(__dirname, 'public')));

// Rutas específicas
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/catalogo', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'catalogo.html'));
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});