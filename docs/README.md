# Returns Service

Simple returns app that stores all processed returns in masterdata.

![returns drawio (2)](https://github.com/krackram20/backend-test/assets/62782975/bb7c22ca-abc7-457c-b1eb-69980e5b61a6)


## Return Document Schema

```javascript
{
  id?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  status?: string;
  reason?: string;
  return_method?: string;
  conversion_rate?: number;
  items: any[];
  value: string;
  comments?: string;
  return_amount?: number;
}
```
## GET

**Get Orders (last 30 days)**

Endpoint: `https://{{workspace}}--itglobers.myvtex.com/_v/oms/orders`

If no query-params are provided, this endpoint will return all the orders in the last 30 days. All available params can be found [here](https://developers.vtex.com/docs/api-reference/orders-api#get-/api/oms/pvt/orders).

## POST

**Create Return**

Endpoint: `https://{{workspace}}--itglobers.myvtex.com/_v/oms/returns/create`

Create a new return request. All properties are mandatory. For a full refund, the `itemsID` array must be empty. For a partial refund, the `itemsID` array must contain the `productId` of each item that the user wants to return. The return method can be either `us_dollars` or `store_credit`. If the return method is US dollars, the conversion rate will be extracted from this [API](https://dev.socrata.com/foundry/www.datos.gov.co/32sa-8pi3).

**Body**

Raw (JSON):

```json
{
 "orderId": 1353500506549-01,
 "reason": "Defective product",
 "return_method": "us_dollars",
 "itemsID": []
}
```

## GET

**Get Return**

Endpoint: `https://{{workspace}}--itglobers.myvtex.com/_v/oms/returns/{{orderId}}`

Returns all fields from MDv2.

## DELETE

**Delete Return**

Endpoint: `https://{{workspace}}--itglobers.myvtex.com/_v/oms/returns/{{orderId}}`

Deletes return document only if the status is `rechazado` or `pagado`.

## PUT

**Update Status**

Endpoint: `https://{{workspace}}--itglobers.myvtex.com/_v/oms/returns/{{orderId}}`

Available status codes: `creado`, `en revision`, `rechazado`, `pagado`.

**Body**

Raw (JSON):

```json
{
    "status": "rechazado",
    "comments": "items in terrible condition"
}
```

## GraphQL

**GraphQL queries and mutations**



```graphql
Query {
  getReturnData(orderId: {{orderId}}) {
    id,
    status,
    reason,
    return_method,
    return_amount,
    conversion_rate,
    items {
      price
    }
  }
}

Mutation {
  deleteReturnData(id: {{orderId}}) { 
    id,
    error
  }
}


Mutation {
  updateStatusData(id: {{orderId}}, status: String, comments: String) {
    id,
    error
  }
}

```
