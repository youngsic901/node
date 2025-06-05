import express from 'express';

import { getAllSangdata, getSangdataByCode, createSangdata, updateSangdata, deleteSangdata } from './sangprocess.js';

const router = express.Router();

// read all
router.get('/', async (req, res) => {
    try{
        const rows = await getAllSangdata();
        res.json(rows);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});

// read one
router.get('/:code', async (req, res) => {
    const {code} = req.params;

    try{
        const rows = await getSangdataByCode(code);

        if(rows.length === 0){
            res.status(404).json({error:'data not found'});
        }

        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});

// insert
router.post('/', async (req, res) => {
    const {code, sang, su, dan} = req.body;

    try{
        const result = await createSangdata(code, sang, su, dan);
        res.status(201).json({code, sang, su, dan});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});

// update
router.put('/:code', async (req, res) => {
    const {code} = req.params;
    const {sang, su, dan} = req.body;

    try{
        const result = await updateSangdata(code, {sang, su, dan});

        if(result.affectedRows === 0) {
            res.status(404).json({error:'data not found'});
        }

        res.json({code, sang, su, dan});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});

// delete
router.delete('/:code', async (req, res) => {
    const {code} = req.params;

    try{
        const result = await deleteSangdata(code);

        if(result.affectedRows === 0) {
            res.status(404).json({error:'data not found'});
        }

        res.json({message:'data deleted'});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});

export default router;