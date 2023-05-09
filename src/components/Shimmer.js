import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

export const Shimmer = () => {
    
    let tempArr = new Array(12).fill(1);
    return(
       <div className="container-shimmer">
        <div className = "search-shimmer">
         <Stack spacing={1}>
            <Skeleton variant="rectangular" height={60} animation="pulse"/>
            <Skeleton variant="rectangular" height={40} animation="wave"/>
          </Stack>
        </div>
        <div className="resturant-container">
                {tempArr.map((ele,index)=>{
                return(
                    <ShimmerCard key={index} />
                )
            })}
            </div>
       </div>
    )
}

const ShimmerCard = () => {
    return(     
        <div className="resturant-card-shimmer">
             <Stack spacing={1}>
                <Skeleton variant="rectangular" width={300} height={200} /> 
                <Skeleton variant="rectangular" width={210} height={60} />
                <Skeleton variant="rectangular" width={210} height={30} />
                <Skeleton variant="rectangular" width={280} height={60} />
             </Stack>
        </div>      
    )
}