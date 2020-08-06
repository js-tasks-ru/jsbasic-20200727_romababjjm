/**
 * Проверяем объект obj на пустоту
 * @param {Object} obj
 * @returns {Boolean}
 */
function isEmpty(obj) {
  for (const key in obj) {
    
       
    if ((typeof(key)==="string")){
      return false;
    }


    
    
  }

  return true;
}
