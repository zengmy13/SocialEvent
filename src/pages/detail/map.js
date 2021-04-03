import React, {Fragment} from 'react';
import GoogleMapReact from "google-map-react";
import {Icon} from "semantic-ui-react";

function Marker() {
    return <Icon name="marker" size="big" color='red'/>
}

export default function Map(props) {
    const {selectedEvent} = props;
    const center = {
        lat: selectedEvent.city.latLng.lat,
        lng: selectedEvent.city.latLng.lng
    }
    return (
        <Fragment>
            <div style={{height: '50vh', width: '100%'}}>
                <GoogleMapReact
                    bootstrapURLKeys={{key: "AIzaSyAunCTN-WYYu1DEZ0mHuSa6ZmOeVVdPnz0"}}
                    defaultCenter={center}
                    defaultZoom={11}>
                    <Marker lat={center.lat} lng={center.lng}></Marker>
                </GoogleMapReact>
            </div>
        </Fragment>
    )
}