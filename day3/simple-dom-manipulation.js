const btn = document.getElementById("Click Me");
btn.addEventListener("click",() => {
    let title = document.getElementById("title")
    title.textContent = "You clicked me!"
    title.style.color = "red";
    title.style.fontSize = "50px";
});

const paragraph = document.getElementById("paragraph");
paragraph.onmouseover=()=>{
    paragraph.style.color="pink"
}

paragraph.onclick=()=> {
    paragraph.hideen = true
    paragraph.style.opacity = 0
}
