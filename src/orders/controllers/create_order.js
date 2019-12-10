const Order = require('../order_schema');
const User = require('../../users/user_schema');

const createOrder = async (request, response) => {
  try {
    const newOrder = new Order(request.body);
    const order = await newOrder.save();

    const user = await User.findById(order.creator);
    const userOrders = user.orders;
    userOrders.push(order._id);

    await User.findOneAndUpdate({ _id: order.creator }, { orders: userOrders }, { new: true });

    response.status(201).json({ status: "success", order })
  } catch (err) {
    response.status(404).json({ status: "error", message: err.message });
  }
};

module.exports = createOrder;
