import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../database';
import { IProduct } from '../../../interfaces';
import { Product } from '../../../models';

type Data =
  | { message: string }
  | IProduct

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case 'GET':
      return getProductBySlug(req, res)

    default:
      return res.status(400).json({
        message: 'Bad request'
      });
  }
};

const getProductBySlug = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { slug } = req.query;

  await db.connect;

  const product = await Product.findOne({ slug }).lean();

  if (!product) {
    await db.disconnect();
    return res.status(400).json({ message: "Producto inexistente" })
  }

  try {
    await db.disconnect();
    res.status(200).json(product);
  } catch (error: any) {
    await db.disconnect();
    res.status(400).json({ message: error.errors.status.message })
  }
};