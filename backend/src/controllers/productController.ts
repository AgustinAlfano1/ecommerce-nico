import { Request, Response } from "express";
import Product from "../models/Product";

export const createProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.create(req.body);

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: "Error creando producto", error });
  }
};

export const getProducts = async (req: Request, res: Response) => {
  try {
    const pageSize = Number(req.query.limit) || 6;
    const page = Number(req.query.page) || 1;

    const keyword = req.query.keyword
      ? {
          name: {
            $regex: req.query.keyword as string,
            $options: "i",
          },
        }
      : {};

    const category = req.query.category ? { category: req.query.category } : {};

    const filter = {
      ...keyword,
      ...category,
    };

    const sort = req.query.sort ? (req.query.sort as string) : "-createdAt";

    const count = await Product.countDocuments(filter);

    const products = await Product.find(filter)
      .sort(sort)
      .limit(pageSize)
      .skip(pageSize * (page - 1));

    res.json({
      products,
      page,
      pages: Math.ceil(count / pageSize),
    });
  } catch (error) {
    res.status(500).json({ message: "Error obteniendo productos", error });
  }
};
