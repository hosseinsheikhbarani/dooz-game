
const items = document.querySelectorAll(".item")

let currentPlayer = 1
let playr1 = 0
let playr2 = 0
let btns = [
    { id: 1, user: 0, move: false },
    { id: 2, user: 0, move: false },
    { id: 3, user: 0, move: false },
    { id: 4, user: 0, move: false },
    { id: 5, user: 0, move: false },
    { id: 6, user: 0, move: false },
    { id: 7, user: 0, move: false },
    { id: 8, user: 0, move: false },
    { id: 9, user: 0, move: false },

]

const witn = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],

    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],

    [1, 5, 9],
    [3, 5, 7],
]

const isWined = () => { 
    let win = false;

    witn.forEach(w => {
        const p1 = btns.filter(b => b.user == 1).map(b => b.id);
        const p2 = btns.filter(b => b.user == 2).map(b => b.id);
        if (w.every(v => p1.includes(v))) {
            win = true;
            alert("قرمز برنده شد")
        }
        if (w.every(v => p2.includes(v))) {
            win = true;
            alert("آبی برنده شد")
        }
    })
    if (win) {
        btns = btns.map(b => { return { id: b.id, user: 0, move: false } })
        playr1 = 0;
        playr2 = 0;
        currentPlayer = 1;
        renderBtn()
    }
}
const renderBtn = () => {
    btns.forEach(b => {
        const btn = document.querySelector(`[data-id="${b.id}"]`);
        btn.classList.remove('move')
        btn.classList.remove('red')
        btn.classList.remove('blue')

        if (b.user == 1) {
            btn.classList.add('red')
        }

        if (b.user == 2) {
            btn.classList.add('blue');
        }

        if (b.move) {
            btn.classList.add('move')
        }
    })
}



items.forEach(item => {
    let nextPlayer = false;
    renderBtn()
    item.addEventListener("click", (e) => {
        nextPlayer = false
        let isAdd = true
        const id = e.target.getAttribute('data-id')
        btns.map((b, i) => {
            if (playr1 == 3 && currentPlayer == 1) isAdd = false
            if (playr2 == 3 && currentPlayer == 2) isAdd = false
            btns[i].move = false;
            if (isAdd && Number(b.id) == Number(id) && b.user == 0 && b.move == false) {
                btns[i].move = false;
                
                btns[i].user = currentPlayer;
                currentPlayer == 1 ? playr1++ : playr2++
                nextPlayer = true
            }
            if (!isAdd && Number(b.id) == Number(id) && b.user == currentPlayer) {
                btns[i].move = true;
                btns[i].user = 0;
                if (currentPlayer == 1) { playr1-- } else { playr2-- }

            }
        })
        renderBtn()
isWined()
        if (nextPlayer) {
            currentPlayer == 1 ? currentPlayer = 2 : currentPlayer = 1
        }

    })
})