// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };

let neighborhoodId = 0
let mealId = 0
let customerId = 0
let deliveryId = 0

class Neighborhood {
  constructor(name) {
    this.id = ++ neighborhoodId
    this.name = name
    store.neighborhoods.push(this)
  }

// deliveries() - returns a list of all deliveries placed in a neighborhood
  deliveries() {
    return store.deliveries.filter(delivery => {
      return delivery.neighborhoodId === this.id
    })
  }

// customers() - returns all of the customers that live in a particular neighborhood
  customers() {
    return store.customers.filter(customer => {
      return customer.neighborhoodId === this.id
    })
  }

  // meals() - returns a unique list of meals that have been ordered in a particular neighborhood (you might want to do this one last
  meals() {
    const allMeals = this.customers().map(customer => customer.meals());
    const merged = [].concat.apply([], allMeals);
    return [...new Set(merged)];
  }

}

class Meal {
  constructor(title, price) {
    this.id = ++ mealId
    this.title = title
    this.price = price
    store.meals.push(this)
  }

// deliveries() - returns all of the deliveries associated with a particular meal
  deliveries() {
    return store.deliveries.filter(delivery => delivery.mealId === this.id)
  }

  customers() {
    return this.deliveries().map(delivery => delivery.customer());
  };

// byPrice() - A class method that orders all meal instances by their price in descending order. Use the static keyword to write a class method.
  static byPrice() {
      return store.meals.sort((a, b) => b.price - a.price);
  };
}

class Customer {
  constructor(name, neighborhoodId) {
    this.id = ++ customerId
    this.name = name
    this.neighborhoodId = neighborhoodId
    store.customers.push(this)
  }

  // deliveries() - returns all deliveries a customer has placed
  deliveries() {
    return store.deliveries.filter(delivery => {
      return delivery.customerId === this.id
    })
  }

  // meals() - returns all meals that a customer has ordered
  meals() {
       return this.deliveries().map(delivery => delivery.meal());
     }

  totalSpent() {
      return this.meals().reduce((total, meal) => (total += meal.price), 0);
    }
}

class Delivery {
  constructor(mealId , neighborhoodId, customerId) {
    this.id = ++ deliveryId
    this.mealId = mealId
    this.neighborhoodId = neighborhoodId
    this.customerId = customerId
    store.deliveries.push(this)
  }

  // meal() - returns the meal associated with a particular delivery
  meal() {
    return store.meals.find(meal => meal.id === this.mealId)
  }

// customer() - returns the customer associated with a particular delivery
  customer() {
    return store.customers.find(customer => customer.id === this.customerId)
  }

  // neighborhood() - returns the neighborhood associated with a particular delivery
  neighborhood() {
    return store.neighborhoods.find(neighborhood => neighborhood.id === this.neighborhoodId)
  }
}
