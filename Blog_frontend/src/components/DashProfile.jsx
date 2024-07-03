import { Alert, Button, Modal, TextInput } from 'flowbite-react'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../firebase';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { updateSuccess, updateFailure, updateStart,deleteuserFailure,deleteuserStart,deleteuserSuccess,signoutSuccess } from '../redux/user/userSlice';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import {Link} from 'react-router-dom'

export default function DashProfile() {
  const { currentUser, error,loading } = useSelector((state) => state.user)
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [imageFileUploadingProgress, setImageFileUploadingProgress] = useState(null);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);
  const filePickerRef = useRef()
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();
  const [imageFileUploading, setImageFileUploading] = useState(false);
  const [updateuserSuccess, setUpdateUserSuccess] = useState(null);
  const [updateuserError, setUpdateUserError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file));
    }
  };
  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
  },[imageFile]);
  
  const uploadImage = async () => {
    setImageFileUploading(true);
    setImageFileUploadError(null);
    const storage = getStorage(app);
    const fileName = new Date().getTime() + imageFile.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);
    uploadTask.on('state_changed', (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      setImageFileUploadingProgress(progress.toFixed(0));

    },
      (error) => {
        setImageFileUploadError('Error in uploading photo');
        setImageFileUploadError(null);
        setImageFile(null);
        setImageFileUrl(null);
        setImageFileUploading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageFileUrl(downloadURL);
          setFormData({ ...formData, profilePicture: downloadURL });
          setImageFileUploading(false);
        });
      }
    );
  };
  
  const handleChange = (e) => {
    setFormData({...formData, [e.target.id]: e.target.value });
  }
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdateUserError(null);
    setUpdateUserSuccess(null);
    
    if (Object.keys(formData).length === 0) {
      setUpdateUserError('nothing changed');
      return;
    }
    if (imageFileUploading) {
      setUpdateUserError('Please wait while uploading the new photo');
      return;
    }
    try {
      
      dispatch(updateStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
      
      const data = await res.json();
      if (!res.ok) {
        dispatch(updateFailure(data.message));
        setUpdateUserError(data.message);
      }
      else {
        dispatch(updateSuccess(data));
        setUpdateUserSuccess(`user's profile updated successfully`);
        
      }
      
    } catch (error) {
      dispatch(updateFailure(error.message));
    }
  };

  const handleDeleteAccount = async() => {
    setShowModal(false);
    try {
      dispatch(deleteuserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`,
        {
          method: 'DELETE',
       
        });
      const data = await res.json();
      if (!res.ok) {
        dispatch(deleteuserFailure(data.message));
      }
      else {
        dispatch(deleteuserSuccess(data));
        
      }
    } catch (error) {
      dispatch(deleteuserFailure(error.message));
    }

  }
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


  return (
    <div className='max-w-lg mx-auto p-3 w-full'>
      <h1 className='my-7 text-center font-semibold text-3xl'>Profile</h1>
      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        <input type='file' accept='image/*' onChange={handleImageChange} ref={(filePickerRef)} hidden/>
        <div className="w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full relative" onClick={() =>filePickerRef.current.click()
        }>
          {imageFileUploadingProgress && (
            <CircularProgressbar
              value={imageFileUploadingProgress || 0}
              text={`${imageFileUploadingProgress}%`}
              strokeWidth={5}
              styles={{
                root: {
                  width: '100%',
                  height: '100%',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                },
                path: {
                  stroke: `rgba(62, 152, 199, ${
                    imageFileUploadingProgress / 100
                  })`,
                },
              }}
            />
          )}
        <img src={imageFileUrl||currentUser.profilePicture } alt="user" className={`rounded-full w-full h-full border-8 border-[lightgray] ${imageFileUploadingProgress &&imageFileUploadingProgress<100 && 'opacity-60'}`}  />
        </div>
        {imageFileUploadError &&
        <Alert color='failure'>
          {imageFileUploadError}
        </Alert>
        }
        <TextInput type='text' id='username' placeholder='Username'defaultValue={currentUser.username} onChange={handleChange}/>
        <TextInput type='email' id='email' placeholder='Email'defaultValue={currentUser.email} onChange={handleChange}/>
        <TextInput type='password' id='password' placeholder='Password'  onChange={handleChange}/>
        <Button type='submit' gradientDuoTone='greenToBlue' disabled={loading || imageFileUploading}>
         {loading ? 'Loading...' : 'Update'}
        </Button>
        {
          currentUser.isAdmin && (
            <Link to={'/create-post'}>

            <Button type='button' gradientDuoTone='greenToBlue' className='w-full'>
              create a post
            </Button>
            </Link>
          )
        }
      </form>
      <div className=" text-red-500 flex justify-between mt-5">
        <span onClick={()=>setShowModal(true)} className='cursor-pointer'>Delete Accont</span>
        <span className='cursor-pointer' onClick={handleSignout}>Sign out</span>
      </div>
      {
        updateuserSuccess &&
        (<Alert color='success' className='mt-5'>
          {updateuserSuccess}
        </Alert>)
      }
      {
        updateuserError &&
        (<Alert color='failure' className='mt-5'>
          {updateuserError}
        </Alert>)
      }
      {
        error &&
        (<Alert color='failure' className='mt-5'>
          {error}
        </Alert>)
      }
      <Modal show={showModal} onClose={() => setShowModal(false)} popupsixe='md' >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className='h-14 w-14 mb-4 mx-auto'/>

            <h3 className='mb-5 text-lg text-red-600'>Are you sure you want to delete your account? This action cannot be undone.</h3>
            <div className="flex justify-center gap-4">
              <Button gradientDuoTone='pinkToOrange' onClick={handleDeleteAccount}color='failure'>Yes</Button>
              <Button gradientDuoTone='greenToBlue' onClick={() => setShowModal(false)}>No</Button>
            </div>

          </div>
        </Modal.Body>
      </Modal>
    </div>
  )
}
