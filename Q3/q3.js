const { profile } = require('console')
const { DESTRUCTION } = require('dns')
const https = require('https')
const url = 'https://gist.githubusercontent.com/dhamanutd/97aa0d2131903ea8c071721032c7b2a3/raw/60f5108ca55c9a07a951c884599e6b7d07153d14/inventory_list.md'

https.get(url,res=>{
    let body = ''
    res.on('data', data=>{
        
        body+= data
    })
    res.on('end', ()=> {
        var jsonBody = body.replace(/`/g,'').replace(/articles:/g,'articles'), 
        answer1 = [], answer2 = [], answer3 = [], answer4 = [], answer5 = [], answer6 = [], answer7 = []
        jsonBody = JSON.parse(jsonBody)

        console.log("1. Find items in the Meeting Room")
        for(var o in jsonBody){
            if(jsonBody[o].placement.name.toLowerCase() == "meeting room"){
                answer1.push(jsonBody[o].name)
            }
        }
        console.log("answer : "+stringifyAnswer(answer1))
        console.log()

        console.log("2. Find all electronic devices")
        for(var o in jsonBody){
            if(jsonBody[o].type.toLowerCase() == "electronic"){
                answer2.push(jsonBody[o].name)
            }
        }
        console.log("answer : "+stringifyAnswer(answer2))
        console.log()

        console.log("3. Find all the furniture")
        for (var o in jsonBody){
            var tags = jsonBody[o].tags
            for (var i=0; i<tags.length; i++){
                if(tags[i].toLowerCase() == "furniture"){
                    answer3.push(jsonBody[o].name)
                }
            }
        }
        console.log("answer : "+stringifyAnswer(answer3))
        console.log()

        console.log("4. Find all items were purchased on 16 Januari 2020")
        var dtKey = '1/16/2020'
        for (var o in jsonBody){
            const purchased = jsonBody[o].purchased_at
            const dt = new Date(purchased*1000)
            if(dt.toLocaleDateString() == dtKey){
                answer4.push(jsonBody[o].name)
            }
        }
        console.log("answer : "+stringifyAnswer(answer4))
        console.log()

        console.log("5. Find all items with brown color")
        for(var o in jsonBody){
            var tags = jsonBody[o].tags
            for(var i=0; i<tags.length; i++){
                if(tags[i].toLowerCase() == "brown"){
                    answer5.push(jsonBody[o].name)
                }
            }
        }
        console.log("answer : "+stringifyAnswer(answer5))
        console.log()

        function stringifyAnswer(arr){
            var res = ""
            if(!arr[0]){
                res = "Not Found"
            }else{
                for(var i=0; i<arr.length; i++){
                    if(res == ""){
                        res += arr[i]
                    }else{
                        res += ", "+arr[i]
                    }
                }
            }
            return res
        }
    })
        
})
