/**
 * checkSpam
 * @param {string} str base
 * @returns {boolean}
 */
function checkSpam(str) {
  let lowerStr = str.toLowerCase();
  if (lowerStr.includes("1xbet")||lowerStr.includes("xxx")){
    return true;
  } else {
    return false;
  }
}
