import React from "react";
import {filterConfig} from './../utils/mockData';
import {ResturantCard} from './ResturantCard';
import {Shimmer} from './Shimmer'
import { useState , useEffect} from "react";
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import FilterAltOffOutlinedIcon from '@mui/icons-material/FilterAltOffOutlined';
import { Divider } from "@mui/material";


export const Body = () => {

    const [listOfRes,setListOfRes] = useState([]);
    const [listOfResOriginal,setListOfResOriginal] = useState([]);
    const [sortingConfig, setSortingConfig] = useState(filterConfig);
    const [searchText, setSearchText] = useState("");
    const [searchClicked, setSearchClicked] = useState(false);
    const [isFilterApplied, setIsFilterApplied] = useState(false);


    useEffect(()=>{
       getResturantsDataApi()
    },[])

    async function getResturantsDataApi(){
      const data = await fetch('https://www.swiggy.com/dapi/restaurants/list/v5?lat=17.385044&lng=78.486671&page_type=DESKTOP_WEB_LISTING');
      const json = await data.json();
      const value =  json?.data?.cards[2]?.data?.data?.cards;
      setListOfRes(value)
      setListOfResOriginal(value)
    }

    const changeFilter = (data) => () => {
      let localConfigData = Object.assign([],sortingConfig);
      localConfigData.forEach(ele=>{
        if(ele.name == data.name){
          if(ele.isActive){
            ele.isActive = false;
            setListOfRes(listOfResOriginal)
            setSortingConfig(sortingConfig)
            setIsFilterApplied(false);
            return;
          }
          ele.isActive = !ele.isActive;
          applyChangesOnResturantCards(ele.name)
          setIsFilterApplied(true)
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

    const searchResturants = () => {
      let initialResList = Object.assign([],listOfResOriginal);
      let finalResList = initialResList.filter(el => (el.data.name.toLowerCase()).includes(searchText.toLowerCase()));
      setListOfRes(finalResList);
    }

    return listOfResOriginal.length == 0 ? (
      <Shimmer/> 
        ) : (
          <div className="body">
            {/* search bar */}
            <div className="search">
                <input
                  type="text"
                  className="search-input"
                  placeholder="Search"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}>
                </input>
                <button className="search-btn" onClick={searchResturants}>Search</button>

            </div>

            {/* sorting filter */}
            {listOfRes.length == 0 && <h3 className = "no-result-found-container">No Results Found!</h3>}
            {listOfRes.length != 0 && 
            <>
              <div className="resturant-filter-container">
                {isFilterApplied && <FilterAltOutlinedIcon fontSize="large" style={{color: '#213552'}}/>}
                {!isFilterApplied && <FilterAltOffOutlinedIcon fontSize="large" style={{color: '#213552'}}/>}
                {sortingConfig.map((ele,index) => {
                  return(
                    <div 
                      className="sort-text-box" 
                      style={{backgroundColor: ele.isActive? '#5d8ed5': 'inherit'}} 
                      key={index}
                      onClick={changeFilter(ele)}>
                        {ele.displayName}
                    </div>
                  )
                })}
              </div>

              {/* number of resturants heading */}
              <p className="no-of-res-text">{listOfRes.length} Resturants</p>
              <Divider variant="middle" className="card-divider"/>

              {/* resturant card */}
              <div className="resturant-container">
                {listOfRes.map(ele => <ResturantCard key = {ele?.data?.id} resData = {ele}/>)}       
              </div>
            </>
            }
          </div>
        )
  }