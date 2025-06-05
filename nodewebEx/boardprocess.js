import pool from "./db.js";

// select
export const getAllBoard = async () => {
    const conn = await pool.getConnection();
    const rows = await conn.query('select * from nodeboard');
    conn.release();
    return rows;
};

// select one
export const getBoardByNum = async (num) => {
    const conn = await pool.getConnection();
    const rows = await conn.query('select * from nodeboard where num=?',[num]);
    conn.release();
    return rows;
};

// insert
export const createBoard = async(num, author, title, content) => {
    const conn = await pool.getConnection();
    const result = await conn.query('insert into nodeboard(author, title, content) values(?, ?, ?, ?)', [author, title, content]);
    conn.release();
    return result;
}

// update
export const updateBoard = async(num, {author, title, content}) => {
    const conn = await pool.getConnection();
    const result = await conn.query('update nodeboard set author=?, title=?, content=? where num=?', [author, title, content, num]);
    conn.release();
    return result;
};

export const updateCnt = async(num, readCnt) => {
    const conn = await pool.getConnection();
    const result = await conn.query('update nodeboard set readcnt=? where num=?', [readCnt, num]);
    conn.release();
    return result;
}

// delete
export const deleteBoard = async(num) => {
    const conn = await pool.getConnection();
    const result = await conn.query('delete from nodeboard where num=?', [num]);
    conn.release();
    return result;
};