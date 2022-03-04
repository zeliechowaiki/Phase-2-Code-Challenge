import {React, useState, useEffect} from "react";
import YourBotArmy from "./YourBotArmy";
import BotCollection from "./BotCollection";
import BotSpecs from "./BotSpecs";

function BotsPage() {
  //start here with your code for step one
  const [allBots, setAllBots] = useState([]);
  const [myBots, setMyBots] = useState([]);
  const [checkedBot, setCheckedBot] = useState({});
  const [isSpecs, setIsSpecs] = useState(false);

  useEffect(() => {
    fetch('http://localhost:8002/bots')
    .then(resp => resp.json())
    .then(data => setAllBots(data));
  },[]);

  function checkBot(clickedBot) {
    setCheckedBot(clickedBot);
    setIsSpecs(true);
  }

  function unenlistBot(unenlistedBot) {
    setAllBots([unenlistedBot, ...allBots]);
    setMyBots(myBots.filter(bot => bot.id !== unenlistedBot.id));
  }

  function deleteBot(deletedBot) {
    fetch(`http://localhost:8002/bots/${deletedBot.id}`,
    {method: 'DELETE'})
    .then(() => {
      setMyBots(myBots.filter(bot => bot.id !== deletedBot.id));
      setAllBots(allBots.filter(bot => bot.id !== deletedBot.id));
    })
  }

  function goBack() {
    setIsSpecs(false);
  }

  function enlistBot(enlistedBot) {
    setAllBots(allBots.filter(bot => bot.id !== enlistedBot.id));
    setMyBots([...myBots, enlistedBot]);
    setIsSpecs(false);
  }

  console.log(allBots);

  return (
    <div>
      <YourBotArmy bots={myBots} onBotCardClick={unenlistBot} onDeleteClick={deleteBot} />
      {
        isSpecs ? 
        <BotSpecs bot={checkedBot} onBackClick={goBack} onEnlistClicked={enlistBot} /> :
        <BotCollection bots={allBots} onBotCardClick={checkBot} onDeleteClick={deleteBot} />
      }
    </div>
  )
}

export default BotsPage;
