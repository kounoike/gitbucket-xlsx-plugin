"use strict;"
require('../css/style.css')

var XLSX = require('xlsx')
var $ = require('jquery')

$(function(){
    var wrapper = $('#xlsx-wrapper')
    var url = decodeURIComponent(wrapper.attr("data-src"))

    var req = new XMLHttpRequest();
    req.open("GET", url, true);
    req.responseType = "arraybuffer";

    req.onload = function(e) {
        var data = new Uint8Array(req.response);
        var wb = XLSX.read(data, {type: "array"});

        var tabHtml = ""
        var contentHtml = ""
        for (var i = 0; i < wb.SheetNames.length; ++i) {
            var name = wb.SheetNames[i]
            if(i == 0){
                tabHtml = tabHtml + `<li class="active"><a href="#tab_${i}">${name}</a></li>`
                contentHtml = contentHtml + XLSX.utils.sheet_to_html(wb.Sheets[name], {
                    header: `<div class="tab-pane active" id="tab_${i}">`,
                    footer: "</div>"
                })
            }else{
                tabHtml = tabHtml + `<li><a href="#tab_${i}">${name}</a></li>`
                contentHtml = contentHtml + XLSX.utils.sheet_to_html(wb.Sheets[name], {
                    header: `<div class="tab-pane" id="tab_${i}">`,
                    footer: "</div>"
                })
            }
        }

        var html = `
<div class="nav-tabs-custom">
    <ul class="nav nav-tabs">
        ${tabHtml}
    </ul>
    <div class="tab-content">
        ${contentHtml}
    </div>
</div>`
        wrapper.html(html)
        $("#xlsx-wrapper a").on('click', (a) => {
            $("#xlsx-wrapper .active").removeClass("active")
            $(a.target).parent().addClass("active")

            var tabId = $(a.target).attr("href")
            $(`#xlsx-wrapper div${tabId}`).addClass("active")
            return false
        })

        $(`#xlsx-wrapper div.tab-content table`).addClass("table")
    }

    req.send();

})
