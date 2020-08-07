let calculator = {
  a: 0,
  b: 0,
  read(firstV, secondV){
    if (typeof(firstV)==="number" && typeof(secondV)==="number"){
  

    this.a = firstV;
    this.b = secondV;
    } else {
      console.log("this values must be a numbers")
    }
  },

  sum(){
    return this.a + this.b;
  },

  mul(){
    return this.a * this.b;
  }
};

// НЕ УДАЛЯТЬ СТРОКУ, НУЖНА ДЛЯ ПРОВЕРКИ
window.calculator = calculator; // делает ваш калькулятор доступным глобально
