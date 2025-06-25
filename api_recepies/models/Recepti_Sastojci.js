import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Recepti_Sastojci = sequelize.define(
  'Recepti_Sastojci',
  {
    id_recepta: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Recepti',
        key: 'id_recepta',
      },
    },
    sastojak_id: {
      type: DataTypes.INTEGER,
        references: {
            model: 'Sastojci',
            key: 'sastojak_id',
        },
    },
    kolicina: {
      type: DataTypes.STRING,
    },

  },
  {
    tableName: 'Recepti_Sastojci',
    timestamps: false
  },
);

export default Recepti_Sastojci;