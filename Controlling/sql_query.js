orderByCount = 0;
orderBylist = [];


function checkboxChange() {

  let checkboxes = document.querySelectorAll('.checkbox');
    
  // Array zum Sammeln der ausgewählten Werte
  let values = [];

  checkboxes.forEach((checkbox) => {
      try {
          if (checkbox.checked) {
              // Hier füge den Wert des ausgewählten Elements zu dem Array hinzu.
              // Wert ist das "id"-Attribut des Elements ist. ID ist auch der Table Name.
              values.push(checkbox.id);
          }
      } catch (e) {
          console.log(e);
      }
  });

  return values;
}
    


// Funktion, die aufgerufen wird, wenn auf eine Zelle geklickt wird
function columnClick() {
    // Code der ausgeführt wird, wenn auf eine Zelle geklickt wird
    // 'event.target' ist das Element, auf das geklickt wurde (die Zelle)
    allColumns = document.querySelectorAll('#table-c label')
    allColumns.forEach(function(column) {
        column.addEventListener('click', columnClickHandler);
        
});}

const get_data = (sql_query) => {
    return fetch(`http://cn:8080/api/daten-abrufen?variable=${JSON.stringify(sql_query)}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        // Verarbeite die empfangenen Daten im Frontend
        return JSON.parse(data);
      })
      .catch(error => {
        console.error('Fehler:', error);
        throw error; // Wird das Error-Objekt weiter werfen, damit es von anderen Promise-Ketten behandelt werden kann
      });
  }


    
// Jeder Zelle einen Klickereignis-Handler hinzufügen
// 0 = ASC , 1 = DESC, "" = nichts lol

function columnClickHandler(event){
    // console.log(event.target.textContent);
    if (orderByCount === 0) {
       orderByCount++; 
    } else {
        orderByCount = 0;
    }
    orderBylist = [];
    orderBylist.push(event.target.textContent);
    if (orderByCount === 0) {
        orderBylist.push("ASC");
    } else {
        orderBylist.push("DESC");
    }
    getInformations();
}[]


document.getElementById('search').addEventListener('click', function(e) {
    e.preventDefault();
        getInformations()});
    
    function getInformations(){
    let date = []
    
    let gearsaverNr = document.getElementById('gearsaverNr').value;
    let gatewayNr = document.getElementById('gatewayNr').value;;
    
    date.push(document.getElementById('date from').value);
    date.push(document.getElementById('date to').value);
    
    values = checkboxChange()

    let filterList = {'gearsaverNr': gearsaverNr, 'gatewayNr': gatewayNr, 'date': date, 'values': values, 'orderBy': orderBylist };
    
    get_data(filterList)
      .then(data => {
        
        
        let columns = Object.keys(data)
    
        // Referenz zum HTML-Element, in das die Daten eingefügt werden sollen
        const tableContainer = document.getElementById('table-c');
        tableContainer.style.display = 'flex';
        tableContainer.innerHTML = ''; // Leere die Dateiliste, um sie zu aktualisieren

        for (let i = 0; i < columns.length; i++){
            
            let  label = document.createElement('label');
            let ul = document.createElement('ul');
            
            let rows = data[Object.keys(data)[i]]
            
            // counter dafür das jede 2 spalte andere Farbe hat
            let counter = 1;
            

            label.textContent = `${columns[i]}`
            // füge spalten name als Label ein
            ul.appendChild(label)

            // Iteriere über die Schlüssel-Wert-Paare und füge sie als li-Elemente zur Liste hinzu
            Object.entries(rows).forEach(([key, value]) => {
                const li = document.createElement('li');
                
                if (counter === 0){
                    li.style.backgroundColor = "#e9eff1";
                    counter += 1;
                } 
                else {
                    counter = 0;
                }
               

                if (columns[i] === "Datum"){
                    value = new Date(value);
                    value =  value.toLocaleString('de-DE', { timeZone: 'UTC' });
                    
                }
                li.textContent = `${value}`; // Anzeige der Daten im Format "Index: Wert"
                // Füge das li-Element zur ul-Liste hinzu

                ul.appendChild(li);
        });
        

        // Füge die ul-Liste zum HTML-Element hinzu
        tableContainer.appendChild(ul);
        columnClick()
        }
        
        
      })
      .catch(error => {
        // Fehlerbehandlung, falls in der Promise-Kette ein Fehler auftritt
        console.error('Fehler beim Abrufen der Daten:', error);
      });
};