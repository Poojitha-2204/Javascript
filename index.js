var express = require('express');
var cors = require('cors');
var MongoClient = require('mongodb').MongoClient;
var path = require('path');

var app = express();
app.use(express.json());
app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"]
}));

// Serve static files from "public" folder
app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 8080;
const MONGODB_URI = 'mongodb://localhost:27017/mru';

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

// ✅ Get All Student Records
app.get('/students', async (req, res) => {
    try {
        const client = await MongoClient.connect(MONGODB_URI, { useUnifiedTopology: true });
        const db = client.db();
        const collection = db.collection('student');

        const records = await collection.find({}).toArray();
        client.close();

        res.json(records);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

// ✅ Open the HTML Page by Default
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
