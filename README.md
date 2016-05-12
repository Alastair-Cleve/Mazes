#MazeRunner

##Concept

MazeRunner is a front-end JavaScript game, in which players, who are cats, must
cross a maze within a set period of time. The twist is that players can eat
fish, which add time to the clock. If they are unlucky, they hit water balloons,
which reduce their time. If they are unable to complete the maze within the time
allotted, then they lose.

##Selected Features

MazeRunner is written in pure JavaScript. It renders a maze image to the DOM through
the `<canvas>` element. Collisions with the walls of the maze or with other
objects, such as fish, are detected through `getImageData`, which provides
access to the pixel `rgba` values.

##To Dos

- Allow players to pause/resume the game.
- Implement different levels of difficulty.
