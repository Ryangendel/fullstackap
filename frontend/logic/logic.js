fetch("/api/users/ryan")
.then(res=>res.json())
.then(data=>{
    console.log("INSIDE THE RES")
    console.log(data)
    document.getElementById("userdata").innerHTML =data.username
})


function submitData(){
const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userid:555555, username:"yeezy", userdata:"i like runa"})
};

fetch('/api/adduser', requestOptions)
    .then(response => response.json())
    .then(data => {
        alert("datahas been added")
    });
}