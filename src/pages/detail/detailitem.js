import React from 'react';
import DetailItemInfo from "./detailinfo";
import DetailChat from "./detailchat";
import DetailHeader from "./detailheader";



export default function DetailItem(props) {
    const {selectedEvent} = props;
    return (
        <>
            <DetailHeader selectedEvent={selectedEvent}/>
            <DetailItemInfo selectedEvent={selectedEvent}/>
            {selectedEvent?.isCancel?
                null
                : <DetailChat selectedEventId={selectedEvent.id}/>}

        </>
    )
}