const functions = require('firebase-functions')
const admin = require('firebase-admin')

admin.initializeApp()

exports.claimRoles = functions.https.onCall(async (_, context) => {
  const { uid } = context.auth || {}

  if (uid === undefined) {
    throw new functions.https.HttpsError('unauthenticated', `Authentication must be beformed in advance...! :'{`)
  }

  const rolesData = await admin
    .firestore()
    .collection('roles')
    .doc(uid)
    .get()
    .then(snapshot => snapshot.data())

  const { roles, isActive } = rolesData || {}

  if (roles === undefined) {
    throw new functions.https.HttpsError('permission-denied', `The user has no role...! :')`)
  }

  if (isActive !== true) {
    throw new functions.https.HttpsError('permission-denied', `The user is not activated...! :')`)
  }

  await admin.auth().setCustomUserClaims(uid, { roles })

  return { roles }
})
