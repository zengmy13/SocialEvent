import React, {useState} from 'react';
import {Button, Grid, Header, Tab, Card, Image} from "semantic-ui-react";
import Phototab from "./photo";
import {deletePhoto, deletePhotoInStorage, getPhotosFromStorage, setMainPhoto} from "../../firebase/fromfirebase";
import {UseDocsHook} from "../../hook/firestorehook";
import {useDispatch, useSelector} from "react-redux";
import {setphotos} from "./store/actioncreator";
import {toast} from "react-toastify";

export default function Displayphoto(props) {
    const [edit, setedit] = useState(false);
    const {profile,currentuser}=props;
    const dispatch = useDispatch();
    const {photos} = useSelector(state => state.profile);
    const [loading, setloading] = useState({
        loading: false,
        target: null
    })
    const [mainloading, setmainloading] = useState({
        loading: false,
        target: null
    })
    UseDocsHook({
        query: getPhotosFromStorage(profile?.id),
        data: (data) => dispatch(setphotos(data)),
        deps: [dispatch]
    })

    async function handledelete(id, name) {
        try {
            setloading({
                loading: true,
                target: id
            })
            await deletePhoto(id);
            await deletePhotoInStorage(name)
            setloading({
                loading: false,
                target: null
            })
        } catch (error) {
            setloading({
                loading: false,
                target: null
            })
            toast.error(error.message)
        }
    }
   async function handlesetmainphoto(item){
       try{
           setmainloading({
               loading: true,
               target: item?.id
           })
          await setMainPhoto(item)
           setmainloading({
               loading: false,
               target: null
           })

       }catch(error){
           setmainloading({
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
                        currentuser?.uid===profile?.id
                            ? <Button floated='right' basic onClick={() => setedit(!edit)}>{edit ? "Cancel" : "Edit"}</Button>
                            :null
                    }

                </Grid.Column>
                {
                    edit ? <Phototab/> : <Grid.Column width={16}>
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
                                                        onClick={()=>handlesetmainphoto(item)}
                                                ></Button>
                                                <Button content='Delete' color='red'
                                                        name={item.id}
                                                        style={{padding: 4}}
                                                        loading={loading.target == item.id && loading.loading}
                                                        onClick={() => handledelete(item.id,item.name)}></Button>
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