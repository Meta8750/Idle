from flask import Flask,  request,jsonify
from flask_socketio import SocketIO
import pandas as pd
from sqlalchemy import create_engine
import pyodbc
from flask_cors import CORS 
import json
import os

import folder as fm
import sqlConn

def data_get(sqlFilter):
    
    engine = sqlConn.create_sql_conn()

    # Führe die SQL-Abfrage aus
    
    gearsaverNr = sqlFilter.get("gearsaverNr")
    gatewayNr = sqlFilter.get("gatewayNr")
    date = sqlFilter.get("date")
    values = sqlFilter.get("values")
    orderBy = sqlFilter.get("orderBy")
    
    

    andCount = 0
    whereCount = 0
    count = 0

    sql = "SELECT\n" 
    sql += "Kunde.KundenNr, Kunde.Kunde,\n"
    sql += "Adresse.AdressenNr, Adresse.Land, Adresse.Ort, Adresse.Straße, Adresse.Hausnummer, Adresse.Betrieb,\n"
    sql += "Fahrzeug.FahrzeugNr,\n"
    sql += "Gateway.GatewayNr, Gateway.Gateway,\n"
    sql += "Fahrzeugtyp.FahrzeugtypNr, Fahrzeugtyp.Fahrzeugtyp,\n"
    sql += "Gearsaver.GearsaverNr, Gearsaver.Gearsaver,\n"
    sql += "Getriebe.GetriebeNr, Getriebe.Getriebe \n"
    
       
    for value in values:
        countmax = len(values)
        count += 1
        for i in range(1, 9):
            if i == 8:
                if count == countmax:
                    sql += f",{value}.S{i}{value}\n"
            else:
                sql += f",{value}.S{i}{value}"

    for value in values:
        sql += f",{value}.DatensatzNr\n"
        sql += f",{value}.Datum\n"
    
    sql +=  "FROM Gearsaver.dbo.Kunde\n"

    sql +=  "LEFT JOIN Adresse ON Kunde.KundenNr = Adresse.KundenNr\n" 
    sql +=  "LEFT JOIN Fahrzeug ON Adresse.AdressenNr = Fahrzeug.AdressenNr\n"     
    sql +=  "LEFT JOIN Gearsaver.dbo.Fahrzeugtyp ON Fahrzeug.FahrzeugtypNr = Fahrzeugtyp.FahrzeugtypNr\n"     
    sql +=  "LEFT JOIN  Gateway ON Fahrzeug.GatewayNr = Gateway.GatewayNr\n"
    sql +=  "LEFT JOIN  Gearsaver ON Gateway.GatewayNr = Gearsaver.GatewayNr\n"
    sql +=  "LEFT JOIN  Getriebe ON Gearsaver.GearsaverNr = Getriebe.GearsaverNr\n"
    
    if values:
        for value in values:
            sql += f"left join {value} ON Gateway.GatewayNr = {value}.GatewayNr\n"
    
    
    if  gearsaverNr:
       if whereCount == 0:
           sql += "where\n"
           whereCount += 1
       
       sql += f" Gearsaver.GearsaverNr = {gearsaverNr}\n"
       andCount += 1

       
    
    if  gatewayNr:
        if andCount == 1:
            sql += "and\n"
            andCount -= 1
        if whereCount == 0:
           sql += "where\n"
           whereCount += 1
        
        sql += f"Gateway.GatewayNr = {gatewayNr}\n"
        
        andCount += 1

    if date[0] != "" or date[1] != "":
        for value in values:
            if whereCount == 0:
                sql += "where\n"
                whereCount += 1
            if andCount == 1:
                sql += "and\n"
                andCount -= 1
            if date[1] == "":
                i = date[0]
            else:
                i = date[1]
            sql += f"{value}.Datum BETWEEN '{date[0]}' AND '{i}'\n"
            andCount +=1
    if orderBy:
        sql += f"ORDER BY\n"
        
        sql += f"{orderBy[0]} {orderBy[1]}\n"
       
    print(sql)
    
    df = pd.read_sql_query(sql, engine)
 
    # Rückgabe des DataFrames als JSON
    result = df.to_json(orient="columns")
    

    return result

def list_files(folder):
    folder_path = fm.foldersearch(folder)  # Passe dies entsprechend an
    files = os.listdir(folder_path)
    return  files

def data_search(sqlQuery):
    engine = sqlConn.create_sql_conn()
    return pd.read_sql_query(sqlQuery, engine)

app = Flask(__name__)
socketio = SocketIO(app)

CORS(app)


    

@app.route('/api/daten-abrufen', methods=['GET'])

def daten_abrufen():
    # Hier führst du die SQL-Abfrage und Ergebnisverarbeitung durch
    sqlFilter = request.args.get('variable')
    # Wandele den JSON-String in ein Python Dictionary um
    sqlFilter = json.loads(sqlFilter)
    print(sqlFilter)
    return jsonify(data_get(sqlFilter))


@app.route('/api/fileList', methods=['GET'])
def get_list():
    input_files = list_files("input")
    output_files = list_files("output")
   
    return jsonify({'input': input_files, 'output': output_files})

    
if __name__ == '__main__':
    from waitress import serve
    serve(app, host="0.0.0.0", port=8080)
