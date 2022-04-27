const express = require('express'),
    mysql = require('mysql2'),
    cors = require('cors')

const app = express();
const Crawler = require('crawler')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.get('/crawl', (req, res) => {
  crawlerInstance.queue('https://news.ycombinator.com');
});

const crawlerInstance = new Crawler({
    maxConnections: 10,

    callback: (error, res, done) => {
        if (error) {
            console.log(error);
        } else {
            const $ = res.$;
            const articleTitle = $('#hnmain > tbody > tr:nth-child(3) > td > table > tbody > tr');
            console.log(articleTitle.find('td').text())
            articleTitle.each(function() {
              let title = $(this).find('td').text();
              console.log(title)
            })
        }
        done();
    }
});

app.get('/get', (req, res) => {
    const SelectQuery = " SELECT * FROM articles_news";
})

app.post("/insert", (req, res) => {
    const bookName = req.body.setBookName;
    const bookReview = req.body.setReview;
    const InsertQuery = "INSERT INTO books_reviews (book_name, book_review) VALUES (?, ?)";
})

app.delete("/delete/:bookId", (req, res) => {
    const bookId = req.params.bookId;
    const DeleteQuery = "DELETE FROM books_reviews WHERE id = ?";
})

app.listen('3001', () => { console.log("API is now running...") })