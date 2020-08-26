import createElement from '../../assets/lib/create-element.js';
import createNodeElement from '../../assets/lib/createNodeElement.js';
export default class ProductCard {
  constructor(product) {

    this._productObj = product;
    
    this.elem = this.render(product);

  }

  render(product){

    let template = `
  
    <div class="card">
    <div class="card__top">
        <img src="/assets/images/products/${product.image}" class="card__image" alt="product">
        <span class="card__price">€${product.price.toFixed(2)}</span>
    </div>
    <div class="card__body">
        <div class="card__title">${product.name}</div>
        <button type="button" class="card__button">
            <img src="/assets/images/icons/plus-icon.svg" alt="icon">
        </button>
    </div>
    </div>

`
      
    // let cardDiv = document.createElement("div");
    // cardDiv.classList.add("card");

    let cardDiv = createNodeElement ({nodeName: "div", class: "card"});

    cardDiv.insertAdjacentHTML("afterbegin", template);

    cardDiv.querySelector(".card__button").addEventListener("click", function(){
    
      this.dispatchEvent( new CustomEvent("product-add", { detail: product.id, bubbles: true }) );

    })

    
    

    return cardDiv;



}


}
