// khai bao thu vien express
const methodOverride = require("method-override");
const express = require("express");
const app = express();
const port = 4000;
// Thu vien handlebars
const { engine } = require("express-handlebars");
const path = require("path");

const bodyParser = require("body-parser");

var session = require("express-session");
app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: true,
  })
);

// connect db
const db = require("./config/db/");
db.connect();
const Handlebars = require("handlebars");
app.engine(
  "hbs",
  engine({
    extname: ".hbs",
    helpers: {
      sum: (a, b) => a + b,
      randomAnswers: function (correctAnswer, wrongAnswers) {
        // Đảm bảo có ít nhất một câu trả lời đúng
        let answers = [correctAnswer];
        // Trộn đáp án sai và chọn tối đa 3 câu trả lời sai
        let randomWrongAnswers = wrongAnswers
          .sort(() => Math.random() - 0.5)
          .slice(0, 3);
        // Trộn đáp án đúng và các câu trả lời sai lại với nhau
        answers = answers
          .concat(randomWrongAnswers)
          .sort(() => Math.random() - 0.5);

        // Loại bỏ các câu trả lời trùng lặp
        answers = Array.from(new Set(answers));

        // Nếu số lượng câu trả lời ít hơn 4, hãy thêm thêm câu trả lời sai
        while (answers.length < 4) {
          let additionalWrongAnswer =
            wrongAnswers[Math.floor(Math.random() * wrongAnswers.length)];
          if (!answers.includes(additionalWrongAnswer)) {
            answers.push(additionalWrongAnswer);
          }
        }

        // Trả về mảng các câu trả lời đã được trộn và không có câu trả lời trùng lặp
        return answers;
      },
      ifCond: function (v1, operator, v2, options) {
        switch (operator) {
          case "==":
            return v1 == v2 ? options.fn(this) : options.inverse(this);
          case "===":
            return v1 === v2 ? options.fn(this) : options.inverse(this);
          case "!=":
            return v1 != v2 ? options.fn(this) : options.inverse(this);
          case "!==":
            return v1 !== v2 ? options.fn(this) : options.inverse(this);
          case "<":
            return v1 < v2 ? options.fn(this) : options.inverse(this);
          case "<=":
            return v1 <= v2 ? options.fn(this) : options.inverse(this);
          case ">":
            return v1 > v2 ? options.fn(this) : options.inverse(this);
          case ">=":
            return v1 >= v2 ? options.fn(this) : options.inverse(this);
          default:
            return options.inverse(this);
        }
      },
      setVar: function (value) {
        storedValue = value;
      },
      getVar: function () {
        return storedValue;
      },
      isdefined: function (value){
        return value !== null; 
      },
    },
  })
);

app.use(methodOverride("_method"));

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "resources", "views"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.json());

app.use(express.static(path.join(__dirname, "/public")));
// Khai báo truy cập đến file routes
const route = require("./router");
route(app);

app.listen(port, () => {
  console.log(`App listening on port http://localhost:${port}`);
});
