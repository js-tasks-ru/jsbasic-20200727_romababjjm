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
import createNodeElement from '../../assets/lib/createNodeElement.js';

export default class UserTable {
  
  constructor(rows) {
    
    this._rows = rows;
    this.elem = this.elemTabale();
    
  }

  

  elemTabale(){
    

    
      let table = createNodeElement({nodeName:"table"});
      
    
        let thead = createNodeElement({nodeName:"thead"});
        table.append(thead);

          let tr_head = createNodeElement({nodeName:"tr"});
          thead.append(tr_head);

            tr_head.append(createNodeElement({nodeName:"th", textContent:"Имя"}));
            tr_head.append(createNodeElement({nodeName:"th", textContent:"Возраст"}));
            tr_head.append(createNodeElement({nodeName:"th", textContent:"Зарплата"}));
            tr_head.append(createNodeElement({nodeName:"th", textContent:"Город"}));
            tr_head.append(createNodeElement({nodeName:"th"}));

        let tbody = createNodeElement({nodeName:"tbody"});
        table.append(tbody);
          
          this._rows.forEach((obj)=>{
            let tr_body = createNodeElement({nodeName:"tr"});
            tbody.append(tr_body);
              tr_body.append(createNodeElement({nodeName:"td", textContent:obj.name})); 
              tr_body.append(createNodeElement({nodeName:"td", textContent:obj.age})); 
              tr_body.append(createNodeElement({nodeName:"td", textContent:obj.salary})); 
              tr_body.append(createNodeElement({nodeName:"td", textContent:obj.city}));
              let td_btn = createNodeElement({nodeName:"td"});
              tr_body.append(td_btn);
              td_btn.append(createNodeElement({nodeName:"button", textContent:"X"}))
          })



          tbody.addEventListener("click",(event)=>{
            
            if (event.target.tagName === "BUTTON"){
              event.target.closest("tr").remove();
            }
          })      

        
          
    return table;
  }

  

}
