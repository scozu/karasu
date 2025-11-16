-- Karasu Theme - Lua Syntax Highlighting Example
--
-- Demonstrates:
-- - Keywords (purple): function, local, if, then, else, end, for, while, return
-- - Functions (blue): function definitions and calls
-- - Strings (green): string literals
-- - Numbers (yellow): numeric constants
-- - Comments (dim): single-line and multi-line comments
-- - Operators (orange): arithmetic, logical operators
-- - Tables (foreground): table literals and access

--[[
  Multi-line comment example
  Shows how comments are highlighted
]]

-- Module table pattern
local M = {}

-- Type definitions using tables (simulating types)
local Status = {
    PENDING = "pending",
    ACTIVE = "active",
    COMPLETED = "completed"
}

-- User table structure
local User = {}
User.__index = User

-- Constructor function
function User.new(name, age, email)
    local self = setmetatable({}, User)
    self.name = name
    self.age = age
    self.email = email or nil
    self.tags = {}
    self.metadata = {}
    return self
end

-- Method example
function User:add_tag(tag)
    table.insert(self.tags, tag)
end

function User:get_display_name()
    if self.email then
        return string.format("%s <%s>", self.name, self.email)
    else
        return self.name
    end
end

-- Function examples
local function calculate_total(items)
    local total = 0.0
    
    for i, item in ipairs(items) do
        local price = item.price or 0
        local quantity = item.quantity or 1
        total = total + (price * quantity)
    end
    
    return total
end

local function process_data(data, multiplier)
    multiplier = multiplier or 2
    
    if not data or data == "" then
        return {}
    end
    
    local result = {}
    local numbers = {}
    
    for num_str in string.gmatch(data, "[^,]+") do
        local num = tonumber(num_str:match("^%s*(.-)%s*$"))
        if num then
            table.insert(numbers, num * multiplier)
        end
    end
    
    return numbers
end

-- Coroutine example
local function fetch_user_data(user_id)
    coroutine.yield() -- Simulate async operation
    
    if user_id <= 0 then
        return nil
    end
    
    return User.new(
        "user_" .. tostring(user_id),
        25,
        "user" .. tostring(user_id) .. "@example.com"
    )
end

-- Module exports
M.User = User
M.Status = Status
M.calculate_total = calculate_total
M.process_data = process_data
M.fetch_user_data = fetch_user_data

-- String examples (green)
local message = "Hello, Karasu Theme!"
local template = string.format("Processing %d items", #items)
local multi_line = [[This is a
multi-line string
example]]
local escaped = "String with \"quotes\" and 'apostrophes'"

-- Number examples (yellow)
local integer = 42
local float = 3.14159
local hex = 0xFF00FF
local scientific = 1.5e-10
local negative = -100

-- Boolean examples (yellow)
local is_active = true
local is_complete = false
local is_nil = nil

-- Table examples
local items = {
    { price = 10.99, quantity = 2 },
    { price = 5.50, quantity = 3 },
    { price = 20.00, quantity = 1 }
}

local config = {
    host = "localhost",
    port = 8080,
    timeout = 30,
    enabled = true
}

-- Operator examples (orange)
local result = (10 + 5) * 2 - 3 / 1.5
local comparison = result > 20 and result < 50
local logical = true or false and not nil
local concatenation = "Hello" .. " " .. "World"
local length = #items

-- Function calls (blue)
local total = calculate_total(items)
local processed = process_data("1,2,3,4,5", 3)

-- Table access
local user = User.new("Alice", 30, "alice@example.com")
user:add_tag("developer")
user:add_tag("lua")
local display_name = user:get_display_name()

-- Metatable example
local Vector = {}
Vector.__index = Vector

function Vector.new(x, y)
    return setmetatable({x = x, y = y}, Vector)
end

function Vector.__add(a, b)
    return Vector.new(a.x + b.x, a.y + b.y)
end

function Vector.__tostring(self)
    return string.format("Vector(%d, %d)", self.x, self.y)
end

local v1 = Vector.new(1, 2)
local v2 = Vector.new(3, 4)
local v3 = v1 + v2

-- Print examples
print(string.format("Total: %.2f", total))
print(string.format("Processed: %s", table.concat(processed, ", ")))
print("Display name:", display_name)
print("Vector:", tostring(v3))

return M
