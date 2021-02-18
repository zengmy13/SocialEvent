import React, {useEffect, useState} from 'react';
import {Grid, Item, Statistic, Reveal, Button, Divider} from 'semantic-ui-react';
import user from '../../assets/user.png';
import {following, getiffollowing, unfollowing} from "../../firebase/fromfirebase";
import {useDispatch, useSelector} from "react-redux";
import {setfollowstatus, setunfollowstatus} from "./store/actioncreator";
import {toast} from "react-toastify";

export default function Profileheader(props) {
    const {currentuser, profile} = props;
    const dispatch = useDispatch();
    const [loading, setloading] = useState(false);
    const {followstatus} = useSelector(state => state.profile);
    useEffect(() => {
        setloading(true);
        async function fetchfollowing() {
            try {
                const result = await getiffollowing(profile?.id);
                if (result.exists) {
                    dispatch(setfollowstatus())
                }
            } catch (error) {
                toast.error(error.message)
                setloading(false)
            }
        }

        fetchfollowing().then((item) => {
            setloading(false)
        })
    }, [dispatch, profile?.id, followstatus])

    async function handlefollowing(profile) {
        try {
            setloading(true)
            await following(profile)
            dispatch(setfollowstatus())
            setloading(false)
        } catch (error) {
            toast.error(error.message)
            setloading(false)
        }
    }

    async function handleunfollowing(profile) {
        try {
            setloading(true)
            await unfollowing(profile)
            dispatch(setunfollowstatus())
            setloading(false)
        } catch (error) {
            toast.error(error.message)
            setloading(false)
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
                    currentuser?.uid === profile?.id ? null :
                        <Reveal animated='move' style={{marginTop: "10px"}}>
                            <Reveal.Content visible style={{width: "100%"}}>
                                <Button color='teal' fluid>{followstatus ? "Already follow" : "Not yet follow"}</Button>
                            </Reveal.Content>
                            <Reveal.Content hidden>
                                <Button
                                    loading={loading}
                                    color={followstatus ? "red" : "green"} fluid
                                    onClick={followstatus ? () => handleunfollowing(profile) : () => handlefollowing(profile)}>
                                    {followstatus ? "Cancel follow" : "Go follow"}
                                </Button>
                            </Reveal.Content>
                        </Reveal>
                }
            </Grid.Column>
        </Grid>
    )
}