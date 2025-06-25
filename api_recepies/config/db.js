import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('bazarecepti', 'root', '', {
  host: 'localhost',
  dialect: 'mysql', 
}); //povezivanje na bazu podataka preko sequelize

export default sequelize;
