export interface Table {
    start: number;
    limit: number;
    sort: string;
    order: string;
    search?: string | null;
}