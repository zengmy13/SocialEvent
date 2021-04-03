import React, {useEffect, useState} from 'react';
import {Grid, Item, Statistic, Reveal, Button, Divider} from 'semantic-ui-react';
import user from '../../assets/user.png';
import {following, getiffollowing, unfollowing} from "../../firebase/fromfirebase";
import {useDispatch, useSelector} from "react-redux";
import {setFollowStatus, setUnfollowStatus} from "./store/actioncreator";
import {toast} from "react-toastify";
import {RESET_STATUS} from "./store/actiontype";

export default function ProfileHeader(props) {
    const {currentUser, profile,id} = props;
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const {followStatus} = useSelector(state => state.profile);

    useEffect(() => {

        setLoading(true);
        async function fetchFollowing() {
            try {

                const result = await getiffollowing(id);
                if (result && result.exists) {
                    dispatch(setFollowStatus())
                }
            } catch (error) {
                toast.error(error.message)
                setLoading(false)
            }
        }
        fetchFollowing().then((item) => {
            setLoading(false)
        })
        return ()=>{
            dispatch({
                type:RESET_STATUS
            })
        }
    }, [profile?.id,dispatch])

    async function handleFollowing(profile) {
        try {
            setLoading(true)
            await following(profile)
            dispatch(setFollowStatus())
            setLoading(false)
        } catch (error) {
            toast.error(error.message)
            setLoading(false)
        }
    }

    async function handleUnfollowing(profile) {
        try {
            setLoading(true)
            await unfollowing(profile)
            dispatch(setUnfollowStatus())
            setLoading(false)
        } catch (error) {
            toast.error(error.message)
            setLoading(false)
        }
    }

    return (
        <Grid stackable>
            <Grid.Column width={10}>
                <Item.Group>
                    <Item>
                        <Item.Image src={profile?.photoURL || user} size='small' avatar></Item.Image>
                        <Item.Content verticalAlign='middle'>{profile?.displayName}</Item.Content>
                    </Item>
                </Item.Group>
            </Grid.Column>
            <Grid.Column width={6} verticalAlign='middle'>
                <Statistic.Group>
                    <Statistic>
                        <Statistic.Value>{profile?.followingcount || 0}</Statistic.Value>
                        <Statistic.Label>followings</Statistic.Label>
                    </Statistic>
                    <Statistic>
                        <Statistic.Value>{profile?.followercount || 0}</Statistic.Value>
                        <Statistic.Label>followers</Statistic.Label>
                    </Statistic>
                </Statistic.Group>
                <Divider/>
                {
                    currentUser?.uid === profile?.id ? null :
                        <Reveal animated='move' style={{marginTop: "10px"}}>
                            <Reveal.Content visible style={{width: "100%"}}>
                                <Button color='teal' fluid>{followStatus ? "Already follow" : "Not yet follow"}</Button>
                            </Reveal.Content>
                            <Reveal.Content hidden>
                                <Button
                                    loading={loading}
                                    color={followStatus ? "red" : "green"} fluid
                                    onClick={followStatus ? () => handleUnfollowing(profile) : () => handleFollowing(profile)}>
                                    {followStatus ? "Cancel follow" : "Go follow"}
                                </Button>
                            </Reveal.Content>
                        </Reveal>
                }
            </Grid.Column>
        </Grid>
    )
}