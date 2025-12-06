import { Router } from 'express';

const router = Router();

router.get('/:id', (req, res) => {
    res.json({ id: req.params.id, name: 'Product Name' });
});

router.get('/search', (req, res) => {
    res.json({ results: [] });
});

export default router;
