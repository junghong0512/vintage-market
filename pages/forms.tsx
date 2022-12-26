import { FieldErrors, useForm } from 'react-hook-form';

interface LoginForm {
  username: string;
  password: string;
  email: string;
  errors?: string;
}

export default function Forms() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm<LoginForm>({ mode: 'onChange' });

  const onValid = (data: LoginForm) => {
    console.log('Data is Valid');
    // setError('errors', { message: 'Axios Error Occured' });
    reset(); // reset all the inputs
  };

  const onInvalid = (errors: FieldErrors) => {
    console.log(errors);
  };
  console.log(errors);

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
      {errors.username?.message}
      <input
        {...register('email', {
          required: true,
          validate: {
            notGmail: (value) =>
              !value.includes('@gmail.com') || 'Gamil is not allowed',
          },
        })}
        type='email'
        placeholder='Email'
        className={`${Boolean(errors.email) ? 'border-red-500' : ''}`}
      />
      {errors.email?.message}
      <input
        {...register('password', { required: true })}
        type='password'
        placeholder='Password'
      />
      {errors.errors?.message}
    </form>
  );
}
