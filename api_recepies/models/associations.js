import Recept from './Recept.js';
import Kategorija from './Kategorije.js';
import Sastojak from './Sastojci.js';
import Recepti_Sastojci from './Recepti_Sastojci.js';

Kategorija.hasMany(Recept, {
  foreignKey: 'kategorija_id',
  onDelete: 'SET NULL'
});
Recept.belongsTo(Kategorija, {
  foreignKey: 'kategorija_id', as: 'Kategorija',
  onDelete: 'SET NULL'
});

Recept.belongsToMany(Sastojak, {
  through: Recepti_Sastojci, 
  foreignKey: 'id_recepta',   
  otherKey: 'sastojak_id',  
  onDelete: 'CASCADE',   
  as: 'sastojci'
});
Sastojak.belongsToMany(Recept, {
  through: Recepti_Sastojci,
  foreignKey: 'sastojak_id',   
  otherKey: 'id_recepta' , 
  onDelete: 'CASCADE',     
  as: 'recepti' 
});

export {
  Recept,
  Kategorija,
  Sastojak,
  Recepti_Sastojci
};
