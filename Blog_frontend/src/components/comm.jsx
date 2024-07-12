import React, { useEffect, useState } from 'react';
import moment from 'moment';

export default function comm({ comment }) {
    const [user, setUser] = useState({});
    
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
        
    },[comment])
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
              <p>{comment.content }</p>
          </div>
    </div>
  )
}
