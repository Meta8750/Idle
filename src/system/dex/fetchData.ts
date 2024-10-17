import dex from './generator.ts'
import { getDocs, getDoc, collection, addDoc , doc} from "firebase/firestore";
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
let cache: { [key: string]: any } = {};
export const monData: MonData[] = [];
export const attackData: AttackData[] = [];


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
fetchMonData()

const idMapping = {
  10000: "m5GUTFdvuqDwgqKO9UTk",
  10001:"w61j3EYq5E01sGe05V9Y",
  10003: "UkuosbAO0Eut6tzEUM8i",
  10005: "VSIeXi8aJGJV7eGsjm4D",
  10044: "apGQd7Cq1E2owGSYRhpZ",
  10074: "TLxNd9iFKBTNjvv0xG1U",
  10095: "gTVA5x32HJPYngrsv0MW",
  
  20000: "2qN4xYRY0qL09gBFhdfl",
  20001: "kBW4eIZMPkQJkXOQ4VMH",
  20002: "ttgSfMl2Wy6CImOPOPzR",
  20003: "4aeerP8FkE8pW83WYW1B",
  20004: "vFGlX8nTJPeiwvSaHMCg",
  20005: "ArZHaCdYo9FHXugGjP8N",
  20021: "VKFkBkhJrmfvC1Vl0n7g",
  20022: "i0Gv1Z4hvXCwj0f7tisQ",
  20023: "C73lYfJyZDunA56TSQrL",
  20024: "FKixtkwBEfNWG5bWXjLu",
  21000: "ouqB3Ksr7TDXlm4TuVQE",
  22000: "8fqsIX5x8n24xmmYR331",

};

export const fetchDataById = async (id, table) => {
  
  if (cache[id]) {
    return cache[id];
  }
  try {
    id = idMapping[id]; 
    // Hole ein spezifisches Mon anhand der ID
    const monDocRef = doc(db, table, id);
    const monDocSnap = await getDoc(monDocRef);

    if (monDocSnap.exists()) {
    
      const monData = { id: monDocSnap.id, ...monDocSnap.data() };
     
      cache[id] = monData; 
      return monData;
    } else {
   
      console.log("No such document!");
      return null;
    }
  } catch (e) {
    console.error("Error fetching mon data: ", e);
    return null;
  }
}

const newMon = {
  name: "Voracity",
  id: 20025,
  level: 1,
  type: "AP",
  element: "Dark",
  baseDMG: 50,
  adScaling: 0.5,
  apScaling: 0.5,
  manaCost: 10,
  armorPen:0,
  mrPen:0,
  heal: false,
  aoe:true,
  cd: 2,
  passive: 50003,
  
}

  const addMonToFirestore = async () => {
    try {
      const docRef = await addDoc(collection(db, "AttackDex"), newMon);
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
  element: "Dark",
  baseDMG: 10,
  adScaling: 1,
  apScaling: 0,
  manaCost: 10,
  armorPen:0,
  mrPen:0,
  heal: false,
  aoe:true,

*/
