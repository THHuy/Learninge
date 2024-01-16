// khai báo newRouter ở file new.route
const loginRouter = require('./login.router')
const homeRouter = require('./home.route')
const choiceRoute = require('./choicevocabulary.route')
const topicRoute = require('./topic.route')
const exercisesRoute = require('./exercises.route')
const userRoute = require('./user.route')
function route(app){
    app.use('/', loginRouter)
    app.use('/home', homeRouter)
    app.use('/choice',choiceRoute)
    app.use('/topic', topicRoute)
    app.use('/user', userRoute )
    app.use('/exercises', exercisesRoute)
}







module.exports = route;