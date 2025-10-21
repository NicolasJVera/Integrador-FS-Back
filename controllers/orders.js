import Order from "../models/order.js";

export const createOrder = async (req, res) => {
  try {
    console.log('Datos recibidos en createOrder:', req.body);  // Ver datos
    console.log('Usuario autenticado:', req.user);  // Ver user
    const { items, shippingDetails, shippingCost } = req.body;
    const subtotal = items.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    const total = subtotal + shippingCost;
    const order = new Order({
      user: req.user._id,
      items,
      shippingDetails,
      subtotal,
      shippingCost,
      total,
    });
    await order.save();
    console.log('Order guardada:', order);  // Ver order
    res.status(201).json({ order });
  } catch (error) {
    console.error('Error en createOrder:', error); // clg
    res.status(500).json({ error: error.message });
  }
};

export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).populate("user");
    res.status(200).json({ orders });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
