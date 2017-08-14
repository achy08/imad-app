var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;

var config = {
    user: 'achy007mails',
    database: 'achy007mails',
    host: "db.imad.hasura-app.io",
    port:'5432',
    password: process.env.DB_PASSWORD
};

var app = express();
app.use(morgan('combined'));


var articles = {
  'article-one': {
    	title: 'Article one | Abhishek C',
	    heading: 'Something Somewhere Someone',
      date: 'Someday, Someyear',
      content: `

            <p>
                  Once upon a time, someone who lived somewhere did something.
            </p>`

  },

  'article-two': {
      title: 'Article two | Abhishek C',
	    heading: 'Something Somewhere Someone',
      date: 'Somedays ago, Someyear',
      content: `

            <p>
                  Second article about something else by someone else
            </p>`
},

  'article-three': {
        	title: 'Article Three | Abhishek C',
	    heading: 'Somehow Somewhere Someone',
      date: 'Someday, Someyears',
      content: `

            <p>
              There were somethings going somewhere
            </p>`
  }
          

};

function createTemplate(data){
  var title = data.title;
  var heading = data.heading;
  var date = data.date;
  var content = data.content;
  var htmlTemplate = `
        <!doctype html>
        <html>
          <head>
            <meta name=viewport content="width=device-width initial-scale=1">
            <title>${title}</title>
            <link href="/ui/style.css" rel="stylesheet" />	
          </head>
          <body>
              <div class="container">
                <div>
                    <a href="/">Home</a>
                </div>
                <hr/>
                <div>
                    <h2>${heading}</h2>
                </div>
                
                <div>
                    ${date}
                </div>
                
                <div>
                    ${content}
                </div>
            </div>
            <div class="footer center">
            <button id="counter">Like</button><span id="count">0</span>
            <div class="footer">
                    <input type="text" id="comment" placeholder="add comment"/>
                    <input type="submit" value ="Submit" id="submit_btn"/>
                    <ul id="commentList">
                    </ul>
            </div>
            </div>
            <script type="text/javascript" src="/ui/article.js"></script>
          </body>
        </html>
        `;
        return htmlTemplate;

};

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

var comments = [];
app.get('/submit-comment', function(req,res){
  var comment = req.query.comment;
  comments.push(comment);
  res.send(JSON.stringify(comments));
});

var pool = new Pool(config);
app.get('/test-db', function(req, res){
   //make a select request
   //return a response with the results
   pool.query('SELECT * from test', function(err, result){
      if (err){
          res.status(500).send(err.toString());
      } else{
          res.send(JSON.stringify(result.rows));
      }
   });
});

var counter = 0;
app.get('/counter', function(req, res){
  counter += 1;
  res.send(counter.toString());
});

app.get('/:articleName', function (req,res){
    //articleName == article-one
    //articles[articleName] == {} content object for article-one
    var articleName = req.params.articleName;
    res.send(createTemplate(articles[articleName]));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});
app.get('/ui/main.js', function(req, res){
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});
app.get('/ui/article.js', function(req, res){
  res.sendFile(path.join(__dirname, 'ui', 'article.js'));
});


// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 8080;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
