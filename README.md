# CommandBot

This is a discord bot that allows for adding custom commands to your server and a few other goodies like checking
the price of bitcoin or grabbing a definition from urban dictionary. It is a work in progress and I am still adding new features and commands.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

To install this project just clone the repo and then do an npm install in the folder that is downloaded. That will install 
all dependencies for the project.

### Prerequisites

You need to create a .env file in the root directory with the following things inside:

```
DISCORD_API_TOKEN= Your discord api token goes here
MONGODB_CONNECTION_STRING= This is a string that points to a mongoDb in the cloud. I am using MongoDb atlas to store my db
CMC_PRO_API_KEY= This is the API key for the bitcoin price command, you can get a key here (https://coinmarketcap.com/api/)
RAPIDAPI_KEY= This is another API key that is for the urban dictionary command. You can get one here (https://rapidapi.com/community/api/urban-dictionary)
```

### Installing

This is a step by step series of examples that tell you how to get a development environment running

First step is to clone the repo

```
git clone https://github.com/Bots/commandbot.git
```

Then we need to install our dependencies

```
npm install
```

next grab all of your API keys and create a .env file to hold all your secrets

Once you fill in your .env file we can run the bot

```
nodemon index.js
```

Your bot should be up and running now.


Once you have the bot running in your channel you can issue the following commands:

```
!addCommand commandName this is what will be returned when you call the command, it can be just text or a URL.
```
```
!editCommand commandName this is where you can edit a command that has already been created.
```
```
!deleteCommand commandName (deletes the command) 
``` 
```
!commandName (replies with the command that you set.)
``` 
```
!btc (Returns the price of bitcoin and the percentage of change over the past day)
``` 
```
!urban query goes here (search Urban Dictionary for your query) (You can also do !urban2 for the second definition, !urban3 etc...)
```

## Built With

* [NodeJs](https://nodejs.org/en/download/) - The javascript framework used
* [MongoDB-Atlas](https://www.mongodb.com/cloud/atlas) - The cloud database used
* [Urban-Dictionary](https://rapidapi.com/community/api/urban-dictionary) - The Urban Dictionary API
* [CoinMarketCap](https://coinmarketcap.com/api/) - The CoinMarketCap API


## Contributing

Pull requests are welcomed.

## Authors

* **John Paul Wile** - *Initial work* - [Bots](https://github.com/Bots) on github.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Hat tip to anyone whose code was used

