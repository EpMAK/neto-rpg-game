import { Staff } from './Staff.js'

export class StormStaff extends Staff{
    constructor() {
        super();
        this.name = 'Посох Бури';
        this.attack = 10;
        this.range = 3;
    }
}