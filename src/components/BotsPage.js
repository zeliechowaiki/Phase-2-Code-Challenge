import {React, useState, useEffect} from "react";
import YourBotArmy from "./YourBotArmy";
import BotCollection from "./BotCollection";

function BotsPage() {
  //start here with your code for step one
  const [allBots, setAllBots] = useState([]);
  const [myBots, setMyBots] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8002/bots')
    .then(resp => resp.json())
    .then(data => setAllBots(data));
  })

  function addBot(addedBot) {
    if (myBots.every(bot => bot.id !== addedBot.id)) {
      setMyBots([...myBots, addedBot]);
    }
  }

  function removeBot(removedBot) {
    setMyBots(myBots.filter(bot => bot.id !== removedBot.id));
  }

  function deleteBot(deletedBot) {
    fetch(`http://localhost:8002/bots/${deletedBot.id}`,
    {method: 'DELETE'})
    .then(() => {
      removeBot(deletedBot);
      setAllBots(allBots.filter(bot => bot.id !== deletedBot.id));
    })
  }

  return (
    <div>
      <YourBotArmy bots={myBots} onBotCardClick={removeBot} onDeleteClick={deleteBot} />
      <BotCollection bots={allBots} onBotCardClick={addBot} onDeleteClick={deleteBot} />
    </div>
  )
}

export default BotsPage;
