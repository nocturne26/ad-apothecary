let cart = JSON.parse(localStorage.getItem("cart")) || [];

const buttons = document.querySelectorAll(".add-to-cart");
const message = document.getElementById("cart-message");

buttons.forEach(button => {
  button.addEventListener("click", () => {
    const productName = button.dataset.product;
    const productPrice = Number(button.dataset.price);

    cart.push({
      name: productName,
      price: productPrice
    });

    localStorage.setItem("cart", JSON.stringify(cart));

    message.textContent = productName + " added to cart!";

    setTimeout(() => {
      message.textContent = "";
    }, 2000);

    console.log(cart);
  });
});