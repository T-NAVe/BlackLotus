'use strict'
const { rejects } = require('assert');
const EPub = require ('epub');
var fs = require('fs');


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
            var chapters = Object.keys(epub.spine.contents).length;            
            var textArray = text.split(" ");
            var textResult = [...textArray];
            var ids = [];
            for (let index = 0; index < chapters; index++) {
                ids.push(epub.spine.contents[index].id)                
            }
            console.log(ids);
            //format boot in an array of chapters. Note, this is when i learned that you can't handle callbacks inside a for loop just like that.

            function getChapterPromisified(args){return new Promise((resolve, reject)=>{
                epub.getChapter(args, (err,data)=>{
                    if(err){
                        return reject(err);
                    }else{
                        let str = data.replace(/<\/?[\w\s]*>|<.+[\W]>/g, '');
                        str = str.toLowerCase().replace(/\r?\n|\r/g, '');
                        resolve(str);
                    }
                });
                }); 
            }
            var promises = ids.map(id => getChapterPromisified(id));
            Promise.all(promises)
            .then(array => {
                textArray.forEach( (word, i) => {
                    for (let index = 0; index < chapters; index++) {
                        let str = array[index];
                        let value = str.toLowerCase().search(word);
                        let lenght = word.length;
                        console.log(lenght);
                        if(value != -1){
                            textResult[i] = index+"-"+value+"-"+lenght+" ";
                            break;
                        }else if(value == -1){
                            textResult[i] = "NOTFOUND ";
                        };
                    };
                });
                console.log(textResult);
                result(textResult);
            })
            .catch(error => console.error("An error occurred:", error));
        });
    },
        /**
     * Encryps the input text
     * 
     * @param {string} book book name
     * @param {string} text text to decrypt
     * @param {function} result callback function(string)
     * 
     * @returns {string | undefined} retun a string of numbers
     */
    decryptEpub: function(book, text, result){
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
            var chapters = Object.keys(epub.spine.contents).length;            
            var textArray = text.split(" ,");
            var textResult = [...textArray];
            console.log(textArray)
            var ids = [];
            for (let index = 0; index < chapters; index++) {
                ids.push(epub.spine.contents[index].id)                
            }
            //format boot in an array of chapters. Note, this is when i learned that you can't handle callbacks inside a for loop just like that.

            function getChapterPromisified(args){return new Promise((resolve, reject)=>{
                epub.getChapter(args, (err,data)=>{
                    if(err){
                        return reject(err);
                    }else{
                        let str = data.replace(/<\/?[\w\s]*>|<.+[\W]>/g, '');
                        str = str.toLowerCase().replace(/\r?\n|\r/g, '');
                        resolve(str);
                    }
                });
                }); 
            }
            //sacar el chapter, buscar en ese chapter 
            var promises = ids.map(id => getChapterPromisified(id));
            Promise.all(promises)
            .then(array => {
                textArray.forEach( (word, i) => {
                    try{
                        if(word != "NOTFOUND "){
                            let crypto = word.split("-")
                            let chapter = array[crypto[0]];
                            let buffer = "";
                            for (let index = 0; index < crypto[2]; index++){
                                let num = crypto[1]
        
                                buffer += chapter[(parseInt(crypto[1])+index)]
                                
                            }
                            textResult[i] = buffer;
                        }

                    }catch (error){
                        textResult = "ERROR - check if the book you selected is the correct one."

                    }

                });
                console.log(textResult)
                result(textResult);
            })
            .catch(error => console.error("An error occurred:", error));
        });


    }
}
module.exports = eParse;

/*var recursiveChapter = function (n) {
    if (n < chapters) {
        // chapter function
        epub.getChapter(epub.spine.contents[n].id, function(err, data){
            if(err){
                throw err
            }
            //remove HTML tags
            let str = data.replace(/<\/?[\w\s]*>|<.+[\W]>/g, '');
            book.push(str)
            recursiveChapter(n+1)
        });    
     }
}
//start the recursive function
recursiveChapter(0)
console.log(book)*/