var button = document.getElementById('counter');
button.onclick = function(){
    //Create a request object 
    var request = new XMLHttpRequest();

    //Capture the response and store in a variable
    request.onreadystatechange = function(){
        if(request.readyState === XMLHttpRequest.DONE){
            if (request.status === 200){
                var counter = request.responseText;
                //Render the variable in correct span
                var span = document.getElementById('count');
                span.innerHTML = counter.toString();
            }
        }
    //Not done yet
    };
    //Make a request to the counter
    request.open('GET', 'http://localhost:8080/counter', true);
    request.send(null);
}

