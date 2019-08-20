/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
- Or, the users can also set the 'Winning score' in the input field provided and the first player to reach that winning score wins the game

*/

var scores, roundScore ,activePlayer, gamePlaying;

init();

function init(){
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;

    document.querySelector('.final-score').value = "";

    document.querySelector('.dice').style.display = 'none';

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';

    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');

    document.querySelector('.player-0-panel').classList.add('active');
}

document.querySelector('.btn-roll').addEventListener('click', function(){
    if(gamePlaying){
        var dice = Math.floor(Math.random()*6) + 1;
        document.querySelector('#current-'+activePlayer).textContent = dice;
    
        document.querySelector('.dice').style.display = 'block';
        document.querySelector('.dice').src = 'dice-'+dice+'.png';
    
        if(dice !== 1){
            roundScore += dice;
            document.querySelector('#current-'+activePlayer).textContent = roundScore;
        }
        else{
            nextPlayer();
        }
    }
});

function nextPlayer(){
    document.querySelector('.dice').style.display = 'none';

    roundScore = 0;
    document.querySelector('#current-'+activePlayer).textContent = '0';

    document.querySelector('.player-'+activePlayer+'-panel').classList.remove('active');
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    document.querySelector('.player-'+activePlayer+'-panel').classList.add('active');
}

document.querySelector('.btn-hold').addEventListener('click', function(){
    if(gamePlaying){
        document.querySelector('.dice').style.display = 'block';
        
        scores[activePlayer] += roundScore;
        document.querySelector('#score-'+activePlayer).textContent = scores[activePlayer];
        
        var winningScore = document.querySelector('.final-score').value;
        if(!winningScore){
            winningScore = 100;
        }

        if(scores[activePlayer] >= winningScore){
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player-'+activePlayer+'-panel').classList.remove('active');
            document.querySelector('.player-'+activePlayer+'-panel').classList.add('winner');
            document.querySelector('#name-'+activePlayer).textContent = 'Winner!';
            gamePlaying = false;
        }
        else{
            nextPlayer();
        }
    }
});

document.querySelector('.btn-new').addEventListener('click', init);
