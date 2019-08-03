const bump = document.getElementById('bump');
let stateOfUser = 100;
let stateOfComputer = 100;
let round = 1;
let pointerPlayer = 0;
let pointerComputer = 0;

window.onload = () => {
    changeStates();
    if (!localStorage.getItem('pointerPlayer') && !localStorage.getItem('pointerComputer')) {
        localStorage.setItem('pointerPlayer',pointerPlayer);
        localStorage.setItem('pointerComputer',pointerComputer);
    }
    document.querySelector('.user h3').textContent = `Player : ${localStorage.getItem('pointerPlayer')}`;
    document.querySelector('.computer h3').textContent = `Computer : ${localStorage.getItem('pointerComputer')}`
}

document.getElementById('continue').addEventListener('click',() => {
    localStorage.setItem('pointerPlayer',pointerPlayer + +localStorage.getItem('pointerPlayer'));
    localStorage.setItem('pointerComputer',pointerComputer + +localStorage.getItem('pointerComputer'));
    window.location = 'index.html';
});

bump.addEventListener('click',() => {
    var jumper = document.querySelector('#jumper_player');
    var position = Math.round(+getComputedStyle(jumper).left.replace('px',''));
    if (jumper.style.display != 'none') {
        indicator(position,'computer');
        health(stateOfComputer,'bot');
        changeStates();
        checkCurrentState()
    } else {
        return false
    }
});

function indicator(position,name){
    let size = +getComputedStyle(document.querySelector('.indicator')).width.replace('px','')/5;
    console.log(size)
    if (name == 'computer') {
        if (position < (size-8)) {
            console.log('bed');
            stateOfComputer -= 5;
        } else if(position >= (size-8) && position < (size*2) - 8) {
            console.log('Not bed');
            stateOfComputer -= 10;
        } else if (position >= (size*2)-8 && position < (size*3) - 8) {
            console.log('normal');
            stateOfComputer -= 15;
        } else if(position >= (size*3)-8 && position < (size*4) - 8) {
            console.log('good');
            stateOfComputer -= 20;
        } else if (position >= (size*4) - 8) {
            console.log('strong');
            stateOfComputer -= 30;
        }
    } else {
        if (position <= 50) {
            console.log('bed');
            stateOfUser -= 5;
        } else if(position > 50 && position <= 110) {
            console.log('Not bed');
            stateOfUser -= 10;
        } else if (position > 110 && position <= 170) {
            console.log('normal');
            stateOfUser -= 15;
        } else if(position > 170 && position <= 233) {
            console.log('good');
            stateOfUser -= 20;
        } else {
            console.log('strong');
            stateOfUser -= 30;
        }
    }
}
function health(state,name) {
    let object = document.getElementsByClassName(name)[0];
    if (state < 100 && state >= 90) {
        object.style.color = '#ffcccc'
    } else if (state < 90 && state >= 80 ) {
        object.style.color = '#ff6666';
    } else if (state < 80 && state >= 60) {
        object.style.color = '#ff4d4d';
        object.className = `${name} fas fa-meh`
    } else if (state < 60 && state >= 40) {
        object.style.color = '#ff1a1a';
        object.style.className = `${name} fas fa-angry`
    } else if (state < 40 && state > 10) {
        object.style.color = '#e60000';
        object.className = `${name} fas fa-tired`
    } else if (state == 0 || state < 0) {
        object.className = `${name} fas fa-sad-cry`;
        switch (name) {
            case 'player':
                alert('Winner is comp')
                break;
            case 'computer':
                    alert('Winner is user')
                    break;
        }
    }
    check(name);
}
function check(name) {
    if (name == 'bot') {
         botStart()
    }
}
function changeStates() {
    if (stateOfComputer <= 0) {
        document.getElementById('client').textContent = `State : ${stateOfUser}`;
        document.getElementById('comp').textContent = `State : 0`;
    } else if (stateOfUser <= 0) {
        document.getElementById('client').textContent = `State : 0`;
        document.getElementById('comp').textContent = `State : ${stateOfComputer}`;
    } else {
        document.getElementById('client').textContent = `State : ${stateOfUser}`;
        document.getElementById('comp').textContent = `State : ${stateOfComputer}`;
    }
}
function finish(user,comp) {
    if (user > comp) {
        let data = document.createElement('center');
        data.innerHTML = `
            <h2 style = 'color:green'>You win</h2>
            <i class="fas fa-user"></i>
            <p>Computer was not able win you</p>
        `
        document.querySelector('.modal').prepend(data);
        pointerPlayer ++;
    } else if (user == comp) {
        alert ('Ничья')
    } else  {
        let data = document.createElement('center');
        data.innerHTML = `
            <h2 style = 'color:green'>Computer win</h2>
            <i class="fas fa-desktop"></i>
            <p>You was not able win computer</p>
        `
        document.querySelector('.modal').prepend(data);
        pointerComputer ++;
    }
    document.querySelector('.modal').style.display = 'block';
    document.querySelector('.shadow').style.display = 'block';
}
function checkCurrentState() {
    if (stateOfUser <= 0 || stateOfComputer <=0 && getComputedStyle(document.querySelector('.modal')).display == 'none') {
        finish(stateOfUser,stateOfComputer)
    }
}
function botStart() {
    let jumper_bot = document.getElementById('jumper_bot');
    let jumper_player = document.getElementById('jumper_player');
    let time = String(((Math.random() * 4) + 1).toFixed(3)).split('.'); 
    jumper_player.style.display = 'none';
    jumper_bot.style.display = 'block';
    setTimeout(() => {
        let pos = Math.round(+getComputedStyle(jumper_bot).left.replace('px',''));
        jumper_player.style.display = 'block';
        jumper_bot.style.display = 'none';
        indicator(pos,'player');
        health(stateOfUser,'player');
        changeStates();
        checkCurrentState();
        round ++;
        document.getElementById('round').textContent =  `Round ${round}`      
        
    },Number(time[0] + time[1]))
}