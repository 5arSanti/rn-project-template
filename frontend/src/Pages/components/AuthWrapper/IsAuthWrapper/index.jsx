import React from "react";
import { AppContext } from "../../../../Context";
import { NotFoundCard } from "../../NotFoundCard";

const IsAuthWrapper = ({children, notFound=false}) => {
    const context = React.useContext(AppContext);

    const { auth } = context || false;


    if (auth) {
        return (children);
    }

    if (notFound) {
        return <NotFoundCard/>
    }

    return;
}

export { IsAuthWrapper }