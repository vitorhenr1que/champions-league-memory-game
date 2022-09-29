
const grid = document.querySelector('.card-container')

const teams = [
    "barcelona",
    "liverpool",
    "atleticomadrid",
    "juventus",
    "bayern",
    "psg",
    "realmadrid",
    "mancity",
    "chelsea",
    "ajax"
]

const createElement = (tag, classe) => {
    const element = document.createElement(tag);
    element.className = classe
    return element
}

let firstTeam = ''
let secondTeam = ''


// Verificar Jogo Concluído
const checkEndGame = () => {
    const disabledCards = document.querySelectorAll('.disable-card')
    if(disabledCards.length === 20) {
        
        setTimeout(() => {
            modalItems.forEach((element) => {
                    element.style.display = 'block'
                })
                toogleModal()
        }, 700)
    }
}

// Verificar combinações das cartas
const checkCards = () => {
    const firstCard = firstTeam.getAttribute('data-team')
    const secondCard = secondTeam.getAttribute('data-team')

    if(firstCard === secondCard){
        firstTeam.firstChild.classList.add('disable-card')
        secondTeam.firstChild.classList.add('disable-card')
            firstTeam = ''
            secondTeam = ''

            checkEndGame()
    } 
    else {
        setTimeout(()=>{
            firstTeam.classList.remove('reveal-card')
            secondTeam.classList.remove('reveal-card')

            firstTeam = ''
            secondTeam = ''
        }, 500)
        
    }
}

//Revelar Carta
const revealCard = ({target}) => {


if (target.parentNode.className.includes('reveal-card')){ 
    return ;
}

if (firstTeam === ''){
target.parentNode.classList.add('reveal-card')
firstTeam = target.parentNode
}
else if (secondTeam === ''){
    target.parentNode.classList.add('reveal-card')
    secondTeam = target.parentNode
    checkCards()
}





}
//Criar Cartas
const createCard = (team) => {
   
    const card = createElement('div', 'card')
    const front = createElement('div', 'face front')
    const back = createElement('div', 'face back')
    front.style.backgroundImage = `url(../assets/images/${team}.png)`
    back.style.backgroundImage = `url(../assets/images/back.png)`
    card.setAttribute('data-team', team)
    card.addEventListener('click', revealCard)

    card.appendChild(front)
    card.appendChild(back)
   

    return card
}



let duplicateTeams;
let shufflyTeams;

const restartGame = () => {
    let pegarCard = document.querySelectorAll('.card')
    for (let i = 0; i < pegarCard.length; i++){
        pegarCard[i].remove()
    }

    modalItems.map((element) => {
        element.style.display = 'none'
    })

    firstTeam = ''
    secondTeam = ''
    duplicateTeams = []
    shufflyTeams = []

    loadGame()
}

const loadGame = () => {
 
    duplicateTeams = [...teams, ...teams]
    shufflyTeams = duplicateTeams.sort(() => Math.random() - 0.5)
    shufflyTeams.map((team) => {
        console.log(team)
        grid.appendChild(createCard(team))
    })
}


loadGame()


// Modal End-Game
const closeModal = document.querySelector('.close-modal')
const modal = document.querySelector("#modal")
const fade = document.querySelector('#fade')
const modalItems = [fade, modal]
const modalit = document.querySelectorAll('.hide')
const restart = document.querySelector('.restart')

restart.addEventListener('click', () => {
    modalItems.map(element => {
        element.classList.add('hide')
        element.style.display = "none"
    })
    
    restartGame()
})

closeModal.addEventListener('click', ()=> modalItems.map(el => {
    el.style.display = 'none'
}))
const toogleModal = () => {
    modal.classList.toggle("hide")
    fade.classList.toggle("hide")
}