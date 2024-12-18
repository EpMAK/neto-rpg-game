import './css/style.css';
import {play} from "./js/game.js";
import { Archer } from './js/chars/Archer.js'
import { Crossbowman } from './js/chars/Crossbowman.js'
import { Demiurge } from './js/chars/Demiurge.js'
import { Dwarf } from './js/chars/Dwarf.js'
import { Mage } from './js/chars/Mage.js'
import { Player } from './js/chars/Player.js'
import { Warrior } from './js/chars/Warrior.js'

const players = [
     new Player(1, 'Игрок'),
     new Archer(0,'Лучник'),
     new Crossbowman(4,'Арбалетчик'),
     new Demiurge(5,'Демиург'),
     new Dwarf(-1,'Гном'),
     new Mage(-2,'Маг'),
     new Warrior(3,'Воин')
 ];

play(players);