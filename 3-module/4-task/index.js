/**
 * showSalary
 * @param {Array} users - данные о пользователях
 * @param {number} age - максимальный возраст
 * @returns {string}
 */
function showSalary(users, age) {
  return users.filter (user => {
    if (user.age > age){
      return;
    }
    return user;
    })
    .map (user => `${user.name}, ${user.balance}`)
    .join("\n");
}
