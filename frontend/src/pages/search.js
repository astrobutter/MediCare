import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import RecipeCard from "../components/recipeCard";
import { motion } from "framer-motion";
import { CiSearch } from "../components/ReactIcons";
import { useGetUserID } from '../hooks/useGetUserID';
import '../css/communityForum.css'

export const Search = () => {
  let navigate = useNavigate();
    const { searchedForum, search } = UserAuth();
    const userID = useGetUserID();
    const [currentPage, setCurrentPage] = useState(1);
    const [ searchText, setSearchText] = useState("");

    // useEffect(() => {
    // }, [currentPage]);
  
    return (
      <motion.div className='page community-forum' initial={{ opacity: 0, x: '100%' }} animate={{ opacity: 1, x: '0%' }} exit={{ opacity: 0, x: '100%' }}>
        <div className="community-nav">
        <button className="add-post" type="button" onClick={(event) => { event.stopPropagation(); navigate('/forum/create')}} >+</button>
        <div className="right-field">
          <input type="text" value={searchText} onChange={(event) => setSearchText(event.target.value)} placeholder="Search" />
          <button onClick={() => search(searchText)} className='search-button'><CiSearch /></button>
        </div></div>
        <h1>({searchedForum.length}) Posts Found</h1>
        <div className="forum-container">
        { searchedForum ?
        <>
        <ul>{searchedForum.map((recipe) => (
          <li><RecipeCard key={recipe._id} slug={recipe.slug} imageUrl={recipe.imageUrl} name={recipe.name} _id={recipe._id} />
          </li>))}
        </ul>
        </>
        : <> Loading....</>
        }
        </div>
      </motion.div>
    );
}
