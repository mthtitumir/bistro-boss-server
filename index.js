const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config()
const port = process.env.PORT || 4800;
const { MongoClient, ServerApiVersion } = require('mongodb');


// middleware
app.use(cors());
app.use(express.json());

// mongo connect 

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.xx7c7ta.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();

        const menuCollection = client.db("bistroDb").collection("menu");
        const reviewsCollection = client.db("bistroDb").collection("reviews");


        app.get('/menu', async(req, res)=>{
            const result = await menuCollection.find().toArray();
            res.send(result);
        })
        app.get('/reviews', async(req, res)=>{
            const result = await reviewsCollection.find().toArray();
            res.send(result);
        })
        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);

// mongo connect 

app.get('/', (req, res) => {
    res.send('boss is running at port 4800')
})

app.listen(port, () => {
    console.log(`bistro boss is sitting on port ${port}`);
})