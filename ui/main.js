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

    //Make a request to the counter. use below if running on hasura-app
    //request.open('GET', 'http://achy007mails.imad.hasura-app.io/counter', true);

    //Make a request, use below if running on localhost;
    request.open('GET', 'http://../counter', true);
    request.send(null);
};


//Submit username and password
var submit = document.getElementById('submit_btn');
submit.onclick = function(){
    //Create a request object
    var request = new XMLHttpRequest();

    //Capture the response and store it in a variable
    request.onreadystatechange = function(){
        if(request.readyState === XMLHttpRequest.DONE){
            if (request.status === 200){
                console.log('user logged in');
                alert('log in success');
            } else if (request.status === 403 ){
                alert('invalid user')
            } else if (request.status === 500){
                alert('Something is wrong with the server');
            }
        }
    };
        
    //Submit comment
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    //enable for debugging only
    //console.log(username);
    //console.log(password);

    //Make a request to the counter. use below if running on hasura-app
    //request.open('GET', 'http://achy007mails.imad.hasura-app.io/submit-comment?comment=' + comment, true);

    //Make a request, use below if running on localhost
    request.open('POST', 'http://../login', true);
    request.setRequestHeader('Content-Type', 'application/json');
    request.send(JSON.stringify({username: username, password: password}));    
};
