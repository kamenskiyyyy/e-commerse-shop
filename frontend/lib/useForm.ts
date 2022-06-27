import { ChangeEvent, useEffect, useState } from 'react';

export default function useForm(initial: {
  name?: string | number;
  price?: number;
  description?: string;
  image?: string;
  email?: string;
  password?: string;
  token?: string;
}) {
  const [inputs, setInputs] = useState(initial || {});
  const initialValues = Object.values(initial).join('');
  useEffect(() => setInputs(initial), [initialValues]);

  function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    let { value, name, type } = e.target;
    if (type === 'number') {
      // @ts-ignore
      value = parseInt(value);
    }
    if (type === 'file') {
      // @ts-ignore
      [value] = e.target.files;
    }
    setInputs({
      ...inputs,
      [name]: value,
    });
  }

  function resetForm() {
    setInputs(initial);
  }

  function clearForm() {
    const blankState = Object.fromEntries(
      Object.entries(inputs).map(([key]) => [key, ''])
    );
    setInputs(blankState);
  }

  return {
    inputs,
    handleChange,
    resetForm,
    clearForm,
  };
}
