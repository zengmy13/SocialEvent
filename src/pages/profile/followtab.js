import React from 'react';
import {Grid, Header, Tab, Card, Image} from "semantic-ui-react";
import {Usedocshook} from "../../hook/firestorehook";
import user from '../../assets/user.png'
import {getfolloweingprofile, getfollowersprofile} from "../../firebase/fromfirebase";
import {useDispatch, useSelector} from "react-redux";
import {followerProfile, followingProfile} from "./store/actioncreator";
import {Link} from 'react-router-dom';

export default function FollowTab(props) {
    const {activeIndex, profile} = props;
    const dispatch = useDispatch();
    const {followings, followers} = useSelector(state => state.profile)
    Usedocshook({
        query: activeIndex == 3 ? getfolloweingprofile(profile?.id) : getfollowersprofile(profile?.id),
        data: (data) => activeIndex == 3 ? dispatch(followingProfile(data)) : dispatch(followerProfile(data)),
        deps: [dispatch, activeIndex]
    })
    return <Tab.Pane>
        <Grid>
            <Grid.Column width={14}>
                <Header size='small' icon='user' content={activeIndex == 3 ? "Followings" : "Followers"}/>
            </Grid.Column>
            <Grid.Column width={16}>
                <Card.Group itemsPerRow={5} stackable>
                    {
                        activeIndex == 3
                            ? followings.map((item, index) => {
                                return <Card as={Link} to={`/profile/${item.id}`} key={item.id}>
                                    <Image src={item.photoURL || user}
                                           fluid
                                           style={{minHeight: 100, objectFit: "cover"}}/>
                                    <Card.Content textAlign='center' style={{color: "black"}}
                                                  fluid
                                    >
                                        {item.name}
                                    </Card.Content>
                                </Card>
                            })
                            : followers.map((item, index) => {
                                return <Card as={Link} to={`/profile/${item.id}`} key={item.id}>
                                    <Image src={item.photoURL || user}
                                           fluid
                                           style={{minHeight: 100, objectFit: "cover"}}/>
                                    <Card.Content textAlign='center'
                                                  style={{color: "black", fontSize: ".3em"}}
                                    >
                                        {item.name}
                                    </Card.Content>
                                </Card>
                            })
                    }
                </Card.Group>
            </Grid.Column>
        </Grid>
    </Tab.Pane>
}