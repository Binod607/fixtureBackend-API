// use the path of your model
//creating addfAV testing
const AddFav = require('../Models/AddFav');
const mongoose = require('mongoose');
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
        const fav = {
            'userId': 'test',
            'productId': 'test'
           
        };

        return AddFav.create(fav)
            .then((pro_ret) => {
                expect(pro_ret.userId).toEqual('test');
            });
    });

    it('to test the update', async () => {
        return AddFav.findOneAndUpdate({ _id: Object('60700cb4addf924148dedf60') },
            { $set: { userId: 'test' } })
            .then((pp) => {
                expect(pp.userId).toEqual('test')
            })

    });
    // the code below is for delete testing
    it('to test the delete user is working or not', async () => {
        const status = await AddFav.deleteOne({_id:"60700cb4addf924148dedf60"});
        expect(status.ok).toBe(1);
    })

    

})