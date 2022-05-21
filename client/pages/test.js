import {useForm} from 'react-hook-form';
import Link from 'next/link';
import {useEffect} from 'react';


const Test = (req, res) =>{
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = async(data) => {
          await fetch('http://localhost:5000/api/test', {
          method: 'POST',
          body: JSON.stringify(data),
          headers: { 'Content-Type': 'application/json'}
      })
      //window.location.href = 'http://localhost:3000/login'
  }

  return(
      <div>
          <form onSubmit={handleSubmit(onSubmit)}>
           <input {...register('name')} placeholder='name' type="text" name='name'/>
           <input type="submit" />
      </form>
      </div>
      
  );
}
export default Test;