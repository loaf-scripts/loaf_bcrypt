# loaf_bcrypt

A FiveM resource for hashing and verifying passwords using bcrypt in a separate worker thread.

## Installation

1. Download the latest release from the [releases page](https://github.com/loaf-scripts/loaf_bcrypt/releases/latest/download/loaf_bcrypt.zip)
2. Add `start loaf_bcrypt` to your server.cfg
3. Add `add_unsafe_worker_permission loaf_bcrypt` to your server.cfg

## Usage

### Exports

- `exports.loaf_bcrypt:GetPasswordHash(password: string): string`
- `exports.loaf_bcrypt:VerifyPasswordHash(password: string, hash: string): boolean`

### Lua

Add `server_script "@loaf_bcrypt/import.lua"` to your `fxmanifest.lua`
