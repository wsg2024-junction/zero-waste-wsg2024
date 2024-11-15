'use client';

import { Batch, ChatMessageModel, GlobalState, User } from '@/lib/models';
import { useEffect, useState } from 'react';
import { streamBatches, streamGlobalState, streamMessages, streamUsers } from '@/lib/firebase';

export function useGlobalState(): GlobalState {
    const [globalState, setGlobalState] = useState<GlobalState>({
        dashboardMessages: { preproduction: '', cooking: '', storage: '', packaging: '' },
        status: { preproduction: 'OK', cooking: 'OK', storage: 'OK', packaging: 'OK' },
        points: {},
    });
    useEffect(() => streamGlobalState(setGlobalState), []);
    return globalState;
}
export function useUsers(): Record<string, User> {
    const [users, setUsers] = useState<Record<string, User>>({});
    useEffect(() => streamUsers(setUsers), []);
    return users;
}
export function useBatches(): Batch[] {
    const [batches, setBatches] = useState<Batch[]>([]);
    useEffect(() => streamBatches(setBatches), []);
    return batches;
}
export function useMessages(): ChatMessageModel[] {
    const [messages, setMessages] = useState<ChatMessageModel[]>([]);
    useEffect(() => streamMessages(setMessages), []);
    return messages;
}
