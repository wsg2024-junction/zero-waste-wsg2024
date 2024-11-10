'use client';

import { BatchSelector, PreproductionBatch } from '@/components/preproduction-tablet/batch-selector';
import { BatchSizeForm } from '@/components/preproduction-tablet/batch-size-form';
import { BatchStatusModal } from '@/components/preproduction-tablet/batch-status-modal';
import { useBatches } from '@/hooks/useModels';
import { updateBatch } from '@/lib/firebase';
import { Timestamp } from '@firebase/firestore';
import { useState } from 'react';

export default function PreproductionApp() {
    const batches = useBatches();
    const preproductionBatches = batches.filter(
        (batch): batch is PreproductionBatch => batch.status.stage === 'preproduction',
    );

    const [selectedBatchNumber, setSelectedBatchNumber] = useState<number>();
    const selectedBatch = preproductionBatches.find((batch) => batch.number === selectedBatchNumber);

    const [showStatus, setShowStatus] = useState(false);

    return (
        <>
            <div className="space-y-4">
                <BatchSelector
                    batches={preproductionBatches}
                    selectedBatch={selectedBatch}
                    onSelected={(batch) => setSelectedBatchNumber(batch.number)}></BatchSelector>
                {selectedBatch !== undefined && (
                    <BatchSizeForm
                        onSubmit={(measurements) => {
                            const cUser = JSON.parse(localStorage.getItem('user') as string);
                            updateBatch({
                                ...selectedBatch,
                                status: {
                                    ...selectedBatch.status,
                                    samples: [
                                        ...(selectedBatch.status.samples ?? []),
                                        {
                                            createdAt: Timestamp.now(),
                                            createdBy: cUser.id,
                                            weights: measurements.map((measurement) => measurement.weight),
                                        },
                                    ],
                                },
                            }).then(() => {
                                setShowStatus(true);
                            });
                        }}></BatchSizeForm>
                )}
            </div>
            {!!selectedBatch && (
                <BatchStatusModal
                    open={showStatus}
                    onOpenChange={setShowStatus}
                    batch={selectedBatch}></BatchStatusModal>
            )}
        </>
    );
}
