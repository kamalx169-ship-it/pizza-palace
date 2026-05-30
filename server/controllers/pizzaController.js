const Pizza = require('../models/Pizza');

exports.getAllPizzas = async (req, res) => {
  try {
    const { category } = req.query;
    const filter = category
      ? { category, isAvailable: true }
      : { isAvailable: true };
    const pizzas = await Pizza.find(filter);
    res.json(pizzas);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getPizzaById = async (req, res) => {
  try {
    const pizza = await Pizza.findById(req.params.id);
    if (!pizza) return res.status(404).json({ message: 'Pizza not found' });
    res.json(pizza);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.addPizza = async (req, res) => {
  try {
    const pizza = await Pizza.create(req.body);
    res.status(201).json(pizza);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updatePizza = async (req, res) => {
  try {
    const pizza = await Pizza.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(pizza);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deletePizza = async (req, res) => {
  try {
    await Pizza.findByIdAndDelete(req.params.id);
    res.json({ message: 'Pizza deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};