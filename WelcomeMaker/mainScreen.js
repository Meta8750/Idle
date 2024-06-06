class Data {
    
    constructor (){
        this.namesArray = [];
    }
    
    

    setNamesArray(name) {
        this.namesArray.push(name[0]);
        
    }

    deletNames() {
        this.namesArray = [];
    }
   

}

dataArray = new Data();

let counter = 0;

function extractNames() {
    
    const namesInput = document.getElementById('names').value;
    input = namesInput.split(',').map(name => name.trim());
    dataArray.setNamesArray(input);

}



function deletNames() {
    dataArray.deletNames();
}

function sqlData(type) {
    
    let date = []
    date.push(document.getElementById('fromDate').value);
    date.push(document.getElementById('toDate').value);

    let jsonData = {};

            // Hole alle Input-Felder mit der Klasse 'myInput'
            let inputFields = document.querySelectorAll('.input');
            
            // Iteriere über die Input-Felder und füge die Eingaben zum Array hinzu
            inputFields.forEach(function(input) {
                
                let value = input.value.trim();
                if  (input.type === 'checkbox') {
                    if (input.checked) {
                        let attribute = input.id;
                        jsonData[attribute] = value;
                    }
                } else {
                if (value !== '') { // Überprüfe, ob das Feld nicht leer ist
                    let attribute = input.id; // Platzhaltertext des Feldes
                    jsonData[attribute] = value; // Füge das Paar 'Platzhaltertext: Wert' zum Array hinzu
                }
            }});
    jsonData['name'] = dataArray.namesArray
    jsonData['type'] = type;
    jsonData['date'] = date
    
    let dataObj = JSON.stringify(jsonData);
    console.log(dataObj)
    
    if (type === 'add' | type === 'addNameLater' | type === 'deleteNameLater') {
        
        add_data(dataObj);
    }
    else if (type === 'select' | type === 'randomPic') {
        readData(dataObj);
    } else if (type === 'delete') {
        readData(dataObj);
    }
    
};

function updateFileList() {
    

    const nameListLabel = document.getElementById('nameList');
    nameListLabel.innerHTML = ''; // Leere die Dateiliste, um sie zu aktualisieren

    if (counter >= 100) {
        sqlData('randomPic')
        counter = 0;

   } else {
    counter++;
    console.log(counter)
   }

    sqlData('select')

            dataArray.namesArray.forEach(file => {
                const listItem = document.createElement('li');
                listItem.textContent = file;
                nameListLabel.appendChild(listItem);
            
            });
            

}

const add_data = (sql_query) => {
    return fetch(`http://192.100.100.30:8080/api/daten?variable=${sql_query}`)
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

const readData = (sql_query) => {
    return fetch(`http://192.100.100.30:8080/api/daten?variable=${sql_query}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        
        data = JSON.parse(data)

        let curentDate = new Date();
       
        let columns = Object.keys(data)
    
        // Referenz zum HTML-Element, in das die Daten eingefügt werden sollen
        const tableContainer = document.getElementById('sqlTable');
        tableContainer.style.display = 'flex';
        tableContainer.innerHTML = ''; // Leere die Dateiliste, um sie zu aktualisieren

        for (let i = 0; i < columns.length; i++){
            
            let label = document.createElement('label');
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
                    li.style.backgroundColor = "white";
                    counter += 1;
                } 
                else {
                    counter = 0;
                    li.style.backgroundColor = "#DDE5ED";
                }
               
                if (columns[i] === "von" || columns[i] === "bis"){

                    if (value <= curentDate.getTime()){
                        li.style.backgroundColor = 'rgb(29, 248, 0)';
                    }
                    value = new Date(value);
                    value =  value.toLocaleString('de-DE', { timeZone: 'UTC' });
                    

                    
                    
                }
                li.textContent = `${value}`; // Anzeige der Daten im Format "Index: Wert"
                // Füge das li-Element zur ul-Liste hinzu

                ul.appendChild(li);
        });
        

        // Füge die ul-Liste zum HTML-Element hinzu
        tableContainer.appendChild(ul);
        
}})
      
      .catch(error => {
        console.error('Fehler:', error);
        throw error; // Wird das Error-Objekt weiter werfen, damit es von anderen Promise-Ketten behandelt werden kann
      });

    }
