exports.checkout = async (req, res, next) => {
  try {
    const newOrder = await Order.create({ userId: req.user.id });
    res.status(201).json(newItem);
    const orderItem = {
      ...req.body,
      orderId: newOrder.id,
    };
    const newItem = await OrderItem.create(orderItem);
    res.json(newItem);
  } catch (error) {
    next(error);
  }
};
