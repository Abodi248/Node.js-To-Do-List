require('dd-trace/init');
const express = require('express');
const bodyParser = require('body-parser');
const pg = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = 3000;

// Middleware
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // For JSON parsing

// Database connection
const db = new pg.Client({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  port: process.env.PG_PORT,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
});
db.connect().catch(err => console.error('DB connection failed:', err));

// Routes
app.get('/', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM items');
    res.render('index.ejs', { items: result.rows });
  } catch (error) {
    console.error('Error fetching items:', error);
    res.status(500).render('index.ejs', { items: [] }); // still renders page
  }
});

app.post('/delete', async (req, res) => {
  try {
    const id = req.body.deleteTaskId;
    await db.query('DELETE FROM items WHERE id = $1', [id]);
  } catch (error) {
    console.error('Error deleting item:', error);
  } finally {
    res.redirect('/'); // always redirect
  }
});

app.post('/add', async (req, res) => {
  let item = req.body.newItem?.trim();
  try {
    if (!item) return res.redirect('/');
    item = item.charAt(0).toUpperCase() + item.slice(1);
    await db.query('INSERT INTO items (item) VALUES ($1)', [item]);
  } catch (error) {
    console.error('Error adding item:', error);
  } finally {
    res.redirect('/'); // always redirect
  }
});

app.post('/edit', async (req, res) => {
  const id = req.body.updatedItemId;
  let item = req.body.updatedItemTitle?.trim();
  try {
    if (!item) return res.redirect('/');
    item = item.charAt(0).toUpperCase() + item.slice(1);
    await db.query('UPDATE items SET item = $1 WHERE id = $2', [item, id]);
  } catch (error) {
    console.error('Error updating item:', error);
  } finally {
    res.redirect('/'); // always redirect
  }
});

app.get('/health', async (req, res) => {
  try {
    await db.query('SELECT 1');
    res.status(200).send('OK');
  } catch (err) {
    console.error('Health check failed:', err); 
    res.status(503).send('DB not ready');
  }
});

module.exports = app;
