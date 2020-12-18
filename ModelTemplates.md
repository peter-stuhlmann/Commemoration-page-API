# Model templates

- [albums (discography)](#albums-discography)
- [cards](#cards)
- [choirs](#choirs)
- [concerts](#concerts)
- [events (cv)](#events-cv)
- [memories](#memories)
- [orchestras](#orchestras)
- [pages](#pages)
- [pictures](#pictures)
- [repertoire](#repertoire)
- [send-message](#send-message-post)

---

## albums (discography)

```javascript
{
  "number": i,
  "title": "",
  "cover": {
    "format": {
      "square": {
        "small": "",
        "medium": "",
        "large": ""
      },
      "original": {
        "small": "",
        "medium": "",
        "large": ""
      }
    }
  },
  "year": "",
  "format": "",
  "contributingArtists": [
    {
      "name": "",
      "instrument": ""
    }
  ],
  "composer": [
    {
      "name": "",
      "years": "",
      "works": [
        {
          "title": "",
          "movements": [""]
        }
      ]
    }
  ],
  "label": "",
  "attachments": [
    {
      "title": "",
      "link": "",
      "type": ""
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
      "media": {
        "img": [
          {
            "title": "",
            "path": {
              "small": "",
              "medium": "",
              "large": ""
            }
          }
        ],
        "pdf": [
          {
            "title": "",
            "path": "",
            "language": ""
          }
        ]
      }
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

## premieres

```javascript
"piece": {
  "plain": "",
  "html": ""
}
```

## repertoire

```javascript
"piece": {
  "plain": "",
  "html": ""
}
```

## send-message (POST)

```javascript
{
  "name": "",
  "email": "",
  "subject": "",
  "message": ""
}
```
