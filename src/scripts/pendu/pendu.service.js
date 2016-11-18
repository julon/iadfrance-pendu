import {alphabet, words} from '../data';

export class PenduService {

    getFullAlphabet() {
        var result = [];
        for (let i = 0; i < alphabet.length; i++) {
            result.push({
                order: i,
                char: alphabet.charAt(i),
                used: false
            });
        }
        return result;
    }

    getRandomWord() {
        const word = words[Math.floor(Math.random() * words.length)].toUpperCase();
        var result = [];
        for (let i = 0; i < word.length; i++) {
            result.push({
                order: i,
                char: word.charAt(i),
                found: false
            });
        }
        return result;
    }
}
