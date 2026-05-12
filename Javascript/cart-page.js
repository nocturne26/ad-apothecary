let cart = JSON.parse(localStorage.getItem("cart")) || [];

const cartItems = document.getElementById("cart-items");
const clearButton = document.getElementById("clear-cart");

const taxRate = 0.07;

function displayCart() {

  cartItems.innerHTML = "";

  if (cart.length === 0) {
    cartItems.innerHTML = "<p>Your cart is empty.</p>";
    return;
  }

  const groupedCart = {};

  cart.forEach(product => {

    if (!groupedCart[product.name]) {
      groupedCart[product.name] = {
        price: product.price,
        quantity: 0
      };
    }

    groupedCart[product.name].quantity++;

  });

  let subtotal = 0;

  let receiptHTML = `
    <div class="receipt">

      <div class="receipt-row receipt-header">
        <span>Item</span>
        <span>Qty</span>
        <span>Price</span>
        <span>Total</span>
      </div>
  `;

  for (let product in groupedCart) {

    const item = groupedCart[product];
    const itemTotal = item.price * item.quantity;

    subtotal += itemTotal;

    receiptHTML += `
      <div class="receipt-row">

        <span>${product}</span>

        <span>
          <button class="quantity-btn decrease" data-product="${product}">-</button>

          ${item.quantity}

          <button class="quantity-btn increase" data-product="${product}">+</button>
        </span>

        <span>$${item.price.toFixed(2)}</span>

        <span>$${itemTotal.toFixed(2)}</span>

      </div>
    `;
  }

  const tax = subtotal * taxRate;
  const total = subtotal + tax;

  receiptHTML += `
      <div class="receipt-summary">
        <p>Subtotal: $${subtotal.toFixed(2)}</p>

        <p>Estimated Tax: $${tax.toFixed(2)}</p>

        <h3>Total: $${total.toFixed(2)}</h3>
      </div>

    </div>
  `;

  cartItems.innerHTML = receiptHTML;

  const cartSummaryInput = document.getElementById("cart-summary");

  let summaryText = "";

  for (let product in groupedCart) {

    const item = groupedCart[product];

    summaryText += `${product} x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}\n`;
  }

  summaryText += `\nSubtotal: $${subtotal.toFixed(2)}`;
  summaryText += `\nTax: $${tax.toFixed(2)}`;
  summaryText += `\nTotal: $${total.toFixed(2)}`;

  cartSummaryInput.value = summaryText;

  document.querySelectorAll(".increase").forEach(button => {

    button.addEventListener("click", () => {

      const productName = button.dataset.product;

      const item = cart.find(product => product.name === productName);

      if (item) {

        cart.push(item);

        localStorage.setItem("cart", JSON.stringify(cart));

        displayCart();
      }
    });
  });

  document.querySelectorAll(".decrease").forEach(button => {

    button.addEventListener("click", () => {

      const productName = button.dataset.product;

      const index = cart.findIndex(product => product.name === productName);

      if (index !== -1) {

        cart.splice(index, 1);

        localStorage.setItem("cart", JSON.stringify(cart));

        displayCart();
      }
    });
  });
}

clearButton.addEventListener("click", () => {

  localStorage.removeItem("cart");

  cart = [];

  displayCart();

});

displayCart();

const requestForm = document.querySelector(".request-form");
const formMessage = document.getElementById("form-message");

requestForm.addEventListener("submit", () => {
  formMessage.textContent = "Submitting order request...";

  localStorage.removeItem("cart");

});