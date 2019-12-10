const Product = require('../product_schema');

const getAllProducts = async (request, response) => {
  try {
    const products = await Product.find();

    response.status(200).json({ status: "success", products });
  } catch (err) {
    response.status(404).json({ status: "error", message: err.message });
  }
};

module.exports = getAllProducts;