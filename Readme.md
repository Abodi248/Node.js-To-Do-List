 Node.js To-Do List

This is a full-stack web application for managing a personal to-do list. It's a simple, responsive, and functional project that demonstrates fundamental CRUD (Create, Read, Update, Delete) operations. This application is an excellent example of building a web service from the ground up using a modern JavaScript stack.

 Features

  * **View To-Do List**: Displays a list of all current tasks.
  * **Add New Task**: Easily add new items to the list.
  * **Edit Tasks**: Update the text of any existing task.
  * **Delete Tasks**: Remove tasks by clicking a checkbox.
  * **Responsive Design**: The user interface is built with Bootstrap and custom CSS to work on various screen sizes.

 Technologies Used

  * **Backend**: Node.js and Express
  * **Frontend**: EJS (Embedded JavaScript) for server-side templating
  * **Database**: PostgreSQL for data storage
  * **Styling**: Custom CSS and Bootstrap

 Getting Started

Follow these steps to set up and run the application on your local machine.

  Prerequisites

Make sure you have the following installed:

  * Node.js
  * npm (Node Package Manager)
  * PostgreSQL

 1\. Database Setup

First, you need to create a database and a table for your to-do items.

1.  Open your PostgreSQL client (like `psql` or `pgAdmin`).
2.  Create a new database named `todolist`:
    ```sql
    CREATE DATABASE todolist;
    ```
3.  Connect to the new database:
    ```sql
    \c todolist;
    ```
4.  Create the `items` table with the following schema:
    ```sql
    CREATE TABLE items (
        id SERIAL PRIMARY KEY,
        item VARCHAR(255) NOT NULL
    );
    ```
5.  (Optional) Insert a few initial tasks to get started:
    ```sql
    INSERT INTO items (item) VALUES ('Buy groceries');
    INSERT INTO items (item) VALUES ('Walk the dog');
    ```

 2\. Project Setup

1.  Clone this repository to your local machine:
    ```bash
    git clone https://github.com/rizky-rahmad/Node.js-To-Do-List.git
    cd Node.js-To-Do-List
    ```
2.  Install the necessary Node.js packages:
    ```bash
    npm install
    ```
    This will install `express`, `body-parser`, and `pg` as specified in the `package.json` file.
3.  Configure the database connection in `index.js`. Update the `user`, `password`, and other credentials to match your PostgreSQL setup.
    ```javascript
    const db = new pg.Client({
        user: "postgres",
        host: "localhost",
        port: 5432,
        database: "todolist",
        password: "your_password_here", // Change this!
    });
    ```

  3\. Running the Application

1.  Start the Express server from your terminal:
    ```bash
    node index.js
    ```
2.  The server will run on port 3000. You can access the application by navigating to `http://localhost:3000` in your web browser.

-----