import express from 'express';
import booktrip from './models/booktrip'; // Import mô hình Travel


const router = express.Router();

router.get('/', async (req, res) => {
    const q = req.query.q || '';
    
    try {
        let booktrips = await booktrip.find();
        if (q) {
            const regex = new RegExp(q, 'i');
            booktrips = booktrips.filter(booktrip => regex.test(booktrip.title));
        }
        res.render('Dashboard', { booktrips, q });
    } catch (error) {
        console.error('Error fetching trips:', error);
        res.render('bookingsList', { booktrips: [], q });
    }
});

export default router;
