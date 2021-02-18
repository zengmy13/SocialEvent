import React, {useEffect, useState} from 'react';
import {Segment, Comment} from 'semantic-ui-react';
import userpic from '../../assets/user.png'
import Chartform from "./chatform";
import {useDispatch, useSelector} from "react-redux"
import {geteventcomment, makedatatree, toarray} from "../../firebase/fromfirebase";
import {clearcomment, getnewcomment} from "./store/actioncreators";
import {formatDistanceToNow} from 'date-fns';
import {Link} from 'react-router-dom';

export default function Detailchat(props) {

    const {selectedeventid} = props;
    const dispatch = useDispatch();
    const {comment} = useSelector(state => state.detail);
    const {currentuser} = useSelector(state => state.login);
    const [textareaopen, settextareaopen] = useState({
        open: false,
        commentid: null
    });
    const handleclosereplyform = () => {
        settextareaopen({
            open: false,
            commentid: null
        })
    }
    useEffect(() => {
        geteventcomment(selectedeventid).on("value", snapshot => {
                if (!snapshot.exists()) {
                    return;
                } else {
                    dispatch(getnewcomment((toarray(snapshot.val()))))
                }
            }
        )
        return () => dispatch(clearcomment())
    }, [selectedeventid, dispatch])

    return (
        <Segment.Group>
            <Segment color='teal' textAlign='center'
                     inverted>{currentuser ? "Chat about event" : "Sign in to view and comment"}</Segment>
            {currentuser && <Segment>
                <Chartform id={selectedeventid} parentId={0}/>
                <Comment.Group>
                    {
                        comment && makedatatree(comment).map((comment, index) => {
                            return <Comment key={comment.id}>
                                <Comment.Avatar as={Link} to={`/profile/${comment.commenterId}`}
                                                src={comment.photoURL || userpic} size='small'/>
                                <Comment.Content>
                                    <Comment.Author as='a'>
                                        {comment.displayName}
                                    </Comment.Author>
                                    <Comment.Metadata>
                                        <div>{formatDistanceToNow(comment.time)}</div>
                                    </Comment.Metadata>
                                    <Comment.Text>
                                        {
                                            comment.text.split("\n").map((i, index) => {
                                                return <span key={index}>{i}</span>
                                            })
                                        }
                                    </Comment.Text>
                                    <Comment.Actions>
                                        <Comment.Action onClick={() => {
                                            settextareaopen({
                                                open: true,
                                                commentid: comment.id
                                            })
                                        }}>
                                            REPLAY
                                        </Comment.Action>
                                        {
                                            textareaopen.open &&
                                            textareaopen.commentid === comment.id
                                                ? <Chartform closeform={handleclosereplyform}
                                                             parentId={comment.id}
                                                             id={selectedeventid}/>
                                                : null
                                        }
                                    </Comment.Actions>
                                </Comment.Content>

                                {comment.childNodes.length > 0 &&
                                <Comment.Group>
                                    {
                                        comment.childNodes.reverse().map(child => {
                                            return <Comment key={child?.id}>
                                                <Comment.Avatar
                                                    src={child?.photoURL || "assests/user.png"}/>
                                                <Comment.Content>
                                                    <Comment.Author as='a'>{child?.displayName}</Comment.Author>
                                                    <Comment.Metadata>
                                                        <div>{formatDistanceToNow(child?.time)}</div>
                                                    </Comment.Metadata>
                                                    <Comment.Text>
                                                        {
                                                            child?.text.split("\n").map((i, index) => {
                                                                return <span key={index}>{i}</span>
                                                            })
                                                        }
                                                    </Comment.Text>
                                                    <Comment.Actions>
                                                        <Comment.Action onClick={() => {
                                                            settextareaopen({
                                                                open: true,
                                                                commentid: child.id
                                                            })
                                                        }}>Reply</Comment.Action>
                                                        {
                                                            textareaopen.open &&
                                                            textareaopen.commentid === child.id
                                                                ? <Chartform closeform={handleclosereplyform}
                                                                             parentId={child.id}
                                                                             id={selectedeventid}/>
                                                                : null
                                                        }
                                                    </Comment.Actions>
                                                </Comment.Content>
                                            </Comment>
                                        })
                                    }
                                </Comment.Group>
                                }
                            </Comment>
                        })
                    }
                </Comment.Group>
            </Segment>}
        </Segment.Group>
    )
}