function homeRouter(req, router) {
  document.body.innerHTML = ` 
    <nav class="navbar navbar-light navbar-expand-sm d-flex justify-content-between">
        <a class="d-block text-muted"><img src="data:image/png;base64,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" alt="logo" id="logo"</a>

        <div class="collapse navbar-collapse ml-sm-auto" id="navbarSupportedContent"> 
          <ul class="navbar-nav ml-auto">
            <li class="nav-item "><a class="nav-link" href="#root">Find a meal</a></li>
            <li class="nav-item"><a class="nav-link" href="/add-meal">Host a meal </a></li>
          </ul>
        </div>
    </nav>

  <div class="card text-center" id="center">
  <div class="card-body">
    <h1 class="card-title">LET'S EAT</h1>
    <p>Discover home cooking in 150+ countries</p>
  </div>
</div>
  
  <section id="featured-meals">
    <div class="container text-center pb-5">
      <h2 class="py-5">Featured meals</h2>
      <div id="root"></div>
    </div>
  </section>
  
  <div class="card text-center" id="footer">
  <div class="card-body">
    <h3 class="card-title">Hungry Yet?</h5>
    <p>See something you like? Have an idea for an amazing meal of your own, or even something chill and casual?</p>
    <a  class="btn btn-success" href="#featured-meals">Browse a meal</a>     <a href="#" class="btn btn-success">Create a meal</a>
  </div>
</div>`;

  fetch("/api/meals")
    .then(res => res.json())
    .then(meals => {
      console.log(meals);
      meals.map(meal => {
        const root = document.getElementById("root");
        const ul = document.createElement("ul");
        root.appendChild(ul);
        ul.innerHTML = ` <img class="meal-image" 
              src="https://source.unsplash.com/300x300?${meal.title}"  alt="${meal.description}"</div>         
                   <p><strong>${meal.title}</strong></p>
                   <p><i class="fas fa-map-marker-alt"></i> ${meal.location}</p>
                   <p><strong>price:</strong>${meal.price}Dkk</p>
                   <p><i class="far fa-calendar-alt"></i>${new Date(meal.when).toLocaleString()}</p>
                   <a class="btn btn-info mx-3" href="/meals/${meal.id}">Reserve</a> `;
      });
  });
}
export default homeRouter;


