import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import CartContext from '../../Context/CartContext';
import { useContext } from 'react';

const CartItem = (props) => {
    const item = props.item
    const index = props.index
    const {addToCart} = useContext(CartContext);

    return (
        <tr id={index}>
            <td class="cart_product">
            <Link to={{ pathname: `/Product/${item.id}` }}><img style={{maxWidth: "50%"}}src={item.imgUrl} alt="" /></Link>
            </td>
            <td class="cart_description">
                <h4><a href="/Product/{{item.id}}">{item.name}</a></h4>
            </td>
            <td class="cart_price">
                <p>${item.price}</p>
            </td>
            <td class="cart_quantity">
                <div class="cart_quantity_button">
                    <button onClick={() => addToCart(item)} class="cart_quantity_up" > + </button>
                    <input class="cart_quantity_input" type="text" name="quantity" value="1" autocomplete="off" size="2" />
                    <button class="cart_quantity_down"> - </button>
                </div>
            </td>
            <td class="cart_total">
                <p class="cart_total_price">${item.price}</p>
            </td>
            <td class="cart_delete">
                <a class="cart_quantity_delete" href="/"><FontAwesomeIcon icon={faTimes} /></a>
            </td>
        </tr>
    )
};

export default CartItem;