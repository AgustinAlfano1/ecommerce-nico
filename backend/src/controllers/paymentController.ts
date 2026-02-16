import { Request, Response } from "express";
import { MercadoPagoConfig, Preference } from "mercadopago";
import Order from "../models/Order";

const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN as string,
});

export const createPreference = async (req: Request, res: Response) => {
  try {
    console.log("✅ createPreference HIT");
    console.log("FRONTEND_URL:", process.env.FRONTEND_URL);

    const { orderId } = req.body;

    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ message: "Orden no encontrada" });

    const preference = new Preference(client);

    const body = {
      items: (order.items as any[]).map((item) => ({
        title: item.name,
        quantity: item.qty,
        unit_price: item.price,
        currency_id: "ARS",
      })),
      external_reference: String(order._id),
      back_urls: {
        success: `${process.env.FRONTEND_URL}/checkout/success`,
        failure: `${process.env.FRONTEND_URL}/checkout/failure`,
        pending: `${process.env.FRONTEND_URL}/checkout/pending`,
      },
      // auto_return: "approved",
    };

    console.log("🧾 BODY MP:", JSON.stringify(body, null, 2));

    const result = await preference.create({ body });

    return res.json({
      init_point: result.init_point,
      sandbox_init_point: result.sandbox_init_point,
      preference_id: result.id,
    });
  } catch (error: any) {
    // Esto nos devuelve el error real del SDK/MP
    console.log("❌ MP error:", error);
    return res
      .status(500)
      .json({ message: "Error creando preferencia", error });
  }
};
