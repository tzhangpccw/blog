const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')


const app = express()
const posts = {}

app.use(bodyParser.json())
app.use(cors())

app.get('/posts', async (req, res) => {
    res.send(posts)
})
app.post('/events', async (req, res) => {
    const { type, data } = req.body;

    if (type === 'PostCreated') {
        const { id, title } = data;

        posts[id] = { id, title, comments: [] }
    }
    if (type === 'CommentCreated') {
        const { id, content, postId, status } = data;
        const post = posts[postId];
        console.log(667, post)
        post.comments.push({ id, content, status })
    }

    if (type === 'CommentUpdated') {
        const { id, content, postId, status } = data;
        const post = posts[postId];
        const comment = post.comments.find(comment => {
            return comment.id === id
        })
        comment.status = status;
        comment.content = content;
    }
    console.log(posts)
    res.send({})
})

app.listen(4002, () => { console.log('listen on 4002') });