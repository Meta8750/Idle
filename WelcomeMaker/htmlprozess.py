import datetime
from bs4 import BeautifulSoup

from sqlQuery import SqlQuery



sql_query = SqlQuery()

def htmlChoose(trm):
        if trm == 0 or 1:
            return change("TRM025", trm)
        elif trm == 2:
            return "0"
        #elif trm == 3:

    #   retunr "TRM369"

    
def umlaute_umwandeln(text):
        umlaute_dict = {'ä': 'ae', 'ö': 'oe', 'ü': '&uuml;', 'Ä': 'Ae', 'Ö': 'Oe', 'Ü': 'Ue', 'ß': '&szlig;', 'ÃŸ': 'ß', 'Ã¼': 'ü', 'begr��en': 'begrüßen'}
        print(text)
        for umlaut, umschreibung in umlaute_dict.items():
            text = text.replace(umlaut, umschreibung)
            
        
        return text




def update_html(id_list, company_list, names_dict,trm,html):

    try:
        htmlPath = f"G:\\Abteilungen\\Datenverarbeitung\\Programme_und_Features\\Greeting\\{html}\\BS.html"
        # Schreiben Sie den HTML-Header
        with open(htmlPath, 'r') as f:
            html_content = f.read()

    except Exception as e:
        pass
    changeCSS(html_content, htmlPath)
    
    
    # Erstellen eines BeautifulSoup-Objekts
    soup = BeautifulSoup(html_content, "html.parser")
    # Iteriere über die Div-Elemente und lösche den Inhalt
   
    element = soup.find(id="tableNames")
    if element:
        element.clear()
    
    
    for idx, company in enumerate(company_list):
        # Neue HTML-Tags erstellen
        div_tag = soup.new_tag('div')
        span_tag = soup.new_tag('span')
        u_tag = soup.new_tag('u')
        
        # Füge die Firma als Überschrift hinzu
        u_tag.append(company)
        span_tag.append(u_tag)
        div_tag.append(span_tag)
        
        # Füge die zugehörigen Namen hinzu, wenn sie vorhanden sind
        if idx < len(id_list):
            firma_id = id_list[idx]
            if firma_id in names_dict:
                name_list = names_dict[firma_id]
                for name in name_list:
                    li_tag = soup.new_tag('li')
                    li_tag.string = name
                    div_tag.append(li_tag)
                    
        # Füge das erstellte Div-Tag dem Element hinzu
        element.append(div_tag)
    try:
        soup  =umlaute_umwandeln(soup)
        # Speichern der geänderten HTML-Datei
        with open(htmlPath, "w") as f:
            f.write(str(soup))
    except Exception:
        pass

def change(html,trm):
    current_date = datetime.datetime.now()

    # SQL-Abfrage für die Namen mit Firma_ID

    names_df = sql_query.select(f"SELECT Name, Firma_ID FROM Firma LEFT JOIN Person ON Firma.ID = Person.Firma_ID WHERE von <= '{current_date}' and trm ='{trm}' or trm = '0'")
    
    # SQL-Abfrage für die Firmen
    company_df = sql_query.select(f"SELECT Firma, ID FROM Firma  WHERE von <= '{current_date}' and trm ='{trm}' or trm = '0'")
    
    # Gruppiere Namen nach Firma_ID
    names_dict = {firma_id: list(group['Name']) for firma_id, group in names_df.groupby('Firma_ID')}

    

    # Konvertiere Firmen und IDs in Listen
    company_list = company_df['Firma'].tolist()
    id_list = company_df['ID'].tolist()
    
    update_html(id_list, company_list, names_dict,trm,html)



def changeCSS(html_code,html_path):
   
    soup = BeautifulSoup(html_code, "html.parser")

    # Überprüfen, ob der Inhalt von tableNames leer ist
    table_names_content = soup.find(id='tableNames').get_text().strip()

    if table_names_content == '':
        # Wenn leer, ändern Sie die CSS-Stileigenschaften
        soup.find(id='text')['style'] = 'font-size: 70px; padding-top: 20px;'
        soup.find(id='pic')['style'] = 'height: 40%; width: 40%'
    else:
        # Andernfalls ändern Sie die CSS-Stileigenschaften zurück
        soup.find(id='text')['style'] = 'font-size: 50px; padding-top: 20px;'
        soup.find(id='pic')['style'] = 'height: 30%; width: 30%'

    # Den modifizierten HTML-Code in eine Datei schreiben
    with open(html_path, 'w') as file:
        file.write(soup.prettify())





change("Test", 10)
