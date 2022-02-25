const { profile } = require('console')
const https = require('https')
const url = 'https://gist.githubusercontent.com/dhamanutd/6993984928506eea49908c2e3fcbc628/raw/65e5c2b0874f6efefb99db824cff922ca9435193/profile_list.md'

https.get(url,res=>{
    let body = ''
    res.on('data', data=>{
        
        body+= data
    })
    res.on('end', ()=> {
        var jsonBody = body.replace(/`/g,'').replace(/articles:/g,'articles'), 
        answer1 = [], answer2 = [], answer3 = [], answer4 = [], answer5 = [], answer6 = [], answer7 = []
        jsonBody = JSON.parse(jsonBody)

        console.log("1. Find users who don't have any phone numbers")
        for (var o in jsonBody){
            if(jsonBody[o].profile.phones.length == 0){
                answer1.push(jsonBody[o].username)
            }
        }
        console.log("answer : "+stringifyAnswer(answer1))
        console.log()

        console.log("2. Find users who have articles")
        for(var o in jsonBody){
            if(jsonBody[o].articles[0]){
                answer2.push(jsonBody[o].username)
            }
        }
        console.log("answer : "+stringifyAnswer(answer2))
        console.log()

        console.log("3. Find users who have annis on their name")
        for(var o in jsonBody){
            var fname = jsonBody[o].profile.full_name
            if(fname.toLowerCase().indexOf("annis") != -1){
                answer3.push(jsonBody[o].username+"("+fname+")")
            }
        }
        console.log("answer : "+ stringifyAnswer(answer3))
        console.log()

        console.log("4. Find users who have articles on the year 2020")
        for(var o in jsonBody){
            const published = jsonBody[o].articles.published_at
            const dt = new Date(published)
            if(dt.getFullYear == 2020){
                answer4.push(jsonBody[o].username)
            }
        }
        console.log("answer : "+stringifyAnswer(answer4))
        console.log()

        console.log("5. Find users who are born in 1986")
        for(var o in jsonBody){
            const born = jsonBody[o].profile.birthday
            const dt = new Date(born)

            if(dt.getFullYear() == 1986){
                answer5.push(jsonBody[o].username)
            }
        }
        console.log("answer : "+stringifyAnswer(answer5))
        console.log()

        console.log("6. Find articles that contain tips on the title")
        for (var o in jsonBody){
            var articlesArr = jsonBody[o].articles
            for(var i=0; i<articlesArr.length; i++){
                if(articlesArr[i].title.toLowerCase().indexOf("tips") != -1){
                    answer6.push(articlesArr[i].title+"("+jsonBody[o].username+")")
                }
            }
        }
        console.log("answer : "+stringifyAnswer(answer6))
        console.log()

        console.log("7. Find articles published before August 2019")
        for (var o in jsonBody){
            var articlesArr = jsonBody[o].articles
            for(var i=0; i<articlesArr.length; i++){
                const published = articlesArr[i].published_at
                const dt = new Date(published)
                if(dt.getFullYear()<=2019 && dt.getMonth()<7){
                    answer7.push(articlesArr[i].title+"("+jsonBody[o].username+")")
                }
            }
        }
        console.log("answer : "+stringifyAnswer(answer7))
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
                        res += ","+arr[i]
                    }
                }
            }
            return res
        }
    })
        
})
