importScripts('TigersAndGoats.js');

self.onmessage = function (e) {
    var AgentName = e.data[1];
    var agent;
    switch (AgentName.toLowerCase()) {
        case "minimax":
            agent = new minimaxAgent();
            break;
        case "alphabeta":
            agent = new alphaBetaAgent();
            break;
        case "expectimax":
            agent = new expectimaxAgent();
            break;
        case "scout":
            agent = new scoutAgent();
            break;
        case "alphabetawithmemory":
            agent = new alphaBetaWithTTAgent();
            break;
        case "scoutwithttagent":
            agent = new scoutWithTTAgent();
            break;
        case "mtdfagent":
            agent = new mtdfAgent();
            break;
    }
    agent.Index = Number(e.data[2]);
    agent.History = new HistoryStack(500);
    for (var i = 0; i < e.data[3].Pointer; i++)
        agent.History.push(createGameState(e.data[3].InternalArray[i]));
    agent.getAction(createGameState(e.data[0]));
}
function createGameState(json) {
    var gameState = new GameState();
    gameState.SideToPlay = json.SideToPlay;
    gameState.CurrentPosition = json.CurrentPosition.slice(0);
    gameState.OutsideGoats = json.OutsideGoats;
    gameState.Result = json.Result;
    gameState.Hash = json.Hash;
    return gameState;
}