from flask import Flask
from flask import render_template, url_for, request, jsonify 
from database import save_timetable

app=Flask(__name__)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/admin")
def admin():
    return render_template("admin.html")

@app.route("/create_table", methods=['GET','POST'] )
def createtable():
    if request.method=="POST":
        
        data=request.get_json()
        
        title = data.get("title")
        class_teacher = data.get("class_teacher")
        sem_name = data.get("sem_name")
        columns = data.get("columns")
        rows_weekly = data.get("rows_weekly")
        course_grp = data.get("course_grp")
        contact_no = data.get("contact_no")
        class_represntative = data.get("class_represntative")
        rows_faclty_info = data.get("rows_faclty_info")
        
        save_timetable(
            title, class_teacher, sem_name,
            columns, rows_weekly, course_grp,
            contact_no, class_represntative, rows_faclty_info
        )
        
        return jsonify(
            {
                "status": "success",
                "class_teacher": class_teacher,
                "sem_name":sem_name,
                "message":"TimeTable created successfully"
            }
        )
        
    return render_template("create_table.html")

if __name__ == '__main__':
    app.run(debug=True)
