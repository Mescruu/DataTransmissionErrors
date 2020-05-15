var firstCode="";
var type;
function Parrity() {
    document.getElementById("binpacketParrity").innerText = '';
    document.getElementById("outputconvertParrity").value='';

    type = document.getElementById('typeOfInputParrity').value
    var bin;

    switch (type) {
        case "Tekst":
            bin = document.getElementById('thing2convertParrity').value; //zmienna do zakodowania
            document.getElementById("outputconvertParrity").value="";
            codeParrityFromText(bin);
            break;

        case "Liczba decymalna":
            bin = parseInt(document.getElementById('thing2convertParrity').value); //zmienna do zakodowania
            bin = bin.toString(2);

            document.getElementById("binpacketParrity").innerText=bin;
            document.getElementById("outputconvertParrity").value="";

            codeParrity(bin);
            break;

        case "Liczba binarna":
            bin = document.getElementById('thing2convertParrity').value; //zmienna do zakodowania
            document.getElementById("binpacketParrity").innerText=bin;
            document.getElementById("outputconvertParrity").value="";

            codeParrity(bin);

            break;
        default:
    }

    firstCode = document.getElementById("outputconvertParrity").value;

}

function codeParrity(bin) {
//Ustawiony na parzystość
    var i;

    var countOfOne=0;

    var words = bin.split(' '); //rozdzielenie pobranego tekstu na osobne wyrazy.

    for(i=0;i<words.length;i++)
    {
        countOfOne=0;

        var word = words[i];
        var j;

        for(j=0;j<word.length;j++)
        {
            if(word[j]==="1"){
                countOfOne++;
            }
        }

        if (countOfOne % 2 === 0){
            document.getElementById("outputconvertParrity").value=document.getElementById("outputconvertParrity").value+"0"+words[i]+" ";
        }else{
            document.getElementById("outputconvertParrity").value=document.getElementById("outputconvertParrity").value+"1"+words[i]+" ";
        }
    }

}

function codeParrityFromText(str) {
    var i =0;
    var strAsciiArray=[];
    var outputBin = document.getElementById("binpacketParrity").innerText;

    for (i = 0; i < str.length; i++) {
        strAsciiArray[i]="0000000"; //Zmienne ASCI posiadają 7 bitów
        strAsciiArray[i] = strAsciiArray[i].substring(0, 7 - (str.charCodeAt(i)).toString(2).length); //uciecie koncowki pustego textu i dodanie na koniec binarnej wartosci z bin.
        strAsciiArray[i]= strAsciiArray[i]+(str.charCodeAt(i)).toString(2);
        codeParrity(strAsciiArray[i]);

        outputBin= outputBin + " " + strAsciiArray[i].toString(2);
    }
    document.getElementById("binpacketParrity").innerText=outputBin;

    var text = document.getElementById("outputconvertParrity").value;
    document.getElementById("outputconvertParrity").value=text.substring(0, text.length - 1);
}

function checkCodeParrity() {

    document.getElementById("checkoutputParrity").innerHTML="";

    var bin = document.getElementById("outputconvertParrity").value;

    var i;

    var countOfOne=0;

    var words = bin.split(' '); //rozdzielenie pobranego tekstu na osobne wyrazy.

    for(i=0;i<words.length;i++)
    {
        countOfOne=0;

        var word = words[i];
        var j;

        for(j=0;j<word.length;j++)
        {
            if(word[j]==="1"){
                countOfOne++;
            }
        }

        if (countOfOne % 2 === 0){
            document.getElementById("checkoutputParrity").innerHTML=document.getElementById("checkoutputParrity").innerHTML+words[i]+" ";
        }else{
            document.getElementById("checkoutputParrity").innerHTML=document.getElementById("checkoutputParrity").innerHTML+'<b>'+words[i]+"</b> ";
        }
    }

    decodeParrity(document.getElementById("checkoutputParrity").innerText);

    checkParrityDifference(document.getElementById("checkoutputParrity").innerText);


}

function decodeParrity(words) {

    var i;
    var word;
    var decodeWord="";
    var decodeWords="";


    document.getElementById("recivedOutput").innerText="";

    if(words[0]===' '){
        words = words.substring(1, words.length);
    }
    if(words[words.length-1]===' '){
        words = words.substring(0, words.length-1);
    }



      words = words.split(' '); //rozdzielenie pobranego tekstu na osobne wyrazy.

    for(i=0;i<words.length;i++){
        word = words[i];
        decodeWord="";
        decodeWord = word.substring(1, word.length);

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

        document.getElementById("recivedOutput").innerHTML  = document.getElementById("recivedOutput").innerHTML +decodeWords;
    }

}

function checkParrityDifference() {


    var strF = document.getElementById("checkoutputParrity").innerText;

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
    var strGlobal =  firstCode.split(' ');

    var checkoutputParrityText = document.getElementById("checkoutputParrity").innerHTML;
    var checkoutputParrityTextSplit =  checkoutputParrityText.split(' ');

    var i =0;

    var mistakeCounter=0;
    var detectedMistakeCounter=0;


    for(i=0;i<strFirst.length;i++){

        var checkoutputParrityWord = checkoutputParrityTextSplit[i]; //
        if(checkoutputParrityWord[1]==="b"){  //jezeli jest wytluszczone slowo, wtedy oznacza, że zostało wykryte
            detectedMistakeCounter+=strGlobal[i].length;
        }

            document.getElementById("differenceOutput").innerHTML=document.getElementById("differenceOutput").innerHTML+" ";
            document.getElementById("differenceOutput1").innerHTML=document.getElementById("differenceOutput1").innerHTML+" ";

        if(strGlobal[i]!==strFirst[i])
        {
            mistakeCounter+=strGlobal[i].length;
            document.getElementById("differenceOutput").innerHTML+='<d>'+strGlobal[i]+"</d>";
            document.getElementById("differenceOutput1").innerHTML+='<span class="text-danger">'+strFirst[i]+"</span>";
        }else{
            document.getElementById("differenceOutput").innerHTML+=strGlobal[i];
            document.getElementById("differenceOutput1").innerHTML+=strFirst[i];
        }
    }

    document.getElementById("input").innerText= document.getElementById("thing2convertParrity").value;
    document.getElementById("output").innerText= document.getElementById("recivedOutput").innerText;

    document.getElementById("compatibility").innerText=(100-((mistakeCounter)*100)/(strFirst[0].length*strFirst.length));
    document.getElementById("numberOfErrors").innerText=mistakeCounter;
    document.getElementById("numberOfDetect").innerText=detectedMistakeCounter;
    document.getElementById("numberOfRepaired").innerText="brak";

}