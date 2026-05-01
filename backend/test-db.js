const db = require('./config/db');

async function test() {
    try {
        console.log('Testing stored procedures...');
        
    const [listResults] = await db.query('CALL sp_listar_distritos(?, ?, ?)', ['', 1, 10]);
    console.log('List results:', listResults[0].length, 'rows');
    
    const [countResults] = await db.query('CALL sp_contar_distritos(?)', ['']);
    console.log('Total:', countResults[0][0].total);
        
        console.log('All tests passed!');
    } catch (error) {
        console.error('Error:', error.message);
    }
    process.exit();
}

test();
