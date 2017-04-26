## Faker for Pattern Lab-Node

This is a (still very early and totally in development) plugin that adds Faker data to your `data.json` file at build time.

## Usage

In `data.json`, add Faker API methods as strings. Call the vars as you normally would inside Mustache (untested with other PL engines).

```
{
  "company" : {
    "name" : "faker.name.findName",
    "url" : "faker.internet.url"
  }
}
```

## Some common Faker API methods

```
faker.[SECTION].[PROPERTY]([OPTIONS]) // `options` and parenthesis are optional
faker.name.findName // returns 'Neal Considine'
faker.name.firstName // returns 'Jaron'
faker.name.lastName // returns 'Will'
faker.internet.url // returns 'https://heath.org'
faker.lorem.paragraph // returns paragraph
faker.lorem.words(5) // returns 5 words
faker.lorem.text(500) // returns random number of characters less than 500. Could be 20 chars. Could be 200.
```

Check out Faker on NPM for all the different API methods (https://www.npmjs.com/package/faker). I've found Marak's Github wiki to be a little more detailed though (https://github.com/Marak/Faker.js/wiki).

## Work in process

I have concerns that it isn't as optimal as it could be. If you have suggestions on how to improve it, I am all ears and ready to learn.

A tale of two listeners. For some reason, I can't update the listitems object and the pattern-specific data object with one listener. `data.json` doesn't care where it's changed, but these other two get operated on in different places.
