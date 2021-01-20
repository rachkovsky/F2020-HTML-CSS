const express = require('express');
const app = express();
const { Client } = require('pg');
const bodyParser = require('body-parser');

const client = new Client({
	connectionString: 'postgres://zvrorczrinwdbo:4f0288b2d28b6a6aef6f109d96dbf2937c612db3fcbffdbe82c2e69cb79dd742@ec2-34-252-98-12.eu-west-1.compute.amazonaws.com:5432/d3md9ba3543b0',
	ssl: { rejectUnauthorized: false }
});

client.connect(err => {
    if (err) {
      console.error('connection error', err.stack)
    } else {
      console.log('connected');
    }
});

// app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'pug');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

app.get('/', function(req, res){
    res.send('Hello');
});

app.get('/main', function(req, res) {
    res.sendFile(__dirname + "/index.html");
})


app.get('/userlist', function(req, res){
    client.query('SELECT * FROM Persons', function(err, response){
        if (err) {
            res.send('Error');
        } else {
            res.render('index', { title: 'Awesome page', users: response.rows});
        }
    })
})

app.get('/adduser', function(req, res) {
    res.render('addUser');
})

app.post('/createUser', function(req, res){
    console.log(req.body.firstname)
    client.query(`INSERT 
                  INTO Persons (firstname, lastname)
                  VALUES ('${req.body.firstname}', '${req.body.lastname}')`, (err, result) => {
                        if (err) {
                            res.status(500).json({ error: err.stack})
                        } else {
                            res.status(200).json({response: result})
                        }
    });
});



app.listen(3000, function() {
    console.log('success');
});