describe('Component: penduHeader', function() {
    var component, $componentController, title;

    beforeEach(module('iadfrance.pendu'));
    beforeEach(inject(function($injector) {
        $componentController = $injector.get('$componentController')
        title = 'hello';
        component = $componentController('penduHeader', null, {
            title: title,
            remainingAttempts: 10
        });
    }))

    describe('bindings', function() {
        it('should assign the bindings to the component', function() {
            expect(component.title).toEqual(title);
            expect(component.remainingAttempts).toBe(10);
        })
    })
});
