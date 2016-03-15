# tegzt
Text to pixel map

...not exatcly a map, but HTML table.

This is how `The quick brown fox` text looks like: 

![alt text](http://statick.org/quickbrownfox_demo.png "Quick brown fox")

## How does it work
It looks for matching `n*n` array that represents one of alpha-numerical characters (+numbers, +some other),
containing the character's style represented as 0's and 1's.

For example:

    c: [
	  	[0,0,0,0,0,0],
	  	[0,0,0,0,0,0],
	  	[0,1,1,1,1,0],
	  	[1,0,0,0,0,0],
	  	[0,1,1,1,0,0],
	  	[0,0,0,0,0,0]
	  ]
(it's suposed to look to like `c` ...)

## Styling guide
In directory `matrices/` you can find default font's mappings (although not complete, just lowercase by now).

You can create your own mappings following these rules:

There are four types of character sets loaded defaultly by `tegzt.js`:
1. Lowercase characters, which you'll name - <somename>_lowercase.js,
2. Uppercase characters - <somename>_uppercase.js,
3. Numerics - <somename>_numbers.js,
4. Non-alpha-numerical - <somename>_nonalphanum.js

Once you've created these, save them to `matrices/` directory.

## Loading your styles
    window.addEventListener('load', function(){
      tegzt.load('mycoolstyle', function(create){
        create('My fancy text');
      });
    });

Enjoy.
