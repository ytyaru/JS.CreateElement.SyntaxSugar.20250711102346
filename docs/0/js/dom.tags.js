(function(){
//const protoOf = Object.getPrototypeOf;
const tag = (ns, name, ...args) => {
    //const [{is, ...props}, ...children] = protoOf(args[0] ?? 0) === objProto ? args : [{}, ...args]
    const [{is, ...props}, ...children] = 0<args.length && 'object'===typeof args[0] && '[object Object]'===Object.prototype.toString(args[0]) ? args : [{}, ...args]
    const dom = ns ? document.createElementNS(ns, name, {is}) : document.createElement(name, {is})
    for (let [k, v] of Object.entries(props)) {
        // listeners: [['name', handler, useCapture], ['click', (e)=>{}, false]]
        if ('listeners'===k) {props.listeners.map(l=>dom.listen(...l))}
        else {dom.setAttribute(k, v);}
        /*
        if (k.startsWith('on')) {
            const event = k.slice(2)
            dom.removeEventListener(event, oldV)
            dom.addEventListener(event, v)
        }
        */
        /*
        let getPropDescriptor = proto => proto ?
            Object.getOwnPropertyDescriptor(proto, k) ?? getPropDescriptor(protoOf(proto)) :
            _undefined
        let cacheKey = name + "," + k
        let propSetter = propSetterCache[cacheKey] ??= getPropDescriptor(protoOf(dom))?.set ?? 0
        let setter = k.startsWith("on") ?
            (v, oldV) => {
                let event = k.slice(2)
                dom.removeEventListener(event, oldV)
                dom.addEventListener(event, v)
            } :
            propSetter ? propSetter.bind(dom) : dom.setAttribute.bind(dom, k)
        let protoOfV = protoOf(v ?? 0)
        k.startsWith("on") || protoOfV === funcProto && (v = derive(v), protoOfV = stateProto)
        protoOfV === stateProto ? bind(() => (setter(v.val, v._oldVal), dom)) : setter(v)
        */
    }
    //return add(dom, children)
    dom.append(...children.map(c=>c));
    return dom;
}

/*
const bind = (f, dom) => {
    let deps = {_getters: new Set, _setters: new Set}, binding = {f}, prevNewDerives = curNewDerives;
    curNewDerives = [];
    let newDom = runAndCaptureDeps(f, deps, dom)
    newDom = (newDom ?? document).nodeType ? newDom : new Text(newDom)
    for (let d of deps._getters)
    deps._setters.has(d) || (addStatesToGc(d), d._bindings.push(binding))
    for (let l of curNewDerives) l._dom = newDom
    curNewDerives = prevNewDerives
    return binding._dom = newDom
}
*/

//const handler = ns => ({get: (_, name) => tag.bind(_undefined, ns, name)})
const handler = ns => ({get: (_, name) => tag.bind(undefined, ns, name)})
window.Dom = {tags: new Proxy(ns => new Proxy(tag, handler(ns)), handler())};
console.log(Dom)
})();
