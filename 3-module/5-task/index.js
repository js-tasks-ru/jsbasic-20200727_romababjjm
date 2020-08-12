/**
 * Найти min/max в произвольной строке
 * @param   {string} str -  входные данные
 * @returns {{min:number, max:number}}  объект
 */
function getMinMax(str) {
  let firstFilter = str
  .split("")
  .filter( (item)=>{
    if(item.charCodeAt()===32 || item.charCodeAt()===44 || item.charCodeAt()===45 || item.charCodeAt()===46 || ( item.charCodeAt() > 47 && item.charCodeAt() < 58)  ){
      
      return item;
    } 
  })
  .filter ((item, i, arr)=>{
      if (item === "," || item === " "){
        if (arr[i-1]=== "," || arr[i-1] === " "){
           return;
        }
      }
      return item;
  })
  .map ((item)=>{
    if(item === "," || item === " "){
      return " ";
    }
    return item;
  })
  .join("")
  .split(" ");

  

  let result = {
    min: Math.min(...firstFilter),
    max: Math.max(...firstFilter)
  }

  return result;
  
  
}
