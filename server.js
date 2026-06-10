import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { plants } from './data/plants.js';

const app = express();
const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// API Routes
app.get('/api/plants', (req, res) => {
    res.json(plants);
});

app.get('/api/plants/:id', (req, res) => {
    const plant = plants.find(p => p.id === req.params.id);
    if (plant) {
        res.json(plant);
    } else {
        res.status(404).json({ error: "Plant not found" });
    }
});

// Dynamic Page Routes
// Intercept requests to /plants/:id and serve the generic detail.html
app.get('/plants/:id', (req, res) => {
    // Basic check to see if the plant exists so we can 404 early if we want
    const plant = plants.find(p => p.id === req.params.id);
    if (plant) {
        res.sendFile(path.join(__dirname, 'public', 'detail.html'));
    } else {
        res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
    }
});

// Catch-all route for any undefined paths (404 Page)
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
