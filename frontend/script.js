
const goBtn = document.getElementById("add-coffee");

// delcare all our inputs
const priceInput = document.getElementById('price-input');
const nameInput = document.getElementById('name-input');
const imageInput = document.getElementById('image-input');

// setting up our coffee data 
// const latte = {
//     name: "Long Black",
//     price: 4.00,
//     image_url: "https://www.caffesociety.co.uk/assets/recipe-images/latte-small.jpg"
// };

goBtn.onclick = () => {
    console.log("clicked");
    $.ajax({
        url: `http://localhost:3005/addCoffee`,
        // use the POST type to create data somewhere 
        type: 'POST',
        // we can send objects through to the backend using the data argument
        data: {
            name: nameInput.value,
            price: priceInput.value,
            image_url: imageInput.value
        },
        success: () => {
            console.log("A new coffee was added.");
        },
        error: () => {
            console.log("Error: cannot read the backend");
        }
    })
}

let renderCoffees = (data) => {
    data.forEach((item) => {
        result.innerHTML += `
        <div class="coffee-box">
        <img src="${item.image_url}" alt="${item.name}"> <br>
        <h1>Coffee: ${item.name}</h1> <br>
        <h2>Price: $${item.price}</h2> <br>
        </div>
        `
    })
}

$.ajax({
    type: 'GET',
    url: "http://localhost:3005/allCoffee",
    // data is the coffee items you can view on the url above
    success: (data) => {
        console.log(data);
        renderCoffees(data);
    },
    error: (error) => {
        console.log(error);
    }
})