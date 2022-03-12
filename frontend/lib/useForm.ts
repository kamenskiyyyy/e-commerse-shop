import { ChangeEvent, useState } from 'react';

export default function useForm(initial: { name?: string | number; price?: number; desctiption?: string; }) {
  const [inputs, setInputs] = useState(initial || {});

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    let { value, name, type } = e.target;
    if (type === 'number') {
      // @ts-ignore
      value = parseInt(value);
    }
    if (type === 'file') {
      // @ts-ignore
      value[0] = e.target.files;
    }
    setInputs({
      ...inputs, [name]: value,
    });
  }

  function resetForm() {
    setInputs(initial);
  }

  function clearForm() {
    const blankState = Object.fromEntries(Object.entries(inputs).map(([key]) => [key, '']));
    setInputs(blankState);
  }

  return {
    inputs, handleChange,
    resetForm,
    clearForm,
  };
}
