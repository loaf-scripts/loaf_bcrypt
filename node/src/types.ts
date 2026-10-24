export type PasswordTask = { action: 'hash'; password: string } | { action: 'compare'; password: string; hash: string }
export type WorkerRequest = { id: number } & PasswordTask
export type WorkerResponse = { id: number } & ({ result: string | boolean } | { error: unknown })
