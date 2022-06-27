import { NextPage } from 'next';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import { CURRENT_USER_QUERY } from '@components/User';

const SIGN_OUT_MUTATION = gql`
  mutation {
    endSession
  }
`;

export const SignOut: NextPage = () => {
  const [signOut] = useMutation(SIGN_OUT_MUTATION, {
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });

  return (
    <button type='button' onClick={() => signOut()}>
      Sign out
    </button>
  );
};
