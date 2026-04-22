const db = require('../config/db');

// GET - obtener todos los clientes
const obtenerClientes = (req, res) => {
    const sql = 'SELECT * FROM clientes';

    db.query(sql, (error, resultados) => {
        if (error) {
            return res.status(500).json({
                mensaje: 'Error al obtener clientes',
                error
            });
        }

        res.json(resultados);
    });
};

// GET - obtener un cliente por id
const obtenerClientePorId = (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM clientes WHERE id_cliente = ?';

    db.query(sql, [id], (error, resultados) => {
        if (error) {
            return res.status(500).json({
                mensaje: 'Error al obtener el cliente',
                error
            });
        }

        if (resultados.length === 0) {
            return res.status(404).json({
                mensaje: 'Cliente no encontrado'
            });
        }

        res.json(resultados[0]);
    });
};

// POST - crear cliente
const crearCliente = (req, res) => {
    const { nombres, apellidos, telefono, direccion } = req.body;

    const sql = `
        INSERT INTO clientes (nombres, apellidos, telefono, direccion)
        VALUES (?, ?, ?, ?)
    `;

    db.query(sql, [nombres, apellidos, telefono, direccion], (error, resultado) => {
        if (error) {
            return res.status(500).json({
                mensaje: 'Error al crear cliente',
                error
            });
        }

        res.status(201).json({
            mensaje: 'Cliente creado correctamente',
            id_cliente: resultado.insertId
        });
    });
};

// PUT - actualizar cliente
const actualizarCliente = (req, res) => {
    const { id } = req.params;
    const { nombres, apellidos, telefono, direccion } = req.body;

    const sql = `
        UPDATE clientes
        SET nombres = ?, apellidos = ?, telefono = ?, direccion = ?
        WHERE id_cliente = ?
    `;

    db.query(sql, [nombres, apellidos, telefono, direccion, id], (error, resultado) => {
        if (error) {
            return res.status(500).json({
                mensaje: 'Error al actualizar cliente',
                error
            });
        }

        if (resultado.affectedRows === 0) {
            return res.status(404).json({
                mensaje: 'Cliente no encontrado'
            });
        }

        res.json({
            mensaje: 'Cliente actualizado correctamente'
        });
    });
};

// DELETE - eliminar cliente
const eliminarCliente = (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM clientes WHERE id_cliente = ?';

    db.query(sql, [id], (error, resultado) => {
        if (error) {
            return res.status(500).json({
                mensaje: 'Error al eliminar cliente',
                error
            });
        }

        if (resultado.affectedRows === 0) {
            return res.status(404).json({
                mensaje: 'Cliente no encontrado'
            });
        }

        res.json({
            mensaje: 'Cliente eliminado correctamente'
        });
    });
};

module.exports = {
    obtenerClientes,
    obtenerClientePorId,
    crearCliente,
    actualizarCliente,
    eliminarCliente
};