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

    <form style="float:right;width:18rem">

    <strong>Intresting!fill out the form to order your meal...</strong>
    <div class="form-group">
    <div class="form-group">
      <label for=" Name">Name:</label>
      <input type="text" class="form-control" >
    </div>
    <div class="form-group">
    <div class="form-group">
      <label for="phonenumber">Phone Number:</label>
      <input type="number" class="form-control" id="exampleInputPassword1">
    </div>
      <label for="email">Email:</label>
      <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
      <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
    </div>
    <label for="number of guest">Number of Persons:</label>
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
    <h3 class="card-title">Hungry Yet?</h5>
    <p>See something you like? Have an idea for an amazing meal of your own, or even something chill and casual?</p>
    <a href="#" class="btn btn-success" href="/api/meals">Browse a meal</a>     <a href="#" class="btn btn-success">Create a meal</a>
  </div>
</div>
`;
    console.log(req.param.id);
    const id = req.param.id
    fetch(`/api/meals/${id}`)
        .then(res => res.json())
        .then(meal => {
            console.log(meal)
            const root = document.getElementById('root');
            console.log(root)
            const ul = document.createElement("ul");
            ul.innerHTML = `<div><img class="meal-image"
            src="https://source.unsplash.com/400x300?${meal[0].title}"
            alt="${meal[0].title}"</div> 
   <li><strong>Title</strong>:${meal[0].title}</li>
   <li><strong>Description</strong>:${meal[0].description}</li>
   <li><strong>Location</strong>:${meal[0].location}</li>
   <li><strong>Date</strong>:${meal[0].when}</li>
   <li><strong>Max_Reservations:${meal[0].max_reservations}</li>
   <li><strong>Price</strong>:${meal[0].price}</li> `
          root.appendChild(ul);
          ;

        })

        function rednerReviews (req) {
          const id = req.param.id;
          //const reviewsUl = document.querySelector ('#reviews-display-ul');
          // Fetch and render reviews
          fetch (`/api/reviews/${id}`).then (resp => resp.json ()).then (reviews => {
            reviews.forEach (review => {
              const reviews = document.getElementById('reviews');
              const ul = document.createElement("ul");
            ul.innerHTML = `<div>
                                            <h2 >${review.title}</h2>
                                            <p>${review.description}</p>
                                            <p>Stars: ${review.stars}</p>
                                        </div>
                                    </div>`;
              ul.appendChild (reviews);
            });
          });
        }
  
  rednerReviews();
}


export default mealsId;