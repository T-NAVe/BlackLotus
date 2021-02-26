'use strict'
const EPub = require ('epub');
var fs = require('fs');
/*
Ni bien entro, debo parsear el epub
haciendo un array de capitulos, con el texto formateado sin los tags de html
una vez realizado ese preoceso, debo agarrar el string que me llega y meterlo en un array
A ese array lo proceso mediante un forEach loop y por cada palabra voy buscando en cada capitulo por un resultado positivo
1-2889 3-4568 45-12348 palabra(si no la encuentra) 1-15689
*/
const eParse = {
    /**
     * Encryps the input text
     * 
     * @param {string} book book name
     * @param {string} text text to encrypt
     * @param {function} result callback function(string)
     * 
     * @returns {string | undefined} retun a string of numbers
     */
    encryptEpub: function (book, text, result){
        console.log(book, text)
        var epub = new EPub(book,  "/imagewebroot/", "/articlewebroot/");
        epub.parse();
        epub.on("error", function(err){
            result(err)
            throw console.log('%c ERROR😰', 'color: red; font-wight: bold; blackground-color: yellow'), err;
        });
        epub.on("end", function(err){
            if(err){
                throw err;
            }
            var book = new Array;
            var chapters = Object.keys(epub.spine.contents).length;
            var textArray = text.split(" ");
            var textResult ="";
            //format boot in an array of chapters
            for (let i = 0; i < chapters; i++) {
                epub.getChapter(epub.spine.contents[i].id, function(err, data){
                    if(err){                 
                       return console.log(err);
                    }
                    //remove html tags
                    let str = data.replace(/<\/?[\w\s]*>|<.+[\W]>/g, '');
                    book.push(str.toLowerCase());
                    console.log(book);
                });            
            }
            //loop over each word trying to find a matching result inside the book.
            /*textArray.forEach(word => {
                for (let index = 0; index < chapters; index++) {
                    let str = book[index];
                    let value = str.search(word);
                    if(value != -1){
                        textResult += index+"-"+value+" ";
                        break;
                    };               
                }
            });
            console.log(textResult)
            result(textResult); */
        });


    }
}
module.exports = eParse;