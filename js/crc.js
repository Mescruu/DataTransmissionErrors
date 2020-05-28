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
    var template = text.toString(2);
    if(template[0]==="-"){
        template=template.substr(1);
    }
     returnText='0'.repeat(bits).substring(0, bits - template.length) + template;
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

   // alert(massage);

    generate(); //generowanie tabeli

    //alert(massage);

    var binText="";
    var str="";

//pobranie danych z pola "Wproawdz słowo" i przerobienie ich na ciąg bin
    for (var i = 0; i < massage.length; i++) {

        str=massage.charCodeAt(i);

     //   alert(str);
        var decToBin = str.toString(2); //z ASCII na bin

       // alert("decToBin.length "+decToBin.length);

        binText+= "0".repeat(8-decToBin.length); //Dodanie uciętych zer z przodu
      //  alert("binText "+binText);

        binText+= decToBin;
        //alert("binText "+binText);
    }


    firstCode =binText; //z string na bin

    document.getElementById('binpacketCRC').innerText=binText; //z string na bin

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
    //alert(checkSum);

    //alert(convertToString(checkSum,bitCount));

    //alert("CRC: " + ((checkSum)>>>0).toString(16));  //przekonwertowanie na decymalne bez minusa

    var massageToSend="";
    var mes="";


    for(i=0;i<massage.length;i++){
       // mes +="0"+massage.charCodeAt(i).toString(2);
        massageToSend+="0".repeat(8-massage.charCodeAt(i).toString(2).length); //dodanie 0 na poczatku
        massageToSend+=massage.charCodeAt(i).toString(2);
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
    //alert(typeOfCoding)


    if(typeOfCoding==="All"){
        checkoutputCRCId = "checkoutputCRCAll";
        massageToSend = document.getElementById('removeHammingOutput').innerHTML;
    }else{
        checkoutputCRCId = "checkoutputCRC";
        massageToSend = document.getElementById('outputconvertCRC').value;
    }

   // alert("massageToSend"+massageToSend);

    //alert("massageToSend "+massageToSend);
    //alert(checkoutputCRCId);

    //poprzez ponowne obliczenie sumy kontrolnej możliwe jest sprawdzenie poprawności przesłanych danych.

    // alert(massageToSend);


    var crcCode = massageToSend.substr(massageToSend.length-bitCount,massageToSend.length); // wytnij ostatnie bity CRC

    //alert(crcCode);


    massageToSend = massageToSend.substring(0, massageToSend.length-bitCount); //wytnij tekst

    var massage = chunkSubstr(massageToSend, 8).join("");//rozdzielenie pobranego tekstu na osobne wyrazy.

    var i;

    var temp = 0x0;

    onCRCTypeChange();

   // alert(massage);

    for(i = 0; i < massage.length; i++)
    {
        temp = crc_tab[(checkSum & 0xff) ^ massage.charCodeAt(i)];
        tempWord = (checkSum>>>8); //musi być >>> bo nie działa przy >>
        checkSum = tempWord ^ temp ; //zmienna równa
    } //zmienna równa


    if(reversWord!==0){
        checkSum =checkSum ^ reversWord;  //odwrocenie na koncu
    }
    var checkSumString;

   // alert("checksum" +convertToString(checkSum,bitCount));

    if(crcCode.length!==bitCount){ //dodanie 0 z przodu jeżeli zostały pominięte
        crcCode = "0".repeat(bitCount-crcCode.length)+crcCode;
    }

    //alert("checksum" +convertToString(checkSum,bitCount));
   // alert("crcCode " +   crcCode);

    var correct=false;
    if(crcCode===convertToString(checkSum,bitCount)){
   //     alert("true");
        correct=true;
        document.getElementById(checkoutputCRCId).innerHTML="";
        document.getElementById(checkoutputCRCId).innerHTML=massageToSend + '<span class="text-success">'+convertToString(checkSum,bitCount)+"</span>";
    }else{
        document.getElementById(checkoutputCRCId).innerHTML="";
        document.getElementById(checkoutputCRCId).innerHTML=massageToSend + '<span class="text-danger">'+crcCode+"</span>";
    }

    //alert(parseInt(checkSum.toString(2), 2));
    //alert(parseInt(crcCode, 2));

    //checkMessage+=chunkSubstr(crcCode, 8).join("");

    // alert(checkMessage);

    //alert(codingCrc(checkMessage));

    //decode
    decodeCRC(massageToSend, correct);

    return correct;
}

function decodeCRC(massage, correct) {

    var words = chunkSubstr(massage, 8).join("");//rozdzielenie pobranego tekstu na osobne wyrazy.
   // alert("słowo po dekodowaniu: "+ words);

    //alert(typeOfCoding);

    if(typeOfCoding==="All"){
        document.getElementById("decodeOutput").innerText =  words;
    }else{
        document.getElementById("recivedOutput").innerText =  words;
    }

    checkCRCDifference(correct);
}




//// nie potrzebne na razie


function checkCRCDifference(correct) {

    //alert(firstCode);

    var strCheck = document.getElementById("checkoutputCRC").innerText;
    var strInputWords = firstCode.split(" ");

    var strInput = strInputWords[0]+strInputWords[1];

    //alert(strInput);

    document.getElementById("differenceOutput1").innerHTML="";
    document.getElementById("differenceOutput").innerHTML="";
    document.getElementById("differenceOutput2").innerHTML="Brak możliwości";


    var numberOfErrors=0;

    for(var i=0;i<strCheck.length;i++){
        if(strCheck[i]!==strInput[i])
        {
            numberOfErrors++;
            document.getElementById("differenceOutput").innerHTML+='<b>'+strCheck[i]+"</b>";
            document.getElementById("differenceOutput1").innerHTML+='<span class="text-danger">'+strInput[i]+"</span>";
        }else{
            document.getElementById("differenceOutput").innerHTML+=strCheck[i];
            document.getElementById("differenceOutput1").innerHTML+=strInput[i];
        }
    }


    document.getElementById("input").innerText= document.getElementById("thing2convertCRC").value;

    document.getElementById("output").innerText= document.getElementById("recivedOutput").innerText;

    document.getElementById("compatibility").innerText=(100-((numberOfErrors)*100)/(strCheck.length));
    if(numberOfErrors>0){
        document.getElementById("numberOfErrors").innerText="niezgodność sum kontrolnych. Dane mogą być zakłócone";
        document.getElementById("numberOfDetect").innerText="Cały blok może być błędny";
    }else{
        document.getElementById("numberOfErrors").innerText="Sumy kontrolne zgadzają się.";
        document.getElementById("numberOfDetect").innerText="Nie wykryto błędów";
    }

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



