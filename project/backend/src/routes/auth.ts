import { Router, Request, Response } from 'express';

const router = Router();

router.post('/signup', (req: Request, res: Response) => {
    const { email, password, name } = req.body;
    // Mock user creation
    console.log('Signup:', { email, name });
    res.json({
        user: { id: '1', email, name },
        verificationSent: true
    });
});

router.post('/login', (req: Request, res: Response) => {
    const { email, password } = req.body;
    // Mock login
    if (email === 'test@example.com' && password === 'password') {
        res.json({
            token: 'mock-jwt-token',
            refreshToken: 'mock-refresh-token',
            user: { id: '1', email, name: 'Test User' }
        });
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
});

router.post('/social', (req: Request, res: Response) => {
    const { provider, token } = req.body;
    // Mock social login
    res.json({
        token: 'mock-social-jwt',
        user: { id: '2', email: 'social@example.com', name: 'Social User' }
    });
});

router.post('/verify-email', (req: Request, res: Response) => {
    const { code } = req.body;
    // Mock verification
    if (code === '123456') {
        res.json({ verified: true });
    } else {
        res.status(400).json({ message: 'Invalid code' });
    }
});

export default router;
