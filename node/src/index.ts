import path from 'path'
import { Worker } from 'worker_threads'
import type { PasswordTask, WorkerResponse } from './types'

const resourceName = GetCurrentResourceName()
const queue = new Map<number, { resolve: (result: any) => void; reject: (reason: unknown) => void }>()

let nextId = 0
let worker: Worker | undefined

function onExit(code: number) {
    console.log(`^1Worker exited with code ${code}, falling back to FiveM's password natives.^7`)

    for (const request of queue.values()) {
        request.reject(new Error(`Worker exited with code ${code}`))
    }

    queue.clear()

    worker = undefined
}

try {
    worker = new Worker(path.join(GetResourcePath(resourceName), '/server/worker.js'))
} catch (e) {
    console.log('^1Failed to create worker:', e, '^7')

    setInterval(() => {
        console.log('^1Failed to create worker.^7')
        console.log(
            'Make sure to add ^4add_unsafe_worker_permission loaf_bcrypt^7 to your server.cfg, before loaf_bcrypt is started.'
        )
    }, 5000)
}

worker?.on('message', (message: WorkerResponse) => {
    const request = queue.get(message.id)

    if (!request) return

    queue.delete(message.id)

    if ('error' in message) {
        request.reject(message.error)
    } else {
        request.resolve(message.result)
    }
})

worker?.on('error', (error) => console.error('Worker error:', error))
worker?.on('exit', onExit)

function assertString(value: unknown, name: string): asserts value is string {
    if (typeof value !== 'string') throw new TypeError(`${name} must be a string, got ${typeof value}`)
}

function sendWorkerMessage<T>(activeWorker: Worker, task: PasswordTask): Promise<T> {
    return new Promise((resolve, reject) => {
        const id = nextId++

        queue.set(id, { resolve, reject })

        activeWorker.postMessage({ id, ...task })
    })
}

exports('GetPasswordHash', (password: string) => {
    assertString(password, 'password')

    if (!worker) return GetPasswordHash(password)

    return sendWorkerMessage<string>(worker, { action: 'hash', password })
})

exports('VerifyPasswordHash', (password: string, hash: string) => {
    assertString(password, 'password')
    assertString(hash, 'hash')

    if (!worker) return VerifyPasswordHash(password, hash)

    return sendWorkerMessage<boolean>(worker, { action: 'compare', password, hash })
})

on('onResourceStop', (resource: string) => {
    if (resource !== resourceName) return

    worker?.off('exit', onExit)
    worker?.terminate()
})
