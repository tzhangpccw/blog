const express = require("express")
const bodyParser = require('body-parser')
const cors = require('cors')
const axios = require('axios')

const app = express();
app.use(cors())

app.use(bodyParser.json())

const { randomBytes } = require('crypto')

const commentsByPostId = {};

app.get('/posts/:id/comments', (req, res) => {
    res.send(commentsByPostId[req.params.id] || [])
})

app.post('/posts/:id/comments', (req, res) => {
    // We generate the random ID
    const commentId = randomBytes(4).toString('hex');
    // we get the content of the comment.
    const { content } = req.body;
    // We then get the list of comments that already exist 
    // that is associated with the given post.
    const comments = commentsByPostId[req.params.id] || [];
    // And then right here is where we 
    // create the actual comment itself.
    comments.push({ id: commentId, content, status: 'pending' })
    axios.post('http://localhost:4005/events', {
        type: "CommentCreated",
        data: {
            id: commentId,
            content,
            postId: req.params.id,
            status: 'pending'
        }
    })

    commentsByPostId[req.params.id] = comments
    console.log(666, comments)
    res.status(201).send(commentsByPostId[req.params.id])
})
app.post('/events', async (req, res) => {
    console.log('Envent received:', req.body.type)
    const { type, data } = req.body;
    if (type === 'CommentModerated') {
        const { postId, id, status, content } = data;
        const comments = commentsByPostId[postId]

        const comment = comments.find(comment => {
            return comment.id === id
        });
        comment.status = status;
        await axios.post("http://localhost:4005/events", {
            type: 'CommentUpdated',
            data: {
                id,
                content,
                postId,
                status
            }
        })


    }
    res.send({})
})
app.listen(4001, () => {
    console.log('Listening on 4001! comments')
})
