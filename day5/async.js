// let promise = fetch("https://jsonplaceholder.typicode.com/posts/1");

// console.log("Before Fetch");

// promise
//     .then((response) => response.json())
//     .then((data) => {
//         console.log(data.title);
//     });

// console.log("After Fetch");

// async function getData() {
//     console.log("Before Fetch")
//     const response = await fetch("https://jsonplaceholder.typicode.com/posts/1");
//     const data = await response.json();
//     console.log(data.title);
//     console.log("After Fetch")
// }

// getData();

// async function getPost() {
//     try {
//         const res = await fetch("https://jsonplaceholder.typicode.com/posts/1000");
//         if (!res.ok) throw new Error("Post not found.");
//         const data = await res.json();
//         console.log(data);
//     } catch (err) {
//         console.error("Error fetching post:", err.message);
//     }
// }

// getPost()

async function checkUser(id) {
    const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
    const user = await res.json();

    console.log(user.name)
    if (user.name === "Leanne Graham") {
        console.log("This is our VIP user.");
    } else {
        console.log("Standard user.");
    }
}

checkUser(2)