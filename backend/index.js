const express = require('express'),
    mysql = require('mysql2'),
    cors = require('cors')

const app = express();
const axios = require('axios'); 
const cheerio = require('cheerio'); 

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.get('/crawl', (req, res) => {
  axios.get('https://news.ycombinator.com/').then(({ data }) => { 
    const $ = cheerio.load(data); 
    const links = extractLinks($); 
    const content = extractContent($); 
    $('.titlelink').each(element => {
      console.log($(element).attr('href'))
    })
  });  
});

const extractContent = $ => {
	$('#hnmain > tbody > tr:nth-child(3) > td > table > tbody > tr').each(element => {
    console.log($(element).text())
  })

}

const extractLinks = $ => [ 
	...new Set( 
		$('.morelink') // Select pagination links 
			.map((_, a) => $(a).attr('href')) // Extract the href (url) from each link 
			.toArray() // Convert cheerio object to array 
	), 
]; 


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