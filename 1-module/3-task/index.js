/**
 * ucFirst
 * @param {string} str
 * @returns {string}
 */
function ucFirst(str) {
  if(str != ""){
    return str[0].toUpperCase()+str.slice(1,str.length);
    }else{
      return "";
    }
}
