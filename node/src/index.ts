import { Worker } from 'worker_threads'
import path from 'path'

const resourcePath = GetResourcePath(GetCurrentResourceName())

const worker = new Worker(path.join(resourcePath, '/server/worker.js'))

const queue = new Map<number, (result: string | boolean) => void>()

worker.on('message', (message: { id: number; result: string | boolean }) => {
    const callback = queue.get(message.id)

    if (callback) {
        callback(message.result)

        queue.delete(message.id)
    }
})

worker.on('error', (error) => {
    console.error('Worker error:', error)
})

exports('GetPasswordHash', (password: string) => {
    return new Promise((resolve) => {
        const id = Math.random()

        queue.set(id, resolve)

        worker.postMessage({
            id,
            action: 'hash',
            password
        })
    })
})

exports('VerifyPasswordHash', (password: string, hash: string) => {
    return new Promise((resolve) => {
        const id = Math.random()

        queue.set(id, resolve)

        worker.postMessage({
            id,
            action: 'compare',
            password,
            hash
        })
    })
})
