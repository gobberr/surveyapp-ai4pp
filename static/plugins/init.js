var API = API || (function() {
    var _args = {}; // private
    var _func; // private

    return {
        init : function(Args,Func) {
            _args = Args;
            _func = Func();
        },
        getParams : function() {
            return _args;
        },
        getFunction : function() {
            return _func;
        }
    };
}());