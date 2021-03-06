let removeCartItemButtons = document.querySelectorAll(".btn-danger");
for (i of removeCartItemButtons) {
  let btn = element;
  btn.addEventListener("click", removeCartItem);
}

let quantityInput = document.querySelectorAll(".cart-quantity-input");
for (i of quantityInput) {
  let input = i;
  input.addEventListener("change", quantityChanged);
}

let addToCartClicked = (event) => {
  let btn = event.target;
  let shopItem = btn.parentElement.parentElement;
  let title = shopItem.querySelector(".card-title").innerText;
  let price = shopItem.querySelector(".card-price").innerText;
  let imageSrc = shopItem.querySelector(".card-image__pict").src;
  console.log(title, price, imageSrc);
  addItemToCart(title, price, imageSrc);
  updateCartTotal();
};

let addItemToCart = (title, price, imageSrc) => {
  console.log(title, price, imageSrc);
  let cartRow = document.createElement("div");
  cartRow.classList.add("cart-row");
  let cartItems = document.querySelector(".cart-items");
  let cartItemNames = cartItems.querySelectorAll(".cart-item-title");
  for (i of cartItemNames) {
    if (i.innerText == title) {
      alert("This guitar is already added to the cart!");
      return;
    }
  }

  let cartRowContent = `
    <div class="">
    <div class="row row-bottom basket-item valign-wrapper">
      <div class="col s4 m4 l6">
        <div class="row row-bottom items valign-wrapper">
          <img class="col s0 m2 l2 cart-item-image hide-on-small-only" src="${imageSrc}" />
          <span class="col s12 m10 l10 cart-item-title">
            ${title}
          </span>
        </div>
      </div>
      <div class="col s3 m2 l2">
        <span class="cart-price cart-column">${price}</span>
      </div>
      <div class="col s5 m6 l4 row row-bottom valign-wrapper">
        <input
          class="col s6 m4 l6 cart-quantity-input"
          type="number"
          value="1"
        />
        <button class="col offset-s1 s5 offset-m1 m7 offset-l3 l4 btn btn-danger" type="button">
          <i class="material-icons left">remove_shopping_cart</i>
          <span class="hide-on-large-only hide-on-small-only" >Remove</span>
        </button>
      </div>
    </div>
  </div>`;
  cartRow.innerHTML = cartRowContent;
  cartItems.append(cartRow);
  cartRow
    .querySelector(".btn-danger")
    .addEventListener("click", removeCartItem);
  cartRow
    .querySelector(".cart-quantity-input")
    .addEventListener("change", quantityChanged);
};

let addToCartBtn = document.querySelectorAll(".shop-item-button");
console.log(addToCartBtn);
for (i of addToCartBtn) {
  console.log(i);
  i.addEventListener("click", addToCartClicked);
}

document
  .querySelector(".btn-purchase")
  .addEventListener("click", purchaseClicked);

function purchaseClicked() {
  alert("Thank you for your purchase");
  let cartItems = document.querySelector(".cart-items");
  while (cartItems.hasChildNodes()) {
    cartItems.removeChild(cartItems.firstChild);
  }
  updateCartTotal();
}

let removeCartItem = (event) => {
  let btnClicked = event.target;
  btnClicked.parentElement.parentElement.parentElement.parentElement.remove();
  updateCartTotal();
};

let quantityChanged = (event) => {
  let input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  console.log("Changed");
  console.log(input.value);
  updateCartTotal();
};

let updateCartTotal = () => {
  let cartItemContainer = document.querySelector(".cart-items");
  let cartRows = cartItemContainer.querySelectorAll(".cart-row");
  let total = 0;
  for (let i of cartRows) {
    let cartRow = i;
    let priceEl = cartRow.querySelector(".cart-price");
    let quantityElement = cartRow.querySelector(".cart-quantity-input");
    let price = parseFloat(priceEl.innerText.replace("$", ""));
    let quantity = quantityElement.value;
    total = total + price * quantity;
  }
  total = Math.round(total * 100) / 100;
  document.querySelector(".cart-total-price").innerText = "$" + total;
  console.log("total = " + total);
};
