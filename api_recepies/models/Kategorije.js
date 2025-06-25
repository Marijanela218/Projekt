import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';



const Kategorija = sequelize.define(
  'Kategorija',
  {
    kategorija_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    naziv_kategorije: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: 'Kategorije',
    timestamps: false
  },
);


export default Kategorija;