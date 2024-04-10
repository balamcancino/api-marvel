export class Event{

    #id
    #name
    #description
    #path

    #character = []
    #comic = []
    #creator = []
    #serie = []
    #story = []

    setId(id){this.#id = id}
    getId(){return this.#id}

    setName(name){this.#name = name}
    getName(){return this.#name}

    setDescription(description){this.#description = description}
    getDescription(){return this.#description}

    setPath(path){this.#path = path}
    getPath(){return this.#path}

    addCharacter(character){this.#character.push(character)}
    getCharacters(){return this.#character}

    addComic(comic){this.#comic.push(comic)}
    getComics(){return this.#comic}

    addCreator(creator){this.#creator.push(creator)}
    getCreators(){return this.#creator}

    addSerie(serie){this.#serie.push(serie)}
    getSeries(){return this.#serie}

    addStory(story){this.#story.push(story)}
    getStories(){return this.#story}
}