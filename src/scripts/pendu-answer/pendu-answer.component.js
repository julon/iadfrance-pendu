/** @ngInject */
class PenduAnswerController {
    printLetter(letter) {
        return letter.found ? letter.char : '_';
    }
}

export const penduAnswerComponent = {
    templateUrl: 'build/scripts/pendu-answer/pendu-answer.component.html',
    controller: PenduAnswerController,
    bindings: {
        word: '<'
    }
};
