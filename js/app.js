/*
    Deal needs to call shuffle and assign the deck
    Set up a players starting hand
    place the cards in the correct spot.

*/
var theDeck = [];
var placeInDeck = 0;
var playerTotalCards = 2;
var dealerTotalCards = 2;
var timer;

window.addEventListener("resize", function(){
    var win = document.getElementById("win-size");
    win.innerHTML = window.innerWidth + "px | " + window.innerHeight + "px";
});

$(document).ready(function() {
    $('button').click(function(e) {

        if (e.currentTarget.id == 'draw-button') {
            deal();
        } else if (e.currentTarget.id == 'hit-button') {
            hit();
        } else if (e.currentTarget.id == 'stand-button') {
            stand();
        } else if (e.currentTarget.id == 'reset') {
            //resetGame();
        }

//console.log(e.currentTarget.id);
    });
    
    
});


function resetGame() {
    console.log('Game Reset!');
    $('.player-total').html("0");
    $('.dealer-total').html("0");
    $('#message').html("");

    var resetPosition = "-1px -484px";
    
    $('#player-card-one').css("background-position", resetPosition);
    $('#player-card-two').css("background-position", resetPosition);
    $('#player-card-three').css("background-position", resetPosition);
    $('#player-card-four').css("background-position", resetPosition);
    $('#player-card-five').css("background-position", resetPosition);
    $('#player-card-six').css("background-position", resetPosition);
    
    $('#dealer-card-one').css("background-position", resetPosition);
    $('#dealer-card-two').css("background-position", resetPosition);
    $('#dealer-card-three').css("background-position", resetPosition);
    $('#dealer-card-four').css("background-position", resetPosition);
    $('#dealer-card-five').css("background-position", resetPosition);
    $('#dealer-card-six').css("background-position", resetPosition);
}

function deal() {
    resetGame();
    shuffleDeck();
    playerHand = [theDeck[0].CardNum, theDeck[2].CardNum];
    dealerHand = [theDeck[1].CardNum, theDeck[3].CardNum];
    placeInDeck = 4;
    
    placeCard(playerHand[0], 'player', 'one');
    placeCard(dealerHand[0], 'dealer', 'one');
    placeCard(playerHand[1], 'player', 'two');
    placeCard(dealerHand[1], 'dealer', 'two');

    calculateTotal(playerHand, 'player');
    calculateTotal(dealerHand, 'dealer');
    
    checkWinner();
};

function hit() {

    placeCard(theDeck[placeInDeck].CardNum, 'player', getSlot(playerTotalCards));
    playerHand.push(theDeck[placeInDeck].CardNum);
    placeInDeck++;
    playerTotalCards++;
    calculateTotal(playerHand, 'player');
    checkWinner();
};


function stand() {
    var dealerTotal = $('.dealer-total').html();
    var slot = '';

    while (dealerTotal < 17) {

        placeCard(theDeck[placeInDeck].CardNum, 'dealer', getSlot(playerTotalCards));
        dealerHand.push(theDeck[placeInDeck].CardNum);
        dealerTotalCards++;
        placeInDeck++;
        //console.log(dealerHand);
        calculateTotal(dealerHand, 'dealer');
        dealerTotal = $('.dealer-total').html(); // check for loop break;
    }

    checkWinner();
};


function checkWinner() {
    var _playerHas = Number($('.player-total').html());
    var _dealerHas = Number($('.dealer-total').html());
    var _message = $('#message');
    var _text = '';

    if (_playerHas > 21) {
        _text = "Player has BUSTED!";
    } else if ( _dealerHas > 21 ) {
        _text = "Dealer has BUSTED!";
    }
    else if (_playerHas == 21 && _dealerHas < 21 ) {
        //_whosTurn = _whosTurn.charAt(0).toUpperCase() + _whosTurn.slice(1, _whosTurn.length);
        _text = "Player!<br>You Got Black-Jack!!";
    }
    else if (_playerHas < 21 && _dealerHas == 21 ) {
        //_whosTurn = _whosTurn.charAt(0).toUpperCase() + _whosTurn.slice(1, _whosTurn.length);
        _text = "Dealer!<br>You Got Black-Jack!!";
    }
    else {
        // neither player has busted and the dealer has at least 17
        if (_playerHas > _dealerHas) {
            _text = "Player, You have beaten the dealer!";
        } else if (_dealerHas > _playerHas) {
            _text = "Sorry the house wins again!!";
        } else {
            _text = "It\'s a Push!";
        }
    }
    
    _message.html(_text);
    _whosTurn = '';
    
    // if (total > 21) {
    //     bust(whosTurn);
    // } else if ( total == 21 ) {
    //     var whosTurn = whosTurn.charAt(0).toUpperCase() + whosTurn.slice(1,whosTurn.length);
    //     $('#message').html(whosTurn + " !<br>You Got Black-Jack!!");
    // }

}


function calculateTotal(hand, whosTurn) {
    var total = 0;
    var cardValue = 0;

    for (i = 0; i < hand.length; i++) {
        // purposely not fixing 11, 12, or 13 or 1 = 11
        var cardValue = Number(hand[i].slice(0, -1));
        total += cardValue;
    }

    var idToGet = '.' + whosTurn + '-total';
    $(idToGet).html(total);

    // if (total > 21) {
    //     bust(whosTurn);
    // } else if ( total == 21 ) {
    //     var whosTurn = whosTurn.charAt(0).toUpperCase() + whosTurn.slice(1,whosTurn.length);
    //     $('#message').html(whosTurn + " !<br>You Got Black-Jack!!");
    // }

    checkWinner(whosTurn);
}

function bust(who) {
    if (who === 'player') {
        $('#message').html("You have Busted!");
    } else {
        $('#message').html("The Dealer Busted!");
    }
}


function placeCard(card, who, slot) {
    var currentId = '#' + who + '-card-' + slot;

    for (var i = 0; i < theDeck.length; i++) {
        if (theDeck[i].CardNum == card) {
            $(currentId).css("background-position", theDeck[i].CardSpritePosition);
            break;
        }

    }
    // check to see if the car is an 11. if it is, then change the 11 to J. if it is a 
}


function shuffleDeck() {
    /* fill the deck, in order, for now.
        Deck is mad up of
        -- 52 cards
        -- 4 suits
        ---- h, s, d, c
    */
    // Max width to end of ACE -1036px
    // Blank 'face-down' card starts at -1px x -484px
    // go 1 row up from face-down card to start other card rows.
    // only other cards on face-down row are wildcards.

    var distanceHeight = '121px'; // Some precision
    var distanceWidth = '85px';
    var bottomStart = '-484px';
    var leftStart = '-1';
    var suit = "";
    var positionUpDown = "";
    var positionLeftRight = "";
    var arrayObjectString = {};
    var keys = "";
    var positions = "";
    var cardNumValue = "";
    var cardPositionValue = "";
    var cardSuit = "";
    var upDownCalculation = 0.0;
    var rowHearts = 0,
        rowDiamonds = 0,
        rowClubs = 0,
        rowSpades = 0;

    theDeck = []; // empty

    for (var s = 1; s <= 4; s++) {

        if (s === 1) {
            suit = 'h';
            positionUpDown = ((parseFloat(bottomStart) + parseFloat(distanceHeight) * 4).toPrecision(6) + "px");

        } else if (s === 2) {
            suit = 'd';
            positionUpDown = ((parseFloat(bottomStart) + parseFloat(distanceHeight) * 3).toPrecision(6) + "px");

        } else if (s === 3) {
            suit = 's';
            positionUpDown = ((parseFloat(bottomStart) + parseFloat(distanceHeight) * 2).toPrecision(6) + "px");

        } else if (s === 4) {
            suit = 'c';
            positionUpDown = ((parseFloat(bottomStart) + parseFloat(distanceHeight)).toPrecision(6) + "px");
        }


        for (var i = 1; i <= 13; i++) {

            arrayObjectString = {}; // empty
            cardNumValue = '';
            cardPositionValue = '';


            if (suit == 'h') {

                cardNumValue = (i + 1 + suit);
                rowHearts += (i == 1) ? -2 : (parseFloat(leftStart) - parseFloat(distanceWidth));
                positionLeftRight = rowHearts.toPrecision(6) + "px";

                cardSuit = "hearts";

            } else if (suit == 'd') {

                cardNumValue = (i + 1 + suit);
                rowDiamonds += (i == 1) ? -2 : (parseFloat(leftStart) - parseFloat(distanceWidth));
                positionLeftRight = rowDiamonds.toPrecision(6) + "px";

                cardSuit = "diamonds";

            } else if (suit == 's') {

                cardNumValue = (i + 1 + suit);
                rowSpades += (i == 1) ? -2 : (parseFloat(leftStart) - parseFloat(distanceWidth));
                positionLeftRight = rowSpades.toPrecision(6) + "px";

                cardSuit = "spades";

            } else if (suit == 'c') {

                cardNumValue = (i + 1 + suit);
                rowClubs += (i == 1) ? -2 : (parseFloat(leftStart) - parseFloat(distanceWidth));
                positionLeftRight = rowClubs.toPrecision(6) + "px";

                cardSuit = "clubs";
            }

            //cardPositionValue = positionLeftRight + " " + positionUpDown;
            arrayObjectString['CardNum'] = cardNumValue;
            arrayObjectString['CardSpritePosition'] = positionLeftRight + " " + positionUpDown;
            arrayObjectString['CardSuit'] = cardSuit;
            theDeck.push(arrayObjectString);

        }
    }


    randomIzeCards();
    for (var i = 0; i < theDeck.length; i++) {
        console.log(theDeck[i].CardNum + " | " + theDeck[i].CardSpritePosition + " | " + theDeck[i].CardSuit);
    }

}

/* 
    TODO: 
    What if the player gets blackjack on the deal?
    how can a card be an 11, 12 or 13?
    cant an ACE = 1 or 11 ?
    the player can keep hitting and standing after the game is over
    there is no win counter
    there is no wagering system
    there is no 'deck' to draw from
    the red cards aren't red
    there is no delay on the cards displaying ( its instant )
    you can see both dealer cards on dealerhand
*/

function randomIzeCards() {

    var numberOfTimesToShuffle = 500;
    for (var i = 1; i < numberOfTimesToShuffle; i++) {
        card1 = Math.floor(Math.random() * theDeck.length);
        card2 = Math.floor(Math.random() * theDeck.length);

        if (card1 != card2) {
            temp = theDeck[card1];
            theDeck[card1] = theDeck[card2];
            theDeck[card2] = temp;
        }
    }
}


function getSlot(_index) {
    var slot = '';
    
    if (_index == 2 ) slot = 'three';
    else if ( _index == 3 ) slot = 'four';
    else if ( _index == 4 ) slot = 'five';
    else if ( _index == 5 ) slot = 'six';
    
    return slot;
}