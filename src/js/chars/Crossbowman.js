import { Archer } from './Archer.js'
import { Longbow } from '../weapons/Longbow.js'
import { Knife } from "../weapons/Knife.js";
import { Arm } from "../weapons/Arm.js";

export class Crossbowman extends Archer{
    constructor(position, name) {
        super(position, name);
        this.life = 85;
        this.attack = 8;
        this.agility = 20;
        this.luck = 15;
        this.description = 'Арбалетчик';
        this.weapon = new Longbow();
        this.weapons = [this.weapon, new Knife(), new Arm()];
        this.currentWeaponIndex = 0;
    }
}