
// if (num > 0){
//     console.log('Number is positive')
// }
// else if(num < 0){
//     console.log('Number is negative')
// }
// else if(num===0){
//     console.log('Number is 0')
// }

// let num1 = parseInt(prompt("Enter a number: "))
// let num2 = parseInt(prompt("Enter a second number: "))
// let sum = num1 + num2
// console.log("Sum is", sum)

// let n = parseInt(prompt("Enter your number: "))
// for (let i = 1; i <= n; i ++){
//     console.log(i)
// // //     if (i%2===0){
// // //         console.log(i,'is even')
// // //     }
// // //     else if(i%2!=0){
// // //         console.log(i,'is odd')
//     }
// }

// let n = parseInt(prompt("Enter your number: "))
// k = 1
// for (let i = n; i > 0; i --) {
//     k = k * i
// }
// console.log(n,'factorial is', k)

// let n = parseInt(prompt("Enter your number: "));
// let sumofall = 0;
// let productofall = 1;
// let sumofodd = 0;
// let productofeven = 1;
// for (let i = 1; i <= n; i++) {
//     sumofall += i;
//     productofall *= i;
//     if (i % 2 === 0) {
//         productofeven *= i;
//     } else {
//         sumofodd += i;
//     }
// }
// console.log('Sum of all numbers:', sumofall);
// console.log('Product of all numbers:', productofall);
// console.log('Sum of odd:', sumofodd);
// console.log('Product of even:', productofeven);

// let n = parseInt(prompt("Enter a number: "))
// for (let i = 1; i <= n; i ++) {
//     if (i%2 != 0){
//         console.log(i, "is skipped as it is odd.")
//     }
//     else{
//         let o = 1
//         for (let k = 1; k <= i; k ++){
//             o *= k
            
//         }
//         console.log (i,'factorial is:', o)
//     }
// }

// function sumAll(n) {
//     k = 0
//     for (let i = 0; i <= n; i++) {
//       k += i
//     }
//     return k
// }
// k = sumAll(5)
// console.log(k)

// function productEven(n) {
//     k = 1
//     for (let i = 1; i <= n; i ++) {
//         k *= i
        
//     }
//     return k
// }

// let b = productEven(5)
// console.log('Product of all even numbers till 5 is', b)

// function factorial(n) {
//     let k = 1
//     for (let i = 1; i <= n; i ++){
//         k *= i
//     }
//     return k
// }
// let k = factorial(8)
// console.log('factorial of 8 is', k)

// function fact2(n) {
//     let sumofall = 0;
//     let productofall = 1;
//     let sumofodd = 0;
//     let productofeven = 1;
//     for (let i = 1; i <= n; i++) {
//         sumofall += i;
//         productofall *= i;
//         if (i % 2 === 0) {
//             productofeven *= i;
//         } else {
//             sumofodd += i;
//         }
//     }
//     console.log('Sum of all numbers:', sumofall);
//     console.log('Product of all numbers:', productofall);
//     console.log('Sum of odd:', sumofodd);
//     console.log('Product of even:', productofeven);
// }
// let n = parseInt(prompt("Enter your number: "));
// fact2(n)