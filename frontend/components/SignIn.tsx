import Form from '@components/styles/Form';
import useForm from '@lib/useForm';
import { ChangeEvent } from 'react';
import { gql, useMutation } from '@apollo/client';
import { CURRENT_USER_QUERY } from '@components/User';
import DisplayError from '@components/ErrorMessage';

const SIGIN_MUTATION = gql`
    mutation ($email: String!, $password: String!) {
        authenticateUserWithPassword (email: $email, password: $password) {
            ... on UserAuthenticationWithPasswordSuccess {
                item {
                    id email name
                }
            }
            ...on UserAuthenticationWithPasswordFailure {
                message code
            }
        }
    }
`;

export const SignIn = () => {
  const { inputs, handleChange, resetForm } = useForm({ email: '', password: '' });
  const [signin, { data, error, loading }] = useMutation(SIGIN_MUTATION, {
    variables: inputs,
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });

  console.log(error);

  async function handleSubmit(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      await signin();
      resetForm();
    } catch (e) {
      console.log('Произошла ошибка');
    }
  }

  return (
    <Form onSubmit={handleSubmit}>
      <h2>Sign into account</h2>
      <DisplayError error={data?.authenticateUserWithPassword} />
      <fieldset aria-busy={loading}>
        <label htmlFor='email'>Email
          <input type='email' name={'email'} placeholder={'your@example.com'} autoComplete={'email'} required
                 value={inputs.email} onChange={handleChange} />
        </label>
        <label htmlFor='password'>Passsword
          <input type='password' name={'password'} placeholder={'password'} autoComplete={'password'} required
                 value={inputs.password} onChange={handleChange} />
        </label>
        <button type={'submit'}>Sign in</button>
      </fieldset>
    </Form>
  );
};
