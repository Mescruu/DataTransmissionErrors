var firstCode="";

var type="";


function Hamming() {
    document.getElementById("binpacket").innerText = '';
    document.getElementById("outputconvert").value='';

    type = document.getElementById('typeOfInputHamming').value

    var bin;

    switch (type) {
        case "Tekst":
            bin = document.getElementById('thing2convertHamming').value; //zmienna do zakodowania
            codeHammingFromText(bin);


            break;
        case "Liczba decymalna":
            bin = parseInt(document.getElementById('thing2convertHamming').value); //zmienna do zakodowania
            bin = bin.toString(2);

            document.getElementById("binpacket").innerText=bin;

            codeHamming(bin);

            break;

        case "Liczba binarna":
            bin = document.getElementById('thing2convertHamming').value; //zmienna do zakodowania

            document.getElementById("binpacket").innerText=bin;

            codeHamming(bin);
            break;
        default:
    }


}
function codeHamming(bin) {

        var  parrityBits =  0;

        if (bin.length <=4) {

            parrityBits =  3;
            var controlTable= "1011"; //1 zaznaczają w których miejscach jest zmienna kontrolna
        }
        else
        {
            if(bin.length<=11)   //https://en.wikipedia.org/wiki/Hamming_code na podstawie tabeli general Algorithm
            {
                parrityBits =  4;
                var controlTable= "10001011"; //1 zaznaczają w których miejscach jest zmienna kontrolna

            }
            else
            {
                if(bin.length<=26)   //https://en.wikipedia.org/wiki/Hamming_code na podstawie tabeli general Algorithm
                {
                    parrityBits =  5;
                    var controlTable= "1000000010001011"; //1 zaznaczają w których miejscach jest zmienna kontrolna
                }
                else{
    throw new Error("Została wprowadzona za duża liczba!");
                }
            }
        }

hamming(parrityBits, controlTable, bin);
firstCode = document.getElementById("outputconvert").value;

}

function codeHammingFromText(str) {
    var i =0;
    var strAsciiArray=[];
    var outputBin = document.getElementById("binpacket").innerText;

    for (i = 0; i < str.length; i++) {
        strAsciiArray[i]=str.charCodeAt(i);
        codeHamming(strAsciiArray[i].toString(2));
        outputBin= outputBin + " " + strAsciiArray[i].toString(2);
    }
    document.getElementById("binpacket").innerText=outputBin;

}
function IsPowerOfTwo(x)
{
    return (x != 0) && ((x & (x - 1)) == 0);
}

function hamming(parrityBits,controlTable, text) {


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
    var outputText =  document.getElementById("outputconvert").value;

    if(outputText===""){
        document.getElementById("outputconvert").value=code.join("");
    }else{
        document.getElementById("outputconvert").value=outputText+" "+ code.join("");
    }


}

function checkCode() {

    var str =  document.getElementById("outputconvert").value;
    document.getElementById("checkoutput").innerHTML ="";
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

            document.getElementById("checkoutput").innerHTML =document.getElementById("checkoutput").innerHTML + " ";
            document.getElementById("repairoutput").innerHTML =document.getElementById("repairoutput").innerHTML + " ";

            for(j=0; j<word.length;j++){
                if(j===(word.length - checksum)){
                    document.getElementById("checkoutput").innerHTML = document.getElementById("checkoutput").innerHTML +"<b>"+ word[j]+"</b>";

                    var repairWord = repairCode(word[j]);
                    document.getElementById("repairoutput").innerHTML = document.getElementById("repairoutput").innerHTML +"<u>"+ repairWord +"</u>";

                }else{
                    document.getElementById("checkoutput").innerHTML = document.getElementById("checkoutput").innerHTML +word[j];
                    document.getElementById("repairoutput").innerHTML = document.getElementById("repairoutput").innerHTML +word[j];
                }
            }
                document.getElementById("checkoutput").innerHTML =document.getElementById("checkoutput").innerHTML + " ";
                document.getElementById("repairoutput").innerHTML =document.getElementById("repairoutput").innerHTML + " ";
        }
        else{
            document.getElementById("checkoutput").innerHTML = document.getElementById("checkoutput").innerHTML+" "+ words[i];
            document.getElementById("repairoutput").innerHTML = document.getElementById("repairoutput").innerHTML+" "+ words[i];
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

    document.getElementById("decodeOutput").innerText="";

    if(str[0]===' '){
        str = str.substring(1, str.length);
    }
    if(str[str.length-1]===' '){
        str = str.substring(0, str.length-1);
    }


    var controlPos = [];

    var words = str.split(' '); //rozdzielenie pobranego tekstu na osobne wyrazy.


    if (words[0].length <=4) {

        controlPos = [1,2,4];

    }
    else
    {
        if(words[0].length<=11)   //https://en.wikipedia.org/wiki/Hamming_code na podstawie tabeli general Algorithm
        {
            controlPos = [1,2,4,8];
        }
        else
        {
            if(words[0].length<=26)   //https://en.wikipedia.org/wiki/Hamming_code na podstawie tabeli general Algorithm
            {
                controlPos = [1,2,4,8,16];
            }
            else{
                throw new Error("Błąd przy dekodowaniu");
            }
        }
    }

    var i;
    var j;
    var word;
    var decodeWord="";
    var decodeWords="";


    for(i=0;i<words.length;i++){
        word = words[i];

        decodeWord="";

        for(j=0;j<word.length;j++){
            if((word.length-j)!==controlPos[0] && (word.length-j)!==controlPos[1] && (word.length-j)!==controlPos[2] && (word.length-j)!==controlPos[3] && (word.length-j)!==controlPos[4]){ //sprawdzenie czy litera nie jest na pozycji bitu kontrolnego.
                decodeWord+=word[j];
            }
        }
        switch (type) {
            case "Tekst":
                decodeWords =  String.fromCharCode(parseInt(decodeWord, 2));
                break;
            case "Liczba decymalna":
                decodeWords = parseInt(decodeWord, 2);
                break;
            case "Liczba binarna":
                decodeWords =  Number(decodeWord).toString();  //usunięcie niepotrzebnych zer od lewej strony.
                break;
            default:
        }

        document.getElementById("decodeOutput").innerHTML  = document.getElementById("decodeOutput").innerHTML +decodeWords;
    }

}

function checkDifference() {


    var strF = document.getElementById("outputconvert").value;
    var strR = document.getElementById("repairoutput").innerText;

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


    for(i=0;i<strFirst.length;i++){
        if(strGlobal[i]===' '){
            document.getElementById("differenceOutput").innerHTML=document.getElementById("differenceOutput").innerHTML+" ";
            document.getElementById("differenceOutput2").innerHTML=document.getElementById("differenceOutput2").innerHTML+" ";
            document.getElementById("differenceOutput1").innerHTML=document.getElementById("differenceOutput1").innerHTML+" ";

            continue;
        }
        if(strGlobal[i]!==strFirst[i])
        {
            mistakeCounter++;
            document.getElementById("differenceOutput1").innerHTML+="<b>"+strFirst[i]+"</b>";
        }else{
            document.getElementById("differenceOutput1").innerHTML+=strFirst[i];
        }
        if(strGlobal[i]===strRepaired[i]&&strFirst[i]!==strRepaired[i]){
            document.getElementById("differenceOutput").innerHTML=document.getElementById("differenceOutput").innerHTML+'<span class="text-warning">'+strGlobal[i]+'</span>';
            document.getElementById("differenceOutput2").innerHTML=document.getElementById("differenceOutput2").innerHTML+'<span class="text-success">'+strRepaired[i]+'</span>';
            repairedMistakeCounter++;
        }else{
            if(strGlobal[i]!==strRepaired[i]&&strGlobal[i]!==strFirst[i]) {
                document.getElementById("differenceOutput").innerHTML=document.getElementById("differenceOutput").innerHTML+'<span class="text-warning">'+strGlobal[i]+'</span>';
                document.getElementById("differenceOutput2").innerHTML=document.getElementById("differenceOutput2").innerHTML+'<span class="text-danger">'+strRepaired[i]+'</span>';
                detectedMistakeCounter++;
            }
            else{
                document.getElementById("differenceOutput").innerHTML=document.getElementById("differenceOutput").innerHTML+strGlobal[i];
                document.getElementById("differenceOutput2").innerHTML=document.getElementById("differenceOutput2").innerHTML+strRepaired[i];
            }
        }
    }

    document.getElementById("input").innerText= document.getElementById("thing2convertHamming").value;
    document.getElementById("output").innerText= document.getElementById("decodeOutput").innerText;

    document.getElementById("compatibility").innerText=(100-((mistakeCounter-repairedMistakeCounter)*100)/strFirst.length);
    document.getElementById("numberOfErrors").innerText=mistakeCounter;
    document.getElementById("numberOfDetect").innerText=repairedMistakeCounter;
    document.getElementById("numberOfRepaired").innerText=repairedMistakeCounter;

}