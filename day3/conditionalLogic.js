let x = 7;

console.log(x == 7);

// === is value and data type
// == value only checked
// >,<,>=,<=,==

//operators


//comparison operators

if(x > 5){
    console.log("x is larger than 5")
}else {
    console.log("x is not larger than 5")
}

if(x > 700){
    console.log("x is larger than 700")
}
else if (x >400){
    console.log("x is smaller than 700 but larger than 400")
}else{
    console.log("X is smaller than 400")
}

//Logic Gates

//&& AND gate
// || OR gate
// ! NOT

age = 5;
weight = 100;

if(age<15 && weight>70){
    console.log("Overweight for this age!")
}else{
    console.log("Not overweight!")
}

let money = false
let vip = false //if both are false then will be denied entry

if(money || vip){
    console.log("allowed entry")
}else{
    console.log("denied entry")
}

let y = 5

if(y!=8){
    console.log("Y is not 8")
}else{
    console.log("Y is 8")
}

