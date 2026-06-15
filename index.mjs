import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { router } from './routes/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 5000;

// Set EJS as the templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Parse incoming requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/', router);

app.listen(PORT, () => {
  console.log(`Little Amazonia running at http://localhost:${PORT}`);
});