import { Avatar, Button, Dropdown, Navbar, TextInput } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { Link ,useLocation, useNavigate} from 'react-router-dom'
import { AiOutlineSearch } from 'react-icons/ai'
import {FaMoon,FaSun} from 'react-icons/fa'
import { useSelector,useDispatch } from 'react-redux';
import { toggleTheme } from '../redux/theme/themeSlice';
import { signoutSuccess } from '../redux/user/userSlice'


export default function header() {
    const path = useLocation().pathname;
    const { currentUser } = useSelector(state => state.user)
    const dispatch = useDispatch();
    const { theme } = useSelector(state => state.theme);
    const location = useLocation();
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();
    

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const searchTermFromUrl = urlParams.get('searchTerm');
        if (searchTermFromUrl ){
            setSearchTerm(searchTermFromUrl);
        }
    },[location.search])

     const handleSignout = async () => {
    try {
      const res = await fetch(`/api/user/signout`, {
        method:'POST',
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess(data));
      }
    } catch (error) {
      console.log(error);
    }
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();
        const urlParams = new URLSearchParams(location.search);
        urlParams.set('searchTerm', searchTerm);
        const searchQuery = urlParams.toString();
        navigate(`/search?${searchQuery}`);
        
     };



  return (
    <div>
          <Navbar className='broder-b-2'>
              <Link to="/" className='self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white'>
                  <span className='px-2 py-1 bg-gradient-to-r from-green-500  to-blue-500 rounded-lg text-white'>Yuvraj's</span>
                  Blog
              </Link>
              <form onSubmit={handleSubmit}>
                  <TextInput type='text' placeholder='
                  Search...' rightIcon={AiOutlineSearch} className='hidden lg:inline' value={searchTerm}
                  onChange={(e)=>setSearchTerm(e.target.value)}
                  />
              </form>
                  <Button className='w-12 h-10 lg:hidden' color='gray'pill>
                      <AiOutlineSearch/>
                  </Button>
                  <div className='flex gap-2 md:order-2'>
                      <Button className='w-12 h-10 hidden sm:inline' color='gray' pill onClick={()=>dispatch(toggleTheme())}>
                      {theme === 'light' ? <FaMoon /> : <FaSun />}
                  </Button>
                  {
                      currentUser ? (
                          <Dropdown arrowIcon={false} inline label={
                              <Avatar
                                  alt='user'
                                  img={currentUser.profilePicture}
                                  rounded
                              />
                          }>
                              <Dropdown.Header>
                                  <span className='block text-sm'>@{currentUser.username}</span>
                                  <span className='block text-sm front-medium truncate'>@{currentUser.email}</span>
                              </Dropdown.Header>
                              <Link to={'/Dashboard?tab=profile'}>
                                  <Dropdown.Item>
                                      Profile
                                  </Dropdown.Item>
                                  
                              </Link>
                              <Dropdown.Divider/>
                              <Dropdown.Item onClick={handleSignout}>
                                  Sign out
                              </Dropdown.Item>
                              
                      </Dropdown>
                      ): (
                          <Link to='/sign-in'>
                      <Button gradientDuoTone='greenToBlue' outline >
                          Sign In
                      </Button>
                  </Link>
                      )
                  }
                  
                  <Navbar.Toggle></Navbar.Toggle>
                  </div>
                  <Navbar.Collapse>
                      <Navbar.Link active={path==='/'} as={'div'}>
                          <Link to='/'>
                              Home
                      </Link>
                      </Navbar.Link>
                      <Navbar.Link active={path==="/projects"} as={'div'}>
                          
                          <Link to='/projects'>
                              Projects
                          </Link>
                  </Navbar.Link>
                  <Navbar.Link active={path==="/about"} as={'div'}>
                      <Link to='/about'>
                          About
                      </Link>
                  </Navbar.Link>
                      
                  </Navbar.Collapse>
      </Navbar>
    </div>
  )
}
