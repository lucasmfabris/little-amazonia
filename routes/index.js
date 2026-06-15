import express from 'express';
import sqlite3 from 'sqlite3';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const router = express.Router();

// Connect to the database
const db = new sqlite3.Database(path.join(__dirname, '..', 'little-amazonia.db'));

// Home page
router.get('/', (req, res) => {
  db.all('SELECT * FROM habitats', [], (err, habitats) => {
    if (err) return res.status(500).send('Database error');
    res.render('index', { habitats });
  });
});

// All habitats page
router.get('/habitats', (req, res) => {
  db.all('SELECT * FROM habitats', [], (err, habitats) => {
    if (err) return res.status(500).send('Database error');
    res.render('habitats', { habitats });
  });
});

// Single habitat page
router.get('/habitats/:id', (req, res) => {
  const id = req.params.id;
  db.get('SELECT * FROM habitats WHERE id = ?', [id], (err, habitat) => {
    if (err || !habitat) return res.status(404).send('Habitat not found');
    db.all('SELECT * FROM experiences WHERE habitat_id = ?', [id], (err, experiences) => {
      if (err) return res.status(500).send('Database error');
      res.render('habitat-detail', { habitat, experiences });
    });
  });
});

// FAQ page
router.get('/faq', (req, res) => {
  db.all('SELECT * FROM faq', [], (err, faqs) => {
    if (err) return res.status(500).send('Database error');
    res.render('faq', { faqs });
  });
});

// Contact page
router.get('/contact', (req, res) => {
  res.render('contact', { success: null });
});

// Contact form submission
router.post('/contact', (req, res) => {
  const { name, email, subject, message } = req.body;
  db.run(
    'INSERT INTO contacts (name, email, subject, message) VALUES (?, ?, ?, ?)',
    [name, email, subject, message],
    (err) => {
      if (err) return res.status(500).send('Database error');
      res.render('contact', { success: true });
    }
  );
});

// Activity page
router.get('/activity', (req, res) => {
  res.render('activity');
});

// Events page
router.get('/events', (req, res) => {
  const year = req.query.year || new Date().getFullYear();
  const category = req.query.category || '';

  let query = 'SELECT * FROM events WHERE strftime("%Y", event_date) = ?';
  const params = [String(year)];

  if (category) {
    query += ' AND category = ?';
    params.push(category);
  }

  query += ' ORDER BY event_date ASC';

  db.all(query, params, (err, events) => {
    if (err) return res.status(500).send('Database error');
    const today = new Date().toISOString().split('T')[0];
    res.render('events', { events, year, category, today });
  });
});

// Single event page
router.get('/events/:id', (req, res) => {
  db.get('SELECT * FROM events WHERE id = ?', [req.params.id], (err, event) => {
    if (err || !event) return res.status(404).send('Event not found');
    const today = new Date().toISOString().split('T')[0];
    res.render('event-detail', { event, today });
  });
});

// AJAX: search habitats
router.get('/api/search', (req, res) => {
  const term = `%${req.query.q}%`;
  db.all(
    'SELECT * FROM habitats WHERE name LIKE ? OR description LIKE ?',
    [term, term],
    (err, results) => {
      if (err) return res.status(500).json({ error: 'Database error' });
      res.json(results);
    }
  );
});

// AJAX: get events by year and category
router.get('/api/events', (req, res) => {
  const year = req.query.year || new Date().getFullYear();
  const category = req.query.category || '';

  let query = 'SELECT * FROM events WHERE strftime("%Y", event_date) = ?';
  const params = [String(year)];

  if (category) {
    query += ' AND category = ?';
    params.push(category);
  }

  query += ' ORDER BY event_date ASC';

  db.all(query, params, (err, events) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    res.json(events);
  });
});