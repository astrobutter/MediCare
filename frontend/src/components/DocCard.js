import React from 'react';
import { FaCheckToSlot, FaArrowRightLong } from "react-icons/fa6";
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
              <FaCheckToSlot />
                <p>(0)</p>
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
