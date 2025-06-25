import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';


const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Recept API',
      version: '1.0.0',
      description: 'Swagger dokumentacija za sve rute u istom fajlu',
    },
    servers: [
      {
        url: 'http://localhost:5000',
      },
    ],
    components: {
  schemas: {
    Recept: {
      type: 'object',
      required: [
        'naziv_recepta',
        'opis',
        'sastojci',
        'vrijeme_pripreme',
        'vrijeme_kuhanja',
        'porcije',
        'url_slike',
        'kategorija_id' 
      ],
      properties: {
        naziv_recepta: { type: 'string' },
        opis: { type: 'string' },
        vrijeme_pripreme: { type: 'integer' },
        vrijeme_kuhanja: { type: 'integer' },
        porcije: { type: 'integer' },
        url_slike: { type: 'string' },
        kategorija_id: { type: 'integer' },
        sastojci: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              naziv_sastojka: { type: 'string' },
              kolicina: { type: 'string' }
            }
          }
        },
      }
    }
  }
}
  },
  apis: ['./routes/receptiRoutes.js'], 
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

export { swaggerUi, swaggerSpec };
