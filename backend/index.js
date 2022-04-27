const express = require('express'),
    cors = require('cors'),
    fetch = require('node-fetch'),
    cheerio = require('cheerio')

const app = express();

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

const getPagesArray = (numberOfPosts) =>
  Array(Math.ceil(numberOfPosts / 30)) 
    .fill()                          
    .map((_, index) => index + 1) 

const getPageHTML = (pageNumber) =>
  fetch(`https://news.ycombinator.com/news?p=${pageNumber}`)
    .then(resp => resp.text()) 

const getAllHTML = async (numberOfPosts) => {
  return Promise.all(getPagesArray(numberOfPosts).map(getPageHTML))
    .then(htmls => getPosts(htmls.join(''), numberOfPosts))
}

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

app.get('/crawl', (req, res) => {
  getAllHTML(300) 
});

app.listen('3001', () => { console.log("API is now running...") })