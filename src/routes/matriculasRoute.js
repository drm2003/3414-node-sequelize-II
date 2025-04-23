const { Router } = require('express');
const MatriculaController = require('../controllers/MatriculaController.js');

const matriculaController = new MatriculaController();

const router = Router();

router.get('/matriculas', (req, res) => matriculaController.pegaTodos(req, res));
router.get('/matriculas/:id', (req, res) => matriculaController.pegaUmPorId(req, res));
router.post('/matriculas', (req, res) => matriculaController.criaNovo(req, res));
router.put('/matriculas/:id', (req, res) => matriculaController.atualiza(req, res));
router.delete('/matriculas/:id', (req, res) => matriculaController.exclui(req, res));

module.exports = router;
