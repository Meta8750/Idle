import dex from './generator.ts'
import { getDocs, collection, addDoc } from "firebase/firestore";
import  {db}  from '../../firebaseConfig.js';


type MonData = {
    name: string;
    id: number;
    level: number;
    type: string;
    rarity: string;
    tier: number;
    role: string;
    
    stats: {
        maxHealth: number;
        baseAP: number;
        baseAD: number;
        baseArmour: number;
        baseMR: number;
        baseMS: number;
        baseCritRate: number;
        baseCritDamage: number;
        maxMana: number;
        maxHealthDmg: number;
        currentHealthDmg:number;
        armourPen: number;
        mrPen: number;

    },
    lifeSteal: number;
    healthGrowth: number;
    ADGrowth: number;
    APGrowth: number;
    armourGrowth: number;
    MRGrowth: number;
    MSGrowth: number;
    manaGrowth: number;
    attacks: any[],
    statusChance: number;
}

type AttackData = {
  name: string,
  id: number,
  level: number,
  type: string,
  baseDMG: number,
  adScaling: number,
  apScaling: number,
  manaCost: number,
  armorPen: number,
  mrPen: number,
  heal: boolean,
  aoe: boolean,
  buffs?: {},
  debuffs?: {},
  status?:{},
  passive?: (animon : any) => void
  description?: (animon: any, attack: AttackData) => JSX.Element;
  
}

export const monData: MonData[] = [];
export const attackData: AttackData[] = [];

// Funktion, um die Daten aus Firestore abzurufen
export const fetchMonData = async () => {
  try {
    let querySnapshot = await getDocs(collection(db, "MonDex"));
    querySnapshot.forEach((doc) => {
      // Füge jedes Dokument zur monData-Array hinzu
      monData.push({ id: doc.id, ...doc.data()});
    });

    querySnapshot = await getDocs(collection(db, "AttackDex"));
    querySnapshot.forEach((doc) => {
      // Füge jedes Dokument zur monData-Array hinzu
      attackData.push({ id: doc.id, ...doc.data()});
    });


    console.log("Mon data fetched: ", monData);
    console.log("Attack data fetched: ", attackData);
  } catch (e) {
    console.error("Error fetching mon data: ", e);
  }
};


fetchMonData();

const newMon = {
  name: "Malphite",
  id: 10095,
  level: 1,
  rarity: "SSR",
  tier: 3,
  type: "Dark",
  role: "Tank",  
  stats: {
    maxHealth: 1000,
    baseAD: 5,
    baseAP: 0,
    baseArmour: 50,
    baseMR: 50,
    baseMS: 250,  
    baseCritRate: 0.05,
    baseCritDamage: 0.15,
    maxMana: 100,
    armourPen: 0,
    mrPen: 0,
    maxHealthDmg: 0,
    currentHealthDmg: 0,
  },
  ADGrowth: 1.5,
  APGrowth: 0.5,
  healthGrowth: 40,
  armourGrowth: 3,
  MRGrowth: 2,
  MSGrowth: 5,
  manaGrowth: 10,
  lifeSteal: 0.0,
  statusChance: 0.5,
  attacks: [22000, 22000, 21000, 20004],
}

  const addMonToFirestore = async () => {
    try {
      const docRef = await addDoc(collection(db, "MonDex"), newMon);
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };
  
   // addMonToFirestore(); 
/*
  name: "Vagabund",
  id: 10000,
  level: 1,
  rarity: "common",
  tier: 1,
  type: "Fire",
  role: "DD",  
  stats: {
    maxHealth: 100,
    baseAD: 10,
    baseAP: 5,
    baseArmour: 2,
    baseMR: 1,
    baseMS: 300,  
    baseCritRate: 0.05,
    baseCritDamage: 0.2,
    maxMana: 100,
    armourPen: 0,
    mrPen: 0,
    maxHealthDmg: 0,
    currentHealthDmg: 0,
  },
  ADGrowth: 1.5,
  APGrowth: 0.5,
  healthGrowth: 10,
  armourGrowth: 1,
  MRGrowth: 0.5,
  MSGrowth: 5,
  manaGrowth: 10,
  lifeSteal: 0.0,
  statusChance: 0.5,
  attacks: [21000, 21000, 21000, 20000],

   name: "Ammagedon",
  id: 20999,
  level: 1,
  type: "AD",
  baseDMG: 10,
  adScaling: 1,
  apScaling: 0,
  manaCost: 10,
  armorPen:0,
  mrPen:0,
  heal: false,
  aoe:true,

*/
