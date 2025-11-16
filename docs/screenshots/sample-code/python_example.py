"""
Karasu Theme - Python Syntax Highlighting Example

This file demonstrates all major syntax highlighting features:
- Keywords (purple): if, for, while, return, import, class, def
- Functions (blue): function definitions and calls
- Strings (green): string literals
- Numbers (yellow): numeric constants
- Types (aqua): type hints, classes
- Operators (orange): arithmetic, logical operators
- Comments (dim): documentation and inline comments
"""

from typing import Optional, List, Dict, Union
from dataclasses import dataclass
from enum import Enum


class Status(Enum):
    """Enum example showing type highlighting"""
    PENDING = "pending"
    ACTIVE = "active"
    COMPLETED = "completed"


@dataclass
class User:
    """Data class demonstrating type annotations"""
    name: str
    age: int
    email: Optional[str] = None
    tags: List[str] = None
    
    def __post_init__(self):
        if self.tags is None:
            self.tags = []


def calculate_total(items: List[Dict[str, Union[int, float]]]) -> float:
    """
    Function demonstrating:
    - Type hints (aqua)
    - Function name (blue)
    - Parameters (orange)
    - Return type (aqua)
    """
    total = 0.0
    
    for item in items:
        price = item.get("price", 0)
        quantity = item.get("quantity", 1)
        total += price * quantity
    
    return total


def process_data(data: str, multiplier: int = 2) -> List[int]:
    """Process string data and return list of integers"""
    if not data:
        return []
    
    result = []
    numbers = data.split(",")
    
    for num_str in numbers:
        try:
            num = int(num_str.strip())
            result.append(num * multiplier)
        except ValueError:
            continue
    
    return result


async def fetch_user_data(user_id: int) -> Optional[User]:
    """Async function example"""
    import asyncio
    
    # Simulate API call
    await asyncio.sleep(0.1)
    
    if user_id <= 0:
        return None
    
    return User(
        name=f"user_{user_id}",
        age=25,
        email=f"user{user_id}@example.com"
    )


# Main execution
if __name__ == "__main__":
    # String examples (green)
    message = "Hello, Karasu Theme!"
    template = f"Processing {len([1, 2, 3])} items"
    raw_string = r"C:\Users\path\to\file"
    multi_line = """This is a
    multi-line string
    example"""
    
    # Number examples (yellow)
    integer = 42
    float_num = 3.14159
    hex_value = 0xFF00FF
    binary = 0b101010
    scientific = 1.5e-10
    
    # Boolean examples (yellow)
    is_active = True
    is_complete = False
    is_none = None
    
    # List and dict examples
    items = [
        {"price": 10.99, "quantity": 2},
        {"price": 5.50, "quantity": 3},
        {"price": 20.00, "quantity": 1}
    ]
    
    # Operator examples (orange)
    result = (10 + 5) * 2 - 3 / 1.5
    comparison = result > 20 and result < 50
    logical = True or False and not None
    
    # Function calls (blue)
    total = calculate_total(items)
    processed = process_data("1,2,3,4,5", multiplier=3)
    
    print(f"Total: {total}")
    print(f"Processed: {processed}")
