//Alright so here I gathered user input on a prompt
//and put it into the variable userPlay
//I also made it lowercase for comparison reasons later
let userPlay = prompt("Why don't you pick. Rock, Paper, or Scissor?").toLowerCase();

//Here was a problem. I didn't know how to check if they played correctly
//First off was the blank answer
if (userPlay === ''){
    document.write('Learn the Rules You Turkey!');
} 

//Then I had to check if it were Rock, paper, or scissors
//Otherwise I would yell at them for being a turkey
if (userPlay === 'rock'){
    document.write('Lets play!     ');
} else if (userPlay === 'scissors'){
    document.write('Lets play!     ');
} else if (userPlay === 'paper'){
    document.write('Lets play!     ');
} else {
    document.write('Learn the Rules you Turkey');
}


//Let's get started on the computer play
//first up, generate a random number between 1-3

let compRPS = Math.random() * 3;

//Now create a function to generate the Comp's Play into R,P, or S


let compPlay = function(){
    if(compRPS < 1){
        compRPS = "rock";
    } else if (compRPS < 2) {
        compRPS = "scissors";
    } else {
        compRPS = "paper";
    }
    return compRPS;
};


//Call it into play and start the game
compPlay();

//Here's te fun part
//First part is simple: is this a tie?

if(compRPS === userPlay){
    document.write("It's a Tie!");
} 

//Now we have to check the compPlay as either Rock, Paper or Scissors
//And then see how they would do against our potential Human Plays
  else if (compRPS === "rock"){
    if (userPlay === "scissors"){
        document.write("Rock Crushes Scissors! Computer Wins!");
    } else if (userPlay === "paper"){
        document.write("Paper Covers Rock! You Win!");
    }
}

  else if (compRPS === "scissors"){
    if (userPlay === "rock"){
        document.write("Rock Crushes Scissors! You Win!");
    } else if (userPlay === "paper"){
        document.write("Scissors Cuts Paper! Computer Wins!");
    }
} 

  else if (compRPS === "paper"){ 
    if (userPlay === "scissors"){
        document.write("Scissors Cuts Paper! You Win!");
    } else if (userPlay === "rock"){
        document.write("Paper Covers Rock! Computer Wins!");
    } 
}

//Boom Shaka-Laka


// Front End Intermediate Section 1 Midterm
// 
Directions: Write your answers in the space provided after the word answer.

// 
//1. What was the point of installing Node.js, NPM, Gulp, and Babel?
// Answer:




 Node.js is a server side Javascript compiler. Lets you run javascript on your personal computers virtual machine
NPM installs packages that you can use on Node.js to stay current/ do things regualr JS cant alone
Gulp is a task manager that runs tasks
babel translates smart JS EC2015 into older JS for older browsers

 //2. What is a data type that can have only the values true or false? Provide an example.
// Answer:




 Boolean

//3. What is a null value? Provide one example.
// Answer:




 the absence of a value. There is nothing in the object would be null

//4. List and describe 3 more data types used in JS.
// Answer:




 number, string, boolean

//5. Write code that will concatenate 2 strings and a number. Make sure to include how you will print it out.
// Answer:




// 
let funTimes = function(string1, string2, number){
    let num = Number(number);
    console.log(string1 + string2 + num);
}

//6. How would you convert 7.3434343 to a string?
// Answer:





// 
    let numString = toString(7.3434343);

//7. Write the code to  print out the length of the string "I love JS".
// Answer:




//
    let string = "I love JS";
    console.log(string.length);

 //8. What is the difference between a statement and an expression. Use examples to explain your answer.
// Answer:




// 
    expression produces a value: x+3;
    statement performs an action: let x = 3;

//9. Explain the keywords Let and Const and explain how their uses differ from Var.
// Answer:




// 
    let set's a name for a value, but it is mutable and can be changed later in the code. Const cannot be changed later in the code.

//10. What's the difference between == and ===?
// Answer:




// 
    == means that things can be roughly equal, like null and undefined, but not exactly equal
    === means exactly equal

//11. What's the difference between != and !==?
// Answer:




// 
    != means does not equal
    !== is a more strict version of the same. Does not exactly equal
//12. What does (7 - 4 && 6 + 3) || (7 < 5 || 8 > 4) evaluate to? Explain how you solved your answer.
// Answer:




// 
    True

//13. Write a conditional statement that prints out 'even' when the variable 'number' is even.
// Answer:




// 
    if(number $ === 0){
        console.log("even");
    }

//14. Write a conditional statement that prints out "good job" if the variable answer is true and "try again" if the variable answer is false.
// Answer:




// 
    if(answer){
        console.log("good job");
    } else {
        console.log("try again");

//15. Write a conditional statement that prints out "divisible by 2", "divisible by 3", "divisible by 4", or "divisible by 5" if a number is divisible by each of these numbers, respectively.
// Answer:
if (number%2 ===0){
    console.log('divisible by 2')
} else if (number%3 ===0){
    console.log('divisible by 3')
} else if (number%4 ===0){
    console.log('divisible by 4')
} else if (number%5 ===0){
    console.log('divisible by 5')
}



// Use the following array for questions 17-20.

var colors = ["red", "orange", "yellow", "green", "blue", "indigo", "violet"]

// 
//16. Write code to print out the length of the 'colors' array and then the 3rd color of the array.
// Answer:
// 
 console.log(colors.length);
 console.log(colors[2]);




//
//17. Write code to add the color 'dark-violet' to the 'colors' array.
// Answer:
// 
    colors.push('dark-violet');




// 
//18. Write code to add the color 'orange-yellow' to the 'colors' array between the colors orange and yellow. (So your array will print out red, orange, orange-yellow, yellow, green, blue, indigo, violet, dark-violet)``
// Answer:
colors.splice(2, 0, 'orange-yellow')



//
 //19. Write the code to delete 'orange' from the array.
// Answer:
colors.splice(1,1);



// 
//20. Create a map that stores the following data:

// 1775 American Revolution
// 1776 Declaration of Independence
// 1787 Constitution

// Answer:

const dates = new Map[
    ['1775', 'American Revolution'],
    ['1776', 'Declaration of Independence'],
    ['1787', 'Constitution']
];




// 
//21. Using the map created in problem 20, write the code that will:

// Add the date "2001 Terrorist Attack", then delete "1775 American Revolution", and finally print out: "1787 Constitution".
// Answer:

date.set('2001', 'Terrorist Attack');

date.delete('1775');

console.log(date.get('1787'));


// 
//22. Create a set with your 5 favorite songs. Determine if "Sweet Home Alabama" is in the set.
// Answer:

let songs = new Set()


    songs.add('Sminka');
    songs.add('Asnikk');
    songs.add('The Gringle Song');
    songs.add('Worklessnt');
    songs.add('Sweet Home Alabama');

songs.indexOf("Sweet Home Alabama");



// 
//23. Convert the above set into an array.
// Answer:

let songArray = [];

for (let item of songs){ 
    songArray.push(item);
}



// 
//24. Create an object that describes your favorite city. Include properties that have a string, a number, a boolean, and an array as values. Write code to print out one of the properties.
// Answer:

let city = {
    name: "wellington",
    population: 1000,
    prettyCool: true,
    famousPeople: [
        'sheep',
        'sheep 2',
        'Flight of the Conchords',
    ]
};


// 
//25. Use a for loop to print out all the multiples of 3 between 1 and 100.
// Answer:

for(let i = 1; i <=100; i++){
    if(i %3 ===0){
        console.log(i);
    }
};


// 
//26. Use a while loop to print out all the multiples of 7 between 1 and 100 in reverse order.
// Answer:
let i = 100
while(i > 0){
    if(i %7 === 0){
        console.log(i);
    }
    i--;
}



// 
//27. Create a JSON object containing an array of the following movies:
//     The Abyss - Sci-Fi - 1989 - James Cameron
//     Alien - Sci-Fi - 1979 - Ridley Scott
//     Aliens - Sci-Fi - 1986 - James Cameron
//     Field of Dreams - Drama  - 1989 - Phil Alden Robinson
// Answer:

let movies = "movies": [ 
    {"title":"The Abyss", "genre": "Sci-Fi", "year": "1989", "director":"James Cameron"};
    {"title":"Alien", "genre": "Sci-Fi", "year": "1979", "director":"Ridley Scott"};
    {"title":"Aliens", "genre": "Sci-Fi", "year": "1986", "director":"James Cameron"};
    {"title":"Field of Dreams", "genre": "Drama", "year": "1989", "director":"Phil Alden Robinson"};
];

var obj = JSON.parse(movies);

// 28. Write code that will print out the year of the 3rd movie in your JSON object.
// Answer:
console.log(obj.movies[2].year);



// 28. Write code that will print out the year of the 3rd movie in your JSON object.
// Answer:

let funTimes = function(text) {
    return text;
};

funTimes(text);


// 30. Create a function that prints out the average of an array of numbers.
// Answer:

let numAvg = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

let averageFunc = function(array){
    let numTotal = array.reduce((a,b) => a+b);
    console.log(numTotal/2);
};




// 31. Call your above function and write the code to make the average print out.
// Answer:

averageFunc(numAvg);



// 32. Use map to iterate the array [1,2,3,4,5,6,7,8,9,10] and add 10 to each element.
// Answer:

let plusTen = numAvg.map(+10);


// 33. Use ternary operators to shrink the following code:

    var light = 'on';

  let toggleLight = light === 'on' ? (
            light === 'off'
        ) : (
            light === 'on'
        );

console.log(toggleLight);
// Answer:




// 34. Use filter to determine which movies in your favorite movies were released after 1990. Log the titles of those movies.

const favoriteMovies = [
    {"title": "The Abyss", "genre": "Sci-Fi", "release_date": 1989, "director": "James Cameron"},
    {"title": "Alien", "genre": "Sci-Fi", "release_date": 1979, "director": "Ridley Scott"},
    {"title": "Aliens", "genre": "Sci-Fi", "release_date": 1986, "director": "James Cameron"},
    {"title": "Field of Dreams", "genre": "Drama", "release_date": 1989, "director": "Phil Alden Robinson"},
    {"title": "The Incredibles", "genre": "Action", "release_date": 2004, "director": "Brad Bird"},
    {"title": "Sphere", "genre": "Sci-Fi", "release_date": 1998, "director": "Barry Levinson"}
];
// Answer:


const after1990 = favoriteMovies.filter(movie => movie.release_date > 1990);


// 35. Use the reduce array method to print out the oldest of your favorite movies.
// Array:





const newMovie = favoriteMovies.reduce((previous, current) ==> {
    if(current.release_date > previous.release_date) {
        return current;
    }
    return previous;
});

console.log(newMovie.title);

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
// 
    var username = ['JoeQuery', 'CLofton', 'RLowe']
    var tweet = ['You are my sunshine', 'Amarillo by morning, up from San Anton', 'giggidy giggidy']
    var date = [ "07/24/2015" , "09/25/2015", "10/25/2015" ]

function makeUL(array) {
    // Create the list element:
    var list = document.createElement('ul');

    for(var i = 0; i < array.length; i++) {
        // Create the list item:
        var item = document.createElement('li');

        // Set its contents:
        item.appendChild(document.createTextNode(array[i]));

        // Add it to the list:
        list.appendChild(item);
    }

    // Finally, return the constructed list:
    return list;
}

// Add the contents of options[0] to #foo:
document.getElementById('foo').appendChild(makeUL(tweet));
