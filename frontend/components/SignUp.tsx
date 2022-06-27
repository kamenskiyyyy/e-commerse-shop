import Form from '@components/styles/Form';
import useForm from '@lib/useForm';
import { ChangeEvent } from 'react';
import { gql, useMutation } from '@apollo/client';
import DisplayError from '@components/ErrorMessage';

const SIGN_UP_MUTATION = gql`
  mutation ($email: String!, $name: String!, $password: String!) {
    createUser(data: { name: $name, email: $email, password: $password }) {
      id
      email
      name
    }
  }
`;

export const SignUp = () => {
  const { inputs, handleChange, resetForm } = useForm({
    email: '',
    password: '',
    name: '',
  });
  const [signUp, { data, error, loading }] = useMutation(SIGN_UP_MUTATION, {
    variables: inputs,
  });

  async function handleSubmit(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      await signUp();
      resetForm();
    } catch (e) {
      console.log('Произошла ошибка');
    }
  }

  return (
    <Form onSubmit={handleSubmit}>
      <h2>Sign Up For an Account</h2>
      <DisplayError error={error} />
      <fieldset aria-busy={loading}>
        {data?.createUser && (
          <p>
            Signed up with {data.createUser.email} - Please Go head and Sign In!
          </p>
        )}
        <label htmlFor='name'>
          Name
          <input
            type='text'
            name='name'
            placeholder='Ivan'
            autoComplete='name'
            required
            value={inputs.name}
            onChange={handleChange}
          />
        </label>
        <label htmlFor='email'>
          Email
          <input
            type='email'
            name='email'
            placeholder='your@example.com'
            autoComplete='email'
            required
            value={inputs.email}
            onChange={handleChange}
          />
        </label>
        <label htmlFor='password'>
          Passsword
          <input
            type='password'
            name='password'
            placeholder='password'
            autoComplete='password'
            required
            value={inputs.password}
            onChange={handleChange}
          />
        </label>
        <button type='submit'>Sign in</button>
      </fieldset>
    </Form>
  );
};
