import sqlite3 from 'sqlite3';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.join(__dirname, '..', 'little-amazonia.db');
const db = new sqlite3.Database(dbPath);

db.serialize(() => {

  // Create habitats table
  db.run(`CREATE TABLE IF NOT EXISTS habitats (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    image TEXT NOT NULL
  )`);

  // Create experiences table
  db.run(`CREATE TABLE IF NOT EXISTS experiences (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    habitat_id INTEGER NOT NULL,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    image TEXT NOT NULL,
    FOREIGN KEY (habitat_id) REFERENCES habitats(id)
  )`);

  // Create FAQ table
  db.run(`CREATE TABLE IF NOT EXISTS faq (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    question TEXT NOT NULL,
    answer TEXT NOT NULL
  )`);

  // Create contact form submissions table
  db.run(`CREATE TABLE IF NOT EXISTS contacts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    subject TEXT NOT NULL,
    message TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  // Create events table
  db.run(`CREATE TABLE IF NOT EXISTS events (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    category TEXT NOT NULL,
    event_date DATE NOT NULL,
    image TEXT NOT NULL
  )`);

  // Seed habitats
  db.run(`INSERT OR IGNORE INTO habitats (id, name, description, image) VALUES
    (1, 'Amazonian Rainforest', 'Dive into the heart of the Amazon, where towering trees and exotic wildlife create an unforgettable jungle experience.', 'rainforest.jpg'),
    (2, 'African Savannah', 'Roam the golden plains of Africa and witness majestic animals in their natural habitat.', 'savannah.jpg'),
    (3, 'Ocean World', 'Explore the depths of the ocean and encounter incredible marine life from the world''s seas.', 'ocean.jpg'),
    (4, 'Arctic Tundra', 'Step into a frozen wonderland and discover the resilient creatures that call the Arctic home.', 'arctic.jpg')`);

  // Seed experiences
  db.run(`INSERT OR IGNORE INTO experiences (id, habitat_id, name, description, image) VALUES
    (1, 1, 'Canopy Walk', 'Walk among the treetops on our thrilling suspended bridge trail above the rainforest floor.', 'canopy.jpg'),
    (2, 1, 'Jaguar Encounter', 'Get up close with our resident jaguars in a safe and supervised encounter session.', 'jaguar.jpg'),
    (3, 1, 'Parrot Paradise', 'Meet hundreds of colourful tropical birds in our free-flight aviary.', 'parrots.jpg'),
    (4, 2, 'Safari Ride', 'Hop aboard our open-top vehicle and take a guided safari across the savannah.', 'safari.jpg'),
    (5, 2, 'Elephant Feeding', 'Help our keepers feed and care for our gentle elephant family.', 'elephant.jpg'),
    (6, 2, 'Giraffe Tower', 'Hand-feed giraffes from our elevated feeding platform — a truly special moment.', 'giraffe.jpg'),
    (7, 3, 'Shark Tunnel', 'Walk through our underwater tunnel and watch sharks glide overhead.', 'sharks.jpg'),
    (8, 3, 'Dolphin Bay', 'Watch our playful dolphins perform and learn about their intelligence.', 'dolphins.jpg'),
    (9, 3, 'Touch Pool', 'Reach in and interact with starfish, rays, and other gentle sea creatures.', 'touchpool.jpg'),
    (10, 4, 'Penguin Parade', 'Watch our colony of penguins waddle and swim in their icy enclosure.', 'penguins.jpg'),
    (11, 4, 'Polar Bear Watch', 'Observe polar bears from our panoramic viewing deck.', 'polarbear.jpg'),
    (12, 4, 'Snow Fox Trail', 'Follow the trail and spot our elusive Arctic foxes in their snowy habitat.', 'arcticfox.jpg')`);

  // Seed FAQ
  db.run(`INSERT OR IGNORE INTO faq (id, question, answer) VALUES
    (1, 'What are the opening times?', 'Little Amazonia is open every day from 9am to 6pm, including bank holidays.'),
    (2, 'Is there parking available?', 'Yes, we have a large free car park on site with spaces for cars, coaches, and accessible vehicles.'),
    (3, 'Are dogs allowed in the park?', 'We love dogs! Well-behaved dogs on leads are welcome in most outdoor areas of the park.'),
    (4, 'Is the park accessible for wheelchairs?', 'Yes, all main pathways are fully accessible. Mobility scooters are also available to hire at the entrance.'),
    (5, 'Can I bring my own food?', 'Absolutely. There are designated picnic areas throughout the park. We also have several cafés and restaurants on site.'),
    (6, 'Are there any age restrictions for activities?', 'Some activities have minimum age or height requirements for safety reasons. These are clearly displayed at each attraction.'),
    (7, 'What happens if it rains?', 'Many of our habitats and experiences are indoors or undercover. The park remains open in all weather conditions.'),
    (8, 'Is there a gift shop?', 'Yes, our gift shop near the main entrance sells souvenirs, books, and wildlife-themed merchandise.')`);

  // Seed events
  db.run(`INSERT OR IGNORE INTO events (id, title, description, category, event_date, image) VALUES
    (1, 'Night Safari Experience', 'Explore the park after dark and discover the nocturnal wildlife that comes alive at night.', 'Night Experience', '2025-03-15', 'night-safari.jpg'),
    (2, 'Spring Wildlife Festival', 'Celebrate the arrival of spring with animal demonstrations, keeper talks, and family activities.', 'Seasonal Celebration', '2025-04-20', 'spring-festival.jpg'),
    (3, 'Conservation Workshop: Save the Rainforest', 'Join our conservation team to learn about deforestation and how to help protect the Amazon.', 'Educational Talk', '2025-05-10', 'conservation.jpg'),
    (4, 'Family Reptile Day', 'A fun-filled day dedicated to our scaly friends — handling sessions, quizzes, and reptile art for kids.', 'Family Activity', '2025-06-07', 'reptile-day.jpg'),
    (5, 'Guest Speaker: Dr. Ana Lima on Marine Conservation', 'Renowned marine biologist Dr. Ana Lima shares her research on ocean preservation.', 'Educational Talk', '2025-07-19', 'marine-talk.jpg'),
    (6, 'Summer Safari Nights', 'An exclusive evening event with live music, food stalls, and guided habitat tours under the stars.', 'Night Experience', '2025-08-02', 'summer-safari.jpg'),
    (7, 'Autumn Wildlife Photography Day', 'Learn wildlife photography techniques from professionals while exploring the park grounds.', 'Educational Talk', '2025-10-11', 'photography.jpg'),
    (8, 'Halloween at Little Amazonia', 'Spooky fun for all the family — costume parade, pumpkin carving, and a haunted habitat trail.', 'Seasonal Celebration', '2025-10-31', 'halloween.jpg'),
    (9, 'Christmas Penguin Parade', 'Watch our penguins in festive costumes and enjoy seasonal treats in our Arctic Tundra habitat.', 'Seasonal Celebration', '2025-12-20', 'xmas-penguins.jpg'),
    (10, 'Amazon Conservation Talk 2026', 'Expert speakers discuss the future of the Amazon rainforest and the species that depend on it.', 'Educational Talk', '2026-02-14', 'amazon-talk.jpg'),
    (11, 'Spring Family Adventure Day', 'Trails, games, and animal encounters designed especially for families with young children.', 'Family Activity', '2026-04-05', 'family-day.jpg'),
    (12, 'World Ocean Day Celebration', 'Dive into ocean conservation with interactive exhibits, talks, and a special dolphin display.', 'Seasonal Celebration', '2026-06-08', 'ocean-day.jpg'),
    (13, 'Night Safari Experience 2026', 'Our most popular event returns for 2026 — explore the park after dark with expert guides.', 'Night Experience', '2026-07-25', 'night-safari.jpg'),
    (14, 'Kids Wildlife Art Workshop', 'Children aged 5-12 can create their own wildlife paintings inspired by the animals of Little Amazonia.', 'Family Activity', '2026-09-13', 'art-workshop.jpg'),
    (15, 'Winter Wonderland at Arctic Tundra', 'Festive lights, warm drinks, and penguin encounters in our transformed Arctic habitat.', 'Seasonal Celebration', '2026-12-19', 'winter-wonderland.jpg')`);

  console.log('Database setup complete!');
  db.close();
});