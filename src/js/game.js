import { Archer } from './chars/Archer.js'
import { Crossbowman } from './chars/Crossbowman.js'
import { Demiurge } from './chars/Demiurge.js'
import { Dwarf } from './chars/Dwarf.js'
import { Mage } from './chars/Mage.js'
import { Player } from './chars/Player.js'
import { Warrior } from './chars/Warrior.js'

function play() {
    const player = new Player();
    const warrior = new Warrior();
    const archer = new Archer();
    const dwarf = new Dwarf();
    const mage = new Mage();
    const demiurge = new Demiurge();
    const crossbowman = new Crossbowman();
}
