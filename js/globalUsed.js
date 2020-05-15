var typeOfCoding;

function setParrity() {
typeOfCoding="Parrity";

    document.getElementById('repairButton').style.display = 'none';
    document.getElementById('repairCard').style.display = 'none';

    document.getElementById('recivedButton').style.display = 'block';
    document.getElementById('recivedCard').style.display = 'block';

}
function setHamming() {
    typeOfCoding="Hamming";

    document.getElementById('repairButton').style.display = 'block';
    document.getElementById('repairCard').style.display = 'block';

    document.getElementById('recivedButton').style.display = 'none';
    document.getElementById('recivedCard').style.display = 'none';

}
function setCRC() {
    typeOfCoding="CRC";
    document.getElementById('repairButton').style.display = 'block';
    document.getElementById('repairCard').style.display = 'block';

    document.getElementById('recivedButton').style.display = 'none';
    document.getElementById('recivedCard').style.display = 'none';
}

function makeword() {
    var length = Math.random() * 10+1;
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
function GenerateWord(){

    switch (typeOfCoding) {
        case "Parrity":
            document.getElementById('thing2convertParrity').value = makeword(); //zmienna do zakodowania
            break;
        case "Hamming":
            document.getElementById('thing2convertHamming').value = makeword(); //zmienna do zakodowania
            break;
        case "CRC":
            document.getElementById('thing2convertCRC').value = makeword(); //zmienna do zakodowania
            break;
        default:break;
    }
}
function GenerateBin(){
    switch (typeOfCoding) {
        case "Parrity":
            document.getElementById('thing2convertParrity').value = Math.floor(Math.random()*99+1).toString(2); //zmienna do zakodowania
            break;
        case "Hamming":
            document.getElementById('thing2convertHamming').value = Math.floor(Math.random()*99+1).toString(2); //zmienna do zakodowania
            break;
        case "CRC":
            document.getElementById('thing2convertCRC').value = Math.floor(Math.random()*99+1).toString(2); //zmienna do zakodowania
            break;
        default:break;
    }

}
function GenerateDec(){
    switch (typeOfCoding) {
        case "Parrity":
            document.getElementById('thing2convertParrity').value = Math.floor(Math.random()*99+1); //zmienna do zakodowania
            break;
        case "Hamming":
            document.getElementById('thing2convertHamming').value = Math.floor(Math.random()*99+1); //zmienna do zakodowania
            break;
        case "CRC":
            document.getElementById('thing2convertCRC').value = Math.floor(Math.random()*99+1); //zmienna do zakodowania
            break;
        default:break;
    }
}

function onTypeChange(){

    switch (typeOfCoding) {
        case "Parrity":

            if(document.getElementById('typeOfInputParrity').value == "Tekst") {
                document.getElementById('genereteWordParrity').style.display = 'block';
                document.getElementById('genereteDecParrity').style.display = 'none';
                document.getElementById('genereteBinParrity').style.display = 'none';

            }
            if(document.getElementById('typeOfInputParrity').value == "Liczba binarna") {
                document.getElementById('genereteWordParrity').style.display = 'none';
                document.getElementById('genereteDecParrity').style.display = 'none';
                document.getElementById('genereteBinParrity').style.display = 'block';
            }
            if(document.getElementById('typeOfInputParrity').value == "Liczba decymalna") {
                document.getElementById('genereteWordParrity').style.display = 'none';
                document.getElementById('genereteDecParrity').style.display = 'block';
                document.getElementById('genereteBinParrity').style.display = 'none';
            }

            break;
        case "Hamming":

            if(document.getElementById('typeOfInputHamming').value == "Tekst") {
                document.getElementById('genereteWordHamming').style.display = 'block';
                document.getElementById('genereteDecHamming').style.display = 'none';
                document.getElementById('genereteBinHamming').style.display = 'none';

            }
            if(document.getElementById('typeOfInputHamming').value == "Liczba binarna") {
                document.getElementById('genereteWordHamming').style.display = 'none';
                document.getElementById('genereteDecHamming').style.display = 'none';
                document.getElementById('genereteBinHamming').style.display = 'block';
            }
            if(document.getElementById('typeOfInputHamming').value == "Liczba decymalna") {
                document.getElementById('genereteWordHamming').style.display = 'none';
                document.getElementById('genereteDecHamming').style.display = 'block';
                document.getElementById('genereteBinHamming').style.display = 'none';
            }

            break;
        case "CRC":

            break;
        default:break;
    }
}



function enterNoise() {

    var str;
    switch (typeOfCoding) {
        case "Parrity":
            str =  document.getElementById("outputconvertParrity").value;
            document.getElementById("outputconvertParrity").value="";
            break;
        case "Hamming":
            str =  document.getElementById("outputconvert").value;
            document.getElementById("outputconvert").value="";
            break;
        case "CRC":
            str =  document.getElementById("outputconvertCRC").value;
            document.getElementById("outputconvertCRC").value="";
            break;
    }

    var noiseFrequency =  document.getElementById("noiseFrequency").value;

    var words = str.split(' '); //rozdzielenie pobranego tekstu na osobne wyrazy.

    var strArray =  Array.from(str);

    var min=0;
    var max=100;
    var random;

    var i;

    if(document.getElementById("typeOfNoise").value==="Każdy bit")
    {

        for(i=0;i<str.length;i++){

            if(strArray[i]!==" "){
                random = Math.floor(Math.random() * (+max - +min)) + +min;  //losowa szansa na wygenerowanie szumu
                if(random <= noiseFrequency){  //jeżeli random jest mniejszy/rowny czestotliwosci szumu wtedy zmieniony bit na przeciwny
                    if(strArray[i]==="1"){
                        strArray[i] = "0";
                    }
                    else{
                        if(strArray[i]==="0"){
                            strArray[i] = "1";
                        }
                    }
                }
            }

            switch (typeOfCoding) {
                case "Parrity":
                    document.getElementById("outputconvertParrity").value = document.getElementById("outputconvertParrity").value + strArray[i];
                    break;
                case "Hamming":
                    document.getElementById("outputconvert").value = document.getElementById("outputconvert").value + strArray[i];
                    break;
                case "CRC":
                    document.getElementById("outputconvertCRC").value = document.getElementById("outputconvertCRC").value + strArray[i];
                    break;
            }

        }

    }
    else{
        //alert ("słowa: "+words);

        for(i=0;i<words.length;i++) {
            var word = words[i];

            random = Math.floor(Math.random() * (+max - +min)) + +min;  //losowa szansa na wygenerowanie szumu
            if(random <= noiseFrequency) {  //jeżeli random jest mniejszy/rowny czestotliwosci szumu wtedy zmieniony bit na przeciwny

                var pos = Math.floor(Math.random() * (+word.length-1 - +0)) + +0;  //który z bitów może być zamieniony

                if(word[pos]==="1"){

                    //alert("word["+pos+"] = " + word[pos]);
                    word = word.substring(0, pos) + '0' + word.substring(pos+1);
                    //alert("po zmianie word["+pos+"] = " + word[pos]);
                }
                else{
                    if(word[pos]==="0"){

                        //alert("word["+pos+"] = " + word[pos]);
                        word = word.substring(0, pos) + '1' + word.substring(pos+1);
                        //alert("po zmianie word["+pos+"] = " + word[pos]);
                    }
                }

            }
            if(i===words.length-1){

                switch (typeOfCoding) {
                    case "Parrity":
                        document.getElementById("outputconvertParrity").value = document.getElementById("outputconvertParrity").value + word;
                        break;
                    case "Hamming":
                        document.getElementById("outputconvert").value = document.getElementById("outputconvert").value + word;
                        break;
                    case "CRC":
                        document.getElementById("outputconvertCRC").value = document.getElementById("outputconvertCRC").value + word;
                        break;
                }
            }else{

                switch (typeOfCoding) {
                    case "Parrity":
                        document.getElementById("outputconvertParrity").value = document.getElementById("outputconvertParrity").value + word+" ";
                        break;
                    case "Hamming":
                        document.getElementById("outputconvert").value = document.getElementById("outputconvert").value + word+" ";
                        break;
                    case "CRC":
                        document.getElementById("outputconvertCRC").value = document.getElementById("outputconvertCRC").value + word+" ";
                        break;
                }

            }
        }
    }
}