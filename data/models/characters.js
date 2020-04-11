const initCharacter = mongoose => {
    const characterSchema = new mongoose.Schema({
        firstName: String,
        lastName: String,
        klass: String
    })
    return mongoose.model('Character', characterSchema)
}

export default initCharacter;