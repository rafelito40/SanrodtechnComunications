// ===================== IMPORTS =====================
require('dotenv').config();

const express = require('express');
const path = require('path');
const { Pool } = require('pg');
const Stripe = require('stripe');

// ===================== CONFIG =====================
const app = express();
const PORT = 4000;

// Stripe (SOLO UNA VEZ)
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// PostgreSQL
const pool = new Pool({
  user: 'rafelito',
  host: 'localhost',
  database: 'tienda_sanrodtech',
  password: '1124dios',
  port: 5432,
});

// ===================== MIDDLEWARE =====================
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// ===================== RUTAS =====================

// Home
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Catálogo
app.get('/catalogo', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'catalogo.html'));
});

// ===================== CHECKOUT =====================
app.post('/create-checkout-session', async (req, res) => {
  const { items, user } = req.body;

  if (!items || items.length === 0) {
    return res.status(400).json({ error: 'Carrito vacío' });
  }

  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    // 1️⃣ Usuario
    const userResult = await client.query(
      `INSERT INTO usuarios (nombre, email, telefono, direccion)
       VALUES ($1, $2, $3, $4)
       RETURNING id`,
      [user.nombre, user.email, user.telefono, user.direccion]
    );
    const userId = userResult.rows[0].id;

    // 2️⃣ Total
    const total = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    // 3️⃣ Pedido
    const orderResult = await client.query(
      `INSERT INTO pedidos (usuario_id, total)
       VALUES ($1, $2)
       RETURNING id`,
      [userId, total]
    );
    const orderId = orderResult.rows[0].id;

    // 4️⃣ Items
    for (const item of items) {
      await client.query(
        `INSERT INTO items_pedido (pedido_id, producto, cantidad, precio)
         VALUES ($1, $2, $3, $4)`,
        [orderId, item.product, item.quantity, item.price]
      );
    }

    await client.query('COMMIT');

    // 5️⃣ Stripe Checkout
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: items.map(item => ({
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.product,
          },
          unit_amount: item.price * 100,
        },
        quantity: item.quantity,
      })),
      mode: 'payment',
      success_url: 'http://localhost:4000/success.html',
      cancel_url: 'http://localhost:4000/cancel.html',
    });

    res.json({ id: session.id });

  } catch (error) {
    await client.query('ROLLBACK');
    console.error('❌ Error checkout:', error);
    res.status(500).json({ error: 'Error procesando el pedido' });
  } finally {
    client.release();
  }
});

// ===================== SERVER =====================
app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});
