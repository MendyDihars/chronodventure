import { Character } from './db';

Character.remove({}, (err) => { if (err) throw err; })

const handleSave = (err) => {
    if (err) throw new Error('An error raider at the creation', err);
    console.log('OK');
}

const charas = [
    {
        firstName: 'Mael',
        lastName: 'Klein'
    },
    {
        firstName: 'Bruldal',
        lastName: 'Olfkromm'
    },
    {
        firstName: 'Eris',
        lastName: ''
    },
    {
        firstName: 'Exilwyn',
        lastName: 'Agatar'
    },
    {
        firstName: 'Kerrek',
        lastName: 'Gundaar'
    },
    {
        firstName: 'Tendaji',
        lastName: 'Maathaï'
    }
]

charas.forEach(c => {
    new Character(c).save(handleSave)
})

