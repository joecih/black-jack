/*
    Deal needs to call shuffle and assign the deck
    Set up a players starting hand
    place the cards in the correct spot.

*/
var theDeck = [];
var placeInDeck = 0;
var playerTotalCards = 2;
var dealerTotalCards = 2;

$(document).ready(function() {
    $('button').click(function() {
        var clickedButton = $(this).attr('id');

        if (clickedButton == 'draw-button') {
            deal();
        } else if (clickedButton == 'hit-button') {
            hit();
        } else if (clickedButton == 'stand-button') {
            stand();
        }

        console.log("Button clicked: " + clickedButton);
    });
});

function deal() {
    shuffleDeck();
    playerHand = [theDeck[0], theDeck[2]];
    dealerHand = [theDeck[1], theDeck[3]];
    placeInDeck = 4;
    placeCard(playerHand[0], 'player', 'one');
    placeCard(dealerHand[0], 'dealer', 'one');
    placeCard(playerHand[1], 'player', 'two');
    placeCard(dealerHand[1], 'dealer', 'two');

    calculateTotal(playerHand, 'player');
    calculateTotal(dealerHand, 'dealer');


    // $('#message').html("");
    // $('#player-card-one').css("background-position", cardPositionObj.o2c);
};

function hit() {
    var slot = "";
    if (playerTotalCards == 2) {
        slot = 'three';
    } else if (playerTotalCards == 3) {
        slot = 'four';
    } else if (playerTotalCards == 4) {
        slot = 'five';
    } else if (playerTotalCards == 5) {
        slot = 'six';
    }

    //console.log(theDeck[placeInDeck]);

    placeCard(theDeck[placeInDeck], 'player', slot);
    playerHand.push(theDeck[placeInDeck]);
    placeInDeck++;
    playerTotalCards++;
    calculateTotal(playerHand, 'player');
};

function stand() {
    var dealerTotal = $('.dealer-total').html();
    while (dealerTotal < 17) {
        if (playerTotalCards == 2) {
            slot = 'three';
        } else if (playerTotalCards == 3) {
            slot = 'four';
        } else if (playerTotalCards == 4) {
            slot = 'five';
        } else if (playerTotalCards == 5) {
            slot = 'six';
        }

        placeCard(theDeck[placeInDeck], 'dealer', slot);
        dealerHand.push(theDeck[placeInDeck]);
        dealerTotalCards++;
        placeInDeck++;
        console.log(dealerHand);
        calculateTotal(dealerHand, 'dealer');
        dealerTotal = $('.dealer-total').html(); // check for loop break;
    }

    checkWinner();
};


function checkWinner() {
    var playerHas = Number($('.player-total').html());
    var dealerHas = Number($('.dealer-total').html());

    if (dealerHas > 21) {
        // dealer has busted.
    } else {
        // neither player has busted and the dealer has at least 17
        if (playerHas > dealerHas) {
            $('#message').html("You have beaten the dealer!");
        } else if (dealerHas > playerHas) {
            $('#message').html("Sorry the house wins again!!");
        } else {
            $('#message').html("It\'s a Push!");
        }
    }

}


function placeCard(card, who, slot) {
    var currentId = '#' + who + '-card-' + slot;
    $(currentId).removeClass('empty');
    $(currentId).html(card);
    // check to see if the car is an 11. if it is, then change the 11 to J. if it is a 
}

function calculateTotal(hand, whosTurn) {
    var total = 0;
    var cardValue = 0;

    for (i = 0; i < hand.length; i++) {
        // purposely not fixing 11, 12, or 13 or 1 = 11
        var cardValue = Number(hand[i].slice(0, -1));
        total += cardValue;

        //console.log(cardValue);
    }

    var idToGet = '.' + whosTurn + '-total';
    $(idToGet).html(total);

    if (total > 21) {
        bust(whosTurn);
    }

    // Add return in!!!
    return total;
}

function bust(who) {
    if (who === 'player') {
        $('#message').html("You have Busted!");
    } else {
        $('#message').html("The Dealer Busted!");
    }
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

    var distanceHeight = '120.5px'; // Some precision
    var distanceWidth = '88.5px';
    var bottomStart = '-484px';
    var leftStart = '-1';
    var suit = "";
    var positionUp = "";
    var positionRight = "";
    var arrayObjectString = {};
    var keys = "";
    var positions = "";

    for (var s = 1; s <= 4; s++) {

        if (s === 1) {
            suit = 'h';
            positionUp = ((parseFloat(bottomStart) + parseFloat(distanceHeight) * 3).toPrecision(6) + "px");

        } else if (s === 2) {
            suit = 'd';
            positionUp = ((parseFloat(bottomStart) + parseFloat(distanceHeight) * 2).toPrecision(6) + "px");

        } else if (s === 3) {
            suit = 's';
            positionUp = ((parseFloat(bottomStart) + parseFloat(distanceHeight) * 1).toPrecision(6) + "px");

        } else if (s === 4) {
            suit = 'c';
            positionUp = ((parseFloat(bottomStart) + parseFloat(distanceHeight)).toPrecision(6) + "px");

        }


        for (var i = 1; i <= 13; i++) {
            // theDeck.push("key" + i + suit + ":" + );
            // theDeck.push("key" + i + suit + ":" + "empty");

            if (suit == 'h') {
                positionRight = ((parseFloat(leftStart) + parseFloat(distanceWidth) * 3).toPrecision(6) + "px");
                arrayObjectString[i + suit] = positionUp + " " + positionRight;
            } else if (suit == 'd') {
                positionRight = ((parseFloat(leftStart) + parseFloat(distanceWidth) * 2).toPrecision(6) + "px");
                arrayObjectString[i + suit] = positionUp + " " + positionRight;
            } else if (suit == 's') {
                positionRight = ((parseFloat(leftStart) + parseFloat(distanceWidth) * 1).toPrecision(6) + "px");
                arrayObjectString[i + suit] = positionUp + " " + positionRight;
            } else if (suit == 'c') {
                positionRight = ((parseFloat(leftStart) + parseFloat(distanceWidth)).toPrecision(6) + "px");
                arrayObjectString[i + suit] = positionUp + " " + positionRight;
            }
        }
    }
    arrayObjectString['backside'] = '-1px -484px';
    theDeck.push(arrayObjectString);
    console.log(theDeck);
    
    // for ( var key in theDeck ) {
    //     console.log(key);
    // }

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

    //console.log(Object.keys(theDeck[0]));
    
    // for ( var key in theDeck[0]) {
    //     console.log(key + " | " + theDeck[0][key]);
    // }
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