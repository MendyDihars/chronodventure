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
    let model, characters = [], events = [], stories = [];
    try {
        for (let chara of CHARAS) {
            model = await Character.create(chara);
            characters.push(model)
            console.log(model.firstName)
        }
        for (let i = 0; i < 30; i++) {
            model = await Event.create({
                name: `Event ${i}`,
                position: i
            })
            events.push(model)
            console.log(model.name)
        }
        for (let c of characters) {
            for (let ev of events) {
                c.stories.push({
                    description: `Story of event ${ev._id}`,
                    event: ev._id
                });
                model = await c.save()
                stories.push(model.stories[model.stories.length - 1])
                console.log(`Story ${model.stories[model.stories.length - 1]._id} added to Character ${c._id}`)
            }
        }
        for (let story of stories) {
            let ev = await Event.findById(story.event)
            ev.stories.push(story._id)
            await ev.save();
            console.log(`Story ${story._id} added to Event ${ev._id}`)
        }

    } catch (err) {
        throw new Error('custom error ' + err)
    }
    console.log('DONE')
    mongoose.connection.close();
}

seed();