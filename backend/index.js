const express = require('express'),
    mysql = require('mysql2'),
    cors = require('cors')

const app = express();

const fetch = require('node-fetch')
const cheerio = require('cheerio')

const getPagesArray = (numberOfPosts) =>
  Array(Math.ceil(numberOfPosts / 30))   //divides by 30 (posts per page)
    .fill()                          //creates a new array
    .map((_, index) => index + 1)   //[1, 2, 3, 4,..] PagesArray
const getPageHTML = (pageNumber) =>
  fetch(`https://news.ycombinator.com/news?p=${pageNumber}`)
    .then(resp => resp.text())   //Promise
const getAllHTML = async (numberOfPosts) => {
  return Promise.all(getPagesArray(numberOfPosts).map(getPageHTML))
    .then(htmls => getPosts(htmls.join(''), numberOfPosts)) //one JOINED html
}

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.get('/crawl', (req, res) => {
  getAllHTML(300) 
});

const getPosts = (html, posts) => {
  let results = []
  let $ = cheerio.load(html)
$('span.comhead').each(function() {
    let a = $(this).prev()
let title = a.text()
    let uri = a.attr('href')
    let rank = a.parent().parent().text()
let subtext = a.parent().parent().next().children('.subtext').children()
    let author = $(subtext).eq(1).text()
    let points = $(subtext).eq(0).text()
    let comments = $(subtext).eq(5).text()
let obj = {
       title: title,
       uri: uri,
       author: author,
       points: points,
       comments: comments,
       rank: parseInt(rank)
    }
    if (obj.rank <= posts) {
      results.push(obj)
    }
  })
  if (results.length > 0) {
    console.log(results)   
    return results
  }
}

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