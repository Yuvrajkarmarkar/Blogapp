import { Alert, Button, Modal, Textarea } from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link,useNavigate } from 'react-router-dom';
import Comm from './comm'
import { HiOutlineExclamationCircle } from 'react-icons/hi';


export default function Comments({ postId }) {
    const { currentUser } = useSelector(state => state.user);
    const [comment, setComment] = useState('');
    const [commentError, setCommentError] = useState(null);
    const [comments, setComments] = useState([]);
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [commentToDelete, setCommentToDelete] = useState(null);

   

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (comment.length > 200) {
            return;
        }
        try {
            
            const res = await fetch('/api/comment/create',{
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    content: comment,
                    postId,
                    userId: currentUser._id
                }),
            });
            const data = await res.json();
            if (res.ok) {
                setComment('');
                setCommentError(null);
                setComments([data, ...comments]);
            }
        } catch (error) {
            setCommentError(error.message); 
        }
    };

    useEffect(() => {
        const getComments = async () => {
            try {
                const res = await fetch(`/api/comment/getpostComments/${postId}`);
                if (res.ok) {
                    const data = await res.json();
                    setComments(data);
                }
            } catch (error) {
                console.log(error.message)
            }
        };
        getComments();
    }, [postId])
    
    const handleLike = async (commentId) => {
        try {
            if (!currentUser) {
                navigate('/sign-in')
                return;
            }
            const res = await fetch(`/api/comment/likeComment/${commentId}`,
                {
                    method: 'PUT',
                });
            if (res.ok) {
                const data = await res.json();
                setComments(
                    comments.map((comment) =>
                        comment._id === commentId ? {
                            ...comment,
                            likes: data.likes,
                            numberOfLikes: data.likes.length,

                        } : comment
                    
                    ));
            }
        } catch (error) {
            console.log(error.message)
        }
    };

    const handleEdit = async (comment, editedContent) => {
        setComments(
            comments.map((c) =>
                c._id === comment._id ? { ...c, content: editedContent } : c
            )
        );
    };

    const handleDelete = async (commentId) => {
        try {
            if (!currentUser) {
                navigate('/sign-in')
                return;
            }
            const res = await fetch(`/api/comment/deleteComment/${commentId}`,
                {
                    method: 'DELETE',
                });
            if (res.ok) {
                const data = await res.json();
                comments.map((comment) => {
                    if (comment._id === commentId) {
                        setComments(comments.filter((comment) => comment._id !== commentId));
                        setShowModal(false);
                    }
                })
            }
        } catch (error) {
            console.log(error.message)
        }
    };
   


  return (
    <div className='max-w-2xl mx-auto w-full   p-3 '>
          {
              currentUser ?
                  (
                      <div className="flex items-center gap-1 my-5 text-gray-600 text-sm dark:text-white">
                          <p>Signed in as:</p>
                          <img src={currentUser.profilePicture} alt=""  className='h-5 w-5 object-cover rounded-full'/>
                          <Link to='/dashboard?tab=profile' className='text-xs text-cyan-400'>
                             @{currentUser.username}
                          </Link>
                  </div>
                  ) : (
                      <div className=" mt-5">
                          You must be signed in to comment.
                          <Link to='/sign-in' className='dark:text-red-600 text-blue-600 hover:underline'>
                             Sign In
                          </Link>
                      </div>
                  )
          }
          {currentUser && (
              <form className='border border-teal-500 p-3 rounded-md' onSubmit={handleSubmit}>
                  <Textarea placeholder='Comment...' rows='3' maxLength='200' className='' onChange={(e) => setComment(e.target.value)} value={comment} />
                  
                  <div className="flex justify-between m-5 p-3 items-center">
                      <p>{200-comment.length} characters remaining</p>
                      <Button gradientDuoTone='greenToBlue' type='submit'>
                          Submit
                      </Button>
                  </div>
                  {
                      commentError && <Alert color='failure'>
                          {commentError}    
                      </Alert>
                  }
              
              </form>
          )}
          {
              comments.length === 0 ? (
              <p>No Comments</p>
              ) : (
                      <>
                      <div className="">
                          <p>{comments.length }  Comments</p>
                          </div>
                        
                          {comments.map((comment) => (
                              <Comm key={comment._id} comment={comment} onLike={handleLike} onEdit={handleEdit} onDelete={(commentId) => {
                                  setShowModal(true);
                                  setCommentToDelete(commentId);
                              }}/>
                          ))}
                      </>
                      
              )
          }
          <Modal show={showModal} onClose={() => setShowModal(false)} popupsixe='md' >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className='h-14 w-14 mb-4 mx-auto'/>

            <h3 className='mb-5 text-lg text-red-600'>Are you sure you want to delete your comment? This action cannot be undone.</h3>
            <div className="flex justify-center gap-4">
              <Button gradientDuoTone='pinkToOrange' onClick={()=>handleDelete(commentToDelete)}color='failure'>Yes</Button>
              <Button gradientDuoTone='greenToBlue' onClick={() => setShowModal(false)}>No</Button>
            </div>

          </div>
        </Modal.Body>
      </Modal>
    </div>
  )
}
