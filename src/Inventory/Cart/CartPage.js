import {useContext} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '@fortawesome/fontawesome-svg-core';
import '@fortawesome/react-fontawesome'
import '@fortawesome/react-fontawesome'
import CartContext from '../../Context/CartContext';
import '../../css/cart.css'
import '../../css/responsive.css'
import CartItem from './CartItem';


export default function CartPage(){
    const {cart} = useContext(CartContext);


    function listCartItems(){
        if (cart.length > 0) {
            return (cart.map((item, index) =>{
                return(
                    <CartItem item={item} index={index}/>
                )
            }));
        }
    }

    return(
        <section id="cart_items">
       	<div class="cartcontainer">
        <div class="table-responsive cart_info">
				<table class="table table-condensed">
					<thead>
						<tr class="cart_menu">
							<td class="image">Item</td>
							<td class="description"></td>
							<td class="price">Price</td>
							<td class="quantity">Quantity</td>
							<td class="total">Total</td>
							<td></td>
						</tr>
					</thead>
					<tbody>
                    {listCartItems()}
					</tbody>
				</table>
			</div>
            </div>
            </section>
    )
}