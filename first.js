let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let turnO = true;
let count = 0;
let inputOrder = []; 

const winPattern = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

// Reset game function
const resetGame = () => {
    turnO = true;
    count = 0;
    inputOrder = []; // Reset the input order
    enableBoxes();
    msgContainer.classList.add("hide");
};

// Handle player moves
boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        if (box.innerText !== "") return; // Prevent overwriting a filled box

        // Place O or X in the clicked box
        
        if (turnO) {
            box.innerText = "O";
            box.style.color = "#0085F0"; // Set text color to blue for O
        } else {
            box.innerText = "X";
            box.style.color = "red"; // Set text color to red for X
        }

        turnO = !turnO; // Alternate turns
        box.disabled = true;
        inputOrder.push(index); // Track the move order
        count++;

        // Check for a winner before removing any symbol
        if (checkWinner()) {
            return; // Stop further execution if there's a winner
        }

        // Remove the first element when the seventh move is entered
        if (count > 6) {
            const oldestIndex = inputOrder.shift(); // Get and remove the oldest move
            boxes[oldestIndex].innerText = ""; // Clear the box
            boxes[oldestIndex].disabled = false; // Re-enable the box
            count--; // Adjust count
        }

        // Check for a winner again after potential removal
        if (checkWinner()) {
            return;
        }

        // If the game is a draw, show the draw message
        if (count === 9) {
            showDraw();
        }
    });
});

// Disable all boxes (when the game ends)
const disableBox = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
};

// Enable all boxes (resetting the game)
const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";

    }
};

// Show winner message
const showWinner = (winner) => {
    msg.innerText = `Winner is ${winner}`;
    msgContainer.classList.remove("hide"); // Make the message container visible
    disableBox(); // Disable all boxes to prevent further moves
};


// Check for winner based on the predefined winning patterns
const checkWinner = () => {
    for (let pattern of winPattern) {
        let pos1val = boxes[pattern[0]].innerText;
        let pos2val = boxes[pattern[1]].innerText;
        let pos3val = boxes[pattern[2]].innerText;

        if (pos1val !== "" && pos2val !== "" && pos3val !== "") {
            if (pos1val === pos2val && pos2val === pos3val) {
                showWinner(pos1val); // Declare the winner
                return true;
            }
        }
    }
    return false;
};

// Reset button event listener
resetBtn.addEventListener("click", resetGame);
