from flask import Flask, render_template, request, redirect, url_for, flash, session  
import sqlite3  

app = Flask(__name__)  
app.secret_key = 'your_secret_key'  # Change this to a random secret key  

# Connect to SQLite database (or create it)  
def get_db_connection():  
    conn = sqlite3.connect('sabos.db')  
    conn.row_factory = sqlite3.Row  
    return conn  

# Create tables if they don't exist  
def init_db():  
    conn = get_db_connection()  
    cursor = conn.cursor()  
    cursor.execute('''  
    CREATE TABLE IF NOT EXISTS lakk (  
        account_id INTEGER PRIMARY KEY AUTOINCREMENT,  
        username TEXT NOT NULL UNIQUE,  
        password TEXT NOT NULL,  
        balance REAL NOT NULL DEFAULT 0  
    )  
    ''')  
    cursor.execute('''  
    CREATE TABLE IF NOT EXISTS dadrbins (  
        dadrbin_id INTEGER PRIMARY KEY AUTOINCREMENT,  
        account_id INTEGER,  
        amount REAL,  
        dadrbin_type TEXT,  
        date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  
        FOREIGN KEY (account_id) REFERENCES lakk (account_id)  
    )  
    ''')  
    conn.commit()  
    conn.close()  

@app.route('/')  
def index():  
    return render_template('index1.html')  

@app.route('/create_account', methods=['POST'])  
def create_account():  
    username = request.form['username']  
    password = request.form['password']  
    
    try:  
        conn = get_db_connection()  
        cursor = conn.cursor()  
        cursor.execute('INSERT INTO lakk (username, password) VALUES (?, ?)', (username, password))  
        conn.commit()  
        conn.close()  
        flash("Account created successfully!", "success")  
    except sqlite3.IntegrityError:  
        flash("Username already exists!", "error")  
    
    return redirect(url_for('index'))  

@app.route('/login', methods=['POST'])  
def login():  
    username = request.form['username']  
    password = request.form['password']  
    
    conn = get_db_connection()  
    cursor = conn.cursor()  
    cursor.execute('SELECT * FROM lakk WHERE username=? AND password=?', (username, password))  
    account = cursor.fetchone()  
    conn.close()  
    
    if account:  
        session['account_id'] = account['account_id']  
        session['username'] = username  
        return redirect(url_for('account'))  
    else:  
        flash("Invalid credentials!", "error")  
        return redirect(url_for('index'))  

@app.route('/account')  
def account():  
    if 'account_id' not in session:  
        return redirect(url_for('index'))  
    
    account_id = session['account_id']  
    conn = get_db_connection()  
    cursor = conn.cursor()  
    cursor.execute('SELECT balance FROM lakk WHERE account_id = ?', (account_id,))  
    balance = cursor.fetchone()['balance']  
    conn.close()  
    
    return render_template('account.html', balance=balance)  

@app.route('/deposit', methods=['POST'])  
def deposit():  
    if 'account_id' not in session:  
        return redirect(url_for('index'))  
    
    amount = float(request.form['amount'])  
    account_id = session['account_id']  
    
    conn = get_db_connection()  
    cursor = conn.cursor()  
    cursor.execute('UPDATE lakk SET balance = balance + ? WHERE account_id = ?', (amount, account_id))  
    cursor.execute('INSERT INTO dadrbins (account_id, amount, dadrbin_type) VALUES (?, ?, ?)', (account_id, amount, 'deposit'))  
    conn.commit()  
    conn.close()  
    
    flash(f"{amount} deposited successfully!", "success")  
    return redirect(url_for('account'))  

@app.route('/withdraw', methods=['POST'])  
def withdraw():  
    if 'account_id' not in session:  
        return redirect(url_for('index'))  
    
    amount = float(request.form['amount'])  
    account_id = session['account_id']  
    
    conn = get_db_connection()  
    cursor = conn.cursor()  
    cursor.execute('SELECT balance FROM lakk WHERE account_id = ?', (account_id,))  
    balance = cursor.fetchone()['balance']  
    
    if balance >= amount:  
        cursor.execute('UPDATE lakk SET balance = balance - ? WHERE account_id = ?', (amount, account_id))  
        cursor.execute('INSERT INTO dadrbins (account_id, amount, dadrbin_type) VALUES (?, ?, ?)', (account_id, amount, 'withdrawal'))  
        conn.commit()  
        flash(f"{amount} withdrawn successfully!", "success")  
    else:  
        flash("Insufficient balance!", "error")  
    
    conn.close()  
    return redirect(url_for('account'))  

@app.route('/logout')  
def logout():  
    session.pop('account_id', None)  
    session.pop('username', None)  
    return redirect(url_for('index'))  

if __name__ == '__main__':  
    init_db()  # Initialize the database  
    app.run(debug=True)