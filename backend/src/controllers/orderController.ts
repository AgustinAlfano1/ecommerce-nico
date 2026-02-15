import { Request, Response } from "express";
import Order from "../models/Order";

export const createOrder = async (req: Request, res: Response) => {
  try {
    const { customer, items, total } = req.body;

    if (!customer?.name || !customer?.email) {
      return res.status(400).json({ message: "Faltan datos del cliente" });
    }
    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: "Carrito vacío" });
    }
    if (typeof total !== "number" || total <= 0) {
      return res.status(400).json({ message: "Total inválido" });
    }

    const order = await Order.create({
      customer,
      items,
      total,
      status: "pending",
    });
    return res.status(201).json({ orderId: order._id });
  } catch (error) {
    return res.status(500).json({ message: "Error creando orden", error });
  }
};
