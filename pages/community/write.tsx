// React
import { useEffect } from 'react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
// Prisma
import { Post } from '@prisma/client';

import Button from '@components/button';
import Layout from '@components/layout';
import TextArea from '@components/textarea';
import useMutation from '@libs/client/useMutation';
import useCoords from '@libs/client/useCoords';

interface WriteForm {
  question: string;
}

interface WriteResponse {
  ok: boolean;
  post: Post;
}

const Write: NextPage = () => {
  const { latitude, longitude } = useCoords();
  const router = useRouter();
  const { register, handleSubmit } = useForm<WriteForm>();
  const [post, { loading, data }] = useMutation<WriteResponse>('/api/posts');

  const onValid = (data: WriteForm) => {
    if (loading) return; // Prevent user from clicking the submit button several times
    post({
      ...data,
      latitude,
      longitude,
    });
  };

  useEffect(() => {
    if (data && data.ok) {
      router.push(`/community/${data?.post.id}`);
    }
  }, [data, router]);

  return (
    <Layout canGoBack title='Write Post'>
      <form className='p-4 space-y-4' onSubmit={handleSubmit(onValid)}>
        <TextArea
          register={register('question', { required: true, minLength: 5 })}
          required
          placeholder='Ask a  question!'
        />
        <Button text={loading ? 'Loading...' : 'Submit'} />
      </form>
    </Layout>
  );
};

export default Write;
