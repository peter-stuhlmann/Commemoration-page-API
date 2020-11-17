# Model templates

## albums (discography)

```javascript
{
  "number": "",
  "title": "",
  "img": {
    "small": "",
    "medium": "",
    "large": "",
  },
  "year": "",
  "format": "",
  "contributingArtists": [
    {
      "name": "",
      "instrument": "",
    }
  ],
  "composer": [
    {
      "name": "",
      "years": "",
      "works": [  
        {
          "title": "",
          "movements": [""],
        }
      ]
    }
  ],
  "label": "",
  "attachments": [
    {
      "title": "",
      "link": "",
      "type": "",
    }
  ]
}
```


## cards

```javascript
{
  "img": {
    "src": "",
    "alt": "",
    "title": "",
  },
  "title": "",
  "description": "",
  "href": "",
  "tags": [""]
}
```


## choirs

```javascript
{
  "choir": ""
}
```


## concerts

```javascript
{
  "year": i,
  "displayDate": [""],
  "date": [""],
  "program": [
    {
      "composer": "",
      "piece": ""
    }
  ],
  "location": [
    {
      "city": "",
      "state": ""
    }
  ],
  "venue": [""],
  "participants": [""],
  "attachments": [
    {
      "title": "",
      "description": "",
      "url": ""
    }
  ]
}
```


## events (CV)

```javascript
{
  "year": i,
  "events": [
    {
      "date": "",
      "title": "",
      "description": "",
      "media": [
        {
          "title": "",
          "path": "",
          "format": "",
          "language": ""
        }
      ]
    }
  ]
}
```


## memories

```javascript
{
  "author": {
    "name": {
      "firstName": "",
      "lastName": ""
    },
    "avatar": {
      "src": "",
      "alt": "",
      "copyright": ""
    },
    "img": {
      "src": {
        "small": "",
        "medium": "",
        "large": ""
      },
      "alt": "",
      "copyright": ""
    },
    "biography": [""]
  },
  "text": [""]
}
```


## orchestras

```javascript
{
  "orchestra": ""
}
```


## pages

```javascript
{
  "path": "",
  "title": "",
  "content": "",
  "img": {
    "title": "",
    "alt: "",
    "copyright": "",
    "size": {
      "small": "",
      "medium": "",
      "large": ""
    },
    "meta": {
      "title": "",
      "description": ""
    }
  }
}
```


## pictures

```javascript
{
  "src": "",
  "srcSet": [""],
  "sizes": [""],
  "width": i,
  "height": i,
  "title": "",
  "alt": "",
  "copyright": "",
  "date": ""
}
```


## repertoire

```javascript
"piece": {
  "plain": "",
  "html": ""
}
```