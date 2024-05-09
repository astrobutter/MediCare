import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import RecipeCard from "../components/recipeCard";
import { motion } from "framer-motion";
import { CiSearch } from "../components/ReactIcons";
import '../css/communityForum.css'

export const CommunityForum = () => {
  const {search} = UserAuth();
  const { posts, fetchPosts, totalPages} = UserAuth();
  let navigate = useNavigate();
  const [ searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const handleFirstPage = () => { setCurrentPage(1); };
  const handlePrevPage = () => { if (currentPage > 1) setCurrentPage(currentPage- 1); };
  const handleNextPage = () => { if (currentPage < totalPages) setCurrentPage(currentPage + 1); };
  const handleLastPage = () => { setCurrentPage(totalPages); };

  useEffect(() => {
    fetchPosts(currentPage);
  }, [currentPage]);
  return (
    <motion.div className='page community-forum' initial={{ opacity: 0, x: '100%' }} animate={{ opacity: 1, x: '0%' }} exit={{ opacity: 0, x: '100%' }}>
        <div className="community-nav">
        <button className="add-post" type="button" onClick={(event) => { event.stopPropagation(); navigate('/forum/create')}} >+</button>
        <div className="right-field">
          <input type="text" value={searchText} onChange={(event) => setSearchText(event.target.value)} placeholder="Search" />
          <button onClick={() => search(searchText)} className='search-button'><CiSearch /></button>
        </div></div>
        <div className="forum-container">
        { posts ?
        <>
        <ul>{posts.map((recipe) => (
          <li><RecipeCard key={recipe._id} slug={recipe.slug} imageUrl={recipe.imageUrl} name={recipe.name} _id={recipe._id} />
          </li>))}
        </ul>
        <div className="pagination">
          <button onClick={handleFirstPage} disabled={currentPage === 1} className="direct-page"> First Page </button>
          <button onClick={handlePrevPage} disabled={currentPage === 1}><img src="https://img.icons8.com/small/128/2266EE/left.png" alt="left"/>
          </button>
          <div className="current">{currentPage}</div>
          <button onClick={handleNextPage} disabled={currentPage === totalPages}><img src="https://img.icons8.com/small/128/2266EE/right.png" alt="left"/>
          </button>
          <button onClick={handleLastPage} disabled={currentPage === totalPages} className="direct-page"> Last Page </button>
        </div>
        </>
        : <> Loading....</>
        }
        </div>
    </motion.div>
  )
}
