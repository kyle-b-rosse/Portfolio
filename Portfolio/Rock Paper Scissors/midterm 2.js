//1. What was the point of installing Node.js, NPM, Gulp, and Babel?
//
Node.js runs on a virtual machine within the computer, allowing the javascript to be run through the back end
NPM allows you to install build tools
gulp is a build tool that transpiles?
babel translates smart JS to dumb JS

 //2. What is a data type that can have only the values true or false? Provide an example.
 //
 boolean value


//3. What is a null value? Provide one example.
Null value is the lack of any value 

//4. List and describe 3 more data types used in JS.

object, variable, number, string 

//5. Write code that will concatenate 2 strings and a number. Make sure to include how you will print it out.

let concactFun = function(string1, string2, number){
	let num = Number(number);
	return string1 + string2 + number;
};

//6. How would you convert 7.3434343 to a string?

toString(7.3434343);

//7. Write the code to  print out the length of the string "I love JS".
let stringLove = "I Love JS";

console.log(stringLove.length);

//8. What is the difference between a statement and an expression. Use examples to explain your answer.
----------------------ASK---------------
statement is something that states a value, like x +3

expression is something that produces a value, like let mars = "red planet";

//9. Explain the keywords Let and Const and explain how their uses differ from Var.
----------------------------------------ASK-------------------------------------------

Let defines a variable, very similar to Var
Const defines an imutable variable that cannot be changed later

//10. What's the difference between == and ===?
== is for mostly equal, will return equal for null and undefined
=== is for exaclty equal

//11. What's the difference between != and !==?
----------------------------------------ASK-------------------------------------------

!= means exactly not equal 
!== not really sure?(Identical)

//12. What does (7 - 4 && 6 + 3) || (7 < 5 || 8 > 4) evaluate to? Explain how you solved your answer.
//
True. 8>4 is true in an or statement, within another or statement. Or statements produce boolean values

//13. Write a conditional statement that prints out 'even' when the variable 'number' is even.
//
if(number %2 === 0){
	console.log(number)
}

//14. Write a conditional statement that prints out "good job" if the variable answer is true and "try again" if the variable answer is false.
//
if (answer === true){
	console.log("good job");
} else {
	console.log("try again");
}

//15. Write a conditional statement that prints out "divisible by 2", "divisible by 3", "divisible by 4", or "divisible by 5" if a number is divisible by each of these numbers, respectively.
	if(number %2 === 0){
	console.log("divisible by 2");
	} else if(number %3 === 0){
	console.log("divisible by 3");
	} else if(number %4 === 0){
	console.log("divisible by 4");
	} else if(number %5 === 0){
	console.log("divisible by 5");
	}

//16. Write code to print out the length of the 'colors' array and then the 3rd color of the array.

var colors = ["red", "orange", "yellow", "green", "blue", "indigo", "violet"]

console.log(colors.length);
console.log(colors[2]);

//17. Write code to add the color 'dark-violet' to the 'colors' array.
colors.push['dark-violet'];

//18. Write code to add the color 'orange-yellow' to the 'colors' array between the colors orange and yellow. (So your array will print out red, orange, orange-yellow, yellow, green, blue, indigo, violet, dark-violet)``
colors.add(2, 0, 'orange-yellow');

 //19. Write the code to delete 'orange' from the array.
---------------------ASK-------------------

 colors.delete(2, 1); (Check at home)

//20. Create a map that stores the following data:
// 1775 American Revolution
// 1776 Declaration of Independence
// 1787 Constitution

const USAHist = new Map[
	{'1775', 'American Revolution'},
	{'1776', 'Declaration of Independence'},
	{'1787', 'Constitution'}
	];

//21. Using the map created in problem 20, write the code that will:
// Add the date "2001 Terrorist Attack", then delete "1775 American Revolution", and finally print out: "1787 Constitution".
---------------------ASK-------------------

USAHist.add({'2001', 'Terrorist Attack'});
USAHist.delete({'1775'});
console.log(USAHist[1787]); (?)

//22. Create a set with your 5 favorite songs. Determine if "Sweet Home Alabama" is in the set.
---------------------ASK-------------------

const favSongs = new Set([
	'Stingmup',
	'Flechlet',
	'Smmuunkk',
	'Sweet Home Alabama',
	'Weep Shown Hall and Sarah',
	]);

favSongs.indexOf('Sweet Home Alabama');

//23. Convert the above set into an array.
let songArray = [];

for(let song in favSongs){
	songArray.push(song);
};

//24. Create an object that describes your favorite city. Include properties that have a string, a number, a boolean, and an array as values. Write code to print out one of the properties.
---------------------ASK-------------------
(Check MDN)
let northAdams = new Object[
	name: 'North Adams',
	population: 100,
	pretty_cool: true,
	famousPeople: ['nick', 'steve', 'that guy', 'her'],
	];
//25. Use a for loop to print out all the multiples of 3 between 1 and 100.
//
for (let i =0; i <=100; i++){
	if(i %3 ===0){
		console.log(i);
	}
};

//26. Use a while loop to print out all the multiples of 7 between 1 and 100 in reverse order.

let dum = 100;

while(dum > 0){
	if(dum % 7 === 0){
		console.log(dum);
	}
	dum--;
};

//27. Create a JSON object containing an array of the following movies:
//     The Abyss - Sci-Fi - 1989 - James Cameron
//     Alien - Sci-Fi - 1979 - Ridley Scott
//     Aliens - Sci-Fi - 1986 - James Cameron
//     Field of Dreams - Drama  - 1989 - Phil Alden Robinson
// Answer:



// 28. Write code that will print out the year of the 3rd movie in your JSON object.

// 30. Create a function that prints out the average of an array of numbers.

let numbers = [1, 2, 3, 4, 5, 6, 7];

let numAvg = function(array){
	let numFunc = array.reduce((a,b) => a+b); 
	console.log(numFunc/2);
});



// 31. Call your above function and write the code to make the average print out.

numAvg(numbers);

// 32. Use map to iterate the array [1,2,3,4,5,6,7,8,9,10] and add 10 to each element.

let oneToTen = [1,2,3,4,5,6,7,8,9,10];

let timesTen = oneToTen.map(+10);

// 33. Use ternary operators to shrink the following code:
// 
--------------------------create examples (look up if/else examples to use)-----------------------------
    var light = 'on';

    function toggleLight() {
       light = light === 'on' ? 'off' : 'on'
   }


// 34. Use filter to determine which movies in your favorite movies were released after 1990. Log the titles of those movies.

// 35. Use the reduce array method to print out the oldest of your favorite movies.


// Bonus: Suppose you're working for twitter and you have the following arrays available.

    var username = ['JoeQuery', 'CLofton', 'RLowe']
    var tweet = ['You are my sunshine', 'Amarillo by morning, up from San Anton', 'giggidy giggidy']
    var date = [ "07/24/2015" , "09/25/2015", "10/25/2015" ]

// Generate an ordered list of tweets of the following form:

    <ul>
        <li>@JoeQuery - You are my sunshine - Posted on 07/24/2015</li>
        <li>@CLofton - Amarillo by morning, up from San Antone - Posted on 09/25/2015</li>
        <li>@RLowe - giggidy giggidy - Posted on 10/25/2015</li>
    </ul>
// Answer:
