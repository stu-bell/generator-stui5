# UI5 Yeoman Generator
## Super template for UI5

[Yeoman](http://yeoman.io) is a [Node.js](http://nodejs.org) package for generating code projects from pre-defined templates known as _generators_. This project is a generator for starting [UI5](http://openui5.org) projects.

People have written thousands of yeoman generators, and not just for JavaScript projects. You may find an existing one that suits your needs. See the full list at [yeoman.io](http://yeoman.io/generators/). There are a few UI5 generators (search UI5 in the search field) but none of them were to my taste, hence this one.

# Installation

1. Install node from [nodejs.org](https://nodejs.org/en/download/)
- Install yeoman via npm: `npm install -g yo`
- Install this generator: while this project is not an npm package, clone it to a local directory, from which run: `npm link`

# Usage
These instructions assume you've installed yo via npm and are running it from the command line.

## Commands

|Command  |Description  
|--|--|
|`yo stui5`        | Generate a new UI5 app from scratch
|`yo stui5:view <viewName>`   | Add a view to an existing app, where `<viewName>` gets prepended to `.view.xml` for the view name
|`yo stui5:config` | Generate a default .yo-rc.json configuration file

## Configuration

Yeoman uses a config file `.yo-rc.json` at the root directory of the project you're generating. If you find a specific configuration you like, keep a copy of the config file for use in future projects. Yeoman will generate a default config file in the current directory if it can't find one. Any mandatory parameters missing from the config file will be asked for at the command prompt when the generator is run.

# Extending

Writing a yeoan generator is pretty straight forward.  There's a good tutorial at [yeoman.io](http://yeoman.io/authoring/). You can either write your own generator or enhance this one (open a merge request on GitLab). Keep in mind that generators can and should be composable.

## Adding config options

Default parameters go in the defaults object in `config/index.js`. Mandatory parameters for which there is no default should have a prompt added _if the parameter isn't already available in the config file_.
