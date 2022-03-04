import React from "react";
import BotCard from "./BotCard";

function BotCollection({bots, onBotCardClick, onDeleteClick}) {
  // Your code here
  return (
    <div className="ui four column grid">
      <div className="row">
        {
          bots.map(bot => {
            return <BotCard key={bot.id} bot={bot}
            onBotCardClick={onBotCardClick} onDeleteClick={onDeleteClick} />
          })
        }
        Collection of all bots
      </div>
    </div>
  );
}

export default BotCollection;
