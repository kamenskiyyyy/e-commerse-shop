import { gql, useQuery } from '@apollo/client';
import DisplayError from '@components/ErrorMessage';
import Head from 'next/head';
import styled from 'styled-components';

const ProductStyled = styled.div`
  display: grid;
  grid-auto-columns: 1fr;
  grid-auto-flow: column;
  max-width: var(--maxWidth);
  gap: 2rem;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

const SINGLE_ITEM_QUERY = gql`
  query SINGLE_ITEM_QUERY($id: ID!) {
    Product(where: { id: $id }) {
      name
      price
      description
      id
      photo {
        image {
          publicUrlTransformed
        }
        altText
      }
    }
  }
`;

export default function SingleProduct({
  id,
}: {
  id: string | string[] | undefined;
}) {
  const { loading, error, data } = useQuery(SINGLE_ITEM_QUERY, {
    variables: { id },
  });
  const { name, description, photo } = data?.Product || {};

  if (loading) return <p>Loading...</p>;
  if (error) return <DisplayError error={error} />;

  return (
    <ProductStyled>
      <Head>
        <title>Sick Fits | {name}</title>
      </Head>
      <img src={photo.image.publicUrlTransformed} alt={photo.altText} />
      <div className='details'>
        <h2>{name}</h2>
        <p>{description}</p>
      </div>
    </ProductStyled>
  );
}
