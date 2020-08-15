/**
 * Генерация HTML списка друзей
 * @param {Object[]} friends
 * @return {HTMLUListElement}
 */
function makeFriendsList(friends) {
  let ul = document.createElement("ul");
    
    
  friends.map( obj =>{
      return `${obj.firstName} ${obj.lastName}`;
  })
  .forEach( friend=>{
      let li = document.createElement("li");
      li.textContent = friend;
      ul.appendChild(li);
  })

  return ul;
}
