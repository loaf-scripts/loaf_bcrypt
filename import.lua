local resourceName = "loaf_bcrypt"
local bcrypt = exports[resourceName]

---@param password string
---@return string hash
function GetPasswordHash(password)
    return bcrypt:GetPasswordHash(password)
end

---@param password string
---@param hash string
---@return boolean
function VerifyPasswordHash(password, hash)
    return bcrypt:VerifyPasswordHash(password, hash)
end
