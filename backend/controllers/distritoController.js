const model = require('../models/distritoModel');

const listarDistritos = async (req, res) => {
    try {
        const { page = 1, limit = 10, search = '' } = req.query;

        const result = await model.getDistritos(search, page, limit);

        const totalPages = Math.ceil(result.total / limit);

        res.json({
            data: result.data,
            totalPages
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const crearDistrito = async (req, res) => {
    try {
        const { nom_dis, cod_postal, poblacion } = req.body;
        const poblacionInt = poblacion ? parseInt(poblacion) : null;

        await model.createDistrito(nom_dis, cod_postal, poblacionInt);

        res.json({ message: 'Distrito creado' });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const obtenerDistrito = async (req, res) => {
    try {
        const { id_dis } = req.params;
        const distrito = await model.getDistritoById(id_dis);

        if (!distrito) {
            return res.status(404).json({ error: 'Distrito no encontrado' });
        }

        res.json(distrito);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const actualizarDistrito = async (req, res) => {
    try {
        const { id_dis } = req.params;
        const { nom_dis, cod_postal, poblacion } = req.body;
        const poblacionInt = poblacion ? parseInt(poblacion) : null;

        await model.updateDistrito(id_dis, nom_dis, cod_postal, poblacionInt);

        res.json({ message: 'Distrito actualizado' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const eliminarDistrito = async (req, res) => {
    try {
        const { id_dis } = req.params;

        await model.deleteDistrito(id_dis);

        res.json({ message: 'Distrito eliminado' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    listarDistritos,
    crearDistrito,
    obtenerDistrito,
    actualizarDistrito,
    eliminarDistrito
};
