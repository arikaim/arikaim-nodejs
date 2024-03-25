'use strict';
/**
 * Arikaim
 *
 * @link        http://www.arikaim.com
 * @copyright   Copyright (c)  Intersoft Ltd <info@arikaim.com>
 * @license     http://www.arikaim.com/license.html
 * 
*/

export default function ComponentTag() {
    this.tags = ['component'];

    this.parse = function(parser, nodes, lexer) {
        var token = parser.nextToken();

        var args = parser.parseSignature(null, true);
        parser.advanceAfterBlockEnd(token.value);

        var content = parser.parseUntilBlocks('component','endcomponent');
        parser.advanceAfterBlockEnd();

        return new nodes.CallExtension(this,'run',args,[content]);
    };

    this.run = function(context, name, bodyCallback) {
        var html = view.renderComponent(name,{ 
            content: bodyCallback()
        });
        return html;
    };
}
