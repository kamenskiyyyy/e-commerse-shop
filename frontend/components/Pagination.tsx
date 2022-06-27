import Head from 'next/head';
import PaginationStyles from '@components/styles/PaginationStyles';
import Link from 'next/link';
import { gql, useQuery } from '@apollo/client';
import DisplayError from '@components/ErrorMessage';
import { perPage } from '../config';

export const PAGINATION_QUERY = gql`
  query {
    _allProductsMeta {
      count
    }
  }
`;

export const Pagination = ({ page }: { page: number }) => {
  const { loading, error, data } = useQuery(PAGINATION_QUERY);
  const meta = data?._allProductsMeta;

  const countPage = Math.ceil(meta?.count) / perPage;

  if (loading) return null;
  if (error) return <DisplayError error={error} />;

  return (
    <PaginationStyles>
      <Head>
        <title>
          Sick Fits | Page {page} of {countPage}{' '}
        </title>
      </Head>
      <Link href={`/products/${page - 1}`}>
        <a aria-disabled={page <= 1}>⬅️ Prev</a>
      </Link>
      <p>
        Page {page} of {countPage}
      </p>
      <Link href={`/products/${page + 1}`}>
        <a aria-disabled={page >= countPage}>Next ➡️</a>
      </Link>
    </PaginationStyles>
  );
};
