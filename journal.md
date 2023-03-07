3/7/23

Challenges Faced
I needed to know what API requests were made, the data that was stored from those requests, the frequency that they were called on, and the format that the data was retrieved.

Actions Taken
Aside from looking at the API documentation, I went through each relevant file and mapped the requests that were made either during componentDidMount or as an event handler.

Results Observed
Although an axios request exists for getProductList, it didn't appear to be used at all in the codebase. I will have to check again, but it initially made it so that there were three types of requests that I would need to develop: getProduct, getRelated(products), and getStyles(ofProduct).
