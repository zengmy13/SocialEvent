import React from 'react';
import Detailiteminfo from "./detailinfo";
import Detailchat from "./detailchat";
import Detailheader from "./detailheader";


export default function Detailitem(props) {
    const {selectedevent} = props;
    return (
        <>
            <Detailheader selectedevent={selectedevent}/>
            <Detailiteminfo selectedevent={selectedevent}/>
            {selectedevent?.isCancel?
                null
                : <Detailchat selectedeventid={selectedevent.id}/>}

        </>
    )
}