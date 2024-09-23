import { v4 as uuidv4 } from 'uuid';

export default class artifacts{

    uid: number;

    constructor(monItemInfo:any){
        Object.assign(this, monItemInfo)
        this.uid = uuidv4()

    }
}