import React from "react";
import {AllCategories} from '../AllCategories';
import {shallow} from "enzyme";


const CategoryList = 
  [
    {
        id : 1,
        name: "testcategory 1"
    },
    {
        id : 2,
        name: "testcategory 2"
    },
    {
        id : 3,
        name: "testcategory 3"
    }
]

  describe("rendering of all categories", () => {

    let wrapper;
    beforeEach( () => {
      wrapper = shallow(<AllCategories/>);
    });

    it("renders the supplied categorylist correctly", () => {
      expect(wrapper.state("categories")).toEqual(null);

      wrapper.setState({categories : CategoryList})
      wrapper.setState({isLoaded : true})

      expect(wrapper.state("categories")).toEqual(CategoryList);
      expect(wrapper.state("isLoaded")).toEqual(true);

      expect(wrapper.find('[data-testid="AllCategoriesDiv"]').length).toEqual(1);
      expect(wrapper.find('[data-testid=1]').length).toEqual(1);
      expect(wrapper.find('[data-testid="link1"]').text()).toEqual("testcategory 1");
      expect(wrapper.find('[data-testid=2]').length).toEqual(1);
      expect(wrapper.find('[data-testid="link2"]').text()).toEqual("testcategory 2");
      expect(wrapper.find('[data-testid=3]').length).toEqual(1);
      expect(wrapper.find('[data-testid="link3"]').text()).toEqual("testcategory 3");
      expect(wrapper.find('[data-testid=4]').length).toEqual(0);
    });

    it("renders an no categories found message if no categorydata is supplied", () =>{
        wrapper.setState({isLoaded : true})

        expect(wrapper.state("categories")).toEqual(null);
        expect(wrapper.state("isLoaded")).toEqual(true);
  
        expect(wrapper.find('[data-testid="NoCategoriesFoundMessage"]').length).toEqual(1);
        expect(wrapper.find('[data-testid="NoCategoriesFoundMessage"]').text()).toEqual("No products found");
        expect(wrapper.find('[data-testid="AllCategoriesDiv"]').length).toEqual(0);
        expect(wrapper.find('[data-testid=1]').length).toEqual(0);
    })
    
    it("renders an loading message when no data has been entered yet and the api call hasn't completed", () =>{
        expect(wrapper.state("categories")).toEqual(null);
        expect(wrapper.state("isLoaded")).toEqual(false);
  
        expect(wrapper.find('[data-testid="LoadingMessage"]').length).toEqual(1);
        expect(wrapper.find('[data-testid="LoadingMessage"]').text()).toEqual("Loading..");
    })
});