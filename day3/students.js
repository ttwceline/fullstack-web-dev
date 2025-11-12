let students = [
    {
        name: "Celine",
        age: 20,
        isEnrolled: true
    },
    {
        name: "Jovial",
        age: 22,
        isEnrolled: true
    },
    {
        name: "Harry",
        age: 72,
        isEnrolled: false

    }
]

students.forEach(function(student){
    console.log(student.name);
})

students.forEach( (student) => {
    if(student.isEnrolled){
    console.log(student.name);
}
})

students.push(){
    
}
