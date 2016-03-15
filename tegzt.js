var tegzt = (function() {

    /**
     * Loads external file
     * @param {string} [filename] Name of file to load
     */
    var loadfile = function( filename ){
        var scriptElement = document.createElement('script');
        
        scriptElement.setAttribute('type','text/javascript');
        scriptElement.setAttribute('src', filename);

        document.getElementsByTagName('head')[0].appendChild(scriptElement);
    }

    /**
     * Merges objects
     * @param {array} [objects] Array of objects to merge
     * @return {object} merged
     */
    var merge = function( objects ) {
        var joined = {},
            i;

        for( i in objects ){
            var top = objects[i],
                keys = Object.keys(top),
                j;

            for(j in keys){
                var inner = top[keys[j]];
                joined[keys[j]] = inner;
            }
        }

        return joined;
    }

    /**
     * Creates string containint HTML table with pixelized characters
     * @param {string} [word] Word to pixelize
     * @param {boolean} [bordered] `true` to show border around individual cell
     * @return {string} pixelized character in HTML table
     */
    var create = function( word, bordered ){ 

        var table            = '<table>{{content}}</table>',
            row              = '<tr>{{content}}</tr>',
            cell             = '<td class="{{class}}"></td>',
            characters       = word.split(''),
            tableconstructor = '',
            i;

        for(i in characters){
            var fontGroup      = current_font[characters[i]],
                rowconstructor = '',
                j;

            for(j in fontGroup){
                var fontChar        = fontGroup[j],
                    cellconstructor = '',
                    k;

                for(k in fontChar){
                    var pixel   = fontChar[k],
                        classes = pixel? 'red': 'white';

                    if(bordered){
                        classes += ' bordered';
                    }

                    cellconstructor += cell.replace('{{class}}', classes);
                }

                rowconstructor += row.replace('{{content}}', cellconstructor);
            }

            tableconstructor += table.replace('{{content}}', '<tbody>'+ rowconstructor + '</tbody>')
        }

        return '<div style="clear: left" >' + tableconstructor + '</div>';
    }

    /**
     * Loads `fontname`, the name of font matrix (defaults to `default`)
     * @param {string} [fontname] The name of font
     * @param {function} [callback] Callback function
     */
    var load = function( fontname, callback ){
        var files = ['lowercase', 'uppercase', 'numbers', 'nonalphanum'],
            i;

        if(filename == undefined)
            filename = 'default';

        for( i in files ){
            var filename = './matrices/' + fontname + '_' + files[i] + '.js';
            loadfile(filename);
        }

        var loadinterval = setInterval(function(){
            if( window[fontname + '_lowercase'] && 
                window[fontname + '_uppercase'] && 
                window[fontname + '_numbers'] && 
                window[fontname + '_nonalphanum'] ) {

                clearInterval(loadinterval);

                window.current_font = merge([ window[fontname + '_lowercase'], 
                                              window[fontname + '_uppercase'],
                                              window[fontname + '_numbers'],
                                              window[fontname + '_nonalphanum'] 
                                            ]);

                callback.call(this, create);
            }
            // not yet ...
        }, 10);
        
    }

    return {
        create: create,
        load: load
    }
})();