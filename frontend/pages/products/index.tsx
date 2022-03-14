import Products from '@components/Products';
import { Pagination } from '@components/Pagination';
import { useRouter } from 'next/router';

export default function ProductsPage() {
  const query = useRouter().query
  const page = parseInt(query?.page as string || "1")

  return (
    <div>
      <Pagination page={page} />
      <Products />
      <Pagination page={page} />
    </div>
  );
}
