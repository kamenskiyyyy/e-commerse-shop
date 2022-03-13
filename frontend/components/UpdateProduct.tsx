import gql from 'graphql-tag';
import { useMutation, useQuery } from '@apollo/client';
import { ChangeEvent } from 'react';
import DisplayError from '@components/ErrorMessage';
import Form from '@components/styles/Form';
import Router from 'next/router';
import useForm from '@lib/useForm';

const SINGLE_PRODUCT_QUERY = gql`
    query SINGLE_PRODUCT_QUERY($id: ID!) {
        Product(where: { id: $id }) {
            id
            name
            description
            price
        }
    }
`;

const UPDATE_PRODUCT_MUTATION = gql`
    mutation UPDATE_PRODUCT_MUTATION($id: ID! $name: String $description: String $price: Int  ) {
        updateProduct(id: $id data: {name: $name description: $description price: $price}) {
            id
            name
            description
            price
        }
    }
`;

export default function UpdateProduct({ id }: { id: string | string[] | undefined }) {
  const { data, loading, error } = useQuery(SINGLE_PRODUCT_QUERY, { variables: { id } });
  const [updateProduct, {
    loading: updateLoading,
    error: updateError,
  }] = useMutation(UPDATE_PRODUCT_MUTATION);
  const { inputs, handleChange, clearForm } = useForm({
    name: data?.Product.name,
    price: data?.Product.price,
    description: data?.Product.description,
  });

  async function handleSubmit(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const res = await updateProduct({ variables: { id, ...inputs } });
      clearForm();
      Router.push(`/product/${res.data.updateProduct.id}`);
    } catch (error) {
      console.error('Error occurred');
    }
  }

  if (loading) return <p>Loading...</p>;

  return (
    <Form onSubmit={handleSubmit}>
      <DisplayError error={error || updateError} />
      <fieldset disabled={loading || updateLoading} aria-busy={loading || updateLoading}>
        <label htmlFor='name'>
          Name
          <input type='text' id='name' name='name' placeholder='Name' value={inputs.name} onChange={handleChange} />
        </label>
        <label htmlFor='price'>
          Price
          <input type='number' id='price' name='price' placeholder='price' value={inputs.price}
                 onChange={handleChange} />
        </label>
        <label htmlFor='description'>
          Description
          <textarea id='description' name='description' placeholder='description' value={inputs.description}
                    onChange={handleChange} />
        </label>
        <button type={'submit'}>Update Product</button>
      </fieldset>
    </Form>
  );
}
