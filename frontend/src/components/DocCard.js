import React from 'react';
import { FaStar } from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";
import '../css/doc-card.css'
import { useNavigate } from "react-router-dom";

export const DocCard = ({doc}) => {
  const Navigate = useNavigate();
  return (
    <div className='doc-card'>
        <img src={doc.imageUrl} />
        <div className='info-container'>
            <h2>Dr. {doc.name}</h2>
            <div className='review-wrapper'>
                <FaStar />
                <p>4.5</p>
                <p>(16)</p>
            </div>
            <div className='button-container'>
                <button onClick={(event) => Navigate(`/doc/${doc.username}`)}>
                  <FaArrowRightLong />
                </button>
            </div>
        </div>
    </div>
  )
}
