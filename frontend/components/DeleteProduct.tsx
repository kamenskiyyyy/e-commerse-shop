import { gql, useMutation } from '@apollo/client';
import { NextPage } from 'next';
import { MutationUpdaterFunction } from '@apollo/client/core/types';

const DELETE_PRODUCT_MUTATION = gql`
    mutation ($id: ID!) {
        deleteProduct(id: $id) {
            id
            name
        }
    }
`;

const update: MutationUpdaterFunction<any, any, any, any> = (cache, payload) => {
  cache.evict(cache.identify(payload.data.deleteProduct));
};

export const DeleteProduct: NextPage<{ id: string }> = ({ id, children }) => {
  const [deleteProduct, { loading }] = useMutation(DELETE_PRODUCT_MUTATION);

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this item?')) {
      await deleteProduct({ variables: { id }, update });
    }
  };

  return (
    <button type={'button'} disabled={loading} onClick={handleDelete}>{children}</button>
  );
};
