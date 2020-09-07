import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  constructor() {
    
    this.title;
    this.modalBody;

    this.elem;

    
    
  }

  clickFunc = (event)=>{
    if(event.target.closest(".modal__close")){
        this.close();
    }
  }

  keydownFunc = (event)=>{
   if(event.code === "Escape"){
     this.close();
   }
  }

  close(){
    let body = document.querySelector("body");
    body.classList.remove("is-modal-open");
    this.elem.remove();

    this.elem.removeEventListener("click", this.clickFunc);
    document.removeEventListener("keydown", this.keydownFunc);

  }

  render(){

    let modal = createElement(`
    <!--Корневой элемент Modal-->
    <div class="modal">
      <!--Прозрачная подложка перекрывающая интерфейс-->
      <div class="modal__overlay"></div>
  
      <div class="modal__inner">
        <div class="modal__header">
          <!--Кнопка закрытия модального окна-->
          <button type="button" class="modal__close">
            <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
          </button>
  
          <h3 class="modal__title">${this.title}</h3>
        </div>
  
        <div class="modal__body">
         
        </div>
      </div>
  
    </div>
    `);

    modal.querySelector(".modal__body").append(this.modalBody);

   return modal;

  }

  setTitle(title){
    this.title = title;
  }

  setBody(modalBody){
    this.modalBody = modalBody;
  }

  open(){
    this.elem = this.render();

    this.elem.addEventListener("click", this.clickFunc);
    document.addEventListener("keydown", this.keydownFunc);

    let body = document.querySelector("body");
    body.classList.add("is-modal-open");
    body.append(this.elem);
  }


}
