import sqlite3
import json
DB_NAME="database.db"

def get_connection():
    connect = sqlite3.connect(DB_NAME)
    return connect 

def init_db():
    connect = get_connection()
    cursor  = connect.cursor()
    cursor.execute("""--sql
        create table if not exists timetables(
            id integer primary key autoincrement,
            title text,
            class_teacher text,
            sem_name text
        ); 
        
             
    """)
                
    connect.commit()
    connect.close()
    

    


def save_timetable(title, class_teacher, sem_name, columns, rows_weekly, course_grp, contact_no, class_represntative, rows_faclty_info):
    init_db() # to initialise 1st before saving them 
    connect = get_connection()
    cursor = connect.cursor()
    cursor.execute("""--sql
                   insert into timetables
                   (title, class_teacher, sem_name)
                   values
                   (?,?,?)
                   """,(title,class_teacher,sem_name))
    new_id=cursor.lastrowid
    table_name=f"timetable{new_id}"
    
    
    # now the carzzzzzzy part as a coder your mind will be blown trust me !!
    '''
    
    What I am doing is actually, making the text and inserting in sql query 
    '''
    
    col_furnished_sql_text=""
    
    for col in columns:
        col_furnished_sql_text+="["+col+"] TEXT,"
        
    col_furnished_sql_text=col_furnished_sql_text.rstrip(",")
    cursor.execute(f"""--sql
                       create table if not exists {table_name}(
                          id integer primary key autoincrement,
                          {col_furnished_sql_text}
                          );
                       """)
    connect.commit()
    connect.close()
    
    column_name_sql=", ".join(["["+col+"]" for col in columns])
    rows_furnished_sql=", ".join([])
    for rows in rows_weekly:
        cursor.execute(f"""--sql
                       insert into {table_name}
                       
                       """)
    
    
    
