// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };
let neighborhoodIds = 0 
let mealIds = 0  
let customerIds = 0 
let deliveryIds = 0 

class Neighborhood {
  constructor(name){
    this.name = name
    this.id = ++neighborhoodIds
    store.neighborhoods.push(this)
  }
  deliveries(){
    return store.deliveries.filter(function (delivery){
      return delivery.neighborhoodId === this.id
      }.bind(this)
    )
  }
  customers() {
    return store.customers.filter(function (customer) {
      return customer.neighborhoodId === this.id
      }.bind(this)
    )
  }
  meals() {
    let data =this.customers().map(function (cust) {
       return cust.meals()
      })
      const mergedata = [].concat.apply([],data)
    return [...new Set(mergedata)]
    //return Array.from(new Set(data))
    
 }
}
 class Meal {
  constructor(title,price) {
    this.title = title
    this.price = price
    this.id = ++mealIds
    store.meals.push(this)
  }
  deliveries() {
    return store.deliveries.filter(function (delivery) {
      return delivery.mealId === this.id
    }.bind(this)
    )
   } 
   customers() {
     return this.deliveries().map(function (delivery) {
       return delivery.customer()
 
     }
     )
    }
   static byPrice() {
     return store.meals.sort((a, b) => parseFloat(b.price) - parseFloat(a.price))
   }
  
}

  class Customer {
  constructor(name,neighborhoodId) {
    this.name = name
    this.neighborhoodId = neighborhoodId
    this.id = ++customerIds
    store.customers.push(this)
  }
  deliveries() {
    return store.deliveries.filter(function (delivery) {
      return delivery.customerId === this.id
    }.bind(this)
    )
  }
  meals() {
    return this.deliveries().map(function (delivery)  {
      return delivery.meal()
    }
    )
  }//we need to use reduce 
  totalSpent() { 
    return this.meals().reduce(function(agg,el){
     return  agg + el.price
    },0)
    
    }
}
class Delivery {
  constructor(mealId, neighborhoodId, customerId) {
    this.mealId = mealId
    this.neighborhoodId = neighborhoodId
    this.customerId = customerId
    this.id = ++deliveryIds
    store.deliveries.push(this)
  }
  
  meal() {
    return store.meals.find(function (meal) {
      return meal.id === this.mealId
    }.bind(this)
    )
  }
  customer() {
    return store.customers.find(function (customer) {
      return customer.id === this.customerId
    }.bind(this)
    )
  }
  neighborhood() {
    return store.neighborhoods.find(function (neighborhood) {
      return neighborhood.id === this.neighborhoodId
    }.bind(this)
    )
  }
}




