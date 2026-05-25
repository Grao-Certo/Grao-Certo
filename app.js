// var ambiente_processo = 'producao';
var ambiente_processo = 'desenvolvimento';

var caminho_env = ambiente_processo === 'producao' ? '.env' : '.env.dev';
require("dotenv").config({ path: caminho_env });

var express = require("express");
var cors = require("cors");
var path = require("path");
var PORTA_APP = process.env.APP_PORT;
var HOST_APP = process.env.APP_HOST;

var app = express();

var indexRouter = require("./src/routes/index");
var usuarioRouter = require("./src/routes/usuarios");
var siloRouter = require("./src/routes/silo");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(cors());

app.use("/", indexRouter);
app.use("/usuarios", usuarioRouter);
app.use("/silo", siloRouter);


app.listen(PORTA_APP, function () {
    console.log(`
        ██████╗ ███████╗███╗   ███╗    ██╗   ██╗██╗███╗   ██╗██████╗  ██████╗        █████╗ 
        ██╔══██╗██╔════╝████╗ ████║    ██║   ██║██║████╗  ██║██╔══██╗██╔═══██╗      ██╔══██╗
        ██████╔╝█████╗  ██╔████╔██║    ██║   ██║██║██╔██╗ ██║██║  ██║██║   ██║      ███████║
        ██╔══██╗██╔══╝  ██║╚██╔╝██║    ╚██╗ ██╔╝██║██║╚██╗██║██║  ██║██║   ██║      ██╔══██║
        ██████╔╝███████╗██║ ╚═╝ ██║     ╚████╔╝ ██║██║ ╚████║██████╔╝╚██████╔╝      ██║  ██║
        ╚═════╝ ╚══════╝╚═╝     ╚═╝      ╚═══╝  ╚═╝╚═╝  ╚═══╝╚═════╝  ╚═════╝       ╚═╝  ╚═╝
               
           ██████╗ ██████╗  █████╗  ██████╗      ██████╗███████╗██████╗ ████████╗ ██████╗ 
          ██╔════╝ ██╔══██╗██╔══██╗██╔═══██╗    ██╔════╝██╔════╝██╔══██╗╚══██╔══╝██╔═══██╗
          ██║  ███╗██████╔╝███████║██║   ██║    ██║     █████╗  ██████╔╝   ██║   ██║   ██║
          ██║   ██║██╔══██╗██╔══██║██║   ██║    ██║     ██╔══╝  ██╔══██╗   ██║   ██║   ██║
          ╚██████╔╝██║  ██║██║  ██║╚██████╔╝    ╚██████╗███████╗██║  ██║   ██║   ╚██████╔╝
           ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝      ╚═════╝╚══════╝╚═╝  ╚═╝   ╚═╝    ╚═════╝                                  
    O servidor do site está rodando! acesse o caminho "http://${HOST_APP}:${PORTA_APP}" para visualizar.
    A aplicação está rodando em ambiente de "${process.env.AMBIENTE_PROCESSO}"
    \t➥ Se está no ambiente de .:desenvolvimento:. ➤  você está se conectando ao banco local.
    \t➥ Se está no ambiente de     .:producao:.    ➤  você está se conectando ao banco remoto.`);
});






