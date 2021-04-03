import React from "react";
import {Loader} from "semantic-ui-react";
import "./style.css";

export default function LoadingPage() {
    return (
        <div className='loadingpage'>
            <Loader active>Loading.....</Loader>
        </div>
    )
}