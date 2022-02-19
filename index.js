
 document.getElementById("search").addEventListener("click",()=>{
    const input=document.getElementById("input")
    input.style.display="block"
    input.style.border="solid"
 })
 document.getElementById("search").addEventListener("dblclick",()=>{
  const input=document.getElementById("input")
  input.style.border="none"
  input.style.display="none"
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
    holders.forEach((holder)=>{
shows.forEach((show)=>{
  show.addEventListener("click",()=>{
    holder.style.display==="block"? holder.style.display="none" : holder.style.display="block"
    
  })
})
})
    const favBtns=meal.querySelectorAll(".fav-btn i")
    const images = document.querySelectorAll('.meal-header > img')
    favBtns.forEach((favBtn,i)=>{
      favBtn.addEventListener("click", ()=>{
        favBtn.classList.toggle("active") 
        let meallist=""
          if(favBtn.classList.contains("active")){   
        myFavMeals.push({src: images[i].src, alt: images[i].alt})
        && localStorage.setItem("myFavMeals", JSON.stringify(myFavMeals))
        const favmeals= JSON.parse(localStorage.getItem("myFavMeals"))
           meallist=`
          <li class="favMeallist">
          <img src=${favmeals[i].src} alt=${favmeals[i].alt}>
          <span>${favmeals[i].alt}</span>
          </li>  
      `  // <i class="fa fa-window-close" onClick="clearfav()" id="clear"</i>
      document.querySelector(".fav-meals").innerHTML+=meallist
    }  else{
      myFavMeals.pop()  && localStorage.setItem("myFavMeals", JSON.stringify(myFavMeals))
      const favmeals= JSON.parse(localStorage.getItem("myFavMeals"))
      document.querySelector(".fav-meals").innerHTML=""
      meallist=`
      <li class="favMeallist">
      <img src=${favmeals[i].src} alt=${favmeals[i].alt}>
      <span>${favmeals[i].alt}</span>
      
      </li>      
  `
  // <i class="fa fa-window-close" onClick="clearfav()" id="clear"</i>
  document.querySelector(".fav-meals").innerHTML+=meallist
    }
          
               
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
      return data.json()}).then(completedata=>{
      console.log(completedata)
      console.log(completedata.results)
    let data3=""
    completedata.results.forEach(recipe => {
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
       let holders=document.querySelectorAll(".holder")
       const shows=document.querySelectorAll(".show")
       holders.forEach(holder=>{
        shows.forEach(show=>{
          show.addEventListener("click",()=>{
            holder.style.display==="block"? holder.style.display="none" : holder.style.display="block"
          })
        })
        })
        
        const favBtns=meal.querySelectorAll(".fav-btn i")
        const images = document.querySelectorAll('.meal-header > img')
        favBtns.forEach((favBtn,i)=>{
          favBtn.addEventListener("click", ()=>{
            favBtn.classList.toggle("active") 
            let meallist=""
              if(favBtn.classList.contains("active")){   
            myFavMeals.push({src: images[i].src, alt: images[i].alt})
            && localStorage.setItem("myFavMeals", JSON.stringify(myFavMeals))
            const favmeals= JSON.parse(localStorage.getItem("myFavMeals"))
               meallist=`
              <li class="favMeallist">
              <img src=${favmeals[i].src} alt=${favmeals[i].alt}>
              <span>${favmeals[i].alt}</span>
              </li>  
          `  // <i class="fa fa-window-close" onClick="clearfav()" id="clear"</i>
          document.querySelector(".fav-meals").innerHTML+=meallist
        }  else{
          myFavMeals.pop()  && localStorage.setItem("myFavMeals", JSON.stringify(myFavMeals))
          const favmeals= JSON.parse(localStorage.getItem("myFavMeals"))
          document.querySelector(".fav-meals").innerHTML=""
          meallist=`
          <li class="favMeallist">
          <img src=${favmeals[i].src} alt=${favmeals[i].alt}>
          <span>${favmeals[i].alt}</span>
          
          </li>      
      `
      // <i class="fa fa-window-close" onClick="clearfav()" id="clear"</i>
      document.querySelector(".fav-meals").innerHTML+=meallist
        }
              
                   
        })  
        })
    }).catch((err)=>{
      console.log(err)
  })
    }
})
  
     }
     getMealBySearch()
     
    
        // function showMeal(){
        //   let favmeals= JSON.parse(localStorage.getItem("myFavMeals"))

        //   if (favmeals===0) {
        //     document.querySelector(".fav-meals").innerHTML=""
        //   }
        //   else{
        //     document.querySelector(".fav-meals").innerHTML=""
        //     let meallist="" 
        //     meallist=`
        //           <li class="favMeallist">
        //           <img src=${favmeals[i].src} alt=${favmeals[i].alt}>
        //           <span>${favmeals[i].alt}</span>
        //           <i class="fa fa-window-close" onClick="clearfav()" id="clear"</i>
        //           </li>  
        //       ` 
 
        //      document.querySelector(".fav-meals").innerHTML=meallist
  
        //   }
         
        // }
        
        //     function clearfav(){
        //     const clears=document.querySelectorAll("i#clear.fa.fa-window-close")
        //     clears.forEach((clear,index)=>{
        //     clear.addEventListener("click",()=>{
        //     let favmeals=JSON.parse(localStorage.getItem("myFavMeals"))
        //     favmeals.splice(favmeals[index],1)   
        //     myFavMeals=favmeals
        //     localStorage.setItem("myFavMeals", JSON.stringify(myFavMeals))
 
        //     showMeal()
        //   })
        // })
          
        //   }
          
       
            
          
      
        
          
    
    



