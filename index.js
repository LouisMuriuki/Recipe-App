
 document.getElementById("search").addEventListener("click",()=>{
    const input=document.getElementById("input")
    input.style.display="block"
    input.style.border="solid"
 })
 
 let myFavMeals=[]
 function getRandomMeal(){
  fetch('https://api.spoonacular.com/recipes/random?number=10&apiKey=b354ffb530c5444da1eec4b02a3146be').then((data)=>{
      console.log(data)
      return data.json()
  }).then((completedata)=>{
    console.log(completedata.recipes)
      let data1=""
      completedata.recipes.forEach((recipe) => {
        const {
          id,
          title,
          readyInMinutes,
          servings,
          image,
          dishTypes,
          instructions,
        } = recipe;
        
          data1+=`  
          <div class="meal-header">
              <img src=${recipe.image} alt=${recipe.title} >
          </div>
          <div class="meal-body">
              <h6>${recipe.title}</h6>
              <p class="show">see recipes</p>
              <button class="fav-btn">
                  <i class="fa fa-heart"></i>
              </button>
          </div>
          <div class="holder">
          <div class="meal-desc">
          <p>ready in : ${recipe.readyInMinutes} minutes</p>
          <center><h6>instructions</h6></center>
          <p>${recipe.instructions}</p>
          </div>
          </div>`      
    })
    const meal=document.querySelector(".meal")
    meal.innerHTML=data1
    let holders=document.querySelectorAll(".holder")
    const shows=document.querySelectorAll(".show")
    holders.forEach((holder,i)=>{
shows.forEach((show,i)=>{
  showcounter=0
  show.addEventListener("click",()=>{
    holder[i].style.display="block"
    showcounter++
    if(showcounter== 2) {
    holder[i].style.display="none"
    }
  })
})
       
      })
    const favBtns=meal.querySelectorAll(".fav-btn i")
    const images = document.querySelectorAll('.meal-header > img')
    favBtns.forEach((favBtn,i)=>{
      favBtn.addEventListener("click", ()=>{
        favBtn.classList.toggle("active")
        console.log(images[i].src, images[i].alt)     
        myFavMeals.push({src: images[i].src, alt: images[i].alt})
        localStorage.setItem("myFavMeals", JSON.stringify(myFavMeals))
        showMeal()
    })
    })
          
  }).catch((err)=>{
      console.log(err)
  })
}
  getRandomMeal();


function getMealBySearch(){
  document.querySelector('#input').addEventListener('keypress', function (e) {
    if (e.key === 'Enter'||e.keyCode === 13) { 
      const term=document.getElementById("input").value
      fetch(`https://api.spoonacular.com/recipes/complexSearch?query=${term}&number=10&apiKey=b354ffb530c5444da1eec4b02a3146be`).then((data)=>{
        console.log(data) 
      return data.json()
        
    }).then((completedata)=>{
      console.log(completedata)
      console.log(completedata.results)
    let data3=""
    completedata.results.forEach((recipe) => {
      const {
        id,
        title,
        readyInMinutes,
        servings,
        image,
        dishTypes,
        instructions,
      } = recipe;
      console.log(recipe)
        data3+=`
        <div class="meal-header">
            <img src=${recipe.image} alt=${recipe.title}>
        </div>
        <div class="meal-body">
            <h5>${recipe.title}</h5>
            <p class="show">see recipes</p>
            <button class="fav-btn">
                <i class="fa fa-heart"></i>
            </button>
        </div>
        <div class="holder">
          <div class="meal-desc">
          <p>ready in : ${recipe.readyInMinutes} minutes</p>
          <center><h6>Instructions</h6></center>
          <p>${recipe.instructions} </p>
          </div>
          </div>`       
       })
       const meal=document.querySelector(".meal")
       meal.innerHTML=data3
       const holder=document.querySelector(".holder")
       const show=document.querySelectorAll(".show")
       show.forEach((shows)=>{
           showcounter=0
           shows.addEventListener("click",()=>{
             holder.style.display="block"
             showcounter++
             if(showcounter== 2) {
             holder.style.display="none"
             }
           })
         })
       const favBtns=meal.querySelectorAll(".fav-btn i")
       const images = document.querySelectorAll('.meal-header > img')
       favBtns.forEach((favBtn,i)=>{
         favBtn.addEventListener("click", ()=>{
           favBtn.classList.toggle("active")
           console.log(images[i].src, images[i].alt)     
           myFavMeals.push({src: images[i].src, alt: images[i].alt})
           localStorage.setItem("myFavMeals", JSON.stringify(myFavMeals))
           showMeal()
        })     
    })   
    }).catch((err)=>{
      console.log(err)
  })
    }
});
  
     }
     getMealBySearch()
     
    
        function showMeal(){
          let favmeal= JSON.parse(localStorage.getItem("myFavMeals"))
          let meallist="" 
          favmeal.forEach(favmeal => {
            meallist=`
                 <li>
                 <img src=${favmeal.src} alt=${favmeal.alt}>
                 <span>${favmeal.alt}</span>
                 <i class="fa fa-window-close" id="clear"</i>
                 </li>  
             ` 
            })
            document.querySelector(".fav-meals").innerHTML+=meallist
 
        }
        const clears=document.querySelectorAll("i#clear.fa.fa-window-close")
          clears.forEach(clear=>{
            clear.addEventListener("click",()=>{
              let favmeal= JSON.parse(localStorage.getItem("myFavMeals"))
              favmeal.forEach((favmeals,i)=>{
                favmeal.removeItem(favmeals)
                showMeal()
               })
            })
          
            
          })
       
            
          
      
        
          
    
    



