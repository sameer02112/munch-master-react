import { useParams } from "react-router";
import { useState, useEffect } from "react";
import SearchIcon from '@mui/icons-material/Search';
import StarIcon from '@mui/icons-material/Star';
import { Divider } from "@mui/material";
import AvTimerIcon from '@mui/icons-material/AvTimer';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import Switch from '@mui/material/Switch';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Checkbox from '@mui/material/Checkbox';
import foodDummy from './../resources/foodDummy.png';
import {ShimmerMenu} from './ShimmerMenu';


export const ResturantMenu = () => {

    const {id} = useParams();
    const [resturantMenu, setResturantMenu] = useState({});
    const [isVegShowActive, setIsVegShowActive] = useState(false);
    
    const resturantInfo = resturantMenu?.menuBasicInfo;

    useEffect(() => {
        getResturantInfo();
    }, [])

    const handleVegToggle = (e) => {
        setIsVegShowActive(!isVegShowActive)
    }

    async function getResturantInfo() {
        const data = await fetch(`https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=17.385044&lng=78.486671&restaurantId=${id}&submitAction=ENTER`);
        const json = await data.json();
        let tempObj = {};
        tempObj['menuBasicInfo'] = json.data.cards[0].card.card.info;
        tempObj['menuOfferInfo'] = json.data.cards[1].card.card.gridElements.infoWithStyle;
        tempObj['menuFoodInfo']  = json.data.cards[2].groupedCard.cardGroupMap.REGULAR.cards;
        setResturantMenu(tempObj);
    }

    return Object.keys(resturantMenu).length === 0 ? <ShimmerMenu/> :
        <div className="res-menu-page-container">
            {/* row-1 */}
           <div className="res-menu-search-container">
               <div className="res-menu-address-tab"> {resturantInfo.areaName} / {resturantInfo.city}</div>
               <div className="res-menu-search-tab"><SearchIcon/></div>
           </div>
            {/* row-2 */}
           <div className="res-menu-title-container">
               <div className="res-menu-title-container-details">
                   <h1><b>{resturantInfo.name}</b></h1>
                   <span>{resturantInfo.cuisines.join(', ')}<br/></span>
                   <span>{resturantInfo.areaName} | {resturantInfo.sla.lastMileTravelString}</span>
               </div>
               <div className="res-menu-rating-container">
                   <div className="res-menu-rating-top">
                    <StarIcon style={{color: resturantInfo.avgRating>=4 ? '#48c479':'#db7c38' , marginTop: '12px'}}/>
                        <p className="res-menu-avg-rating">{resturantInfo.avgRating}</p>
                   </div>
                    <br/>
                    <p className="res-menu-number-of-rating">{resturantInfo.totalRatingsString}</p>
               </div>  
           </div>
            {/* row-3 */}
           <p className="res-menu-delivery-details"> {resturantInfo.feeDetails.message} </p>


            {/* row-4 */}
            <Divider variant="middle" className="card-divider"/>

            {/* row-5 */}
            <div className="res-menu-delivery-time-container">
                <AvTimerIcon/>
                <p>{resturantInfo.sla.deliveryTime} MINS</p>
                <CurrencyRupeeIcon style={{marginLeft: '40px'}}/>
                <p>{resturantInfo.costForTwo/100} FOR TWO</p>
            </div>

            {/* row-6 */}
            <div className="res-menu-offer-card-container">
                {resturantMenu.menuOfferInfo.offers.map((ele,index) => {
                    return (
                        <ResturantOfferBox data = {ele.info} key={index}/>
                    )
                })}
            </div>
            
            {/* row-7 */}
            <div className="res-menu-veg-only-toggle">
                <p>Veg Only</p>
                <Switch checked={isVegShowActive} onChange={handleVegToggle}/>
            </div>

             {/* row-8 */}
             <Divider variant="middle" className="card-divider"/>

             {/* row-9 */}
             <div className="res-menu-container">
                 <ResturantMenuList data = {resturantMenu.menuFoodInfo} isVegShowActive={isVegShowActive}/>
             </div>
        </div>
}

const ResturantOfferBox = (props) => {
    const {header,description,couponCode,logoBottom} = props.data;
    return(
        <div className="res-offer-box">
            <div className="res-offer-box-top">
                {logoBottom && 
                <img className="res-offer-icon" src={`https://res.cloudinary.com/swiggy/image/upload/${logoBottom}`} alt="img"/>}
                 {!logoBottom && 
                <img className="res-offer-icon" src={`https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_28,h_28/Store_Assets/Icons/OfferIconCart`} alt="img"/>}
                <p>{header}</p>
            </div>
            <p><b>{`${description} |  ${couponCode}`} </b></p>
        </div>
    )
}

const ResturantMenuList = ({data,isVegShowActive}) => {
    return(
        <div>
        {data.map((ele,index) => {
            if(index === 0) return null;
            else{
                if(!ele.card.card.title) return <></>
                return(
                    <>
                    {/* outer Accordion */}
                    
                    <Accordion>
                        <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        key = {index}
                        >
                    <Typography>{ele.card.card.title} ({!ele.card.card.hasOwnProperty('categories') ? ele?.card?.card?.itemCards?.length : ele?.card?.card?.categories?.length})</Typography>
                    </AccordionSummary>
                    {!ele.card.card.hasOwnProperty('categories') ? (
                    <> 
                        {ele?.card?.card?.itemCards?.map((e,index) => {
                            return (
                                <ResturentFoodItem data = {e} key={index} isVegShowActive = {isVegShowActive}/>
                            )
                        })}
                    </> 
                    ) : (
                    <AccordionDetails>
                    {ele?.card?.card?.hasOwnProperty('categories')  && ele?.card?.card?.categories?.map((el,ind) => {
                        return (
                            <>
                            {/* inner Accordion */}
                                <Accordion>
                                <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                                key={ind}
                                >
                                    <Typography>{el?.title} ({el?.itemCards?.length})</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        {el?.itemCards.map(e => {
                                            return (
                                               <ResturentFoodItem data = {e} isVegShowActive={isVegShowActive}/>
                                            )
                                        })}
                                    </AccordionDetails>
                                </Accordion>
                            </>
                        )
                    })}
                    </AccordionDetails>  
                    )}
                  </Accordion>
                  </>
                )
            }
        })}
        </div>
    )
}

const ResturentFoodItem = (props) => {

    const [isCustomiseDialogOpen, setIsCustomiseDialogOpen] = useState(false);
    const [customiseFoodObj , setCustomiseFoodObj] = useState({});
    const [cart, setCart] = useState([]);

    const openCustomizingFoodScreen = (addOnOption,name) => {
        let tempObj = Object.assign({},addOnOption[0]);
        tempObj['name'] = name;
        setIsCustomiseDialogOpen(true)
        setCustomiseFoodObj(tempObj)
    }

    const closeCustomiseDialog = () => {
        setIsCustomiseDialogOpen(false)
    }

    const addFoodToCart = (data) => {
        console.log(data)
       let initialCartData = Object.assign([],cart);
       let tempObj = {};
       const foodCheck = initialCartData.filter(ele => ele?.foodData?.id == data?.id);
       console.log('foodCheck',foodCheck)
       if(foodCheck.length==0){
        tempObj['foodData'] = data;
        tempObj['quantity'] = 1;
        initialCartData.push(tempObj)
       }else{
        initialCartData.forEach(ele => {
            if(ele.foodData.id == data.id){
                ele['quantity']+=1;
            }
        })
       }
       
    //    tempObj['foodData'] = {'a':10};
    //    tempObj['quantity'] = 1;
       
       setCart(initialCartData);
    }

    const {name,imageId,price,itemAttribute,description,defaultPrice,isBestseller,ratings,addons,variantsV2} = props?.data?.card?.info;
    const isVegShowActive = props.isVegShowActive;
    const isVeg = itemAttribute?.vegClassifier;
    const avgRating = ratings?.aggregatedRating?.rating;
    const isAddonAvailable = addons && addons[0]?.choices?.length > 0 ? true : false;
    const priceToShow = isNaN(Number(price)/100) ? Number(defaultPrice)/100 : Number(price)/100;
    if(!isVegShowActive || isVeg === 'VEG'){
    return(
        <>
        {console.log(cart)}
        <div className="res-single-menu-item-container">
            <div className="res-single-menu-item-title">
                <div className="bestseller-tag">
                     <FiberManualRecordIcon className="veg-nonveg-icon" fontSize="small" style={{color: isVeg === 'VEG' ? '#0f8a65':'#e43b4f'}}/>
                     {isBestseller && 
                        <div className="bestseller-icon">
                            <StarIcon style={{color: '#ee9c00'}} fontSize="sm"/>
                            <p style={{color: '#ee9c00'}}>Bestseller</p>
                        </div>
                        }
                </div>
                 <p>{name}<span className="rating-text-menu"><StarIcon className="star-icon-menu" style={{color: avgRating>=4 ? '#48c479':'#db7c38'}}/>{avgRating}</span></p>
                 <span className="res-price"><CurrencyRupeeIcon/>{priceToShow}</span>
                 <p>{description}</p>
            </div>
           <div className="res-menu-img-container">
               {/* openCustomizingFoodScreen(addons,name) */}
                 {imageId && 
                    <img className="res-single-menu-img" src={`https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_208,h_208,c_fit/${imageId}`} alt=""/>}
                 {!imageId && 
                    <img className="res-single-menu-img" src={foodDummy} alt=""/>}
                    {/* replace the first statement of ternery op with the above commented code */}
                    <button className="add-to-card-btn" onClick={() => (isAddonAvailable) ? addFoodToCart(props?.data?.card?.info) : addFoodToCart(props?.data?.card?.info)}>ADD<sup>+</sup></button>
                    {(isAddonAvailable) &&
                        <p className="customise-text">Customisable</p>}
           </div>
        </div>
         <Divider variant="middle" className="card-divider"/>
         <Dialog
            open={isCustomiseDialogOpen}
            onClose={closeCustomiseDialog}
            className="customise-dialog-container"
            fullWidth={true}
            >
            <DialogTitle id="alert-dialog-title">
                <Typography style={{fontSize: '20px'}}>Customise "{customiseFoodObj.name}"</Typography>
            </DialogTitle>
            <DialogContent>
            <DialogContentText>
                <Divider variant="middle" className="card-divider" />
                <Typography style={{marginBottom: '20px'}}>* {customiseFoodObj.groupName} <sub>(Optional)</sub></Typography>
                <FormControl>                    
                    {isAddonAvailable && 
                     customiseFoodObj?.choices?.map(ele => {
                        return(
                            <FormControlLabel 
                                control={<Checkbox />} 
                                label={
                                    <div className="customise-radio-card">
                                        <span className="customise-radio-text">{ele?.name}</span> <CurrencyRupeeIcon fontSize="sm"/>{ele?.price/100} 
                                    </div>
                                } />
                        )
                     })}
                    </FormControl>
            </DialogContentText>
            </DialogContent>
            <DialogActions>

            <button onClick={closeCustomiseDialog} className="add-customised-food-btn" > ADD ITEM </button>
            </DialogActions>
        </Dialog>
         </>
    )}
    else return <></>
}