
function UpdateUserInterface(result, agentIndex) {
    var side = document.getElementById("SideToMove");
    var reset = document.getElementById("ResetButton");
    var start = document.getElementById("StartButton");
    var outside = document.getElementById("OutSideGoats");
    var status = document.getElementById("Status");
    var gameState = window.currentGameState;
    document.getElementById("MoveBackButton").disabled = (window.MoveHistory.Pointer < 2);
    document.getElementById("MoveForwardButton").disabled = (window.MoveHistory.InternalArray[window.MoveHistory.Pointer] == null);
    document.getElementById("MoveNowButton").disabled = window.currentGameState.SideToPlay != window.ComputerPlaysAs;
    window.selectedId = -1;
    for (var i = 0; i < gameState.CurrentPosition.length; i++) {
        img = document.getElementById(i);
        if (gameState.CurrentPosition[i] == 'G') {
            img.src = "images/Goat.png";
            img.class = "Goat";
        }
        else if (gameState.CurrentPosition[i] == 'T') {
            img.src = "images/Tiger.png";
            img.class = "Tiger";
        }
        else {
            img.src = "images/Empty.png";
            img.class = "Empty";
        }
    }
    outside.innerHTML = gameState.OutsideGoats;
    if (gameState.SideToPlay == 0)
        side.innerHTML = "Tigers";
    else
        side.innerHTML = "Goats";    
    if (gameState.Result == -1 && window.isInProgress) {
        status.innerHTML = "In Progress";
        document.getElementById("StopButton").disabled = false;
        document.getElementById("StartButton").disabled = true;
    }
    else {
        document.getElementById("StartButton").disabled = true;
        if (gameState.Result == 0)
            status.innerHTML = "Tigers Win!";
        else if (gameState.Result == 1)
            status.innerHTML = "Goats Win!";
        else if(gameState.Result == 2)
            status.innerHTML = "Draw";
        else {
            status.innerHTML = "Stopped";
            document.getElementById("TigersCurrentScore").innerHTML = "";
            document.getElementById("TigersCurrentDepth").innerHTML = "";
            document.getElementById("TigersCurrentAction").innerHTML = "";
            document.getElementById("TigersCurrentProgress").value = "";
            document.getElementById("TigersNodesExpanded").innerHTML = "";
            document.getElementById("TigersLeafNodesReached").innerHTML = "";

            document.getElementById("GoatsCurrentScore").innerHTML = "";
            document.getElementById("GoatsCurrentDepth").innerHTML = "";
            document.getElementById("GoatsCurrentAction").innerHTML = "";
            document.getElementById("GoatsCurrentProgress").value = "";
            document.getElementById("GoatsNodesExpanded").innerHTML = "";
            document.getElementById("GoatsLeafNodesReached").innerHTML = "";

            document.getElementById("ComputerSide").disabled = false;
            document.getElementById("StartButton").disabled = false;            
        }
        document.getElementById("StopButton").disabled = true;
    }
}
function ProcessUserInput(element) {
    if (window.isInProgress == true && window.ComputerPlaysAs != 2) {
        if (window.currentGameState.SideToPlay == 1 && window.computerPlaysAs == 0) {
            actions = window.currentGameState.getLegalActions();
            if (actions.length == 0) {
                declareVictory();
                return;
            }
            if (window.currentGameState.OutsideGoats > 0) {
                var isLegal = false;
                for (var i = 0; i < actions.length; i++)
                    if (actions[i].compare([-1, -1, element.id])) {
                        isLegal = true;
                        break;
                    }
                if (isLegal) {
                    window.currentGameState = window.currentGameState.generateSuccessor([-1, -1, element.id], window.MoveHistory);
                    window.MoveHistory.push(window.currentGameState);
                    window.MoveHistory.InternalArray[window.MoveHistory.Pointer] = null;
                    UpdateUserInterface(window.currentGameState);
                    setTimeout(function () { computerPlay(0) }, 500);
                }
            }
            else {
                if (element.class == "Goat")
                    window.selectedId = element.id;
                else if (element.class == "Empty") {
                    if (window.selectedId > -1) {
                        var isLegal = false;
                        for (var i = 0; i < actions.length; i++)
                            if (actions[i].compare([window.selectedId, -1, element.id])) {
                                isLegal = true;
                                break;
                            }
                        if (isLegal) {
                            window.currentGameState = window.currentGameState.generateSuccessor([window.selectedId, -1, element.id], window.MoveHistory);
                            window.MoveHistory.push(window.currentGameState);
                            window.MoveHistory.InternalArray[window.MoveHistory.Pointer] = null;
                            UpdateUserInterface(window.currentGameState);
                            setTimeout(function () { computerPlay(0) }, 500);
                        }
                    }
                }
            }            
        }
        else if (window.currentGameState.SideToPlay == 0 && window.computerPlaysAs == 1) {
            actions = window.currentGameState.getLegalActions();
            if (actions.length == 0) {
                declareVictory();
                return;
            }
            if (element.class == "Tiger")
                window.selectedId = element.id;
            else if (element.class == "Empty") {
                if (window.selectedId > -1) {
                    var isLegal = false;
                    var action = [-1, -1, -1];
                    for (var i = 0; i < actions.length; i++)
                        if (actions[i][0] == window.selectedId && actions[i][2] == element.id) {
                            isLegal = true;
                            action = actions[i];
                            break;
                        }
                    if (isLegal) {
                        window.currentGameState = window.currentGameState.generateSuccessor(action, window.MoveHistory);
                        window.MoveHistory.push(window.currentGameState);
                        window.MoveHistory.InternalArray[window.MoveHistory.Pointer] = null;
                        UpdateUserInterface(window.currentGameState);
                        setTimeout(function () { computerPlay(1) }, 500);
                    }
                }
            }
            
        }
    }
    function declareVictory() {
        window.isInProgress = false;
        //window.currentGameState.Result = (window.currentGameState.SideToPlay + 1) % 2;
        UpdateUserInterface();
    }
}
function computerPlay(agentIndex) {
    var agentName;
    window.AgentTerminated = false;
    document.getElementById("MoveNowButton").disabled = false;
    var currentScore, currentDepth, currentAction, currentProgress, depthLimit, timeLimit, nodesExpanded, leafReached;
    var output = document.getElementById("output");
    if (agentIndex == 0) {
        agentName = document.getElementById("TigersAlgorithm").options[document.getElementById("TigersAlgorithm").selectedIndex].value;
        currentScore = document.getElementById("TigersCurrentScore");
        currentDepth = document.getElementById("TigersCurrentDepth");
        currentAction = document.getElementById("TigersCurrentAction");
        currentProgress = document.getElementById("TigersCurrentProgress");
        depthLimit = Number(document.getElementById("TigersDepth").value);
        nodesExpanded = document.getElementById("TigersNodesExpanded");
        leafReached = document.getElementById("TigersLeafNodesReached");
        timeLimit = Number(document.getElementById("TigersTime").value);
    }
    else {
        agentName = document.getElementById("GoatsAlgorithm").options[document.getElementById("GoatsAlgorithm").selectedIndex].value;
        currentScore = document.getElementById("GoatsCurrentScore");
        currentDepth = document.getElementById("GoatsCurrentDepth");
        currentAction = document.getElementById("GoatsCurrentAction");
        nodesExpanded = document.getElementById("GoatsNodesExpanded");
        leafReached = document.getElementById("GoatsLeafNodesReached");
        currentProgress = document.getElementById("GoatsCurrentProgress");
        depthLimit = Number(document.getElementById("GoatsDepth").value);
        timeLimit = Number(document.getElementById("GoatsTime").value);
    }
    window.AgentWorker = new Worker('js/Engine.js');
    currentProgress.value = 0;
    window.AgentTimers = new Array(3);
    var startTime = new Date().getTime() / 1000;
    window.AgentWorker.onmessage = function (e) {        
        if (window.AgentTerminated)
            return;
        window.AgentResult = e.data;
        if (window.AgentResult[2] <= depthLimit) {
            var time = new Date().getTime();
            currentScore.innerHTML = window.AgentResult[0];
            currentAction.innerHTML = window.AgentResult[1];
            currentDepth.innerHTML = window.AgentResult[2];
            nodesExpanded.innerHTML = window.AgentResult[3];
            leafReached.innerHTML = window.AgentResult[4];
            output.innerHTML += "Agent: ";
            if (window.currentGameState.SideToPlay == 0)
                output.innerHTML += "Tigers&#13;&#10;";
            else output.innerHTML += "Goats&#13;&#10;";
            output.innerHTML += "Algorithm: " + agentName + "&#13;&#10;";
            output.innerHTML += "Depth: " + window.AgentResult[2] + "&#13;&#10;";
            output.innerHTML += "Score: " + window.AgentResult[0] + "&#13;&#10;";
            output.innerHTML += "Action: " + window.AgentResult[1] + "&#13;&#10;";
            output.innerHTML += "Nodes Expanded: " + window.AgentResult[3] + "&#13;&#10;";
            output.innerHTML += "Leaf Nodes Reached: " + window.AgentResult[4] + "&#13;&#10;";
            output.innerHTML += "Time: " + (time - startTime * 1000) + " ms&#13;&#10;";
            output.innerHTML += "---------------------------------------&#13;&#10;";
            if (output.innerHTML.length > 4000)
                output.innerHTML = output.innerHTML.slice(output.innerHTML.length - 3000, output.innerHTML.length - 1);
            output.scrollTop = output.scrollHeight;

        }
        if (window.AgentResult[2] >= depthLimit) {
            window.AgentTerminated = true;
            window.AgentWorker.terminate();  
        }          
    }
    window.AgentTimers[0] = setInterval(function () {
        if (!window.AgentTerminated) {
            if (window.AgentResult != null) {
                var value = Math.max(Number(window.AgentResult[2]) / depthLimit * 100, ((new Date().getTime()/1000) - startTime) / timeLimit * 100);
                currentProgress.value = value;
            }
        }
    }, 1000);
    window.AgentWorker.postMessage([window.currentGameState, agentName, agentIndex, window.MoveHistory]);      
    window.AgentTimers[1] =  setTimeout(function () {
        if (!window.AgentTerminated) {
            window.AgentTerminated = true;
            window.AgentWorker.terminate();            
            currentProgress.value = 100;
        }
    }, timeLimit * 1000);
    window.AgentTimers[2] = setInterval(function () {
        if (window.AgentTerminated) {
            for (var i = 0; i < window.AgentTimers.length; i++)
                clearTimeout(window.AgentTimers[i]);
            if (window.isInProgress) {
                if (window.AgentResult == null) {
                    resetGame();
                    return;
                }
                window.currentGameState = window.currentGameState.generateSuccessor(window.AgentResult[1], window.MoveHistory);
                window.MoveHistory.push(window.currentGameState);
                window.MoveHistory.InternalArray[window.MoveHistory.Pointer] = null;
                if (window.currentGameState.Result != -1) {
                    window.isInProgress = false;
                    window.AgentTerminated = true;
                    window.AgentWorker.terminate();
                }
                document.getElementById("MoveNowButton").disabled = true;
            }
            UpdateUserInterface();
            if (window.isInProgress && window.computerPlaysAs == 2)
                computerPlay(window.currentGameState.SideToPlay);
        }
    }, 300);
}
function moveNow() {
    if (!window.AgentTerminated) {
        window.AgentTerminated = true;
        window.AgentWorker.terminate();
    }
}
function stopGame() {
    window.isInProgress = false;
    if (!window.AgentTerminated) {
        window.AgentTerminated = true;
        window.AgentWorker.terminate();
    }
    UpdateUserInterface();
}
function moveBack() {
    window.isInProgress = false;
    if (!window.AgentTerminated) {
        window.AgentTerminated = true;
        window.AgentWorker.terminate();
    }
    if (window.MoveHistory.Pointer > 1) {
        window.currentGameState = window.MoveHistory.InternalArray[window.MoveHistory.Pointer - 2];
        window.MoveHistory.Pointer--;
    }
    UpdateUserInterface();
}
function moveForward() {
    window.isInProgress = false;
    if (!window.AgentTerminated) {
        window.AgentTerminated = true;
        window.AgentWorker.terminate();
    }
    var state = window.MoveHistory.InternalArray[window.MoveHistory.Pointer];
    if (state != null) {
        window.currentGameState = state;
        window.MoveHistory.Pointer++;
    }
    UpdateUserInterface();
}

function ToggleGoats(disabled) {
    document.getElementById("GoatsAlgorithm").disabled = disabled;
    document.getElementById("GoatsTime").disabled = disabled;
    document.getElementById("GoatsDepth").disabled = disabled;
    document.getElementById("GoatsCurrentProgress").disabled = disabled;
}
function ToggleTigers(disabled) {
    document.getElementById("TigersAlgorithm").disabled = disabled;
    document.getElementById("TigersTime").disabled = disabled;
    document.getElementById("TigersDepth").disabled = disabled;
    document.getElementById("TigersCurrentProgress").disabled = disabled;
}
function changeGameType(element) {
    if (element.options[element.selectedIndex].value == "tigers") {
        ToggleGoats(true);
        ToggleTigers(false);
    }
    else if (element.options[element.selectedIndex].value == "goats") {
        ToggleGoats(false);
        ToggleTigers(true);
    }
    else {
        ToggleGoats(false);
        ToggleTigers(false);
    }
}
function startGame() {
    window.isInProgress = true;
    var cmpside = document.getElementById("ComputerSide");
    cmpside.disabled = true;
    if (cmpside.options[cmpside.selectedIndex].value == "goats") {
        window.computerPlaysAs = 1;
        UpdateUserInterface();
        if (window.currentGameState.SideToPlay == window.computerPlaysAs)
            computerPlay(window.currentGameState.SideToPlay);
    }
    else if (cmpside.options[cmpside.selectedIndex].value == "tigers") {
        window.computerPlaysAs = 0;
        UpdateUserInterface();
        if (window.currentGameState.SideToPlay == window.computerPlaysAs)
            computerPlay(window.currentGameState.SideToPlay);
    }
    else {
        window.computerPlaysAs = 2;
        UpdateUserInterface();
        computerPlay(window.currentGameState.SideToPlay);
    }
}
function resetGame() {
    setTimeout(function () {
        if (window.AgentWorker != null) {
            window.AgentTerminated = true;
            window.AgentWorker.terminate();
        }
        if (window.AgentTimers != null) {
            for (var i = 0; i < window.AgentTimers.length; i++)
                clearTimeout(window.AgentTimers[i]);
        }
        window.selectedId = -1;
        window.isInProgress = false;
        window.currentGameState = new GameState();
        window.MoveHistory = new HistoryStack(500);
        document.getElementById("StartButton").disabled = false;
        document.getElementById("output").innerHTML = "";
        document.getElementById("TigersDepth").value = Number(document.getElementById("TigersDepth").max);
        document.getElementById("TigersTime").value = Number(document.getElementById("TigersTime").min);
        document.getElementById("GoatsDepth").value = Number(document.getElementById("GoatsDepth").max);
        document.getElementById("GoatsTime").value = Number(document.getElementById("GoatsTime").min);
        UpdateUserInterface();
    }, 0);
}