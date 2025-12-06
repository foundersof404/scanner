import { Router } from 'express';

const router = Router();

router.post('/scan', (req, res) => {
    res.json({ message: 'Scan endpoint', jobId: '123' });
});

router.get('/scan/:jobId', (req, res) => {
    res.json({ status: 'processing', jobId: req.params.jobId });
});

export default router;
