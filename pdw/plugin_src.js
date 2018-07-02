/**
 * PDW Toggle Toolbars v1.2
 * Url: http://www.neele.name
 * Author: Guido Neele
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 * Based on TinyMCE Wordpress plugin (Kitchen Sink)
 * 
 * Changes V1.1.1 --> V1.2
 * 
 * heeae made some modifications and posted his work on Sourceforge. I thought the cookie support 
 * was really handy so I updated the script.
 * http://sourceforge.net/tracker/?func=detail&atid=738747&aid=2904683&group_id=103281
 *
 * 1. Added cookie support.
 * 2. Some optimization
 * 3. Bug fix of fire ifr.clientHeight in FF 3 ( to DOM.getStyles)
 *
 * Thanks heeae!
 * 
 * Changes V1.1 --> V1.1.1
 *
 * Bugfix for Firefox 3.6. Caused error while loading script.
 *
 * Added lines 72 - 76:
 *
 * obj = ed.controlManager.get(tbIds[j]);
 * if(typeof obj =="undefined") {
 * 		continue;
 * }
 * id = obj.id;
 *
 * instead of:
 *
 * try {
 *		id = ed.controlManager.get(tbIds[j]).id;
 * }
 * catch(e) {
 * //if(typeof id == "undefined") continue;
 * 		continue;
 * }
 *
 * Thanks Anton for fixing this bug
 * 
 */
(function() {
	var $ = tinymce.dom.DomQuery;
	tinymce.PluginManager.requireLangPack('pdw');

    // Register plugin
	tinymce.PluginManager.add('pdw', function(editor, url) {
        // Split toolbars
        var toolbars = (editor.settings.pdw_toggle_toolbars).split(',');

        // Register pdw_toggle button
        editor.addButton('pdw', {
            text: 'Toggle kitchen sink',
            icon: false,
            onclick: function() {
                var id, Toggle_PDW;

                for(i = 0; i < toolbars.length; i++){
                    obj = $(".mce-toolbar")[toolbars[i] - 1];
                    if(typeof obj =="undefined") {
                        continue;
                    }
                    id = obj.id;

                    if (tinymce.DOM.isHidden(id)) {
                        Toggle_PDW = 0;
                        tinymce.DOM.show(id);
                        _resizeIframe(editor, -34);

                    } else {
                        Toggle_PDW = 1;
                        tinymce.DOM.hide(id);
                        _resizeIframe(editor, 34);
                    }
                }
                this.active(Toggle_PDW);
                editor.settings.pdw_toggle_on = Toggle_PDW;
            }
        });

        // Resizes the iframe by a relative height value
        function _resizeIframe(editor, dy) {
            var iframe = editor.getContentAreaContainer().firstChild;
            tinymce.DOM.setStyle(iframe, 'height', tinymce.DOM.getSize(iframe).h + dy);
        }

        /**
         * Returns information about the plugin as a name/value array.
         * The current keys are longname, author, authorurl, infourl and version.
         *
         * @return {Object} Name/value array containing information about the plugin.
         */
        return {
            getMetaData: function() {
                return {
                    name : 'PDW Toggle Toolbars',
                    author : 'Guido Neele',
                    authorurl : 'http://www.neele.name/',
                    infourl : 'http://www.neele.name/pdw_toggle_toolbars',
                    version : "1.2"
                }
            }
        };
    });
})();