import React, { act, useEffect, useRef, useState } from 'react'
import Quill from 'quill'

import uniqid from 'uniqid'
import { assets } from '../../assets/assets'
import { useContext } from 'react'
import { AppContext } from '../../context/AppContext'
import { toast } from 'react-toastify'
import axios from 'axios'

const AddCourse = () => {
  const {backendUrl, getToken} = useContext(AppContext)
  const quillRef = useRef(null)
  const editorRef = useRef(null)
  const [courseTitle, setCourseTitle] = useState('')
  const [image, setImage] = useState(0)
  const [chapters, setChapters] = useState([])
  const [addChapter, setAddChapter] = useState(false); // popup
  const [chapterId, setChapterId] = useState(null)
  const [lectureDetails, setLectureDetails] = useState(
    {
      lectureTitle: '',
      lectureDuration: '',
      lectureUrl: '',
    }
  )
  const addAChapter = (action, chapterId) => {
    if (action === 'add') {
      const title=prompt('Enter Chapter Name:');
      if (title){
        const newChapter = {
          chapterId: uniqid(),
          chapterTitle: title,
          chapterContent: [],
          collapsed:false,
          chapterOrder: chapters.length > 0 ? chapters.slice(-1)[0].chapterOrder+1 : 1,
        };
        setChapters([...chapters,newChapter]);
      }
    } else if (action === 'remove'){
      setChapters(chapters.filter((chapter) => chapter.chapterId !== chapterId));
    } else if (action === 'toggle') {
      setChapters(
        chapters.map((chapter)=>
          chapter.chapterId === chapterId ? {...chapter, collapsed: !chapter.collapsed}: chapter
      )
    );
    }
  };
  
  const addALecture = (action, chapterId, lectureIndex) => {
    if(action === 'add') {
      setChapterId(chapterId);
      setAddChapter(true)}
      else if (action === 'remove') {
        setChapters(
          chapters.map((chapter)=> {
          if (chapter.chapterId === chapterId) {
            chapter.chapterContent.splice(lectureIndex, 1);
          }
          return chapter;
        })
      );
      }
  }

  const addLecture = () => {
    setChapters(
      chapters.map((chapter) => {
        if (chapter.chapterId === chapterId) {
          const newLecture = {
            ...lectureDetails,
            lectureOrder: chapter.chapterContent.length > 0 ? chapter.chapterContent.slice(-1)[0].lectureOrder +1 :1,
            lectureId: uniqid()
          };
          chapter.chapterContent.push(newLecture);
        }
        return chapter;
      }
    )
  );
    setAddChapter(false);
    setLectureDetails({
      lectureTitle: '',
      lectureDuration: '',
      lectureUrl: '',
    })
  }

  const Submitter = async (e) => {
    try {
      e.preventDefault()
      if(!image){
        toast.error('No thumbnail, cant upload')
      }
      const courseData = {
        courseTitle,
        courseDescription: quillRef.current.root.innerHTML, 
        courseContent: chapters,
      }

      const formData = new FormData()
      formData.append('courseData', JSON.stringify(courseData))
      formData.append('image', image)

      const token = await getToken()
      const {data} = await axios.post(backendUrl + '/api/admin/add-course', 
        formData, {headers: {Authorization: `Bearer ${token}`}})
      if (data.success){
        toast.success(data.message)
        setCourseTitle('')
        setImage(null)
        setChapters([])
        quillRef.current.root.innerHTML = ""
      }
      else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }

  }

useEffect(()=>{
 if(!quillRef.current && editorRef.current) {
  quillRef.current = new Quill(editorRef.current, {theme: 'snow',});
 }
})

  return (
    <div className='flex flex-col items-start justify-between md: p-8 md:pb-0  p-4 pt-8 pb-0 h-screen overflow-scroll '>
      <form onSubmit={Submitter} action="" className='flex flex-col gap-3 max-w-md w-full text-slate-500'>
        <div className='flex flex-col gap-1'>
          <p>Course Title</p>
          <input placeholder='Type title' type="text" 
          onChange={e => setCourseTitle(e.target.value)} value={courseTitle}
          className='rounded border border-gray-500 md:py-2.5 my-2 px-3 outline-none' required />
        </div>
        <div className='flex flex-col gap-1'>
          <p>CourseDescription</p>
          <div ref={editorRef}></div>
        </div>
        <div className='flex items-center justify-between flex-wrap'>
           <div className='flex flex-col md:flex-row items-center gap-3'>
              <p>Click icon to upload a course thumbnail</p>
              <label htmlFor="thumbnailImage" className='flex items-center gap-3'>
                <img src={assets.upload_icon} className='p-3 rounded cursor-pointer' />
                <input type="file" hidden accept="image/*" id="thumbnailImage" onChange={e => setImage(e.target.files[0])} />
                <img src={image ? URL.createObjectURL(image) : ''}  className='max-h-8'/>
              </label>
           </div>
        </div>
        <div>
          {chapters.map((chapter, chapterIndex) => (
            <div key={chapterIndex} className='bg-white border rounded-lg mb-4'>
              <div className='flex items-center justify-between p-4 border-b'>
                <div className='flex items-center'>
                  <img onClick={()=>addAChapter('toggle', chapter.chapterId)} 
                  src={assets.dropdown_icon} width={10} className={`mr-2 cursor-pointer transition-all ${chapter.collapsed && "-rotate-90"}`} />
                  <span className='font-semibold'>{chapterIndex + 1} {chapter.chapterTitle}</span>
                </div>
                <span className='text-slate-500'>{chapter.chapterContent.length} Lectures</span>
                <img onClick={()=> addAChapter('remove', chapter.chapterId)}className='cursor-pointer 'src={assets.crossIcon}/>
              </div>
              {!chapter.collapsed && (
                <div className='p-3'>
                  {chapter.chapterContent.map((lecture, lectureIndex)=> (
                    <div key={lectureIndex} className='flex justify-between items-center mb-2'>
                      <span>
                        {lectureIndex+1} {lecture.lectureTitle} - {lecture.lectureDuration} mins - 
                        <a href={lecture.lectureUrl} target='_blank' className='text-blue-500'>Link</a>
                      </span>
                      <img onClick={()=> addALecture('remove',chapter.chapterId, lectureIndex)} className='cursor-pointer'src={assets.crossIcon} alt="" />
                
                    </div>
                  ))}
                  <div onClick={()=> addALecture('add', chapter.chapterId)} className='bg-gray-200/10 p-2 rounded cursor-pointer mt-2 inline-flex'>
                    Add Lecture
                  </div>
                </div>
              )}
            </div>
          )
        )}
        <div className='flex justify-center items-center bg-blue-200 p-2 cursor-pointer rounded-lg'
        onClick={()=> addAChapter('add')}> 
          Add Chapter 
        </div>
        {addChapter && 
        (
          <div className='flex items-center justify-center bg-gray-500 inset-0 fixed '>
            <div className='rounded relative w-full max-w-80 bg-white text-slate-500 p-4'>
              <h2 className='text-lg font-semibold mb-4'>Add Lecture</h2>

              <div className='mb-2'>
                <p>Lecture Title</p>
                <input type="text" className='block w-full border rounded py-2 px-2 mt-1' 
                value={lectureDetails.lectureTitle} 
                onChange={(e) => setLectureDetails({ ...lectureDetails, lectureTitle: e.target.value})}
                />
              </div>

              <div className='mb-2'>
                <p>Duration (in mins) </p>
                <input type="number" className='block w-full border rounded py-2 px-2 mt-1' 
                value={lectureDetails.lectureDuration} 
                onChange={(e) => setLectureDetails({ ...lectureDetails, lectureDuration: e.target.value})}
                />
              </div>

              <div className='mb-2'>
                <p>Lecture Link</p>
                <input type="text" className='block w-full border rounded py-2 px-2 mt-1' 
                value={lectureDetails.lectureUrl} 
                onChange={(e) => setLectureDetails({ ...lectureDetails, lectureUrl: e.target.value})}
                />
              </div>

            <button onClick={addLecture} type='button' className='w-full bg-blue-500 text-white px-4 py-4 rounded'>Add Lecture</button>
            <img className='cursor-pointer absolute top-4 right-4 w-4' 
            onClick={()=> setAddChapter(false)} src={assets.crossIcon}></img>

            </div>
          </div>
        )}
        </div>
        <button className='bg-black text-white w-max py-2.5 px-8 my-4 rounded ' type='submit'>Add form</button>
      </form>
    </div>
  )
}

export default AddCourse
