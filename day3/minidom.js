const btn = document.getElementById("Click Me");
btn.addEventListener("click",() => {
    let title = document.getElementById("title")
    title.textContent = "you clicked me!";
    title.style.color = "red";
    title.style.fontSize = "50px";
});