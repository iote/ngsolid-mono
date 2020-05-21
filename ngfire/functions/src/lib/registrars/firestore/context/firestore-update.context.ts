import { FirestoreContext } from './firestore.context';

import { Change } from 'firebase-functions';

export interface FirestoreUpdateContext extends FirestoreContext
{
  change: Change<FirebaseFirestore.DocumentSnapshot>;
}