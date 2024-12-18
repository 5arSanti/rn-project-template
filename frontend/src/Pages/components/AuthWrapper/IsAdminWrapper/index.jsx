/* eslint-disable react/prop-types */
import React from "react";
import { NotFoundCard } from "../../NotFoundCard";
import { AppContext } from "../../../../Context";

const IsAdminWrapper = ({children, notFound=false}) => {
    const context = React.useContext(AppContext);

    const { auth, admin } = context || false;

    if (!auth) {
        return;
    }
    if (!admin) {
        return;
    }

    if (notFound && !admin) {
        return <NotFoundCard/>
    }

    return (children);
}

export { IsAdminWrapper };