import firebaseConfig from '@/firebaseConfig';
import { initializeApp } from 'firebase/app';
import {
    addDoc,
    collection,
    doc,
    getFirestore,
    onSnapshot,
    orderBy,
    query,
    Unsubscribe,
    updateDoc,
} from 'firebase/firestore';
import { Area, Batch, ChatMessageModel, GlobalState, User } from '../models';
const app = initializeApp(firebaseConfig);

export const firestore = getFirestore(app);

// Global State

const globalStateDoc = doc(firestore, 'globalState', 'globalState');
export async function setDashboardMessage(area: Area, message: string) {
    await updateDoc(globalStateDoc, { [`dashboardMessages.${area}`]: message });
}
export function streamGlobalState(onNext: (globalState: GlobalState) => void): Unsubscribe {
    return onSnapshot(globalStateDoc, (doc) => {
        onNext(doc.data() as GlobalState);
    });
}

// User

export function streamUsers(onNext: (users: Record<string, User>) => void): Unsubscribe {
    return onSnapshot(collection(firestore, 'users'), (snapshot) => {
        onNext(
            Object.fromEntries(snapshot.docs.map((doc) => [doc.id, { id: doc.id, ...doc.data() } as User])),
        );
    });
}

// Batches
export function streamBatches(onNext: (batches: Batch[]) => void): Unsubscribe {
    return onSnapshot(collection(firestore, 'batches'), (snapshot) => {
        onNext(snapshot.docs.map((doc) => ({ number: parseInt(doc.id), ...doc.data() }) as Batch));
    });
}

// Chat

export async function sendMessage(message: Omit<ChatMessageModel, 'id'>) {
    await addDoc(collection(firestore, 'chat'), message);
}
export function streamMessages(onNext: (messages: ChatMessageModel[]) => void): Unsubscribe {
    return onSnapshot(query(collection(firestore, 'chat'), orderBy('createdAt')), (snapshot) => {
        onNext(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as ChatMessageModel));
    });
}
