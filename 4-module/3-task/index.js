/**
 * Метод устанавливает необходимые по условию аттрибуты таблице
 * @param {Element} table
 */
function highlight(table) {

    
    let tbody = table.querySelector("tbody");    

    let trAll = tbody.querySelectorAll("tr");

    trAll.forEach( (tr)=>{
       tdAll = tr.querySelectorAll("td");
       tdAll.forEach((td, j)=>{

            switch (j) {
                case 3:

                    if (td.dataset.available === "true"){
                        tr.classList.add("available");
                    } else if (td.dataset.available === "false"){
                        tr.classList.add("unavailable");
                    } else {
                        tr.setAttribute("hidden","")
                    }
                    
                break;

                case 2:

                    if(td.textContent === "m"){
                        tr.classList.add("male");
                    }else if (td.textContent === "f"){
                        tr.classList.add("female");
                    }

                break;
                
                case 1:

                    if (Number(td.textContent)<18){
                        tr.style.textDecoration = "line-through";
                    }

                break;
            
                default:
                    break;
            }

          
              
          




       })
    } )
    



}
