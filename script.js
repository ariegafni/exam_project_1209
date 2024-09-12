const inputName = document.querySelector('#inputName'); 
const inputRank = document.querySelector('#inputRank'); 
const inputPosison = document.querySelector('#inputPosison'); 
const inputplatoon = document.querySelector('#inputplatoon'); 
const inputTime = document.querySelector('#inputTime'); 
const Activ = document.querySelector('#Activ'); 

const addPersonnelBTN = document.querySelector('#addPersonnelBTN');
const table = document.querySelector('#table'); 
const tbody = document.querySelector("#tbody"); 


addPersonnelBTN.addEventListener('click', function() {
    const tr = document.createElement('tr');
    
    
    const nameTD = document.createElement('td');
    const rankTD = document.createElement('td');
    const positionTD = document.createElement('td');
    const platoonTD = document.createElement('td');
    const timeTD = document.createElement('td');
    const statusTD = document.createElement('td');
    const actionsTD = document.createElement('td');

    
    const deleteBTN = document.createElement('button');
    deleteBTN.className = 'deleteBTN';
    deleteBTN.textContent = 'delete';

    const updateBTN = document.createElement('button');
    updateBTN.className = 'updateBTN';
    updateBTN.textContent = 'update';

    const missionBTN = document.createElement('button');
    missionBTN.className = 'missionBTN';
    missionBTN.textContent = ' mission on';

    
    nameTD.textContent = inputName;
    rankTD.textContent = inputRank;
    positionTD.textContent = inputPosison;
    platoonTD.textContent = inputplatoon;
    timeTD.textContent = inputTime;
    statusTD.textContent = Activ;

    
    actionsTD.appendChild(deleteBTN);
    actionsTD.appendChild(updateBTN);
    actionsTD.appendChild(missionBTN);

    
    tr.appendChild(nameTD);
    tr.appendChild(rankTD);
    tr.appendChild(positionTD);
    tr.appendChild(platoonTD);
    tr.appendChild(timeTD);
    tr.appendChild(statusTD);
    tr.appendChild(actionsTD);

   
    tbody.appendChild(tr);


    
    
    saveSoldierData();
    
 
    deleteBTN.addEventListener('click', () => deleteRow(tr));
    updateBTN.addEventListener('click', () => updateRow(tr));
    missionBTN.addEventListener('click', () => startMission(missionBTN, inputTime.value));
});


function saveSoldierData() {
    const soldiers = [];
    const rows = tbody.querySelectorAll('tr');
    
    rows.forEach(row => {
        const soldier = {
            name: row.cells[0].textContent,
            rank: row.cells[1].textContent,
            position: row.cells[2].textContent,
            platoon: row.cells[3].textContent,
            time: row.cells[4].textContent,
            status: row.cells[5].textContent
        };
        soldiers.push(soldier);
    });
    
    localStorage.setItem('soldiers', JSON.stringify(soldiers));
}


function loadSoldierData() {
    const soldiers = JSON.parse(localStorage.getItem('soldiers')) || [];
    
    soldiers.forEach(soldier => {
        const tr = document.createElement('tr');
        
        const nameTD = document.createElement('td');
        const rankTD = document.createElement('td');
        const positionTD = document.createElement('td');
        const platoonTD = document.createElement('td');
        const timeTD = document.createElement('td');
        const statusTD = document.createElement('td');
        const actionsTD = document.createElement('td');

        
        const deleteBTN = document.createElement('button');
        deleteBTN.className = 'deleteBTN';
        deleteBTN.textContent = 'מחק';

        const updateBTN = document.createElement('button');
        updateBTN.className = 'updateBTN';
        updateBTN.textContent = 'עדכן';

        const missionBTN = document.createElement('button');
        missionBTN.className = 'missionBTN';
        missionBTN.textContent = 'הפעל משימה';

        nameTD.textContent = soldier.name;
        rankTD.textContent = soldier.rank;
        positionTD.textContent = soldier.position;
        platoonTD.textContent = soldier.platoon;
        timeTD.textContent = soldier.time;
        statusTD.textContent = soldier.status;

        actionsTD.appendChild(deleteBTN);
        actionsTD.appendChild(updateBTN);
        actionsTD.appendChild(missionBTN);

        tr.appendChild(nameTD);
        tr.appendChild(rankTD);
        tr.appendChild(positionTD);
        tr.appendChild(platoonTD);
        tr.appendChild(timeTD);
        tr.appendChild(statusTD);
        tr.appendChild(actionsTD);

        tbody.appendChild(tr);

        
        deleteBTN.addEventListener('click', () => deleteRow(tr));
        updateBTN.addEventListener('click', () => updateRow(tr));
        missionBTN.addEventListener('click', () => startMission(missionBTN, soldier.time));
    });
}


window.onload = loadSoldierData;


function deleteRow(row) {
    tbody.removeChild(row);
    saveSoldierData(); 
}

function updateRow(row) {
    
}


function startMission(button, time) {
    button.textContent = 'Mission In Progress (${time}s);'
    let countdown = parseInt(time, 10);
    
    const timer = setInterval(() => {
        countdown--;
        button.textContent = 'Mission In Progress (${countdown}s);'
        if (countdown <= 0) {
            clearInterval(timer);
            button.textContent = 'Mission Completed';
        }
    }, 1000);
}