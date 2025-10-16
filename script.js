
import { catsData } from '/data.js'
const emotionRadios = document.getElementById("emotion-radios");
const getImage = document.getElementById("get-image-btn");
const getGifs = document.getElementById("gifs-only-option")
const memeModal = document.getElementById("meme-modal");
const memeModalInner = document.getElementById("meme-modal-inner")
const memeModalCloseBtn = document.getElementById('meme-modal-close-btn')




emotionRadios.addEventListener('change', highlightChecked)

memeModalCloseBtn.addEventListener('click', closeModal)

getImage.addEventListener('click', renderCat)


function highlightChecked(e) {
  
    let radioArray = document.getElementsByClassName("radio")
    for(let radio of radioArray) {
        radio.classList.remove("highlight")
    } 
    document.getElementById(e.target.id).parentElement.classList.add("highlight");

}


function closeModal() {
    memeModal.style.display = 'none'
}



function renderCat() {
    console.log("RenderCat Button")
    const catObject = getSingleCatObject()
    memeModalInner.innerHTML = `<img
                                class = "cat-img"
                                src = "./images/${catObject.image}"
                                alt = "${catObject.alt}"
                                >` 
    memeModal.style.display = "flex"

}

function getSingleCatObject() {
    const catsArray = getMatchingCatsArray()
    if(catsArray.length === 1) {
        return catsArray[0]
    } else {
        return catsArray[Math.floor(Math.random() * catsArray.length)]
    }
}


function getMatchingCatsArray () {
    if(document.querySelector("input[type='radio']:checked")){
        const selectBtn = document.querySelector("input[type='radio']:checked")
        const gif = getGifs.checked

        const getMatchingEmotionArray = catsData.filter((cats)=>{
        
            if(gif) {
                return cats.emotionTags.includes(selectBtn.value) && cats.isGif
            } 
            else {
                return cats.emotionTags.includes(selectBtn.value)
             }
        })
        return getMatchingEmotionArray
    }
    
}

function getEmotionArray(cats) {
    let emotionArray = []
    for(let cat of cats){
        for(let emotion of cat.emotionTags) {
            if(!emotionArray.includes(emotion)) {
                emotionArray.push(emotion);
            }
        }   
    }
    return emotionArray
};





function renderEmotionArray(cats){
    let htmlStr = ""
    const emotions =  getEmotionArray(cats)
    for (let emotion of emotions) {
        htmlStr += `<div class="radio">
                        <label for="${emotion}">${emotion}</label>
                        <input type="radio"
                                name="emotion"
                                value ="${emotion}"
                                id="${emotion}"
                                />

                    </div>`
    }

    emotionRadios.innerHTML = htmlStr

}

renderEmotionArray(catsData)






























// emotionRadios.addEventListener('change', (e)=> {
    
    
// })

