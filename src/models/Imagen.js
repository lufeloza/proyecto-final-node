const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const Imagen = sequelize.define('imagen', {
    url: {
        type: DataTypes.STRING,
        allowNull: false
    },
    publicId: {
        type: DataTypes.STRING,
        allowNull: false
    },
});

module.exports = Imagen;