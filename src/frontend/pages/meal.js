function mealsId(req, router) {

    document.body.innerHTML = `<div style="background-image: url('https://2cdp8z2vujk1txuxz41abqi1-wpengine.netdna-ssl.com/wp-content/uploads/2016/11/Fotolia_114031319_M-477x477.png'); background-size: cover;background-repeat: no-repeat;
    height:450px; width:100%;background-position: center;object-fit: cover; 
    position: relative;"></div>
     <div class="container" style=margin-top:20px>
  <div class="row">
    <div class="col-md">
    <div class="card" style="width: 20rem;">
    <div class="card-body" style="float:left">
    <div id="root"></div>
    </div>
  </div>
    </div>
    <div class="col-sm">
    <form>
    <h3 style=text-align:center;color:red>BOOK NOW</h3>
    <div class="form-group">
    <label for="dish Name">Dish Name</label>
      <input type="text" class="form-control" id="exampleInputPassword1">
    </div>
    <div class="form-group">
      <label for="number of guest">Number of Persons</label>
      <input type="number" class="form-control" id="exampleInputPassword1">
    </div>
    <div class="form-group">
      <label for=" Name">First Name</label>
      <input type="text" class="form-control" id="exampleInputPassword1">
    </div>
    <div class="form-group">
      <label for="exampleInputEmail1">Email</label>
      <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
      <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
    </div>
    <div class="form-group">
      <label for="phonenumber">Phone NUmber</label>
      <input type="number" class="form-control" id="exampleInputPassword1">
    </div>
    <button type="submit" class="btn btn-primary">Submit</button>
  </form>
    </div>
  </div>
</div>`;
    console.log(req.param.id);
    const id = req.param.id
    fetch(`/api/meals/meals/${id}`)
        .then(res => res.json())
        .then(meal => {
            console.log(meal)
            const root = document.getElementById('root');
            console.log(root)
            const ul = document.createElement("ul");
            ul.innerHTML = `<div><img class="meal-image"
            src="https://source.unsplash.com/250x250?${meal[0].title}"
            alt="${meal[0].title}"</div> 
   <li><strong>Title</strong>:${meal[0].title}</li>
   <li><strong>Description</strong>:${meal[0].description}</li>
   <li><strong>Location</strong>:${meal[0].location}</li>
   <li><strong>Date</strong>:${meal[0].when}</li>
   <li><strong>Max_Reservations:${meal[0].max_reservations}</li>
   <li><strong>Price</strong>:${meal[0].price}</li> `
            root.appendChild(ul);

        })

}

export default mealsId;