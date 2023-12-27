# Grocery Inventory Management Web Application

This repository contains code for an Inventory Management web application developed using Django. The application allows users to manage grocery items by providing functionalities such as user authentication, item management (CRUD operations), and statistical data retrieval.

## File Structure

- **`models.py`**: Contains Django model definitions for managing grocery items.
- **`views.py`**: Defines view functions to handle HTTP requests and implement various functionalities.
- **`templates/`**: Directory containing HTML templates for rendering web pages.
- **`localStoragePy/`**: External library used for local storage management.
- **`README.md`**: Documentation file (you are currently reading it).

## Functionalities

### 1. User Authentication

- **`signup(request)`**
  - Renders the signup page.
- **`login(request)`**
  - Renders the login page.
- **`add_signup(request)`**
  - Handles user signup.
- **`add_login(request)`**
  - Handles user login and authentication.

### 2. Grocery Item Management

- **`add_grocery_item(request)`**
  - Handles CRUD operations for grocery items (Create, Read, Update, Delete).
  - POST: Adds a new item.
  - GET: Retrieves all items.
  - PUT: Updates an existing item.
  - DELETE: Deletes an item.

### 3. Statistical Data Retrieval

- **`item_count(request)`**
  - Retrieves statistical data related to the inventory:
    - Total item count.
    - Total quantity.
    - Total price.

### 4. Custom SQL Execution

- **`custom_sql(query)`**
  - Executes custom SQL queries for specific functionalities.

## Usage

### Setting up the Project

1. Ensure Django is installed.
2. Clone the repository and navigate to the project directory.
3. Run migrations: `python manage.py makemigrations` and `python manage.py migrate`.
4. Start the development server: `python manage.py runserver`.


### Dependencies

- Django
- localStoragePy
