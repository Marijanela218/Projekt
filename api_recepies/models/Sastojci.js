import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';



const Sastojak = sequelize.define(
  'Sastojak',
  {
    sastojak_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    naziv_sastojka: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: 'Sastojci',
    timestamps: false
  },
);



export default Sastojak;