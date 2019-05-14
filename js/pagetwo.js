var fs = require('fs');
var count = 0;
window.onload = function() {
    // create a couple of elements in an otherwise empty HTML page
    var heading = document.createElement("h1");
    var heading_text = document.createTextNode("Big Head!");
    heading.appendChild(heading_text);
    document.body.appendChild(heading);
    var contents = fs.readFileSync(__dirname + '/abc.txt', 'utf8');
    console.log(contents);
}

let button = document.getElementById("but")
button.addEventListener("click", () => {
    count += 1;
    console.log(count)
});