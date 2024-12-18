import React from "react";
import { fetchAllData } from "../utils/handleData/handleFetchData";
import { handleNotifications } from "../utils/handleNotifications";

export const AppContext = React.createContext();

const AppProvider = ({children}) => {

    //LOADING, ERROR
    const [loading, setLoading] = React.useState(null);

    //Login Auth
    const [auth, setAuth] = React.useState(false);
    const [admin, setAdmin] = React.useState(false);
    const [user, setUser] = React.useState("");


    // RESPONSE:
    const [responseData, setResponseData] = React.useState({});

    const fetchData = async (endpoints, setState=setResponseData) => {
        try {
            setLoading(true);
            const data = await fetchAllData(endpoints);
            setState((prevData) => ({ ...prevData, ...data}));
        } 
        catch (err) {
            handleNotifications("error", err.message)
        } 
        finally {
            setLoading(false);
        }
    }

    React.useEffect(() => {
        const endpoints = [
            ``
        ]

        fetchData(endpoints)
    }, []);

    
    // Screen Width
    const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);
    React.useEffect(() => {
        function handleResize() {
          setWindowWidth(window.innerWidth);
        }
    
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
      }, []);

    return (
        <AppContext.Provider
            value={{
                loading,
                setLoading,
                
                auth,
                setAuth,

                user,
                setUser,

                admin,
                setAdmin,


                //Tamaño de la pantalla
                windowWidth,
                setWindowWidth,


                //Informacion desde el serveidor
                responseData,
                setResponseData,
                
                fetchData
            }}
        >
            {children}
        </AppContext.Provider>
    )
}

export { AppProvider }