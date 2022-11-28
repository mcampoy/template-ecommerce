import type { NextPage, GetServerSideProps } from 'next';
import { Box, Typography } from '@mui/material';
import { ShopLayout } from '../../components/layouts';
import { ProductList } from '../../components/products';
import { dbProducts } from '../../database';
import { IProduct } from '../../interfaces';

interface Props {
  products: IProduct[];
  query: string;
  foundProducts: boolean;
}

const SearchPage: NextPage<Props> = ({ products, foundProducts, query }) => {

  return (
    <ShopLayout
      title={'Teslo-Shop - Search'}
      pageDescription={'Encuentra los mejores productos de Teslo aquí'}
    >
      <Typography variant='h1' component='h1'>Buscar producto</Typography>

      {
        foundProducts
          ?
          <>
            <Box display='flex' mb={3}>
              <Typography variant='h2' sx={{ mb: 1 }}>Buscaste:</Typography>
              <Typography variant='h2' textTransform='capitalize' sx={{ mb: 1, ml: 1 }}>{query}</Typography>
            </Box>
            <ProductList products={products} />
          </>
          :
          <>
            <Box display='flex' sx={{ flexDirection: { xs: 'column', sm: 'row' } }} mb={3}>
              <Typography variant='h2' sx={{ mb: 1 }}>No encontramos ningún producto:</Typography>
              <Typography variant='h2' sx={{ ml: 1 }} textTransform='capitalize' color='secondary'>{query}</Typography>
            </Box>
            <Typography variant='h2' sx={{ ml: 1 }} mb={3}>Te puede interesar:</Typography>
            <ProductList products={products} />
          </>
      }

    </ShopLayout>
  )
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { query = '' } = params as { query: string };

  if (!query.length) {
    return {
      redirect: {
        destination: '/',
        permanent: true
      }
    }
  }

  let products = await dbProducts.getProductsByTerm(query);
  const foundProducts = products.length;

  // TODO: retornar otros productos
  if (!foundProducts) {
    // products = await dbProducts.getAllProducts();
    products = await dbProducts.getProductsByTerm('shirts');
  }


  return {
    props: {
      products,
      foundProducts,
      query
    }
  }
}

export default SearchPage;
