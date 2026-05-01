const db = require('../config/db');

const getDistritos = async (search, page, limit) => {
    const [listResults] = await db.query(
        'CALL sp_listar_distritos(?, ?, ?)',
        [search, parseInt(page), parseInt(limit)]
    );
    const rows = listResults[0];

    const [countResults] = await db.query('CALL sp_contar_distritos(?)', [search]);
    const total = countResults[0][0].total;

    return {
        data: rows,
        total
    };
};

const createDistrito = async (nom_dis, cod_postal, poblacion = null) => {
    await db.query(
        'CALL sp_crear_distrito(?, ?, ?)',
        [nom_dis, cod_postal, poblacion]
    );
};

const getDistritoById = async (id_dis) => {
    const [results] = await db.query(
        'CALL sp_obtener_distrito(?)',
        [id_dis]
    );
    return results[0][0];
};

const updateDistrito = async (id_dis, nom_dis, cod_postal, poblacion) => {
    await db.query(
        'CALL sp_actualizar_distrito(?, ?, ?, ?)',
        [id_dis, nom_dis, cod_postal, poblacion]
    );
};

const deleteDistrito = async (id_dis) => {
    await db.query(
        'CALL sp_eliminar_distrito(?)',
        [id_dis]
    );
};

module.exports = {
    getDistritos,
    createDistrito,
    getDistritoById,
    updateDistrito,
    deleteDistrito
};
