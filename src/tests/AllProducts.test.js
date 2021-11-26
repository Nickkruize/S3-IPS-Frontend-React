import React from "react";
import {AllProducts} from '../AllProducts';
import {shallow} from "enzyme";


const ProductList = 
  [
    {
        id : 1,
        name: "Blizzard",
        description: "test1",
        price: "1991"
    },
    {
        id : 2,
        name: "EA",
        description: "test2",
        price: "1982"
    },
    {
        id : 3,
        name: "Square Enix",
        description: "test3",
        price: "1975"
    }
]

  describe("rendering of all products", () => {

    let wrapper;
    beforeEach( () => {
      wrapper = shallow(<AllProducts/>);
    });

    it("renders the supplied productlist correctly", async() => {
      try{expect(wrapper.state("products")).toEqual(null);


      wrapper.setState({products : ProductList})
      wrapper.setState({isLoaded : true})

        expect(wrapper.state("products")).toEqual(ProductList);
        expect(wrapper.state("isLoaded")).toEqual(true);

      expect(wrapper.find('[data-testid="AllProductsDiv"]').length).toEqual(1);
      expect(wrapper.find('[data-testid=1]').length).toEqual(1);
      expect(wrapper.find('[data-testid=2]').length).toEqual(1);
      expect(wrapper.find('[data-testid=3]').length).toEqual(1);
      expect(wrapper.find('[data-testid=4]').length).toEqual(0);
      }
      catch(error){
      }
    });

      it("renders an no products found message if no productdata is supplied", async() =>{
        wrapper.setState({isLoaded : true})

        try{
          expect(wrapper.state("products")).toEqual(null);
          expect(wrapper.state("isLoaded")).toEqual(true);
    
          expect(wrapper.find('[data-testid="NoProductsFoundMessage"]').length).toEqual(1);
          expect(wrapper.find('[data-testid="NoProductsFoundMessage"]').text()).toEqual("No products found");
          expect(wrapper.find('[data-testid="AllProductsDiv"]').length).toEqual(0);
          expect(wrapper.find('[data-testid=1]').length).toEqual(0);
        }
        catch(error){

        }

    })
    
    it("renders an loading message when no data has been entered yet and the api call hasn't completed", async() =>{
        try{
          expect(wrapper.state("products")).toEqual(null);
          expect(wrapper.state("isLoaded")).toEqual(false);
  
          expect(wrapper.find('[data-testid="LoadingMessage"]').length).toEqual(1);
          expect(wrapper.find('[data-testid="LoadingMessage"]').text()).toEqual("Loading..");
        }
        catch(error){

        }
    })
});