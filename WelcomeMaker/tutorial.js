


function startIntro() {
document.getElementById('start-tour').addEventListener('click', function() {
    const intro = introJs();

    intro.setOptions({
        steps: [
            
            {
                element: '#button1',
                intro: "Fügt einzelne Namen zur temporären Liste hinzu."
            },
            {
                element: '#button2',
                intro: "Löscht alle Einträge in der Namensliste."
            },
            {
                element: '#button3',
                intro: "Überträgt die Einträge in der Namensliste zusammen mit den Werten aus den Eingabefeldern 'Firma', 'Bearbeiter', 'Terminal', 'von/bis' in die Datenbank."
            },
            {
                element: '#button4',
                intro: "Gebe die ID, die aus der untenstehenden Tabelle gelöscht werden soll, in die Spalte 'ID Löschen' ein."
            },
            {
                element: '#button5',
                intro: "Trägt den gewünschten Namen in das Feld 'Name' und die ID, in die der Name eingefügt werden soll, in das entsprechende Feld ein."
            },
            {
                element: '#button6',
                intro: "Trägt den Namen, der gelöscht werden soll, in das Feld 'Name' ein."
            }
            
        ]
    });

    intro.onbeforechange(function(targetElement) {
        removeAll()
        if (targetElement.id === 'button1') {
            document.getElementById('names').classList.add('highlight');
        
        } 
        
        if (targetElement.id === 'button3') {
            document.getElementById('company').classList.add('highlight');
            document.getElementById('editor').classList.add('highlight');
            document.getElementById('trm').classList.add('highlight');
            document.getElementById('fromDate').classList.add('highlight');
            
            document.getElementById('toDate').classList.add('highlight');
        
        } if (targetElement.id === 'button4') {
            document.getElementById('ID').classList.add('highlight');
        } 
        if (targetElement.id === 'button5' | targetElement.id === 'button6') {
            document.getElementById('addNameLater').classList.add('highlight');
            document.getElementById('addNameLaterID').classList.add('highlight');
        }
       
        
        
       
    });

    intro.oncomplete(function() {
        removeAll()
    });

    intro.onexit(function() {
        removeAll()
    });

    

    intro.start();
});
}

function removeAll(){
    document.getElementById('names').classList.remove('highlight');
    document.getElementById('company').classList.remove('highlight');
    document.getElementById('editor').classList.remove('highlight');
    document.getElementById('trm').classList.remove('highlight');
    document.getElementById('fromDate').classList.remove('highlight');
    document.getElementById('toDate').classList.remove('highlight');
    document.getElementById('ID').classList.remove('highlight');
    document.getElementById('addNameLater').classList.remove('highlight');
    document.getElementById('addNameLaterID').classList.remove('highlight');
}