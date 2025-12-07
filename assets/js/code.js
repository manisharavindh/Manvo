window.onload = function () {
    for (var i = 0; i < document.getElementsByClassName("code").length; i++)
        document.getElementsByClassName("code")[i].style.height = document.querySelector(".code-editor").clientHeight - 40 + "px";

    let htmlEditor = ace.edit("html");
    htmlEditor.session.setMode("ace/mode/html");
    htmlEditor.setTheme("ace/theme/nord_dark");
    if (localStorage.getItem("lc-codepen-clone-html") == null)
        htmlEditor.session.setValue(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Manvo Code</title>
</head>
<body>
    <p id="msg"></p>
</body>
</html>`);
    else htmlEditor.session.setValue(localStorage.getItem("lc-codepen-clone-html"))
    htmlEditor.session.setUseWrapMode(true);
    htmlEditor.setShowPrintMargin(false);
    htmlEditor.setHighlightActiveLine(false);
    htmlEditor.session.on('change', function (delta) {
        update();
    });


    let cssEditor = ace.edit("css");
    cssEditor.session.setMode("ace/mode/css");
    cssEditor.setTheme("ace/theme/nord_dark");

    if (localStorage.getItem("lc-codepen-clone-css") == null)
        cssEditor.session.setValue(`body{
    height: 100%;
    display: grid;
    place-items: center;
    color: #5a4a42;
    background-color: #f5ede5;
    font-family: "Open Sans", sans-serif;
}

#msg{
    font-size: 2.5rem;
    font-weight: 900;
} 

#msg span{
    color: #e8a87c;
}`);
    else cssEditor.session.setValue(localStorage.getItem("lc-codepen-clone-css"))
    cssEditor.session.setUseWrapMode(true);
    cssEditor.setShowPrintMargin(false);
    cssEditor.setHighlightActiveLine(false);
    cssEditor.session.on('change', function (delta) {
        update();
    });

    let jsEditor = ace.edit("javascript");
    jsEditor.session.setMode("ace/mode/javascript");
    jsEditor.setTheme("ace/theme/nord_dark");
    if (localStorage.getItem("lc-codepen-clone-js") == null)
        jsEditor.session.setValue(`var h1 = document.getElementById('msg');

h1.innerHTML = 'Welcome To <span>Manvo</span> Code';`);
    else
        jsEditor.session.setValue(localStorage.getItem("lc-codepen-clone-js"))
    jsEditor.session.setUseWrapMode(true);
    jsEditor.setShowPrintMargin(false);
    jsEditor.setHighlightActiveLine(false);
    jsEditor.session.on('change', function (delta) {
        update();
    });
    update();

    function update() {
        let output = document.querySelector(".output .virtual-iframe").contentWindow.document;
        console.log(output)
        output.open();
        output.write("<style>" + cssEditor.getValue() + "</style>" + htmlEditor.getValue() + "<script>" + jsEditor.getValue() + "</script>");
        output.close();
        localStorage.setItem("lc-codepen-clone-html", htmlEditor.getValue())
        localStorage.setItem("lc-codepen-clone-css", cssEditor.getValue())
        localStorage.setItem("lc-codepen-clone-js", jsEditor.getValue())
    }

    window.addEventListener("resize", e => {
        for (var i = 0; i < document.getElementsByClassName("code").length; i++)
            document.getElementsByClassName("code")[i].style.height = document.querySelector(".code-editor").clientHeight - 40 + "px";
        htmlEditor.resize();
        cssEditor.resize();
        jsEditor.resize();
    })

    let layout = 0;

    document.querySelector(".change-layout").addEventListener("click", function () {
        layout++;
        if (layout > 1) layout = 0;
        changeLayout();
    })

    function changeLayout() {
        switch (layout) {
            case 0:
                document.querySelector(".coder").classList.add("view1")
                document.querySelector(".coder").classList.remove("view2")
                document.querySelector(".container").classList.add("view1")
                document.querySelector(".container").classList.remove("view2")

                for (var i = 0; i < document.getElementsByClassName("code").length; i++) {
                    document.getElementsByClassName("code")[i].style.maxHeight = "unset";
                    document.getElementsByClassName("code")[i].style.height = document.querySelector(".code-editor").clientHeight - 40 + "px";
                }
                htmlEditor.resize();
                cssEditor.resize();
                jsEditor.resize();
                break;
            case 1:
                document.querySelector(".coder").classList.add("view2")
                document.querySelector(".coder").classList.remove("view1")
                document.querySelector(".container").classList.add("view2")
                document.querySelector(".container").classList.remove("view1")

                for (var i = 0; i < document.getElementsByClassName("code").length; i++) {
                    document.getElementsByClassName("code")[i].style.height = document.querySelector(".code-editor").clientHeight - 40 + "px";
                    document.getElementsByClassName("code")[i].style.maxHeight = "194px";
                }
                htmlEditor.resize();
                cssEditor.resize();
                jsEditor.resize();
                break;
        }
    }
}



if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) 
    || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) 
    alert("Please Visit Our Website on Desktop For Better Experience!");