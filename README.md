# Product Catalogue App with Product Display  

Web Application built on React+Redux

Access it on [https://cosmic-druid-28d7d7.netlify.app/](https://cosmic-druid-28d7d7.netlify.app/)  

## Overview  
This is a basic products catalogue display with categories and brands filtering along with a local and global search feature.
The product details can be viewed by clicking the product card.  

The application consumes two different service endpoints to get the required data to fit in with the assessment task. 
1. [dummyjson.com](https://dummyjson.com)  
I've used the original dummyjson.com endpoints to get 
    1. all the products (dummyjson.com/products)
    2. get all categories (dummyjson.com/products/categories)
    3. get all products of a category (dummyjson.com/products/categories/{category})
2. [extenddummyjson-latest.onrender.com](https://extenddummyjson-latest.onrender.com)  
This is a backend service that is developed by me on java and springboot and it extends the dummyjson.com/products api by exposing two new endpoints.  
    1. '/products/brands'  
    Which returns the list of all brands (which it parses from the original products list)
    2. '/products/brand/{brandName}'  
    This acts similar to the one in dummyjson and returns all products under that brand
    3. '/products/category/{category}/brand/{brandName}'  
    This endpoint is used when we have both filters active. I originally wanted to use RequestParams for this but then decided to go ahead with extending the facility similar to that of dummyjson.com


    >The backend is hosted on render and can be accessed using the above link but the initial load may be a minute long as render spins down the deployment after inactivity.



## Run the application
1. Clone the repo  
2. Make sure you have node installed
3. Perform `npm clean install`
4. Run using `npm start`
5. Access on browser using [localhost:3000](localhost:3000)
