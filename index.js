// global datastore

let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };
let neighborhoodIds = 0;
let mealIds = 0;
let customerIds = 0;
let deliveryIds = 0;

// class Neighborhood
class Neighborhood {
    // initialized with a name
    constructor(name) {

        this.name = name;
        // for every new name id associate it with neighborhoodId and
        // increment the value of neighborhoodId
        this.id = ++neighborhoodIds;
        store.neighborhoods.push(this);
    }

    //  here we will take all the customers in the neighborhood
    customers(){
        return store.customers.filter(customer => customer.neighborhoodId === this.id);
    }

    meals(){
        return store.meals.filter
    }
}


// class Customer
class Customer {

}

// class Meal
class Meal {

}

// class Delivery
class Delivery {

}

