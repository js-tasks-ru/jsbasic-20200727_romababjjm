/**
 * truncate
 * @param {string} str
 * @param {number} maxlength
 * @returns {string}
 */
function truncate(str, maxlength) {
  let newLength = maxlength - 1;
  if (str.length > maxlength){
    let newStr = str.slice(0, newLength);
    return newStr+"…";
  }else {
    return str;
  }
}
