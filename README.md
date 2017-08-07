# Card game

## Important notes

* The project is not compatible with npm 5, please either use npm 3 or yarn.
* There is a card with code AD (Ace of Diamonds), which gets blocked by adblockers, so its necessary
to disable adblockers in order to run the game.

## Architecture

The game logic is created in a separate package called game, and is a dependency of the UI. It exposes a factory method which generates a new game.

The idea is to connect the game package to the UI via a middleware which is a point of communication between the UI and the game. This decouples the presentation from the game itself, following the layered architecture approach.

## UI notes

* The app is responsive, although only portrait was taken into consideration.
* The browser support was focused on Chrome and Firefox, known issues are listed below:
  * Does not work on browsers that [do not support the grid layout](http://caniuse.com/#search=grid). This could be mitigated by ejecting the config and updating the autoprefixr config.
  * Safari does not support the WebAnimations API used for animating card movement. A polyfill is used instead, which might reduce the visual experience.

## Usage

The game can be started by typing the following in the command line:

```
yarn install
yarn start
```

For production, it can be built by using the following command:

```
yarn run build
```

NOTE: needs an absolute URL which it pulls from the PUBLIC_URL environment variable.
