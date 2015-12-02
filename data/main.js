(function () {
    var head = document.getElementsByTagName("head")[0], script;
    
    script = document.createElement("script");
    script.type = "text/x-mathjax-config";
    script.innerHTML = 'MathJax.Hub.Config({\n' +
                       '    tex2jax: { inlineMath: [["$", "$"], ["\\\\(", "\\\\)"]] }\n' +
                       '});';
    head.appendChild(script);
    
    script = document.createElement("script");
    script.type = "text/javascript";
    script.src  = "https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML";
    head.appendChild(script);
    
    script = document.createElement("script");
    script.type = "text/javascript";
    script.innerHTML = '(function () {\n' +
                       '    var observer = new MutationObserver(function (mutations) {\n' +
                       '        mutations.forEach(function (mutation) {\n' +
                       '            [].forEach.call(mutation.addedNodes, function(node) {\n' +
                       '                var className = node.className || "";\n' +
                       '                if (/msg/.test(className) || /pane/.test(className)) {\n' +
                       '                    MathJax.Hub.Queue(["Typeset", MathJax.Hub, node]);\n' +
                       '                }\n' +
                       '            });\n' +
                       '        });\n' +
                       '    });\n' +
                       '    observer.observe(document, {childList: true, subtree: true});\n' +
                       '})();';
    head.appendChild(script);
})();
