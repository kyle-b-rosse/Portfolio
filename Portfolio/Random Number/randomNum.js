var num1 = prompt("Hey, how 'bout you give me a number?");
var num2 = prompt("How 'bout you give me a different number?");
num1 = Number(num1);
num2 = Number(num2);

console.log(num1, num2);

var num1Check = isNaN(num1);
var num2Check = isNaN(num2);


if (num1Check === true) {
  document.write("I said numbers, stupid...");
} else if (num2Check === true) {
  document.write("I said numbers, stupid...");
} else if (num1 === num2) {
  document.write("I said different numbers, dumdum...");
}
  
if (num1 > num2) {
  var highNum = num1;
  var lowNum = num2;
} else {
  var highNum = num2;
  var lowNum = num1;
}
  
console.log(highNum, lowNum);

if (num1Check === true) {
    document.write(" You don't get to play anymore.");
} else if (num2Check === true) {
   document.write(" You don't get to play anymore.");
}  else if (num1 === num2) {
   document.write(" You don't get to play anymore.");
} else { 
    alert("Now I'm going to give you a random number between " + lowNum + " and " + highNum + ".");
    document.write("Your random number between " + lowNum + " and " + highNum + " is...");
    function randomNum (lowNum, highNum) {
      return Math.floor(Math.random() * (highNum - lowNum + 1)) + lowNum; 
    }
    
    document.write(randomNum(lowNum, highNum));
}
