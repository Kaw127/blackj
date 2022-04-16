function startGame(){
  hidden = deck.pop();
  dealerSum += getValue(hidden);
  dealerAceCount += checkAce(hidden);
  //console.log(hidden);
  //console.log(dealerSum);
  while (dealerSum < 17){
      //<img> creating
      let cardImg = document.creatElement("img");
      let card = deck.pop();
      cardImg.src= "./cards/" + card + ".png";
      dealSum += getValue(card);
      dealerAceCount += checkAce(card);
      document.getElementById("dealer-cards").append(cardImg);
  }
  console.log(dealSum);
  

  for (let i = 0; i < 2; i++){
      let cardImg = document.creatElement("img");
      let card = deck.pop();
      cardImg.src= "./cards/" + card + ".png";
      yourSum += getValue(card);
      yourAceCount += checkAce(card);
      document.getElementById("your-cards").append(cardImg);
  }

  console.log(yourSum);
  document.getElementById("hit").addEventListener("click", hit);
  document.getElementById("stay").addEventListener("click", stay);
}

function hit(){
  if (!canHit){
      return;
  }

  let cardImg = document.creatElement("img");
      let card = deck.pop();
      cardImg.src= "./cards/" + card + ".png";
      yourSum += getValue(card);
      yourAceCount += checkAce(card);
      document.getElementById("your-cards").append(cardImg);

      if(reduceAce (yourSum, yourAceCount) > 21){
          canHit = false;
      }
}

function stay(){
  dealerSum = reduceAce(dealerSum, dealerAceCount);
  yourSum = reduceAce(yourSum, yourAceCount);

  canHit = false;
  cocument.getElementById("hidden").src = "./cards/" + hidden + ".png";

  let message = "";
  if (yourSum > 21){
      message = "You Lose";
  }
  else if(dealerSum > 21){
      message = "You win";
  }
  else if (yourSum == dealerSum){
      message = "tie";
  }
  else if (yourSum > dealerSum){
      message = "you win";
  }
  else if (yourSum < dealerSum){
      message = "you lose";
  }

  document.getElementById("dealer-sum").innerText = dealerSum;
  document.getElementById("your-sum").innerText = yourSum;
  document.getElementById("results").innerText = message;
}

function getValue(card){
  let data = card.split("-"); //"4-C" ["4", "c"]
  let value = data[0];

  if(isNan(value)){//A J Q K
   if (value == "A"){
      return 11;
  }
  return 10;
  }
  
  return parseInt(value);
}

function checkAce(card){
  if (card[0] == "A"){
      return 1;
  }
  return 0;
}

function reduceAce (playerSum, playerAceCount){
  while (playerSum > 21 && playerAceCount > 0){
      playerSum -= 10;
      playerAceCount -= 1;
  }
  return playerSum;
}