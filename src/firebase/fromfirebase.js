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

export function getFileExtension(filename) {
    let dot = filename.indexOf(".")
    return filename.slice(dot + 1)
}

export function makeDataTree(dataset){
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

export function dealWithData(item) {
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

export function getEventsFromFirestore(filter,startdate,limit,lastget) {
    const user = firebase.auth().currentuser;
    let eventsRef=db.collection("events").orderBy("date")
    switch (filter) {
        case "going":
            return eventsRef.where("attendeesId", "array-contains", user?.uid)
                .where("date", ">=", startdate).startAfter(lastget).limit(limit);;
        case "hosting":
            return eventsRef.where("hostUid", "==", user?.uid)
                .where("date", ">=", startdate).startAfter(lastget).limit(limit);;
    }
    return eventsRef.where("date", ">=", startdate).startAfter(lastget).limit(limit);
}

export function getSpecificEventFromFirestore(id) {
    return db.collection("events").doc(id);
}

export function addNewEventToFirestore(event) {
    const user = firebase.auth().currentuser;
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

export function updateSelectedEvent(event) {
    return db.collection("events").doc(event.id).update(event)
}

export function selectEvent(eventid) {
    return db.collection("events").doc(eventid);
}

export function signInWithEmailAndPassword(values) {
    return firebase.auth().signInWithEmailAndPassword(values.email, values.password)
}

export function signout() {
    return firebase.auth().signout();
}

export async function createNewUserInFirebase(values) {
    try {
        const result = await firebase.auth().createUserWithEmailAndPassword(values.email, values.password);
        await result.user.updateProfile({
            displayName: values.displayName
        })
        return await setNewUser(result.user)
    } catch (error) {
        throw error;
    }
}

export async function loginWithProviders(userprovider) {
    let provider;
    if (userprovider === "facebook") {
        provider = new firebase.auth.FacebookAuthProvider();
    } else if (userprovider === "google") {
        provider = new firebase.auth.GoogleAuthProvider();
    }
    try {
        const result = await firebase.auth().signInWithPopup(provider);
        if (result.additionalUserInfo.isNewUser) {
            await setNewUser(result.user)
        }
    } catch (error) {
        throw error;
    }
}

export function setNewUser(user) {
    return db.collection("users").doc(user.uid).set({
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL || null,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
    })
}

export function changePassWord(password) {
    const user = firebase.auth().currentuser;
    return user.updatePassword(password)
}

export function joinEvent(event) {
    const user = firebase.auth().currentuser;
    return db.collection("events").doc(event.id).update({
        attendeesId: firebase.firestore.FieldValue.arrayUnion(user.uid),
        attendees: firebase.firestore.FieldValue.arrayUnion({
            name: user.displayName,
            photoURL: user.photoURL,
            id: user.uid
        })
    })
}

export function cancelPlace(event) {
    const user = firebase.auth().currentuser;
    return db.collection("events").doc(event.id).update({
        attendeesId: firebase.firestore.FieldValue.arrayRemove(user.uid),
        attendees: firebase.firestore.FieldValue.arrayRemove({
            name: user.displayName,
            photoURL: user.photoURL,
            id: user.uid
        })
    })
}

export function deleteEventFromFirestore(event) {
    return db.collection("events").doc(event.id).update({
        isCancel: !event.isCancel
    })
}

export function addCommentToFirebase(eventid, values, parentId) {
    const user = firebase.auth().currentuser;
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

export function getEventComment(eventid) {
    return firebase.database().ref(`/chat/${eventid}`).orderByKey()
}

export async function updateUserInfo(info) {
    const user = firebase.auth().currentuser;
    const allEvents = db.collection("events")
        .where("attendeesId", "array-contains", user.uid)
    const followings = db.collection("follow")
        .doc(user.uid).collection("following")
    const batch=db.batch();
    try{
        await batch.update(db.collection("users").doc(user.uid),{
            displayName: info.displayName,
            description: info.description
        })
        const result = await allEvents.get();
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
        const followResult = await followings.get();
        followResult.docs.forEach((item) => {
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

export function addPhotoToStorage(filename, file) {
    const user = firebase.auth().currentuser;
    const storage = firebase.storage().ref();
    return storage.child(`${user.uid}/images/${filename}`).put(file)
}

export async function updateProfilePhoto(url, filename) {
    const user = firebase.auth().currentuser;
    const ref = db.collection("users").doc(user.uid)
    try {
        const userInfo = await ref.get();
        if (!userInfo.data().photoURL) {
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

export function getPhotosFromStorage(id) {
    return db.collection("users").doc(id).collection("photos")
}

export function deletePhoto(photoid) {
    const user = firebase.auth().currentuser;
    return db.collection("users").doc(user.uid).collection("photos").doc(photoid).delete()
}

export function deletePhotoInStorage(filename) {
    const ref = firebase.storage().ref();
    const user = firebase.auth().currentuser;
    return ref.child(`${user.uid}/images/${filename}`).delete()
}

export function getUserEventsTab(key,profile) {
    const user = firebase.auth().currentuser;
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

export function getProfile(profileid) {
    return db.collection("users").doc(profileid);
}

export async function following(profile) {
    const user = firebase.auth().currentuser;
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

export async function unFollow(profile) {
    const user = firebase.auth().currentuser;
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

export function isFollowing(profileid) {
    const user = firebase.auth().currentuser
    return db.collection("follow")
        .doc(user.uid).collection("following")
        .doc(profileid).get()
}

export function getFollowersProfile(profileid) {
    return db.collection("follow")
        .doc(profileid).collection("follower");
}

export function getFollowingProfile(profileid) {
    return db.collection("follow")
        .doc(profileid).collection("following");
}

export function getFeedsFromDatabase() {
    const user = firebase.auth().currentuser;
    return firebase.database().ref(`posts/${user?.uid}`)
        .orderByKey()
        .limitToLast(5);
}

export async function setMainPhoto(photo) {
    const user = firebase.auth().currentuser;
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
        const followResult = await followings.get();
        followResult.docs.forEach((item) => {
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