/**
 * @param {string} str
 * @returns {string}
 */
function camelize(str) {
  return str.split("")
  
    .map( (char, i, arr)=>{

      if (char === "-") {
        return;
      } else if (arr[i-1] === "-"){
        return char.toUpperCase();
      }

      return char;
      

    })

    .join("");


}
