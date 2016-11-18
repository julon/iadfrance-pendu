import {title, maxFailedAttempt} from '../data';

/** @ngInject */
class PenduController {

    constructor($mdDialog, $mdToast, $state, PenduService) {
        this.$mdDialog = $mdDialog;
        this.$mdToast = $mdToast;
        this.$state = $state;
        this.PenduService = PenduService;
    }

    $onInit() {
        this.title = title;
        // compute the initial set of keys
        this.keys = this.PenduService.getFullAlphabet();
        // compute our word with required fields
        this.word = this.PenduService.getRandomWord();
    }

    getLettersWithoutDuplicates() {
        return this.word
            .filter((obj, pos, arr) => arr.map(mapObj => mapObj.char).indexOf(obj.char) === pos);
    }

    getCountTotalAttempts() {
        return this.keys.filter(key => key.used).length;
    }

    getCountLettersFound() {
        return this.getLettersWithoutDuplicates()
            .filter(letter => letter.found)
            .length;
    }

    getCountRemainingAttempts() {
        return maxFailedAttempt - (this.getCountTotalAttempts() - this.getCountLettersFound());
    }

    showToast(message) {
        this.$mdToast.show(
            this.$mdToast.simple()
            .textContent(message)
            .position('top right')
            .parent('.toast-bounds')
            .hideDelay(3000)
        );
    }

    showConfirm(message) {
        const confirm = this.$mdDialog.confirm()
            .textContent(message)
            .ariaLabel(message)
            .ok('Rejouer')
            .cancel('Accueil');

        this.$mdDialog
            .show(confirm)
            .then(() => {
                // redo the game
                this.$state.reload();
            }, () => {
                // go back to home
                this.$state.go('home');
            });
    }

    checkResult() {
        const founds = this.getCountLettersFound();
        const attempts = this.getCountTotalAttempts();
        const win = founds === this.getLettersWithoutDuplicates().length;
        const wrongAttempts = attempts - founds;

        if (win) {
            this.showConfirm('C\'est gagné! :)');
        } else if (wrongAttempts >= maxFailedAttempt) {
            this.showConfirm('C\'est perdu! :(');
        } else if (wrongAttempts === maxFailedAttempt - 1) {
            this.showToast('C\'est votre dernière chance :-S');
        }
    }

    onKeyPress(key) {

        // set matched letters to found state
        var matchedLetters = this.word.filter(letter => letter.char === key.char);
        matchedLetters.map((letter) => {
            letter.found = true;
        });

        // check if it win or not
        this.checkResult();
    }
}

export const penduComponent = {
    templateUrl: 'build/scripts/pendu/pendu.component.html',
    controller: PenduController
};
