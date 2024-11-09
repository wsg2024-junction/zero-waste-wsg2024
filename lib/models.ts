import { Timestamp } from '@firebase/firestore';
export enum AreaEnum {
    PREPRODUCTION = 'preproduction',
    COOKING = 'cooking',
    STORAGE = 'storage',
    PACKAGING = 'packaging',
}

export type Area = 'preproduction' | 'cooking' | 'storage' | 'packaging';
export type GlobalState = {
    dashboardMessages: Record<Area, string>;

    /** Mapping from user ID to number of collected points. */
    points: Record<string, number>;
};

export type User = { id: string; name: string; role: Role };
export type Role = 'manager' | 'worker';

export type PackagingDelay = {
    createdAt: Timestamp;
    estimatedDurationMinutes: number;
};

export type Batch = {
    number: number;
    product: string;
    status:
        | {
              stage: 'preproduction';
              plannedTotalWeight: number;
              plannedProductCount: number;
              products: PreproductionProduct[];
          }
        | {
              stage: 'cooking';
              products: PreproductionProduct[];
              productCount: number;
              totalWeight: number;
          }
        | {
              stage: 'storage';
              totalWeight: number;
              daysLeft: number;
          }
        | {
              stage: 'packaging';
              totalWeight: number;
          }
        | {
              stage: 'done';
              packageWeights: number[];
              underweightProducts: number;
              overweightTotalKg: number;
          };
};

export type PreproductionProduct = {
    createdAt: Timestamp;
    createdBy: string;
    weight: number;
};
export type ChatMessageModel = {
    id: string;
    sender: User;
    message: string;
    area?: string;
    createdAt?: Timestamp;
};
