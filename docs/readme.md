# FLOWACE - API REFERENCE 
## TO RUN THE APPLICATION 
-`Run following commands`
-`1. open terminal`
-`2. cd your_own_directory`
-`3. RUN - https://github.com/parmeet10/flowace_api.git`
-`4. cd flowace_api`
-`5. npm install `
-`6. npm start`


## URLS
 - `http://localhost:3000/authentication`
 - `http://localhost:3000/user`
 - `http://localhost:3000/schedule`
 

 ## 1.ping

 ### Description 

 The reachability of the host can be checked through the Ping API. The API responds with a `pong` to communicate availability to the requesting client.

 ### Method

`GET`

### URL

`/ping`

### Headers

`None`

### Query

`None`

### Body

`None`

### Response Type

`String`

### Response

```
pong
```

## 2.Authentication

 ### Description 

 provides token to access other API'S, gives better control and accessibility over the api's 

 ### Method

`GET`

### URL

`/authentication`

### Headers

`None`

### Query

`None`

### Body

`None`

### Response Type

`JSON`

### Response

```
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjoiU2F0IE9jdCAwOCAyMDIyIDIyOjQzOjU4IEdNVCswNTMwIChJbmRpYSBTdGFuZGFyZCBUaW1lKSIsImlhdCI6MTY2NTI0OTIzOH0.x1sGFnw51ibu5nqD3uaJPRUbmQ4YzyS48lPmlJ-dFEo"
}
```

## 3.user

 ### Description 

Using this api you can create/get users.

 ### Method

`POST`

### URL

`/user`

### Headers

`x-auth:eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjoiVHVlIE5vdiAyOSAyMDIyIDEzOjAwOjQxIEdNVCswNTMwIChJbmRpYSBTdGFuZGFyZCBUaW1lKSIsImlhdCI6MTY2OTcwNzA0MX0.VM20UNnHviUBjofMOqMXKKuJAxuhZbQgy91jHOQdhyI`

### Query

`None`

### Body

`{
    "name":"temporary user ",
    "password":"parmeetPassword",
    "email":"parmeet123@gmail.com"
}`

### Response Type

`String`

### Response
```
{
    "code": "success",
    "error": false,
    "message": "Successful",
    "data": {
        "userId": 4
    }
}
```
 ### Method 
 
 `GET`

### URL

`/user`

### Headers

`x-auth:eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjoiVHVlIE5vdiAyOSAyMDIyIDEzOjAwOjQxIEdNVCswNTMwIChJbmRpYSBTdGFuZGFyZCBUaW1lKSIsImlhdCI6MTY2OTcwNzA0MX0.VM20UNnHviUBjofMOqMXKKuJAxuhZbQgy91jHOQdhyI`

### Query

`id`

### Body

`none`

### Response Type

`String`

### Response
```
{
    "code": "success",
    "error": false,
    "message": "Successful",
    "data": {
        "userDetails": [
            {
                "id": 1,
                "name": "parmeet",
                "email": "sparmeet@gmail.com",
                "created_at": "2022-11-29T02:48:24.000Z"
            }
        ]
    }
}
```
## 4. schedule

 ### Description 

  Using this api you can create/get schedule.

 ### Method

`POST`

### URL

`/schedule`

### Headers

`x-auth:eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjoiVHVlIE5vdiAyOSAyMDIyIDEzOjAwOjQxIEdNVCswNTMwIChJbmRpYSBTdGFuZGFyZCBUaW1lKSIsImlhdCI6MTY2OTcwNzA0MX0.VM20UNnHviUBjofMOqMXKKuJAxuhZbQgy91jHOQdhyI`

### Query

`None`

### Body

`{
    "start":"2022-12-08 01:00:00",
    "end":"2022-12-09 04:00:00",
    "userId":1,
    "sportName":"basketball"
}`

### Response Type

`String`

### Response
```
{
    "code": "success",
    "error": false,
    "message": "Successful",
    "data": {
        "scheduleId": [
            5
        ]
    }
}
```
### Method

`GET`

### URL

`/schedule`

### Headers

`x-auth:eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjoiVHVlIE5vdiAyOSAyMDIyIDEzOjAwOjQxIEdNVCswNTMwIChJbmRpYSBTdGFuZGFyZCBUaW1lKSIsImlhdCI6MTY2OTcwNzA0MX0.VM20UNnHviUBjofMOqMXKKuJAxuhZbQgy91jHOQdhyI`

### Query

`userId=2`

### Body

`none`

### Response Type

`String`

### Response
```
{
    "code": "success",
    "error": false,
    "message": "Successful",
    "data": {
        "schedules": [
            {
                "id": 2,
                "userId": 2,
                "start": "2022-11-30T19:30:00.000Z",
                "end": "2022-11-30T21:30:00.000Z",
                "active": 1,
                "sportName": "football"
            },
            {
                "id": 3,
                "userId": 2,
                "start": "2022-12-03T19:30:00.000Z",
                "end": "2022-12-04T22:30:00.000Z",
                "active": 1,
                "sportName": "basketball"
            },
            {
                "id": 4,
                "userId": 2,
                "start": "2022-12-05T19:30:00.000Z",
                "end": "2022-12-06T22:30:00.000Z",
                "active": 1,
                "sportName": "basketball"
            }
        ]
    }
}
```

# 'USE POSTMAN TO HIT API'
