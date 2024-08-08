import React from 'react';
import { FaArrowRightLong } from './ReactIcons';
import { useNavigate } from "react-router-dom";
import '../css/doc-card.css'

export const DocCard = ({doc}) => {
  const Navigate = useNavigate();
  return (
    <div className='doc-card'>
      <img src={doc.imageUrl} />
      <div className='info-container'>
        <h2>Dr. {doc.name}</h2>
        <div className='button-container'><button onClick={(event) => Navigate(`/doc/${doc.username}`)}><FaArrowRightLong /></button></div>
      </div>
    </div>
  )
}
