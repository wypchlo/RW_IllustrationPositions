const dimensions = [1366, 768];
const hasRed = true;
const prefix = "cc_landscape - ";
const imgContainer = document.querySelector("#images");

const getPositionsFromTxt = (txt) => {
    let a = txt.split("\n");
    let b = [];
    for (let i = 0; i <= a.length; i++){
        if(a[i]) b.push(a[i].split(", ")); 
    }
    return b.reverse();
}

const positions = getPositionsFromTxt(textPositions); //variable from another script

for (let i = positions.length - 1; i >= 0; i--){
    const el = document.createElement("img");
    el.src = `assets/${prefix}${i + 1}.png`;
    imgContainer.appendChild(el);
    el.addEventListener("load", () => {
        el.style.marginLeft = `${positions[i][0]}px`;
        el.style.marginTop = `${dimensions[1] - el.naturalHeight / (2 * hasRed) - positions[i][1]}px`;
    })
}

imgContainer.style.width = `${dimensions[0]}px`;
imgContainer.style.height = `${dimensions[1]}px`;

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function test() {
    const focusLayer = getRandomInt(positions.length);
    for(let i = 0; i < positions.length; i++){
        imgContainer.children[i].style.filter = `blur(${Math.abs(focusLayer - i) * 3}px)`
    }
}

(function loop() {
    var rand = Math.round(Math.random() * (3000 - 500)) + 500;
    setTimeout(function() {
            test();
            loop();  
    }, rand);
}());

imgContainer.style.setProperty("transform", `scale(${document.body.offsetWidth / dimensions[0]})`)
