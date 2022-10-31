const express = require('express');
const mongoose = require('mongoose');
//const Blog = require('./models/blog');
//const bllog = require('./models/blog')



const app1 = express();

//connect to momgodb
const dbUri = 'mongodb+srv://moyin:project@cluster0.upyoatt.mongodb.net/?retryWrites=true&w=majority'
mongoose.connect(dbUri)


//register view engine
app1.set('view engine', 'ejs');

//middleware & static files
app1.use(express.static('public'))
app1.use(express.urlencoded({ extended: true }))

//listen for request
app1.listen(3000);

//mongoose and mongodb routes

//add a new blog
app1.get('/add-blog', () => {
const blog = new Blog({
   title: 'new blog',
   snippet: 'about my new blog',
   body: 'more about my new blog'
});

blog.save()
.then((result) => {
res.send(result)
})
.catch((err) =>{
    console.log(err);
})
});

//find all the blog
app1.get('/all-blogs', (req, res) => {
    Blog.find()
    .then((result) =>{
        res.send(result);
    })
    .catch((err) => {
        console.log(err);
    })
});

//single blog
app1.get('/single-blog', () => {
    Blog.findById()
    .then((result) => {
        res.send(result)
    })
    .catch((err) =>{
        console.log(err);
    })
})

// homepage
app1.get('/', (req, res) => {

    const blogs = [
        {title: 'becoming a dev', snippet: 'Hardwork  and dedication'},
        {title: 'becoming a dev', snippet: 'Hardwork  and dedication'},
        {title: 'becoming a dev', snippet: 'Hardwork  and dedication'}
    ];

res.render('index', { title: 'home', blogs});
});

//about page
app1.get('/about', (req, res) => {
res.render('about', { title: 'About' })
});

// post a new blog
app1.post('/blogs', () => {

})
// create a new blog
app1.get('/blog/create', (req, res) => {
res.render('create', { title: 'Create a new blog' })
})

//404
app1.use((req, res) => {
     res.status(404).render('404', { title: '404' })
})