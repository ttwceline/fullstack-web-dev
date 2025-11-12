function sayHello(){
    console.log("Hello");
}


function square(num){
    return num * num;
}
console.log(square(3));

const isEven = (n) => {
    return n % 2 == 0;

}

let isOdd = function(n){
    return n%2 == 1;
}

console.log(isEven(5))