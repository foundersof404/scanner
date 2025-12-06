import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
    res.json({ notifications: [] });
});

router.post('/alerts', (req, res) => {
    res.json({ message: 'Alert created' });
});

export default router;
