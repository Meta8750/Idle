
import datetime
import time
import pandas as pd

from flask import Flask,  request,jsonify
from flask_socketio import SocketIO
import pandas as pd

from flask_cors import CORS 
import json

from sqlQuery import SqlQuery
import htmlprozess



sql_query = SqlQuery()
def data_insert(sqlFilter,trm):

    
    # Führen Sie die search-Methode mit der SQL-Abfrage aus
    df = sql_query.select("SELECT ID FROM Firma")
    
    id_list = df['ID'].tolist()
    
    
    try:
        newID = id_list[len(id_list) - 1] + 1
        
    except IndexError:
        newID = 1
    
    Firma = sqlFilter.get("company")
    Names = sqlFilter.get("name")
    Date = sqlFilter.get("date")
    editor = sqlFilter.get("editor")
    

    try:
        values = (Firma, newID, Date[0], Date[1],trm)
        
        sql_query.insert(f"INSERT INTO Firma (Firma ,ID ,von ,bis,trm ) VALUES (?, ?, ?, ?,?)", values)
               
        for Name in Names:
            values = (Name, newID, editor)
            print(values)
            sql_query.insert(f"INSERT INTO Person (Name , Firma_ID, Bearbeiter) VALUES (?,?,?)", values)

    except Exception as error:
        print(1)
        print(error)

def data_insert_later(sqlFilter):
    Name = sqlFilter.get("addNameLater")
    ID = sqlFilter.get("addNameLaterID")
    editor= sqlFilter.get("editor")
    
    values = (Name, ID, editor)
    sql_query.insert(f"INSERT INTO Person (Name , Firma_ID, Bearbeiter) VALUES (?,?,?)", values)

def data_delete_later(sqlFilter):
    Name = sqlFilter.get("addNameLater")
    Firma_Id = sqlFilter.get("addNameLaterID")
    print(Name)
    sql_query.delete(f"Delete FROM Person WHERE Name = '{Name}' and Firma_Id = '{Firma_Id}'")

def data_select():
    
    df = sql_query.select(f"SELECT * FROM Firma LEFT JOIN Person ON Firma.ID = Person.Firma_ID")
    result = df.to_json(orient="columns")
    return result

def delete_old_data(current_date):
     
    ID_df = sql_query.select(f"Select ID FROM Firma WHERE bis < '{current_date}'")
    ID_list = ID_df['ID'].tolist()
    
    for id in ID_list:
        
        sql_query.delete(f"DELETE FROM Person WHERE Firma_ID = '{id}'")

    sql_query.delete(f"DELETE FROM Firma WHERE bis < '{current_date}'")



def data_select_for_BS():

    current_date = datetime.datetime.now()

    names_df = sql_query.select(f"SELECT Name, Firma_ID FROM Firma LEFT JOIN Person ON Firma.ID = Person.Firma_ID WHERE von <= '{current_date}' and trm ='2' or trm = '0' ")
    company_df = sql_query.select(f"SELECT Firma, ID FROM Firma  WHERE von <= '{current_date}' and trm ='2' or trm = '0'")
   
    names_dict = {firma_id: list(group['Name']) for firma_id, group in names_df.groupby('Firma_ID')}
    company_dict = {firma_id: list(group['Firma']) for firma_id, group in company_df.groupby('ID')}
    
    id_list = company_df['ID'].tolist()
    
    delete_old_data(current_date)

    result = {"name" : names_dict, "company": company_dict, "id": id_list}

    return result

def data_delete(sqlFilter):
    ID = sqlFilter.get('ID')
    sql_query.delete(f"DELETE From Person WHERE Firma_ID = '{ID}'")
    sql_query.delete(f"DELETE FROM Firma WHERE ID = '{ID}'")

def selectTRM():
    trm_df = sql_query.select(f"SELECT trm FROM Firma  WHERE von <= '{datetime.datetime.now()}'")
    return trm_df['trm'].tolist()

app = Flask(__name__)
socketio = SocketIO(app)

CORS(app)

@app.route('/api/daten', methods=['GET'])

def daten_manage():
    
    sqlFilter = request.args.get('variable')
    sqlFilter = json.loads(sqlFilter)
    trmList = selectTRM()

    type = sqlFilter.get('type')

    if type == 'add':
        trm = sqlFilter.get('trm')
        return jsonify(data_insert(sqlFilter, trm))
    elif type == 'addNameLater':
        return jsonify(data_insert_later(sqlFilter))
    elif type == 'deleteNameLater':
        return jsonify(data_delete_later(sqlFilter))
    
    elif type == 'select':
        htmlprozess.htmlChoose(0)
        for trm in trmList:
            if trm != 2:
                htmlprozess.htmlChoose(trm)
        return jsonify(data_select())
    
    elif  type == 'delete':
        return jsonify(data_delete(sqlFilter))
    
    elif type == 'selectForBS':
        return jsonify(data_select_for_BS())
    
    
    
if __name__ == '__main__':
    from waitress import serve
    serve(app, host="0.0.0.0", port=8080)

