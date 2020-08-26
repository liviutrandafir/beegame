import './scss/style.scss';

// DOM Elements
const startButton = document.getElementById('start-button');
const queenElement = document.getElementById('queen-element');
const workersElement = document.getElementById('workers-element');
const dronesElement = document.getElementById('drones-element');
const workersNr = document.getElementById('workers-number');
const dronesNr = document.getElementById('drones-number');
const workerPercentage = document.getElementById('workers-percentage');
const dronesPercentage = document.getElementById('drones-percentage');
const queenPercentage = document.getElementById('queen-percentage');

// Default swarm values
let swarm = [
    {
        id: '1',
        type: 'queen',
        hp: 100,
    },
    {
        id: '2',
        type: 'worker',
        hp: 75,
    },
    {
        id: '3',
        type: 'worker',
        hp: 75,
    },
    {
        id: '4',
        type: 'worker',
        hp: 75,
    },
    {
        id: '5',
        type: 'worker',
        hp: 75,
    },
    {
        id: '6',
        type: 'worker',
        hp: 75,
    },
    {
        id: '7',
        type: 'drone',
        hp: 50,
    },
    {
        id: '8',
        type: 'drone',
        hp: 50,
    },
    {
        id: '9',
        type: 'drone',
        hp: 50,
    },
    {
        id: '10',
        type: 'drone',
        hp: 50,
    },
    {
        id: '11',
        type: 'drone',
        hp: 50,
    },
    {
        id: '12',
        type: 'drone',
        hp: 50,
    },
    {
        id: '13',
        type: 'drone',
        hp: 50,
    },
    {
        id: '14',
        type: 'drone',
        hp: 50,
    },
];
let workerBees = swarm.filter(bee => bee.type === 'worker');
let droneBees = swarm.filter(bee => bee.type === 'drone');

// Reset default values
let resetGame = () => {
    swarm = [
        {
            id: '1',
            type: 'queen',
            hp: 100,
        },
        {
            id: '2',
            type: 'worker',
            hp: 75,
        },
        {
            id: '3',
            type: 'worker',
            hp: 75,
        },
        {
            id: '4',
            type: 'worker',
            hp: 75,
        },
        {
            id: '5',
            type: 'worker',
            hp: 75,
        },
        {
            id: '6',
            type: 'worker',
            hp: 75,
        },
        {
            id: '7',
            type: 'drone',
            hp: 50,
        },
        {
            id: '8',
            type: 'drone',
            hp: 50,
        },
        {
            id: '9',
            type: 'drone',
            hp: 50,
        },
        {
            id: '10',
            type: 'drone',
            hp: 50,
        },
        {
            id: '11',
            type: 'drone',
            hp: 50,
        },
        {
            id: '12',
            type: 'drone',
            hp: 50,
        },
        {
            id: '13',
            type: 'drone',
            hp: 50,
        },
        {
            id: '14',
            type: 'drone',
            hp: 50,
        },
    ];
    workerBees = swarm.filter(bee => bee.type === 'worker');
    droneBees = swarm.filter(bee => bee.type === 'drone');
    displayInfo();
}

// Calculate and update life percentage of each bee type
let updatePercentage = (type, domElem, initialLength, lifePoints) => {
    let hpCurrent = type.reduce((total, bee) => {
        return total + bee.hp;
    }, 0);

    let hpTotal = initialLength * lifePoints;
    domElem.innerText = (hpCurrent * 100 / hpTotal).toFixed(0) + '%';
}

// Calculates the damage taken by a bee selected randomly
let damage = () => {
    // Random select a bee from the object
    var damagedBee = swarm[Math.floor(Math.random() * swarm.length)];

    // Update each specific bee HP by type
    if (swarm.length > 2) {
        // If the affected bee is the queen
        if (damagedBee.type === 'queen') {
            damagedBee.hp -= 8;
            queenElement.classList.add('shake-element');
            setTimeout(function() {
                queenElement.classList.remove('shake-element');
            }, 200);
            if (damagedBee.hp < 1) {
                alert('Queen\'s Dead! Game over!');
                resetGame();
            }
        }
        // If the affected bee is a worker
        else if (damagedBee.type === 'worker') {
            damagedBee.hp -= 10;
            workersElement.classList.add('shake-element');
            setTimeout(function() {
                workersElement.classList.remove('shake-element');
            }, 200);
            if (damagedBee.hp < 1) {
                swarm.splice(swarm.indexOf(damagedBee), 1);
                workerBees = swarm.filter(bee => bee.type === 'worker');
            }
        }
        // If the affected bee is a drone
        else if (damagedBee.type === 'drone') {
            damagedBee.hp -= 12;
            dronesElement.classList.add('shake-element');
            setTimeout(function() {
                dronesElement.classList.remove('shake-element');
            }, 200);
            if (damagedBee.hp < 1) {
                swarm.splice(swarm.indexOf(damagedBee), 1);
                droneBees = swarm.filter(bee => bee.type === 'drone');
            }
        }
    } else {
        alert('No more bees! Game Over!');
        resetGame();
    }
}

let displayInfo = () => {
    workersNr.innerText = workerBees.length;
    dronesNr.innerText = droneBees.length;
    queenPercentage.innerText = swarm[0].hp + '%';
}

let workerInitalLength = workerBees.length;
let droneInitalLength = droneBees.length;
updatePercentage(workerBees, workerPercentage, workerInitalLength, 75);
updatePercentage(droneBees, dronesPercentage, droneInitalLength, 50);
displayInfo();

// When we click the "Hit" button
startButton.onclick = () => {
    damage();
    updatePercentage(workerBees, workerPercentage, workerInitalLength, 75);
    updatePercentage(droneBees, dronesPercentage, droneInitalLength, 50);
    queenPercentage.innerText = swarm[0].hp + '%';
    displayInfo();
}