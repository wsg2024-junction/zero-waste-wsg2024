'use client';

import StatusSelectionPopover from '@/components/manager-status-selection/StatusSelectionPopover';
import ChatPopover from '@/components/chat/chat-popover';
import { Dashboard } from '@/components/dashboard/dashboard';
import { PredictionChart } from '@/components/manager/prediction-chart';
import { ManagerMessagePopover } from '@/components/manager/message-popover';

export default function ManagerApp() {
    return (
        <div className={'flex flex-col'}>
            <Dashboard
                interactive
                className={'mb-8'}
            />
            <PredictionChart />
            <ManagerMessagePopover />
            <StatusSelectionPopover />
            <ChatPopover />
        </div>
    );
}
