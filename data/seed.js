import { Character, Event, mongoose } from './db';

Character.deleteMany({}, (err) => { if (err) throw err; })
Event.deleteMany({}, (err) => { if (err) throw err; })

const CHARAS = [
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


const seed = async () => {
    let model, characters = [], events = [];
    try {
        for (let chara of CHARAS) {
            model = await Character.create(chara);
            characters.push(model)
            console.log(model.firstName)
        }
        for (let i = 0; i < 11; i++) {
            model = await Event.create({
                name: `Event ${i}`,
                position: i,
                characters: characters.map(x => x._id)
            })
            events.push(model)
            console.log(model.name)
        }
        for (let c of characters) {
            for (let ev of events) {
                c.events.push(ev);
                await c.save()
                console.log(ev._id, 'added to', c._id)
            }
        }

    } catch (err) {
        throw new Error('custom error ' + err)
    }
    console.log('DONE')
    mongoose.connection.close();
}

seed();