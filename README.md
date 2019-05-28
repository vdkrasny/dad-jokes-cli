# Dad joke api command line tool

## Short Description

You need to build a simple command line tool which allows the user to make a request to an <https://icanhazdadjoke.com/api> API and store the data in a text file.

## Topics

* Core Concept
* Globals
* Modules
* Streams
* Async Operations
* NPM
* Network

## Requirements

This application should accept following command line arguments using process.argv:

1. "searchTerm" - the command line arguments should accept search term argument and your application should make an API request to the dad joke API to search for a joke based on the search term. If it finds jokes matching the term, it should output a random joke, and should also save the joke to a file called jokes.json. If it doesn't find a joke, it should log a message to the console telling the user that no jokes were found for that search term

2. "leaderboard" - the command line arguments should accept leaderboard argument. If that command line argument is passed in, your application should return the most popular joke based on how many times it appears in jokes.json

An example of running the app with command line arguments:

    - testApp --searchTearm 'hipster'
    - testApp --leaderboard

### Restrictions **(do not apply to advanced requirements)**

You have to use only the following NODE.js modules:

1. fs - for reading and writing to a file
2. process - for gathering arguments from the command line
3. https - for making API requests

## Advanced Requirements

1. Do not use JSON format, create you custom format for writing and reading to a jokes.**txt**
2. Use the prompt module to ask a user for some input instead of having to pass in an argument from the command line
