// use the path of your model
const comment = require('../Models/comment');
const mongoose = require('mongoose');
// use the new name of the databasen creating testing
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
describe('Comment Schema test anything', () => {
    // the code below is for insert testing
    it('Add comment testing anything', () => {
        const comments = {
            'userid': 'test',
            'productId': 'test',
            'comment': "test"
        };

        return comment.create(comments)
            .then((pro_ret) => {
                expect(pro_ret.userid).toEqual('test');
            });
    });

    // it('to test the update', async () => {
    //     return Comment.findOneAndUpdate({ _id: Object('606d4a6446accf4748f28548') },
    //         { $set: { userId: 'test' } })
    //         .then((pp) => {
    //             expect(pp.userId).toEqual('test')
    //         })

    // });
    // // the code below is for delete testing
    // it('to test the delete user is working or not', async () => {
    //     const status = await Comment.deleteOne({_id: '606d4a6446accf4748f28548'});
    //     expect(status.ok).toBe(1);
    // })

    

})