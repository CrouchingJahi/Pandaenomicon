# Pandaenomicon Functions
These are the cloud functions for Pandaenomicon, essentially its backend.

## To Use
After the backend is configured, you can start a local test instance by navigating to the functions folder and using `npm run serve`. You must have `firebase-tools` globally installed.
So, the process would be:
* `npm install -g firebase-tools`
* `npm install`
* `npm run serve`

## To Deploy
To deploy these functions, you need to have your `firebase-tools` configured. Read [the Firebase documentation](https://firebase.google.com/docs/functions/get-started) to figure that stuff out.
After you're all configured, use `npm run deploy`.

## Configuration
To use these functions, you must create a file in the functions folder named `config.json`
that contains which Google sheets to reference. Make sure your sheets are formatted correctly, because I'm not accounting for cases where they're not.

Configuration Keys:
| key       | value |
| --------- | ----- |
| apiKey    | Your API key from Google APIs |
| mainSheet | The ID of your main spreadsheet in Google Sheets |
| foodSheet | The ID of your food info spreadsheet in Google Sheets |

Example:
If your main sheet is at `https://docs.google.com/spreadsheets/d/foo` and your food sheet is at `https://docs.google.com/spreadsheets/d/bar`, your configuration will look like:
```json
{
  "apiKey": "blablabla",
  "mainSheet": "foo",
  "foodSheet": "bar"
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
      (key: meal, value: recipe obj)
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
        (other details about a recipe obj are still being worked on)
      },
      dinner: {
        chef: 'Brodo'
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
