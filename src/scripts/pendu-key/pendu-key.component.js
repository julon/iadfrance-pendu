/** @ngInject */
class PenduKeyController {

    handleKeyPress(key) {
        // disable key
        key.used = true;

        // external function
        if (this.onKeyPress) {
            this.onKeyPress(key);
        }
    }
}

export const penduKeyComponent = {
    templateUrl: 'build/scripts/pendu-key/pendu-key.component.html',
    controller: PenduKeyController,
    bindings: {
        key: '=',
        onKeyPress: '&'
    }
};
