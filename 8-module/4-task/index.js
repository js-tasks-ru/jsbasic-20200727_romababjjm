import createElement from '../../assets/lib/create-element.js';
import escapeHtml from '../../assets/lib/escape-html.js';

import Modal from '../../7-module/2-task/index.js';

export default class Cart {
  cartItems = []; // [product: {...}, count: N]
  yourOrder;
  constructor(cartIcon) {
    this.cartIcon = cartIcon;

    this.addEventListeners();
  }

  addProduct(product) {
    let cartItem = this.cartItems.find((cart)=> {
      return product.id === cart.product.id;
     })
     if(!cartItem){
       let newCartItem = {};
       newCartItem.product = product;
       newCartItem.count = 1;
       this.cartItems.push(newCartItem);
     } else{
       cartItem.count++;
     }
    
     this.onProductUpdate();
  }

  updateProductCount(productId, amount) {
    let updateProductTarget = this.cartItems.find((cartItem)=>{
      return productId === cartItem.product.id;
    })
    updateProductTarget.count+=amount;
   
    if(updateProductTarget.count < 1 ) {
     this.cartItems.forEach((cartItem, i)=>{
        if(updateProductTarget.product.id === cartItem.product.id){
          if (i === 0){
            this.cartItems.splice(i,1);
          }
          this.cartItems.splice(i,i);
          
        }
      })
    }

    
    this.onProductUpdate();

  }

  isEmpty() {
    if(this.cartItems.length > 0){
      return false;
    }
    return true;
  }

  getTotalCount() {
    let totaCount = 0;
    this.cartItems.forEach(cartItem=>{
      totaCount+=cartItem.count;
    })

    return totaCount;
  }

  getTotalPrice() {
    let totalPrice = 0;
    this.cartItems.forEach(cartItem=>{
      let priceForOne = cartItem.product.price * cartItem.count;
     
      totalPrice += priceForOne;
    })

    return totalPrice;
  }

  renderProduct(product, count) {
    return createElement(`
    <div class="cart-product" data-product-id="${
      product.id
    }">
      <div class="cart-product__img">
        <img src="/assets/images/products/${product.image}" alt="product">
      </div>
      <div class="cart-product__info">
        <div class="cart-product__title">${escapeHtml(product.name)}</div>
        <div class="cart-product__price-wrap">
          <div class="cart-counter">
            <button type="button" class="cart-counter__button cart-counter__button_minus">
              <img src="/assets/images/icons/square-minus-icon.svg" alt="minus">
            </button>
            <span class="cart-counter__count">${count}</span>
            <button type="button" class="cart-counter__button cart-counter__button_plus">
              <img src="/assets/images/icons/square-plus-icon.svg" alt="plus">
            </button>
          </div>
          <div class="cart-product__price">€${(count * product.price).toFixed(2)}</div>
        </div>
      </div>
    </div>`);
  }

  renderOrderForm() {
    return createElement(`<form class="cart-form">
      <h5 class="cart-form__title">Delivery</h5>
      <div class="cart-form__group cart-form__group_row">
        <input name="name" type="text" class="cart-form__input" placeholder="Name" required value="Santa Claus">
        <input name="email" type="email" class="cart-form__input" placeholder="Email" required value="john@gmail.com">
        <input name="tel" type="tel" class="cart-form__input" placeholder="Phone" required value="+1234567">
      </div>
      <div class="cart-form__group">
        <input name="address" type="text" class="cart-form__input" placeholder="Address" required value="North, Lapland, Snow Home">
      </div>
      <div class="cart-buttons">
        <div class="cart-buttons__buttons btn-group">
          <div class="cart-buttons__info">
            <span class="cart-buttons__info-text">total</span>
            <span class="cart-buttons__info-price">€${this.getTotalPrice().toFixed(
              2
            )}</span>
          </div>
          <button type="submit" class="cart-buttons__button btn-group__button button">order</button>
        </div>
      </div>
    </form>`);
  }

  renderModal() {
    this.yourOrder = new Modal;
    this.yourOrder.setTitle('Your order');
    let divYourOrder = createElement(`<div class="order-wrapper"></div>`);
    this.cartItems.forEach(cardItem=>{
      divYourOrder.append(this.renderProduct(cardItem.product, cardItem.count));
    })

    divYourOrder.append(this.renderOrderForm());
    this.yourOrder.setBody(divYourOrder);
    divYourOrder.addEventListener("click", this.onclickOrder);

   
    let form = divYourOrder.querySelector(".cart-form");
    form.addEventListener("submit", this.onSubmit);
    
    this.yourOrder.open();
    
    
    
  }

  

  onclickOrder = (event)=>{
    if (event.target.closest(".cart-counter__button_plus")){
      let dataProductId = event.target.closest(".cart-product").getAttribute("data-product-id");
     
      this.updateProductCount(dataProductId, 1);
      
    }
    if (event.target.closest(".cart-counter__button_minus")){
      let dataProductId = event.target.closest(".cart-product").getAttribute("data-product-id");
      this.updateProductCount(dataProductId, -1)
      
    }
  }

  onProductUpdate() {
    let yourOrder = document.querySelector(".order-wrapper");

  

    if(yourOrder){
      let allcartProducts = yourOrder.querySelectorAll(".cart-product");
      allcartProducts.forEach(cart=>{
        cart.remove();
      })
      let form = yourOrder.querySelector(".cart-form");
      form.remove();
      this.cartItems.forEach(cardItem=>{
        yourOrder.append(this.renderProduct(cardItem.product, cardItem.count));
      })
      yourOrder.append(this.renderOrderForm());
      let newForm = yourOrder.querySelector(".cart-form");
      newForm.addEventListener("submit", this.onSubmit);
      if(this.isEmpty()){
        this.yourOrder.close();
      }
    }

   

    this.cartIcon.update(this);
  }

  onSubmit =(event)=>{
    event.preventDefault();
    let btn = event.target.querySelector(".cart-buttons__button");
    btn.classList.add("is-loading");
    
    let formData = new FormData(event.target);
  
    let promise = fetch("https://httpbin.org/post",{
      method: 'POST',
     
      body: formData
    })

    promise.then(response=>{
      this.cartItems = [];

      this.yourOrder.elem.querySelector(".modal__title").textContent = "Success!";
      this.yourOrder.elem.querySelector(".modal__body").innerHTML = `

      <div class="modal__body-inner">
      <p>
        Order successful! Your order is being cooked :) <br>
        We’ll notify you about delivery time shortly.<br>
        <img src="/assets/images/delivery.gif">
      </p>
      </div>

      `
      this.onProductUpdate();
    })

  };

  addEventListeners() {
    
    this.cartIcon.elem.onclick = () => this.renderModal();
    
  }
}

