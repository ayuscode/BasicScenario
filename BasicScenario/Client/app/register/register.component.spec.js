describe('Register', function()
{
    beforeEach(module('register'));

    describe('RegisterController', function()
    {
        var ctrl;

        beforeEach(inject(function ($componentController){
            ctrl = $componentController('register');
        }));


        it('Message is correct', function()
        {
            expect(ctrl.Message).toBe('Here you can register');
        });
    });

});