import React from "react";
import BotCard from "./BotCard";

function YourBotArmy({bots, onBotCardClick, onDeleteClick }) {
  //your bot army code here...

  return (
    <div className="ui segment inverted olive bot-army">
      <div className="ui five column grid">
        <div className="row bot-army-row">
          {
            bots.map(bot => {
              return <BotCard key={bot.id} bot={bot}
              onBotCardClick={onBotCardClick} onDeleteClick={onDeleteClick} />
            })
          }
          Your Bot Army
        </div>
      </div>
    </div>
  );
}

export default YourBotArmy;
