var firstCode="";

var type="";


function Hamming() {

    var bin;
    var thing2ConvertId ="";

    if (typeOfCoding==="All"){
        type = "All";
        thing2ConvertId = "crcOutput";
    }else{
        document.getElementById("binpacket").innerText = '';
        document.getElementById("outputconvert").value='';

        type = document.getElementById('typeOfInputHamming').value
        thing2ConvertId = "thing2convertHamming";
    }

   // alert(type);
   // alert(thing2ConvertId);

    switch (type) {
        case "Tekst":
            bin = document.getElementById(thing2ConvertId).value; //zmienna do zakodowania
            codeHammingFromText(bin);

            break;
        case "Liczba decymalna":
            bin = parseInt(document.getElementById(thing2ConvertId).value); //zmienna do zakodowania
            bin = bin.toString(2);

            if (typeOfCoding!=="All")  //jezeli to zwykly Hamming
            document.getElementById("binpacket").innerText=bin;

            codeHamming(bin);

            break;

        case "Liczba binarna":
            bin = document.getElementById(thing2ConvertId).value; //zmienna do zakodowania

            if (typeOfCoding!=="All")  //jezeli to zwykly Hamming
            document.getElementById("binpacket").innerText=bin;

            codeHamming(bin);
            break;
        case "All":   //jezeli kodowana jest całość (razem z CRC)

            bin = document.getElementById(thing2ConvertId).innerText; //zmienna do zakodowania
            var words = bin.split(" ");


            for(var i = 0; i<words.length;i++){
               // alert(words[i]);
                codeHamming(words[i]); //wysyłanie poszczególnych ciągów binarnych
            }

            break;
        default:
    }


}
function codeHamming(bin) {

        var  parrityBits =  0;

       // alert(bin.length);

        if (bin.length <=4) {

            parrityBits =  3;
           // var controlTable= "1011"; //1 zaznaczają w których miejscach jest zmienna kontrolna
        }
        else
        {
            if(bin.length<=11)   //https://en.wikipedia.org/wiki/Hamming_code na podstawie tabeli general Algorithm
            {
                parrityBits =  4;
               // var controlTable= "10001011"; //1 zaznaczają w których miejscach jest zmienna kontrolna

            }
            else
            {
                if(bin.length<=26)   //https://en.wikipedia.org/wiki/Hamming_code na podstawie tabeli general Algorithm
                {
                    parrityBits =  5;
                  //  var controlTable= "1000000010001011"; //1 zaznaczają w których miejscach jest zmienna kontrolna
                }
                else{
                    if(bin.length<=57)   //https://en.wikipedia.org/wiki/Hamming_code na podstawie tabeli general Algorithm
                    {
                        parrityBits = 6;
                      //  var controlTable= "10000000000000001000000010001011"; //1 zaznaczają w których miejscach jest zmienna kontrolna
                    }else{
                        if(bin.length<=120)   //https://en.wikipedia.org/wiki/Hamming_code na podstawie tabeli general Algorithm
                        {
                            parrityBits = 7;
                        //    var controlTable= "1000000000000000000000000000000010000000000000001000000010001011"; //1 zaznaczają w których miejscach jest zmienna kontrolna
                        }else{
                            if(bin.length<=247)   //https://en.wikipedia.org/wiki/Hamming_code na podstawie tabeli general Algorithm
                            {
                                parrityBits = 8;
                            }else{
                                throw new Error("Została wprowadzona za duża liczba!");
                            }                            }                    }
                }
            }
        }

    hamming(parrityBits, bin);

        if(typeOfCoding!=="All"){
            firstCode = document.getElementById("outputconvert").value;
        }else{
            firstCode = document.getElementById("outputconvertAll").value;
        }


    //Po wszystkim sprawdź dane..
    checkCode();

}

function codeHammingFromText(str) {
    var i =0;
    var strAsciiArray=[];
    var outputBin = document.getElementById("binpacket").innerText;
    var binText="";

    for (i = 0; i < str.length; i++) {
        strAsciiArray[i]=str.charCodeAt(i);
       // alert( strAsciiArray[i]);
        var decToBin = strAsciiArray[i].toString(2);
        //alert(decToBin);

        binText+= "0".repeat(8-decToBin.length);
        binText+= decToBin;

       // alert( binText[i]);
        outputBin= outputBin + " " + strAsciiArray[i].toString(2);
    }

    codeHamming(binText);  //kodowanie hamminga na poszczególnych literach

    if (typeOfCoding!=="All")  //jezeli to zwykly Hamming
        document.getElementById("binpacket").innerText=outputBin;

}
function IsPowerOfTwo(x)
{
    return (x != 0) && ((x & (x - 1)) == 0);
}

function hamming(parrityBits, text) {

    if (typeOfCoding!=="All")  //jezeli to zwykly Hamming
    document.getElementById("title").innerText="Słowo po kodowaniu hamminga";

    var i;
    var  code = Array.from('0'.repeat(text.length+parrityBits)); //utworzenie wyzerowanej zmiennej o odpowiedniej długości
    var binPosition=0;

    var j = (text.length-1); //indeks ostatniego elementu tablicy
    var k =1;
    for (i = code.length-1; i >=0; i--) {
        if(IsPowerOfTwo(code.length-i)===false){ //jeżeli pozycja nie jest liczbą podniesioną do potęgi 2
           if(j>=0){ //dopoki są elementy w tablicy z kodowanym tekstem
               code[i]=text[j];  //ustawienie bitu z tekstu (wartości binarnej)

            if(text[j]==="1"){
                if(binPosition===0){
                    binPosition=k;  //pierwsze miejsce w którym znajduje się "1" z tekstu - D
                }
                else{
                    binPosition=binPosition^k;  //obliczenie "wartości bitów kontrolnych
                }
            }
           j--;
           }
        }else{
            //  code[i]=0   //ustawienie bitu = 0, ponieważ nie bierze się ich pod uwagę podczas dodawania i ustalania zmiennych kontrolnych
        }
        k++;
    }


    binPosition =  binPosition.toString(2);

    j = binPosition.length-1;

    for (i = (code.length-1); i >= 0; i--) {
        if(IsPowerOfTwo(code.length -i)===true){ //jeżeli pozycja jest liczbą podniesioną do potęgi 2
           if(j>=0){  //jezeli są jeszcze jakies elementy w liczbie kontrolnej (w binarnym przedstawieniu)
               code[i]= binPosition[j];  //ustawienie bitu  z tekstu na wartość bitu kontrolnego (wartości binarnej)
               j--;
           }else{
               //code[i]="0"; //ustawienie zera, ponieważ jeżeli liczba krótka, np binPosition = 1, reszte trzeba wypełnić zerami
           }
        }
    }

    // document.write(string = code.join(""));

    if (typeOfCoding!=="All")  //jezeli to zwykly Hamming
    {
        var outputText =  document.getElementById("outputconvert").value;

        if(outputText===""){
            document.getElementById("outputconvert").value=code.join("");
        }else{
            document.getElementById("outputconvert").value=outputText+" "+ code.join("");
        }
    }else{
        var outputText =  document.getElementById("outputconvertAll").value;

        if(outputText===""){
            document.getElementById("outputconvertAll").value=code.join("");
        }else{
            document.getElementById("outputconvertAll").value=outputText+" "+ code.join("");
        }
    }

}

function checkCode() {

    var str;
    var checkoutputId;

    if(typeOfCoding==="All"){
        document.getElementById('crcWarningDiv').style.display = 'none'; //wyłączenie warninga przy porównaniu
        str =  document.getElementById("outputconvertAll").value;
        checkoutputId= "checkoutputHammingAll";
    }else{
        str =  document.getElementById("outputconvert").value;
        checkoutputId= "checkoutput";
    }

    document.getElementById(checkoutputId).innerHTML ="";
    document.getElementById("repairoutput").innerHTML ="";

    var outputText;
    var words = str.split(' '); //rozdzielenie pobranego tekstu na osobne wyrazy.
    var checksum;
    var word;
    var i;
    for(i=0;i<words.length;i++){

        checksum = checkWord(words[i]);

        if(checksum!==0){
            word =  Array.from(words[i]);
            var j = 0;

            document.getElementById(checkoutputId).innerHTML +=" ";
            document.getElementById("repairoutput").innerHTML +=" ";

            for(j=0; j<word.length;j++){
                if(j===(word.length - checksum)){
                    document.getElementById(checkoutputId).innerHTML += "<b>"+ word[j]+"</b>";

                    var repairWord = repairCode(word[j]);
                    document.getElementById("repairoutput").innerHTML +="<u><b>"+ repairWord +"</b></u>";

                }else{
                    document.getElementById(checkoutputId).innerHTML += word[j];
                    document.getElementById("repairoutput").innerHTML += word[j];
                }
            }
                document.getElementById(checkoutputId).innerHTML += " ";
                document.getElementById("repairoutput").innerHTML +=  " ";
        }
        else{
            document.getElementById(checkoutputId).innerHTML += " "+ words[i];
            document.getElementById("repairoutput").innerHTML += " "+ words[i];
        }
    }

    decodeHamming(document.getElementById("repairoutput").innerText);

    checkDifference();
}

function repairCode(char) {
    if(char==="0"){
        char="1";
    }else
    {
        char="0";
    }
    return char;
}

function checkWord(word) {

    var checkSum=0;

    for (i = 0; i < word.length; i++) {
        if(word[i]==="1"){
            if(checkSum===0){
                checkSum=word.length-i;  //pierwsze miejsce w którym znajduje się "1" z tekstu - D
            }
            else{
                checkSum=checkSum^(word.length-i);  //obliczenie "wartości bitów kontrolnych
            }
        }
    }

    return checkSum;

}

function decodeHamming(str) {

    //przypadek gdzie jest także crc
    if(typeOfCoding==="All"){
        type="All";
    }
    document.getElementById("decodeOutput").innerText="";

    if(str[0]===' '){
        str = str.substring(1, str.length);
    }
    if(str[str.length-1]===' '){
        str = str.substring(0, str.length-1);
    }


    var controlPos = [];

    var words = str.split(' '); //rozdzielenie pobranego tekstu na osobne wyrazy.

    controlPos = [1,2,4,8,16,32,64,128];

    //alert("words "+words);

    var i;
    var j;
    var word;
    var decodeWord="";
    var decodeWords="";
    var decodeText="";

    for(i=0;i<words.length;i++){ //jedno słowo jest wiec i=0 tylko (DO POPRAWY)
        word = words[i];

        decodeWord="";

        for(j=0;j<word.length;j++){
            if((word.length-j)!==controlPos[0] && (word.length-j)!==controlPos[1] && (word.length-j)!==controlPos[2] && (word.length-j)!==controlPos[3] && (word.length-j)!==controlPos[4] && (word.length-j)!==controlPos[5]&& (word.length-j)!==controlPos[6]&& (word.length-j)!==controlPos[7]){ //sprawdzenie czy litera nie jest na pozycji bitu kontrolnego.
               // alert(word.length-j);

                decodeWord+=word[j];
               // alert(decodeWord);
            }
        }

    //alert("decodeWord !!"+decodeWord);

        switch (type) {
            case "Tekst":
                decodeWords = chunkSubstr(decodeWord,8).join("");
               // alert(decodeWords);
                break;
            case "Liczba decymalna":
                decodeWords = parseInt(decodeWord, 2);
                break;
            case "Liczba binarna":
                decodeWords =  Number(decodeWord).toString();  //usunięcie niepotrzebnych zer od lewej strony.
                break;
            case "All":
                if(i!==words.length-1){ //jezeli to nie jest ostatnie słowo, ponieważ na końcu jest CRC
                    decodeWords =  String.fromCharCode(parseInt(decodeWord, 2));
                }else {
                    continue; //przerwij pętle
                }
                break;
            default:
        }
        decodeText  += decodeWords;
    }
    if(typeOfCoding==="All"){
        document.getElementById("removeHammingOutput").innerText = decodeWord;
    }

   // alert(textWithoutHamming);

    if(typeOfCoding==="All"){
        verifyCRC();
    }else{
        document.getElementById("decodeOutput").innerHTML = decodeText;
    }
}

function checkDifference() {

    var strF;
    var strR;
    strR = document.getElementById("repairoutput").innerText;

    if(typeOfCoding!=="All"){ //zwykły hamming
        strF=  document.getElementById("outputconvert").value;
    }else{ //complete Coding
        strF=  document.getElementById("outputconvertAll").value;
    }


    document.getElementById("differenceOutput1").innerHTML="";
    document.getElementById("differenceOutput").innerHTML="";
    document.getElementById("differenceOutput2").innerHTML="";

    if(strF[0]===' '){
        strF = strF.substring(1, strF.length);
    }
    if(strF[strF.length-1]===' '){
        strF = strF.substring(0, strF.length-1);
    }

    if(strR[0]===' '){
        strR = strR.substring(1, strR.length);
    }
    if(strR[strR.length-1]===' '){
        strR = strR.substring(0, strR.length-1);
    }

    var strFirst =  Array.from(strF);
    var strRepaired =   Array.from(strR);
    var strGlobal =   Array.from(firstCode);

    var i =0;

    var mistakeCounter=0;
    var repairedMistakeCounter=0;
    var detectedMistakeCounter=0;

   // var differenceOutputText ="";
    //var differenceOutput1Text ="";
    //var differenceOutput2Text ="";

    for(i=0;i<strFirst.length;i++){
        if(strGlobal[i]===' '){
            document.getElementById("differenceOutput").innerHTML+=" ";
            document.getElementById("differenceOutput2").innerHTML+=" ";
            document.getElementById("differenceOutput1").innerHTML+=" ";

            continue;
        }

        if(strGlobal[i]!==strFirst[i])
        {
            alert("bład strGlobal[i]!==strFirst[i]");

            mistakeCounter++;
            document.getElementById("differenceOutput1").innerHTML+="<b>"+strFirst[i]+"</b>";
        }else{
            document.getElementById("differenceOutput1").innerHTML+=strFirst[i];
        }
        if(strGlobal[i]!==strRepaired[i]){
            alert("bład strFirst[i]!==strRepaired[i]");
            document.getElementById("differenceOutput").innerHTML+='<span class="text-warning"><b>'+strGlobal[i]+'</b></span>';
            document.getElementById("differenceOutput2").innerHTML+='<span class="text-danger"><b>'+strRepaired[i]+'</b></span>';

            if(strGlobal[i]===strFirst[i]) {
                mistakeCounter++; //bład wprowadzony przez kodowanie Hamminga
            }

        }else{
            if(strGlobal[i]===strRepaired[i]&&strFirst[i]!==strRepaired[i]){
                document.getElementById("differenceOutput").innerHTML+='<span class="text-warning" ><b>'+strGlobal[i]+'</b></span>';
                document.getElementById("differenceOutput2").innerHTML+='<span class="text-success"><b>'+strRepaired[i]+'</b></span>';
                repairedMistakeCounter++;
            }else{
                if(strGlobal[i]!==strRepaired[i]&&strGlobal[i]!==strFirst[i]) {
                    document.getElementById("differenceOutput").innerHTML+='<span class="text-warning"><b>'+strGlobal[i]+'</b></span>';
                    document.getElementById("differenceOutput2").innerHTML+='<span class="text-danger"><b>'+strRepaired[i]+'</b></span>';
                    detectedMistakeCounter++;
                }
                else{
                    document.getElementById("differenceOutput").innerHTML+=strGlobal[i];
                    document.getElementById("differenceOutput2").innerHTML+=strRepaired[i];
                }
            }
        }

    }


    if(typeOfCoding==="All"){
        var checkoutputCRCAllText = document.getElementById("checkoutputCRCAll").innerHTML;
        var words = checkoutputCRCAllText.split(" ");
        var word = words[words.length-1];
       // alert(word);
        if(word[word.length-10-bitCount]!=="s"){
            document.getElementById('crcWarningDiv').style.display="block"; //wyłączenie warninga przy porównaniu
            document.getElementById("crcWarning").innerHTML= '<b>Suma kontrolna jest niepoprawna! Dane mogą być uszkodzone</b>';
        }
        document.getElementById("input").innerText= document.getElementById("thing2convertAll").value;
    }else{
        document.getElementById("input").innerText= document.getElementById("thing2convertHamming").value;
    }
    document.getElementById("output").innerText= document.getElementById("decodeOutput").innerText;

    document.getElementById("compatibility").innerText=(100-((mistakeCounter-repairedMistakeCounter)*100)/strFirst.length);
    document.getElementById("numberOfErrors").innerText=mistakeCounter;
    document.getElementById("numberOfDetect").innerText=repairedMistakeCounter;
    document.getElementById("numberOfRepaired").innerText=repairedMistakeCounter;


}