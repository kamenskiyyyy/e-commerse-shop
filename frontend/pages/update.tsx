import UpdateProduct from '@components/UpdateProduct';
import { useRouter } from 'next/router';

export default function UpdatePage() {
  const router = useRouter().query

  return (
    <div>
      <UpdateProduct id={router.id} />
    </div>
  );
}
