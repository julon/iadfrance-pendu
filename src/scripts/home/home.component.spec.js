describe('Component: home', function() {
    var component, $componentController, word;

    beforeEach(module('iadfrance.pendu'));
    beforeEach(inject(function($injector) {
        $componentController = $injector.get('$componentController')
        component = $componentController('home', null);
    }))

    describe('$onInit', function() {
        it('should assign the title to the component', function() {
            component.$onInit();
            expect(component.title).toEqual('LE PENDU SPECIALE TECHNO WEB');
        })
    })
});
