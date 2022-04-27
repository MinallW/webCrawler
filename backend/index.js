const express = require('express'),
    cors = require('cors'),
    fetch = require('node-fetch'),
    cheerio = require('cheerio')

const app = express();

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

// Some Validations

const checkComments = (comments) => {
  if (comments === 'discuss' || comments === '' || parseInt(comments) <= 0) {
    return 0
  }else {
    return parseInt(comments)
  }
}

const checkPoints = (points) => {
  if (parseInt(points) <= 0) {
    return 0
  }else {
    return parseInt(points)
  }
}

const checkInput = (input) => {
  if (input.length > 0 && input.length < 256){
    return input
  }else {
    return input.substring(0,25)+"..."
  }
}

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
    let uri = a.attr('href').trim
    let rank = a.parent().parent().text()
let subtext = a.parent().parent().next().children('.subtext').children()
    let author = $(subtext).eq(1).text()
    let points = $(subtext).eq(0).text()
    let comments = $(subtext).eq(5).text()
let obj = {
       title: checkInput(title),
       points: checkPoints(points),
       comments: checkComments(comments),
       rank: parseInt(rank)
    }
    if (obj.rank <= posts) {
      results.push(obj)
    }
  })
  if (results.length > 0) {
    return results
  }
}

app.get('/crawl', async (req, res) => {
  const response = await getAllHTML(50)
  res.json(response)
});

app.listen('3001', () => { console.log("API is now running...") })