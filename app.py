from flask import Flask
from flask import render_template, url_for, request

app=Flask(__name__)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/INser_table")
def insertable():
    return render_template("")

if __name__ == '__main__':
    app.run(debug=True)