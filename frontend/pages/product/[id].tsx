import SingleProduct from '@components/SingleProduct';
import { useRouter } from 'next/router';

export default function SingleProductPage() {
  const router = useRouter().query;

  return (
    <SingleProduct id={router?.id} />
  );
};
