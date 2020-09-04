import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  constructor(categories) {

    this.categories = categories;
    this.elem = this.render();

    this.ribbonInner = this.elem.querySelector(".ribbon__inner");
    this.btnLeft = this.elem.querySelector(".ribbon__arrow_left");
    this.btnRight = this.elem.querySelector(".ribbon__arrow_right");

    this.elem.addEventListener("click", this.clickRibbon);
    this.ribbonInner.addEventListener("scroll", this.scrollRibbonInner);
    this.ribbonInner.querySelector(".ribbon__item").click();
    
  }

  render(){
    let ribbon = createElement(`

    <div class="ribbon">
    <!--Кнопка прокрутки влево-->
    <button class="ribbon__arrow ribbon__arrow_left">
      <img src="/assets/images/icons/angle-icon.svg" alt="icon">
    </button>

    <!--Ссылки на категории-->
    <nav class="ribbon__inner">

    </nav>

    <!--Кнопка прокрутки вправо-->
    <button class="ribbon__arrow ribbon__arrow_right  ribbon__arrow_visible">
      <img src="/assets/images/icons/angle-icon.svg" alt="icon">
    </button>
    </div>

    `);

    let ribbonInner = ribbon.querySelector(".ribbon__inner");

    this.categories.forEach(category => {
      let ribonItem = createElement(`<a href="#" class="ribbon__item" data-id=${category.id}>${category.name}</a>`)
      ribbonInner.append(ribonItem);
    });




    return ribbon;
  }

  clickRibbon = (event)=>{
      event.preventDefault();
        if(event.target.closest(".ribbon__arrow_left")){
          this.scrollLeft350();
        }

        if(event.target.closest(".ribbon__arrow_right")){
          this.scrollRight350();
        }

        let allRibbonItems = this.ribbonInner.querySelectorAll(".ribbon__item");
        
        if(event.target.closest(".ribbon__item")){
          event.target.classList.add("ribbon__item_active");

            allRibbonItems.forEach(ribonItem=>{
                if(event.target != ribonItem){
                  ribonItem.classList.remove("ribbon__item_active");
                }
            })
          let dataId = event.target.getAttribute("data-id");
          this.elem.dispatchEvent( new CustomEvent("ribbon-select", { detail: dataId, bubbles: true }) );
          
        }
  }

  scrollRibbonInner = ()=>{
    let scrollLeft = this.ribbonInner.scrollLeft;
    let scrollWidth = this.ribbonInner.scrollWidth;
    let clientWidth = this.ribbonInner.clientWidth;
    let scrollRight = scrollWidth - scrollLeft - clientWidth;
   
    if (scrollRight === 0){
      this.btnRight.classList.remove("ribbon__arrow_visible");
    }else {
      this.btnRight.classList.add("ribbon__arrow_visible");
    }

    if (scrollLeft === 0){
      this.btnLeft.classList.remove("ribbon__arrow_visible");
    }else {
      this.btnLeft.classList.add("ribbon__arrow_visible");
    }
  }

  scrollRight350(){
    this.ribbonInner.scrollBy(350, 0);
  }

  scrollLeft350(){
    this.ribbonInner.scrollBy(-350, 0);
  }

  
}
