let username = "admin";
let isLoggedIn = username = true; //admin ? "Welcome Back, Admin." : "Welcome, User."

if(isLoggedIn){
    if(username == "admin"){
    console.log("Welcome back, Admin!")
    }else{
        console.log("Welcome, User!")
    }
}else{
    console.log("Please log in.")
}

let message = isLoggedIn ? username == "admin"? "Welcome back, Admin!" : "Welcome, User!" : "Please log in."
console.log(message)
// if(isLoggedIn && username == "admin"){
    
// }
