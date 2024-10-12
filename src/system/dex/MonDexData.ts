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

export const monData: MonData[] = [];

// Funktion, um die Daten aus Firestore abzurufen
export const fetchMonData = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "MonDex"));
    querySnapshot.forEach((doc) => {
      // Füge jedes Dokument zur monData-Array hinzu
      monData.push({ id: doc.id, ...doc.data()});
    });
    console.log("Mon data fetched: ", monData);
  } catch (e) {
    console.error("Error fetching mon data: ", e);
  }
};


fetchMonData();

const newMon = {
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
  };
  
  // Funktion, um die Daten in Firestore einzufügen
  const addMonToFirestore = async () => {
    try {
      const docRef = await addDoc(collection(db, "MonDex"), newMon);
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };
  
  // Rufe die Funktion auf, um die Daten hinzuzufügen
  //addMonToFirestore(); 