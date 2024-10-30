const express = require('express');
const { Pool } = require('pg');
const { createObjectCsvWriter } = require('csv-writer');
const fs = require('fs');
require('dotenv').config();

const app = express();
const port = 3000;

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NOMBRE,
    password: process.env.DB_CONTRA,
    port: process.env.DB_PORT,
});

app.get('/export-employees', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM employees');
        const csvWriter = createObjectCsvWriter({
            path: 'employees.csv',
            header: result.fields.map(field => ({ id: field.name, title: field.name })),
        });

        await csvWriter.writeRecords(result.rows);

        res.download('employees.csv', 'employees.csv', (err) => {
            if (err) {
                console.error('Error al enviar el archivo:', err);
                res.status(500).send('Error al descargar el archivo.');
            } else {
                fs.unlinkSync('employees.csv');
            }
        });
    } catch (error) {
        console.error('Error al exportar datos:', error);
        res.status(500).send('Error al exportar los datos');
    }
});

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
