import pool from './db.js';

// select
export const getAllSangdata = async () => {
    const conn = await pool.getConnection();
    const rows = await conn.query('select * from sangdata');
    conn.release();
    return rows;
}

// select one
export const getSangdataByCode = async (code) => {
    const conn = await pool.getConnection();
    const rows = await conn.query('select * from sangdata where code=?',[code]);
    conn.release();
    return rows;
}

// insert
export const createSangdata = async (code, sang, su, dan) => {
    const conn = await pool.getConnection();
    const result = await conn.query('insert into sangdata values(?, ?, ?, ?)',[code, sang, su, dan]);
    conn.release();
    return result;
}

// update
export const updateSangdata = async (code, {sang, su, dan}) => {
    const conn = await pool.getConnection();
    const result = await conn.query('update sangdata set sang=?, su=?, dan=? where code=?',[sang, su, dan, code]);
    conn.release();
    return result;
}

// delete
export const deleteSangdata = async (code) => {
    const conn = await pool.getConnection();
    const result = await conn.query('delete from sangdata where code=?',[code]);
    conn.release();
    return result;
}