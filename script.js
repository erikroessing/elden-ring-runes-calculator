const container = document.querySelector("#main-container")
const runesMap = {
    "Golden-1": 200,
    "Golden-2": 400,
    "Golden-3": 800,
    "Golden-4": 1200,
    "Golden-5": 1600,
    "Golden-6": 2000,
    "Golden-7": 2500,
    "Golden-8": 3000,
    "Golden-9": 3800,
    "Golden-10": 5000,
    "Golden-11": 6200,
    "Golden-12": 7500,
    "Golden-13": 10000,
    "Numen-": 12500,
    "Hero-1": 15000,
    "Hero-2": 20000,
    "Hero-3": 25000,
    "Hero-4": 30000,
    "Hero-5": 35000,
    "Lord-1": 50000,
    "Huebert-": 75000
}
let runesAmount = {}

for(let runeId in runesMap){
    const runeNameList = runeId.split("-")
    let runeName = ""
    if(runeNameList[0] == "Hero" || runeNameList[0] == "Lord"){
        runeName = runeNameList[0] + "\'s" + " Rune " + "["+runeNameList[1] + "]"
    }
    else if(runeNameList[0] == "Numen" || runeNameList[0] == "Huebert"){
        runeName = runeNameList[0] + "\'s" + " Rune "
    }
    else{
        runeName = runeNameList[0] + " Rune " + "["+runeNameList[1] + "]"
    }
    runesAmount[runeName] = 0

    container.insertAdjacentHTML("beforeend", `<div class="item-rune">
        ${runeName} (Value: ${runesMap[runeId]})
        Count:
        <input id='input-count-${runeId}' type='number' value=0 min=0></input>
        Total:
        <input id='input-total-${runeId}'  type='number' value=0 step=${runesMap[runeId]} min=0></input>
        <button id='button-rune-${runeId}-plus'>+</button>
        <button id='button-rune-${runeId}-minus'>-</button>
    </div>`)

    document.querySelector(`#button-rune-${runeId}-plus`).addEventListener("click", function(){
        runesAmount[runeName] += runesMap[runeId]
        buttonDocumentChanges(runeId, runeName)
    })

    document.querySelector(`#button-rune-${runeId}-minus`).addEventListener("click", function(){
        if(runesAmount[runeName] > 0){
            runesAmount[runeName] -= runesMap[runeId]
            buttonDocumentChanges(runeId, runeName)
        }
    })

    document.querySelector(`#input-count-${runeId}`).addEventListener('input', (event)=>{
        runesAmount[runeName] = runesMap[runeId]*event.target.value
        document.querySelector(`#input-total-${runeId}`).value = runesAmount[runeName]
        document.querySelector("#total-runes").innerHTML = getTotalRunes()
        document.querySelector('#runes-indicator-container').innerHTML = getRunes()
    })

    document.querySelector(`#input-total-${runeId}`).addEventListener('input', (event)=>{
        runesAmount[runeName] = parseInt(event.target.value)
        document.querySelector(`#input-count-${runeId}`).value = runesAmount[runeName]/runesMap[runeId]
        document.querySelector("#total-runes").innerHTML = getTotalRunes()
        document.querySelector('#runes-indicator-container').innerHTML = getRunes()
    })
}


function buttonDocumentChanges(runeId, runeName){
    document.querySelector(`#input-count-${runeId}`).value = runesAmount[runeName]/runesMap[runeId]
    document.querySelector(`#input-total-${runeId}`).value = runesAmount[runeName]
    document.querySelector("#total-runes").innerHTML = getTotalRunes()
    document.querySelector('#runes-indicator-container').innerHTML = getRunes()
}

function getTotalRunes(){
    let totalRunes = 0
    for (let item in runesAmount) {
        totalRunes += runesAmount[item]   
    }
    return totalRunes
}

function getRunes(){
    const runes = Object.fromEntries(Object.entries(runesAmount).filter(([key, value]) => value > 0))
    let returnString = ""
    for(key in runes){
        returnString += ` ${key} = ${runes[key]},`
    }
    return returnString.slice(0, -1) + '.'
}
