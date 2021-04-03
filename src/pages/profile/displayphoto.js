import React, {useState} from 'react';
import {Button, Grid, Header, Tab, Card, Image} from "semantic-ui-react";
import PhotoTab from "./photo";
import {deletephoto, deletephotoinstorage, getphotosfromstorage, setmainphoto} from "../../firebase/fromfirebase";
import {Usedocshook} from "../../hook/firestorehook";
import {useDispatch, useSelector} from "react-redux";
import {setPhotos} from "./store/actioncreator";
import {toast} from "react-toastify";

export default function DisplayPhoto(props) {
    const [edit, setEdit] = useState(false);
    const {profile,currentUser}=props;
    const dispatch = useDispatch();
    const {photos} = useSelector(state => state.profile);
    const [loading, setLoading] = useState({
        loading: false,
        target: null
    })
    const [mainloading, setMainloading] = useState({
        loading: false,
        target: null
    })
    Usedocshook({
        query: getphotosfromstorage(profile?.id),
        data: (data) => dispatch(setPhotos(data)),
        deps: [dispatch]
    })

    async function handleDelete(id, name) {
        try {
            setLoading({
                loading: true,
                target: id
            })
            await deletephoto(id);
            await deletephotoinstorage(name)
            setLoading({
                loading: false,
                target: null
            })
        } catch (error) {
            setLoading({
                loading: false,
                target: null
            })
            toast.error(error.message)
        }
    }
   async function handleSetMainPhoto(item){
       try{
           setMainloading({
               loading: true,
               target: item?.id
           })
          await setmainphoto(item)
           setMainloading({
               loading: false,
               target: null
           })
           window.location.reload();

       }catch(error){
           setMainloading({
               loading: false,
               target: null
           })
          toast.error(error.message)
       }
    }

    return (
        <Tab.Pane>
            <Grid>
                <Grid.Column width={16} clearing>
                    <Header floated='left' size='small' icon='user' content='Photos'/>
                    {
                        currentUser?.uid===profile?.id
                            ? <Button floated='right' basic onClick={() => setEdit(!edit)}>{edit ? "Cancel" : "Edit"}</Button>
                            :null
                    }

                </Grid.Column>
                {
                    edit ? <PhotoTab/> : <Grid.Column width={16}>
                        <Card.Group itemsPerRow={5} stackable>
                            {
                                photos.map((item, index) => {
                                    return <Card key={item.id}>
                                        <Image src={item.url} wrapped ui={false}/>
                                        <Card.Content extra textAlign='center' style={{padding: 0}}>
                                            <Button.Group widths={2}>
                                                <Button content='Main' color='green'
                                                        style={{padding: 4}}
                                                        name={item.id}
                                                        loading={loading.target == item.id && loading.loading}
                                                        onClick={()=>handleSetMainPhoto(item)}
                                                ></Button>
                                                <Button content='Delete' color='red'
                                                        name={item.id}
                                                        style={{padding: 4}}
                                                        loading={loading.target == item.id && loading.loading}
                                                        onClick={() => handleDelete(item.id,item.name)}></Button>
                                            </Button.Group>
                                        </Card.Content>
                                    </Card>
                                })
                            }
                        </Card.Group>
                    </Grid.Column>
                }
            </Grid>
        </Tab.Pane>
    )
}