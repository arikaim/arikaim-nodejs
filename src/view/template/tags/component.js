'use strict';
/**
 * Arikaim
 *
 * @link        http://www.arikaim.com
 * @copyright   Copyright (c)  Intersoft Ltd <info@arikaim.com>
 * @license     http://www.arikaim.com/license.html
 * 
*/


export default function componentTag() {
    this.tags = ['component'];

    this.parse = function(parser, nodes, lexer) {
        var tok = parser.nextToken();

        var args = parser.parseSignature(null, true);
        parser.advanceAfterBlockEnd(tok.value);

        var body = parser.parseUntilBlocks('error','endcomponent');
        var errorBody = null;

        if(parser.skipSymbol('error')) {
            parser.skip(lexer.TOKEN_BLOCK_END);
            errorBody = parser.parseUntilBlocks('endcomponent');
        }

        parser.advanceAfterBlockEnd();


        return new nodes.CallExtension(this, 'run', args,[body, errorBody]);
    };

    this.run = function(context, url, body, errorBody) {

        return body;
    };
}