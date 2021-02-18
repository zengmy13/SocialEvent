import React from 'react';
import Eventlistitem from "./eventlistitem";
import InfiniteScroll from 'react-infinite-scroller';


export default function Eventlist(props) {
    const {events, loadmore, loading,moreevents} = props;
    return (
        events.length!==0 && (
              <InfiniteScroll
                  pageStart={0}
                  loadMore={loadmore}
                  hasMore={!loading && moreevents}
                  initialLoad={false}>
                  {
                      events.map((event, index) => {
                          return <Eventlistitem key={event.id} event={event}/>
                      })
                  }
              </InfiniteScroll>
            ))
}