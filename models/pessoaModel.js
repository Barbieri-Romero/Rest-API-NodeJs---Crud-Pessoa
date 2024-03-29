const { DataTypes } = require('sequelize');
const db = require('../infrastructure/database');

module.exports = db.define('pessoa', {
    nome: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
      },
      telefone: {
        type: DataTypes.STRING,
      },
      dataNascimento: {
        type: DataTypes.DATEONLY,
      },
      cpf: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      status: {
        type: DataTypes.ENUM('A', 'I'),
        allowNull: false,
        defaultValue: 'A'
      } 
});