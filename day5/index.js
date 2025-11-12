let promise = fetch("https://jsonplaceholder.typicode.com/users");

console.log("Before Promise");

promise
    .then((response) => response.json())
    .then((users) => {
        users.forEach((user) => {
            console.log(`${user.name} (${user.email})`);
        });
    });

console.log("After Promise");