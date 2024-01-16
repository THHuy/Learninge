
// Hàm xử lí lỗi của handele bars
module.exports = {
    mutipleMongooseToObject: function(mongooseArray){
        return mongooseArray.map(mongoose => mongoose.toObject())
    },
    mongooseToObject: mongoose => { return mongoose ? mongoose.toObject() : mongoose}
}
