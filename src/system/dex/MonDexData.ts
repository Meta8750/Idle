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
}
  
  // Funktion, um die Daten in Firestore einzufügen
  const addMonToFirestore = async () => {
    try {
      const docRef = await addDoc(collection(db, "AttackDex"), newMon);
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };
  
  // Rufe die Funktion auf, um die Daten hinzuzufügen
  //addMonToFirestore(); 