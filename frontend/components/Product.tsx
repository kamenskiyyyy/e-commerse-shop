import ItemStyles from '@components/styles/ItemStyles';
import Title from '@components/styles/Title';
import Link from 'next/link';
import PriceTag from '@components/styles/PriceTag';
import formatMoney from '@lib/formatMoney';
import { DeleteProduct } from '@components/DeleteProduct';
import AddtoCart from '@components/AddtoCart';

export default function Product({ product }: any) {
  return (
    <ItemStyles>
      <img
        src={product?.photo?.image?.publicUrlTransformed}
        alt={product?.name}
      />
      <Title>
        <Link href={`/product/${product.id}`}>{product.name}</Link>
      </Title>
      <PriceTag>{formatMoney(product.price)}</PriceTag>
      <p>{product.description}</p>
      <div className='buttonList'>
        <Link href={`update?id=${product.id}`}>Edit ✏️</Link>
        <AddtoCart id={product.id} />
        <DeleteProduct id={product.id}>Delete</DeleteProduct>
      </div>
    </ItemStyles>
  );
}
