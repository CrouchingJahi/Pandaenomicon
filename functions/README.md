# Pandaenomicon Functions
These are the cloud functions for Pandaenomicon, essentially its backend.

## To Use
After the backend is configured, you can start a local test instance by navigating to the functions folder and using `npm run serve`. You must have `firebase-tools` globally installed.  
So, the process would be:  
* `npm install -g firebase-tools`
* `npm install`
* `npm run serve`

## Configuration
To use these functions, you must create a file in the functions folder named `.runtimeconfig.json` that contains which Google sheets to reference. Make sure your sheets are formatted correctly, because I'm not accounting for cases where they're not. Firebasefunctions config doesn't support upper case letters, so remember use all lower case.

### Configuration Keys
```
{
  frontend: {
    url: The location of your test frontend so that the backend can allow CORS from that page
  },
  gapis: {
    apikey    : Your API key from Google APIs
    mainsheet : The ID of your main spreadsheet in Google Sheets
    foodsheet : The ID of your food info spreadsheet in Google Sheets
  }
}
```

Example:
If your main sheet is at `https://docs.google.com/spreadsheets/d/foo` and your food sheet is at `https://docs.google.com/spreadsheets/d/bar`, your configuration will look like:
```json
{
  "frontend": {
    "url": "http://localhost:8080"
  },
  "gapis": {
    "apikey": "blablabla",
    "mainsheet": "foo",
    "foodsheet": "bar"
  }
}
```

## API
The goal is to expose a single endpoint that accepts a GET request and returns a single JSON object in this format:

```
{
  lastUpdated: datetime
  attendants: [
    (all columns of main sheet)
  ]
  chores: {
    (key: day, value: {
      (key: time slot, value: array of names)
    })
  }
  meals: {
    (key: day, value: {
      (key: meal, value: recipe obj{
        chef: string,
        meal: string,
        ingredients: [{
          name: (string),
          amountPer: (string),
          totalAmount: (string),
          pricePer: (number),
          totalPrice: (number)
        }],
      })
    })
  }
  events: {
    (key: day, value: {
      (key: time of day, value: array of string)
    })
  }
  volunteers: {
    (key: day, value: {
      (key: time of day, value: array of string)
    })
  }
}
```

Example file (not complete, just showing structure):
```
{
  lastUpdated: 6/6/2006 6:06:06,
  attendants: [
    { name: 'Kuga', ...etc }
  ],
  chores: {
    mon: {
      bfastPrep: ['Emiru'],
      bfastClean: ['Kitni', 'Kat']
    }
  }
  meals: {
    sun: {
      breakfast: {
        chef: 'Weiland',
        meal: 'Fancy Stuff with Fancy Sauce',
        ingredients: [
          {
            name: 'Lamb Shank',
            amountPer: '6oz',
            pricePer: 8,
            totalAmount: 9lb,
            totalPrice: 150
          }
        ],

      },
      dinner: {
        chef: 'Brodo',
        meal: 'motha fuckin cinnamon rolls'
      }
    }
  }
  events: {
    mon: {
      morning: ['yoga at 11'],
      afternoon: ['some class', 'some other class'],
      evening: ['some class', 'rivendell meeting at 8']
    },
    wed: {
      afternoon: ['river party'],
      night: ['not thunderdome']
    }
  }
  volunteers: {
    sun: {
      afternoon: ['Security shift w/ like a gaggle of pandas']
    }
  }
}
```

## To Deploy
To deploy these functions, you need to have your `firebase-tools` configured. Read [the Firebase documentation](https://firebase.google.com/docs/functions/get-started) to figure that stuff out.  
You will also need to configure your prod environment with settings similar to those found in `.runtimeconfig.json`. For instance, you'll need to define your new frontend using `firebase functions:config:set frontend.url="https://appurl.firebaseapp.com"`. The other variables will similarly have to be configured.  
After you're all configured, use `npm run deploy`.
