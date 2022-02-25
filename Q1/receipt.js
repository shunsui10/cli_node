const readline = require('readline');
const align_left = "LEFT", align_mid = "MID", align_right = "RIGHT"
var ObjArr = {
    restoName : null,
    date : null,
    OpName : null,
    items : []
}

function listenInput() {
  return new Promise(function(resolve, reject) {
    let input = readline.createInterface(process.stdin, process.stdout)
    input.setPrompt('Pilih Menu> ')
    input.prompt();
    input.on('line', function(option) {
      if (option === "0") {
        input.close()
        return
      }

      if (option === "1") {
        input.question("Nama resto : ", function(restoName){
            function inputDate(){
                input.question("Tanggal (dd/mm/yyyy) : ", function(date){
                    if(!isValidDate(date)){
                        console.log("format tanggal salah")
                        inputDate()
                    }else{
                        input.question("Nama operator kasir : ", function(namaOp){
                            input.question("Nama Item : ", function(namaItem){
                                input.question("Harga : ", function(harga){
                                    addItem(restoName, date, namaOp, namaItem, harga)
                                    input.close()
                                    showMenu()
                                    listenInput()
                                })
                            })
                        })
                    }
                })
            }
            inputDate()
        })
      } else if (option === "2") {
        if(!isObjItemNull()){
            input.question("Nomor item dihapus> ", function(number){
                deleteItem(number-1)
                input.close()
                showMenu()
                listenInput()
            })
        }else{
            console.log("Item belum ada")
        }
      } else if (option === "3") {
        if(!isObjItemNull()){
            printReceipt()
        }else{
            console.log("!!Data nota belum tersedia, silahkan input dahulu!!")
            showMenu()
        }
      } else if(option === "4"){
        showMenu()
      } else {
        console.log(`unknown command: "${option}"`)
      }
      input.prompt()

    }).on('close',function(){
      console.log('Exited')
      resolve(true) 
    });
  })
}

function isObjItemNull(){
    if(ObjArr.items[0]){
        return false
    }else{
        return true
    }
}

function showMenu(){
    console.log("=====Menu=====")
    console.log("1. Tambah item"+"("+ObjArr.items.length+" item)")
    console.log("2. Hapus item")
    console.log("3. Print")
    console.log("4. Batal")
    console.log("0. Keluar")
}

function addItem(resto, date, name, item, harga){
    ObjArr.items.push({item: item, harga: 'Rp. '+harga})
    ObjArr.OpName = name
    ObjArr.restoName = resto
    ObjArr.date = date
}

function deleteItem(itemNumber){
    ObjArr.items.splice(itemNumber, 1)
}

function printReceipt(){
    var dt = new Date()
    var arr = ObjArr.items, total = 0
    var restoAlign = generateSpace(30-ObjArr.restoName.length, " ", align_mid).split('/')

    console.log()
    console.log(restoAlign[0]+ObjArr.restoName+restoAlign[1])
    console.log("Tanggal :  "+ObjArr.date+" "+ dt.toLocaleTimeString())
    console.log("Nama Kasir : "+generateSpace(30-(ObjArr.OpName.length + 13)," ")+ObjArr.OpName)
    console.log("==============================")

    for(var i=0; i<arr.length; i++){
        var hargaItem = arr[i].harga.split(' ')
        if(getLengthTotal(arr[i].item, arr[i].harga)<=30){
            console.log(arr[i].item+generateSpace(30-(arr[i].item.length+arr[i].harga.length),".")+arr[i].harga)
        }else{
            var temp
            if(arr[i].item.length>30 && arr[i].harga.length<30){
                temp = arr[i].item
                console.log(temp.substring(0, 30))
                calibratePrint(temp, arr[i].harga, align_left)

            }else if(arr[i].item.length<30 && arr[i].harga.length>30){
                temp = arr[i].item
                console.log(temp+generateSpace(30-temp.length,"."))
                temp = arr[i].harga
                console.log(temp.substring(0, 30))
                calibratePrint(temp, arr[i].item, align_right)

            }else if(arr[i].item.length<30 && arr[i].harga.length<30){
                temp = arr[i].item
                console.log(temp+generateSpace(30-temp.length,"."))
                temp = arr[i].harga
                console.log(generateSpace(30-temp.length,".")+temp)

            }else if(arr[i].item.length>30 && arr[i].harga.length>30){
                temp = arr[i].item
                console.log(temp.substring(0, 30))
                calibratePrint(temp, arr[i].harga, align_left)
                temp = arr[i].harga
                console.log(temp.substring(0, 30))
                calibratePrint(temp, arr[i].item, align_right)
            }
        }
        total += parseInt(hargaItem[1])
    }

    console.log()
    total = "Rp. "+total
    console.log("Total"+generateSpace(30-(total.toString().length+5),".")+total)
    console.log()
    showMenu()
}

function getLengthTotal(array1, array2){
    var res = array1.length+array2.length
    return res
}

function calibratePrint(arr1, arr2, align){
    
    while(getLengthTotal(arr1,arr2)>30){
        arr1 = arr1.substring(30)
        if(align === align_left){
            if(getLengthTotal(arr1.substring(0,30),arr2)>30){
                console.log(arr1.substring(0,30)+generateSpace(30-getLengthTotal(arr1.substring(0,30),arr2),"."))
            }else{
                console.log(arr1.substring(0,30)+generateSpace(30-getLengthTotal(arr1.substring(0,30),arr2),".")+arr2)
            }
        }else{
            if(getLengthTotal(arr1.substring(0,30),arr2)>30){
                console.log(arr1.substring(0,30)+generateSpace(30-getLengthTotal(arr1.substring(0,30),arr2),"."))
            }else{
                console.log(generateSpace(30-arr1.substring(0,30).length,".")+arr1.substring(0,30))
            }
        }
        
    }
}

function generateSpace(range, spaceType, align){
    var dot = ""
    for(var i=0; i<range; i++){
        dot+= spaceType
        if(align === align_mid && i == (Math.round(range/2))){
            dot+= "/"
        }
    }
    return dot
}

function isValidDate(dateString)
{
    if(!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(dateString))
        return false;
    var parts = dateString.split("/");
    var day = parseInt(parts[0], 10);
    var month = parseInt(parts[1], 10);
    var year = parseInt(parts[2], 10);

    if(year < 1000 || year > 3000 || month == 0 || month > 12)
        return false;

    var monthLength = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];

    if(year % 400 == 0 || (year % 100 != 0 && year % 4 == 0))
        monthLength[1] = 29;

    return day > 0 && day <= monthLength[month - 1];
};

function mainRun(){
    showMenu()
    listenInput()
}

mainRun()
