import { listEvents } from "./dependencies.js"
import { Event } from "../models/Event.js"
import { Character } from "../models/category/Character.js"
import { Comics } from "../models/category/Comics.js"
import { Creators } from "../models/category/Creators.js"
import { Series } from "../models/category/Series.js"
import { Stories } from "../models/category/Stories.js"


const url = 'https://gateway.marvel.com:443/v1/public/events?limit=5&ts=10&apikey=a954ef74c292bed443a64d0d2f039338&hash=814efe62b163e631738b031a69cd34ac'

const cargar = document.getElementById("cargar")
cargar.addEventListener("click", function (){

    fetch(url)
    .then((response) => response.json())
    .then(data =>{

        data.data.results.forEach(element => {

            let event = new Event()
            event.setId(element.id)
            event.setName(element.title)
            event.setPath(element.thumbnail.path)
            event.setDescription(element.description)
            
            console.log(
                `id: ${event.getId()} \n`+
                `name: ${event.getName()} \n`+
                `path: ${event.getPath()} \n`+
                `description ${event.getDescription()}`
            )

            element.characters.items.forEach(item => {
                let char = new Character()
                char.setName(item.name)
                event.addCharacter(char)
            })

            element.comics.items.forEach(item =>{
                let comic = new Comics()
                comic.setName(item.name)
                event.addComic(comic)
            })

            element.creators.items.forEach(item =>{
                let creator = new Creators()
                creator.setName(item.name)
                creator.setRole(item.role)
                event.addCreator(creator)
            })

            element.series.items.forEach(item =>{
                let serie = new Series()
                serie.setName(item.name)
                event.addSerie(serie)
            })

            element.stories.items.forEach(item =>{
                let story = new Stories()
                story.setName(item.name)
                story.setType(item.type)
                event.addStory(story)
            })

            listEvents.addEvent(event)
        })
    })
})

let view = document.getElementById("mostrar")
const print = document.getElementById("imprimir")
print.addEventListener("click",function (){

    listEvents.getEvenst().forEach(event => {
        let container = document.createElement("div")

        let divIdEvent = document.createElement("div")
        let idEvent = document.createElement("p")
        idEvent.innerHTML = event.getId()
        divIdEvent.appendChild(idEvent)
        container.appendChild(divIdEvent)

        let divNameEvent = document.createElement("div")
        let nameEvent = document.createElement("p")
        nameEvent.innerHTML = event.getName()
        divNameEvent.appendChild(nameEvent)
        container.appendChild(divNameEvent)

        let divImg = document.createElement("div")
        let img = document.createElement("img")
        img.setAttribute("src",`${event.getPath()}.jpg`)
        divImg.appendChild(img)
        container.appendChild(img)

        let divDescription = document.createElement("div")
        let description = document.createElement("p")
        description.innerHTML = event.getDescription()
        divDescription.appendChild(description)
        container.appendChild(divDescription)

        event.getCharacters().forEach(char => {
            let divChar = document.createElement("div")
            let nameChar = document.createElement("p")
            nameChar.innerHTML = char.getName()
            divChar.appendChild(nameChar)
            container.appendChild(divChar)
        })

        event.getComics().forEach(comic => {
            let divNameComic = document.createElement("div")
            let nameComic = document.createElement("p")
            nameComic.innerHTML = comic.getName()
            divNameComic.appendChild(nameComic)
            container.appendChild(divNameComic)
        })

        event.getCreators().forEach(creator =>{
            let divCreator = document.createElement("div")
            let divNameCreator = document.createElement("div")
            let divRolCreator = document.createElement("div")

            let nameCreator = document.createElement("p")
            let roleCreator = document.createElement("p")
            nameCreator.innerHTML = creator.getName()
            roleCreator.innerHTML = creator.getRole()

            divNameCreator.appendChild(nameCreator)
            divRolCreator.appendChild(roleCreator)

            divCreator.appendChild(divNameCreator)
            divCreator.appendChild(divRolCreator)

            container.appendChild(divCreator)
        })

        event.getSeries().forEach(serie =>{
            let divNameSerie = document.createElement("div")
            let nameSerie = document.createElement("p")
            nameSerie.innerHTML = serie.getName()
            divNameSerie.appendChild(nameSerie)
            
            container.appendChild(divNameSerie)
        })

        event.getStories().forEach(story =>{
            let divStory = document.createElement("div")
            let divNameStory = document.createElement("div")
            let divTypeStory = document.createElement("div")

            let nameStory = document.createElement("p")
            let typeStory = document.createElement("p")

            nameStory.innerHTML = story.getName()
            typeStory.innerHTML = story.getType()

            divNameStory.appendChild(nameStory)
            divTypeStory.appendChild(typeStory)

            divStory.appendChild(divNameStory)
            divStory.appendChild(divTypeStory)

            container.appendChild(divStory)
        })

        view.appendChild(container)
    })

})