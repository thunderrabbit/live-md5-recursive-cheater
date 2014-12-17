(function () {
    'use strict';
    var pending = false, inp, md5, md5s, othermd5s, variants;
    var divReplaceWhat, checkboxCollection;
    var smallToBig, bigToSmall, spaceToNone, r = {};   // r = replacements

    /**
     * From http://stackoverflow.com/a/171256/194309
     * Overwrites obj1's values with obj2's and adds obj2's if non existent in obj1
     * @param obj1
     * @param obj2
     * @returns obj3 a new object based on obj1 and obj2
     */
    function merge_objects(obj1,obj2){
        var obj3 = {};
        for (var attrname in obj1) { obj3[attrname] = obj1[attrname]; }
        for (var attrname in obj2) { obj3[attrname] = obj2[attrname]; }
        return obj3;
    }
    
    function calcVariants(variants) {
        var txt, md5, str, regex, desired, regexcellent;
        regex = new RegExp(/\d$/);
        desired = document.getElementById("desired").value;

        regexcellent = new RegExp(desired + "$");
        for(var i=0; i<variants.length; i++) {
            txt = variants[i];
            md5 = CryptoJS.MD5(txt);
            str = md5.toString();

            if(str.match(regexcellent)) {
                md5s.innerHTML += "<span><pre>\"`" + txt + "`\" (" + desired + ")</pre></span><p class='nice'>" + md5 + "</p>";
//            } else if(str.match(regex)) {
//                othermd5s.innerHTML += "<span>" + txt + "</span><p>" + md5 + "</p>";
            }
        }
    }
    function veryRecurse(txt) {
        var tweak = [], p, first, remain, variants, tweaks;
        if(!txt || txt.length === 0) return [];

        if(txt.length ===1) {
            tweak.push(txt);
            for(p in r[txt]) {
                tweak.push(r[txt][p]);
            }
            return tweak;
        } else {
            first = txt[0];
            remain = txt.slice(1);
            variants = veryRecurse(remain);
            for(tweaks in variants) {
                tweak.push(first + variants[tweaks]);
                for(p in r[first]) {
                    tweak.push(r[first][p] + variants[tweaks]);
                }
            }
            return tweak;
        }
    }
    function makeVariants(txt) {
        var len;
        variants = [];
        md5s.innerHTML = "";
        othermd5s.innerHTML = "";
        variants = veryRecurse(txt);
        calcVariants(variants);
    }

    function calc() {
        var txt;
        if (pending) {
            txt = inp.value.trim();
            md5.innerHTML = txt === "" ? "" : CryptoJS.MD5(txt);
            makeVariants(txt);
            pending = false;
        }
    }
    function queue() {
        if (!pending) {
            pending = true;
            calc();
        }
    }
    inp = document.getElementById("inp");
    md5 = document.getElementById("md5");
    md5s = document.getElementById("md5s");
    othermd5s = document.getElementById("othermd5s");
    divReplaceWhat = document.getElementById("replace-what");
    inp.onkeyup = queue;

    smallToBig = {
        a:['A','@'],
        b:['B'],
        c:['C'],
        d:['D'],
        e:['E'],
        f:['F'],
        g:['G'],
        h:['H'],
        i:['I'],
        j:['J'],
        k:['K'],
        l:['L'],
        m:['M'],
        n:['N'],
        o:['O'],
        p:['P'],
        q:['Q'],
        r:['R'],
        s:['S'],
        t:['T'],
        u:['U'],
        v:['V'],
        w:['W'],
        x:['X'],
        y:['Y'],
        z:['Z']
    };
    bigToSmall = {
        A:['a','@'],
        B:['b'],
        C:['c'],
        D:['d'],
        E:['e'],
        F:['f'],
        G:['g'],
        H:['h'],
        I:['i'],
        J:['j'],
        K:['k'],
        L:['l'],
        M:['m'],
        N:['n'],
        O:['o'],
        P:['p'],
        Q:['q'],
        R:['r'],
        S:['s'],
        T:['t'],
        U:['u'],
        V:['v'],
        W:['w'],
        X:['x'],
        Y:['y'],
        Z:['z']
    };
    spaceToNone = {};
    spaceToNone[' '] = [''];

    var collection = divReplaceWhat.getElementsByTagName('INPUT');
    for (var x=0; x<collection.length; x++) {
        if (collection[x].type.toUpperCase()=='CHECKBOX')
            collection[x].addEventListener("click",setReplaceObject);
    }

    function setReplaceObject() {
        r = {};
        if(document.getElementById('bigToSmall').checked && document.getElementById('smallToBig').checked && document.getElementById('spaceToNone').checked) {
            r = merge_objects(merge_objects(bigToSmall,smallToBig),spaceToNone);
        } else if(document.getElementById('bigToSmall').checked && document.getElementById('smallToBig').checked) {
            r = merge_objects(bigToSmall,smallToBig);
        } else if(document.getElementById('bigToSmall').checked && document.getElementById('spaceToNone').checked) {
            r = merge_objects(smallToBig,spaceToNone);
        } else if(document.getElementById('smallToBig').checked && document.getElementById('spaceToNone').checked) {
            r = merge_objects(smallToBig,spaceToNone);
        } else if(document.getElementById('bigToSmall').checked) {
            r = bigToSmall;
        } else if(document.getElementById('smallToBig').checked) {
            r = smallToBig;
        } else if(document.getElementById('spaceToNone').checked) {
            r = spaceToNone;
        } else {
            r = {};
        }
    }

    setReplaceObject();
    
})();


