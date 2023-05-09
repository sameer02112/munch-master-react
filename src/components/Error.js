import { useRouteError } from "react-router"

export const Error = () => {
    const err = useRouteError();
    console.log(err)
    return(
        <div>
            <h3>Error Occured</h3>
            {err.status} : Page {err.statusText}
        </div>
    )
}