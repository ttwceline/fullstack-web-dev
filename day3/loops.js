// // loop basically means you keep doing something similar until a condition asks u to stop

// for(let i = 0; i<5; i++){
//     console.log(i);
// }

 let x = 0;

// // while(x<6){
// //     console.log(x);
// //     x += 2; //< short hand// x = x + 2
// // }

// do{
//     console.log(x);
//     x+=2
// }while(x<6)
// //for each loop

let arrayOfNumbers = [5,6,3,8,1,9];

arrayOfNumbers.forEach(function(currentValue, index, array){
    console.log(currentValue)
//  console.log(index)
});