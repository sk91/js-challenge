js-challenge
============

* Implement UI to show current orders state
* User should be able to see clear representation of orders distribution
* When user clicks on order represenation (whatever it is), there should be a tooltip with order details (name and price)
* Also most ordered food type should be displayed somewhere
* Bonus: adapt UI for typical mobile phone-like devices


## Installation:
```
git clone https://github.com/sk91/js-challenge.git
cd js-challenge
npm install
```

## Run fake API:
```
node api.js
```

#Open the ui
Open ``public/index.html`` in the browser.


## API

* There is a JSON API which returns current orders flow in some food ordering company's backend
* You can access it via http://localhost:3000/orders
* New order is generated every second
* Restart orders generation by restarting the _api.js_ script
* Order has a name, price and geo coordinates for the location it was made from
* One specific type of food is ordered more than others.
