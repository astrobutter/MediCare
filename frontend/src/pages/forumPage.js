import React, { useEffect, useState, state, setState } from 'react'
import { useParams } from 'react-router-dom'
import { useGetUserID } from '../hooks/useGetUserID';
import { useGetIsDoc } from '../hooks/useGetIsDoc';
import { toast, axios, motion } from '../components/NpmPackages';
import '../css/forumPage.css'

export const ForumPage = () => {
  const docStatus = useGetIsDoc();
  const userID = useGetUserID();
  const params = useParams()
  const [post, setPost] = useState([]);
  const [comment, setComment] = useState({
    commentUser : userID,
    name : '',
    description : '',
    slug : params.slug,
  });
  const [commentData, setCommentData] = useState([]);

  const fetchPost = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/forum/${params.slug}`);
      setPost(response.data.result[0]);
    } catch (err) { console.log(err);}
  };

  const fetchComments = async () =>{
    try {
      const response = await axios.get(`http://localhost:3001/forum/comments/${params.slug}`);      
      setCommentData(response.data.myComments);
    } catch (err) { console.log(err) }
  }

  const getUserName = async (id) => {
    let response;
    try {
      if( docStatus==='true' ){ response = await axios.get(`http://localhost:3001/forum/user/${id}`)
      } else { response = await axios.get(`http://localhost:3001/forum/pateint/${id}`)
      }
      setComment(comment => ({...comment, name : response.data.username }));
    } catch (err) { console.log(err) }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if(userID){
        await axios.post("http://localhost:3001/forum/comments", { ...comment });
        toast('Comment posted', { position: "bottom-left", autoClose: 1500, hideProgressBar: true, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, theme: "dark", });
        setComment(comment => ({...comment, description : ''}));
        fetchComments();
      }
      else{ toast.error(`You're not logged in.`, { position: "bottom-left", autoClose: 1500, hideProgressBar: true, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, theme: "dark", });
      }
    } catch (err) { console.log(err) }
  }
  // useEffect(()=>{
  //   console.log('post: ', post);
  // },[post])
  useEffect(()=>{
    {userID && getUserName(userID);}
  },[docStatus])
  useEffect(() => {
      fetchPost();
      fetchComments();
  }, []);

  return (
    <motion.div className='page recipe-page' initial={{ opacity: 0, x: '100%' }} animate={{ opacity: 1, x: '0%' }} exit={{ opacity: 0, x: '100%' }}>
      <h1>{post.name}</h1>
      <div className='recipe-img-container'><img src={post.imageUrl} alt={post.name} />
      </div>
      <h3>Description</h3>
      <p>{post.description}</p>
      <div className='comment-container'>
        <h3>Comments</h3>
        <form onSubmit={handleSubmit} className='comment-form'>
          <textarea id="name" name="text" value={comment.description} placeholder='Add your comment' role="textbox" 
            onChange={(e)=>{setComment(comment => ({...comment, description : e.target.value}))}}
          >
          </textarea>
          <button type='submit'>Post</button>
        </form>
        <div className='comments-wrapper'>
          { commentData && commentData.map(comment => {
              return (
                <div className='comment' key={comment._id}>
                  <p className='user-name'>
                    <div className='name'>{comment.name}</div>
                    <p className='user-time'>posted on {(comment.createdAt).split('T')[0]}</p>
                  </p>
                  <p className='user-comments'>{comment.description}</p>
                </div>
          )})}
        </div>
      </div>
    </motion.div>
  )
}