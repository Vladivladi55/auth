import {useForm} from 'react-hook-form';
import Link from 'next/link';
import {useEffect} from 'react';
import {useRouter} from 'next/router';


const Register = (req, res, next) =>{
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = data => {
      const user = fetch('http://localhost:5000/api/register', {
          method: 'POST',
          body: JSON.stringify(data),
          headers: { 'Content-Type': 'application/json'}
      })
      //res.redirect([400], 'http://localhost:5000/login')
      //window.location.href = 'http://localhost:3000/login'
  }

  return(
      <div>
          <form onSubmit={handleSubmit(onSubmit)}>
           <input {...register('name')} placeholder='name' type="text" name='name'/>
           <input {...register('email')} placeholder='email' type="email" name='email'/>
           <input {...register('password')} placeholder='password' type='password' name='password'/> />
           <input type="submit" />
      </form>
      <Link href="/login">Login</Link>
      </div>
      
  );
}
export default Register;