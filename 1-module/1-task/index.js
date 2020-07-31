/**
 * Factorial
 * @param {number} n
 * @returns {number}
 */
function factorial(n) {
  if(n>=0){
    let res = 1;
    for(n; n!=0; n--){
        
        res = res*n;
        
    }
    return res;
  } else {
      return "need number >= 0"
  }
}
