import React, { useState } from 'react';

export default class Enemy{
  constructor(name, health, attack){
    this.name = name;
    this.health = health;
    this.attack = attack;
  }

  attackEnemy(enemy){
    enemy.health -= this.attack;
  }
}
