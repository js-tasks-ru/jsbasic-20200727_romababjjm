/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
     *          name: '',
     *          age: 25,
     *          salary: '1000',
     *          city: 'Petrozavodsk'
     *   },
 *
 * @constructor
 */
/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      },ы
 *
 * @constructor
 */
export default class UserTable {
  
  constructor(rows) {
    
    this._rows = rows;
    this.elem = this.elemTabale;
    
  }

  

  get elemTabale(){
    function crtE(tagname, textContent) {
      let nodeElement = document.createElement(tagname);
      nodeElement.textContent = textContent;
      return nodeElement;
    }

    
      let table = crtE("table");
      
    
        let thead = crtE("thead");
        table.append(thead);

          let tr_head = crtE("tr");
          thead.append(tr_head);

            tr_head.append(crtE("th", "Имя"));
            tr_head.append(crtE("th", "Возраст"));
            tr_head.append(crtE("th", "Зарплата"));
            tr_head.append(crtE("th", "Город"));
            tr_head.append(crtE("th"));

        let tbody = crtE("tbody");
        table.append(tbody);
          
          this._rows.forEach((obj)=>{
            let tr_body = crtE("tr");
            tbody.append(tr_body);
              tr_body.append(crtE("td", obj.name)); 
              tr_body.append(crtE("td", obj.age)); 
              tr_body.append(crtE("td", obj.salary)); 
              tr_body.append(crtE("td", obj.city));
              let td_btn = crtE("td");
              tr_body.append(td_btn);
              td_btn.append(crtE("button", "X"))
          })



          tbody.addEventListener("click",(event)=>{
            
            if (event.target.tagName === "BUTTON"){
              event.target.closest("tr").remove();
            }
          })      

        
          
    return table;
  }

  

}
