export interface Batch {
    id: string;
    product: string;
    quantity: number;
    weightKg: number;
    timeLeftD?: number;
    wastedItems?: number;
    overweightKg?: number;
}
