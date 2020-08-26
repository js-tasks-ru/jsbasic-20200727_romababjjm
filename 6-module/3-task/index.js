import createElement from '../../assets/lib/create-element.js';
import createNodeElement from '../../assets/lib/createNodeElement.js';

export default class Carousel {
  constructor(slides) {
    this.slides = slides;
    this.elem = this.render(slides);
  }

  render(slides){
      
    let carouselDiv = createNodeElement({nodeName:"div", class:"carousel"});

    let arrowsTemplate = `
    <div class="carousel__arrow carousel__arrow_right">
    <img src="/assets/images/icons/angle-icon.svg" alt="icon">
    </div>
    <div class="carousel__arrow carousel__arrow_left">
      <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
    </div>
    `;

    carouselDiv.insertAdjacentHTML("afterbegin", arrowsTemplate);

    let carouselInner = createNodeElement({nodeName:"div", class:"carousel__inner"});

    carouselDiv.append(carouselInner);

    slides.forEach( (obj)=>{
      carouselInner.append(this.carouselSlideCrt(obj));
    } );

      this.initCarousel(carouselDiv);

      return carouselDiv;

  }

  carouselSlideCrt(slideObj){
 
    let slideDiv = createNodeElement({
          nodeName:"div", 
          class:"carousel__slide", 
          attributeName:"data-id",
          attributeValue: slideObj.id
    })

        let template = `
        <img src="/assets/images/carousel/${slideObj.image}" class="carousel__img" alt="slide">
        <div class="carousel__caption">
          <span class="carousel__price">€${slideObj.price.toFixed(2)}</span>
          <div class="carousel__title">${slideObj.name}</div>
          <button type="button" class="carousel__button">
            <img src="/assets/images/icons/plus-icon.svg" alt="icon">
          </button>
        </div>
        `;

      slideDiv.insertAdjacentHTML("afterbegin", template);

      return slideDiv;
  }

  initCarousel(carousel) {
      
    
    let transformTarget = carousel.querySelector(".carousel__inner");
    let allCarouselSlides = transformTarget.querySelectorAll(".carousel__slide");
  
    let arrLeft = carousel.querySelector(".carousel__arrow_left");
    let arrRight = carousel.querySelector(".carousel__arrow_right");
  
    let numberOfSlides = allCarouselSlides.length;
    let transformValue = 0;
    let carouselClick = (event)=>{
      let transformWidth = transformTarget.offsetWidth;
  
      if(event.target.closest(".carousel__arrow_left")){
      
        transformValue += transformWidth;
        transformTarget.style.transform = `translateX(${transformValue}px)`;
  
      } else if(event.target.closest(".carousel__arrow_right")){
      
        transformValue -= transformWidth;
        transformTarget.style.transform = `translateX(${transformValue}px)`;
  
      }
  
  
      let isLastSlide = numberOfSlides ===((-transformValue)/transformWidth+1);
  
  
      if ( isLastSlide ){
        arrRight.style.display = "none";
      } else {
        arrRight.style.display = "";
      }
  
      if (transformValue < 0){
        arrLeft.style.display = "";
      } else  if (transformValue === 0){
        arrLeft.style.display = "none";
      }
  
      
      if (event.target.closest(".carousel__button")){
        let dataId = event.target.closest(".carousel__slide").getAttribute("data-id");
        let button = event.target.closest(".carousel__button");
        button.dispatchEvent( new CustomEvent("product-add", { detail: dataId, bubbles: true }) );
      }
  
  
    }
  
    if (transformValue === 0){
      arrLeft.style.display = "none";
    }
    

    
  
    carousel.addEventListener("click", carouselClick);
  }

}
