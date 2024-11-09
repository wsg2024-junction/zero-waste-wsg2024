import firebaseConfig from '@/firebaseConfig';
import { initializeApp } from 'firebase/app';
import {
    addDoc,
    collection,
    doc,
    DocumentData,
    getFirestore,
    onSnapshot,
    orderBy,
    query,
    setDoc,
    Unsubscribe,
    updateDoc,
} from 'firebase/firestore';
import { Area, Batch, BatchPlan, ChatMessage, GlobalState, Product } from '../models';

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
        onNext(Object.fromEntries(snapshot.docs.map((doc) => [doc.id, doc.data() as User]));
    });
}

// Batches

export async function createBatch(number: number, product: Product, planned: BatchPlan) {
    await setDoc(doc(firestore, 'batches', number.toString()), {
        product,
        status: { stage: 'planned', planned },
    } satisfies Omit<Batch, 'number'>);
}
export async function updateBatch(batch: Batch) {
    const data = { ...batch } as DocumentData;
    delete data.number;
    await setDoc(doc(firestore, 'batches', batch.number.toString()), data);
}
export function streamBatches(onNext: (batches: Batch[]) => void): Unsubscribe {
    return onSnapshot(query(collection(firestore, 'batches'), orderBy('number')), (snapshot) => {
        onNext(snapshot.docs.map((doc) => ({ number: parseInt(doc.id), ...doc.data() }) as Batch));
    });
}

// Chat

export async function sendMessage(message: ChatMessage) {
    await addDoc(collection(firestore, 'chat'), message);
}
export function streamMessages(onNext: (messages: ChatMessage[]) => void): Unsubscribe {
    return onSnapshot(query(collection(firestore, 'chat'), orderBy('createdAt')), (snapshot) => {
        onNext(snapshot.docs.map((doc) => doc.data() as ChatMessage));
    });
}
