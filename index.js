const express = require("express");
const app = express();
const port = 4000;
const expressHbs = require("express-handlebars");

// 2 modules required for cookie
const cookieParser = require("cookie-parser");
const session = require("express-session");
// Thiet lap thu muc Static
app.use(express.static(__dirname + "/html"));
danApp.set("views", path.join(__dirname, "/views"));

// Cau hinh Template Engine
app.engine(
  "hbs",
  expressHbs.engine({
    layoutsDir: __dirname + "/views/layouts",
    defaultLayout: "layout",
    extname: "hbs",
    runtimeOptions: {
      allowProtoPropertiesByDefault: true,
    },
  })
);
app.set("view engine", "hbs");

// Cau hinh cho phep doc du lieu gui len bang phuong thuc POST
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Thiet lap su dung cookies
app.use(cookieParser("COOKIE_SECRET"));

// Thiet lap su dung session va luu tru session tren Redis
app.use(
  session({
    secret: "SESSION_SECRET",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // true means only transmit cookie over https
      httpOnly: true, // signed cookie
      maxAge: 20 * 60 * 1000, // 20 mins
    },
  })
);
// Chuyen huong route xu ly
app.use("/", require("./routes/authRouter"));

// Start web server
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
