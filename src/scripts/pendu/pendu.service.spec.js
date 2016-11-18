describe('PenduService', function() {
    var service;
    var firstKey = {
        order: 0,
        char: 'A',
        used: false
    };
    beforeEach(module('iadfrance.pendu'));
    beforeEach(inject(function($injector) {
        service = $injector.get('PenduService');
    }));

    describe('getFullAlphabet', function() {
        it('should return the alphabet', function() {
            expect(service.getFullAlphabet()[0]).toEqual(firstKey);
        });
    });

    describe('getRandomWord', function() {
        it('should return one of the words from mock', function() {
            expect(service.getRandomWord()).toBeDefined();
        })
    })
});
