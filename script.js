// if (document.readyState == 'loading') {
//     document.addEventListener('DOMContentLoaded', ready)
// } else {
//     ready();
// }

let removeCartItem = () => {
    let btnClicked = event.target
    btnClicked.parentElement.parentElement.remove();
}
// let ready = () => {
let removeCartItemButtons = document.querySelectorAll('.btn-danger');
removeCartItemButtons.forEach(element => {
    let btn = element;
    btn.addEventListener('click', removeCartItem);
});

let quantityInput = document.querySelectorAll('cart-quantity-input')
for (i of quantityInput) {
    let input = i;
    input.addEventListener('change', quantityChanged)
}
// }


let quantityChanged = (event) => {
    let input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    updateCartTotal();
}

let updateCartTotal = () => {
    let cartItemContainer = document.querySelector('cart-items');
    let cartRows = cartItemContainer.querySelector('cart-row')
    for (let i of cartRows) {
        let cartRow = i;
        let priceEl = cartRow.querySelector('cart-price')
        let quantityElement = cartRow.querySelector('cart-quantity-input')
        let price = parseFloat(priceEl.innerText.replace('$', ''));
        // console.log(price)
        let quantity = quantityElement.value
        // console.log(price*quantity)
        total += (price * quantity)
    }
    document.querySelector('cart-total-price')
}