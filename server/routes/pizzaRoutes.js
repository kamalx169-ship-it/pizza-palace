const router = require('express').Router();
const {
  getAllPizzas,
  getPizzaById,
  addPizza,
  updatePizza,
  deletePizza
} = require('../controllers/pizzaController');
const verifyToken = require('../middleware/verifyToken');
const isAdmin = require('../middleware/isAdmin');

router.get('/', getAllPizzas);
router.get('/:id', getPizzaById);
router.post('/', verifyToken, isAdmin, addPizza);
router.put('/:id', verifyToken, isAdmin, updatePizza);
router.delete('/:id', verifyToken, isAdmin, deletePizza);

module.exports = router;