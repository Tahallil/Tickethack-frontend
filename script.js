fetch('http://localhost:3000/cities')
    .then(response => response.json())
    .then(data => {
        if (data.cities) {
            for (let i = 0; i < data.cities.length; i++) {
                document.querySelector('#cityList').innerHTML += `
                <div class="cityContainer">
                    <p class="departure">${data.cities[i].departure}</p>
                    <p class="arrival">${data.cities[i].arrival}</p>
                    <p class="date">${data.cities[i].date}</p>
                    <p class="price">${data.cities[i].price} €</p>
                    <button class="deleteCity" id="${data.cities[i]._id}">Delete</button>
                </div>`;
            }
            delete1();
        }
    });
 
function delete1() {
    const deleteButtons = document.querySelectorAll('.deleteCity');
    for (let i = 0; i < deleteButtons.length; i++) {
        deleteButtons[i].addEventListener('click', function () {
            const cityId = this.id;
            fetch(`http://localhost:3000/cities/${cityId}`, {
                method: 'DELETE'
            })
            .then(response => response.json())
            .then(data => {
                if (data.result) {
                    this.parentNode.remove();
                } else {
                    alert(data.error);
                }
            });
        });
    }
}
 
 
const addButton = document.querySelector('#btn-search');
addButton.addEventListener('click', function () {
    const departureInput = document.querySelector('#departure').value;
    const arrivalInput = document.querySelector('#arrival').value;
    const dateInput = document.querySelector('#calendar').value;
 
    if (departureInput && arrivalInput && dateInput) {
        fetch('http://localhost:3000/search', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                departure: departureInput,
                arrival: arrivalInput,
                date: dateInput
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.result) {
                document.querySelector('#cityList').innerHTML = '';
                
                for (let i = 0; i < data.cities.length; i++) {
                    document.querySelector('#cityList').innerHTML += `
                    <div class="cityContainer">
                        <p class="departure">${data.cities[i].departure}</p>
                        <p class="arrival">${data.cities[i].arrival}</p>
                        <p class="date">${data.cities[i].date}</p>
                        <p class="price">${data.cities[i].price} €</p>
                        <button class="deleteCity" id="${data.cities[i]._id}">Delete</button>
                    </div>`;
                }
                delete1();
            } else {
                alert(data.error);
            }
        });
    } else {
        alert('Please fill in all fields.');
    }
});