var submit = document.getElementById('submit_btn');
submit.onclick = function(){
    //Create a request object
    var request = new XMLHttpRequest();

    //Capture the response and store it in a variable
    request.onreadystatechange = function(){
        if(request.readyState === XMLHttpRequest.DONE){
            if (request.status === 200){
                var comments = request.responseText;
                comments = JSON.parse(comments);
                var list = '';
                for(var i =0 ; i < comments.length; i++){
                    list += '<li>'+ comments[i] + '</li>';
                }
                var ul = document.getElementById('commentList')
                ul.innerHTML = list;
            }
        }
    };
        
    //Submit comment
    var commentInput = document.getElementById('comment');
    var comment = commentInput.value;
    request.open('GET', 'http://localhost:8080/submit-comment?comment=' + comment, true);
    request.send(null);    
}