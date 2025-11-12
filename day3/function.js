//a function is a reusableblock of code that u can represent with a name

x=1

function addOne(){
    x +=1
}
addOne()
addOne()
addOne()
addOne()
addOne()

function addTwo(){
    x+=2
}

addTwo()
console.log(x)

function convertXtoPounds(){
    x = x*2.2
}

convertXtoPounds()
console.log(x)

//Arguments

let myHeight = 154
let friendHeight = 170

function convertCMtoFeet(height){
    return height * 0.03

}

console.log(convertCMtoFeet(myHeight));
console.log(convertCMtoFeet(friendHeight));

myHeightinFeet = convertCMtoFeet(myHeight);
console.log(myHeightinFeet);
