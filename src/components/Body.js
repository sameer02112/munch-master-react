import React from "react";
import {allResturants,filterConfig} from './../utils/mockData';
import {ResturantCard} from './ResturantCard';
import { useState } from "react";
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';



export const Body = () => {

    const [listOfRes,setListOfRes] = useState(allResturants);
    const [sortingConfig, setSortingConfig] = useState(filterConfig)

    const filterResturants = () => {
        setListOfRes(allResturants.filter(el=>el.data.avgRating>4));
    }

    const changeFilter = (data) => () => {
      let localConfigData = Object.assign([],sortingConfig);
      localConfigData.forEach(ele=>{
        if(ele.name == data.name){
          ele.isActive = !ele.isActive;
          applyChangesOnResturantCards(ele.name)
        }else{
          ele.isActive = false;
        }
      })
      setSortingConfig(localConfigData)
      
    }

    const applyChangesOnResturantCards = (name) => { 
      let localResData = Object.assign([],listOfRes);
        if(name === 'avgRating'){
          localResData.sort((a,b) => (Number(a.data.avgRating) > Number(b.data.avgRating)) ? -1:1)
        }
        else if(name === 'deliveryTime'){
          localResData.sort((a,b) => (Number(a.data.deliveryTime) < Number(b.data.deliveryTime)) ? -1:1)
        }
        else if(name === 'priceLowToHigh'){
          localResData.sort((a,b) => (Number(a.data.costForTwo) < Number(b.data.costForTwo)) ? -1:1)
        }
        else if(name === 'priceHighToLow'){
          localResData.sort((a,b) => (Number(a.data.costForTwo) > Number(b.data.costForTwo)) ? -1:1)
        }
       setListOfRes(localResData)
    }

    return(
      <div className="body">
        {/* search bar */}
        <div className="search">
            <div className="filter">
                <button className="filter-btn" onClick={filterResturants}>Top Rated Resturant</button>
            </div>
        </div>

        <div className="resturant-filter-container">
          <FilterAltOutlinedIcon fontSize="large" style={{color: '#8a584b'}}/>
          {sortingConfig.map(ele => {
            return(
              <div 
                className="sort-text-box" 
                style={{backgroundColor: ele.isActive? '#5d8ed5': 'inherit'}} 
                onClick={changeFilter(ele)}>
                  {ele.displayName}
              </div>
            )
          })}
        </div>

        {/* resturant card */}
        <div className="resturant-container">
          {listOfRes.map(ele => <ResturantCard key = {ele?.data?.id} resData = {ele}/>)}       
        </div>
      </div>
    )
  }