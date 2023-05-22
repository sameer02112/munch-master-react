import React from "react";
import {filterConfig} from './../utils/mockData';
import {ResturantCard} from './ResturantCard';
import {Shimmer} from './Shimmer'
import { useState , useEffect} from "react";
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import FilterAltOffOutlinedIcon from '@mui/icons-material/FilterAltOffOutlined';
import { Divider } from "@mui/material";
import { Link } from "react-router-dom";
import {useOnline} from './../utils/useOnline';

export const Body = () => {

    const [listOfRes,setListOfRes] = useState([]);
    const [listOfResOriginal,setListOfResOriginal] = useState([]);
    const [sortingConfig, setSortingConfig] = useState(filterConfig);
    const [searchText, setSearchText] = useState("");
    const [isFilterApplied, setIsFilterApplied] = useState(false);
    const [crouselVal, setCrouselVal] = useState([]);
    const [offsetVal, setOffsetVal] = useState(0);
    const [isFetching, setIsFetching] = useState(false);

    useEffect(()=>{
       window.addEventListener("scroll", handleScroll);
       getResturantsDataApi()
    },[])

    useEffect(()=>{
      if (!isFetching) return;
      getResturantsDataApiWithOffset();
    },[isFetching])

    async function getResturantsDataApi(){
      const data = await fetch('https://www.swiggy.com/dapi/restaurants/list/v5?lat=17.385044&lng=78.486671&page_type=DESKTOP_WEB_LISTING');
      const json = await data.json();
      const value =  json?.data?.cards[2]?.data?.data?.cards;
      const crousel = json?.data?.cards[0].data?.data.cards;
      setListOfRes(value)
      setListOfResOriginal(value)
      setCrouselVal(crousel)
    }

    async function getResturantsDataApiWithOffset(){
      setTimeout(async () => {
        const data = await fetch(`https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.964430071887168&lng=79.15881760418415&offset=${offsetVal}&sortBy=RELEVANCE&pageType=SEE_ALL&page_type=DESKTOP_SEE_ALL_LISTING`)
        const json = await data.json();
        const newDataArr = json.data.cards;
        setOffsetVal(offsetVal+16);
        setListOfRes([...listOfRes, ...newDataArr]);
      },[1000])
      setIsFetching(false);
    }

    const handleScroll = () => {
      if (Math.ceil(window.innerHeight + document.documentElement.scrollTop) !==  (document.documentElement.offsetHeight)  ||  isFetching){
        return;
      }
      setIsFetching(true);
    };


    const changeFilter = (data) => () => {
      let localConfigData = Object.assign([],sortingConfig);
      localConfigData.forEach(ele=>{
        if(ele.name === data.name){
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

    const isOnline = useOnline();

    if(!isOnline){
      return <h2>No Internet Connection!</h2>
    }

    return listOfResOriginal.length === 0 ? (
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

            <div className="homepage-img-crousel">
              {crouselVal.map(ele => {
                return (
                  <div className="homepage-crousel-card">
                      <img src = {`https://res.cloudinary.com/swiggy/image/upload/${ele.data.creativeId}`} alt="crouselimg"/>
                  </div>
                )
              })}
            </div>

            {/* sorting filter */}
            {listOfRes.length === 0 && <h3 className = "no-result-found-container">No Results Found!</h3>}
            {listOfRes.length !== 0 && 
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
                {listOfRes.map(ele => 
               
                <Link to = {`/resturant/${ele?.data?.id}`} key = {ele?.data?.id} style={{color: 'inherit', textDecoration: 'none'}}>
                  { console.log(ele)}
                  <ResturantCard resData = {ele}/>
                </Link>
                  )}       
              </div>
            </>
            }
          </div>
        )
  }