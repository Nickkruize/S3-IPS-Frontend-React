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

  describe("rendering of all publishers", () => {

    let wrapper;
    beforeEach( () => {
      wrapper = shallow(<AllProducts/>);
    });

    it("renders the supplied publisherlist correctly", () => {
      expect(wrapper.state("publishers")).toEqual(null);

      wrapper.setState({publishers : ProductList})
      wrapper.setState({isLoaded : true})

      expect(wrapper.state("items")).toEqual(ProductList);
      expect(wrapper.state("isLoaded")).toEqual(true);

      expect(wrapper.find('[data-testid="AllProductsDiv"]').length).toEqual(1);
      expect(wrapper.find('[data-testid=1]').length).toEqual(1);
      expect(wrapper.find('[data-testid=2]').length).toEqual(1);
      expect(wrapper.find('[data-testid=3]').length).toEqual(1);
      expect(wrapper.find('[data-testid=4]').length).toEqual(0);
    });

    it("renders an no publishers found message if no publisherdata is supplied", () =>{
        wrapper.setState({isLoaded : true})

        expect(wrapper.state("items")).toEqual(null);
        expect(wrapper.state("isLoaded")).toEqual(true);
  
        expect(wrapper.find('[data-testid="NoProductsFoundMessage"]').length).toEqual(1);
        expect(wrapper.find('[data-testid="NoProductsFoundMessage"]').text()).toEqual("No publishers found");
        expect(wrapper.find('[data-testid="AllProductsDiv"]').length).toEqual(0);
        expect(wrapper.find('[data-testid=1]').length).toEqual(0);
    })
    
    it("renders an loading message when no data has been entered yet and the api call hasn't completed", () =>{
        expect(wrapper.state("items")).toEqual(null);
        expect(wrapper.state("isLoaded")).toEqual(false);
  
        expect(wrapper.find('[data-testid="LoadingMessage"]').length).toEqual(1);
        expect(wrapper.find('[data-testid="LoadingMessage"]').text()).toEqual("Loading..");
    })
});