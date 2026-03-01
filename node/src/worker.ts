import bcrypt from 'bcryptjs'
import { parentPort } from 'worker_threads'

function onMessage(
    message: { id: number } & (
        | { action: 'hash'; password: string }
        | { action: 'compare'; password: string; hash: string }
    )
) {
    const { id, action, password } = message

    if (action === 'hash') {
        bcrypt.hash(password, 11).then((result) => {
            parentPort!.postMessage({ id, result })
        })
    } else if (action === 'compare') {
        bcrypt.compare(password, message.hash).then((result) => {
            parentPort!.postMessage({ id, result })
        })
    }
}

parentPort!.on('message', onMessage)
