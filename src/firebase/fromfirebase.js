import firebase from '../config/firebase';
import {uid} from "uid";
import "firebase/auth";
import attendees from "../pages/mainpage/events/attendees";

const db = firebase.firestore();

export function toarray(item) {
    return Object.entries(item).map((item, index) => {
        return Object.assign({}, {id: item[0]}, item[1])
    })
}

export function getfileextension(filename) {
    let dot = filename.indexOf(".")
    return filename.slice(dot + 1)
}

export function makedatatree(dataset){
    let hashtable=Object.create(null);
    dataset.forEach(a=>hashtable[a.id]={...a,childNodes:[]});

    let dataTree=[];
    dataset.forEach(a=>{
        if(a.parentId){
            hashtable[a.parentId].childNodes.push(hashtable[a.id])
        }else{
            dataTree.push(hashtable[a.id])
        }
    })

    return dataTree;
}

export function dealwithdata(item) {
    const data = item.data()
    for (const props in data) {
        if (data.hasOwnProperty(props)) {
            if (data[props] instanceof firebase.firestore.Timestamp) {
                data[props] = data[props].toDate()
            }
        }
    }
    return {
        ...data,
        id: item.id
    }
}

export function geteventsfromfirestore(filter,startdate,limit,lastget) {
    const user = firebase.auth().currentUser;
    let eventsref=db.collection("events").orderBy("date")
    switch (filter) {
        case "going":
            return eventsref.where("attendeesId", "array-contains", user?.uid)
                .where("date", ">=", startdate).startAfter(lastget).limit(limit);;
        case "hosting":
            return eventsref.where("hostUid", "==", user?.uid)
                .where("date", ">=", startdate).startAfter(lastget).limit(limit);;
    }
    return eventsref.where("date", ">=", startdate).startAfter(lastget).limit(limit);
}

export function getspecificeventfromfirestore(id) {
    return db.collection("events").doc(id);
}

export function addneweventtofirestore(event) {
    const user = firebase.auth().currentUser;
    return db.collection("events").add({
        ...event,
        id: uid(),
        attendees: firebase.firestore.FieldValue.arrayUnion({
            name: user.displayName,
            photoURL: user.photoURL,
            id: user.uid
        }),
        hostUid: user.uid,
        hostname: user.displayName,
        hostURL: user.photoURL,
        attendeesId: firebase.firestore.FieldValue.arrayUnion(user.uid)
    })
}

export function updateselectedevent(event) {
    return db.collection("events").doc(event.id).update(event)
}

export function selectevent(eventid) {
    return db.collection("events").doc(eventid);
}

export function signinwithemailandpassword(values) {
    return firebase.auth().signInWithEmailAndPassword(values.email, values.password)
}

export function signout() {
    return firebase.auth().signOut();
}

export async function createnewuserinfirebase(values) {
    try {
        const result = await firebase.auth().createUserWithEmailAndPassword(values.email, values.password);
        await result.user.updateProfile({
            displayName: values.displayName
        })
        return await setnewuser(result.user)
    } catch (error) {
        throw error;
    }
}

export async function loginwithproviders(userprovider) {
    let provider;
    if (userprovider === "facebook") {
        provider = new firebase.auth.FacebookAuthProvider();
    } else if (userprovider === "google") {
        provider = new firebase.auth.GoogleAuthProvider();
    }
    try {
        const result = await firebase.auth().signInWithPopup(provider);
        if (result.additionalUserInfo.isNewUser) {
            await setnewuser(result.user)
        }
    } catch (error) {
        throw error;
    }
}

export function setnewuser(user) {
    return db.collection("users").doc(user.uid).set({
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL || null,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
    })
}

export function changepassword(password) {
    const user = firebase.auth().currentUser;
    return user.updatePassword(password)
}

export function jointheevent(event) {
    const user = firebase.auth().currentUser;
    return db.collection("events").doc(event.id).update({
        attendeesId: firebase.firestore.FieldValue.arrayUnion(user.uid),
        attendees: firebase.firestore.FieldValue.arrayUnion({
            name: user.displayName,
            photoURL: user.photoURL,
            id: user.uid
        })
    })
}

export function cancelplace(event) {
    const user = firebase.auth().currentUser;
    return db.collection("events").doc(event.id).update({
        attendeesId: firebase.firestore.FieldValue.arrayRemove(user.uid),
        attendees: firebase.firestore.FieldValue.arrayRemove({
            name: user.displayName,
            photoURL: user.photoURL,
            id: user.uid
        })
    })
}

export function deleteeventfromfirestore(event) {
    return db.collection("events").doc(event.id).update({
        isCancel: !event.isCancel
    })
}

export function addcommenttofirebase(eventid, values, parentId) {
    const user = firebase.auth().currentUser;
    const comment = {
        text: values.comment,
        commenterId: user.uid,
        time: Date.now(),
        displayName: user.displayName,
        photoURL: user.photoURL,
        parentId: parentId
    }
    return firebase.database().ref(`chat/${eventid}`).push(comment)
}

export function geteventcomment(eventid) {
    return firebase.database().ref(`/chat/${eventid}`).orderByKey()
}

export async function updateuserinfo(info) {
    const user = firebase.auth().currentUser;
    const allevents = db.collection("events")
        .where("attendeesId", "array-contains", user.uid)
    const followings = db.collection("follow")
        .doc(user.uid).collection("following")
    const batch=db.batch();
    try{
        await batch.update(db.collection("users").doc(user.uid),{
            displayName: info.displayName,
            description: info.description
        })
        const result = await allevents.get();
        for (let i = 0; i < result.docs.length; i++) {
            if (result.docs[i].data().hostUid === user.uid) {
                batch.update(result.docs[i].ref, {
                    hostname:info.displayName
                })
            }
            batch.update(result.docs[i].ref, {
                attendees: result.docs[i].data().attendees
                    .filter(item => {
                        if (item.id === user.uid) {
                            item.name = info.displayName
                        }
                        return item
                    })
            })
        }
        const followresult = await followings.get();
        followresult.docs.forEach((item) => {
            batch.update(db.collection("follow")
                .doc(item.id)
                .collection("follower")
                .doc(user.uid), {
                name: info.displayName
            })
        })
        await batch.commit();
        return user.updateProfile({
            displayName: info.displayName
        })
    }catch(error){
       throw error;
    }

}

export function addphototostorage(filename, file) {
    const user = firebase.auth().currentUser;
    const storage = firebase.storage().ref();
    return storage.child(`${user.uid}/images/${filename}`).put(file)
}

export async function updateprofilephoto(url, filename) {
    const user = firebase.auth().currentUser;
    const ref = db.collection("users").doc(user.uid)
    try {
        const userinfo = await ref.get();
        if (!userinfo.data().photoURL) {
            await db.collection("users").doc(user.uid).update({
                photoURL: url
            })
            await user.updateProfile({
                photoURL: url
            })
        }
        return await db.collection("users").doc(user.uid).collection("photos").add({
            name: filename,
            url: url
        })
    } catch (error) {
        throw error;
    }
}

export function getphotosfromstorage(id) {
    return db.collection("users").doc(id).collection("photos")
}

export function deletephoto(photoid) {
    const user = firebase.auth().currentUser;
    return db.collection("users").doc(user.uid).collection("photos").doc(photoid).delete()
}

export function deletephotoinstorage(filename) {
    const ref = firebase.storage().ref();
    const user = firebase.auth().currentUser;
    return ref.child(`${user.uid}/images/${filename}`).delete()
}

export function getusereventstab(key,profile) {
    const user = firebase.auth().currentUser;
    switch (key) {
        case 1:
            return db.collection("events")
                .where("attendeesId", "array-contains", profile?.id)
                .where("date", "<=", new Date())
        case 2:
            return db.collection("events")
                .where("attendeesId", "array-contains", profile?.id)
                .where("hostUid", "==", profile?.id)
        default:
            return db.collection("events")
                .where("attendeesId", "array-contains", profile?.id)
                .where("date", ">=", new Date())
    }
}

export function getprofile(profileid) {
    return db.collection("users").doc(profileid);
}

export async function following(profile) {
    const user = firebase.auth().currentUser;
    const batch = db.batch();
    try {
        batch.set(db.collection("follow").doc(user.uid).collection("following")
            .doc(profile?.id), {
            name: profile?.displayName,
            id: profile?.id,
            photoURL: profile?.photoURL || null
        })
        batch.update(db.collection("users").doc(user.uid), {
            followingcount: firebase.firestore.FieldValue.increment(1)
        })
        return await batch.commit();

    } catch (error) {
       throw error;
    }
}

export async function unfollowing(profile) {
    const user = firebase.auth().currentUser;
    const batch = db.batch();
    try {
        batch.delete(db.collection("follow").doc(user.uid).collection("following").doc(profile?.id))
        batch.update(db.collection("users").doc(user.uid), {
            followingcount: firebase.firestore.FieldValue.increment(-1)
        })
        return await batch.commit()
    } catch (error) {
       throw error;
    }
}

export function getiffollowing(profileid) {
    const user = firebase.auth().currentUser
    return db.collection("follow")
        .doc(user.uid).collection("following")
        .doc(profileid).get()
}

export function getfollowersprofile(profileid) {
    return db.collection("follow")
        .doc(profileid).collection("follower");
}

export function getfolloweingprofile(profileid) {
    return db.collection("follow")
        .doc(profileid).collection("following");
}

export function getfeedsfromdatabase() {
    const user = firebase.auth().currentUser;
    return firebase.database().ref(`posts/${user?.uid}`)
        .orderByKey()
        .limitToLast(5);
}

export async function setmainphoto(photo) {
    const user = firebase.auth().currentUser;
    const allevents = db.collection("events")
        .where("attendeesId", "array-contains", user.uid)
    const followings = db.collection("follow")
        .doc(user.uid).collection("following")
    const batch = db.batch();
    batch.update(db.collection("users").doc(user.uid), {
        photoURL: photo?.url
    })
    try {
        const result = await allevents.get();
        for (let i = 0; i < result.docs.length; i++) {
            if (result.docs[i].data().hostUid === user.uid) {
                batch.update(result.docs[i].ref, {
                    hostURL: photo?.url
                })
            }
            batch.update(result.docs[i].ref, {
                attendees: result.docs[i].data().attendees
                    .filter(item => {
                        if (item.id === user.uid) {
                            item.photoURL = photo?.url
                        }
                        return item
                    })
            })
        }
        const followresult = await followings.get();
        followresult.docs.forEach((item) => {
            batch.update(db.collection("follow")
                .doc(item.id)
                .collection("follower")
                .doc(user.uid), {
                photoURL: photo?.url
            })
        })
        await batch.commit();
        return user.updateProfile({
            photoURL: photo?.url
        })
    } catch (error) {
        throw error;
    }






}