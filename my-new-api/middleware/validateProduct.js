const validateProduct = (req, res, next) => {
  if (!req.body.category) {
    return res.status(400).json({ error: "Category is required" });
  }
  if (req.body.stock && req.body.stock < 0) {
    return res.status(400).json({ error: "Stock cannot be negative" });
  }
  next();
};

module.exports = validateProduct;