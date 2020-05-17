//
//https://4programmers.net/Algorytmy/Obliczanie_sum_kontrolnych_CRC-32
//

/* CRC-32 const table for ASCII codes */ //zmienna przechowująca tablice zmiennych
var crc32_tab=[256];


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
    var ascii = 0;
    var i = 0, j = 0;

    var asciiHelp;
    for(i = 0; i < 256; i++) // petla od 0 do 255
    {
        ascii = mirror_bits(i, 8);//odwróć 8 najmłodszych bitów A[ascii;
        ascii = ascii << 24;
        //Operator przesunięcia w lewo powoduje, że bity w przesunięciu shift-expression są przesuwane w lewo o liczbę pozycji określoną przez dodatek.
        for(j = 0; j < 8; j++) //// petla od 0 do 7 bo tyle ma słowo bitów
        {
            asciiHelp=(ascii & 0x80000000);

            if(asciiHelp !== 0) //bramka logiczna AND między słowem a 0x80000000  //sprawdz czy słowo jest  // jesli jest rożne od 0
            {
                ascii = (ascii << 1) ^ 0x04C11DB7;   // przesuń o 1 bit w lewo i xor'uj z 0x04C11DB7
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


function crc()
{
    generate(); //generowanie tabeli


    var  str = 'abc'; //utworzenie wyzerowanej zmiennej o odpowiedniej długości
    var i;
    var temp = 0x0;
    var temp2 = 0x00000000;

    var crc32 = 0xffffffff;



    for(i = 0; i < str.length; i++)
    {
        temp = crc32_tab[(crc32 & 0xff) ^ str.charCodeAt(i)];
        temp2 = (crc32>>>8); //musi być >>> bo nie działa przy >>
        crc32 = temp2 ^ temp ; //zmienna równa
    } //zmienna równa


    crc32 =crc32 ^ 0xffffffff;
    alert(crc32);

//do porównania http://crc32-checksum.waraxe.us/


}

