

let sidebar = document.getElementById('sidebar');
const gridContainer = document.querySelector('.grid-container');

let sidebarOpen = false;



let sideElemntList = ["hub","overview"]


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
        console.log("Id gibt es nicht " + element)
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

showElement("hub");

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



document.getElementById('back').addEventListener('click',function(e) {
    e.preventDefault();
    const tableContainer = document.getElementById('table-c');
    tableContainer.style.display = 'none' ;
});






