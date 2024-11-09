import { Batch, ChatMessage, GlobalState } from '../lib/models';
import { useEffect, useState } from 'react';

export function useGlobalState(): GlobalState {
    const [globalState, setGlobalState] = useState<GlobalState>({
        dashboardMessages: { preproduction: '', cooking: '', storage: '', packaging: '' },
    });
    useEffect(() => streamGlobalState(setGlobalState), []);
    return globalState;
}
export function useBatches(): Batch[] {
    const [batches, setBatches] = useState<Batch[]>([]);
    useEffect(() => streamBatches(setBatches), []);
    return batches;
}
export function useMessages(): ChatMessage[] {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    useEffect(() => streamMessages(setMessages), []);
    return messages;
}
