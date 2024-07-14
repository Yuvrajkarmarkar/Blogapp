import React, { useEffect, useState } from 'react';
import moment from 'moment';
import {FaThumbsUp} from 'react-icons/fa'
import { useSelector } from 'react-redux';
import { Button, Textarea } from 'flowbite-react';

export default function comm({ comment,onLike,onEdit,onDelete }) {
    const [user, setUser] = useState({});
    const { currentUser } = useSelector(state => state.user);
    const [isEditing, setIsEditing] = useState(false);
    const [editedContent, setEditedContent]= useState(comment.content);

    
    useEffect(() => {
        const getUser = async () => {
            try {
                const res = await fetch(`/api/user/${comment.userId}`);
                const data = await res.json();
                if (res.ok) {
                    setUser(data);
                }
            } catch (error) {
                console.log(error.message);
            }
        }
        getUser();
        
    }, [comment]);
    
    const handleEdit = () => {
        setIsEditing(true);
        setEditedContent(comment.content);
    };
    
    const handleSave = async () => {
        setIsEditing(false);
        try {
            const res = await fetch(`/api/comment/editComment/${comment._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ content: editedContent }),
            });
            const data = await res.json();
            if (res.ok) {
                setIsEditing(false);
                onEdit(comment, editedContent);
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    

    
  return (
    <div className='flex p-4 border-b '>
          <div className="flex-shrink-0 mr-3">
              <img src={user.profilePicture} alt="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzBXNuO6PezhC18aYH_2cYtS0I7KbxoKYdwA&s" className='w-8 h-8 rounded-full bg-slate-50'/>
          </div>
          <div className="flex-1">
              
          <div className="flex items-center mb-1">
              <span className='font-bold mr-1 text-xs truncate'>
                  {user?`@${user.username}`:'anonymous'}
              </span>
              
                  <span className='text-xs'>
                      {moment(comment.createdAt).fromNow()}
                  </span>
             
              </div>
              {
                  isEditing ? (
                      <>
                      <Textarea className='border-gray-300 p-2 w-full dark:bg-purple-900' value={editedContent} onChange={(e)=>setEditedContent(e.target.value)}></Textarea>
                          <div className="flex justify-end gap-2 mt-3">
                              <Button type='button' size='sm' gradientDuoTone='cyanToBlue'
                              onClick={handleSave}
                              >
                                  Save
                              </Button>
                              <Button type='button' size='sm' gradientDuoTone='cyanToBlue' onClick={()=>setIsEditing(false)} >
                                  Cancel
                              </Button>
                      </div>
                      </>
                  
                  )

                 : (
                          
                          <>
                          <p>{comment.content}</p>
              <div className="flex flex-row gap-1 items-center ">
                  <button className={`text-gray-500 hover:text-blue-600 ${currentUser && comment.likes.includes(currentUser._id)&&'!text-blue-500'}`} type='button' onClick={()=>onLike(comment._id)}>
                      <FaThumbsUp/>
                  </button>
                  <p>
                      {
                          comment.likes.length > 0 && 
                          <span className='text-xs'>{comment.likes.length} likes</span>
                      }
                  </p>
                  {
                                      currentUser && (currentUser._id === comment.userId || currentUser.isAdmin) && (
                                          <>
                                          
                                          <button className='hover:text-blue-600 hover:underline' onClick={handleEdit} >Edit</button>
                                              <button className='hover:text-red-600 hover:underline' onClick={
                                                  ()=> onDelete(comment._id)
                                          } >Delete</button>
                                          </>
                      )
                  }
              </div>
                          </>
                    )
            }
              
          </div>
    </div>
  )
}
