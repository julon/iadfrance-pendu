describe('Component: pendu', function() {
    var component, $componentController;
    var firstKey = {
        order: 0,
        char: 'A',
        used: false
    };

    beforeEach(module('iadfrance.pendu'));
    beforeEach(inject(function($injector) {
        $componentController = $injector.get('$componentController');
        component = $componentController('pendu', null);
        component.showConfirm = jasmine.createSpy('showConfirmSpy');
        component.showToast = jasmine.createSpy('showToastSpy');
    }))

    describe('$onInit', function() {
        beforeEach(function() {
            component.$onInit();
        });

        it('should init title', function() {
            expect(component.title).toEqual('LE PENDU SPECIALE TECHNO WEB');
        });

        it('should init a random word', function() {
            expect(component.word).toBeDefined();
        });;

        it('should init the alphabet to pick from', function() {
            expect(component.keys[0]).toEqual(firstKey);
        });
    });

    beforeEach(function() {
        component.$onInit();
        component.word = [{
            char: 'A',
            found: true
        }, {
            char: 'N',
            found: true
        }, {
            char: 'G',
            found: true
        }, {
            char: 'U',
            found: true
        }, {
            char: 'L',
            found: false
        }, {
            char: 'A',
            found: true
        }, {
            char: 'R',
            found: false
        }];
        component.keys[0].used = true;
        component.keys[11].used = true;
        component.keys[5].used = true;
        component.keys[23].used = true;
        component.keys[3].used = true;
        component.keys[4].used = true;
    });

    describe('getLettersWithoutDuplicates', function() {
        it('should return the word without duplicate letters', function() {
            var result = component.getLettersWithoutDuplicates();
            expect(result.length).toBe(6);
        });
    });

    describe('getCountTotalAttempts', function() {
        it('should return the total number of key pressed', function() {
            var result = component.getCountTotalAttempts();
            expect(result).toBe(6);
        });
    });

    describe('getCountLettersFound', function() {
        it('should return the number of found letters', function() {
            var result = component.getCountLettersFound();
            expect(result).toBe(4);
        });
    });

    describe('getCountRemainingAttempts', function() {
        it('should return how many times we can still fail', function() {
            var result = component.getCountRemainingAttempts();
            expect(result).toBe(8);
        });
    });

    describe('checkResult', function() {
        it('should launch win message when winning', function() {
            component.word[4].found = true;
            component.word[6].found = true;
            component.checkResult();
            expect(component.showConfirm).toHaveBeenCalledWith('C\'est gagné! :)');
        });
        it('should launch game over message when losing', function() {
            component.keys[1].used = true;
            component.keys[2].used = true;
            component.keys[21].used = true;
            component.keys[22].used = true;
            component.keys[14].used = true;
            component.keys[15].used = true;
            component.keys[16].used = true;
            component.keys[17].used = true;
            component.checkResult();
            expect(component.showConfirm).toHaveBeenCalledWith('C\'est perdu! :(');
        });
        it('should launch last chance message when one attempt is left', function() {
            component.keys[1].used = true;
            component.keys[2].used = true;
            component.keys[21].used = true;
            component.keys[22].used = true;
            component.keys[14].used = true;
            component.keys[15].used = true;
            component.keys[16].used = true;
            component.checkResult();
            expect(component.showToast).toHaveBeenCalledWith('C\'est votre dernière chance :-S');
        });
    });

    describe('onKeyPress', function() {
        it('should set matched letters to true', function() {
            expect(component.word[6].found).toBe(false);
            component.onKeyPress({
                char: 'R'
            });
            expect(component.word[6].found).toBe(true);
        });
    });
});
