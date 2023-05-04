import React from "react";
import {allResturants} from './../utils/mockData';
import {ResturantCard} from './ResturantCard';
import { useState } from "react";



export const Body = () => {

    const [listOfRes,setListOfRes] = useState(allResturants);

    const filterResturants = () => {
        setListOfRes(allResturants.filter(el=>el.data.avgRating>4));
    }

    return(
      <div className="body">
        {/* search bar */}
        <div className="search">
            <div className="filter">
                <button className="filter-btn" onClick={filterResturants}>Top Rated Resturant</button>
            </div>
        </div>
        {/* resturant card */}
        <div className="resturant-container">
          {listOfRes.map(ele => <ResturantCard key = {ele?.data?.id} resData = {ele}/>)}       
        </div>
      </div>
    )
  }