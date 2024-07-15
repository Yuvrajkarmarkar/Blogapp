import { Button, Modal, Table } from 'flowbite-react';
import React, { useEffect,useState } from 'react'
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function DashPosts() {
  const { currentUser } = useSelector((state) => state.user);
  const [userPosts, setUserPosts] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const[postIdToDelete,setPostIdToDelete]=useState('');
  

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(`/api/post/getPost?userId=${currentUser._id}`);
        const data = await res.json();
        
        if (res.ok) {
          setUserPosts(data.posts);
          if (data.posts.length <9) {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (currentUser.isAdmin) {
      fetchPosts();
    } 
  }, [currentUser._id]);

  const handleShowMore = async () => {
    const startIndex = userPosts.length;
    try {
      const res = await fetch(`/api/post/getPost?userId=${currentUser._id}&startIndex=${startIndex}`);
      const data = await res.json();
      if (res.ok) {
        setUserPosts((prev) => [...prev, data.posts]);
        if (data.posts.length < 9) {
          setShowMore(false);
        }
        }
      } 
     catch (error) {
      
    }
  }  

  const handlePostDelete = async () => {
    setShowModal(false);
    try {
      const res = await fetch(`/api/post/deletepost/${postIdToDelete}/${currentUser._id}`,
        {
          method: 'DELETE',
        }
      );
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        setUserPosts((prev) =>
        prev.filter((post)=>post._id!==postIdToDelete)
        );
      }
    } catch (error) {
      console.log(error.message);
    }
  }

 

  return (
    <div className='table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-500 scrollbar-thumb-slate-800'>
    
      {currentUser.isAdmin && userPosts.length > 0 ? (
        <>
          <Table hoverable className='shadow-md' >
            <Table.Head>
              <Table.HeadCell>
                Date Updated
              </Table.HeadCell>
              <Table.HeadCell>
                Post Image
              </Table.HeadCell>
              <Table.HeadCell>
                Post Title
              </Table.HeadCell>
              <Table.HeadCell>
                Category
              </Table.HeadCell>
              <Table.HeadCell>
                Delete
              </Table.HeadCell>
              <Table.HeadCell>
                <span>Edit</span>
              </Table.HeadCell>
            </Table.Head>{
              userPosts.map((post) => (
                <Table.Body className='divide-y' key={post._id }>
                  <Table.Row className='bg-white dark:border-t-gray-950 dark:bg-gray-700'>
                    <Table.Cell>
                      {new Date(post.updatedAt).toLocaleDateString()}
                    </Table.Cell>
                    <Table.Cell>
                      <Link to={`/post/${post.slug}`}>
                        <img
                          src={post.image}
                          alt={post.title}
                          className='w-20 h-10 object-cover bg-slate-600' />
                      </Link>
                    </Table.Cell>
                    <Table.Cell>
                      <Link to={`/post/${post.slug}`} className='font-medium text-gray-950 dark:text-white'>
                        {post.title}
                      </Link>
                    </Table.Cell>
                    <Table.Cell>
                      {post.category}
                    </Table.Cell>
                    <Table.Cell>
                      <span className='font-medium text-red-800 hover:text-red-600 hover:cursor-pointer'
                        onClick={() => {
                          setShowModal(true);
                          setPostIdToDelete(post._id);
                        }}>
                        Delete
                      </span>
                    </Table.Cell>
                    <Table.Cell>
                      <Link className='text-green-700 hover:text-green-400' to={`/update-post/${post._id}`}>
                        <span>Edit</span>
                      </Link>
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
        <p>you have no posts</p>
      )}
      <Modal show={showModal} onClose={() => setShowModal(false)} popupsixe='md' >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className='h-14 w-14 mb-4 mx-auto'/>

            <h3 className='mb-5 text-lg text-red-600'>Are you sure you want to delete your post? This action cannot be undone.</h3>
            <div className="flex justify-center gap-4">
              <Button gradientDuoTone='pinkToOrange' onClick={handlePostDelete}color='failure'>Yes</Button>
              <Button gradientDuoTone='greenToBlue' onClick={() => setShowModal(false)}>No</Button>
            </div>

          </div>
        </Modal.Body>
      </Modal>
    </div>
  );

}
