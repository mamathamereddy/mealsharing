function mealsId(req, router) {
  document.body.innerHTML = `<div style="background-image: url('https://2cdp8z2vujk1txuxz41abqi1-wpengine.netdna-ssl.com/wp-content/uploads/2016/11/Fotolia_114031319_M-477x477.png'); background-size: cover;background-repeat: no-repeat;
    height:450px; width:100%;background-position: center;object-fit: cover; 
    position: relative;"></div>
     <div class="container">
  <div class="row">
    <div class="col-sm">
    <div class="card" style="border: none;width:15rem;padding-right:0;
    padding-left:0;
    margin-right:0;
    margin-left:0">
    <div class="card-body" style=>
    <div id="root"></div>
    <div id="reviews"></div>
    </div>
  </div>
    </div>
    
    <div class="col-sm">
    <form>
    <div id="form"></div>
    <div id="reservation"></div>
   </form>  
   </div>

<div class="card text-center" style="background-image: url('https://images.squarespace-cdn.com/content/5cedb390538cc40001d27d0a/1560889677374-4D6Z0XU4BF501WIXRMUO/italianMealIngredients_webDefaultSize.png?content-type=image%2Fpng'); background-size: cover;background-repeat: no-repeat;
  height:300px; width:100%;background-position: center;object-fit: cover; 
  position: relative;">
  <div class="card-body">
    <h3>Hungry Yet?</h3>
    <p>See something you like? Have an idea for an amazing meal of your own, or even something chill and casual?</p>
    <a href="#" class="btn btn-success" href="/api/meals">Browse a meal</a>     <a href="#" class="btn btn-success">Create a meal</a>
  </div>
</div>`;
  console.log(req.param.id);
  const id = req.param.id;
  fetch(`/api/meals/${id}`)
    .then(res => res.json())
    .then(meal => {
      console.log(meal);
      const root = document.getElementById("root");
      console.log(root);
      const ul = document.createElement("ul");
      ul.innerHTML = `<div><img class="meal-image"
          src="https://source.unsplash.com/400x300?${meal[0].title}"
          alt="${meal[0].title}"</div> 
               <li><strong>Title</strong>:${meal[0].title}</li>
               <li><strong>Description</strong>:${meal[0].description}</li>
               <li><strong>Location</strong>:${meal[0].location}</li>
               <li><strong>Date</strong>:${meal[0].when}</li>
               <li><strong>Max_Reservations:${meal[0].max_reservations}</li>
               <li><strong>Price</strong>:${meal[0].price}</li> `;
      root.appendChild(ul);
    });
  rednerReviews(req);
  rednerReservations(req);
}

function rednerReviews(req) {
  console.log(req.param.id);
  const id = req.param.id;
  fetch(`/api/reviews/${id}`)
    .then(res => res.json())
    .then(review => {
      console.log(review);
      const mealreview = document.getElementById("reviews");
      console.log(root);
      const ul = document.createElement("ul");
      mealreview.appendChild(ul);

      //	const timeToLocalString = new Date(meal.when).toLocaleTimeString();
      // For the review ratings & filling the stars
      let starTotal = 5;
      let ratings;
      let sum = 0;
      let starPercentage;
      let starPercentageRounded;
      if (review.length > 1) {
        for (let i = 0; i < review.length; i++) {
          sum += review[i].numberOfStars;
        }
        ratings = sum / review.length;
        starPercentage = (ratings / starTotal) * 21.25;
        starPercentageRounded = `${Math.round(starPercentage)}%`;
      } else {
        ratings = review[0].stars;
        starPercentage = (ratings / starTotal) * 21.25;
        starPercentageRounded = `${Math.round(starPercentage)}%`;
      }

      ul.innerHTML = `<div class="review">
        <div class="card-body" id="r1">
             <h4> &#8212; Reviews &#8212; </h4>
            <h4 class="card-title">${review[0].title}</h4>
            <div class="stars-outer">
            <div class="stars-inner" style="width: ${starPercentageRounded}"></div>
            
            <p class="card-text">${review[0].description}</p>

            <p class="card-text"> ${review[0].created_date}</p>
        </div>
    </div>`;
    });
}

function rednerReservations(req) {
  console.log(req.param.id);
  const id = req.param.id;
  fetch(`/api/meals?availableReservations=true`)
    .then(res => res.json())
    .then(data => {
      console.log(data);
    });
}

export default mealsId;

