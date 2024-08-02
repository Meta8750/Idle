import React, { useState, useEffect } from 'react';

function Player({time, setTime, updateItem, activity, skills, updateSkillExp}) {
  // Initialisieren des Spielerzustands
  const [player, setPlayer] = useState({
    name: 'Player1',
    health: 100,
    level: 1,
    exp: 0,
    
  });

  useEffect(() => {
    if (activity){
      const job = activity.job;
      const skill = skills[job]
      
      
      
      console.log(skills)
      if (time >= skill.CD){
        setTime((prev)=> prev = 0)
        updateSkillExp('Mining', activity.exp)
        activity.mastery += 1
        updateItem(activity)

    }
  }
  
}, [time, activity, player]);

  return (
    <div>
      <h1>{player.name}</h1>
      <p>Health: {player.health}</p>
      <p>Level: {player.level}</p>
      <p>EXP: {player.exp}</p>

      <h2>Skills</h2>
      {Object.keys(skills).map((skillKey) => {
        const skill = skills[skillKey]; // Hole das Skill-Objekt
        return (
          <div key={skillKey}>
            <h3>{skillKey}</h3>
            <p>Level: {skill.level}</p>
            <p>EXP: {skill.exp}</p>
            <p>Next Level: {skill.nextLevel}</p>
          </div>
        );
      })}
    </div>
  );
}
export default Player;