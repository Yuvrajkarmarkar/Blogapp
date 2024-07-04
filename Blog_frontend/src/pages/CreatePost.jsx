import { Alert, Button, FileInput, Select, TextInput } from 'flowbite-react';
import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../firebase';
import { CircularProgressbar } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css';
import{useNavigate} from 'react-router-dom'


export default function CreatePost() {
    const [file, setFile] = useState(null);
    const [imageuploadProgress, setImageuploadProgress] = useState(null);
    const [imageuploadError, setImageuploadError] = useState(null);
    const[formData,setFormData] = useState({});
    const [publishError, setPublishError] = useState(null);
    const navigate = useNavigate();

    console.log(formData)
    const handleImage = async () => {
        try {
            if (!file) {
                setImageuploadError('No file selected');
                return;
            }
            setImageuploadError(null);
            const storage = getStorage(app);
            const fileName = new Date().getTime() + '-' + file.name;
            const storageRef = ref(storage, fileName);
            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on('state_changed', (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setImageuploadProgress(progress.toFixed(0));
           
            },
                (error) => {
                    setImageuploadError('Error in uploading photo');
                    setImageuploadProgress(null);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        setImageuploadProgress(null);
                        setImageuploadError(null);
                        setFormData({ ...formData, image: downloadURL });
                    })
                }
            );

        } catch (error) {
            setImageuploadError('Error uploading photo');
            setImageuploadProgress(null);
            console.log(error);
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('/api/post/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const data = await res.json();
            if (!res.ok) {
                setPublishError(data.message);
                return;
            }
           
            if(res.ok){
                setPublishError(null);
                navigate(`/post/${data.slug}`);
                
                
            }

        } catch (error) {
            setPublishError('Error Publishing');
        }
    }

  return (
      <div className='p-3 max-w-3xl mx-auto min-h-screen'>
          <h1 className='text-center text-3xl my-7 font-semibold'>create a post</h1>
          <form className='flex flex-col gap-4'onSubmit={handleSubmit}>
              <div className="flex flex-col gap-4 sm:flex-row justify-between">
                  <TextInput type='text ' placeholder='Title' required id='title'
                      className='flex-1' onChange={(e) => setFormData({...formData,title:e.target.value})}/>
                  <Select
                      onChange={(e) =>
                          setFormData({
                             ...formData, category:e.target.value
                          })
                         
                }
                  >
                      <option value='uncategorized'>select one</option>
                      <option value="tech">Tech</option>
                      <option value="politics">Politics</option>
                      <option value="sports">Sports</option>
                  </Select>
              </div>
              <div className="flex gap-4 items-center justify-between border-4 border-teal-900 p-3">
                  <FileInput type='file' accept='image/*' onChange={(e) => setFile(e.target.files[0])}/>
                  <Button type='button' gradientDuoTone='greenToBlue' size='sm' onClick={handleImage} disabled={imageuploadProgress}>
                      {
                          imageuploadProgress ?
                              (<div className="w-16 h-16">
                                  <CircularProgressbar value={imageuploadProgress} text={`${imageuploadProgress||0}%`}/>
                              </div>):('Upload image')

                      }
                  </Button>
              </div>
              {
                  imageuploadError && (
                      <Alert color='failure'>{imageuploadError }</Alert>
                  )
              }
              {
                  formData.image && (
                      <img src={formData.image} alt='upload' className='w-full h-72 object-cover'/>
                  )
              }
              <ReactQuill theme='snow' placeholder='write here' className='h-72 mb-12' required
                  onChange={(value) => {
                  setFormData({...formData, content:value })
              }}
              />
              <Button type='submit' gradientDuoTone='greenToBlue'>
                 Publish
              </Button>
              {
                  publishError && <Alert className='mt-5' color='failure'>{publishError }</Alert>
              }
          </form>
     
    </div>
  )
}
