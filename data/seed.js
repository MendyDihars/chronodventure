import { Character } from './db';

const handleSave = (err) => {
    if (err) throw new Error('An error raider at the creation', err);
    console.log('OK');
}

const n = Math.floor(Math.random() * 10) + 3;
let chara;
for (let i = 1; i <= n; i++) {
    chara = new Character({
        firstName: `Jean #${i}`,
        lastName: `Dupont ${i}`
    })
    chara.save(handleSave);
}