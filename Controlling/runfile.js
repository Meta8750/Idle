
let timeList = [];
let xValues = [];
let yValues = [];
 

let myChart =  new Chart("timeChart", {
    type: "line",
    data: {
      labels: timeList,
      datasets: [{
        fill: false,
        lineTension: 0,
        backgroundColor: "rgba(0,0,255,1.0)",
        borderColor: "rgba(0,0,255,0.1)",
        data: yValues
      }]
    },
    options: {
      legend: {display: false},
      scales: {
        yAxes: [{ticks: {min: 0, max:10}}],
      }
    }
  });


document.getElementById('fill').addEventListener('click', () => {
    fetch('http://cn:3000/runfile?variable=fill')
        .then(response => response.text())
        .then(data => {
                console.log(data);
                
    });
});

document.getElementById('add').addEventListener('click', () => {
    fetch('http://cn:3000/runfile?variable=add')
        .then(response => response.text())
        .then(data => {
                console.log(data);
    });
});



function checkProcessStatus() {
    fetch('http://cn:3000/runfile?')
        .then(response => response.text())
        .then(message => {
            
            console.log(message);
            let p_fill = document.getElementById('p-fill')
            let p_add = document.getElementById('p-add')
            // statusElement.textContent = message;
            let regex = /\d+\.\d+/g;
            let matches = message.match(regex);
            if (matches) {
            timeList.push(matches)
            yValues.push(timeList.length)
            }
           
            myChart.data.labels = yValues; // Aktualisieren der x-Werte
            myChart.data.datasets[0].data =  timeList; // Aktualisieren der y-Werte 
            myChart.update(); // Chart aktualisieren
            

          
            if (message.includes('fill')) {
                
                p_fill.style.backgroundColor = 'green';
                
            } else {
                p_fill.style.backgroundColor= 'red';
            }
                if (message.includes('add')) {
                p_add.style.backgroundColor = 'green';
                
            } else {
                p_add.style.backgroundColor= 'red';
            }
        
        
        
    })
        .catch(error => console.error(error));
}
    

// Aktualisieren des Prozessstatus beim Laden der Seite und in regelmäßigen Abständen
document.addEventListener('DOMContentLoaded', () => {
    checkProcessStatus(); // Status beim Laden der Seite abrufen
    setInterval(checkProcessStatus, 6000); // Status alle 5 Sekunden aktualisieren
});

