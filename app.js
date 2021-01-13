const express = require('express');
const app = express();
const { Client } = require('pg');

const client = new Client({
	connectionString: 'postgres://zvrorczrinwdbo:4f0288b2d28b6a6aef6f109d96dbf2937c612db3fcbffdbe82c2e69cb79dd742@ec2-34-252-98-12.eu-west-1.compute.amazonaws.com:5432/d3md9ba3543b0',
	ssl: { rejectUnauthorized: false }
});

client.connect(err => {
    if (err) {
      console.error('connection error', err.stack)
    } else {
      console.log('connected');
      client.query(`SELECT * FROM Persons`,
                    (err, res) => {
                        if (err) {
                             console.log(err)
                        } else {
                            console.log(res.rows);
                        }

                    }
        )
    }
})



app.use(express.static('dist'));

app.get('/', function(req, res){
    res.send('Hello');
});

app.listen(3000, function() {
    console.log('success');
});