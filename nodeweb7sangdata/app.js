import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dbpool from './db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('원격 DB 연동 RESTful test : /sangdata');
});

// 전체 자료 읽기
app.get('/sangdata', async(req, res) => {
    try {
        const conn = await dbpool.getConnection();

        const rows = await conn.query("select * from sangdata");
        conn.release();
        res.json(rows);
    } catch(error) {
        res.status(500).json({error:error.message});
    }
});

// 자료 1개 읽기
app.get('/sangdata/:code', async(req, res) => {
    const {code} = req.params;

    try{
        const conn = await dbpool.getConnection();

        const rows = await conn.query("select * from sangdata where code=?", [code]);
        conn.release();

        if(rows.length === 0) {
            return res.status(404).json({error:'Data not found'});
        }
        res.json(rows[0]);
    } catch(error) {
        res.status(500).json({error:error.message});
    }
});

// create (insert : 추가)
app.post('/sangdata', async(req, res) => {
    const {code, sang, su, dan} = req.body;
    
    try {
        const conn = await dbpool.getConnection();
        const result = await conn.query("insert into sangdata values(?,?,?,?)", [code, sang, su, dan]);
        conn.release();
        res.status(201).json({code, sang, su, dan});
    } catch(error) {
        res.status(500).json({error:error.message});
    }
});

// update
app.put('/sangdata/:code', async(req, res) => {
    const {code} = req.params;
    const {sang, su, dan} = req.body;
    
    try {
        const conn = await dbpool.getConnection();
        const result = await conn.query("update sangdata set sang=?, su=?, dan=? where code=?", [sang, su, dan, code]);
        conn.release();
        if(result.affectedRows === 0) {
            res.status(404).json({error:'data not found'});
        }
        res.status(201).json({code, sang, su, dan});
    } catch(error) {
        res.status(500).json({error:error.message});
    }
});

// delete
app.delete('/sangdata/:code', async(req, res) => {
    const {code} = req.params;
    
    try {
        const conn = await dbpool.getConnection();
        const result = await conn.query("delete from sangdata where code=?", [code]);
        conn.release();
        if(result.affectedRows === 0) {
            res.status(404).json({error:'data not found'});
        }
        res.json({message: 'data deleted'});
    } catch(error) {
        res.status(500).json({error:error.message});
    }
});

// 서버 서비스 설정
const startServer = (app, port) => {
    app.listen(port, () => {
        console.info(`[info] Server is running at http://127.0.0.1:${port}`);
    })
    .on('error', (err) => {
        console.info(`[info] Server failed : ${err.message}`);
    });
};

const PORT = process.env.PORT || 3000;
startServer(app, PORT)