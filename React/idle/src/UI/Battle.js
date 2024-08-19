import React from "react";
import { useState } from "react";
import Arena from '../system/Arena.js'

function Battle({player}) {

  const arena = new Arena([[0, 0, 0], [0, 1, 0]]);
  arena.genEnemys();

  // console.log(arena.enemys);

    return (
        <div>
          <p>
          </p>
        </div>
    )
}

export default Battle;