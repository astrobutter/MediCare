import React, { useEffect, useState, state, setState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { UserAuth } from "../context/AuthContext";
import { useGetUserID } from '../hooks/useGetUserID';
import { toast, axios, motion, dayjs } from '../components/NpmPackages';

export const ForumPage = () => {
  const { isDoctor, user, doc} = UserAuth();
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
  const [userName, setUserName] = useState();
  const [profileName, setprofieName] = useState();

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
      {userID && getUserName(userID);}
      // getUserName(userID);
    } catch (err) { console.log(err) }
  }

  const getUserName = async (id) => {
    try {
      let response;
      if( isDoctor ){
        response = await axios.get(`http://localhost:3001/forum/user/${id}`)
      } else {
        response = await axios.get(`http://localhost:3001/forum/pateint/${id}`)
      }
      setComment(comment => ({...comment, name : response.data.username }));
      setUserName(response.data.username)
    } catch (err) { console.log(err) }
  }

  
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if(userID){
        console.log(comment);
        await axios.post("http://localhost:3001/forum/comments", { ...comment });
        toast('Comment posted', { position: "bottom-left", autoClose: 1500, hideProgressBar: true, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, theme: "dark", });
        setComment(comment => ({...comment, description : ''}))
      }
      else{
        toast.error(`You're not logged in.`, { position: "bottom-left", autoClose: 1500, hideProgressBar: true, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, theme: "dark", });
      }
    } catch (err) { console.log(err) }
  }
  useEffect(()=>{
    console.log(post)
  },[post])
  useEffect(() => {
      fetchPost();
      fetchComments();
  }, []);

  return (
    <motion.div className='page community-forum recipe-page' initial={{ opacity: 0, x: '100%' }} animate={{ opacity: 1, x: '0%' }} exit={{ opacity: 0, x: '100%' }}>
      <h1>{post.name}</h1>
      <div className='recipe-img-container'>
        <img src={post.imageUrl} alt={post.name} />
      </div>
      <h3>Description</h3>
      <p>{post.description}</p>
      <div className='comment-container'>
        <h3>Comments</h3>
        <form onSubmit={handleSubmit} className='comment-form'>
          <textarea 
            id="name"
            name="text"
            value={comment.description}
            onChange={(e)=>{
              setComment(comment => ({...comment, description : e.target.value}))
            }}
            placeholder='Add your comment'
            role="textbox" 
          >
          </textarea>
          <button type='submit'> Post </button>
        </form>
        <div className='comments-wrapper'>
          { commentData && commentData.map(comment => {
              return (
                <div className='comment' key={comment._id}>
                  <p className='user-name'>
                    <Link to={`/user/${comment.name}`} >{comment.name}</Link>
                    <p className='user-time'>posted on {(comment.createdAt).split('T')[0]}</p>
                  </p>
                  <p className='user-comments'>{comment.description}</p>
                </div>
              )
            })
          }
        </div>
      </div>
    </motion.div>
  )
}