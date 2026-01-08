
// carrito.js
document.addEventListener('DOMContentLoaded', () => {

  /* =======================
     ESTADO DEL CARRITO
  ======================== */
  let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

  /* =======================
     ELEMENTOS (PUEDEN NO EXISTIR)
  ======================== */
  const carritoCount = document.getElementById('carrito-count');
  const carritoItems = document.getElementById('carrito-items');
  const totalSpan = document.getElementById('total');
  const checkoutForm = document.getElementById('checkout-form');

  /* =======================
     FUNCIONES
  ======================== */
  function guardarCarrito() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
  }

  function actualizarContador() {
    if (carritoCount) {
      const totalItems = carrito.reduce((sum, item) => sum + item.quantity, 0);
      carritoCount.textContent = totalItems;
    }
  }

  function calcularTotal() {
    return carrito.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  function renderCarrito() {
    if (!carritoItems) return;

    carritoItems.innerHTML = '';

    carrito.forEach((item, index) => {
      const div = document.createElement('div');
      div.className = 'carrito-item';

      div.innerHTML = `
        <h3>${item.product}</h3>
        <p>Precio: RD$ ${item.price.toLocaleString()}</p>
        <p>
          Cantidad:
          <button class="decrease" data-index="${index}">−</button>
          <span>${item.quantity}</span>
          <button class="increase" data-index="${index}">+</button>
        </p>
        <button class="remove" data-index="${index}">Remover</button>
      `;

      carritoItems.appendChild(div);
    });

    if (totalSpan) {
      totalSpan.textContent = calcularTotal().toLocaleString();
    }
  }

  function actualizarTodo() {
    guardarCarrito();
    actualizarContador();
    renderCarrito();
  }

  /* =======================
     EVENTOS DE CLICK
  ======================== */
  document.addEventListener('click', (e) => {

    // Agregar al carrito
    if (e.target.classList.contains('add-to-cart')) {
      const product = e.target.dataset.product;
      const price = parseInt(e.target.dataset.price, 10);

      const existente = carrito.find(item => item.product === product);

      if (existente) {
        existente.quantity++;
      } else {
        carrito.push({ product, price, quantity: 1 });
      }

      actualizarTodo();
    }

    // Aumentar cantidad
    if (e.target.classList.contains('increase')) {
      const index = e.target.dataset.index;
      carrito[index].quantity++;
      actualizarTodo();
    }

    // Disminuir cantidad
    if (e.target.classList.contains('decrease')) {
      const index = e.target.dataset.index;

      if (carrito[index].quantity > 1) {
        carrito[index].quantity--;
      } else {
        carrito.splice(index, 1);
      }

      actualizarTodo();
    }

    // Remover producto
    if (e.target.classList.contains('remove')) {
      const index = e.target.dataset.index;
      carrito.splice(index, 1);
      actualizarTodo();
    }
  });

  /* =======================
     CHECKOUT (SOLO SI EXISTE)
  ======================== */
  if (checkoutForm) {
    checkoutForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      if (carrito.length === 0) {
        alert('El carrito está vacío');
        return;
      }

      const nombre = document.getElementById('nombre')?.value;
      const email = document.getElementById('email')?.value;
      const telefono = document.getElementById('telefono')?.value;
      const direccion = document.getElementById('direccion')?.value;

      try {
        const response = await fetch('/create-checkout-session', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            items: carrito,
            user: { nombre, email, telefono, direccion }
          })
        });

        const session = await response.json();

        if (session.id) {
          window.location.href = `https://checkout.stripe.com/pay/${session.id}`;
        } else {
          alert('Error al iniciar el pago');
        }

      } catch (error) {
        console.error(error);
        alert('Error conectando con el servidor');
      }
    });
  }

  /* =======================
     INICIALIZAR
  ======================== */
  actualizarTodo();
});
