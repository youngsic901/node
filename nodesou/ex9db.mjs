// MariaDB 연동
import Mariadb from 'mariadb';

// DB와 연동을 위한 Connection pool 설정
const pool = Mariadb.createPool({
    host: 'localhost',
    user: 'root',
    password: '123',
    database: 'test',
    connectionLimit: 5, // connection pool의 최대 연결 갯수를 설정
});

// DB 연결 = async / await를 사용해 비동기 처리
async function connectDb() {
    try{
        const connection = await pool.getConnection();
        console.log('원격 DB 연결 성공');
        return connection;
    } catch(error) {
        console.error('연결 실패');
        process.exit(1); // process.exit(0); // => 1: 의도적으로 종료 0: 자연적으로 종료
    }
}

// select
async function selectData(connection) {
    const query = "select code as 코드, sang, su, dan from sangdata";
    const rows = await connection.query(query);
    // const query = "select * from sangdata where code=?";
    // const rows = await connection.query(query, [3]);
    // console.log('select 결과 : ', rows);
    // console.log('----------------------');
    for(const row of rows) {
        const obj = Object.values(row);
        const code = row.코드;
        const sang = obj[1];
        // const sang = row.sang;
        const su = row.su;
        const dan = row.dan;
        console.log(`${code} ${sang} ${su} ${dan}`)
    }
}

// insert
async function insData(connection, code, sang, su, dan) {
    const sql = "insert into sangdata values(?,?,?,?)";
    const result = await connection.query(sql, [code, sang, su, dan]);
    console.log('result : ', result, ' ', result.affectedRows);
}

// update
async function upData(connection, code, sang, su, dan) {
    const sql = "update sangdata set sang=?, su=?, dan=? where code=?";
    const result = await connection.query(sql, [sang, su, dan, code]);
    console.log('upData result : ', result, ' ', result.affectedRows);
}

// delete
async function delData(connection, code) {
    const sql = "delete from sangdata where code=?";
    const result = await connection.query(sql, [code]);
    console.log('delData result : ', result, ' ', result.affectedRows);
}

(async function main() {
    const connection = await connectDb();

    try {
        // await insData(connection, 50, 'await테스트', 5, 6000);
        // await upData(connection, 50, 'test', 1, 1000);
        // await delData(connection, 50);
        await selectData(connection);
    } catch(error) {
        console.error('쿼리 실행 중 오류 : ', error);
    } finally {
        connection.release(); // 연결 해제
        console.log('원격 DB 연결 해제');
        await pool.end(); // Connection poll 연결 종료
    }
})();