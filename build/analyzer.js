"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var cheerio_1 = __importDefault(require("cheerio"));
var CoderAnalyzer = /** @class */ (function () {
    function CoderAnalyzer() {
    }
    CoderAnalyzer.getInstance = function () {
        if (!this.instance) {
            this.instance = new CoderAnalyzer();
        }
        return this.instance;
    };
    CoderAnalyzer.prototype.generateJsonContent = function (result, filePath) {
        var fileContent = {};
        if (fs_1.default.existsSync(filePath)) {
            fileContent = JSON.parse(fs_1.default.readFileSync(filePath, 'utf-8'));
        }
        fileContent[result.time] = result.data;
        return fileContent;
    };
    CoderAnalyzer.prototype.getInfo = function (html) {
        var $ = cheerio_1.default.load(html);
        var trItems = $('.f1_tbl').find('tr');
        var infos = [];
        trItems.map(function (index, element) {
            var address = $(element).find('td').eq(0).text();
            var name = $(element).find('td').eq(1).text();
            var price = $(element).find('td').eq(2).text();
            var upOrDown = $(element).find('td').eq(3).text();
            infos.push({
                address: address,
                name: name,
                price: price,
                upOrDown: upOrDown
            });
        });
        return {
            time: (new Date()).getTime(),
            data: infos
        };
    };
    CoderAnalyzer.prototype.analyze = function (html, filePath) {
        var data = this.getInfo(html);
        var fileContent = this.generateJsonContent(data, filePath);
        return JSON.stringify(fileContent, undefined, '  ');
    };
    return CoderAnalyzer;
}());
exports.default = CoderAnalyzer;
