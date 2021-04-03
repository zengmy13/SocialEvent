import React, {useEffect, useState} from 'react';
import {Segment, Comment} from 'semantic-ui-react';
import userPic from '../../assets/user.png'
import ChartForm from "./chatform";
import {useDispatch, useSelector} from "react-redux"
import {geteventcomment, makedatatree, toarray} from "../../firebase/fromfirebase";
import {clearComment, getNewComment} from "./store/actioncreators";
import {formatDistanceToNow} from 'date-fns';
import {Link} from 'react-router-dom';

export default function DetailChat(props) {

    const {selectedEventId} = props;
    const dispatch = useDispatch();
    const {comment} = useSelector(state => state.detail);
    const {currentUser} = useSelector(state => state.login);
    const [textareaOpen, settextareaOpen] = useState({
        open: false,
        commentId: null
    });
    const handleCloseReplyForm = () => {
        settextareaOpen({
            open: false,
            commentId: null
        })
    }
    useEffect(() => {
        geteventcomment(selectedEventId).on("value", snapshot => {
                if (!snapshot.exists()) {
                    return;
                } else {
                    dispatch(getNewComment((toarray(snapshot.val()))))
                }
            }
        )
        return () => dispatch(clearComment())
    }, [selectedEventId, dispatch])

    return (
        <Segment.Group>
            <Segment color='teal' textAlign='center'
                     inverted>{currentUser ? "Chat about event" : "Sign in to view and comment"}</Segment>
            {currentUser && <Segment>
                <ChartForm id={selectedEventId} parentId={0}/>
                <Comment.Group>
                    {
                        comment && makedatatree(comment).map((comment, index) => {
                            return <Comment key={comment.id}>
                                <Comment.Avatar as={Link} to={`/profile/${comment.commenterId}`}
                                                src={comment.photoURL || userPic} size='small'/>
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
                                            settextareaOpen({
                                                open: true,
                                                commentId: comment.id
                                            })
                                        }}>
                                            Reply
                                        </Comment.Action>
                                        {
                                            textareaOpen.open &&
                                            textareaOpen.commentid === comment.id
                                                ? <ChartForm closeform={handleCloseReplyForm}
                                                             parentId={comment.id}
                                                             id={selectedEventId}/>
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
                                                            settextareaOpen({
                                                                open: true,
                                                                commentId: child.id
                                                            })
                                                        }}>Reply</Comment.Action>
                                                        {
                                                            textareaOpen.open &&
                                                            textareaOpen.commentId === child.id
                                                                ? <ChartForm closeform={handleCloseReplyForm}
                                                                             parentId={child.id}
                                                                             id={selectedEventId}/>
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