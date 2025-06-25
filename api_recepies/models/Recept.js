import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Recept = sequelize.define(
  'Recept',
  {
    id_recepta: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    naziv_recepta: {
      type: DataTypes.STRING,
    },
    
    opis: {
      type: DataTypes.TEXT,
      allowNull: true, 
    },
    vrijeme_pripreme: {
      type: DataTypes.INTEGER,
      allowNull: true, 
    },
    vrijeme_kuhanja: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    porcije: {  
      type: DataTypes.INTEGER,
    },
    url_slike: {
      type: DataTypes.STRING,
    },
    kategorija_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Kategorije',
        key: 'id_kategorije', 
      },
    },
  },
  {
    tableName: 'Recepti',
    timestamps: false
  },
);

export default Recept;