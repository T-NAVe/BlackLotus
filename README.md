# BlackLotus
####    The encryption method is based on the one used by Black Lotus Tong, a criminal organisation based in China on the popular tv series Sherlock.

**You can check the working app on:** [BlackLotus - Encryptor](https://blacklotusencryptor.herokuapp.com/)
####    **A brief description of the process:**

*   User inputs the text he wants to encrypt.
*   Text is decompose into an Array.
*   Loop into the array, and search the word inside a chapter of the book chosen by the user.
*   If word is not found, then jump into the next chapter and so on.
*   Return the chapter index, followed by word index and word length.
*   The user can then copy the results.
*   Pasting the results in the form and clicking decrypt will return the original sentence.
*   (Notes: 
    * -On the tv series Black Lotus, uses the num page, and the num word, we can't do that easily here, since ebooks does not have pages per se, but instead is divided in 'chapters'*
    * -word length is not actually a necesary value and it makes the encryption method less reliable, but i opted to include it just because it makes the work easier, i'm planning on removing it in the future since i wanted fo avoid another loop but it just not possible.)
####    **Missing features:**
*    -Upload your own book to encryp and decrypt:
    *    -Return a book id, so you can try to decrypt with another book that's not the exact one you used to encrypt.(meaby isbn or something like that).
    *    -Upload progress bar.
    *    -Limit upload to 5mb max.
*    -Add copy to clipboard button.
*    -Upgrade error handling.
*    -Remove word length form the equation.

###    T-NAVe Luca de Acha

# BlackLotus
