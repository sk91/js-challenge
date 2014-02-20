js-challenge
============

## Installation: 
```
# unzip it to js-challenge folder
cd js-challenge
npm install
```

## Run fake API:
```
node api.js
```

## API

* There is a JSON API which returns current orders flow in some food ordering company's backend
* You can access it via http://localhost:3000/orders
* New order is generated every second
* Restart orders generation by restarting the _api.js_ script
* Order has a name, price and geo coordinates for the location it was made from
* One specific type of food is ordered more than others. 

## Task 

* Implement UI to show current orders state
* User should be able to see clear representation of orders distribution
* When user clicks on order represenation (whatever it is), there should be a tooltip with order details (name and price)
* Also most ordered food type should be displayed somewhere
* Bonus: adapt UI for typical mobile phone-like devices

## Notes

* Feel free to amend api.js if needed (but your UI should still treat it as a black box)
* Try to use as less frameworks as possible
* Try to make your code as clean as possible 
* Be creative! UI is not just about pure functionality 
