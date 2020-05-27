//
var firstCode="";
/*crc_tab const table for ASCII codes */ //zmienna przechowująca tablice zmiennych
var crc_tab=[256];
var typeOfCRC="CRC 12";
var polynomial=0x80F;
var andWord=0x800;  //słowo z którym jest porównywany
var checkSum= 0xfff; //słowo crc na początku
var reversWord= 0xfff; //słowo crc na początku
var bitCount= 12; //słowo crc na początku

var tempWord = 0x000;

 //         0x04C11DB7  32
//          0x8000      16
 //         0x800       12
  //        0x80        8
function reverse_bits(x, nbits)
{
    var ret = 0;
    var i;
        for(i = 1; i <= nbits; i++)
        {
            if(x & 1){
                ret = ret|(1 << (nbits - i));
            }
            x= x>>1;
        }
    return ret;
}

function generate()
{

    var shiftValue;

    shiftValue=bitCount-8; //w zależności od ilości bitów należy przesunąć słowo

    //alert(shiftValue);

    var ascii = 0;
    var i = 0, j = 0;

    var asciiHelp;
    for(i = 0; i < 256; i++) // petla od 0 do 255
    {
        ascii = reverse_bits(i, 8);//odwróć 8 najmłodszych bitów A[ascii;    zależności od algorymtu należy odwrócić bity.

        if(shiftValue!==0)
        ascii = ascii << shiftValue; //

        //Operator przesunięcia w lewo powoduje, że bity w przesunięciu shift-expression są przesuwane w lewo o liczbę pozycji określoną przez dodatek.
        for(j = 0; j < 8; j++) //// petla od 0 do 7 bo tyle ma słowo bitów
        {
            asciiHelp=(ascii & andWord);

            if(asciiHelp !== 0) //bramka logiczna AND między słowem a 0x80000000  //sprawdz czy słowo jest  // jesli jest rożne od 0
            {
                ascii = (ascii << 1) ^ polynomial;   // przesuń o 1 bit w lewo i xor'uj z wielomianem
            }
            else
            {
                ascii = ascii << 1;                    // przesuń o 1 bit w lewo

            }
        }
        ascii = reverse_bits(ascii, shiftValue+8);				//odwrocenie bitow // zależności od algorymtu należy odwrócić bity.

        crc_tab[i]=ascii;
    }

}

function convertToString(text, bits) {
    var returnText;
     returnText='0'.repeat(bits).substring(0, bits - text.toString(2).length) + text.toString(2);
    return returnText;
}



function crc()
{

    onCRCTypeChange();

    //przesłana wiadomość
    var  massage;
    type = document.getElementById('typeOfInputCRC').value

    if (type==="Liczba binarna") {
     massage = parseInt(document.getElementById('thing2convertCRC').value, 2).toString();
    }else{
        massage = document.getElementById('thing2convertCRC').value;
    }

    alert(massage);

    generate(); //generowanie tabeli

    firstCode =Array.from( massage).map((each)=>each.charCodeAt(0).toString(2)).join(" "); //z string na bin ze spacjami

    document.getElementById('binpacketCRC').innerText=firstCode;

    var massageToSend = codingCrc(massage);

    document.getElementById('outputconvertCRC').value = massageToSend;

   // alert("wiadomość z crc 1 : " + massageToSend);

   // verify(massageToSend);


    //Po wszystkim sprawdź dane..
    verifyCRC();
}

function onCRCTypeChange(){

    if(typeOfCoding==="All"){
        typeOfCRC = document.getElementById('typeOfCRCAll').value;
    }else{
        typeOfCRC = document.getElementById('typeOfCRC').value;
    }

    //alert(typeOfCRC);

        switch (typeOfCRC) {
            case "CRC 12":
                polynomial=0x80F; //ustawienie wartości wielomianu na podstawie tabeli https://en.wikipedia.org/wiki/Cyclic_redundancy_check
                andWord=0x800;  //słowo z którym jest porównywany
                checkSum = 0x000; //słowo crc na początku
                 reversWord= 0x000; //słowo do dzięki któremu bedzie się odwracało sume kontrolną
                 tempWord = 0x000; //słowo pomocniczne wypełnione zerami.
                bitCount=12;

                break;
            case "CRC 16":  //CRC-16/USB
                polynomial=0x8005; //ustawienie wartości wielomianu na podstawie tabeli https://en.wikipedia.org/wiki/Cyclic_redundancy_check
                andWord=0x8000;  //słowo z którym jest porównywany
                checkSum = 0xffff; //słowo crc na początku
                reversWord= 0xffff; //słowo do dzięki któremu bedzie się odwracało sume kontrolną   //CRC-16/MODBUS bez odwracania
                tempWord = 0x0000; //słowo pomocniczne wypełnione zerami.
                bitCount=16;

                break;
            case "CRC 16 REVERSE":
                polynomial=0x4003; //ustawienie wartości wielomianu na podstawie tabeli https://en.wikipedia.org/wiki/Cyclic_redundancy_check (kolumna 5.) tak wynika z wielomianu
                andWord=0x8000;  //słowo z którym jest porównywany
                checkSum = 0xffff; //słowo crc na początku
                reversWord= 0xffff; //słowo do dzięki któremu bedzie się odwracało sume kontrolną
                tempWord = 0x0000; //słowo pomocniczne wypełnione zerami.
                bitCount=16;

                break;
            case "CRC 32":   //CRC-32
                polynomial=0x04C11DB7; //ustawienie wartości wielomianu na podstawie tabeli https://en.wikipedia.org/wiki/Cyclic_redundancy_check
                andWord=0x80000000;  //słowo z którym jest porównywany
                checkSum = 0xffffFFFF; //słowo crc na początku
                reversWord= 0xffffFFFF; //słowo do dzięki któremu bedzie się odwracało sume kontrolną
                tempWord = 0x00000000; //słowo pomocniczne wypełnione zerami.
                bitCount=32;

                break;
            case "SDLC":
                polynomial=0x1021; //ustawienie wartości wielomianu na podstawie tabeli https://en.wikipedia.org/wiki/Cyclic_redundancy_check
                andWord=0x8000;  //słowo z którym jest porównywany
                checkSum = 0xffff; //słowo crc na początku
                reversWord= 0xffff; //słowo do dzięki któremu bedzie się odwracało sume kontrolną
                tempWord = 0x0000; //słowo pomocniczne wypełnione zerami.
                bitCount=16;


                break;
            case "SDLC REVERSE":
                polynomial=0x0811; //ustawienie wartości wielomianu na podstawie tabeli https://en.wikipedia.org/wiki/Cyclic_redundancy_check
                andWord=0x8000;  //słowo z którym jest porównywany
                checkSum = 0xffff; //słowo crc na początku
                reversWord= 0xffff; //słowo do dzięki któremu bedzie się odwracało sume kontrolną
                tempWord = 0x0000; //słowo pomocniczne wypełnione zerami.
                bitCount=16;

                break;
            case "CRC-ITU":
                polynomial=0x1021; //ustawienie wartości wielomianu na podstawie tabeli https://en.wikipedia.org/wiki/Cyclic_redundancy_check //WEDŁUG PDFA TAKI SAM JAK SDLC
                andWord=0x8000;  //słowo z którym jest porównywany
                checkSum = 0xffff; //słowo crc na początku
                reversWord= 0xffff; //słowo do dzięki któremu bedzie się odwracało sume kontrolną
                tempWord = 0x0000; //słowo pomocniczne wypełnione zerami.
                bitCount=16;

                break;
            case "ATM":
                polynomial=0x07; //ustawienie wartości wielomianu na podstawie tabeli https://en.wikipedia.org/wiki/Cyclic_redundancy_check
                andWord=0x80;  //słowo z którym jest porównywany
                checkSum = 0xff; //słowo crc na początku  //CRC-8/ROHC (gdy checksum=0xff)
                reversWord= 0xff; //słowo do dzięki któremu bedzie się odwracało sume kontrolną
                tempWord = 0x00; //słowo pomocniczne wypełnione zerami.
                bitCount=8;

                break;
            default:break;
        }

}

function codingCrc(massage) {
    var i;
    var temp = 0x0;


    for(i = 0; i < massage.length; i++)
    {
        temp = crc_tab[(checkSum & 0xff) ^ massage.charCodeAt(i)];
        tempWord = (checkSum>>>8); //musi być >>> bo nie działa przy >>
        checkSum = tempWord ^ temp ; //zmienna równa
    } //zmienna równa


    if(reversWord!==0){
        checkSum =checkSum ^ reversWord;  //odwrocenie na koncu
    }

    //alert("CRC: " + ((checkSum)>>>0).toString(16));  //przekonwertowanie na decymalne bez minusa

    var massageToSend="";
    var mes="";


    for(i=0;i<massage.length;i++){
        mes +="0"+massage.charCodeAt(i).toString(2)+" ";
        massageToSend+=massage.charCodeAt(i).toString(2)+" ";
    }

    massageToSend+=convertToString(checkSum,bitCount);  //32 bo 32 bity są w  kluczu CRC

    firstCode+=" "+convertToString(checkSum,bitCount); //dodanie do tekstu CRC

    //alert(massageToSend);
   // alert(mes);
    return massageToSend;
}

function verifyCRC() {

    var checkoutputCRCId;
    var massageToSend;
    alert(typeOfCoding)

    if(typeOfCoding==="All"){
        checkoutputCRCId = "checkoutputCRCAll";
        massageToSend = document.getElementById('removeHammingOutput').innerHTML;
    }else{
        checkoutputCRCId = "checkoutputCRC";
        massageToSend = document.getElementById('outputconvertCRC').value;
    }

    alert("massageToSend "+massageToSend);
    alert(checkoutputCRCId);

    //poprzez ponowne obliczenie sumy kontrolnej możliwe jest sprawdzenie poprawności przesłanych danych.

    // alert(massageToSend);



    var massage = massageToSend.split(' '); //rozdzielenie pobranego tekstu na osobne wyrazy.
    alert("massage "+massage);
    var checkMessage="";

    if(massage[massage.length-1]===""){
        massage.pop(); //usunięcie ostatniego elementu talbicy
    }

    alert("massage[massage.length-1] "+massage[massage.length-1]);
    var crcCode=massage[massage.length-1];
    alert("crcCode"+crcCode);
    var i;

    for( i=0;i<massage.length;i++){

        if(i<massage.length-1){

            checkMessage+=String.fromCharCode(parseInt(massage[i], 2));
        }
    }

    //  alert("checkMessage "+checkMessage);
    //  alert("crcCode "+crcCode);

    // alert("crc chunks "+String.fromCharCode(chunkSubstr(crcCode, 8).join(""), 2));



    var temp = 0x0;

    onCRCTypeChange();

    for(i = 0; i < checkMessage.length; i++)
    {
        temp = crc_tab[(checkSum & 0xff) ^ checkMessage.charCodeAt(i)];
        tempWord = (checkSum>>>8); //musi być >>> bo nie działa przy >>
        checkSum = tempWord ^ temp ; //zmienna równa
    } //zmienna równa


    if(reversWord!==0){
        checkSum =checkSum ^ reversWord;  //odwrocenie na koncu
    }
    var checkSumString;

    alert(checkSum.toString(2).length);

    if(checkSum.toString(2).length!==bitCount){
        checkSumString = "0".repeat(bitCount-checkSum.toString(2).length)+checkSum.toString(2);
    }else{
        checkSumString = checkSum.toString(2);
    }

       alert("checkSum "+parseInt(checkSum.toString(2), 2));
       alert("crcCode " +   parseInt(crcCode, 2));

    var correct=false;
    if(parseInt(checkSum.toString(2), 2)===parseInt(crcCode, 2)){
        correct=true;
        document.getElementById(checkoutputCRCId).innerHTML="";
        document.getElementById(checkoutputCRCId).innerHTML=massageToSend;
    }else{
        massage[massage.length-1]=checkSum.toString(2);
        document.getElementById(checkoutputCRCId).innerHTML="";
        for(i=0;i<massage.length-1;i++){
            document.getElementById(checkoutputCRCId).innerHTML+=massage[i]+" ";
        }
        document.getElementById(checkoutputCRCId).innerHTML+='<span class="text-danger"> '+checkSumString+"</span>";
    }

    //alert(parseInt(checkSum.toString(2), 2));
    //alert(parseInt(crcCode, 2));

    //checkMessage+=chunkSubstr(crcCode, 8).join("");

    // alert(checkMessage);

    //alert(codingCrc(checkMessage));

    //decode
    if(typeOfCoding!=="All") //jezeli to po prostu CRC
    decodeCRC(massageToSend);

    return correct;
}

function decodeCRC(massage) {

    var words = massage.split(" ");

    var type = document.getElementById('typeOfInputCRC').value
    var decodeWords="";

    document.getElementById("recivedOutput").innerText="";

    for(i=0;i<words.length-1;i++){
        var word = words[i];

        decodeWords =  String.fromCharCode(parseInt(word, 2));

        document.getElementById("recivedOutput").innerText +=  decodeWords;
    }

    checkCRCDifference();
}


//// nie potrzebne na razie


function chunkSubstr(str, size) {  //zamiana ciągu bitów na słowa

    var numChunks = str.length / 8;

    numChunks = Math.ceil(numChunks);

    const chunks = new Array(numChunks);

    for (let i = numChunks - 1, o = str.length - size; i >= 0; i--, o -= size) {

        // alert("i = " + i);


        chunks[i] = String.fromCharCode(parseInt(str.substr(o, str.length), 2)); //dodanie do tablicy części tekstu



        //  alert("chunks["+i+"] " + chunks[i]);

        str = str.substr(0, o); //uciecie zabranego konca

        //  alert(str);
            if(numChunks>1){
                if(i===0 && chunks[0].length!==chunks[1].length){
                    chunks[0] = '0'.repeat(8-chunks[0].length)+chunks[0]; //dopełnienie zerami z przodu.
                }
            }else{
                if(i===0 && chunks[0].length!==size){
                    chunks[0] = '0'.repeat(8-chunks[0].length)+chunks[0]; //dopełnienie zerami z przodu.
                }
            }
    }
   // alert(document.getElementById("thing2convertCRC").value);

    //alert(chunks);
    return chunks
}

function checkCRCDifference() {

    var strF = document.getElementById("checkoutputCRC").innerText;

    document.getElementById("differenceOutput1").innerHTML="";
    document.getElementById("differenceOutput").innerHTML="";
    document.getElementById("differenceOutput2").innerHTML="Brak możliwości";

    if(strF[0]===' '){
        strF = strF.substring(1, strF.length);
    }
    if(strF[strF.length-1]===' '){
        strF = strF.substring(0, strF.length-1);
    }

    var strFirst =  strF.split(' ');
    alert("first code: "+ firstCode);

    var strGlobal =  firstCode.split(' ');

    var checkoutputCRCText = document.getElementById("checkoutputCRC").innerHTML;
    var checkoutputCRCTextSplit =  checkoutputCRCText.split(' ');

    alert(checkoutputCRCTextSplit);
    var i =0;

    var mistakeCounter=0;
    var detectedMistakeCounter=0;


    for(i=0;i<strFirst.length;i++){

        var checkoutputCRCWord = checkoutputCRCTextSplit[i]; //
        if(checkoutputCRCWord[1]==="s"){  //jezeli jest span, wtedy oznacza, że jest źle

            if(i===strFirst.length-1){
                detectedMistakeCounter+=bitCount; //tylko wiadomo, że suma kontrolna się popsuła
            }
        }

        document.getElementById("differenceOutput").innerHTML=document.getElementById("differenceOutput").innerHTML+" ";
        document.getElementById("differenceOutput1").innerHTML=document.getElementById("differenceOutput1").innerHTML+" ";

        if(strGlobal[i]!==strFirst[i])
        {
            mistakeCounter+=8;
            document.getElementById("differenceOutput").innerHTML+='<d>'+strGlobal[i]+"</d>";
            document.getElementById("differenceOutput1").innerHTML+='<span class="text-danger">'+strFirst[i]+"</span>";
        }else{
            document.getElementById("differenceOutput").innerHTML+=strGlobal[i];
            document.getElementById("differenceOutput1").innerHTML+=strFirst[i];
        }
    }


    document.getElementById("input").innerText= document.getElementById("thing2convertCRC").value;

    document.getElementById("output").innerText= document.getElementById("recivedOutput").innerText;

    document.getElementById("compatibility").innerText=(100-((mistakeCounter)*100)/(strFirst[0].length*strFirst.length));
    document.getElementById("numberOfErrors").innerText=mistakeCounter;
    document.getElementById("numberOfDetect").innerText=detectedMistakeCounter;
    document.getElementById("numberOfRepaired").innerText="brak";
}



function verify2() {



    var helpMassageToSend = massageToSend.substring(0, polynomial.toString(2).length);
    var wynikText = helpMassageToSend;

    var wynikDec;


    var  space = ' '.repeat(1);
    var  j = 0;

    var znaczacyBit="1";

    for(i=0;i<(massageToSend.length-polynomial.toString(2).length);i++){

        helpMassageToSend = massageToSend.substring(i, polynomial.toString(2).length+i); //cos ala przesunięcie bitowe
        space = '_'.repeat(i);


        if(wynikText[0]!=="0"){

            document.write("<br>");
            document.write(massageToSend);
            document.write("<br>");
            document.write(space);
            document.write(polynomial.toString(2));
            document.write("<br>");
            document.write(space);
            document.write(wynikText);
            document.write("<br>");


            for (j=0;j<helpMassageToSend.length;j++){
                    if(polynomial.toString()[j]===wynikText[j]){
                        wynikText = wynikText.substring(0, j) + '0' + wynikText.substring(j + 1);
                    }else{
                        wynikText = wynikText.substring(0, j) + '1' + wynikText.substring(j + 1);
                    }
            }

            document.write(space);
            document.write(wynikText);
            document.write("<br> ==================================================================== <br> ");

            //   wynikDec = helpMassageToSend^wynikDec; //na poaczatku wynik = wielomianowi
        }else{
            document.write("<br> ==================================================================== <br> ");
            document.write(space);
            document.write(wynikText);
            document.write("<br> ==================================================================== <br> ");
        }


        znaczacyBit=wynikText[0];
        wynikText= wynikText.substring(1, wynikText.length); //odjęcie pierwszego bitu
        wynikText = wynikText+helpMassageToSend[helpMassageToSend.length-1]; //dodaj do wyniku ostatni element

        wynikDec = parseInt(wynikText, 2); //zamiana na liczbe dec
    }

    helpMassageToSend = massageToSend.substring(massageToSend.length-wynikText.length, massageToSend.length); //cos ala przesunięcie bitowe

    document.write("<br>");
    document.write("<br>");
    document.write(space);
    document.write(helpMassageToSend);
    document.write("<br>");
    document.write(space);
    document.write(polynomial.toString(2));

}



