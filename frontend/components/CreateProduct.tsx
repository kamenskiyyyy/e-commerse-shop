import useForm from '@lib/useForm';
import Form from '@components/styles/Form';
import { ChangeEvent } from 'react';

export default function CreateProduct() {
  const { inputs, handleChange } = useForm({
    image: '',
    name: 'Great',
    price: 100,
    description: 'Super choose',
  });

  function handleSubmit(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log(inputs);
  }

  return (
    <Form onSubmit={handleSubmit}>
      <fieldset>
        <label htmlFor='image'>
          Image
          <input required type='file' id='image' name='image' onChange={handleChange} />
        </label><label htmlFor='name'>
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
        <button type={'submit'}>+ Add Product</button>
      </fieldset>
    </Form>
  );
}
