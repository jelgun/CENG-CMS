let btn = document.getElementById('button');
btn.addEventListener('click', () => {
    var email = document.getElementById('email').value
    console.log(email)
    document.location.href = "../html/emailList.html";
});

let back = document.getElementById('left-arrow');
back.addEventListener('click', () => {
    document.location.href = "../html/emailList.html";
});

let logout = document.getElementById('back');
logout.addEventListener('click', () => {
    var answer = confirm("Are you sure?")
    if (answer) {
        document.location.href = "../html/login.html";
    }
})