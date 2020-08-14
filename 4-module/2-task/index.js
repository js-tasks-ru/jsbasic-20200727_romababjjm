/**
 * @param {HTMLTableElement} table
 * @return {void}
 */
function makeDiagonalRed(table) {
    
   let trAll = table.querySelectorAll("tr");
 
    
   trAll.forEach((tr, i)=>{
       let tdAll = tr.querySelectorAll("td");
       tdAll.forEach((td, j)=>{
           if (i === j) {
           td.style.backgroundColor = "red";
           }
       })
   })

}
