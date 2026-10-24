import bcrypt from 'bcryptjs'
import { parentPort } from 'worker_threads'
import type { WorkerRequest, WorkerResponse } from './types'

parentPort!.on('message', (message: WorkerRequest) => {
    try {
        const { action, id, password } = message

        if (action === 'hash') {
            parentPort!.postMessage({
                id,
                result: bcrypt.hashSync(password, 11)
            } satisfies WorkerResponse)
        } else if (action === 'compare') {
            parentPort!.postMessage({
                id: id,
                result: bcrypt.compareSync(password, message.hash)
            } satisfies WorkerResponse)
        }
    } catch (error) {
        parentPort!.postMessage({ id: message.id, error } satisfies WorkerResponse)
    }
})
