import React, { useEffect, useState } from "react";
import { UserAuth } from "../context/AuthContext";
import { Link } from 'react-router-dom';
import { useGetUserID } from "../hooks/useGetUserID";
import "../App.css";

const RecipeCard = (props) => {
    const userID = useGetUserID();
    return (
    <div to={`/recipe/${props.slug}`} className="home-recipe-card" >
        <img src={props.imageUrl} alt={props.name} />
        <Link to={ `/forum/${props.slug}`} ><h6>{props.name}</h6></Link>
    </div>
  )
}

export default RecipeCard;