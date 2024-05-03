const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    fs.readdir('./files', (err, data) => {
        if (err) throw err;
        res.render('index', {
            data: data
        });
    });
});

app.post('/create', (req, res) => {
    fs.writeFile(`./files/${req.body.title.split(" ").join("")}.txt`, req.body.details, (err) => {
        if (err) throw err;
        res.redirect('/');
    });
});

app.get('/file/:title', (req, res) => {
    fs.readFile(`./files/${req.params.title}`, "utf-8", (err, data) => {
        res.render("view", {
            title: req.params.title,
            data: data,
        });
        console.log(data);
    });
});


app.listen(3000);