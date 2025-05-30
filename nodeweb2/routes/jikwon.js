// 직원 관리 라우터 모듈
import { Router } from "express";
const router = Router();
import path from 'path';
import {fileURLToPath} from 'url';

// GET 요청 처리
router.get("/", (req, res) => {
    res.send("직원 출력");
})

router.get("/nice", (req, res) => {
    res.send("직원 nice");
})

router.get("/nice/:irum", (req, res) => {
    const {irum} = req.params;
    res.json({ 우수직원 : irum });
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
router.get('/main', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/main.html'));
});

const emps = [
    {id:1, name:'손오공'},
    {id:2, name:'저팔계'},
    {id:3, name:'사오정'}
];

router.get('/emps', (req, res) => {
    res.json(emps);
});

router.post('/emps', (req, res) => {
    const newEmp = req.body;
    if(!newEmp || !newEmp.name) {
        return res.status(400).json({error:'invalid emp data'});
    }
    emps.push(newEmp);
    res.status(201).json(newEmp);
});

export default router;