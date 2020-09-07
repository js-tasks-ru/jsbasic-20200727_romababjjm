import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';
import products from './products.js';

export default class ProductGrid {
  constructor(products) {
    this.products = products;
    this.filters = {};
    
    this.elem = this.render(products);

  }

    render(){

      let productGridElement = createElement(`

      <div class="products-grid">
      <div class="products-grid__inner">
      </div>
      </div>

      `);
      let productGridInner = productGridElement.querySelector(".products-grid__inner");


      this.products.forEach( (productElem) => {
        
        let singleCard = new ProductCard(productElem);
 

        productGridInner.append(singleCard.elem);
        
        
      });

      return productGridElement;

    
    }

    updateFilter(filters){
      for (const key in filters) {

          this.filters[key] = filters[key];
          
        }
    
    
      this.updateElem();
    }


    updateElem(){
      let gridInner = this.elem.querySelector(".products-grid__inner");
      let allCards = gridInner.querySelectorAll(".card");

      
      allCards.forEach(card=>card.remove());



      let filteredProducts = this.products.filter((product)=>{
        if(this.filters.category === product.category){
          return product;
        } else if(!this.filters.category){
          return product;
        }
        
        
      }).filter((product)=>{
        if(this.filters.maxSpiciness >= product.spiciness){
          return product;
        }else if(!this.filters.maxSpiciness){
          return product;
        }
      }).filter((product)=>{
        if(this.filters.vegeterianOnly === product.vegeterian){
          return product;
        }else if(!this.filters.vegeterianOnly){
          return product;
        }
      }).filter((product)=>{
        if(!(this.filters.noNuts === product.nuts)){
          return product;
        }else if(!this.filters.noNuts){
          return product;
        }
      })

      filteredProducts.forEach((product)=>{

        let singleCard = new ProductCard(product);
 

        gridInner.append(singleCard.elem);
      })
      
    }

  

}
