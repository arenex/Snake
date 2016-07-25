var game_paused = false;
var myfolder = 'img/';

var gamespeed = 800;

var canvas;
var vadcontroller;

var game_time = 0;
var snake = new Snake();
var snake_add = new Snake();

var engine_move_left = true;
var engine_move_down = true;

var ctx;

var start_true_false = 0;

var image_field = new Image();
image_field.onload = function()
{
    start_true_false++;
    start_check();
};
image_field.src = myfolder + 'field.png';

var image_solid = new Image();
image_solid.onload = function()
{
    start_true_false++;
    start_check();
};
image_solid.src = myfolder + 'solid_shape_transparent.png';

var image_snake = new Image();
image_snake.onload = function()
{
    start_true_false++;
    start_check();
};
image_snake.src = myfolder + 'snake_shape.png';

var image_snakeadd = new Image();
image_snakeadd.onload = function()
{
    start_true_false++;
    start_check();
};
image_snakeadd.src = myfolder + 'snake_add.png';

var snake_array = [];

var indexes = [];

indexes.push([0, 2]);
indexes.push([1, 3]);
indexes.push([2, 3]);
indexes.push([3, 4]);
indexes.push([4, 4]);
indexes.push([5, 5]);
indexes.push([7, 5]);
indexes.push([9, 5]);
indexes.push([11, 5]);
indexes.push([13, 5]);
indexes.push([15, 5]);
indexes.push([16, 4]);
indexes.push([17, 4]);
indexes.push([18, 3]);
indexes.push([19, 3]);
indexes.push([20, 2]);
indexes.push([19, 2]);
indexes.push([18, 1]);
indexes.push([17, 1]);
indexes.push([16, 0]);
indexes.push([15, 0]);
indexes.push([13, 0]);
indexes.push([11, 0]);
indexes.push([9, 0]);
indexes.push([7, 0]);
indexes.push([5, 0]);
indexes.push([4, 0]);
indexes.push([3, 1]);
indexes.push([2, 1]);
indexes.push([1, 2]);
indexes.push([0, 2]);

var field_array = [

    [0, 0, 1, 0, 0],
    [0, 0, 1, 1, 0, 0],
    [0, 1, 1, 1, 0],
    [0, 1, 1, 1, 1, 0],
    [1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1],
    [0, 1, 1, 1, 1, 0],
    [0, 1, 1, 1, 0],
    [0, 0, 1, 1, 0, 0],
    [0, 0, 1, 0, 0]

];

function generate_empty_fields()
{

    var empty_indexes = [];
    for (var i = 0; i < field_array.length; i++)
    {
        var num_1s_found = 0;
        var first_index = 0;
        var last_index = 0;
        for (var j = 0; j < field_array[i].length; j++)
        {
            if (field_array[i][j] == 1)
            {
                if (num_1s_found == 0)
                {
                    num_1s_found++;
                    first_index = j;
                }
                else
                {
                    num_1s_found++;
                    last_index = j;
                }
            }
        }
        if (num_1s_found > 2)
        {
            for (var z = first_index + 1; z < last_index; z++)
            {
                empty_indexes.push([i, z]);
            }

        }

    }
    var empty_with_snake_too = [];
    for (var c = 0; c < empty_indexes.length; c++)
    {
        var index_i = empty_indexes[c][0];
        var index_j = empty_indexes[c][1];

        var exists_in_snake = false;
        for (var k = 0; k < snake_array.length; k++)
        {
            if (snake_array[k][0] == index_i && snake_array[k][1] == index_j)
            {
                exists_in_snake = true;
            }
        }
        if (exists_in_snake == false)
        {
            empty_with_snake_too.push([index_i, index_j]);
        }

    }

    empty_indexes = empty_with_snake_too;
    var begin_index = 0;
    var end_index = empty_indexes.length - 1;
    var index = Math.floor((Math.random() * end_index) + begin_index);
    snake_add.i = empty_indexes[index][0];
    snake_add.j = empty_indexes[index][1];

}

function Snake()
{
    this.i = 0;
    this.j = 0;

}

var block_states = [];
for (var i = 0; i < 6; i++)
{
    block_states[i] = 0;
}

function start_check()
{
    if (start_true_false == 4)
    {
        try
        {
            init();
        }
        catch (e)
        {
            alert(e);
        }

    }
}

function init()
{
    generate_empty_fields();
    vadcontroller = new VadController();
    canvas = document.getElementById('myCanvas');
    vadcontroller.onCreate(canvas, 0);

    start_game();
}

function draw_snake()
{
    ctx.drawImage(image_field, 0, 0);
    draw_all_solids();

    for (var q = 0; q < snake_array.length; q++)
    {
        var i = snake_array[q][0];
        var j = snake_array[q][1];

        if (q == 0)
        {

            var image_to_draw = image_snake;

            if (i % 2 == 0)
            {
                var solid_width = 95.5;
                var solid_height = 55.5 / 2;
                var initial_x_coord = 242 - (solid_width * 2);
                var initial_y_coord = 5;
                initial_x_coord += 3;
                ctx.drawImage(image_to_draw, initial_x_coord + (j * solid_width), initial_y_coord + (i * solid_height));

            }
            else
            {
                var solid_width = 95.5;
                var solid_height = 55.5 / 2;
                var initial_x_coord = 194 - (solid_width * 2);
                var initial_y_coord = 5;
                initial_x_coord += 3;
                ctx.drawImage(image_to_draw, initial_x_coord + (j * solid_width), initial_y_coord + (i * solid_height));

            }
        }
        else
        {
            if (i % 2 == 0)
            {
                var solid_width = 95.5;
                var solid_height = 55.5 / 2;
                var initial_x_coord = 242 - (solid_width * 2);
                var initial_y_coord = 5;
                initial_x_coord += 3;
                ctx.drawImage(image_snake, initial_x_coord + (j * solid_width), initial_y_coord + (i * solid_height));

            }
            else
            {
                var solid_width = 95.5;
                var solid_height = 55.5 / 2;
                var initial_x_coord = 194 - (solid_width * 2);
                var initial_y_coord = 5;
                initial_x_coord += 3;
                ctx.drawImage(image_snake, initial_x_coord + (j * solid_width), initial_y_coord + (i * solid_height));

            }
        }

    }
    var i = snake_add.i;
    var j = snake_add.j;

    if (i % 2 == 0)
    {
        var solid_width = 95.5;
        var solid_height = 55.5 / 2;
        var initial_x_coord = 242 - (solid_width * 2);
        var initial_y_coord = 5;
        initial_x_coord += 3;
        ctx.drawImage(image_snakeadd, initial_x_coord + (j * solid_width), initial_y_coord + (i * solid_height));

    }
    else
    {
        var solid_width = 95.5;
        var solid_height = 55.5 / 2;
        var initial_x_coord = 194 - (solid_width * 2);
        var initial_y_coord = 5;
        initial_x_coord += 3;
        ctx.drawImage(image_snakeadd, initial_x_coord + (j * solid_width), initial_y_coord + (i * solid_height));

    }

}

function draw_snake_circus_thingy()
{
    var canvas = document.getElementById('myCanvas');
    var width = canvas.width;
    var height = canvas.height;
    ctx = canvas.getContext('2d');
    ctx.drawImage(image_field, 0, 0);
    circus_style_looping_generate(0, ctx);

}

function populate_field_array(ctx)
{
    for (var i = 0; i < field_array.length; i++)
    {
        if (i % 2 == 0)
        {
            for (var j = 0; j < 5; j++)
            {
                var solid_width = 95.5;
                var solid_height = 55.5 / 2;
                var initial_x_coord = 242 - (solid_width * 2);
                var initial_y_coord = 5;
                if (field_array[i][j] == 1)
                {
                    ctx.drawImage(image_solid, initial_x_coord + (j * solid_width), initial_y_coord + (i * solid_height));
                }
            }
        }
        else
        {
            for (var j = 0; j < 6; j++)
            {
                var solid_width = 95.5;
                var solid_height = 55.5 / 2;
                var initial_x_coord = 194 - (solid_width * 2);
                var initial_y_coord = 5;
                alert("k");
                if (field_array[i][j] == 1)
                {
                    ctx.drawImage(image_solid, initial_x_coord + (j * solid_width), initial_y_coord + (i * solid_height));
                }
            }
        }

    }

}

function circus_style_looping_generate(index)
{

    if (index == 0)
        ctx.drawImage(image_field, 0, 0);
    if (index != indexes.length)
    {
        var i = indexes[index][0];
        var j = indexes[index][1];

        if (i % 2 == 0)
        {
            var solid_width = 95.5;
            var solid_height = 55.5 / 2;
            var initial_x_coord = 242 - (solid_width * 2);
            var initial_y_coord = 5;
            initial_x_coord += 3;
            ctx.drawImage(image_solid, initial_x_coord + (j * solid_width), initial_y_coord + (i * solid_height));

        }
        else
        {
            var solid_width = 95.5;
            var solid_height = 55.5 / 2;
            var initial_x_coord = 194 - (solid_width * 2);
            var initial_y_coord = 5;
            initial_x_coord += 3;
            ctx.drawImage(image_solid, initial_x_coord + (j * solid_width), initial_y_coord + (i * solid_height));

        }
    }

    if (index != indexes.length)
    {
        setTimeout(function()
        {
            circus_style_looping_generate(index + 1, ctx)
        }, 50);
    }
    else
    {
        if (!game_paused)
            setTimeout(function()
            {
                run_game_engine();
            }, 5);
    }

}

function pause_game()
{
    game_paused = true;
}

function resume_game()
{
    if (game_paused)
    {
        game_paused = false;
        setTimeout(function()
        {
            run_game_engine();
        }, 5);
    }
}

function draw_all_solids()
{

    for (var index = 0; index < indexes.length; index++)
    {
        var i = indexes[index][0];
        var j = indexes[index][1];

        if (i % 2 == 0)
        {
            var solid_width = 95.5;
            var solid_height = 55.5 / 2;
            var initial_x_coord = 242 - (solid_width * 2);
            var initial_y_coord = 5;
            initial_x_coord += 3;
            ctx.drawImage(image_solid, initial_x_coord + (j * solid_width), initial_y_coord + (i * solid_height));

        }
        else
        {
            var solid_width = 95.5;
            var solid_height = 55.5 / 2;
            var initial_x_coord = 194 - (solid_width * 2);
            var initial_y_coord = 5;
            initial_x_coord += 3;
            ctx.drawImage(image_solid, initial_x_coord + (j * solid_width), initial_y_coord + (i * solid_height));

        }
    }

}

function handle_controls()
{
    vadcontroller.handle_touches();

    if (vadcontroller.button_pressed_left) engine_move_left = true;
    if (vadcontroller.button_pressed_right) engine_move_left = false;
    if (vadcontroller.button_pressed_A) engine_move_down = true;
    if (vadcontroller.button_pressed_B) engine_move_down = false;

}

function run_game_engine()
{
    handle_controls();
    game_time += 5;
    if (game_time % gamespeed == 0)
    {
        move_snake();
    }
    if (!game_paused)
        setTimeout(function()
        {
            run_game_engine();
        }, 5);

}

function move_snake()
{

    snake.i = snake_array[0][0];
    snake.j = snake_array[0][1];
    var remember_snake_i = snake.i;
    var remember_snake_j = snake.j;

    if (engine_move_left && engine_move_down && snake.i % 2 == 0)
    {
        snake.i++;
    }
    else if (engine_move_left && engine_move_down && snake.i % 2 == 1)
    {
        snake.i++;
        snake.j--;
    }
    else if (engine_move_left && engine_move_down == false && snake.i % 2 == 0)
    {
        snake.i--;
    }
    else if (engine_move_left && engine_move_down == false && snake.i % 2 == 1)
    {
        snake.i--;
        snake.j--;
    }
    else if (engine_move_left == false && engine_move_down && snake.i % 2 == 0)
    {
        snake.i++;
        snake.j++;
    }
    else if (engine_move_left == false && engine_move_down && snake.i % 2 == 1)
    {
        snake.i++;
    }
    else if (engine_move_left == false && engine_move_down == false && snake.i % 2 == 0)
    {
        snake.i--;
        snake.j++;
    }
    else if (engine_move_left == false && engine_move_down == false && snake.i % 2 == 1)
    {
        snake.i--;
    }
    if (snake.i >= 0 && snake.i < field_array.length)
    {
        if (snake.i % 2 == 0 && snake.j >= 0 && snake.j < 5)
        {}
        else if (snake.i % 2 == 1 && snake.j >= 0 && snake.j < 6)
        {}
        else
        {
            restart_game();
        }
    }
    else
    {
        restart_game();
    }
    var collided = false;
    for (var z = 0; z < indexes.length; z++)
    {
        if (snake.i == indexes[z][0] && snake.j == indexes[z][1])
        {
            collided = true;
            break;
        }
    }
    for (var z = 0; z < snake_array.length; z++)
    {
        for (var a = 0; a < snake_array.length; a++)
        {
            if (z != a && snake_array[z][0] == snake_array[a][0] && snake_array[z][1] == snake_array[a][1])
            {
                collided = true;
            }
        }
    }
    if (snake_array.length > 1)
    {
        if (snake.i == snake_array[1][0] && snake.j == snake_array[1][1])
        {
            collided = true;
        }
    }

    if (collided)
    {
        restart_game();
    }

    if (snake.i == snake_add.i && snake.j == snake_add.j)
    {
        snake_array.unshift([snake_add.i, snake_add.j]);
        generate_empty_fields();
        gamespeed -= 100;
        if (gamespeed < 200) gamespeed = 200;

    }
    else
    {
        for (var x = snake_array.length - 1; x >= 0; x--)
        {
            if (x == 0)
            {
                snake_array[0][0] = snake.i;
                snake_array[0][1] = snake.j;
            }
            else
            {
                snake_array[x][0] = snake_array[x - 1][0];
                snake_array[x][1] = snake_array[x - 1][1];
            }
        }

    }
    draw_snake();

}

function start_game()
{
    var width = canvas.width;
    var height = canvas.height;
    ctx = canvas.getContext('2d');
    game_time = 5;
    snake.i = 2;
    snake.j = 2;
    restart_game();
    circus_style_looping_generate(0);
}

function restart_game()
{
    engine_move_left = true;
    engine_move_down = true;
    generate_empty_fields();
    snake.i = 2;
    snake.j = 2;
    gamespeed = 800;
    snake_array = [];
    snake_array.push([2, 2]);

}