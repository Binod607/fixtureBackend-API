// use the path of your model
const User = require('../Models/User');
const mongoose = require('mongoose');
// use the new name of the database and it's testing
const url = 'mongodb://127.0.0.1:27017/SharmaInt';
beforeAll(async () => {
    await mongoose.connect(url, {
        useNewUrlParser: true,
        useCreateIndex: true
    });
});
afterAll(async () => {
    await mongoose.connection.close();
});
describe('Register Schema test anything', () => {
    // the code below is for insert testing
    it('Add User testing anything', () => {
        const user = {
            'name': 'test',
            'email': 'test41213@gmail.com',
            'password': "test",
            'image': 'noimg',
            'address':'test'
        };

        return User.create(user)
            .then((pro_ret) => {
                expect(pro_ret.name).toEqual('test');
            });
    });

    it('to test the update', async () => {
        return User.findOneAndUpdate({ _id: Object('60700cb4ae40a43390887755') },
            { $set: { name: 'test' } })
            .then((pp) => {
                expect(pp.name).toEqual('test')
            })

    });
    // the code below is for delete testing
    it('to test the delete user is working or not', async () => {
        const status = await User.deleteOne({_id: '60700cb4ae40a43390887755'});
        expect(status.ok).toBe(1);
    })

    

})