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
    <strong>Intresting!Fill out the form to reserve your meal...</strong>
    <div class="form-group">
    <div class="form-group">
      <label for=" Name">Name:*</label>
      <input type="text" class="form-control" >
    </div>
    <div class="form-group">
    <div class="form-group">
      <label for="phonenumber">Phone Number:*</label>
      <input type="number" class="form-control" id="exampleInputPassword1">
    </div>
      <label for="email">Email:*</label>
      <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
      <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
    </div>
    <label for="number of guest">Number of Persons:*</label>
      <input type="number" class="form-control" id="exampleInputPassword1">
    </div>
    
    <button type="submit" class="btn btn-primary">Book Now</button>
  </form>
    </div>
  </div>
</div>
<div class="card text-center" style="background-image: url('https://images.squarespace-cdn.com/content/5cedb390538cc40001d27d0a/1560889677374-4D6Z0XU4BF501WIXRMUO/italianMealIngredients_webDefaultSize.png?content-type=image%2Fpng'); background-size: cover;background-repeat: no-repeat;
  height:300px; width:100%;background-position: center;object-fit: cover; 
  position: relative;">
  <div class="card-body">
    <h3>Hungry Yet?</h3>
    <p>See something you like? Have an idea for an amazing meal of your own, or even something chill and casual?</p>
    <a href="#" class="btn btn-success" href="/api/meals">Browse a meal</a>     <a href="#" class="btn btn-success">Create a meal</a>
  </div>
</div>
`;
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
      ul.innerHTML = `<div class="review">
        <div class="card-body" id="r1">
             <h4> &#8212; Reviews &#8212; </h4>
            <h4 class="card-title">${review[0].title}</h4>
            <p class="card-text"> ${review[0].stars}</p>
            <p class="card-text">${review[0].description}</p>
            <p class="card-text"> ${review[0].created_date}</p>
        </div>
    </div>`;
    });
}

export default mealsId;
//<img src="/public/images/stars-${review[0].stars}.png" alt="${{review[0].stars} stars" />
