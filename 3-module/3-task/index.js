/**
 * @param {string} str
 * @returns {string}
 */
function camelize(str) {
  return str.split("-")
    .map((word, i) =>{
        if (i != 0){
            return word.slice(0,1).toUpperCase()+word.slice(1,word.length);
        }
        return word;
        
    })
    .join("");

}
