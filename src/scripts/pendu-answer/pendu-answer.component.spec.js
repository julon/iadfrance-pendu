describe('Component: penduAnswer', function() {
    var component, $componentController, word;

    beforeEach(module('iadfrance.pendu'));
    beforeEach(inject(function($injector) {
        $componentController = $injector.get('$componentController')
        word = [{
            char: 'C',
            found: false
        }, {
            char: 'D',
            found: true
        }];
        component = $componentController('penduAnswer', null, {
            word: word
        });
    }))

    describe('bindings', function() {
        it('should assign the bindings to the component', function() {
            expect(component.word).toEqual(word);
        })
    })

    describe('printLetter', function() {
        it('should print _ if key is not found', function() {
            var letter = component.word[0];
            expect(component.printLetter(letter)).toBe('_');
        })
        it('should print the letter if key is found', function() {
            var letter = component.word[1];
            expect(component.printLetter(letter)).toBe('D');
        })
    });
});
