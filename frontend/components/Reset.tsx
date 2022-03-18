import Form from '@components/styles/Form';
import useForm from '@lib/useForm';
import { ChangeEvent } from 'react';
import { gql, useMutation } from '@apollo/client';
import DisplayError from '@components/ErrorMessage';
import { useRouter } from 'next/router';

const RESET_MUTATION = gql`
    mutation ($email: String!, $password: String!, $token:String!) {
        redeemUserPasswordResetToken (email: $email password: $password token: $token) {
            message code
        }
    }
`;

export const Reset = () => {
  const query = useRouter().query;
  const { inputs, handleChange, resetForm } = useForm({ email: '', password: '', token: query?.token as string });
  const [resetPassword, { data, error, loading }] = useMutation(RESET_MUTATION, {
    variables: inputs,
  });

  async function handleSubmit(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      await resetPassword();
      resetForm();
    } catch (e) {
      console.log('Произошла ошибка');
    }
  }

  return (
    <Form onSubmit={handleSubmit}>
      <h2>Reset your password</h2>
      <DisplayError error={error} />
      <fieldset aria-busy={loading}>
        {data?.redeemUserPasswordResetToken === null && <p>Success! You can now sign in! </p>}
        <label htmlFor='email'>Email
          <input type='email' name={'email'} placeholder={'your@example.com'} autoComplete={'email'} required
                 value={inputs.email} onChange={handleChange} />
        </label>
        <label htmlFor='password'>Passsword
          <input type='password' name={'password'} placeholder={'password'} autoComplete={'password'} required
                 value={inputs.password} onChange={handleChange} />
        </label>
        <button type={'submit'}>Reset password</button>
      </fieldset>
    </Form>
  );
};
