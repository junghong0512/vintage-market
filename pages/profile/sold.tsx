import type { NextPage } from 'next';
import useSWR from 'swr';
import { ProductWithCount } from 'pages';
import Item from '@components/item';
import Layout from '@components/layout';
import ProductList from '@components/product-list';

interface Record {
  id: number;
  product: ProductWithCount;
}

interface ProductListResponse {
  [key: string]: Record[];
}

const Loved: NextPage = () => {
  const { data } = useSWR<ProductListResponse>(`/api/users/me/sales`);

  return (
    <Layout title='관심목록' canGoBack>
      <div className='flex flex-col space-y-5 pb-10  divide-y'>
        <ProductList kind='sales' />
      </div>
    </Layout>
  );
};

export default Loved;
