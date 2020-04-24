import { Character, Event, mongoose } from './db';

Character.deleteMany({}, (err) => { if (err) throw err; })
Event.deleteMany({}, (err) => { if (err) throw err; })

const last = array => array[array.length - 1];

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
    let model, story = {}, characters = [], events = [];
    try {
        for (let chara of CHARAS) {
            model = await Character.create(chara);
            characters.push(model)
            console.log(model.firstName)
        }
        for (let i = 0; i < 16; i++) {
            model = await Event.create({
                name: `Event ${i + 1}`,
                position: i
            })
            events.push(model)
            console.log(model.name)
        }
        for (let c of characters) {
            for (let ev of events) {
                story = {
                    description: `Story of event ${ev._id}`,
                    event: ev._id
                }
                c.stories.push(story);
                model = await c.save()
                story = last(model.stories);
                console.log(`Story ${story._id} added to Character ${model._id}`)
                ev.stories.push(story._id)
                await ev.save()
            }
        }

    } catch (err) {
        throw new Error('custom error ' + err)
    }
    console.log('DONE')
    mongoose.connection.close();
}

seed();