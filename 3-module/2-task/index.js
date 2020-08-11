/**
 * @param {number[]} arr
 * @param {number} a
 * @param {number} b
 * @returns {number[]}
 */
function filterRange(arr, a, b) {
  return arr.filter( elem =>{
    if (elem >= a && elem<=b){
      return elem;
    }
  } )
}
