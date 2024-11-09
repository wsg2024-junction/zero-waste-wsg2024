import { Timestamp } from '@firebase/firestore';

export type Area = 'preproduction' | 'cooking' | 'storage' | 'packaging';
export type GlobalState = {
    dashboardMessages: Record<Area, string>;

    /** Mapping from user ID to number of collected points. */
    points: Record<string, number>;
};

export type PackagingDelay = {
    createdAt: Timestamp;
    estimatedDurationMinutes: number;
};

export type Product = 'hope' | 'faith';
export type Batch = {
    number: number;
    product: Product;
    status:
        | {
              stage: 'planned';
              planned: BatchPlan;
          }
        | {
              stage: 'preproduction';
              planResult: PlanResult;
              preproduction: { products: PreproductionProduct[] };
          }
        | {
              stage: 'cooking';
              planResult: PlanResult;
              preproductionResult: PreproductionResult;
          }
        | {
              stage: 'storage';
              planResult: PlanResult;
              preproductionResult: PreproductionResult;
              cookingResult: CookingResult;
          }
        | {
              stage: 'packaging';
              planResult: PlanResult;
              preproductionResult: PreproductionResult;
              cookingResult: CookingResult;
              storageResult: StorageResult;
              packaging: { packageWeights: number[] };
          }
        | {
              stage: 'done';
              planResult: PlanResult;
              preproductionResult: PreproductionResult;
              cookingResult: CookingResult;
              storageResult: StorageResult;
              packagingResult: PackagingResult;
          };
};
export type StageStart = { startedAt: Timestamp };
export type BatchPlan = { productCount: number; weight: number };
export type PlanResult = StageStart & BatchPlan;
export type PreproductionResult = StageStart & { products: PreproductionProduct[]; totalWeight: number };
export type CookingResult = StageStart & { totalWeight: number; involvedPeopleIds: string[] };
export type StorageResult = StageStart & { totalWeight: number; involvedPeopleIds: string[] };
export type PackagingResult = StageStart & { packageWeights: number[] };

export type PreproductionProduct = {
    createdAt: Timestamp;
    createdBy: string;
    weight: number;
};

export type ChatMessage = {
    createdAt: Timestamp;
    createdBy: string;
    area: Area;
    message: string;
};
