import React from 'react'
import img from '../assets/1.jpg'
import Rating from '@mui/material/Rating';
import '../css/review-card.css'
import { Link } from 'react-router-dom';

export const ReviewCard = ({review}) => {
  const {rating, text, user, createdAt} = review;
  return (
    <div className='review-card'>
        <p className='icon'>{user[0]}</p>
        <div className='review-right-card'>
            <div className='upper'>
                {/* <Link to={ `/recipe/${props.slug}`} ><h6>{props.name}</h6></Link> */}
                <div className='head'>
                  <h6>{user}</h6>
                  <p className='post-date'>posted on {(createdAt).split('T')[0]}</p>
                </div>
                <Rating name="simple-controlled" readOnly 
                value={rating}
                />
                {/* <p className='post-date'>posted on {createdAt.slice('-')}</p> */}
            </div>
            <div className='bottom'>
                <p>{text}</p>
            </div>
        </div>
    </div>
  )
}
