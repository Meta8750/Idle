import os
import random
import time
import re
import shutil
import cssutils

unused_path = "//gmeinder.de//dfs//Gemeinsam//Abteilungen//Datenverarbeitung//Programme_und_Features//Greeting//UnusedBG"
ordner_path = "//gmeinder.de//dfs//Gemeinsam//Abteilungen//Datenverarbeitung//Programme_und_Features//Greeting//BG"

def changeBG():
    # Überprüfen, ob 1.jpg existiert
    one_filename = "1.jpg"
    one_filePath = os.path.join(ordner_path, one_filename)
    
    if not os.path.exists(one_filePath):
        print(f"{one_filename} existiert nicht im Verzeichnis {ordner_path}. Beende die Funktion.")
        return
    

    # Zufällige Datei auswählen und in den Ordner UnusedBG verschieben
    selected_filename = one_filename
   
    
    try:
        os.remove(one_filePath)
    except Exception as e:
        print(f"Fehler beim Löschen der Datei {selected_filename}: {e}")
    
    
    def chooseRandomPic():
    # Zufällige Datei aus UnusedBG auswählen und in den Ordner BG kopieren und umbenennen
        selected_unused_filename = random.choice(os.listdir(unused_path))
        if selected_unused_filename != "thumbs.dn" or "Thumbs.db":
        

            selected_unused_file_path = os.path.join(unused_path, selected_unused_filename)
            
            try:
                shutil.copy(selected_unused_file_path, one_filePath)
                os.rename(one_filePath, os.path.join(ordner_path, one_filename))
            except Exception as e:
                print(f"Fehler beim Kopieren und Umbenennen der Datei {selected_unused_filename} nach BG: {e}")
    
    
    chooseRandomPic()
    
    print(os.path.getsize(one_filePath))
    if os.path.getsize(one_filePath) <= 5000:
        chooseRandomPic()
    
    print("Dateinamen wurden erfolgreich geshuffelt.")
    

# Funktion aufrufen
def update_background_image(css_file_path):
    scuccses = False
    i = 0
    selected_filename = random.choice(os.listdir(ordner_path))
    print(selected_filename)
    if selected_filename != "thumbs.dn" or selected_filename != "Thumbs.db":
    
    
        with open(css_file_path, 'r') as file:
            css_content = file.read()

        # Suche nach dem alten Pfad mit einer regulären Ausdruck
        match = re.search(r'background-image:url\("(.*?)"\);', css_content)

        if match:
            alter_pfad = match.group(1)

            # Hier kannst du Code einfügen, um den neuen Pfad zu generieren
            # Zum Beispiel könntest du den neuen Pfad basierend auf dem alten Pfad ändern
            neuer_pfad = f"G:/Abteilungen/Datenverarbeitung/Programme_und_Features/Greeting/BG/{selected_filename}"  # Hier solltest du die Logik für den neuen Pfad implementieren

            # Ersetze den alten Pfad durch den neuen
            css_content_neu = css_content.replace(alter_pfad, neuer_pfad)

            # Speichere den neuen Inhalt zurück in die CSS-Datei
            with open(css_file_path, 'w') as file:
                file.write(css_content_neu)
        else:
            print("Kein Hintergrundbild-Pfad gefunden.")

changeBG()
update_background_image("G:\Abteilungen\Datenverarbeitung\Programme_und_Features\Greeting\style.css")
