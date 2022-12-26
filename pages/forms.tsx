import { FieldErrors, useForm } from 'react-hook-form';

interface LoginForm {
  username: string;
  password: string;
  email: string;
}

export default function Forms() {
  const { register, watch, handleSubmit } = useForm<LoginForm>();

  const onValid = (data: LoginForm) => {
    console.log('Data is Valid');
  };

  const onInvalid = (errors: FieldErrors) => {
    console.log(errors);
  };

  return (
    <form onSubmit={handleSubmit(onValid, onInvalid)}>
      <input
        {...register('username', {
          required: 'Username is required',
          minLength: {
            message: 'The username should be longer than 5 chars',
            value: 5,
          },
        })}
        type='text'
        placeholder='Username'
        required
      />
      <input
        {...register('email', { required: true })}
        type='email'
        placeholder='Email'
      />
      <input
        {...register('password', { required: true })}
        type='password'
        placeholder='Password'
      />
    </form>
  );
}
