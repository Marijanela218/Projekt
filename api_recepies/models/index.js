import sequelize from '../config/db.js'; 
import './associations.js'; 

import { Recept, Kategorija, Sastojak, Recepti_Sastojci } from './associations.js';

export {
  sequelize,
  Recept,
  Kategorija,
  Sastojak,
  Recepti_Sastojci
};
