# Apollo router demo issue

## To reproduce issue

1) install dependencies
```
npm i
```

2) Run users service on port 4010

```
npm run start-users
```

3) Run products service on port 4011

```
npm run start-products
```


### Run Apollo Router and call Query 

```
./router --dev --supergraph supergraph-schema.graphql
```

call query 
```
query User($userId: String!) {
  user(id: $userId) {
    id
    name
    userProduct {
      productId
      userId
    }
  }
}
```
Variables: 
```
{
  "userId": "user-2"
}
``` 

You get response with errors 
```
{
  "data": {
    "user": {
      "id": "user-2",
      "name": "user-2",
      "userProduct": null
    }
  },
  "errors": [
    {
      "message": "Cannot return null for non-nullable field UserProduct.productId",
      "path": [
        "user",
        "userProduct"
      ]
    }
  ]
}
```

### Run gateway and call Query 
```
npm run start-gateway
```

Run the same query and you get response without errors: 
```
{
  "data": {
    "user": {
      "id": "user-2",
      "name": "user-2",
      "userProduct": null
    }
  }
}
```


