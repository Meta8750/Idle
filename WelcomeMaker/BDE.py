import customtkinter as ck
import logging
from tkcalendar import DateEntry
import babel.numbers
from datetime import date
import html_gen as html
from PIL import Image

#Programm geschrieben und erstellt von Paul-Louis Powietzka

#leere listen erstellen
name_list = []
company_list = []
name_list2 = []
company_list2 = []
name_list3 = []
company_list3 = []

event_list = []
date_list = []

company1 = True
company2 = False
company3 = False

english = False


HEIGHT = 850
WIDTH = 1200

#creat log
logging.basicConfig(filename='G:\\Abteilungen\\Datenverarbeitung\\Programme_und_Features\\Greeting\\event_log.txt', level=logging.INFO, format='%(asctime)s - %(message)s')

def update_html():

    if english:
        heading = "We warmly welcome today's "
        heading_span = "visitors"
    else:
        heading = "Wir begr&uuml;&szlig;en ganz herzlich unsere heutigen "
        heading_span = "Besucher"

    if company1 and name_list:
        html.update_html_1(name_list, company_list, heading, heading_span)
    if company_list2 and name_list2:
        html.update_html_2(name_list, name_list2, company_list, company_list2)
    if company_list3 and name_list3:
        html.update_html_3(name_list, name_list2, name_list3, company_list, company_list2, company_list3)
        
    update_list("Bildschirmschoner erstellt")
        
    save_date()


def save_date():

    with open("G:\\Abteilungen\\Datenverarbeitung\\Programme_und_Features\\Greeting\\Valid_from.txt", "w") as file:
        valid_date = valid_entry.get_date()
        file.write(f"{valid_date}")
        print(valid_date)
        update_list("Gültig ab gespeichert.")
  
     
    with open("G:\\Abteilungen\\Datenverarbeitung\\Programme_und_Features\\Greeting\\Date_of_expiry.txt", "w") as file:
        expiry_date = expiry_entry.get_date()
        file.write(f"{expiry_date}")
        print(expiry_date)
        update_list("Gültig bis gespeichert.")    
        
def delet_date():
     
    with open("G:\\Abteilungen\\Datenverarbeitung\\Programme_und_Features\\Greeting\\Valid_from.txt", "w") as file:
        file.truncate(0)
        update_list("Gültig ab gelöscht.")
  
     
    with open("G:\\Abteilungen\\Datenverarbeitung\\Programme_und_Features\\Greeting\\Date_of_expiry.txt", "w") as file:
        file.truncate(0)
        update_list("Gültig bis gelöscht.") 

    date_list.clear()
    
    

def save_name():
    global name_list
    global name_list2
    global name_list3
    name = name_entry.get()
    if company3:
        name_list3.append(name)
    
    if company2:
        name_list2.append(name)
    
    if company1:
        name_list.append(name)
    
    if name:

        name_entry.delete(0, 'end')
        update_list("Name gepsichert")
    else:
        if company3:
            del name_list3[-1]

        if company2:
            del name_list2[-1]

        if company1:
            del name_list[-1]
        update_list("Error: Keine Namen eingefügt")

def save_company():
    global company_list
    company = company_entry.get()

    if company3:
        company_list3.append(company)

    if company2:
        company_list2.append(company)

    if company1:
        company_list.append(company)
    
    if company:
        company_entry.delete(0, 'end')
        update_list("Firma gepsichert")
    else:
        if company3:
            del company_list3[-1]
        if company2:
            del company_list2[-1]
        if company1:
            del company_list[-1]
        update_list("Error: Keine Firma eingefügt")

def show_date():
    filename = "G:\\Abteilungen\\Datenverarbeitung\\Programme_und_Features\\Greeting\\Valid_from.txt"
    filename2 = "G:\\Abteilungen\\Datenverarbeitung\\Programme_und_Features\\Greeting\\Date_of_expiry.txt"
    try:
        with open(filename, 'r') as file:
            stored_date = file.readline().strip()
        with open(filename2, 'r') as file:
            stored_date2 = file.readline().strip()
        if len(event_list) >= 2:
            date_list.clear()
        date_list.append(stored_date)
        date_list.append(stored_date2)

        if stored_date:
            update_list("Aktuelles Datum")
        else:
            date_list.clear()
            update_list("Error: Keine Datum vorhanden")

    except FileNotFoundError:
        update_list("Error: Fehlende Datein")

def add_another():
    global company1
    global company2
    global company3
    
    if company2:
        company2 = False
        update_list("2 Firmen modus aus")
        company1 = True
        update_list("1 Firmen modus an")
    else: 
        company1 = False
        update_list("1 Firmen modus aus")
        company2 = True
        update_list("2 Firmen modus an")
        company3 = False
        update_list("3 Firmen modus aus")

    
def add_another2():
    global company1
    global company2
    global company3
    
    if company3:
        company3 = False
        update_list("3 Firmen modus aus")
        company1 = True
        update_list("1 Firmen modus an")
    else: 
        company1 = False
        update_list("1 Firmen modus aus")
        company2 = False
        update_list("2 Firmen modus aus")
        company3 = True
        update_list("3 Firmen modus an")
        

    
def delet_name():
    if company1:
        if name_list:
            name_list.clear()
            update_list("Alle Namen gelöscht")
        else: 
            update_list("Error: Keine Namen gefunden")


    if company2:
        if name_list2:
            name_list2.clear()
            update_list("Alle Namen gelöscht")
        else: 
            update_list("Error: Keine Namen gefunden")

    if company3:
        if name_list3:
            name_list3.clear()
            update_list("Alle Namen gelöscht")
        else: 
            update_list("Error: Keine Namen gefunden")

def delet_company():
    try:
        if company2:
            if company_list2:
                company_list2.clear()

        if company3:
            if company_list3:
                company_list3.clear()

        if company1:
            if company_list:
                company_list.clear()
        update_list("Alle Firmen gelöscht")
            
                
    except IndexError:
        update_list("Error: Keine Firma gefunden")
    
def delet_last_name():
    try:
        if company1:
            del name_list [-1]
        if company2:
            del name_list2[-1]
        if company3:
            del name_list3 [-1]
        update_list("letzer Name gelöscht")
    
    except IndexError:
        update_list("Error: Kein Namen gefunden")


def update_list(event):

    if len(event_list) >= 10:
        event_list.pop(0)  
    event_list.append(event)
    
    name_list_label.configure(text="\n".join(name_list))
    name_list_label2.configure(text="\n".join(name_list2))
    name_list_label3.configure(text = "\n".join(name_list3))
    company_list_label.configure(text="\n".join(company_list))
    company_list_label2.configure(text="\n".join(company_list2))
    company_list_label3.configure(text="\n".join(company_list3))
    event_label.configure(text="\n".join(event_list))
    date_label.configure(text="/".join(date_list))
    
    if company2 == False and company3 == False:
        name_frame.configure(fg_color="#1874CD")
    else:
        name_frame.configure(fg_color="grey")
    
    if company2 == False and company3 == False:
        company_frame.configure(fg_color="#1874CD")
    else:
        company_frame.configure(fg_color="grey")

    if company2 == True and company3 == False:
        name_frame2.configure(fg_color="#1874CD")
    else:
        name_frame2.configure(fg_color="grey")

    if company2 == True and company3 == False:
       company_frame2.configure(fg_color="#1874CD")
    else:
        company_frame2.configure(fg_color="grey")

    if company3 == True and company2 == False:
        name_frame3.configure(fg_color="#1874CD")
    else:
        name_frame3.configure(fg_color="grey")

    if company3 == True and company2 == False:
        company_frame3.configure(fg_color="#1874CD")
    else:
        company_frame3.configure(fg_color="grey")
    

    log_event(event)

def log_event(event):
    logging.info(event)

def change_language():
    global english
    check = checkbox_var.get()
    print(check)

    if check:
        english = True
        update_list("Sprache: Englisch")
    else:
        english = False
        update_list("Sprache: Deutsch")


root = ck.CTk()
root.title("WelcomeMaker")
root.geometry(f"{WIDTH}x{HEIGHT}")

check_var = ck.StringVar()
checkbox_var = ck.BooleanVar()

#creat frames

frame = ck.CTkFrame(master=root)
frame.pack(pady=20, padx=5, fill="y", expand=False, side="left")

company_frame3 = ck.CTkFrame(master=root)
company_frame3.pack(pady=20, padx=5, fill="y", expand=False, side="right")

name_frame3 = ck.CTkFrame(master=root)
name_frame3.pack(pady=20, padx=5, fill="y", expand=False, side="right")

company_frame2 = ck.CTkFrame(master=root)
company_frame2.pack(pady=20, padx=5, fill="y", expand=False, side="right")

name_frame2 = ck.CTkFrame(master=root)
name_frame2.pack(pady=20, padx=5, fill="y", expand=False, side="right")

company_frame = ck.CTkFrame(master=root)
company_frame.pack(pady=20, padx=5, fill="y", expand=False, side="right")

name_frame = ck.CTkFrame(master=root)
name_frame.pack(pady=20, padx=5, fill="y", expand=False, side="right")


event_frame = ck.CTkFrame(master=root)
event_frame.pack(pady=20, padx=5, fill="both", expand=False, side="bottom")

date_frame = ck.CTkFrame(master=root)
date_frame.pack(pady=20, padx=20, fill="none", expand=False, side="top")


#name list

name_label = ck.CTkLabel(master=name_frame, text="Namenliste:")
name_label.pack(pady=0, padx=10)

name_list_label = ck.CTkLabel(master=name_frame, text="")
name_list_label.pack(pady=12, padx=5)

#company list

name_label = ck.CTkLabel(master=company_frame, text="Firmaliste:")
name_label.pack(pady=0, padx=10)

company_list_label = ck.CTkLabel(master=company_frame, text="")
company_list_label.pack(pady=12, padx=5)

#name list2

name_label = ck.CTkLabel(master=name_frame2, text="Namenliste 2:")
name_label.pack(pady=0, padx=10)

name_list_label2 = ck.CTkLabel(master=name_frame2, text="")
name_list_label2.pack(pady=12, padx=5)


#company list2

name_label = ck.CTkLabel(master=company_frame2, text="Firmaliste 2:")
name_label.pack(pady=0, padx=10)

company_list_label2 = ck.CTkLabel(master=company_frame2, text="")
company_list_label2.pack(pady=12, padx=5)

#name list3

name_label = ck.CTkLabel(master=name_frame3, text="Namenliste 3:")
name_label.pack(pady=0, padx=10)

name_list_label3 = ck.CTkLabel(master=name_frame3, text="")
name_list_label3.pack(pady=12, padx=5)


#company list3

name_label = ck.CTkLabel(master=company_frame3, text="Firmaliste 3:")
name_label.pack(pady=0, padx=10)

company_list_label3 = ck.CTkLabel(master=company_frame3, text="")
company_list_label3.pack(pady=12, padx=5)

#current event

event_label = ck.CTkLabel(master=event_frame, text="")
event_label.pack(pady=0, padx=10)

#current dates

date_label = ck.CTkLabel(master=date_frame, text="")
date_label.pack(pady=0, padx=10)


# Erstelle ein CTkLabel und zeige das Bild darin an
image_label = ck.CTkLabel(master=root, image=ck.CTkImage(Image.open("G:\\Abteilungen\\Datenverarbeitung\\Programme_und_Features\\Greeting\\Logo.png"),size=(277,125)), text=None)
image_label.pack()


#input name 

name_label = ck.CTkLabel(master=frame, text="Name:")
name_label.pack(pady=0, padx=10)

name_entry = ck.CTkEntry(master=frame, placeholder_text="Name eingeben")
name_entry.pack(pady=5, padx=10)


#input company

company_label = ck.CTkLabel(master=frame, text="Firma:")
company_label.pack(pady=0, padx=10)

company_entry = ck.CTkEntry(master=frame, placeholder_text="Firma eingeben")
company_entry.pack(pady=5, padx=10)


#valid from select

valid_label = ck.CTkLabel(master=frame, text="Gültig ab:")
valid_label.pack(pady=0, padx=10)

valid_entry = DateEntry(master=frame, width=12, background='darkblue', foreground='white', borderwidth=2, year=date.today().year)
valid_entry.pack(pady=5, padx=10)

#date of expiry select

expiry_label = ck.CTkLabel(master=frame, text="Gültig bis:")
expiry_label.pack(pady=0, padx=10)

expiry_entry = DateEntry(master=frame, width=12, background='darkblue', foreground='white', borderwidth=2, year=date.today().year)
expiry_entry.pack(pady=5, padx=10)

#change to English

checkbox = ck.CTkCheckBox(master=frame, text="Sprache Englisch",variable=checkbox_var, command=change_language)
checkbox.pack(pady= 10)

#create html

button = ck.CTkButton(master=frame, text="Erstellen", command=update_html)
button.pack(pady=12, padx=10)

#add names

button = ck.CTkButton(master=frame, text="Namen einfügen", command=save_name)
button.pack(pady=12, padx=10)

#add company

button = ck.CTkButton(master=frame, text="Firma einfügen", command=save_company)
button.pack(pady=12, padx=10)

#show date

button = ck.CTkButton(master=frame, text="Aktuelles Datum", command=show_date)
button.pack(pady=12, padx=10)

#delete last name

button = ck.CTkButton(master=frame, text="Letzter Name löschen", command=delet_last_name)
button.pack(pady=12, padx=10)

#delete names

button = ck.CTkButton(master=frame, text="Alle Namen löschen", command=delet_name)
button.pack(pady=12, padx=10)

#delete company

button = ck.CTkButton(master=frame, text="Alle Firmen löschen", command=delet_company)
button.pack(pady=12, padx=10)

#add 2sec Firma

button = ck.CTkButton(master=frame, text="2 Frimen", command=add_another)
button.pack(pady=12, padx=10)

#add 3th Firma

button = ck.CTkButton(master=frame, text="3 Frimen", command=add_another2)
button.pack(pady=12, padx=10)

#reset everything

button = ck.CTkButton(master=frame, text="Zurücksetzen", command=lambda:(html.update_html(), update_list("Alles Zurückgesetzt"), delet_date()))
button.pack(pady=12, padx=10)




update_list("Programm wurde gestartet")

root.mainloop()

