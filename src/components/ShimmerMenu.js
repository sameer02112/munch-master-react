import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

export const ShimmerMenu = () => {
    
  return (
      <div className="container-shimmer-menu">
        <Stack spacing={1}>
            <Skeleton variant="rectangular" width={1000} height={180} /> 
            <Skeleton variant="rectangular" width={1000} height={180} />
            <Skeleton variant="rectangular" width={1000} height={30} />
            <Skeleton variant="rectangular" width={150} height={60} />
            <Skeleton variant="rectangular" width={1000} height={40} />
            <Skeleton variant="rectangular" width={1000} height={40} />
            <Skeleton variant="rectangular" width={1000} height={40} />
            <Skeleton variant="rectangular" width={1000} height={40} />
        </Stack>   
      </div>
    
  )
}

