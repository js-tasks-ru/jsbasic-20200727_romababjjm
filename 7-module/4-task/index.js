import createElement from '../../assets/lib/create-element.js';

export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.value = value;

    
    this.elem = this.render();

   
  
    this.allSliderSteps = this.elem.querySelectorAll(".slider__steps span");


    this.allSliderSteps[value].classList.add("slider__step-active");
    this.valuePercentsFunc();
    this.moveThumbProgress();




    this.elem.addEventListener("click", this.clickFunck);

    this.elem.addEventListener("pointerdown", this.pointerDownFunc);
    
   
  } // constructor

  
  valuePercentsFunc(){
    this.valuePercents =  (this.value / (this.steps-1)) * 100;
  }

  moveThumbProgress(){
    let thumb = this.elem.querySelector('.slider__thumb');

    thumb.ondragstart = () => false;

    let progress = this.elem.querySelector('.slider__progress');
    thumb.style.left = `${this.valuePercents}%`;
    progress.style.width = `${this.valuePercents}%`;
  }

  clickFunck = (event)=>{
 

    let left = event.clientX - this.elem.getBoundingClientRect().left; 
    let leftRelative = left / this.elem.offsetWidth;
    let approximateValue = leftRelative * (this.steps-1);
    this.value = Math.round(approximateValue);
    
    

    this.valuePercentsFunc();
    this.moveThumbProgress();
    this.elem.querySelector(".slider__value").textContent = this.value;


    this.allSliderSteps.forEach((step, i)=>{
      if(this.value === i){
        
        step.classList.add("slider__step-active");
        
      }else {
        step.classList.remove("slider__step-active");
      } 


    })

    this.elem.dispatchEvent( new CustomEvent('slider-change', { detail: this.value, bubbles: true }) );


  }  

  pointerDownFunc = (eventDown)=>{
    eventDown.preventDefault();
    if(eventDown.target.closest(".slider__thumb")){
      this.elem.classList.add("slider_dragging");

      document.addEventListener("pointermove", this.pointerMoveFunc);
      document.addEventListener("pointerup", this.pointerUpFunc);
    }

    

  }

  pointerMoveFunc = (eventMove)=>{
    eventMove.preventDefault();
    
    let left = eventMove.clientX - this.elem.getBoundingClientRect().left; 
    let leftRelative = left / this.elem.offsetWidth;
    if (leftRelative < 0) {
      leftRelative = 0;
    }
    
    if (leftRelative > 1) {
      leftRelative = 0;
    }
    
    let leftPercents = leftRelative * 100;
    let thumb = this.elem.querySelector('.slider__thumb');
    let progress = this.elem.querySelector('.slider__progress');
    
    thumb.style.left = `${leftPercents}%`;
    progress.style.width = `${leftPercents}%`;
    let approximateValue = leftRelative * (this.steps-1);
    this.value = Math.round(approximateValue);

    this.elem.querySelector(".slider__value").textContent = this.value;


    
    
    
  }

  pointerUpFunc = ()=>{
    this.valuePercentsFunc();
    this.moveThumbProgress();
    this.elem.dispatchEvent( new CustomEvent('slider-change', { detail: this.value, bubbles: true }) );
    this.allSliderSteps.forEach((step, i)=>{
      if(this.value === i){
        
        step.classList.add("slider__step-active");
        
      }else {
        step.classList.remove("slider__step-active");
      } 
    

    })
    this.elem.classList.remove("slider_dragging");
    document.removeEventListener("pointermove", this.pointerMoveFunc);
    document.removeEventListener("pointerup", this.pointerUpFunc);


  }

  render(){
    let slider =createElement( `
    <!--Корневой элемент слайдера-->
    <div class="slider">
  
      <!--Ползунок слайдера с активным значением-->
      <div class="slider__thumb" style="left: 0%;">
        <span class="slider__value">${this.value}</span>
      </div>
  
      <!--Заполненная часть слайдера-->
      <div class="slider__progress" style="width: 0%;"></div>
  
      <!--Шаги слайдера-->
      <div class="slider__steps">
        
      </div>
    </div>
    `);

    let sliderSteps = slider.querySelector(".slider__steps");
    for(let i = 0; i < this.steps; i++){
      sliderSteps.append(createElement(`<span></span>`))
    }

    return slider;


  }



} //class
