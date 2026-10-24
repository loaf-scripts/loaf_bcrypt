# loaf_bcrypt

Hash and verify passwords with bcrypt on a worker thread, without causing server hitches.

## Installation

1. Download [loaf_bcrypt.zip](https://github.com/loaf-scripts/loaf_bcrypt/releases/latest/download/loaf_bcrypt.zip)
2. Extract loaf_bcrypt.zip into your resources folder
3. Add `add_unsafe_worker_permission loaf_bcrypt` to your server.cfg, before the section where you start your scripts
4. Add `start loaf_bcrypt` to your server.cfg. The script **must** start after the permission

## Usage

### Lua

Add `server_script "@loaf_bcrypt/import.lua"` to your `fxmanifest.lua`. This monkey patches `GetPasswordHash` and `VerifyPasswordHash`, so you don't need to edit your existing code. Note that this is not needed for lb-phone or lb-tablet, as they use the exports automatically if the script is started.

### Exports

- `exports.loaf_bcrypt:GetPasswordHash(password: string): string`
- `exports.loaf_bcrypt:VerifyPasswordHash(password: string, hash: string): boolean`
