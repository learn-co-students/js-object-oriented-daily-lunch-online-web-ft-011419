// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };
let neighborhoodId = 0
let customerId = 0
let mealId = 0
let deliveryId = 0

class Neighborhood {
  constructor(name){
    this.name = name
    this.id = ++neighborhoodId
    store.neighborhoods.push(this)
  }
  deliveries(){
    return store.deliveries.filter(delivery => {
      return delivery.neighborhoodId === this.id
    })
  }
  customers(){
    return store.customers.filter(customers => customers.neighborhoodId === this.id)
  }
  meals(){
    function onlyUnique(value, index, self){
      return self.indexOf(value) === index;
    }
    let mealsArray = []
    this.deliveries().forEach(delivery => mealsArray.push(delivery.meal()))
    return mealsArray.filter(onlyUnique)
  }
}

class Customer {
  constructor(name, neighborhood){
    this.name = name
    this.id = ++customerId
    this.neighborhoodId = neighborhood
    store.customers.push(this)
  }
  deliveries(){
    return store.deliveries.filter(delivery => delivery.customerId === this.id)
  }
  meals(){
    return this.deliveries().map(delivery => delivery.meal());
  }
  totalSpent(){
    return this.meals().reduce((total, meal) => (total += meal.price), 0);
  }
}

class Meal {
  constructor(title, price){
    this.title = title
    this.price = price
    this.id = ++mealId
    store.meals.push(this)
  }
  deliveries(){
    return store.deliveries.filter(delivery => delivery.mealId === this.id)
  }
  customers(){
    return this.deliveries().map(delivery => delivery.customer());
  }
  static byPrice(){
    return store.meals.sort((a,b) => b.price - a.price);
  }
}

class Delivery {
  constructor(meal, neighborhood, customer){
    this.id = ++deliveryId
    this.mealId = meal
    this.neighborhoodId = neighborhood
    this.customerId = customer
    store.deliveries.push(this)
  }
  meal(){
    return store.meals.find(meal => {
      return meal.id === this.mealId;
    })
  }
  neighborhood(){
    return store.neighborhoods.find(neighborhood =>{
     return neighborhood.id === this.neighborhoodId;
  })
}
  customer(){
    return store.customers.find(customer => {
      return customer.id === this.customerId;
    })
  }
}
// .
