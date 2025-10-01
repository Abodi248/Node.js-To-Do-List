import 'dd-trace/init'; 
import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import env from 'dotenv';


// Create Express application
const app = express();
const port = 3000;

// Middleware setup
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true })); // for form data
app.use(express.json()); // parse JSON bodies



env.config();

// PostgreSQL database connection
const db = new pg.Client({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    port: process.env.PG_PORT,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD, // Replace with your actual password
});
db.connect(); // Connect to database

// GET route - Fetch all todo items from database
app.get('/', async (req, res) => {
    try {
        // Query database for all items
        const result = await db.query("SELECT * FROM items");
        // Render index.ejs template with the retrieved data
        res.render('index.ejs', { items: result.rows });
    } catch (error) {
        console.log(error); // Log any errors
    }
});

// DELETE route - Remove a todo item
app.post('/delete', async (req, res) => {
    try {
        // Get ID from form submission
        const id = req.body.deleteTaskId;
        // Delete item from database
        await db.query("DELETE FROM items WHERE id = $1", [id]);
        // Redirect back to homepage
        res.redirect('/');
    } catch (error) {
        console.log(error); // Log errors   
    }
});

// ADD route - Create new todo item
app.post('/add', async (req, res) => {
    // Get and clean input
    let item = req.body.newItem?.trim();
    try {
        // Check for empty input
        if (!item) {
           return res.redirect('/');
        }

        // Capitalize first letter
        item = item.charAt(0).toUpperCase() + item.slice(1);

        // Insert new item into database
        await db.query("INSERT INTO items (item) VALUES ($1)", [item]);
        res.redirect('/');
    } catch (error) {
        console.log(error);   
    }
});

// EDIT route - Update existing todo item
app.post('/edit', async (req, res) => {
    // Get item ID and updated text
    const id = req.body.updatedItemId;
    let item = req.body.updatedItemTitle?.trim();

    try {
        // Capitalize first letter
        item = item.charAt(0).toUpperCase() + item.slice(1);
        // Update database record
        await db.query("UPDATE items SET item = $1 WHERE id = $2", [item, id]);
        res.redirect('/');
    } catch (error) {
        console.log(error);   
    }
});

app.get('/health', async (req, res) => {
  try {
    await db.query('SELECT 1'); // simple DB ping
    res.status(200).send('OK');
  } catch (err) {
    res.status(503).send('DB not ready');
  }
});


export default app;
