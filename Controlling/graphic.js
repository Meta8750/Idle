let sidebar = document.getElementById('sidebar');
const gridContainer = document.querySelector('.grid-container');

let sidebarOpen = false;

orderByCount = 0;
orderBylist = [];

let sideElemntList = ["hub", "prozess", "settings", "sql", "sql_add"]

 

function openSidebar() {
    if(!sidebarOpen){
        sidebar.classList.add("sidebar-responsive");
        sidebarOpen = true;
    }
};

function closeSidebar(){
    if(sidebar){
        sidebar.classList.remove("sidebar-responsive");
        sidebarOpen = false;
    }
}

function hideElement(element) {
    
    let elementToHide = document.getElementById(element);
    if (elementToHide){
        elementToHide.style.display = 'none';
    
    } else {
        console.log("Id gibt es nicht" + element)
    }
}

function showElement(element) {
    
    let elementTo = document.getElementById(element);

    if (elementTo){
        elementTo.style.display = 'flex';
        for(let i = 0; i < sideElemntList.length; i++){
            let sideElement = sideElemntList[i];
            if (sideElement != element){
            hideElement(sideElement);
            }
        }
    
    } else {
        console.log("Id gibt es nicht" + element)
    }
}


sidebar.addEventListener('mouseover', () => {
    gridContainer.style.gridTemplateColumns = "250px 1fr 1fr 1fr";
    let activeList = document.querySelector('.sidebar-list-item.active');
    activeList.style.setProperty('--custom-left-value', '225px');
});

sidebar.addEventListener('mouseout', () => {
    gridContainer.style.gridTemplateColumns = "";
    let activeList = document.querySelector('.sidebar-list-item.active');
    activeList.style.setProperty('--custom-left-value', '55px');
});



document.getElementById('fill').addEventListener('click', () => {
    fetch('http://cn:3000/runfill?variable=fill')
        .then(response => response.text())
        .then(data => {
                console.log(data);
                
    });
});

document.getElementById('add').addEventListener('click', () => {
    fetch('http://cn:3000/runfill?variable=add')
        .then(response => response.text())
        .then(data => {
                console.log(data);
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const darkModeSwitch = document.getElementById('darkModeSwitch');

    darkModeSwitch.addEventListener('change', function () {
        document.body.classList.toggle('dark-mode', darkModeSwitch.checked);
    });
});

document.getElementById('back').addEventListener('click',function(e) {
    e.preventDefault();
    const tableContainer = document.getElementById('table-c');
    tableContainer.style.display = 'none' ;
});


function checkProcessStatus() {
    fetch('http://cn:3000/runfill?')
        .then(response => response.text())
        .then(message => {
            
            console.log(message);
            let p_fill = document.getElementById('p-fill')
            let p_add = document.getElementById('p-add')
            // statusElement.textContent = message;
          
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

