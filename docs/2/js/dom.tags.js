(function(){
//const protoOf = Object.getPrototypeOf;
//const alwaysConnectedDom = { isConnected: 1 };
//const objProto = protoOf(alwaysConnectedDom);
const tag = (ns, name, ...args) => {
//    console.warn(protoOf(args[0] ?? 0) === objProto, args[0])
    //const [{ is, ...props }, ...children] = protoOf(args[0] ?? 0) === objProto ? args : [{}, ...args];
    //const [{is, ...props}, ...children] = 0<args.length && 'object'===typeof args[0] && '[object Object]'===Object.prototype.toString(args[0]) ? args : [{}, ...args];
    const [{is, ...props}, ...children] = 0<args.length && 'object'===typeof args[0] && '[object Object]'===Object.prototype.toString.call(args[0]) ? args : [{}, ...args];
    console.log(is, props, children)

    const dom = ns ? document.createElementNS(ns, name, {is}) : document.createElement(name, {is})
    for (let [k, v] of Object.entries(props)) {
        if ('listeners'===k) {props.listeners.map(l=>dom.listen(...l))}
        else {dom.setAttribute(k, v);}
    }
    dom.append(...children.map(c=>c));
    console.log(dom)
    return dom;
}
let observer = null;
const autoRemove = (container)=> {
    if (observer) {return}
    const logChanges = (records, observer) => {
        for (const record of records) {
            for (const addedNode of record.addedNodes) {
                console.log(`追加:${addedNode.tagName} ${addedNode.textContent}`)
    //            log.textContent = `追加: ${addedNode.textContent}\n${log.textContent}`;
            }
            for (const removedNode of record.removedNodes) {
                console.log(removedNode)
                console.log(`削除:${removedNode.tagName} ${removedNode.textContent}`)
    //            log.textContent = `除去: ${removedNode.textContent}\n${log.textContent}`;
            }
            /*
            if (record.target.childNodes.length === 0) {
                console.log(`切断しました。`)
    //            log.textContent = `切断しました\n${log.textContent}`;
                observer.disconnect();
            }
            */
            console.log(record.target.childNodes.length);
        }
    }
    //const observer = new MutationObserver(logChanges);
    observer = new MutationObserver(logChanges);
    observer.observe(container ?? document.body , {
        childList: true,
        subtree: true,
    });
    console.log('autoRemove!!')
}
//const handler = ns => ({get: (_, name) => tag.bind(undefined, ns, name)})
const handler = ns => ({get: (_, name) => tag.bind(undefined, ns, name)})
window.Dom = {tags: new Proxy(ns => new Proxy(tag, handler(ns)), handler()), autoRemove:autoRemove};
console.log(Dom)
})();
