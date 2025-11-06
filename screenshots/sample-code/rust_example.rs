// Karasu Theme - Rust Syntax Highlighting Example
//
// Demonstrates:
// - Keywords (purple): fn, struct, enum, impl, trait, match, if, let
// - Functions (blue): function definitions and method calls
// - Strings (green): string literals, string slices
// - Numbers (yellow): numeric literals with type suffixes
// - Types (aqua): structs, enums, traits, generics
// - Operators (orange): arithmetic, logical, pattern matching
// - Comments (dim): documentation and inline comments

use std::collections::HashMap;
use std::fmt::Display;

/// Status enum demonstrating type highlighting
#[derive(Debug, Clone, Copy, PartialEq, Eq)]
enum Status {
    Pending,
    Active,
    Completed,
    Archived,
}

/// User struct with type annotations
#[derive(Debug, Clone)]
struct User {
    id: u64,
    name: String,
    email: Option<String>,
    tags: Vec<String>,
    metadata: HashMap<String, String>,
}

/// Trait definition (aqua)
trait Repository<T> {
    fn find_by_id(&self, id: u64) -> Option<&T>;
    fn find_all(&self) -> Vec<&T>;
    fn save(&mut self, entity: T) -> Result<(), String>;
    fn delete(&mut self, id: u64) -> bool;
}

/// Implementation block
impl User {
    /// Associated function (constructor)
    fn new(id: u64, name: String) -> Self {
        Self {
            id,
            name,
            email: None,
            tags: Vec::new(),
            metadata: HashMap::new(),
        }
    }

    /// Method with self reference
    fn add_tag(&mut self, tag: String) {
        self.tags.push(tag);
    }

    /// Method returning owned value
    fn get_display_name(&self) -> String {
        match &self.email {
            Some(email) => format!("{} <{}>", self.name, email),
            None => self.name.clone(),
        }
    }
}

/// Generic implementation
impl<T: Display> Repository<T> for Vec<T> {
    fn find_by_id(&self, id: u64) -> Option<&T> {
        self.get(id as usize)
    }

    fn find_all(&self) -> Vec<&T> {
        self.iter().collect()
    }

    fn save(&mut self, entity: T) -> Result<(), String> {
        self.push(entity);
        Ok(())
    }

    fn delete(&mut self, id: u64) -> bool {
        if id < self.len() as u64 {
            self.remove(id as usize);
            true
        } else {
            false
        }
    }
}

/// Function with generics and lifetime parameters
fn calculate_total<T>(items: &[T]) -> f64
where
    T: HasPrice,
{
    items.iter().map(|item| item.get_price()).sum()
}

/// Trait for items with price
trait HasPrice {
    fn get_price(&self) -> f64;
}

/// Struct implementing trait
struct Item {
    price: f64,
    quantity: u32,
}

impl HasPrice for Item {
    fn get_price(&self) -> f64 {
        self.price * self.quantity as f64
    }
}

/// Async function example
async fn fetch_user_data(user_id: u64) -> Result<User, String> {
    // Simulate async operation
    tokio::time::sleep(tokio::time::Duration::from_millis(100)).await;

    if user_id == 0 {
        return Err("Invalid user ID".to_string());
    }

    Ok(User::new(
        user_id,
        format!("user_{}", user_id),
    ))
}

/// Pattern matching example
fn process_status(status: Status) -> &'static str {
    match status {
        Status::Pending => "Waiting",
        Status::Active => "In progress",
        Status::Completed => "Done",
        Status::Archived => "Archived",
    }
}

/// Main function
fn main() {
    // String examples (green)
    let message = "Hello, Karasu Theme!";
    let owned = String::from("Owned string");
    let string_slice: &str = "String slice";
    let formatted = format!("Processing {} items", 42);
    let raw_string = r#"Raw string with "quotes""#;

    // Number examples (yellow)
    let integer: i32 = 42;
    let unsigned: u64 = 100;
    let float: f64 = 3.14159;
    let hex: i32 = 0xFF00FF;
    let binary: i32 = 0b101010;
    let scientific: f64 = 1.5e-10;
    let byte: u8 = b'A';

    // Boolean examples (yellow)
    let is_active = true;
    let is_complete = false;
    let option: Option<String> = Some("value".to_string());
    let none: Option<String> = None;

    // Vector and HashMap examples
    let items = vec![
        Item { price: 10.99, quantity: 2 },
        Item { price: 5.50, quantity: 3 },
        Item { price: 20.00, quantity: 1 },
    ];

    let mut users: HashMap<u64, User> = HashMap::new();
    users.insert(1, User::new(1, "Alice".to_string()));
    users.insert(2, User::new(2, "Bob".to_string()));

    // Operator examples (orange)
    let result = (10 + 5) * 2 - 3 / 1.5;
    let comparison = result > 20.0 && result < 50.0;
    let logical = true || false && !false;
    let range = 0..10;
    let inclusive_range = 0..=10;

    // Function calls (blue)
    let total = calculate_total(&items);
    let status = process_status(Status::Active);

    // Pattern matching
    match users.get(&1) {
        Some(user) => println!("Found user: {}", user.name),
        None => println!("User not found"),
    }

    // Iterator example
    let doubled: Vec<i32> = (1..=5).map(|x| x * 2).collect();
    let filtered: Vec<&Item> = items.iter().filter(|item| item.price > 10.0).collect();

    println!("Total: {}", total);
    println!("Status: {}", status);
    println!("Doubled: {:?}", doubled);
}
