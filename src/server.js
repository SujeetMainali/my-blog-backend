import express from "express";
import { db, connectDb } from './db.js';

const app = express();
app.use(express.json());

//DATABASE CONNECTION

//endpoint api to get articles from database....
app.get('/api/articles/:name', async (req, resp)=>{
    const { name } = req.params;

  

    const article = await db.collection('Articles').findOne({ name });

    if (article) {
        resp.json(article)
    } else {
        resp.sendStatus(404).send('article not found');
    }
});

///api to update the upvotes iin the page
app.put('/api/articles/:name/upvote', async(req, resp)=>{
    const { name } = req.params;
    
    await db.collection('Articles').updateOne({ name },{$inc : {upvotes : 1},
    });

    const article = await db.collection('Articles').findOne({ name });

    if (article) {
        // article.upvotes += 1;
        resp.json(article);
    } else {
        resp.send('the article is unavailable')
    }

});


// api endpoint to add comment to the article 
app.post('/api/articles/:name/comments', async(req, resp)=>{
    const { name } = req.params;
    const { postedBy, text } = req.body;
    

    await db.collection('Articles').updateOne({name},{$push:{comments :{postedBy, text } }
    });
    const article = await db.collection('Articles').findOne({ name });
     if (article) {
        resp.json(article)
     } else {
        resp.send('Article is not available')
     }

})

app.get('',(req, resp)=>{
    resp.send("hwllo");
})



connectDb(()=>{
    console.log('db connected')
    app.listen(8000,()=>{
        console.log(`app started at http://localhost:8000`);
    })
})