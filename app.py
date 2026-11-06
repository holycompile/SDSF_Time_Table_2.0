from flask import Flask
from flask import render_template, url_for, request

app=Flask(__name__)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/admin")
def admin():
    return render_template("admin.html")

@app.route("/create_table")
def createtable():
    return render_template("create_table.html")

if __name__ == '__main__':
    app.run(debug=True)