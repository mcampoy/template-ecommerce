import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../database';
import { Product } from '../../../models';
import { IProduct } from '../../../interfaces/products';

type Data =
  | { message: string }
  | IProduct[]

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case 'GET':
      return getSearchedProducts(req, res);

    default:
      return res.status(400).json({ message: 'Bad request' });
  }
};
const getSearchedProducts = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  let { query = '' } = req.query

  if (query.length === 0) {
    return res.status(400).json({ message: 'Debe especificar el parámetro de búsqueda' })
  }

  query = query.toString().toLowerCase();

  await db.connect();
  const searchedProducts = await Product.find({ $text: { $search: query } })
    .select('title images price inStock slug -_id')
    .lean();

  if (!searchedProducts) {
    await db.disconnect();
    return res.status(404).json({ message: 'No se encontró ningún producto' })
  }

  await db.disconnect()
  return res.status(200).json(searchedProducts)
};

