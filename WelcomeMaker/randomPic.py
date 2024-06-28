import os
import random
import time
import re
import shutil
import cssutils


ordner_path = "//gmeinder.de//dfs//Gemeinsam//Abteilungen//Datenverarbeitung//Programme_und_Features//Greeting//BG"

# Funktion aufrufen
def update_background_image(css_file_path):
    
    selected_filename = random.choice(os.listdir(ordner_path))
    print(selected_filename)
    if selected_filename != "Thumbs.db":
        print("yes")
        print(selected_filename)
        
        
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


