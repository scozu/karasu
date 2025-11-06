/**
 * Karasu Theme - TypeScript Syntax Highlighting Example
 * 
 * Demonstrates:
 * - Keywords (purple): interface, type, class, function, const, let
 * - Functions (blue): function definitions and method calls
 * - Strings (green): template literals, string literals
 * - Numbers (yellow): numeric constants
 * - Types (aqua): interfaces, type aliases, generics
 * - Operators (orange): arithmetic, logical, optional chaining
 * - Comments (dim): JSDoc and inline comments
 */

// Type definitions (aqua)
interface User {
  id: number;
  name: string;
  email?: string;
  tags: string[];
  metadata: Record<string, unknown>;
}

type Status = "pending" | "active" | "completed" | "archived";

type Callback<T> = (value: T) => void;

// Generic interface example
interface Repository<T> {
  findById(id: number): Promise<T | null>;
  findAll(): Promise<T[]>;
  save(entity: T): Promise<T>;
  delete(id: number): Promise<void>;
}

// Enum example
enum UserRole {
  ADMIN = "admin",
  USER = "user",
  GUEST = "guest"
}

// Class example
class UserService implements Repository<User> {
  private users: Map<number, User> = new Map();
  private nextId: number = 1;

  async findById(id: number): Promise<User | null> {
    return this.users.get(id) || null;
  }

  async findAll(): Promise<User[]> {
    return Array.from(this.users.values());
  }

  async save(user: User): Promise<User> {
    const id = user.id || this.nextId++;
    const savedUser = { ...user, id };
    this.users.set(id, savedUser);
    return savedUser;
  }

  async delete(id: number): Promise<void> {
    this.users.delete(id);
  }

  // Method with generics
  async processUsers<T>(
    callback: Callback<User>,
    filter?: (user: User) => boolean
  ): Promise<T[]> {
    const users = await this.findAll();
    const filtered = filter ? users.filter(filter) : users;
    
    return filtered.map(callback) as T[];
  }
}

// Function examples
function calculateTotal(
  items: Array<{ price: number; quantity: number }>
): number {
  return items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
}

const processData = async (
  data: string,
  multiplier: number = 2
): Promise<number[]> => {
  if (!data) {
    return [];
  }

  const numbers = data.split(",").map(s => parseInt(s.trim(), 10));
  return numbers.map(n => n * multiplier).filter(n => !isNaN(n));
};

// Arrow function with generics
const identity = <T>(value: T): T => value;

// Async/await example
async function fetchUserData(userId: number): Promise<User | null> {
  try {
    const response = await fetch(`/api/users/${userId}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data as User;
  } catch (error) {
    console.error("Failed to fetch user:", error);
    return null;
  }
}

// String examples (green)
const message = "Hello, Karasu Theme!";
const template = `Processing ${items.length} items`;
const multiLine = `This is a
multi-line template
literal example`;
const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// Number examples (yellow)
const integer = 42;
const float = 3.14159;
const hex = 0xFF00FF;
const binary = 0b101010;
const scientific = 1.5e-10;
const bigInt = 9007199254740991n;

// Boolean examples (yellow)
const isActive = true;
const isComplete = false;
const isNull = null;
const isUndefined = undefined;

// Array and object examples
const items = [
  { price: 10.99, quantity: 2 },
  { price: 5.50, quantity: 3 },
  { price: 20.00, quantity: 1 }
];

// Operator examples (orange)
const result = (10 + 5) * 2 - 3 / 1.5;
const comparison = result > 20 && result < 50;
const logical = true || false && !null;
const optional = user?.email?.toLowerCase();
const nullish = user?.name ?? "Anonymous";

// Function calls (blue)
const total = calculateTotal(items);
const processed = await processData("1,2,3,4,5", 3);
const user = await fetchUserData(123);

// Destructuring
const { name, email } = user || {};
const [first, second, ...rest] = processed;

// Spread operator
const combined = { ...user, tags: [...(user?.tags || []), "new"] };

console.log(`Total: ${total}`);
console.log(`Processed: [${processed.join(", ")}]`);
