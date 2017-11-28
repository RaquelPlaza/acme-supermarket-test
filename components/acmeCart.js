import React, {Component} from 'react';

class AcmeCart extends Component {

	constructor(props) {
		super(props);

		this.state = {
			cartContents: [],
			chargableContents: [],
			products: [
			  { 
			  	name: "Fruit tea", 
			  	id: "FR1", 
			  	price: 3.11, 
			  },
			  {
			  	name: "Strawberries",
			  	id: "SR1",
			  	price: 5
			  },
			  {
			  	name: "Coffee",
			  	id: "CF1",
			  	price: 11.21
			  }
			  
			],
			buyOneGetOneItemCode: "FR1",
			bulkDiscountItemCode: "SR1",
		};

		this.addToCart= this.addToCart.bind(this);
		this.buyOneGetOne = this.buyOneGetOne.bind(this);
		this.bulkDiscount = this.bulkDiscount.bind(this);
		this.getItemPrice = this.getItemPrice.bind(this);

	}

	addToCart(event, item) {
		event.preventDefault();

		console.log(event);

		const discountedTotal = this.buyOneGetOne('FR1', 5) || this.bulkDiscount('SR1', 4);

		this.setState(prevState => ({
		  cartContents: [...prevState.cartContents, {
					id: 'FR1',
					qty: 5,
					total: 0,
					discountedTotal: discountedTotal
				}]
		}));
		

	}

	buyOneGetOne(itemAddedId, qty) {

		let itemsInOffer;
		
		if(this.state.buyOneGetOneItemCode) {	
			itemsInOffer = (itemAddedId == this.state.buyOneGetOneItemCode);

			if(itemsInOffer) {

				let chargableItemsQty = 0;

				if (qty >= 2) {
					chargableItemsQty = Math.floor(qty/2) + (qty % 2);	
					const resolvedPriceAfterOffer = chargableItemsQty * this.getItemPrice(itemAddedId);

					return resolvedPriceAfterOffer;

				} 

			}
		}		
	}

	bulkDiscount(itemAddedId, qty) {
		if(this.state.bulkDiscountItemCode) {
			itemsInOffer = (itemAddedId == this.state.bulkDiscountItemCode);
		}

		if(itemsInOffer) {

			if (qty >= 3) {
				reducedPrice = this.getItemPrice(itemAddedId) - 0.5;	
				const resolvedPriceAfterOffer = chargableItemsQty * reducedPrice;

				return resolvedPriceAfterOffer;
			}
		}

	}

	getItemPrice(itemId) {
		
		for (var i = 0; i < this.state.products.length; i++) {
			if(this.state.products[i].id == itemId) {
				return this.state.products[i].price;
			}
		}

	}


	componentDidMount() {
		// this.buyOneGetOne(this.props.cartContents);
		this.setState({
			cartContents: [
				{
					id: 'FR1',
					qty: 3,
					total: 0,
					discountedTotal: 0
				}, 
				{
					id: 'SR1',
					qty: 2,
					total: 0,
					discountedTotal: 0
				}]
			});
		// this.buyOneGetOne();
		
	}

	render() {
		//const discountedPrice = this.buyOneGetOne();

		const shoppingBasket = this.state.cartContents;
		const contents = Object.keys(shoppingBasket).map(function(key) {

		let price

		 return <li key={key}>{shoppingBasket[key].id} Quantity: {shoppingBasket[key].qty} £{shoppingBasket[key].discountedTotal}</li>
		 });

		return (
	    <div className='acme-cart'>
	      <h1>Acme cart</h1>
	      <form>
	      	<label htmlFor="qty">Fruit tea</label>
			<input name="qty" type="text" />
			<input name="submit" type="button" value="Add" onClick={this.addToCart} />
			<label htmlFor="SR1">Strawberries</label>
			<input name="SR1" type="text" />
			<input name="submit" type="button" value="Add" onClick={this.addToCart} />
	      </form>
	      <h2>Cart contents</h2>
	      <div><ul>{contents}</ul></div>
	    </div>
	  	);
	}
}

export default AcmeCart;