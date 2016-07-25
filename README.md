# Snake Game
Clone of a well known snake game. Decided to add a bit of a challenge by using a tilted Hexagonal grid instead.

![screenshot](info/screenshot.png)

### How to Play:
- Use arrow keys ← ↑ → ↓ to maneuvre the snake's head
- The valid moves are as follows: Up-Left, Up-Right, Down-Left, Down-Right
- ![screenshot](info/allowed_moves.png)
- It cannot move directly up or down

### Rules:
- If the snake hits the wall ![screenshot](info/solid_shape_transparent.png) or itself ![screenshot](info/snake_shape.png) - the game resets
- Eating ![screenshot](info/snake_add.png) will increase the length of the snake and the game speed

### Features:
- HTML5 Canvas, vanilla JavaScript
- FullScreen Resize - maintains proportional resize ratios independant of screen dimensions
- Provides limited support for touchscreen. Touch at the edges of the canvas to steer

### Graphics:
- All graphics belong to their appropriate copyright holders
- The material is presented for entirely non-profit educational demo purposes

### Demo
[![PlayDemo](info/playdemo.png)](http://vadimstark.com/GitHubPrj/Snake/)