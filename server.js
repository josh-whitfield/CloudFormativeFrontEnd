/*
http://86.25.163.116:5000/comments/

1.) is a GET (/comments/all) which returns all the comments in a json message. 
Each comment object is identified by some unique id given to it by the DB - i.e. "5fa9e00b8e46491c283471e9". 
The comment object then contains a "_id" tag and an _id object (which you can ignore).
The rest of the comment object will match whatever you create the comment with.

2.) is a POST (/comments/add) it returns the id of the created object.
For this to work you'll need to set the Content-Type to application/json
You can send in any json object you want - i've tried to keep the application agnostic of what you send in

3.) is a PATCH(/comments/update/<comment_id>) it returns the id of the created object.
For this to work you'll need to set the Content-Type to application/json
You can send in any json object you want - i've tried to keep the application agnostic of what you send in
<comment_id> is the unique id given to the comment by the DB - i.e. "5fa9e00b8e46491c283471e9". 

4.) is a DELETE (/comments/remove/<post_id>) returns the number of removed comments
No body content is needed
<comment_id> is the unique id given to the comment by the DB - i.e. "5fa9e00b8e46491c283471e9".

5.) is a DELETE (/comments/clear) returns "None" if successful
No body content
Deletes all comments 
*/

//#region includes
const express = require('express')
const fetch = require('node-fetch')
const axios = require('axios')
const app = express()
const port = 3000
//#endregion

app.use(express.static('public'))

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

app.get('/', (req, res) => {
  res.send("./index.html")
})

app.get('/comment/:comment', async function(req, res) {
  console.log(req.params)
  //sendCommentToAPI(req.params.comment)
})

async function sendCommentToAPI(comment) {
  try {
    axios.post('http://86.25.163.116:5000/comments/add', {
      comment: comment
    })
  } catch(error) {
    console.log(`Failed a POST request for comment ${comment}`)
  }
}

async function fetchCommentsFromAPI() {
  return fetch('http://86.25.163.116:5000/comments/all')
  .then(response => response.json())
}