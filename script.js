const container = document.querySelector("#main-container")
console.log(container.innerHTML)
const runesMap = {
    1: 200,
    2: 400,
    3: 800,
    4: 1200,
    5: 1600,
    6: 2000,
    7: 2500,
    8: 3000,
    9: 3800,
    10: 5000,
    11: 6200,
    12: 7500
}
let runesAmount = {}

for(let runeIdCount in runesMap){
    runesAmount[runeIdCount] = 0
    container.insertAdjacentHTML("beforeend", `<div class="item">
        Golden Rune [${runeIdCount}] (Value: ${runesMap[runeIdCount]})
        Count:
        <input id='input-count-${runeIdCount}' type='number' value=0 min=0></input>
        Total:
        <input id='input-total-${runeIdCount}'  type='number' value=0 step=${runesMap[runeIdCount]} min=0></input>
        <button id='button-rune-${runeIdCount}-plus'>+</button>
        <button id='button-rune-${runeIdCount}-minus'>-</button>
    </div>`)
    document.querySelector(`#button-rune-${runeIdCount}-plus`).addEventListener("click", function(){
        runesAmount[runeIdCount] += runesMap[runeIdCount]
        document.querySelector(`#input-count-${runeIdCount}`).value = runesAmount[runeIdCount]/runesMap[runeIdCount]
        document.querySelector(`#input-total-${runeIdCount}`).value = runesAmount[runeIdCount]
        document.querySelector("#total-runes").innerHTML = calcRunes()
    })
    document.querySelector(`#button-rune-${runeIdCount}-minus`).addEventListener("click", function(){
        
        if(runesAmount[runeIdCount] > 0){
            runesAmount[runeIdCount] -= runesMap[runeIdCount]
            document.querySelector(`#input-count-${runeIdCount}`).value = runesAmount[runeIdCount]/runesMap[runeIdCount]
            document.querySelector(`#input-total-${runeIdCount}`).value = runesAmount[runeIdCount]
            document.querySelector("#total-runes").innerHTML = calcRunes()

        }
    })
    document.querySelector(`#input-count-${runeIdCount}`).addEventListener('input', (event)=>{
        runesAmount[runeIdCount] = runesMap[runeIdCount]*event.target.value
        document.querySelector(`#input-total-${runeIdCount}`).value = runesAmount[runeIdCount]
        document.querySelector("#total-runes").innerHTML = calcRunes()
    })
    document.querySelector(`#input-total-${runeIdCount}`).addEventListener('input', (event)=>{
        runesAmount[runeIdCount] = parseInt(event.target.value)
        document.querySelector(`#input-count-${runeIdCount}`).value = runesAmount[runeIdCount]/runesMap[runeIdCount]
        console.log(runesAmount)
        document.querySelector("#total-runes").innerHTML = calcRunes()
    })
}

function calcRunes(){
    let totalRunes = 0
    for (let item in runesAmount) {
        totalRunes += runesAmount[item]
        
    }
    return totalRunes
}
