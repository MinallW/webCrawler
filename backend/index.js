const express = require('express'),
    mysql = require('mysql2'),
    cors = require('cors')

const app = express();

const db = mysql.createPool({
    host: 'mysql_db', // the host name MYSQL_DATABASE: node_mysql
    user: 'MYSQL_USER', // database user MYSQL_USER: MYSQL_USER
    password: 'MYSQL_PASSWORD', // database user password MYSQL_PASSWORD: MYSQL_PASSWORD
    database: 'articles' // database name MYSQL_HOST_IP: mysql_db
})

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Hi There')
});

app.get('/get', (req, res) => {
    const SelectQuery = " SELECT * FROM articles_news";
    db.query(SelectQuery, (err, result) => {
      res.send(result)
    })
})

app.post("/insert", (req, res) => {
    const bookName = req.body.setBookName;
    const bookReview = req.body.setReview;
    const InsertQuery = "INSERT INTO books_reviews (book_name, book_review) VALUES (?, ?)";
    db.query(InsertQuery, [bookName, bookReview], (err, result) => {
      console.log(result)
    })
})

app.delete("/delete/:bookId", (req, res) => {
    const bookId = req.params.bookId;
    const DeleteQuery = "DELETE FROM books_reviews WHERE id = ?";
    db.query(DeleteQuery, bookId, (err, result) => {
      if (err) console.log(err);
    })
})

app.listen('3001', () => { })