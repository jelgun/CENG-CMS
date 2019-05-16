let login = document.getElementById('login');

login.addEventListener('click', () => {
    let email = document.getElementById('email').value;
    let pass = document.getElementById('password').value;

    if (email == "abc@ma" && pass == "123") {
        document.location.href = "../html/courseManagement.html";
        
    } else {
        alert("Wrong Credentials");
    }
    
});