import { Button, FileInput, Select, TextInput } from 'flowbite-react'

import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function CreatePost() {
  return (
      <div className='p-3 max-w-3xl mx-auto min-h-screen'>
          <h1 className='text-center text-3xl my-7 font-semibold'>create a post</h1>
          <form className='flex flex-col gap-4'>
              <div className="flex flex-col gap-4 sm:flex-row justify-between">
                  <TextInput type='text ' placeholder='Title' required id='title'
                      className='flex-1' />
                  <Select>
                      <option value='uncategorized'>select one</option>
                      <option value="tech">Tech</option>
                      <option value="politics">Politics</option>
                      <option value="sports">Sports</option>
                  </Select>
              </div>
              <div className="flex gap-4 items-center justify-between border-4 border-teal-900 p-3">
                  <FileInput type='file' accept='image/*' />
                  <Button type='button' gradientDuoTone='greenToBlue' size='sm'>
                      Upload image
                  </Button>
              </div>
              <ReactQuill theme='snow' placeholder='write here' className='h-72 mb-12' required />
              <Button type='submit' gradientDuoTone='greenToBlue'>
                 Publish
              </Button>
          </form>
     
    </div>
  )
}
