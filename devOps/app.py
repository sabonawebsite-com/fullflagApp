from flask import Flask, render_template, session, redirect, request ,jsonify 
from cs50 import SQL  
app = Flask(__name__)  
db = SQL("sqlite:///distros.db")  

@app.route('/')  
def index():  
    return render_template("index.html")  
@app.route("/search")  
def search(): 

    query = "%" + request.args.get("q") + "%" 
    if query:

        show = db.execute("SELECT * FROM distros WHERE images LIKE ? LIMIT 5", query) 
    else:
        show=[]
    return jsonify(show)  
if __name__ == "__main__":  
    app.run(debug=True)