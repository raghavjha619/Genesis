/*
==================================================================================
    Class declaration for all agents
==================================================================================
*/
function expectimaxAgent() {
    this.Index = 0;
    this.History = new HistoryStack();
}
function minimaxAgent() {
    this.Index = 0;
    this.History = new HistoryStack();
}
function alphaBetaAgent() {
    this.Index = 0;
    this.History = new HistoryStack();
}
function scoutAgent() {
    this.Index = 0;
    this.History = new HistoryStack();
}
function alphaBetaWithTTAgent() {
    this.Index = 0;
    this.History = new HistoryStack();
}
function scoutWithTTAgent() {
    this.Index = 0;
    this.History = new HistoryStack();
}
function mtdfAgent() {
    this.Index = 0;
    this.History = new HistoryStack();
}
/*
==================================================================================
    All agents use the same evaluation function
==================================================================================
*/
expectimaxAgent.prototype.evaluate = evaluate;
minimaxAgent.prototype.evaluate = evaluate;
alphaBetaAgent.prototype.evaluate = evaluate;
scoutAgent.prototype.evaluate = evaluate;
alphaBetaWithTTAgent.prototype.evaluate = evaluate;
scoutWithTTAgent.prototype.evaluate = evaluate;
mtdfAgent.prototype.evaluate = evaluate;

/*
==================================================================================
    This is where the search algorithms are. The getAction method takes a gameState,
    then gets a list of all possible actions for that game state and chooses (returns)
    the best action using a search algorithm. Other than action the search result also
    includes the evaluated score, maximum depth reached and the number of nodes expanded.
==================================================================================
*/

expectimaxAgent.prototype.getAction = function (gameState) {
    var nodesExpanded = 0;
    var leavesReached = 0;
    var index = this.Index;
    var history = this.History;
    function expectimax(state, depth, agentIndex) {
        history.push(state);
        var actions = state.getLegalActions();
        var action = [0, 0, 0];
        var score;
        if (depth < 1 || actions.length == 0 || state.Result != -1) {
            history.pop();
            leavesReached++;
            return [this.evaluate(state, actions, index), [0, 0, 0]];
        }
        else if (agentIndex == index) {
            score = Number.NEGATIVE_INFINITY;
            var result;
            for (var i = 0; i < actions.length; i++) {
                result = expectimax(state.generateSuccessor(actions[i], history), depth - 1, (agentIndex + 1) % 2)[0];
                nodesExpanded++;
                if (score < result) {
                    score = result;
                    action = actions[i];
                }
            }
        }
        else {
            score = 0;
            var num = 0;
            for (var i = 0; i < actions.length; i++) {
                score += expectimax(state.generateSuccessor(actions[i], history), depth - 1, (agentIndex + 1) % 2)[0];
                nodesExpanded++;
                num++;
            }
            score = (Math.round((score / num) * 100) / 100);
        }
        history.pop();
        return [score, action];
    }
    var depth = 1;
    var result;
    while (true) {
        leavesReached = 0;
        result = expectimax(gameState, depth, this.Index);
        postMessage([result[0], result[1], depth, nodesExpanded, leavesReached]); //result = score, action, depth, nodesExpanded
        depth++;
    }
}
minimaxAgent.prototype.getAction = function (gameState) {
    var nodesExpanded = 0;
    var leavesReached = 0;
    var index = this.Index;
    var history = this.History;
    function minimax(state, depth, agentIndex) {
        history.push(state);
        var actions = state.getLegalActions();
        var action = [0, 0, 0];
        var score;
        if (depth < 1 || actions.length == 0 || state.Result != -1) {
            history.pop();
            leavesReached++;
            return [this.evaluate(state, actions, index), [0, 0, 0]];
        }
        else if (agentIndex == index) {
            score = Number.NEGATIVE_INFINITY;
            var result;
            for (var i = 0; i < actions.length; i++) {
                result = minimax(state.generateSuccessor(actions[i], history), depth - 1, (agentIndex + 1) % 2)[0];
                nodesExpanded++;
                if (score < result) {
                    score = result;
                    action = actions[i];
                }
            }
        }
        else {
            score = Number.POSITIVE_INFINITY;
            var result;
            for (var i = 0; i < actions.length; i++) {
                result = minimax(state.generateSuccessor(actions[i], history), depth - 1, (agentIndex + 1) % 2)[0];
                nodesExpanded++;
                if (score > result) {
                    score = result;
                    action = actions[i];
                }
            }
        }
        history.pop();
        return [score, action];
    }
    var depth = 1;
    var result;
    while (true) {
        leavesReached = 0;
        result = minimax(gameState, depth, this.Index);
        postMessage([result[0], result[1], depth, nodesExpanded, leavesReached]); //result = score, action, depth, nodesExpanded
        depth++;
    }
}
alphaBetaAgent.prototype.getAction = function (gameState) {
    var nodesExpanded = 0;
    var leavesReached = 0;
    var index = this.Index;
    var history = this.History;
    function alphaBeta(state, depth, agentIndex, a, b) {
        history.push(state);
        var actions = state.getLegalActions();
        var action = [0, 0, 0];
        var score;
        if (depth < 1 || actions.length == 0 || state.Result != -1) {
            history.pop();
            leavesReached++;
            return [this.evaluate(state, actions, index), [0, 0, 0]];
        }
        else if (agentIndex == index) {
            score = Number.NEGATIVE_INFINITY;
            var result;
            for (var i = 0; i < actions.length; i++) {
                result = alphaBeta(state.generateSuccessor(actions[i], history), depth - 1, (agentIndex + 1) % 2, a, b)[0];
                nodesExpanded++;
                if (score < result) {
                    score = result;
                    action = actions[i];
                }
                if (score >= b)
                    break;
                if (score > a)
                    a = score;
            }
        }
        else {
            score = Number.POSITIVE_INFINITY;
            var result;
            for (var i = 0; i < actions.length; i++) {
                result = alphaBeta(state.generateSuccessor(actions[i], history), depth - 1, (agentIndex + 1) % 2, a, b)[0];
                nodesExpanded++;
                if (score > result) {
                    action = actions[i];
                    score = result;
                }
                if (score <= a)
                    break;
                if (b > score)
                    b = score;
            }
        }
        history.pop();
        return [score, action];
    }
    var result;
    var depth = 1;
    while (true) {
        leavesReached = 0;
        result = alphaBeta(gameState, depth, this.Index, Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY);
        postMessage([result[0], result[1], depth, nodesExpanded, leavesReached]); //result: score, action, depth, nodesExpanded
        depth++;
    }
}
scoutAgent.prototype.getAction = function (gameState) {
    var nodesExpanded = 0;
    var leavesReached = 0;
    var index = this.Index;
    var history = this.History;
    function scout(state, depth, agentIndex, a, b) {
        history.push(state);
        var actions = state.getLegalActions();
        var action = [0, 0, 0];
        var score;
        if (depth < 1 || actions.length == 0 || state.Result != -1) {
            history.pop();
            leavesReached++;
            return [this.evaluate(state, actions, index), [0, 0, 0]];
        }
        else if (agentIndex == index) {
            score = Number.NEGATIVE_INFINITY;
            var result;
            var n = b;
            for (var i = 0; i < actions.length; i++) {
                result = scout(state.generateSuccessor(actions[i], history), depth - 1, (agentIndex + 1) % 2, a, n)[0];
                nodesExpanded++;
                if (score < result) {
                    if (n == b || depth < 2) {
                        score = result;                        
                    } else {
                        score = scout(state.generateSuccessor(actions[i], history), depth - 1, (agentIndex + 1) % 2, result, b)[0];
                        nodesExpanded++;
                    }
                    action = actions[i];
                }
                if (score >= b)
                    break;
                if (score > a)
                    a = score;
                n = a + 1;
            }
        }
        else {
            score = Number.POSITIVE_INFINITY;
            var result;
            var n = a;
            for (var i = 0; i < actions.length; i++) {
                result = scout(state.generateSuccessor(actions[i], history), depth - 1, (agentIndex + 1) % 2, n, b)[0];
                nodesExpanded++;
                if (score > result) {
                    if (n == a || depth < 2)
                        score = result;
                    else {
                        score = scout(state.generateSuccessor(actions[i], history), depth - 1, (agentIndex + 1) % 2, a, result)[0];
                    }
                    action = actions[i];
                }
                if (score <= a)
                    break;
                if (b > score)
                    b = score;
                n = b - 1;
            }
        }
        history.pop();
        return [score, action];
    }
    var result;
    var depth = 1;
    while (true) {
        leavesReached = 0;
        result = scout(gameState, depth, this.Index, Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY);
        postMessage([result[0], result[1], depth, nodesExpanded, leavesReached]); //result: score, action, depth, nodesExpanded
        depth++;
    }
}
alphaBetaWithTTAgent.prototype.getAction = function (gameState) {
    var nodesExpanded = 0;
    var leavesReached = 0;
    var index = this.Index;
    var history = this.History;
    var transpositionTable = new HashTree();
    function alphaBeta(state, depth, agentIndex, a, b) {
        history.push(state);
        var actions = state.getLegalActions();
        var action = [0, 0, 0];        
        var score;
        if (depth < 1 || actions.length == 0 || state.Result != -1) {
            history.pop();
            leavesReached++;
            return [this.evaluate(state, actions, index), [0, 0, 0]];
        }
        var TTresult = transpositionTable.find(state.Hash);
        if (TTresult != null) {
            if (TTresult[1] >= depth) {
                if (TTresult[2] == TTresult[3]) {
                    history.pop();
                    return [TTresult[2], TTresult[0]];
                }
                if (TTresult[2] > b) {
                    history.pop();
                    return [TTresult[2], TTresult[0]];
                }
                if (TTresult[3] < a) {
                    history.pop();
                    return [TTresult[3], TTresult[0]];
                }
                a = Math.max(a, TTresult[2]);
                b = Math.min(b, TTresult[3]);
            }
            for (var i = 0; i < actions.length; i++) {
                if (actions[i].compare(TTresult[0])) {
                    actions.splice(i, 1);
                    actions.splice(0, 0, TTresult[0]);
                    break;
                }
            }
        }
        if (agentIndex == index) {
            score = Number.NEGATIVE_INFINITY;
            var result;
            for (var i = 0; i < actions.length; i++) {
                result = alphaBeta(state.generateSuccessor(actions[i], history), depth - 1, (agentIndex + 1) % 2, a, b)[0];
                nodesExpanded++;
                if (score < result) {
                    score = result;
                    action = actions[i];
                }
                if (score >= b)
                    break;
                if (score > a)
                    a = score;                
            }
        }
        else {
            score = Number.POSITIVE_INFINITY;
            var result;
            for (var i = 0; i < actions.length; i++) {
                result = alphaBeta(state.generateSuccessor(actions[i], history), depth - 1, (agentIndex + 1) % 2, a, b)[0];
                nodesExpanded++;
                if (score > result) {
                    action = actions[i];
                    score = result;
                }
                if (score <= a)
                    break;
                if (b > score)
                    b = score;                
            }
        }
        history.pop();
        if (score <= a)
            transpositionTable.insert(state.Hash, [action, depth, Number.NEGATIVE_INFINITY, score]);
        else if (score >= b)
            transpositionTable.insert(state.Hash, [action, depth, score, Number.POSITIVE_INFINITY]);
        else 
            transpositionTable.insert(state.Hash, [action, depth, score, score]);
        return [score, action];
    }
    var result;
    var depth = 1;
    while (true) {
        leavesReached = 0;
        result = alphaBeta(gameState, depth, this.Index, Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY);
        postMessage([result[0], result[1], depth, nodesExpanded, leavesReached]); //result: score, action, depth, nodesExpanded
        depth++;
    }
}
scoutWithTTAgent.prototype.getAction = function (gameState) {
    var nodesExpanded = 0;
    var leavesReached = 0;
    var index = this.Index;
    var history = this.History;
    var transpositionTable = new HashTree();
    function scout(state, depth, agentIndex, a, b) {
        history.push(state);
        var actions = state.getLegalActions();
        var action = [0, 0, 0];
        var score;
        if (depth < 1 || actions.length == 0 || state.Result != -1) {
            history.pop();
            leavesReached++;
            return [this.evaluate(state, actions, index), [0, 0, 0]];
        }        
        var TTresult = transpositionTable.find(state.Hash);
        if (TTresult != null) {
            if (TTresult[1] >= depth) {
                if (TTresult[2] == TTresult[3]) { 
                    history.pop();
                    return [TTresult[2], TTresult[0]];
                }
                if (TTresult[2] > b) { 
                    history.pop();
                    return [TTresult[2], TTresult[0]];
                }
                if (TTresult[3] < a) {
                    history.pop();
                    return [TTresult[3], TTresult[0]];
                }
                a = Math.max(a, TTresult[2]);
                b = Math.min(b, TTresult[3]);                
            }
            for (var i = 0; i < actions.length; i++) {
                if (actions[i].compare(TTresult[0])) {
                    actions.splice(i, 1);
                    actions.splice(0, 0, TTresult[0]);
                    break;
                }
            }
        }
        if (agentIndex == index) {
            score = Number.NEGATIVE_INFINITY;
            var result;
            var n = b;
            for (var i = 0; i < actions.length; i++) {
                result = scout(state.generateSuccessor(actions[i], history), depth - 1, (agentIndex + 1) % 2, a, n)[0];
                nodesExpanded++;
                if (score < result) {
                    if (n == b || depth < 2) {
                        score = result;
                    } else {
                        score = scout(state.generateSuccessor(actions[i], history), depth - 1, (agentIndex + 1) % 2, result, b)[0];
                        nodesExpanded++;
                    }
                    action = actions[i];
                }
                if (score >= b)
                    break;
                if (score > a)
                    a = score;
                n = a + 1;
            }
        }
        else {
            score = Number.POSITIVE_INFINITY;
            var result;
            var n = a;
            for (var i = 0; i < actions.length; i++) {
                result = scout(state.generateSuccessor(actions[i], history), depth - 1, (agentIndex + 1) % 2, n, b)[0];
                nodesExpanded++;
                if (score > result) {
                    if (n == a || depth < 2)
                        score = result;
                    else {
                        score = scout(state.generateSuccessor(actions[i], history), depth - 1, (agentIndex + 1) % 2, a, result)[0];
                    }
                    action = actions[i];
                }
                if (score <= a)
                    break;
                if (b > score)
                    b = score;
                n = b - 1;
            }
        }
        history.pop();
        if (score <= a)
            transpositionTable.insert(state.Hash, [action, depth, Number.NEGATIVE_INFINITY, score]);
        else if (score >= b)
            transpositionTable.insert(state.Hash, [action, depth, score, Number.POSITIVE_INFINITY]);
        else
            transpositionTable.insert(state.Hash, [action, depth, score, score]);
        return [score, action];
    }
    var result;
    var depth = 1;
    while (true) {
        leavesReached = 0;
        result = scout(gameState, depth, this.Index, Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY);
        postMessage([result[0], result[1], depth, nodesExpanded, leavesReached]); //result: score, action, depth, nodesExpanded
        depth++;
    }
}
mtdfAgent.prototype.getAction = function (gameState) {
    var nodesExpanded = 0;
    var leavesReached = 0;
    var index = this.Index;
    var history = this.History;
    var transpositionTable = new HashTree();
    function MT(state, depth, agentIndex, test) {
        history.push(state);
        var actions = state.getLegalActions();
        var action = [0, 0, 0];
        var score;
        if (depth < 1 || actions.length == 0 || state.Result != -1) {
            history.pop();
            leavesReached++;
            return [this.evaluate(state, actions, index), [0, 0, 0]];
        }
        var TTresult = transpositionTable.find(state.Hash);
        if (TTresult != null) {
            if (TTresult[1] >= depth) {
                if (TTresult[2] >= test) { //if TTresult is a high cutoff
                    history.pop();
                    return [TTresult[2], TTresult[0]];
                }
                if (TTresult[3] < test) { //if TTresult is a low cutoff
                    history.pop();
                    return [TTresult[3], TTresult[0]];
                }
            }
            for (var i = 0; i < actions.length; i++) {
                if (actions[i].compare(TTresult[0])) {
                    actions.splice(i, 1);
                    actions.splice(0, 0, TTresult[0]);
                    break;
                }
            }
        }
        if (agentIndex == index) {
            score = Number.NEGATIVE_INFINITY;
            var result;
            for (var i = 0; i < actions.length; i++) {
                result = MT(state.generateSuccessor(actions[i], history), depth - 1, (agentIndex + 1) % 2, test)[0];
                nodesExpanded++;
                if (score < result) {
                    score = result;
                    action = actions[i];
                }
                if (score >= test)
                    break;
            }
        }
        else {
            score = Number.POSITIVE_INFINITY;
            var result;
            for (var i = 0; i < actions.length; i++) {
                result = MT(state.generateSuccessor(actions[i], history), depth - 1, (agentIndex + 1) % 2, test)[0];
                nodesExpanded++;
                if (score > result) {
                    action = actions[i];
                    score = result;
                }
                if (score < test)
                    break;
            }
        }
        history.pop();
        if (score >= test) //if failed high
            transpositionTable.insert(state.Hash, [action, depth, score, Number.POSITIVE_INFINITY]);
        else if (score < test) //if failed low
            transpositionTable.insert(state.Hash, [action, depth, Number.NEGATIVE_INFINITY, score]);
        return [score, action];
    }
    var result = this.evaluate(gameState, gameState.getLegalActions(), index);
    var depth = 1, guess, lowerBound, upperBound;
    while (true) {
        leavesReached = 0;
        upperBound = Number.POSITIVE_INFINITY;
        lowerBound = Number.NEGATIVE_INFINITY;
        while (lowerBound < upperBound) {
            if (result[0] == lowerBound)
                guess = result[0] + 1;
            else guess = result[0];
            result = MT(gameState, depth, this.Index, guess);
            if (result[0] < guess)
                upperBound = result[0];
            else
                lowerBound = result[0];
        }
        postMessage([result[0], result[1], depth, nodesExpanded, leavesReached]); //result: score, action, depth, nodesExpanded
        depth++;
    }
}

/*
==================================================================================
    The evaluation function evaluates a game state and then returns a score.
    The score depends on the mobility of the tigers and the number of goats left.
==================================================================================
*/
function evaluate(gameState, actions, agentIndex) {
    function Score(score) {
        if (agentIndex == 0)
            return score;
        else return -score;
    }
    if (gameState.Result == 0)
        return Score(10000);
    else if (gameState.Result == 1)
        return Score(-10000);
    else if (gameState.Result == 2)
        return -5000;
    var score = 0;
    var nGoats = gameState.OutsideGoats;
    for (var i = 0; i < gameState.CurrentPosition.length; i++)
        if (gameState.CurrentPosition[i] == 'G')
            nGoats++;
    var numActions = 0;
    var numCaptures = 0;
    for (var i = 0; i < actions.length; i++) {
        if (actions[i][1] > -1)
            numCaptures++;
        else numActions++;
    }    
    score -= 4 * nGoats;
    if (gameState.SideToPlay == 0) { //if tigers are to move
        score += numActions;
        score += 2 * numCaptures;
    }
    else { //if goats are to move
        for (var i = 0; i < gameState.CurrentPosition.length; i++) { //suppose that it is tigers to move and assign a score anyway !
            if (gameState.CurrentPosition[i] == 'T') {
                for (var j = 0; j < MoveActions[i].length; j++)
                    if (gameState.CurrentPosition[MoveActions[i][j]] == 'E')
                        score += 1;
                for (var j = 0; j < CaptureActions.length; j++)
                    if (CaptureActions[j][0] == i && gameState.CurrentPosition[CaptureActions[j][1]] == 'G' && gameState.CurrentPosition[CaptureActions[j][2]] == 'E')
                        score += 2;
            }
        }
    }
    return Score(score);
}

/*
==================================================================================
    Game State represents the current state of the game.
==================================================================================
*/

function GameState() {
    this.SideToPlay = 1; //0 == Tigers, 1 == Goats same as AgentIndex
    this.OutsideGoats = 15;
    //array of 23 elements corresponding to 23 squares of the board. Each square is either empty or has a goat or a tiger in it.
    this.CurrentPosition = ['T', 'E', 'E', 'T', 'T', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E'];
    this.Hash = 0; // A compact representation of the game state. Hash is a 51 bit binary number.
    this.Result = -1; // 0 == Tigers win, 1 == Goats Win, 2 == Draw, -1 == no result
}
//getLegalActions: returns a list of legal actions that can be taken from the current game state.
GameState.prototype.getLegalActions = function () {
    var actions = [];
    if (this.SideToPlay == 1) {
        if (this.OutsideGoats > 0) {
            for (var i = 0; i < this.CurrentPosition.length; i++)
                if (this.CurrentPosition[i] == 'E')
                    actions.push([-1, -1, i]); // first value = from, second value = capture square, third value = to,  -1 means outside or no capture
        }
        else {
            for (var i = 0; i < this.CurrentPosition.length; i++) {
                if (this.CurrentPosition[i] == 'G')
                    for (var j = 0; j < MoveActions[i].length; j++)
                        if (this.CurrentPosition[MoveActions[i][j]] == 'E')
                            actions.push([i, -1, MoveActions[i][j]]);
            }
        }
    }
    else {
        for (var i = 0; i < this.CurrentPosition.length; i++) {
            if (this.CurrentPosition[i] == 'T') {
                for (var j = 0; j < CaptureActions.length; j++)
                    if (CaptureActions[j][0] == i && this.CurrentPosition[CaptureActions[j][1]] == 'G' && this.CurrentPosition[CaptureActions[j][2]] == 'E')
                        actions.push(CaptureActions[j]);
                for (var j = 0; j < MoveActions[i].length; j++)
                    if (this.CurrentPosition[MoveActions[i][j]] == 'E')
                        actions.push([i, -1, MoveActions[i][j]]);                
            }
        }
    }
    return actions;
}
//generateSuccessor: executes an action and then returns the successor state
GameState.prototype.generateSuccessor = function (action, history) {
    var state = new GameState();
    state.OutsideGoats = this.OutsideGoats;
    state.Result = this.Result;
    state.SideToPlay = (this.SideToPlay + 1) % 2;
    state.CurrentPosition = this.CurrentPosition.slice(0);
    if (action == [0, 0, 0])
        state.Result = state.SideToPlay;
    else {
        if (action[0] == -1) {
            state.OutsideGoats -= 1;
            state.CurrentPosition[action[2]] = 'G';
        }
        else {
            var temp = state.CurrentPosition[action[0]];
            state.CurrentPosition[action[0]] = 'E';
            state.CurrentPosition[action[2]] = temp;
            if (action[1] != -1)
                state.CurrentPosition[action[1]] = 'E';
        }
    }
    var num = state.OutsideGoats;
    for (var i = 0; i < state.CurrentPosition.length; i++)
        if (state.CurrentPosition[i] == "G")
            num += 1;
    if (num == 0)
        state.Result = 0;
    else if (state.getLegalActions().length == 0)
        state.Result = this.SideToPlay;
    
    //compute hash
    state.Hash = 0;
    for (var i = 0; i < state.CurrentPosition.length; i++) {
        if (state.CurrentPosition[i] == 'T')
            state.Hash += 2;
        else if (state.CurrentPosition[i] == 'G')
            state.Hash += 1;
        state.Hash *= 4;
    }
    state.Hash *= 4;
    state.Hash += state.OutsideGoats;
    state.Hash *= 2;
    state.Hash += state.SideToPlay;
    var numEquals = 0;
    //outerloop:
    //    for (var i = history.Pointer - 1; i >= 0; i--) {
    //        if (history.InternalArray[i].OutsideGoats != state.OutsideGoats)
    //            continue;
    //        if (history.InternalArray[i].SideToPlay != state.SideToPlay)
    //            continue;
    //        for (var j = 0; j < history.InternalArray[i].CurrentPosition.length; j++) {
    //            if (history.InternalArray[i].CurrentPosition[j] != state.CurrentPosition[j])
    //                continue outerloop;
    //        }
    //        numEquals++;
    //        if (numEquals > 1) {
    //            state.Result = 2;
    //            return state;
    //        }
    //    }
    for (var i = history.Pointer - 1; i >= 0; i--) {
        if (history.InternalArray[i].Hash === state.Hash)
            numEquals++;
        if (numEquals > 1) {
            state.Result = 2;
            return state;
        }
    }
    return state;
}

/*
==================================================================================
    Utility
==================================================================================
*/
// MoveAction[0] = [2, 3, 4, 5] means that from square 0 we can go to sqaures 2, 3, 4 and 5
MoveActions = [
    [2, 3, 4, 5],
    [2, 7],
    [0, 1, 3, 8],
    [2, 0, 4, 9],
    [3, 0, 5, 10],
    [0, 4, 11, 6],
    [5, 12],
    [1, 8, 13],
    [2, 7, 14, 9],
    [3, 8, 10, 15],
    [9, 4, 11, 16],
    [5, 12, 10, 17],
    [6, 11, 18],
    [7, 14],
    [13, 8, 15, 19],
    [9, 14, 16, 20],
    [10, 15, 17, 21],
    [16, 11, 18, 22],
    [12, 17],
    [14, 20],
    [15, 19, 21],
    [16, 20, 22],
    [17, 21]
];
// [2, 2, 8] means that from square 0 a tiger can capture square 2 and land in square 8
CaptureActions = [
    [0, 2, 8],
    [0, 3, 9],
    [0, 4, 10],
    [0, 5, 11],
    [1, 2, 3],
    [1, 7, 13],
    [2, 8, 14],
    [2, 3, 4],
    [3, 9, 15],
    [3, 4, 5],
    [3, 2, 1],
    [4, 3, 2],
    [4, 5, 6],
    [4, 10, 16],
    [5, 4, 3],
    [5, 11, 17],
    [6, 5, 4],
    [6, 12, 18],
    [7, 8, 9],
    [8, 9, 10],
    [8, 2, 0],
    [8, 14, 19],
    [9, 8, 7],
    [9, 10, 11],
    [9, 3, 0],
    [9, 15, 20],
    [10, 4, 0],
    [10, 9, 8],
    [10, 11, 12],
    [10, 16, 21],
    [11, 10, 9],
    [11, 5, 0],
    [11, 17, 22],
    [12, 11, 10],
    [13, 7, 1],
    [13, 14, 15],
    [14, 8, 2],
    [14, 15, 16],
    [15, 14, 13],
    [15, 16, 17],
    [15, 9, 3],
    [16, 15, 14],
    [16, 10, 4],
    [16, 17, 18],
    [17, 16, 15],
    [17, 11, 5],
    [18, 12, 6],
    [18, 17, 16],
    [19, 14, 8],
    [19, 20, 21],
    [20, 15, 9],
    [20, 21, 22],
    [21, 20, 19],
    [21, 16, 10],
    [22, 21, 20],
    [22, 17, 11]
];

//function taken from stackoverflow
Array.prototype.compare = function (array) {
    // if the other array is a falsy value, return
    if (!array)
        return false;

    // compare lengths - can save a lot of time
    if (this.length != array.length)
        return false;

    for (var i = 0; i < this.length; i++) {
        // Check if we have nested arrays
        if (this[i] instanceof Array && array[i] instanceof Array) {
            // recurse into the nested arrays
            if (!this[i].compare(array[i]))
                return false;
        }
        else if (this[i] != array[i]) {
            // Warning - two different object instances will never be equal: {x:20} != {x:20}
            return false;
        }
    }
    return true;
}

function HistoryStack(length) {
    this.InternalArray = new Array(length);
    this.Pointer = 0;
}
HistoryStack.prototype.push = function(obj) {
    this.InternalArray[this.Pointer] = obj;
    this.Pointer += 1;
}
HistoryStack.prototype.pop = function () {
    this.Pointer -= 1;
}

function HashTree() {
    this.Nodes = new Array(256);
    this.Data = null;
}
HashTree.prototype.find = function(key) {
    function treeSearch(depth, key, node) {
        var nextKey = key & 0xff;
        if (depth == 1 && node.Nodes[key] != null) {
            return node.Nodes[key].Data;
        }
        else if (node.Nodes[nextKey] != null) {
            key = key - (key & 0xff);
            return treeSearch(depth - 1, key / 256, node.Nodes[nextKey]);
        }
        return null;
    }
    return treeSearch(7, key, this);
}
HashTree.prototype.insert = function (key, data) {
    function treeInsert(depth, key, data, node) {
        if (depth == 1) {
            node.Nodes[key] = new HashTree();
            node.Nodes[key].Data = data;
        }
        else {
            var nextKey = key & 0xff;
            if (node.Nodes[nextKey] == null) {
                node.Nodes[nextKey] = new HashTree();
            }
            key = key - (key & 0xff);
            treeInsert(depth - 1, key / 256, data, node.Nodes[nextKey]);
        }
    }
    treeInsert(7, key, data, this);
}