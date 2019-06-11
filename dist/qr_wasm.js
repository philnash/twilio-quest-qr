
(function() {
    var wasm;
    const __exports = {};
    
    
    let cachedEncoder = new TextEncoder('utf-8');
    
    let cachegetUint8Memory = null;
    function getUint8Memory() {
        if (cachegetUint8Memory === null || cachegetUint8Memory.buffer !== wasm.memory.buffer) {
            cachegetUint8Memory = new Uint8Array(wasm.memory.buffer);
        }
        return cachegetUint8Memory;
    }
    
    function passStringToWasm(arg) {
        
        const buf = cachedEncoder.encode(arg);
        const ptr = wasm.__wbindgen_malloc(buf.length);
        getUint8Memory().set(buf, ptr);
        return [ptr, buf.length];
    }
    
    let cachedDecoder = new TextDecoder('utf-8');
    
    function getStringFromWasm(ptr, len) {
        return cachedDecoder.decode(getUint8Memory().subarray(ptr, ptr + len));
    }
    
    let cachedGlobalArgumentPtr = null;
    function globalArgumentPtr() {
        if (cachedGlobalArgumentPtr === null) {
            cachedGlobalArgumentPtr = wasm.__wbindgen_global_argument_ptr();
        }
        return cachedGlobalArgumentPtr;
    }
    
    let cachegetUint32Memory = null;
    function getUint32Memory() {
        if (cachegetUint32Memory === null || cachegetUint32Memory.buffer !== wasm.memory.buffer) {
            cachegetUint32Memory = new Uint32Array(wasm.memory.buffer);
        }
        return cachegetUint32Memory;
    }
    /**
    * @param {string} arg0
    * @param {number} arg1
    * @param {number} arg2
    * @param {string} arg3
    * @param {string} arg4
    * @returns {string}
    */
    __exports.qrcode = function(arg0, arg1, arg2, arg3, arg4) {
        const [ptr0, len0] = passStringToWasm(arg0);
        const [ptr3, len3] = passStringToWasm(arg3);
        const [ptr4, len4] = passStringToWasm(arg4);
        const retptr = globalArgumentPtr();
        try {
            wasm.qrcode(retptr, ptr0, len0, arg1, arg2, ptr3, len3, ptr4, len4);
            const mem = getUint32Memory();
            const ptr = mem[retptr / 4];
            const len = mem[retptr / 4 + 1];
            
            const realRet = getStringFromWasm(ptr, len).slice();
            wasm.__wbindgen_free(ptr, len * 1);
            return realRet;
            
            
        } finally {
            wasm.__wbindgen_free(ptr0, len0 * 1);
            wasm.__wbindgen_free(ptr3, len3 * 1);
            wasm.__wbindgen_free(ptr4, len4 * 1);
            
        }
        
    };
    
    __exports.__wbindgen_throw = function(ptr, len) {
        throw new Error(getStringFromWasm(ptr, len));
    };
    
    function init(wasm_path) {
        return fetch(wasm_path)
        .then(response => response.arrayBuffer())
        .then(buffer => WebAssembly.instantiate(buffer, { './qr_wasm': __exports }))
        .then(({instance}) => {
            wasm = init.wasm = instance.exports;
            return;
        });
    };
    self.wasm_bindgen = Object.assign(init, __exports);
})();

