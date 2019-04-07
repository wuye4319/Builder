/**
 * Created by nero on 2016/12/10.
 */
'use strict';
const myreflux = {
    objarr: {},
    temparr:{},
    centerstore:{},
    result:{},
    on: function(key, fn) {
        if(this.objarr[key] === undefined){
            this.objarr[key] = [];
            this.result[key] = [];
        }
        this.objarr[key].push(fn);
    },
    one:function (key,fn) {
        if(this.temparr[key] === undefined){
            this.temparr[key] = [];
            this.result[key] = [];
        }
        this.temparr[key].push(fn);
    },
    setdata:function (key,state) {
        this.centerstore[key]=state;
    },
    getdata:function (key) {
        return this.centerstore[key];
    },
    cleardata:function (key) {
        this.centerstore[key]=[];
    },
    off: function(key) {
        this.objarr[key] = [];
        this.temparr[key]=[];
    },
    store:function () {
        console.log(this.centerstore);
        console.log(this.objarr,this.temparr);
        window.reflux.store=[this.objarr,this.temparr,this.centerstore];
    },
    trigger: function() {
        var key,args;
        var objarr=this.objarr;
        var temparr=this.temparr;
        var result=this.result;
        if(arguments.length==0) return false;
        key=arguments[0];
        args = [].concat(Array.prototype.slice.call(arguments, 1));
        //apply
        if(objarr[key] !== undefined && objarr[key].length>0){
            for(let i in objarr[key]) {
                result[key][i]=objarr[key][i].apply(null,args);
            }
        }
        if(temparr[key] !== undefined && temparr[key].length>0){
            for(let i in temparr[key]) {
                result[key][i]=temparr[key][i].apply(null,args);
                temparr[key][i] = undefined;
            }
            temparr[key]=[];
        }
        return result[key];
    }
};

export default myreflux;