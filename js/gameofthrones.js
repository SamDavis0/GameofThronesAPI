// $(() => {

// let fullCharList = [];
// let flag = false



//     for (let index = 1; index <= 50; index++) {
//         $.get(`https://www.anapioficeandfire.com/api/characters?page=${index}&pageSize=50`)
//         .done((charList) => {
//             fullCharList = [...fullCharList, ...charList]
//         })
//         .done(() => {
//                 if(fullCharList.length >= 2130 && flag == false){               
//                     flag = true
//                     console.log(fullCharList);
//                     fullCharList.forEach(character => {                   
//                         let name = character.name
//                         if(character.allegiances.length > 0){
//                             character.allegiances.forEach((houseurl)=>{
//                                 console.log($.get(houseurl))                            
//                             })
//                         }
//                         let entire = document.querySelector('#entire')
//                         let p = document.createElement('p')
//                         p.innerHTML = `${name}`
//                         entire.append(p)
//                     })
                    
//                 }
                
//             })
        


//     }
    
// })


// $(() => {
//     let call1 = fetch(`https://www.anapioficeandfire.com/api/characters?page=${index}&pageSize=50`)
    

// })


$(() => {

var fullCharList = [];
let flag = false

let fetchArr = []
let entire = document.querySelector('#entire')

for(let x = 0; x < 45; x ++){
    url = fetch("https://www.anapioficeandfire.com/api/characters?page=" + x + "&pageSize=50")
    fetchArr.push(url);
    
}
let promise = Promise.all(fetchArr);
    promise.then((resultsArr)=>{
        return Promise.all(resultsArr.map(char =>{
            return char.json()
        }))
})
.then((dataArr) =>{
    let charList = [];
    dataArr.forEach((char)=>{
        charList = [...charList, ...char]
    })
    console.log(charList)


charList.forEach(character => {
    let charDiv = document.createElement('div')
    charDiv.className = 'card container col-2 justify-content-center align-items-center btn'
    charDiv.addEventListener('click', ()=>{
        let $modalBody = $('.modal-body')
        let $modalTitle = $('.modal-title')
        $modalBody.html('')
        $modalTitle.html(character.gender)
        console.log(character.gender);
        $modalBody.html(`<br>${$modalBody.html()}</br>${character.name}`)
        $('#exampleModalCenter').modal('show');
        alert(character.gender, character.culture)
    })
    
    if(character.name != ""){
    charDiv.innerHTML = character.name
    entire.append(charDiv)
    }
    if(character.name == ""){
    charDiv.innerHTML = character.aliases
    entire.append(charDiv)
    }
    if(character.allegiances.length > 0){
        character.allegiances.forEach((url)=>{
            $.get(url)
            .done(house => {
                let housesP = document.createElement('div')
                housesP.innerHTML = house.name
                charDiv.append(housesP)
                
            })
            
        })
        
    }

})

})



})
