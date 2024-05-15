import pandas as pd
from sqlalchemy import create_engine
import pyodbc

class SqlQuery:
    def __init__(self):
        pass
    def select(self, sql):
        engine = create_sql_conn()
        try:
            # Führe die SQL-Abfrage aus und lese das Ergebnis in ein DataFrame
            df = pd.read_sql_query(sql, engine)
            return df
        except Exception as e:
            print("Error:", e)

    def insert(self, sql, values):
        
        connection = create_pyodbc()
        cursor = connection.cursor()

        try:                
            cursor.execute(sql, values)
            connection.commit()
            
        except Exception as e:
            print("Error:", e)

    def delete(self, sql):
        
        connection = create_pyodbc() 
        cursor = connection.cursor()
        try:
            cursor.execute(sql)
            connection.commit()
        except Exception as e:
            print("Error:", e)


server = "192.100.100.17"
database = "Greeting"
driver = "{ODBC Driver 17 for SQL Server}"

def create_sql_conn():

    # Verbindung zur Datenbank herstellen
    conn_str = f"DRIVER={driver};SERVER={server};DATABASE={database};Trusted_Connection=yes;"
    connection_string = f"mssql+pyodbc:///?odbc_connect={conn_str}"
    return create_engine(connection_string)

def create_pyodbc():
    conn_str = f"DRIVER={driver};SERVER={server};DATABASE={database};Trusted_Connection=yes;"
    
    
    return pyodbc.connect(conn_str)

if __name__ ==  "__main__":
    create_sql_conn()