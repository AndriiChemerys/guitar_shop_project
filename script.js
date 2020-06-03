// if (document.readyState == 'loading') {
//     document.addEventListener('DOMContentLoaded', ready)
// } else {
//     ready();
// }

// document.addEventListener("DOMContentLoaded", function () {

let removeCartItemButtons = document.querySelectorAll('.btn-danger');

removeCartItemButtons.forEach(element => {
    let btn = element;
    btn.addEventListener('click', removeCartItem);
});

let quantityInput = document.querySelectorAll('.cart-quantity-input')
for (i of quantityInput) {
    let input = i;
    input.addEventListener('change', quantityChanged)
}
// });

// Cart Clicked func
let addToCartClicked = (event) => {
    let btn = event.target
    let shopItem = btn.parentElement.parentElement
    let title = shopItem.querySelector('.card-title').innerText;
    let price = shopItem.querySelector('.card-price').innerText;
    let imageSrc = shopItem.querySelector('.card-image__pict').src;
    console.log(title, price, imageSrc)
    addItemToCart(title, price, imageSrc);
    updateCartTotal()
}



let addItemToCart = (title, price, imageSrc) => {
    console.log(title, price, imageSrc)
    let cartRow = document.createElement('div')
    cartRow.classList.add('cart-row')
    let cartItems = document.querySelector('.cart-items')
    let cartItemNames = cartItems.querySelectorAll('.cart-item-title')
    for (i of cartItemNames) {
        if (i.innerText == title) {
            alert('This guitar is already added to the cart!')
            return;
        }
    }

    let cartRowContent = `
        <div class="cart-item cart-column">
            <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
            <span class="cart-item-title">${title}</span>
        </div>
        <span class="cart-price cart-column">${price}</span>
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="2">
            <button class="btn btn-danger" type="button">REMOVE</button>
        </div>`
    cartRow.innerHTML = cartRowContent;
    cartItems.append(cartRow);
    cartRow.querySelector('.btn-danger').addEventListener('click', removeCartItem)
    cartRow.querySelector('.cart-quantity-input').addEventListener('change', quantityChanged)

}

// Add To Cart button
let addToCartBtn = document.querySelectorAll('.shop-item-button');
console.log(addToCartBtn);
for (i of addToCartBtn) {
    console.log(i);
    i.addEventListener('click', addToCartClicked)
}


let removeCartItem = () => {
    let btnClicked = event.target
    btnClicked.parentElement.parentElement.remove();
}
// let ready = () => {

// }


let quantityChanged = (event) => {
    let input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 0;
    }
    console.log('Changed')
    updateCartTotal();
}



let updateCartTotal = () => {
    let cartItemContainer = document.querySelector('.cart-items');
    let cartRows = cartItemContainer.querySelectorAll('.cart-row');
    let total;
    for (let i of cartRows) {
        let cartRow = i;
        console.log(cartRow);
        let priceEl = cartRow.querySelector('.cart-price')
        let quantityElement = cartRow.querySelector('.cart-quantity-input')
        let price = parseFloat(priceEl.innerText.replace('$', ''));
        // console.log(price)
        let quantity = quantityElement.value;
        // console.log(price*quantity)
        total += (price * quantity)
    }
    total = Math.round(total * 100) / 100
    document.querySelector('.cart-total-price')
}