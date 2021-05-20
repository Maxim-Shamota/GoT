export default class GotService {

    constructor() {
        this._apiBase = 'https://www.anapioficeandfire.com/api';
    }

    async getResourse(url) {
        const res = await fetch(`${this._apiBase}${url}`);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }

        return await res.json();
    }
    async getAllCharacters() {
        const res = await this.getResourse('/characters?page=10&pageSize=10');
        return res.map(this._transformCharacter);
    }
    async getCharacter(id) {
        const character = await this.getResourse(`/characters/${id}`);
        return this._transformCharacter(character);
    }
    async getAllBooks() {
        const res = await this.getResourse('/books?page=10&pageSize=10');
        return res.map(this._transformBook);
    }
    async getBook(id) {
        const book = await this.getResourse(`/books/${id}`);
        return this._transformBook(book);
    }
    async getAllHouses() {
        const res = await this.getResourse('/houses?page=10&pageSize=10');
        return res.map(this._transformHouse);
    }
    async getHouse(id) {
        const house = await this.getResourse(`/houses/${id}`);
        return this._transformHouse(house);
    }

    _transformCharacter(char) {
        return {
            name: char.name,
            gender: char.gender,
            born: char.born,
            died: char.died,
            culture: char.culture
        }
    }

    _transformHouse(house) {
        return {
            name: house.name,
            region: house.region,
            words: house.words,
            titles: house.titles,
            overlord: house.overlord,
            ancentralWeapons: house.ancentralWeapons
        }
    }

    _transformBook(book) {
        return {
            name: book.name,
            numberOfPages: book.numberOfPages,
            publiser: book.publiser,
            released: book.released
        }
    }
}
