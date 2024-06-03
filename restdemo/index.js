const express = require('express');
const app = express();
const path = require('path');
const methodOverride = require('method-override');
const { v4: uuid } = require('uuid');
// uuid(); 

app.use(express.urlencoded({extended: true}));
// app.use(express.json());
app.use(methodOverride('_method'));

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

let comments = [
    { 
        id: uuid(),
        username: 'Marlon',
        comment: 'This was exactly what I was talking about the other day. Coding can be so hard'
    },
    { 
        id: uuid(),
        username: 'Lucas',
        comment: 'Heyy, which expense tracking app do you use for personal budgeting?'
    },
    { 
        id:uuid(),
        username: 'Primagean',
        comment: 'Those are actually 2 ways of reading from a file and 4 additional ways of reading from a reader'
    },
    {   
        id: uuid(),
        username: 'Abraham',
        comment: 'UI/UX Designers, there are two types of designers which one are you?'
    }
]

// this is the INDEX route - displays all comments
app.get('/comments', (req, res) => {
    res.render('comments/index', {comments})
})

// this is the NEW route - 2 routes, one that serves the form, and one that sends the data as a post request

app.get('/comments/new', (req, res) => {
    res.render('comments/new')
})

app.post('/comments', (req, res) => {
    const {username, comment} = req.body;
    comments.push({username, comment, id:uuid()});
    res.redirect('/comments')
})

// this is the SHOW route, which shows details of one particular resource

app.get('/comments/:id', (req, res) => {
    const {id} = req.params;
    const comment = comments.find(c => c.id === id);
    res.render('comments/show', {comment});
})


// this is the UPDATE route - set up a way to edit (a form), set up a way to update the content

app.get('/comments/:id/edit', (req, res) => {
    const {id} = req.params;
    const comment = comments.find(c => c.id === id);
    res.render('comments/edit', {comment})
})

app.patch('/comments/:id', (req, res) => {
    const {id} = req.params;
    const newCommentText = req.body.comment;
    const foundComment = comments.find(c => c.id === id);
    foundComment.comment = newCommentText;
    res.redirect('/comments')
})

// this is the DELETE route, use the method override to make a post request into a delete request

app.delete('/comments/:id', (req, res) => {
    const {id} = req.params;
    comments = comments.filter(c => c.id !== id);
    res.redirect('/comments')
})


app.listen(3000, () => {
    console.log('LISTENING ON PORT 3000');
})