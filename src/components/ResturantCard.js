import React from "react";
import {resturantCdnBaseUrl} from './../utils/constants';
import StarIcon from '@mui/icons-material/Star';
import { Divider } from "@mui/material";

export const ResturantCard = ({resData}) => {
    const {cloudinaryImageId,name,cuisines,avgRating,costForTwo,deliveryTime,aggregatedDiscountInfo} = resData?.info.hasOwnProperty("id") ? resData?.info : resData?.data?.data;
    return(
      <div className="resturant-parent-container">
        <div className="resturant-card">
          <img src={`${resturantCdnBaseUrl}${cloudinaryImageId}`} alt={'burger'}/>
          <div className="card-name-container">
            <h3>{name}</h3>
            <h5>{cuisines.join(', ')}</h5>
          </div>
          <div className="card-basic-info">
              <div className="avg-rating-container" style={{backgroundColor: avgRating>=4 ? '#48c479' : '#db7c38'}}>
              <StarIcon className="ratingStarIcon"/><p>{avgRating}</p>  
              </div>    
              <p>{costForTwo}</p>
              <p>{deliveryTime}</p>
          </div>
          <Divider variant="middle" className="card-divider"/>
          <h4 className="card-offer-text">{aggregatedDiscountInfo?.shortDescriptionList[0]?.meta}</h4>
        </div>
        <button className="card-quick-view-btn">QUICK VIEW</button>
       </div>
    )
  }
  