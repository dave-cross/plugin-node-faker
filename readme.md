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

## Work in process

**This is not on NPM yet.** I have concerns that it isn't as optimal as it could be. If you have suggestions on how to improve it, I am all ears and ready to learn. For now, I'm `npm link`ing the module into a PL instance.

Like the PHP Faker plugin, this one doesn't want to operate on pattern-specific data. I'm probably just calling the wrong listener.
