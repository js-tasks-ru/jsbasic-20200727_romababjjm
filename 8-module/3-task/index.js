export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
    
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
   
    if(updateProductTarget.count < 1) {
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

  onProductUpdate() {
    // реализуем в следующей задаче

    this.cartIcon.update(this);
  }
}

