import { Router } from 'express';

const router = Router();

router.get('/:id', (req, res) => {
    res.json({ id: req.params.id, name: 'Vendor Name' });
});

router.post('/:id/report', (req, res) => {
    res.json({ message: 'Report received' });
});

export default router;
