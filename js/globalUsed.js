var typeOfCoding;

function setHome() {
    typeOfCoding="home";

    document.getElementById('Author').style.display = 'block';

    document.getElementById('NoiseButton').style.display = 'none';
    document.getElementById('NoiseCard').style.display = 'none';
    document.getElementById('differenceButton').style.display = 'none';
    document.getElementById('DifferenceCard').style.display = 'none';

    document.getElementById('repairButton').style.display = 'none';
    document.getElementById('repairCard').style.display = 'none';
    document.getElementById('recivedButton').style.display = 'none';
    document.getElementById('recivedCard').style.display = 'none';

    document.getElementById('HammingOption').style.display = 'none';
    document.getElementById('CompareOption1').style.display = 'none';
    document.getElementById('CompareOption2').style.display = 'none';

    document.getElementById('removeHammingCard').style.display = 'none';
    document.getElementById('checkoutputCRCAllCard').style.display = 'none';
}

function setParrity() {
    typeOfCoding="Parrity";

    document.getElementById('Author').style.display = 'none';

    document.getElementById('NoiseButton').style.display = 'block';
    document.getElementById('NoiseCard').style.display = 'block';
    document.getElementById('differenceButton').style.display = 'block';
    document.getElementById('DifferenceCard').style.display = 'block';

    document.getElementById('repairButton').style.display = 'none';
    document.getElementById('repairCard').style.display = 'none';

    document.getElementById('recivedButton').style.display = 'block';
    document.getElementById('recivedCard').style.display = 'block';

    document.getElementById('HammingOption').style.display = 'none';
    document.getElementById('CompareOption1').style.display = 'none';
    document.getElementById('CompareOption2').style.display = 'none';

    document.getElementById('checkoutputCRCAllCard').style.display = 'none';
    document.getElementById('removeHammingCard').style.display = 'none';

}
function setHamming() {
    typeOfCoding="Hamming";

    document.getElementById('Author').style.display = 'none';

    document.getElementById('NoiseButton').style.display = 'block';
    document.getElementById('NoiseCard').style.display = 'block';
    document.getElementById('differenceButton').style.display = 'block';
    document.getElementById('DifferenceCard').style.display = 'block';

    document.getElementById('repairButton').style.display = 'block';
    document.getElementById('repairCard').style.display = 'block';

    document.getElementById('recivedButton').style.display = 'none';
    document.getElementById('recivedCard').style.display = 'none';

    document.getElementById('HammingOption').style.display = 'block';
    document.getElementById('CompareOption1').style.display = 'none';
    document.getElementById('CompareOption2').style.display = 'none';

    document.getElementById('checkoutputCRCAllCard').style.display = 'none';
    document.getElementById('removeHammingCard').style.display = 'none';

}
function setCRC() {
    typeOfCoding="CRC";

    document.getElementById('Author').style.display = 'none';

    document.getElementById('NoiseButton').style.display = 'block';
    document.getElementById('NoiseCard').style.display = 'block';
    document.getElementById('differenceButton').style.display = 'block';
    document.getElementById('DifferenceCard').style.display = 'block';

    document.getElementById('repairButton').style.display = 'none';
    document.getElementById('repairCard').style.display = 'none';

    document.getElementById('recivedButton').style.display = 'block';
    document.getElementById('recivedCard').style.display = 'block';

    document.getElementById('HammingOption').style.display = 'none';
    document.getElementById('CompareOption1').style.display = 'none';
    document.getElementById('CompareOption2').style.display = 'none';

    document.getElementById('checkoutputCRCAllCard').style.display = 'none';
    document.getElementById('removeHammingCard').style.display = 'none';


}

function setAll() {
    typeOfCoding="All";

    document.getElementById('Author').style.display = 'none';

    document.getElementById('NoiseButton').style.display = 'block';
    document.getElementById('NoiseCard').style.display = 'block';
    document.getElementById('differenceButton').style.display = 'block';
    document.getElementById('DifferenceCard').style.display = 'block';

    document.getElementById('repairButton').style.display = 'block';
    document.getElementById('repairCard').style.display = 'block';

    document.getElementById('recivedButton').style.display = 'none';
    document.getElementById('recivedCard').style.display = 'none';

    document.getElementById('HammingOption').style.display = 'none';
    document.getElementById('CompareOption1').style.display = 'block';
    document.getElementById('CompareOption2').style.display = 'block';

    document.getElementById('checkoutputCRCAllCard').style.display = 'block';
    document.getElementById('removeHammingCard').style.display = 'block';
}


function makeword() {
    var length = Math.random() * 10+10;
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
        case "All":
            document.getElementById('thing2convertAll').value = makeword(); //zmienna do zakodowania
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
        case "All":
            document.getElementById('thing2convertAll').value = Math.floor(Math.random()*99+1).toString(2); //zmienna do zakodowania
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
        case "All":
            document.getElementById('thing2convertAll').value = Math.floor(Math.random()*99+1); //zmienna do zakodowania
            break;
        default:break;
    }
}

function onTypeChange(){

    switch (typeOfCoding) {
        case "Parrity":

            if(document.getElementById('typeOfInputParrity').value === "Tekst") {
                document.getElementById('genereteWordParrity').style.display = 'block';
                document.getElementById('genereteDecParrity').style.display = 'none';
                document.getElementById('genereteBinParrity').style.display = 'none';
            }
            if(document.getElementById('typeOfInputParrity').value === "Liczba binarna") {
                document.getElementById('genereteWordParrity').style.display = 'none';
                document.getElementById('genereteDecParrity').style.display = 'none';
                document.getElementById('genereteBinParrity').style.display = 'block';
            }
            if(document.getElementById('typeOfInputParrity').value === "Liczba decymalna") {
                document.getElementById('genereteWordParrity').style.display = 'none';
                document.getElementById('genereteDecParrity').style.display = 'block';
                document.getElementById('genereteBinParrity').style.display = 'none';
            }

            break;
        case "Hamming":

            if(document.getElementById('typeOfInputHamming').value === "Tekst") {
                document.getElementById('genereteWordHamming').style.display = 'block';
                document.getElementById('genereteDecHamming').style.display = 'none';
                document.getElementById('genereteBinHamming').style.display = 'none';

            }
            if(document.getElementById('typeOfInputHamming').value === "Liczba binarna") {
                document.getElementById('genereteWordHamming').style.display = 'none';
                document.getElementById('genereteDecHamming').style.display = 'none';
                document.getElementById('genereteBinHamming').style.display = 'block';
            }
            if(document.getElementById('typeOfInputHamming').value === "Liczba decymalna") {
                document.getElementById('genereteWordHamming').style.display = 'none';
                document.getElementById('genereteDecHamming').style.display = 'block';
                document.getElementById('genereteBinHamming').style.display = 'none';
            }

            break;
        case "CRC":
            if(document.getElementById('typeOfInputCRC').value === "Tekst") {
                document.getElementById('genereteWordCRC').style.display = 'block';
                document.getElementById('genereteDecCRC').style.display = 'none';
                document.getElementById('genereteBinCRC').style.display = 'none';

            }
            if(document.getElementById('typeOfInputCRC').value === "Liczba binarna") {
                document.getElementById('genereteWordCRC').style.display = 'none';
                document.getElementById('genereteDecCRC').style.display = 'none';
                document.getElementById('genereteBinCRC').style.display = 'block';
            }
            if(document.getElementById('typeOfInputCRC').value === "Liczba decymalna") {
                document.getElementById('genereteWordCRC').style.display = 'none';
                document.getElementById('genereteDecCRC').style.display = 'block';
                document.getElementById('genereteBinCRC').style.display = 'none';
            }
            break;
        case "All":
            if(document.getElementById('typeOfInputAll').value === "Tekst") {
                document.getElementById('genereteWordAll').style.display = 'block';
                document.getElementById('genereteDecAll').style.display = 'none';
                document.getElementById('genereteBinAll').style.display = 'none';

            }
            if(document.getElementById('typeOfInputAll').value === "Liczba binarna") {
                document.getElementById('genereteWordAll').style.display = 'none';
                document.getElementById('genereteDecAll').style.display = 'none';
                document.getElementById('genereteBinAll').style.display = 'block';
            }
            if(document.getElementById('typeOfInputAll').value === "Liczba decymalna") {
                document.getElementById('genereteWordAll').style.display = 'none';
                document.getElementById('genereteDecAll').style.display = 'block';
                document.getElementById('genereteBinAll').style.display = 'none';
            }
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
        case "All":
            str =  document.getElementById("outputconvertAll").value;
            document.getElementById("outputconvertAll").value="";
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
                case "All":
                    document.getElementById("outputconvertAll").value = document.getElementById("outputconvertAll").value + strArray[i];
                    break;
            }

        }

    }
    if(document.getElementById("typeOfNoise").value==="Pojedynczy bit w słowie")
    {  //alert ("słowa: "+words);

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
                    case "All":
                        document.getElementById("outputconvertAll").value = document.getElementById("outputconvertAll").value + word;
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
                    case "All":
                        document.getElementById("outputconvertAll").value = document.getElementById("outputconvertAll").value + word+" ";
                        break;
                }

            }
        }
    }


    if(document.getElementById("typeOfNoise").value==="Pojedynczy bit w tekście")
    {  //alert ("słowa: "+words);

        var wordPos = Math.floor(Math.random() * (+(words.length-1) - +0)) + +0;
        var word = words[wordPos]; //wylosuj jedno słowo

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

        words[wordPos] = word;

            for(i=0;i<words.length;i++){
                if(i===words.length-1){
                    switch (typeOfCoding) {
                        case "Parrity":
                            document.getElementById("outputconvertParrity").value = document.getElementById("outputconvertParrity").value + words[i];
                            break;
                        case "Hamming":
                            document.getElementById("outputconvert").value = document.getElementById("outputconvert").value + words[i];
                            break;
                        case "CRC":
                            document.getElementById("outputconvertCRC").value = document.getElementById("outputconvertCRC").value + words[i];
                            break;
                        case "All":
                            document.getElementById("outputconvertAll").value = document.getElementById("outputconvertAll").value + words[i];
                            break;
                    }
                }else{

                    switch (typeOfCoding) {
                        case "Parrity":
                            document.getElementById("outputconvertParrity").value = document.getElementById("outputconvertParrity").value + words[i]+" ";
                            break;
                        case "Hamming":
                            document.getElementById("outputconvert").value = document.getElementById("outputconvert").value + words[i]+" ";
                            break;
                        case "CRC":
                            document.getElementById("outputconvertCRC").value = document.getElementById("outputconvertCRC").value + words[i]+" ";
                            break;
                        case "All":
                            document.getElementById("outputconvertAll").value = document.getElementById("outputconvertAll").value + words[i]+" ";
                            break;
                    }
                }
            }
    }


    if(document.getElementById("typeOfNoise").value==="Bit kontrolny oraz kod w pojedynczym słowie w tekście")
    {  //alert ("słowa: "+words);

        var wordPos = Math.floor(Math.random() * (+(words.length-1) - +0)) + +0; //ktore słowo będzie zmieniane
        var word = words[wordPos]; //ustal to slowo

        random = Math.floor(Math.random() * (+max - +min)) + +min;  //losowa szansa na wygenerowanie szumu
        var controlBits = [];
        var textBits = [];
        var controlBitsCounter = 0;
        var textBitsCounter = 0;

        if(random <= noiseFrequency) {  //jeżeli random jest mniejszy/rowny czestotliwosci szumu wtedy zmieniony bit na przeciwny

            var pos1=0;
            var pos2=0;

            alert(typeOfCoding);


            switch (typeOfCoding) {
                case "Parrity":

                    pos2 = Math.floor(Math.random() * (+word.length-1 - +1)) + +1;  //który z bitów może być zamieniony (tylko te po 1 są tekstem

                    break;
                case "Hamming":
                    for (i =0;i<word.length;i++){
                        if(IsPowerOfTwo(word.length-i)===false) { //jeżeli pozycja nie jest liczbą podniesioną do potęgi 2
                            textBits[textBitsCounter]=word[i];
                            textBitsCounter++;
                        }else
                        {
                            controlBits[controlBitsCounter]=word[i];
                            controlBitsCounter++;
                        }
                    }
                    pos1 = textBits[Math.floor(Math.random() * (+textBits.length-1 - +0)) + +0];  //który z bitów może być zamieniony
                    pos2 = controlBits[Math.floor(Math.random() * (+controlBits.length-1 - +0)) + +0];  //który z bitów może być zamieniony

                    break;
                case "CRC":
                    document.getElementById("outputconvertCRC").value = document.getElementById("outputconvertCRC").value + words[i];
                    break;
            }

            word = word.split('');

            if(word[pos1]==="1"){
                word[pos1] = '0';
            }
            else{
                if(word[pos1]==="0"){
                    word[pos1] = '1';

                }
            }

            if(word[pos2]==="1"){
                word[pos2] = '0';
            }
            else{
                if(word[pos2]==="0"){
                    word[pos2] = '1';
                }
            }

            word = word.join('');

        }


        words[wordPos] = word;

        for(i=0;i<words.length;i++){
            if(i===words.length-1){
                switch (typeOfCoding) {
                    case "Parrity":
                        document.getElementById("outputconvertParrity").value = document.getElementById("outputconvertParrity").value + words[i];
                        break;
                    case "Hamming":
                        document.getElementById("outputconvert").value = document.getElementById("outputconvert").value + words[i];
                        break;
                    case "CRC":
                        document.getElementById("outputconvertCRC").value = document.getElementById("outputconvertCRC").value + words[i];
                        break;
                    case "All":
                        document.getElementById("outputconvertAll").value = document.getElementById("outputconvertAll").value + words[i];
                        break;
                }
            }else{

                switch (typeOfCoding) {
                    case "Parrity":
                        document.getElementById("outputconvertParrity").value = document.getElementById("outputconvertParrity").value + words[i]+" ";
                        break;
                    case "Hamming":
                        document.getElementById("outputconvert").value = document.getElementById("outputconvert").value + words[i]+" ";
                        break;
                    case "CRC":
                        document.getElementById("outputconvertCRC").value = document.getElementById("outputconvertCRC").value + words[i]+" ";
                        break;
                    case "All":
                        document.getElementById("outputconvertAll").value = document.getElementById("outputconvertAll").value + words[i]+" ";
                        break;
                }
            }
        }
    }

}


//Do ogólnego obliczenia
function CodeAll(){

//OBLICZANIE SUMY KONTROLNEJ
    onCRCTypeChange();

    var  massage;
    type = document.getElementById('typeOfInputAll').value

    document.getElementById('outputconvertAll').value="";

    if (type==="Liczba binarna") {
        massage = parseInt(document.getElementById('thing2convertAll').value, 2).toString();
    }else{
        massage = document.getElementById('thing2convertAll').value;
    }

    //alert(massage);

    generate(); //generowanie tabeli

    firstCode =Array.from( massage).map((each)=>each.charCodeAt(0).toString(2)).join(" "); //z string na bin ze spacjami

    document.getElementById('binpacketAll').innerText=firstCode;

    var massageToSend = codingCrc(massage);

    alert(massageToSend);

    document.getElementById('crcOutput').innerHTML = massageToSend;

    //OBLICZANIE SUMY KONTROLNEJ

    //OBLICZANIE HAMMINGA

    alert("Hamming");
    Hamming(); //wyslanie ciagu binarnego z CRC
    //OBLICZANIE HAMMINGA
}
