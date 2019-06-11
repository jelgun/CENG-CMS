let add = document.getElementById('add')
add.addEventListener('click', () => {
    document.location.href = "../html/addANewContentManager.html";
})
let logout = document.getElementById('back');
logout.addEventListener('click', () => {
    var answer = confirm("Are you sure?")
    if (answer) {
        document.location.href = "../html/login.html";
    }
})