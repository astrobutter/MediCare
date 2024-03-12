import React from 'react'
import { Rating } from './MaterialUI'
import '../css/review-card.css'

export const ReviewCard = ({review}) => {
  const { rating, text, user, createdAt } = review;
  return (
    <div className='review-card'>
      <p className='icon'>{user[0]}</p>
      <div className='review-right-card'>
        <div className='upper'>
          <div className='head'>
            <h6>{user}</h6>
            <p className='post-date'>posted on {(createdAt).split('T')[0]}</p>
          </div>
          <Rating value={rating} name="simple-controlled" readOnly />
        </div>
        <div className='bottom'><p>{text}</p></div>
      </div>
    </div>
  )
}