import { Router } from 'express';

const router = Router();

router.post('/index', (req, res) => {
    res.json({ message: 'Indexing started' });
});

router.get('/mismatches', (req, res) => {
    res.json({ mismatches: [] });
});

export default router;
