var x = 5;
let y = 10;

console.log(x+y);

console.log("1" + "1");

let myName = "Celine";

console.log("My name is" + myName);

//myName = "Celine"; /*doesnt work if its below the console log, if top yes*/

console.log(x*x)

x = 5
console.log(x + "times" + x + "=" + (x * x))

//BASICS


//DATA TYPES
//PRIMITIVE DATA TYPES
//INT = 2 bill positive, 2 billion neg
//DEC = double float
//BOOL = (0,1)
//STR = works in quiotation marks

let distance = 5.5;
let goThere = true;

console.log(distance);
console.log(goThere);

console.log(typeof(goThere));

// NON-PRIMITIVE DATATYPES
//Obj (represented by {})
// Array (represented by [])

let students = ["Celine", "Gina", "Anis"]
console.log(students[0])

//Obj

let myDetails = {
    "name": "Celine",
    "age": "20",
    "city": "Penang",
    "students": students
}

console.log(myDetails.students[0]);

let details = [
    {
        "name": "Celine",
        "age": "20",
        "city": "Penang",
    },
    {
        "name": "Scott",
        "age": "20",
        "city": "Penang",
    },
    {
        "name": "Jovial",
        "age": "22",
        "city": "Penang",
    },
]

console.log(details)
