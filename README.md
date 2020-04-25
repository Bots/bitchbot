# DiscordBot

This is a discord bot that allows for adding custom commands to your server and a few other goodies like checking
the price of bitcoin or grabbing a definition from urban dictionary. I am adding new features and commands every day.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

To install this project just clone the repo and then do an npm install in the folder that is downloaded. That will install 
all dependencies for the project.

### Prerequisites

You need to create a .env file in the root directory with the following things inside:

```
DISCORD_API_TOKEN= Your discord api token goes here
MONGODB_CONNECTION_STRING= This is a string that points to a mongoDb in the cloud. I am using MongoDb atlas to store my db
BTC_VALUE_API_KEY= This is the API key for the bitcoin price command, you can get a key [here](https://coinmarketcap.com/api/)
RAPIDAPI_KEY= This is another API key that is for the urban dictionary command. You can get one [here](https://rapidapi.com/community/api/urban-dictionary)
```

### Installing

This is a step by step series of examples that tell you how to get a development environment running

First step is to clone the repo

```
git clone https://github.com/Bots/discordbot.git
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

Once you have the bot running in your channel you can do the following commands:

```
!addCommand commandName this is what will be returned it can be just text or a URL.
```
```
!editCommand commandName this is where you can edit a command that has already been created.
```
```
!deleteCommand commandName 
``` (deletes the command) 
```
!commandName
``` (replies with the command that you set.)
```
!btc
``` (Returns the price of bitcoin and the percentage of change over the past day)
```
!urban query goes here
``` (search Urban Dictionary for your query)

## Deployment

Add additional notes about how to deploy this on a live system

## Built With

* [Dropwizard](http://www.dropwizard.io/1.0.2/docs/) - The web framework used
* [Maven](https://maven.apache.org/) - Dependency Management
* [ROME](https://rometools.github.io/rome/) - Used to generate RSS Feeds

## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags). 

## Authors

* **Billie Thompson** - *Initial work* - [PurpleBooth](https://github.com/PurpleBooth)

See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Hat tip to anyone whose code was used
* Inspiration
* etc
