import Form from '@components/styles/Form';
import useForm from '@lib/useForm';
import { ChangeEvent } from 'react';
import { gql, useMutation } from '@apollo/client';
import DisplayError from '@components/ErrorMessage';

const REQUEST_RESET_MUTATION = gql`
  mutation ($email: String!) {
    sendUserPasswordResetLink(email: $email) {
      message
      code
    }
  }
`;

export const RequestReset = () => {
  const { inputs, handleChange, resetForm } = useForm({ email: '' });
  const [requestReset, { data, error, loading }] = useMutation(
    REQUEST_RESET_MUTATION,
    {
      variables: inputs,
    }
  );

  async function handleSubmit(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      await requestReset();
      resetForm();
    } catch (e) {
      console.log('Произошла ошибка');
    }
  }

  return (
    <Form onSubmit={handleSubmit}>
      <h2>Request a password reset</h2>
      <DisplayError error={error} />
      <fieldset aria-busy={loading}>
        {data?.sendUserPasswordResetLink === null && (
          <p>Success! Check your email for a link! </p>
        )}
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
        <button type='submit'>Request Reset</button>
      </fieldset>
    </Form>
  );
};
