import { Button, Label, TextInput } from 'flowbite-react';
import{BrowserRouter,Router,Route} from 'react-router-dom'
import { Link } from 'react-router-dom';

export default function signuppage() {
  return (
    <div className='min-h-screen mt-20'>
      <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5'>
        {/* left */}
        <div className='flex-1'>
          <Link to="/" className=' font-bold dark:text-white text-4xl'>
                  <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white '>Yuvraj's</span>
                  Blog
          </Link>
          <p className='text-sm mt-5 '> 
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quam amet deserunt, soluta doloremque vitae sapiente illum ea mollitia sequi dolores impedit distinctio, recusandae nobis provident voluptatibus aperiam atque deleniti at, aliquam perferendis!
          </p>
        </div>
        {/* right */}
        <div className='flex-1'>
          <form className='flex flex-col gap-4'>
            <div>
              <Label value='Your usernames' />
              <TextInput type='text' placeholder='Username' id='usernames' />
              
            </div>
            <div>
              <Label value='Your email' />
              <TextInput type='text' placeholder='Email' id='email' />

            </div>
            <div>
              <Label value='Your passwords' />
              <TextInput type='text' placeholder='Password' id='password' />

            </div>
            <Button gradientDuoTone='purpleToPink' type='submit'>
              Sign Up
            </Button>
          </form>
          <div className=" flex gap-2 text-sm mt-5">
            <span>
              Have an account?
            </span>
            <Link to='/sign-in'>
              <span className='text-purple-500'>
                Sign In
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
