export interface TaskResult {
    name: string;
    label: string;
    state: string;
    isDepedency: boolean;
    code: number;
    error?: Error;
}