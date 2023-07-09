
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var baileys_1 = require("@whiskeysockets/baileys");
var fs = require('fs-extra');
var conf = require('./set');
var pino = require('pino');
var session = conf.session;
function authentification() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!!fs.existsSync(__dirname + "/baileys_auth_info/creds.json")) return [3 /*break*/, 2];
                    console.log("connexion en cour ...");
                    return [4 /*yield*/, fs.writeFileSync(__dirname + "/baileys_auth_info/creds.json", atob(session), "utf8")
                        //console.log(session)
                    ];
                case 1:
                    _a.sent();
                    _a.label = 2;
                case 2: return [2 /*return*/];
            }
        });
    });
}
authentification();
var store = (0, baileys_1.makeInMemoryStore)({
    logger: pino().child({ level: "silent", stream: "store" })
});
function starts() {
    return __awaiter(this, void 0, void 0, function () {
        var _a, state, saveCreds, connectOption, zok;
        var _this = this;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, (0, baileys_1.useMultiFileAuthState)(__dirname + '/baileys_auth_info')];
                case 1:
                    _a = _b.sent(), state = _a.state, saveCreds = _a.saveCreds;
                    connectOption = {
                        logger: pino({ level: "silent" }),
                        browser: ['Zokou-Md', 'safari', '1.0.0'],
                        printQRInTerminal: true,
                        auth: state
                    };
                    zok = (0, baileys_1["default"])(connectOption);
                    store.bind(zok.ev);
                    setInterval(function () { store.writeToFile('store.json'); }, 10 * 1000);
                    zok.ev.on('connection.update', function (update) { return __awaiter(_this, void 0, void 0, function () {
                        var connection, lastDisconnect;
                        var _a, _b;
                        return __generator(this, function (_c) {
                            connection = update.connection, lastDisconnect = update.lastDisconnect;
                            if (connection === "connecting") {
                                console.log("ℹ️ Connexion en cours...");
                            }
                            else if (connection === 'open') {
                                console.log("✅ connexion reussie!");
                            }
                            else if (connection === "close") {
                                if (((_b = (_a = lastDisconnect === null || lastDisconnect === void 0 ? void 0 : lastDisconnect.error) === null || _a === void 0 ? void 0 : _a.output) === null || _b === void 0 ? void 0 : _b.statusCode) == baileys_1.DisconnectReason.badSession) {
                                    console.log('Connexion fermée . Veuillez ajouter une nouvelle Session ID SVP.');
                                }
                                // sleep(50000)
                            }
                            console.log("hum " + connection);
                            console.log(session);
                            return [2 /*return*/];
                        });
                    }); });
                    zok.ev.on('messages.upsert', function (upsert) { return __awaiter(_this, void 0, void 0, function () {
                        var type, messages, z, d, varmess, img;
                        var _a, _b;
                        return __generator(this, function (_c) {
                            switch (_c.label) {
                                case 0:
                                    type = upsert.type, messages = upsert.messages;
                                    if (!(type === 'notify')) return [3 /*break*/, 2];
                                    console.log('ok ok');
                                    z = 'Salut je m\'appelle *Zokou* \n\n ' + 'je suis un bot Whatsapp Multi-appareil ';
                                    d = ' developpé par *Djalega++*';
                                    varmess = z + d;
                                    img = 'https://wallpapercave.com/uwp/uwp3842939.jpeg';
                                    if (!(((_b = (_a = messages[0].message) === null || _a === void 0 ? void 0 : _a.conversation) === null || _b === void 0 ? void 0 : _b.toString().toLowerCase()) == '.présentation')) return [3 /*break*/, 2];
                                    return [4 /*yield*/, zok.sendMessage(messages[0].key.remoteJid, { image: { url: img }, caption: varmess })];
                                case 1:
                                    _c.sent();
                                    _c.label = 2;
                                case 2: return [2 /*return*/];
                            }
                        });
                    }); });
                    zok.ev.on('creds.update ', saveCreds);
                    return [2 /*return*/];
            }
        });
    });
}
starts();
console.log("Zokou-Md");
