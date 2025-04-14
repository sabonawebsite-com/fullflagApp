from flask import Flask, render_template, request, redirect, url_for
import sqlite3

app = Flask(__name__)

# Initialize the database
def init_db():
    conn = sqlite3.connect('employees.db')
    cursor = conn.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS employees (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            position TEXT NOT NULL
        )
    ''')
    conn.commit()
    conn.close()

# Route for the form
@app.route('/')
def index():
    return render_template('index.html')

# Route to handle form submission
@app.route('/register', methods=['POST'])
def register():
    name = request.form['name']
    position = request.form['employee']

    if name and position:
        conn = sqlite3.connect('employees.db')
        cursor = conn.cursor()
        cursor.execute('INSERT INTO employees (name, position) VALUES (?, ?)', (name, position))
        conn.commit()
        conn.close()
        return redirect('/')
    else:
        return "Error: All fields are required!", 400

# Route to display registrants
@app.route('/registrants')
def registrants():
    conn = sqlite3.connect('employees.db')
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM employees')
    employees = cursor.fetchall()
    conn.close()
    return render_template('registrants.html', employees=employees)

# Route to delete an employee
@app.route('/delete/<int:employee_id>', methods=['POST'])
def delete(employee_id):
    conn = sqlite3.connect('employees.db')
    cursor = conn.cursor()
    cursor.execute('DELETE FROM employees WHERE id = ?', (employee_id,))
    conn.commit()
    conn.close()
    return redirect(url_for('registrants'))

if __name__ == '__main__':
    init_db()
    app.run(debug=True)