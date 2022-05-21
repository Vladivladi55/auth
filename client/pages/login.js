import {useForm} from 'react-hook-form';
import {useCookies} from 'react-cookie'

const Login = () =>{ 
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = data => {
      const user = fetch('http://localhost:5000/api/login', {
          method: 'POST',
          body: JSON.stringify(data),
          credentials: "include",
          headers: { 'Content-Type': 'application/json'}
      })
      console.log(data);
      //window.location.href = 'http://localhost:3000'
  }

  return(
      <div>
        <h1>The cookies are:</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
            <input {...register('email')} placeholder='email' type="email" name='email'/>
            <input {...register('password')} placeholder='password' type='password' name='password'/> />
            <input type="submit" />
        </form>
      </div>
     
  );
}
export default Login;