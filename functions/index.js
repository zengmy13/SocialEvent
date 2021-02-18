const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);
const db = admin.firestore();

exports.setfollowing = functions.firestore
    .document("follow/{userUid}/following/{profileid}")
    .onCreate(async (snapshot, context) => {
      try {
        const batch = db.batch();
        const user = await db.collection("users")
            .doc(context.params.userUid).get();
        batch.set(db.collection("follow")
            .doc(context.params.profileid)
            .collection("follower")
            .doc(context.params.userUid), {
          name: user.data().displayName,
          id: user.id,
          photoURL: user.data().photoURL,
        });
        batch.update(db.collection("users")
            .doc(context.params.profileid), {
          followercount: admin.firestore.FieldValue.increment(1),
        });
        return await batch.commit();
      } catch (error) {
        return console.log(error);
      }
    });


exports.setunfollowing = functions.firestore
    .document("follow/{userUid}/following/{profileId}")
    .onDelete(async (snapshot, context) => {
      try {
        const batch = db.batch();
        batch.delete(db.collection("follow")
            .doc(context.params.profileId)
            .collection("follower")
            .doc(context.params.userUid));
        batch.update(db.collection("users")
            .doc(context.params.profileId), {
          followercount: admin.firestore.FieldValue.increment(-1),
        });
        return await batch.commit();
      } catch (error) {
        console.log(error);
      }
    });

exports.getfeed = functions.firestore.document("events/{eventid}")
    .onUpdate(async (snapshot, context) => {
      const before = snapshot.before.data();
      const after = snapshot.after.data();
      if (before.attendees.length < after.attendees.length) {
        // eslint-disable-next-line no-unused-vars
        const attendeejoin = after.attendees
        // eslint-disable-next-line max-len
            .filter((item1) => !before.attendees.some((item2) => item2.id == item1.id))[0];
        try {
          const allfollowers = await db.collection("follow")
              .doc(attendeejoin.id)
              .collection("follower").get();
          allfollowers.forEach((item) => {
            admin.database().ref(`/posts/${item.id}`)
                .push(newpost(attendeejoin,
                    "joined", context.params.eventid, before));
          });
        } catch (error) {
          console.log(error);
        }
      }

      if (before.attendees.length > after.attendees.length) {
        // eslint-disable-next-line no-unused-vars
        const attendeeleft = before.attendees
        // eslint-disable-next-line max-len
            .filter((item1) => !after.attendees.some((item2) => item2.id == item1.id))[0];
        try {
          const allfollowers = await db.collection("follow")
              .doc(attendeeleft.id)
              .collection("follower").get();
          allfollowers.forEach((item) => {
            // eslint-disable-next-line max-len
            admin.database().ref(`/posts/${item.id}`).push(newpost(attendeeleft,
                "left", context.params.eventid, before));
          });
        } catch (error) {
          console.log(error);
        }
      }
      return console.log("finish");
    });

// eslint-disable-next-line require-jsdoc
function newpost(user, code, eventid, event) {
  return {
    photoURL: user.photoURL,
    displayName: user.name,
    code,
    userUid: user.id,
    eventid,
    title: event.title,
    time: admin.database.ServerValue.TIMESTAMP,
  };
}
