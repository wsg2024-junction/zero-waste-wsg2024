'use client';

import { BatchSelector, PreproductionBatch } from '@/components/preproduction-tablet/batch-selector';
import { BatchSizeForm } from '@/components/preproduction-tablet/batch-size-form';
import { BatchStatusModal, latestSample, round1 } from '@/components/preproduction-tablet/batch-status-modal';
import { useBatches, useGlobalState } from '@/hooks/useModels';
import { setPoints, updateBatch } from '@/lib/firebase';
import { Timestamp } from '@firebase/firestore';
import { useState } from 'react';

export default function PreproductionApp() {
    const globalState = useGlobalState();
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

                            const newSample = {
                                createdAt: Timestamp.now(),
                                createdBy: cUser.id,
                                weights: measurements.map((measurement) => measurement.weight),
                            };

                            const currentScore = globalState.points[latestSample(selectedBatch).createdBy];
                            const addition = scoreForSample(
                                newSample,
                                selectedBatch,
                                currentScore?.streak ?? 0,
                            );
                            setPoints(latestSample(selectedBatch).createdBy, {
                                points: addition + (currentScore?.points ?? 0),
                                streak: addition >= 0 ? (currentScore?.streak ?? 0) + 1 : 0,
                            });
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

function scoreForSample(
    sample: PreproductionBatch['status']['samples'][number],
    batch: PreproductionBatch,
    streak: number,
) {
    const targetWeight = (batch.status.plannedTotalWeight * 1000) / batch.status.plannedProductCount;
    const average = sample.weights.reduce((sum, weight) => sum + weight, 0) / sample.weights.length;

    let score = 0;

    if (average < targetWeight) {
        score = -8 - (2 * average) / targetWeight; // Lose around 10 points for small portions
    } else if (average < targetWeight * 1.02) {
        score = 10 - (average - targetWeight) / (0.002 * targetWeight); // Give 10 up to 10 Points depending on how accurate it is
    } else {
        score = -10 + 10 / (25 * (targetWeight / average) - 24); // Deduct for to large portions
    }

    return round1(score * (1 + Math.min(streak, 10) / 10));
}
