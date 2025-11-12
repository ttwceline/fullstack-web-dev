function greet(name){
    console.log("Hello, " + name)
}
console.log(greet("Celine"))

function toCelsius(fahrenheit){
    return ((fahrenheit-32) *(5/9)) 
}
console.log(toCelsius(40))

const isAdult = (age) => {
    return age>=18;

}
console.log(isAdult(20))

const randomBetween = (min,max) => {
    min= Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random()*(max-min +1))+min;
    
}