
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };

let neighborhoodId = 0

class Neighborhood {
  constructor(name) {
    this.id = ++neighborhoodId;
    this.name = name;

    store.neighborhoods.push(this)
  }

  deliveries() {
    return store.deliveries.filter(delivery => delivery.neighborhoodId === this.id)
  }

  customers() {
    return store.customers.filter(customer => customer.neighborhoodId === this.id)
  }

  meals() {

    function onlyUnique(value, index, self) {
      return self.indexOf(value) === index;
    }

    let arrayOfMeals = []
    this.deliveries().forEach(delivery => arrayOfMeals.push(delivery.meal()))
    return arrayOfMeals.filter(onlyUnique)
  }
}


let customerId = 0;

class Customer {
  constructor(name, neighborhoodId) {
    this.id = ++customerId;
    this.name = name;
    this.neighborhoodId = neighborhoodId

    store.customers.push(this)
  }

  deliveries() {
    return store.deliveries.filter(delivery => delivery.customerId === this.id)
  }

  meals() {
    let arrayOfMeals = []
    this.deliveries().forEach(delivery => arrayOfMeals.push(delivery.meal()))
    return arrayOfMeals
  }

  reducePrice(acc, meal) {
    return acc + meal.price
  }

  totalSpent() {

    function reducePrice(acc, meal) {
      return acc + meal.price
    }

    return this.meals().reduce(reducePrice, 0)
  }
}

let mealId = 0;

class Meal {
  constructor(title, price) {
    this.id = ++mealId;
    this.title = title;
    this.price = price

    store.meals.push(this)
  }

  deliveries() {
    return store.deliveries.filter(delivery => delivery.mealId === this.id)
  }

  customers() {

    function onlyUnique(value, index, self) {
      return self.indexOf(value) === index;
    }

    let arrayOfCustomers = []
    this.deliveries().forEach(delivery => arrayOfCustomers.push(delivery.customer()))
    return arrayOfCustomers.filter(onlyUnique)
  }

  static byPrice() {
    return store.meals.sort(function (a, b) { return b.price - a.price })
  }
}

let deliveryId = 0;

class Delivery {
  constructor(mealId, neighborhoodId, customerId) {
    this.id = ++deliveryId;
    this.mealId = mealId;
    this.neighborhoodId = neighborhoodId;
    this.customerId = customerId;

    store.deliveries.push(this)
  }

  meal() {
    return store.meals.find(meal => meal.id === this.mealId)
  }

  customer() {
    return store.customers.find(customer => customer.id === this.customerId)
  }

  neighborhood() {
    return store.neighborhoods.find(neighborhood => neighborhood.id === this.neighborhoodId)
  }
}
