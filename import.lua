local resourceName = "loaf_bcrypt"
local bcrypt = exports[resourceName]

---@param password string
---@return string hash
-- qbx-lint: disable-next-line builtin-overwrite
function GetPasswordHash(password)
    return bcrypt:GetPasswordHash(password) --[[@as string]]
end

---@param password string
---@param hash string
---@return boolean
-- qbx-lint: disable-next-line builtin-overwrite
function VerifyPasswordHash(password, hash)
    return bcrypt:VerifyPasswordHash(password, hash) --[[@as boolean]]
end
