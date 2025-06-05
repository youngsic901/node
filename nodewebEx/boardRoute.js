import express from 'express';
import { getAllBoard, getBoardByNum, createBoard, updateBoard, deleteBoard, updateCnt } from './boardprocess.js';

const router = express.Router();

// read all
router.get('/', async(req, res) => {
    try{
        const rows = await getAllBoard();
        res.json(rows);
    } catch(error) {
        res.status(500).json({error: error.message});
    }
});

// read one
router.get('/:num', async(req, res) => {
    const {num} = req.params;

    try{
        const rows = await getBoardByNum(num);

        if(rows.length === 0) {
            res.status(404).json({error: 'data not found'});
        }

        res.json(rows[0]);
    } catch(error) {
        res.status(500).json({error: error.message});
    }
});

// insert
router.post('/', async(req, res) => {
    const {num, author, title, content} = req.body;

    try {
        const result = await createBoard(num, author, title, content);
        res.status(201).json({num, author, title, content});
    } catch(error) {
        res.status(500).json({error: error.message});
    }
});

// update
router.put('/:num', async(req, res) => {
    const {num} = req.params;
    const {author, title, content} = req.body;

    try{
        const result = await updateBoard(num, {author, title, content});

        if(result.affectedRows === 0) {
            res.status(404).json({error: 'update data not found'});
        }

        res.json({num, author, title, content});
    } catch(error) {
        res.status(500).json({error: error.message});
    }
});

router.put('/cnt/:num', async(req, res) => {
    const {num} = req.params;
    const {readcnt} = req.body;

    try{
        const result = await updateCnt(num, readcnt);

        if(result.affectedRows === 0) {
            res.status(404).json({error: 'update data not found'});
        }

        res.json({num, readcnt});
    } catch(error) {
        res.status(500).json({error: error.message});
    }
});

// delete
router.delete('/:num', async(req, res) => {
    const {num} = req.params;

    try{
        const result = await deleteBoard(num);

        if(result.affectedRows === 0) {
            res.status(404).json({error: 'delete data not found'});
        } else {
            res.json({message:'data deleted'});
        }
    } catch(error) {
        res.status(500).json({error: error.message});
    }
})

export default router;
