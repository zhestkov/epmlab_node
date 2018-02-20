const fs = require('fs');
const prompt = require('prompt');
const colors = require('colors/safe');

const LOG_FILE = 'log.txt';
const FILE = process.argv[2] || LOG_FILE;
const GOAL_POINTS = 21;
const DEALER_MINIMAL_POINTS = 17;
const YES = 'yes';
const NO = 'no';
const START_GAME = 'Start the game?';
const TAKE_CARD = 'Hit you?';
const CHOOSE_ACE = 'Choose Ace equality (11 or 1)';

prompt.message = colors.green('Dealer');
prompt.delimiter = colors.cyan(': ');

const score = {
  '2': 2,
  '3': 3,
  '4': 4,
  '5': 5,
  '6': 6,
  '7': 7,
  '8': 8,
  '9': 9,
  '10': 10,
  'J': 10,
  'Q': 10,
  'K': 10,
  'A': {
    '1': 1,
    '11': 11
  },
};
const cards = [
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  'J',
  'Q',
  'K',
  'A',
];

shuffle = deck => {
  for (let i = deck.length - 1; i; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
}
makePack = (numOfDecks, cards) => {
  const pack = [];
  for (let i = 0; i < numOfDecks; i++) {
    for (let card of cards) {
      for (let j = 0; j < 4; j++) {
        pack.push(card);
      }
    }
  }
  return shuffle(pack);
}

let deck;
let dealerDeck = []
let playerDeck = []
let started = false;

calculatePoints = (personDeck) => {
  return personDeck.reduce((s, card) => s+score[card], 0);
}

showDealerCard = () => {
  console.log(`Dealer card: ${dealerDeck.join('')}`);
}
showPersonDeck = (personDeck) => {
  const person = (personDeck === dealerDeck) ? 'Dealer' : 'Player'
  console.log(personDeck.length === 0 ?
    'You have no cards' :
    `${person} cards: ${personDeck.join(', ')}`);
}
prompt.start();

isPositive = (question, res) => {
  const query = res[question].toLowerCase().replace(/yes|y/g, YES);
  return query === YES;
}
promptQuestion = (question, callback) => {
  prompt.get(question, (err, res) => {
    callback(isPositive(question, res));
  });
}

checkResults = (dealerPoints, playerPoints) => {
  if (playerPoints <= GOAL_POINTS && playerPoints > dealerPoints) {
    return 1; // player won
  } else if (playerPoints < GOAL_POINTS && playerPoints < dealerPoints && dealerPoints <= GOAL_POINTS) {
    return 2; // dealer won
  } else if (playerPoints < GOAL_POINTS && playerPoints < dealerPoints && dealerPoints > GOAL_POINTS) {
    return 1; // player won
  } else if (playerPoints > GOAL_POINTS) {
    return 2; // dealer won
  }
  return 0; // draw
}

dealerTurns = () => {
  let sum = score[dealerDeck[0]];
  while (sum < DEALER_MINIMAL_POINTS && calculatePoints(playerDeck) < GOAL_POINTS) {
    const card = deck.shift();
    dealerDeck.push(card);
    sum += (typeof score[card] !== 'object') ? score[card] : 1;
  }
  return sum;
}

askAboutAce = (cb) => {
  prompt.get(CHOOSE_ACE, (err, res) => {
    cb(res[CHOOSE_ACE]);
  })
}

makeTurn = () => {
  if (dealerDeck.length === 0) {
    const card = deck.shift();
    dealerDeck.push(typeof card === 'object' ? '11' : card);
    showDealerCard();
  }
  if (!started) return;
  promptQuestion(TAKE_CARD, (yes) => {
    if (yes && calculatePoints(playerDeck) < GOAL_POINTS) {
      const card = deck.shift();
      if (typeof score[card] !== 'object') {
        playerDeck.push(card);
      } else {
        askAboutAce((res) => {
          if (res === '11') {
            playerDeck.push(11);
          } else {
            playerDeck.push(1);
          }
        });
      }
      makeTurn();
    } else {
      started = false;
      const dealerPoints = dealerTurns();
      const playerPoints = calculatePoints(playerDeck);
      const points = `POINTS: dealer: ${dealerPoints} | YOU: ${playerPoints}`;
      console.log(points);
      showPersonDeck(dealerDeck);
      const res = checkResults(dealerPoints, playerPoints);
      let resultMessage;
      if (res === 1) {
        resultMessage = 'You won!';
      } else if (res === 2) {
        resultMessage = 'Dealer won';
      } else {
        resultMessage = 'Draw!';
      }
      console.log(resultMessage);
      fs.appendFile(FILE, `${points} => ${resultMessage}\n`, (err) => {
        if (err) throw err;
        console.log('Saved to log file');
      });
    }
    showPersonDeck(playerDeck);
  });
}
play = (numOfDecks, cards) => {
  // init the deck
   deck = makePack(numOfDecks, cards);
   // clean the deck arrays
   dealerDeck = [];
   playerDeck = [];
   // print log file
   fs.readFile(FILE, 'utf8', (err, data) => {
     console.log(data);
     // start dialog
     promptQuestion(START_GAME, (yes) => {
       if (yes) {
         console.log('Starting the game...');
         started = true;
         makeTurn();
       } else {
         console.log('Ok, maybe next time');
         started = false;
       }
     });
   });
}

play(8, cards);
