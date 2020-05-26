//
//https://4programmers.net/Algorytmy/Obliczanie_sum_kontrolnych_CRC-32
//

/* CRC-32 const table for ASCII codes */ //zmienna przechowująca tablice zmiennych
var crc32_tab=[256];
var EC_table=[];


var polynomial;

function mirror_bits(x, nbits)
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

    //So far the algorithm is quite inefficient as it works bit by bit. For larger input data, this could be quite slow. But how can our CRC-8 algorithm be accelerated?
    // The divident is the current crc byte value - and a byte can only take 256 different values. The polynomial (= divisor) is fixed. Why not precompute the division for each possible byte by the fixed polynomial and store these result in a lookup table? This is possible as the remainder is always the same for the same divident and divisor! Then the input stream can be processed byte by byte instead of bit by bit.
    // Let's use our common example to demonstrate the process manually:

    var ascii = 0;
    var i = 0, j = 0;

    var asciiHelp;
    for(i = 0; i < 256; i++) // petla od 0 do 255
    {
        ascii = mirror_bits(i, 8);//odwróć 8 najmłodszych bitów A[ascii;
        ascii = ascii << 24; //
        //Operator przesunięcia w lewo powoduje, że bity w przesunięciu shift-expression są przesuwane w lewo o liczbę pozycji określoną przez dodatek.
        for(j = 0; j < 8; j++) //// petla od 0 do 7 bo tyle ma słowo bitów
        {
            asciiHelp=(ascii & 0x80000000);

            if(asciiHelp !== 0) //bramka logiczna AND między słowem a 0x80000000  //sprawdz czy słowo jest  // jesli jest rożne od 0
            {
                ascii = (ascii << 1) ^ 0x04C11DB7;   // przesuń o 1 bit w lewo i xor'uj z wielomianem
            }
            else
            {
                ascii = ascii << 1;                    // przesuń o 1 bit w lewo

            }
        }
        ascii = mirror_bits(ascii, 32);				//odwrocenie bitow

        crc32_tab[i]=ascii;
    }
}

function convertToString(text, bits) {
    var returnText;
     returnText='0'.repeat(bits).substring(0, bits - text.toString(2).length) + text.toString(2);
    return returnText;
}


function crc()
{

    //przesłana wiadomość
    var  massage = 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'; //utworzenie wyzerowanej zmiennej o odpowiedniej długości

    //ustawienie wielomianu:
    polynomial=0x04C11DB7;

    generate(); //generowanie tabeli

    var massageToSend = codingCrc(massage);

    alert("wiadomość z crc 1 : " + massageToSend);

    verify(massageToSend);

 //  document.write(massageToSend +"<br>");
 //   document.write(polynomial.toString(2) +"<br>");

 // verify(massageToSend);

// var bin =  1101010 0100100 0100001;
//  alert(bin.toString(10));
//do porównania http://crc32-checksum.waraxe.us/

//  1100001 1100010 1100011
// 1101010 0100100 0100000 111000010

}


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

        if(i===0 && chunks[0].length!==chunks[1].length){
            chunks[0] = '0'.repeat(8-chunks[0].length)+chunks[0]; //dopełnienie zerami z przodu.
        }

    }

    //alert(chunks);
    return chunks
}

function codingCrc(massage) {

    //zmienne pomocne do zakodowania CRC
    var i;
    var temp = 0x0;
    var temp2 = 0x00000000;
    var crc32 = 0xffffffff;

    for(i = 0; i < massage.length; i++)
    {
        temp = crc32_tab[(crc32 & 0xff) ^ massage.charCodeAt(i)];
        temp2 = (crc32>>>8); //musi być >>> bo nie działa przy >>
        crc32 = temp2 ^ temp ; //zmienna równa
    } //zmienna równa

    crc32 =crc32 ^ 0xffffffff;  //odwrocenie na koncu

    alert("CRC: " + ((crc32)>>>0).toString(10));  //przekonwertowanie na decymalne bez minusa

    var massageToSend="";
    var mes="";


    for(i=0;i<massage.length;i++){
        mes +="0"+massage.charCodeAt(i).toString(2)+" ";
        massageToSend+=massage.charCodeAt(i).toString(2)+" ";
    }
    massageToSend+=convertToString(crc32,32);  //32 bo 32 bity są w  kluczu CRC

    //alert(massageToSend);
   // alert(mes);

    return massageToSend;

}

function verify(massageToSend) {

   // alert(massageToSend);

    var massage = massageToSend.split(' '); //rozdzielenie pobranego tekstu na osobne wyrazy.

    var checkMessage="";
    var crcCode=massage[massage.length-1];
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
    var temp2 = 0x00000000;
    var crc32 = 0xffffffff;

    for(i = 0; i < checkMessage.length; i++)
    {
        temp = crc32_tab[(crc32 & 0xff) ^ checkMessage.charCodeAt(i)];
        temp2 = (crc32>>>8); //musi być >>> bo nie działa przy >>
        crc32 = temp2 ^ temp ; //zmienna równa
    } //zmienna równa

    crc32 =crc32 ^ 0xffffffff;  //odwrocenie na koncu

   // alert("crc32 "+parseInt(crc32.toString(2), 2));
   // alert("crcCode " +   parseInt(crcCode, 2));

    var correct=false;
    if(parseInt(crc32.toString(2), 2)===parseInt(crcCode, 2)){
        correct=true;
    }



    //checkMessage+=chunkSubstr(crcCode, 8).join("");

   // alert(checkMessage);

    //alert(codingCrc(checkMessage));



    return correct;
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



