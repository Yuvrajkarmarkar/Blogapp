import { Button, Modal, Table } from 'flowbite-react';
import React, { useEffect,useState } from 'react'
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {FaCheck,FaTimes}from 'react-icons/fa';

export default function DashUsers() {
  const { currentUser } = useSelector((state) => state.user);
  const [users, setUsers] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const[UserIdToDelete,setUserIdToDelete]=useState('');
  

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`/api/user/getusers?userId=${currentUser._id}`);
        const data = await res.json();
       
        if (res.ok) {
          setUsers(data.users);
          if (data.users.length <9) {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (currentUser.isAdmin) {
      fetchUser();
    } 
  }, [currentUser._id]);

  const handleShowMore = async () => {
    const startIndex = users.length;
    try {
      const res = await fetch(`/api/user/getusers?startIndex=${startIndex}`);
      const data = await res.json();
      if (res.ok) {
        setUsers((prev) => [...prev, data.users]);
        if (data.users.length < 9) {
          setShowMore(false);
        }
        }
      } 
     catch (error) {
      
    }
  }  


    const handleUserDelete = async (req, res) => {
        try {
            const res = await fetch(`/api/user/delete/${UserIdToDelete}`, {
                method: 'DELETE',
            });
            const data = await res.json();
            if (res.ok) {
                setUsers((prev) =>
                    prev.filter((user) => user._id !== UserIdToDelete)
                );
                setShowModal(false);
            } else {
                console.log(data.message);
            }
    
        } catch (error) {
            console.log(error);
        }
    }

 

  return (
    <div className='table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-500 scrollbar-thumb-slate-800'>
    
      {currentUser.isAdmin && users.length > 0 ? (
        <>
          <Table hoverable className='shadow-md' >
            <Table.Head>
              <Table.HeadCell>
                Date created
              </Table.HeadCell>
              <Table.HeadCell>
                User Image
              </Table.HeadCell>
              <Table.HeadCell>
                User name
              </Table.HeadCell>
              <Table.HeadCell>
                email
              </Table.HeadCell>
              <Table.HeadCell>
                Admin
              </Table.HeadCell>
              <Table.HeadCell>
                Delete
              </Table.HeadCell>
              
            </Table.Head>{
              users.map((user) => (
                <Table.Body className='divide-y' key={user._id}>
                  <Table.Row className='bg-white dark:border-t-gray-950 dark:bg-gray-700'>
                    <Table.Cell>
                      {new Date(user.createdAt).toLocaleDateString()}
                    </Table.Cell>
                    <Table.Cell>
                      
                        <img
                          src={user.profilePicture}
                          alt={user.username}
                          className='w-20 h-10 object-cover bg-slate-600 rounded-full' />
                      
                    </Table.Cell>
                    <Table.Cell>
                      
                        {user.username}
                      
                    </Table.Cell>
                    <Table.Cell>
                      {user.email}
                    </Table.Cell>
                    <Table.Cell>
                      {user.isAdmin?(<FaCheck className='text-green-500'/>):(<FaTimes className='text-red-500'/>)}
                    </Table.Cell>
                    <Table.Cell>
                      <span className='font-medium text-red-800 hover:text-red-600 hover:cursor-pointer'
                        onClick={() => {
                          setShowModal(true);
                          setUserIdToDelete(user._id);
                        }}>
                        Delete
                      </span>
                    </Table.Cell>
                    
                  </Table.Row>
                 
                </Table.Body>
              ))
            }
          </Table>
          {
            showMore && (
              <button className='w-full text-teal-500 self-center text-sm py-7 hover:text-teal-300' onClick={handleShowMore}>
                show more
              </button>
            )
            
          }
        </>
      ) : (
        <p>you have no users</p>
      )}
      <Modal show={showModal} onClose={() => setShowModal(false)} popupsixe='md' >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className='h-14 w-14 mb-4 mx-auto'/>

            <h3 className='mb-5 text-lg text-red-600'>Are you sure you want to delete your post? This action cannot be undone.</h3>
            <div className="flex justify-center gap-4">
              <Button gradientDuoTone='pinkToOrange' onClick={handleUserDelete}color='failure'>Yes</Button>
              <Button gradientDuoTone='greenToBlue' onClick={() => setShowModal(false)}>No</Button>
            </div>

          </div>
        </Modal.Body>
      </Modal>
    </div>
  );

}
