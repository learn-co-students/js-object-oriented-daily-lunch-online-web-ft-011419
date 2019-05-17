// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };

// initialize store with key of trips and meals that each point to an empty array
let mealId = 0;
let neighbohoodId = 0;
let customerId = 0;
let deliveryId = 0;


class Meal{
    constructor(title,price = 0) {
        this.id = ++mealId;
        this.title = title;
        this.price = price;
        store.meals.push(this);
    }
    deliveries() {
      return store.deliveries.filter(delivery => delivery.mealId === this.id);
    }

    customers() {
        return this.deliveries().map(delivery => {
          return delivery.customer();
    });
  }
  static.byPrice() {
      return store.meals.sort((a, b) => a.price < b.price);
    }
}

class Customer{
  constructor(name, neighborhoodId) {
      this.id = ++customerId;
      this.name = name;
      this.neighborhoodId = neighborhoodId;
      store.customers.push(this);
    }
    deliveries() {
        return store.deliveries.filter(
            function(delivery) {
                return delivery.customerId === this.id;
            }.bind(this)
        );
    }
    meals() {
        return this.deliveries().map(delivery => {
          return delivery.meal();
    });
  }
    totalSpent() {
      return this.meals().reduce((total, meal) => (total += meal.price), 0);
    }
}

const Neighborhood = (() => {
  let neighborhoodIds = 1;
  return class {
    constructor(name) {
      this.id = neighborhoodIds++;
      this.name = name;
      store.neighborhoods.push(this);
    }

    customers() {
      return store.customers.filter(customer => customer.neighborhoodId === this.id);
    }

    meals() {
      const allMeals = this.customers().map(customer => customer.meals());
      const merged = [].concat.apply([], allMeals);
      return [...new Set(merged)];
    }

    deliveries() {
      return store.deliveries.filter(delivery => delivery.neighborhoodId === this.id);
    }
  };
})();




class Delivery {
  constructor(mealId, neighborhoodId, customerId) {
      this.id = ++deliveryId;
      this.mealId = mealId;
      this.neighborhoodId = neighborhoodId;
      this.customerId = customerId;
      store.deliveries.push(this);
    }
  meal() {
    return store.meals.find(meal => {
      return meal.id === this.mealId;
    });
  }
  customer() {
    return store.customers.find(customer => {
      return customer.id === this.customerId;
    });
  }
  neighborhood() {
    return store.neighborhoods.find(neighborhood => {
      return neighborhood.id === this.neighborhoodId;
    });
  }
}
