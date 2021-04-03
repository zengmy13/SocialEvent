import React from 'react';
import EventListItem from "./eventlistitem";
import InfiniteScroll from 'react-infinite-scroller';


export default function EventList(props) {
    const {events, loadMore, loading,moreEvents} = props;
    return (
        events.length!==0 && (
              <InfiniteScroll
                  pageStart={0}
                  loadMore={loadMore}
                  hasMore={!loading && moreEvents}
                  initialLoad={false}>
                  {
                      events.map((event, index) => {
                          return <EventListItem key={event.id} event={event}/>
                      })
                  }
              </InfiniteScroll>
            ))
}