function initCarousel() {
  let carousel = document.querySelector(".carousel");
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


    if ( numberOfSlides ===((-transformValue)/transformWidth+1)){
      arrRight.style.display = "none";
    } else {
      arrRight.style.display = "";
    }

    if (transformValue < 0){
      arrLeft.style.display = "";
    } else  if (transformValue === 0){
      arrLeft.style.display = "none";
    }




  }

  if (transformValue === 0){
    arrLeft.style.display = "none";
  }


  carousel.addEventListener("click", carouselClick);
}
