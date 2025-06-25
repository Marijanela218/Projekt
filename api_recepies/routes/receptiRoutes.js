import express from 'express';
import * as receptController from '../controllers/recipeControllers.js';

const router = express.Router();

router.get('/kategorije', receptController.getKategorije);
router.get('/pretraga', receptController.searchRecepti);
router.get('/byKategorija', receptController.getReceptiByKategorija);
router.get('/sastojak', receptController.getReceptiBySastojak);
router.get('/paginacija', receptController.getReceptiPaginacija);

/** 
 * @swagger
 * /recepti:
 *   get:
 *     summary: Dohvati sve recepte
 *     responses:
 *       200:
 *         description: Lista svih recepata
 *       500:
 *         description: Server error
 */
router.get('/', receptController.getRecepti);
/** 
 * @swagger
 * /recepti:
 *   post:
 *     summary: Kreiraj novi recept
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Recept'
 *     responses:
 *       201:
 *         description: Recept uspješno kreiran
 *       400:
 *         description: Neispravan zahtjev
 */
router.post('/', receptController.createRecept);

/**
 * @swagger
 * /recepti/{id}:
 *   get:
 *     summary: Dohvati recept po ID-u
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Recept pronađen
 *       404:
 *         description: Recept nije pronađen
 */
router.get('/:id', receptController.getReceptById);
/**
 * @swagger
 * /recepti/{id}:
 *   put:
 *     summary: Ažuriraj recept po ID-u
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Recept'
 *     responses:
 *       200:
 *         description: Recept uspješno ažuriran
 *       404:
 *         description: Recept nije pronađen
 */
router.put('/:id', receptController.updateRecept);
/**
 * @swagger
 * /recepti/{id}:
 *   delete:
 *     summary: Obriši recept po ID-u
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Recept uspješno obrisan
 *       404:
 *         description: Recept nije pronađen
 */
router.delete('/:id', receptController.deleteRecept);

export default router;
