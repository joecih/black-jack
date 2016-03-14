/*
    Deal needs to call shuffle and assign the deck
    Set up a players starting hand
    place the cards in the correct spot.

*/
var theDeck = [];
var placeInDeck = 0;

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
    playerHand = [ theDeck[0], theDeck[2] ];
    dealerHand = [ theDeck[1], theDeck[3] ];
    placeInDeck = 4;
    placeCard(playerHand[0], 'player', 'one');
    placeCard(dealerHand[0], 'dealer', 'one');
    placeCard(playerHand[1], 'player', 'two');
    placeCard(dealerHand[1], 'dealer', 'two');
    
    calculateTotal(playerHand, 'player');
    calculateTotal(dealerHand, 'dealer');
};

function hit() {

};

function stand() {

};


function placeCard(card, who, slot) {
    var currentId = '#' + who + '-card-' + slot;
    $(currentId).removeClass('empty');
    $(currentId).html(card);
}

function calculateTotal(hand, whoTurn) {
    var total = 0;
    var cardValue = 0;
    
    for (i=0; i < hand.length; i++ ) {
        // purposely not fixing 11, 12, or 13 or 1 = 11
        var cardValue = Number(hand[i].slice(0,-1));
        total += cardValue;
        
        //console.log(cardValue);
    }
    
    var idToGet = '.' + whoTurn + '-total';
    $(idToGet).html(total);
}


function shuffleDeck() {
    /* fill the deck, in order, for now.
        Deck is mad up of
        -- 52 cards
        -- 4 suits
        ---- h, s, d, c
    */

    for (var s = 1; s <= 4; s++) {
        var suit = "";

        if ( s === 1 ) {
            suit = 'h';
        }
        else if ( s === 2 ) {
            suit = 's';
        }
        else if ( s === 3 ) {
            suit = 'd';
        }
        else if ( s === 4 ) {
            suit = 'c';
        } else { 
            suit = '';
        }


        for (var i = 1; i <= 13; i++) {
            theDeck.push(i + suit);
            //console.log("suit: " + suit);
        }
    }
    //console.log(theDeck);

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
    
    //console.log(theDeck);
}



