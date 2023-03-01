import { useEffect } from 'react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import useMutation from '@libs/client/useMutation';
import Button from '@components/button';
import Input from '@components/input';
import Layout from '@components/layout';
import TextArea from '@components/textarea';
import { Stream } from '@prisma/client';

interface CreateForm {
  name: string;
  price: string;
  description: string;
  formErrors?: string;
}

interface CreateResponse {
  ok: boolean;
  stream: Stream;
}

const Create: NextPage = () => {
  const router = useRouter();
  const [createStream, { data, loading }] =
    useMutation<CreateResponse>(`/api/streams`);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<CreateForm>();

  const onValid = ({ name, price, description }: CreateForm) => {
    if (loading) return;
    if (name === '' || price === '' || description === '') {
      setError('formErrors', {
        message: 'Name, Price, and Description should not be empty string',
      });
    }
    createStream({ name, price, description });
  };

  useEffect(() => {
    if (data && data.ok) {
      router.push(`/streams/${data.stream?.id}`);
    }
  }, [data, router]);

  return (
    <Layout canGoBack title='Go Live'>
      <form onSubmit={handleSubmit(onValid)} className=' space-y-4 py-10 px-4'>
        <Input
          register={register('name', { required: true })}
          required
          label='Name'
          name='name'
          type='text'
        />
        <Input
          register={register('price', { required: true })}
          required
          label='Price'
          name='price'
          type='text'
          kind='price'
        />
        <TextArea
          register={register('description', { required: true })}
          name='description'
          label='Description'
        />
        <Button text={loading ? 'Loading...' : 'Go live'} />
      </form>
    </Layout>
  );
};

export default Create;
