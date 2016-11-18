describe('Component: penduKey', function() {
    var component, $componentController, clickSpy, keyValue;

    beforeEach(module('iadfrance.pendu'));
    beforeEach(inject(function($injector) {
        $componentController = $injector.get('$componentController')
        clickSpy = jasmine.createSpy('clickSpy');
        keyValue = {
            char: 'C',
            used: true
        };
        component = $componentController('penduKey', null, {
            key: keyValue,
            onKeyPress: clickSpy
        });
    }))

    describe('bindings', function() {
        it('should assign the bindings to the component', function() {
            expect(component.key).toEqual(keyValue);
            expect(component.onKeyPress).toBeDefined();
        })
    })

    describe('onKeyPress', function() {
        it('should be called when component is clicked on', function() {
            component.handleKeyPress(keyValue);
            expect(clickSpy).toHaveBeenCalledWith(keyValue);
        })
    })
});
