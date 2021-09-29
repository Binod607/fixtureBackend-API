// use the path of your model
const productModle = require('../Models/productModle');
const mongoose = require('mongoose');
// use the new name of the databaseand it's testing
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
        const product = {
            'image': 'nofile',
            'area': 'test',
            'price': 'test',
            'location': "test",
            'phNo': 'test',
            "userId":"test"
        };

        return productModle.create(product)
            .then((pro_ret) => {
                expect(pro_ret.image).toEqual('nofile');
            });
    });

    it('to test the update', async () => {
        return productModle.findOneAndUpdate({ _id: Object('60700cb40784ca06205ac68f') },
            { $set: { image: 'nofile' } })
            .then((pp) => {
                expect(pp.image).toEqual('nofile')
            })

    });
    // the code below is for delete testing
    it('to test the delete user is working or not', async () => {
        const status = await productModle.deleteOne({_id:"60700cb40784ca06205ac68f"});
        expect(status.ok).toBe(1);
    })

    

})