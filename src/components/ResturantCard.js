import React from "react";
import {resturantCdnBaseUrl} from './../utils/constants';
import StarIcon from '@mui/icons-material/Star';

export const ResturantCard = ({resData}) => {
    const {cloudinaryImageId,name,cuisines,avgRating,costForTwo,deliveryTime} = resData?.data;
    return(
      <div className="resturant-card">
        <img src={`${resturantCdnBaseUrl}${cloudinaryImageId}`} alt={'burger'}/>
        <div className="card-name-container">
          <h3>{name}</h3>
          <h4>{cuisines.join(', ')}</h4>
        </div>
        <div className="card-basic-info">
            <div className="avg-rating-container" style={{backgroundColor: avgRating>4 ? '#48c479' : '#db7c38'}}>
            <StarIcon className="ratingStarIcon"/><p>{avgRating}</p>  
            </div>    
            <p>{costForTwo/100} FOR TWO</p>
            <p>{deliveryTime} mins</p>
        </div>
        
      </div>
    )
  }
  