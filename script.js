// 1. importere div og bilde, og mappe keys
// 2. eventlistener for keypress
// 3. main movement function for keypress (bruker resultat fra steg 2)
// 4. bevegelseslogikk for keypress (1 function per retning)
// 5. eventlistener for click
// ---------------------------------------------------------------------------------------------

// 1 - setup
// ---------
const square = document.getElementById('square');
const img = document.getElementById('img');

const keyMap = {                              // objekt med spesifikke taster som keys-
    w: false, ArrowUp: false,                 // -og boolean false som values by default-
    a: false, ArrowLeft: false,               // -for å gjøre eventlistener sekvensen indirekte-
    s: false, ArrowDown: false,               // -sånn at å holde nede en tast ikke gir delay
    d: false, ArrowRight: false
}
// ---------------------------------------------------------------------------------------------

// 2 - keydown/keyup events
// ------------------------
document.addEventListener('keydown', (e) => {   // eventlistener med knappetrykk
    if (e.key in keyMap) {                      // sjekker om keyen matcher noe inni keyMap
        keyMap[e.key] = true;                   // "aktiverer" den keyen sin keyMap boolean
    }
})
document.addEventListener('keyup', (e) => {     // eventlistener med knappeslipp
    if (e.key in keyMap) {                      // sjekker om keyen matcher noe inni keyMap
        keyMap[e.key] = false;                  // gjør den false igjen i keyMap når man slipper
    }
})
// ---------------------------------------------------------------------------------------------

// 3 - main function for keybased movement
// ---------------------------------------
function keyMovement() {                        // main function for all bevegelse
    if (keyMap.w || keyMap.ArrowUp) {           // sjekker om w/up er toggled true i keyMap
        moveUp();                               // kjører up-movement funksjonen fra steg 4
    }
    if (keyMap.a || keyMap.ArrowLeft) {
        moveLeft();
    }
    if (keyMap.s || keyMap.ArrowDown) {
        moveDown();
    }
    if (keyMap.d || keyMap.ArrowRight) {
        moveRight();
    }
    requestAnimationFrame(keyMovement);         // kjører funksjon på nytt hver refresh
}

keyMovement();      // kjører keyMovement fra start så den alltid sjekker keyMap
// ---------------------------------------------------------------------------------------------

// 4 - directional logic
// ---------------------
let x = 50;                         // top og left er satt i prosent, derfor er default 50
let y = 50;                         // y for top verdi og x for left verdi

function moveUp() {
    if (y >= 1) {                   // forhindrer posisjonen å gå under 0% i høyden
        y -= 1                      // endrer prosentverdien med 1 per klikk
    }
    img.style.top = y + '%';        // oppdaterer "top" til den nye y verdien
}
function moveLeft() {
    if (x >= 1) {                   // forhindrer posisjonen å gå under 0% i bredden
        x -= 1
    }
    img.style.left = x + '%';
}
function moveDown() {
    if (y <= 99) {                  // forhindrer posisjonen å gå over 100% i høyden
        y += 1
    }
    img.style.top = y + '%';
}
function moveRight() {
    if (x <= 99) {                  // forhindrer posisjonen å gå over 100% i bredden
        x += 1
    }
    img.style.left = x + '%';
}
// ---------------------------------------------------------------------------------------------

// 5 - click event
// ---------------
square.addEventListener('click', (e) => {
    img.classList.add('click-animation');     // adder class for animasjon

    x = (e.offsetX / 550) * 100;            // e.offsetX gir klikkets horisontale posisjon
    y = (e.offsetY / 550) * 100;            // matte med square sin px-størrelse for å få %

    if (x <= 0) {x = 1};                    // redefinerer verdiene som er utenfor grensa
    if (x >= 100) {x = 99}
    if (y <= 0) {y = 1};
    if (y >= 100) {y = 99}

    img.style.left = x + '%';                 // bruker nye x og y til å oppdatere posisjonen
    img.style.top = y + '%';                
   
    setTimeout(() => {                              // setter delay
        img.classList.remove('click-animation');    // fjerner classen etter delay
    }, 100);                                        // 100ms er lengden på animasjonen
})