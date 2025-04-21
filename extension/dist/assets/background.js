var Vg=Object.defineProperty;var Lg=(e,t,r)=>t in e?Vg(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r;var lo=(e,t,r)=>Lg(e,typeof t!="symbol"?t+"":t,r);/*!
 * ONNX Runtime Web v1.21.0
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */var Sa=Object.defineProperty,Gg=Object.getOwnPropertyDescriptor,Hg=Object.getOwnPropertyNames,Fg=Object.prototype.hasOwnProperty,jg=(e=>typeof require<"u"?require:typeof Proxy<"u"?new Proxy(e,{get:(t,r)=>(typeof require<"u"?require:t)[r]}):e)(function(e){if(typeof require<"u")return require.apply(this,arguments);throw Error('Dynamic require of "'+e+'" is not supported')}),q=(e,t)=>()=>(e&&(t=e(e=0)),t),lr=(e,t)=>{for(var r in t)Sa(e,r,{get:t[r],enumerable:!0})},Kg=(e,t,r,a)=>{if(t&&typeof t=="object"||typeof t=="function")for(let s of Hg(t))!Fg.call(e,s)&&s!==r&&Sa(e,s,{get:()=>t[s],enumerable:!(a=Gg(t,s))||a.enumerable});return e},Dr=e=>Kg(Sa({},"__esModule",{value:!0}),e),Kt,ht,Dt,po,Ld,Gd=q(()=>{Kt=new Map,ht=[],Dt=(e,t,r)=>{if(t&&typeof t.init=="function"&&typeof t.createInferenceSessionHandler=="function"){let a=Kt.get(e);if(a===void 0)Kt.set(e,{backend:t,priority:r});else{if(a.priority>r)return;if(a.priority===r&&a.backend!==t)throw new Error(`cannot register backend "${e}" using priority ${r}`)}if(r>=0){let s=ht.indexOf(e);s!==-1&&ht.splice(s,1);for(let i=0;i<ht.length;i++)if(Kt.get(ht[i]).priority<=r){ht.splice(i,0,e);return}ht.push(e)}return}throw new TypeError("not a valid backend")},po=async e=>{let t=Kt.get(e);if(!t)return"backend not found.";if(t.initialized)return t.backend;if(t.aborted)return t.error;{let r=!!t.initPromise;try{return r||(t.initPromise=t.backend.init(e)),await t.initPromise,t.initialized=!0,t.backend}catch(a){return r||(t.error=`${a}`,t.aborted=!0),t.error}finally{delete t.initPromise}}},Ld=async e=>{let t=e.executionProviders||[],r=t.map(d=>typeof d=="string"?d:d.name),a=r.length===0?ht:r,s,i=[],o=new Set;for(let d of a){let p=await po(d);typeof p=="string"?i.push({name:d,err:p}):(s||(s=p),s===p&&o.add(d))}if(!s)throw new Error(`no available backend found. ERR: ${i.map(d=>`[${d.name}] ${d.err}`).join(", ")}`);for(let{name:d,err:p}of i)r.includes(d)&&console.warn(`removing requested execution provider "${d}" from session options because it is not available: ${p}`);let l=t.filter(d=>o.has(typeof d=="string"?d:d.name));return[s,new Proxy(e,{get:(d,p)=>p==="executionProviders"?l:Reflect.get(d,p)})]}}),Qg=q(()=>{Gd()}),Hd,Zg=q(()=>{Hd="1.21.0"}),fi,Ve,Fd=q(()=>{Zg(),fi="warning",Ve={wasm:{},webgl:{},webgpu:{},versions:{common:Hd},set logLevel(e){if(e!==void 0){if(typeof e!="string"||["verbose","info","warning","error","fatal"].indexOf(e)===-1)throw new Error(`Unsupported logging level: ${e}`);fi=e}},get logLevel(){return fi}},Object.defineProperty(Ve,"logLevel",{enumerable:!0})}),$e,Xg=q(()=>{Fd(),$e=Ve}),jd,Kd,Jg=q(()=>{jd=(e,t)=>{let r=typeof document<"u"?document.createElement("canvas"):new OffscreenCanvas(1,1);r.width=e.dims[3],r.height=e.dims[2];let a=r.getContext("2d");if(a!=null){let s,i;(t==null?void 0:t.tensorLayout)!==void 0&&t.tensorLayout==="NHWC"?(s=e.dims[2],i=e.dims[3]):(s=e.dims[3],i=e.dims[2]);let o=(t==null?void 0:t.format)!==void 0?t.format:"RGB",l=t==null?void 0:t.norm,d,p;l===void 0||l.mean===void 0?d=[255,255,255,255]:typeof l.mean=="number"?d=[l.mean,l.mean,l.mean,l.mean]:(d=[l.mean[0],l.mean[1],l.mean[2],0],l.mean[3]!==void 0&&(d[3]=l.mean[3])),l===void 0||l.bias===void 0?p=[0,0,0,0]:typeof l.bias=="number"?p=[l.bias,l.bias,l.bias,l.bias]:(p=[l.bias[0],l.bias[1],l.bias[2],0],l.bias[3]!==void 0&&(p[3]=l.bias[3]));let g=i*s,f=0,y=g,_=g*2,w=-1;o==="RGBA"?(f=0,y=g,_=g*2,w=g*3):o==="RGB"?(f=0,y=g,_=g*2):o==="RBG"&&(f=0,_=g,y=g*2);for(let b=0;b<i;b++)for(let k=0;k<s;k++){let v=(e.data[f++]-p[0])*d[0],$=(e.data[y++]-p[1])*d[1],T=(e.data[_++]-p[2])*d[2],S=w===-1?255:(e.data[w++]-p[3])*d[3];a.fillStyle="rgba("+v+","+$+","+T+","+S+")",a.fillRect(k,b,1,1)}if("toDataURL"in r)return r.toDataURL();throw new Error("toDataURL is not supported")}else throw new Error("Can not access image data")},Kd=(e,t)=>{let r=typeof document<"u"?document.createElement("canvas").getContext("2d"):new OffscreenCanvas(1,1).getContext("2d"),a;if(r!=null){let s,i,o;(t==null?void 0:t.tensorLayout)!==void 0&&t.tensorLayout==="NHWC"?(s=e.dims[2],i=e.dims[1],o=e.dims[3]):(s=e.dims[3],i=e.dims[2],o=e.dims[1]);let l=t!==void 0&&t.format!==void 0?t.format:"RGB",d=t==null?void 0:t.norm,p,g;d===void 0||d.mean===void 0?p=[255,255,255,255]:typeof d.mean=="number"?p=[d.mean,d.mean,d.mean,d.mean]:(p=[d.mean[0],d.mean[1],d.mean[2],255],d.mean[3]!==void 0&&(p[3]=d.mean[3])),d===void 0||d.bias===void 0?g=[0,0,0,0]:typeof d.bias=="number"?g=[d.bias,d.bias,d.bias,d.bias]:(g=[d.bias[0],d.bias[1],d.bias[2],0],d.bias[3]!==void 0&&(g[3]=d.bias[3]));let f=i*s;if(t!==void 0&&(t.format!==void 0&&o===4&&t.format!=="RGBA"||o===3&&t.format!=="RGB"&&t.format!=="BGR"))throw new Error("Tensor format doesn't match input tensor dims");let y=4,_=0,w=1,b=2,k=3,v=0,$=f,T=f*2,S=-1;l==="RGBA"?(v=0,$=f,T=f*2,S=f*3):l==="RGB"?(v=0,$=f,T=f*2):l==="RBG"&&(v=0,T=f,$=f*2),a=r.createImageData(s,i);for(let C=0;C<i*s;_+=y,w+=y,b+=y,k+=y,C++)a.data[_]=(e.data[v++]-g[0])*p[0],a.data[w]=(e.data[$++]-g[1])*p[1],a.data[b]=(e.data[T++]-g[2])*p[2],a.data[k]=S===-1?255:(e.data[S++]-g[3])*p[3]}else throw new Error("Can not access image data");return a}}),$r,Qd,Zd,Xd,Jd,Yd,Yg=q(()=>{Ta(),$r=(e,t)=>{if(e===void 0)throw new Error("Image buffer must be defined");if(t.height===void 0||t.width===void 0)throw new Error("Image height and width must be defined");if(t.tensorLayout==="NHWC")throw new Error("NHWC Tensor layout is not supported yet");let{height:r,width:a}=t,s=t.norm??{mean:255,bias:0},i,o;typeof s.mean=="number"?i=[s.mean,s.mean,s.mean,s.mean]:i=[s.mean[0],s.mean[1],s.mean[2],s.mean[3]??255],typeof s.bias=="number"?o=[s.bias,s.bias,s.bias,s.bias]:o=[s.bias[0],s.bias[1],s.bias[2],s.bias[3]??0];let l=t.format!==void 0?t.format:"RGBA",d=t.tensorFormat!==void 0&&t.tensorFormat!==void 0?t.tensorFormat:"RGB",p=r*a,g=d==="RGBA"?new Float32Array(p*4):new Float32Array(p*3),f=4,y=0,_=1,w=2,b=3,k=0,v=p,$=p*2,T=-1;l==="RGB"&&(f=3,y=0,_=1,w=2,b=-1),d==="RGBA"?T=p*3:d==="RBG"?(k=0,$=p,v=p*2):d==="BGR"&&($=0,v=p,k=p*2);for(let S=0;S<p;S++,y+=f,w+=f,_+=f,b+=f)g[k++]=(e[y]+o[0])/i[0],g[v++]=(e[_]+o[1])/i[1],g[$++]=(e[w]+o[2])/i[2],T!==-1&&b!==-1&&(g[T++]=(e[b]+o[3])/i[3]);return d==="RGBA"?new De("float32",g,[1,4,r,a]):new De("float32",g,[1,3,r,a])},Qd=async(e,t)=>{let r=typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement,a=typeof ImageData<"u"&&e instanceof ImageData,s=typeof ImageBitmap<"u"&&e instanceof ImageBitmap,i=typeof e=="string",o,l=t??{},d=()=>{if(typeof document<"u")return document.createElement("canvas");if(typeof OffscreenCanvas<"u")return new OffscreenCanvas(1,1);throw new Error("Canvas is not supported")},p=g=>typeof HTMLCanvasElement<"u"&&g instanceof HTMLCanvasElement||g instanceof OffscreenCanvas?g.getContext("2d"):null;if(r){let g=d();g.width=e.width,g.height=e.height;let f=p(g);if(f!=null){let y=e.height,_=e.width;if(t!==void 0&&t.resizedHeight!==void 0&&t.resizedWidth!==void 0&&(y=t.resizedHeight,_=t.resizedWidth),t!==void 0){if(l=t,t.tensorFormat!==void 0)throw new Error("Image input config format must be RGBA for HTMLImageElement");l.tensorFormat="RGBA",l.height=y,l.width=_}else l.tensorFormat="RGBA",l.height=y,l.width=_;f.drawImage(e,0,0),o=f.getImageData(0,0,_,y).data}else throw new Error("Can not access image data")}else if(a){let g,f;if(t!==void 0&&t.resizedWidth!==void 0&&t.resizedHeight!==void 0?(g=t.resizedHeight,f=t.resizedWidth):(g=e.height,f=e.width),t!==void 0&&(l=t),l.format="RGBA",l.height=g,l.width=f,t!==void 0){let y=d();y.width=f,y.height=g;let _=p(y);if(_!=null)_.putImageData(e,0,0),o=_.getImageData(0,0,f,g).data;else throw new Error("Can not access image data")}else o=e.data}else if(s){if(t===void 0)throw new Error("Please provide image config with format for Imagebitmap");let g=d();g.width=e.width,g.height=e.height;let f=p(g);if(f!=null){let y=e.height,_=e.width;return f.drawImage(e,0,0,_,y),o=f.getImageData(0,0,_,y).data,l.height=y,l.width=_,$r(o,l)}else throw new Error("Can not access image data")}else{if(i)return new Promise((g,f)=>{let y=d(),_=p(y);if(!e||!_)return f();let w=new Image;w.crossOrigin="Anonymous",w.src=e,w.onload=()=>{y.width=w.width,y.height=w.height,_.drawImage(w,0,0,y.width,y.height);let b=_.getImageData(0,0,y.width,y.height);l.height=y.height,l.width=y.width,g($r(b.data,l))}});throw new Error("Input data provided is not supported - aborted tensor creation")}if(o!==void 0)return $r(o,l);throw new Error("Input data provided is not supported - aborted tensor creation")},Zd=(e,t)=>{let{width:r,height:a,download:s,dispose:i}=t,o=[1,a,r,4];return new De({location:"texture",type:"float32",texture:e,dims:o,download:s,dispose:i})},Xd=(e,t)=>{let{dataType:r,dims:a,download:s,dispose:i}=t;return new De({location:"gpu-buffer",type:r??"float32",gpuBuffer:e,dims:a,download:s,dispose:i})},Jd=(e,t)=>{let{dataType:r,dims:a,download:s,dispose:i}=t;return new De({location:"ml-tensor",type:r??"float32",mlTensor:e,dims:a,download:s,dispose:i})},Yd=(e,t,r)=>new De({location:"cpu-pinned",type:e,data:t,dims:r??[t.length]})}),St,ir,mi,ep,ey=q(()=>{St=new Map([["float32",Float32Array],["uint8",Uint8Array],["int8",Int8Array],["uint16",Uint16Array],["int16",Int16Array],["int32",Int32Array],["bool",Uint8Array],["float64",Float64Array],["uint32",Uint32Array],["int4",Uint8Array],["uint4",Uint8Array]]),ir=new Map([[Float32Array,"float32"],[Uint8Array,"uint8"],[Int8Array,"int8"],[Uint16Array,"uint16"],[Int16Array,"int16"],[Int32Array,"int32"],[Float64Array,"float64"],[Uint32Array,"uint32"]]),mi=!1,ep=()=>{if(!mi){mi=!0;let e=typeof BigInt64Array<"u"&&BigInt64Array.from,t=typeof BigUint64Array<"u"&&BigUint64Array.from,r=globalThis.Float16Array,a=typeof r<"u"&&r.from;e&&(St.set("int64",BigInt64Array),ir.set(BigInt64Array,"int64")),t&&(St.set("uint64",BigUint64Array),ir.set(BigUint64Array,"uint64")),a?(St.set("float16",r),ir.set(r,"float16")):St.set("float16",Uint16Array)}}}),tp,rp,ty=q(()=>{Ta(),tp=e=>{let t=1;for(let r=0;r<e.length;r++){let a=e[r];if(typeof a!="number"||!Number.isSafeInteger(a))throw new TypeError(`dims[${r}] must be an integer, got: ${a}`);if(a<0)throw new RangeError(`dims[${r}] must be a non-negative integer, got: ${a}`);t*=a}return t},rp=(e,t)=>{switch(e.location){case"cpu":return new De(e.type,e.data,t);case"cpu-pinned":return new De({location:"cpu-pinned",data:e.data,type:e.type,dims:t});case"texture":return new De({location:"texture",texture:e.texture,type:e.type,dims:t});case"gpu-buffer":return new De({location:"gpu-buffer",gpuBuffer:e.gpuBuffer,type:e.type,dims:t});case"ml-tensor":return new De({location:"ml-tensor",mlTensor:e.mlTensor,type:e.type,dims:t});default:throw new Error(`tensorReshape: tensor location ${e.location} is not supported`)}}}),De,Ta=q(()=>{Jg(),Yg(),ey(),ty(),De=class{constructor(e,t,r){ep();let a,s;if(typeof e=="object"&&"location"in e)switch(this.dataLocation=e.location,a=e.type,s=e.dims,e.location){case"cpu-pinned":{let o=St.get(a);if(!o)throw new TypeError(`unsupported type "${a}" to create tensor from pinned buffer`);if(!(e.data instanceof o))throw new TypeError(`buffer should be of type ${o.name}`);this.cpuData=e.data;break}case"texture":{if(a!=="float32")throw new TypeError(`unsupported type "${a}" to create tensor from texture`);this.gpuTextureData=e.texture,this.downloader=e.download,this.disposer=e.dispose;break}case"gpu-buffer":{if(a!=="float32"&&a!=="float16"&&a!=="int32"&&a!=="int64"&&a!=="uint32"&&a!=="uint8"&&a!=="bool"&&a!=="uint4"&&a!=="int4")throw new TypeError(`unsupported type "${a}" to create tensor from gpu buffer`);this.gpuBufferData=e.gpuBuffer,this.downloader=e.download,this.disposer=e.dispose;break}case"ml-tensor":{if(a!=="float32"&&a!=="float16"&&a!=="int32"&&a!=="int64"&&a!=="uint32"&&a!=="uint64"&&a!=="int8"&&a!=="uint8"&&a!=="bool"&&a!=="uint4"&&a!=="int4")throw new TypeError(`unsupported type "${a}" to create tensor from MLTensor`);this.mlTensorData=e.mlTensor,this.downloader=e.download,this.disposer=e.dispose;break}default:throw new Error(`Tensor constructor: unsupported location '${this.dataLocation}'`)}else{let o,l;if(typeof e=="string")if(a=e,l=r,e==="string"){if(!Array.isArray(t))throw new TypeError("A string tensor's data must be a string array.");o=t}else{let d=St.get(e);if(d===void 0)throw new TypeError(`Unsupported tensor type: ${e}.`);if(Array.isArray(t)){if(e==="float16"&&d===Uint16Array||e==="uint4"||e==="int4")throw new TypeError(`Creating a ${e} tensor from number array is not supported. Please use ${d.name} as data.`);e==="uint64"||e==="int64"?o=d.from(t,BigInt):o=d.from(t)}else if(t instanceof d)o=t;else if(t instanceof Uint8ClampedArray)if(e==="uint8")o=Uint8Array.from(t);else throw new TypeError("A Uint8ClampedArray tensor's data must be type of uint8");else if(e==="float16"&&t instanceof Uint16Array&&d!==Uint16Array)o=new globalThis.Float16Array(t.buffer,t.byteOffset,t.length);else throw new TypeError(`A ${a} tensor's data must be type of ${d}`)}else if(l=t,Array.isArray(e)){if(e.length===0)throw new TypeError("Tensor type cannot be inferred from an empty array.");let d=typeof e[0];if(d==="string")a="string",o=e;else if(d==="boolean")a="bool",o=Uint8Array.from(e);else throw new TypeError(`Invalid element type of data array: ${d}.`)}else if(e instanceof Uint8ClampedArray)a="uint8",o=Uint8Array.from(e);else{let d=ir.get(e.constructor);if(d===void 0)throw new TypeError(`Unsupported type for tensor data: ${e.constructor}.`);a=d,o=e}if(l===void 0)l=[o.length];else if(!Array.isArray(l))throw new TypeError("A tensor's dims must be a number array");s=l,this.cpuData=o,this.dataLocation="cpu"}let i=tp(s);if(this.cpuData&&i!==this.cpuData.length&&!((a==="uint4"||a==="int4")&&Math.ceil(i/2)===this.cpuData.length))throw new Error(`Tensor's size(${i}) does not match data length(${this.cpuData.length}).`);this.type=a,this.dims=s,this.size=i}static async fromImage(e,t){return Qd(e,t)}static fromTexture(e,t){return Zd(e,t)}static fromGpuBuffer(e,t){return Xd(e,t)}static fromMLTensor(e,t){return Jd(e,t)}static fromPinnedBuffer(e,t,r){return Yd(e,t,r)}toDataURL(e){return jd(this,e)}toImageData(e){return Kd(this,e)}get data(){if(this.ensureValid(),!this.cpuData)throw new Error("The data is not on CPU. Use `getData()` to download GPU data to CPU, or use `texture` or `gpuBuffer` property to access the GPU data directly.");return this.cpuData}get location(){return this.dataLocation}get texture(){if(this.ensureValid(),!this.gpuTextureData)throw new Error("The data is not stored as a WebGL texture.");return this.gpuTextureData}get gpuBuffer(){if(this.ensureValid(),!this.gpuBufferData)throw new Error("The data is not stored as a WebGPU buffer.");return this.gpuBufferData}get mlTensor(){if(this.ensureValid(),!this.mlTensorData)throw new Error("The data is not stored as a WebNN MLTensor.");return this.mlTensorData}async getData(e){switch(this.ensureValid(),this.dataLocation){case"cpu":case"cpu-pinned":return this.data;case"texture":case"gpu-buffer":case"ml-tensor":{if(!this.downloader)throw new Error("The current tensor is not created with a specified data downloader.");if(this.isDownloading)throw new Error("The current tensor is being downloaded.");try{this.isDownloading=!0;let t=await this.downloader();return this.downloader=void 0,this.dataLocation="cpu",this.cpuData=t,e&&this.disposer&&(this.disposer(),this.disposer=void 0),t}finally{this.isDownloading=!1}}default:throw new Error(`cannot get data from location: ${this.dataLocation}`)}}dispose(){if(this.isDownloading)throw new Error("The current tensor is being downloaded.");this.disposer&&(this.disposer(),this.disposer=void 0),this.cpuData=void 0,this.gpuTextureData=void 0,this.gpuBufferData=void 0,this.mlTensorData=void 0,this.downloader=void 0,this.isDownloading=void 0,this.dataLocation="none"}ensureValid(){if(this.dataLocation==="none")throw new Error("The tensor is disposed.")}reshape(e){if(this.ensureValid(),this.downloader||this.disposer)throw new Error("Cannot reshape a tensor that owns GPU resource.");return rp(this,e)}}}),Le,ip=q(()=>{Ta(),Le=De}),Pr,gi,tt,Qe,ap=q(()=>{Fd(),Pr=(e,t)=>{(typeof Ve.trace>"u"?!Ve.wasm.trace:!Ve.trace)||console.timeStamp(`${e}::ORT::${t}`)},gi=(e,t)=>{var s;let r=((s=new Error().stack)==null?void 0:s.split(/\r\n|\r|\n/g))||[],a=!1;for(let i=0;i<r.length;i++){if(a&&!r[i].includes("TRACE_FUNC")){let o=`FUNC_${e}::${r[i].trim().split(" ")[1]}`;t&&(o+=`::${t}`),Pr("CPU",o);return}r[i].includes("TRACE_FUNC")&&(a=!0)}},tt=e=>{(typeof Ve.trace>"u"?!Ve.wasm.trace:!Ve.trace)||gi("BEGIN",e)},Qe=e=>{(typeof Ve.trace>"u"?!Ve.wasm.trace:!Ve.trace)||gi("END",e)}}),np,ry=q(()=>{Gd(),ip(),ap(),np=class sp{constructor(t){this.handler=t}async run(t,r,a){tt();let s={},i={};if(typeof t!="object"||t===null||t instanceof Le||Array.isArray(t))throw new TypeError("'feeds' must be an object that use input names as keys and OnnxValue as corresponding values.");let o=!0;if(typeof r=="object"){if(r===null)throw new TypeError("Unexpected argument[1]: cannot be null.");if(r instanceof Le)throw new TypeError("'fetches' cannot be a Tensor");if(Array.isArray(r)){if(r.length===0)throw new TypeError("'fetches' cannot be an empty array.");o=!1;for(let p of r){if(typeof p!="string")throw new TypeError("'fetches' must be a string array or an object.");if(this.outputNames.indexOf(p)===-1)throw new RangeError(`'fetches' contains invalid output name: ${p}.`);s[p]=null}if(typeof a=="object"&&a!==null)i=a;else if(typeof a<"u")throw new TypeError("'options' must be an object.")}else{let p=!1,g=Object.getOwnPropertyNames(r);for(let f of this.outputNames)if(g.indexOf(f)!==-1){let y=r[f];(y===null||y instanceof Le)&&(p=!0,o=!1,s[f]=y)}if(p){if(typeof a=="object"&&a!==null)i=a;else if(typeof a<"u")throw new TypeError("'options' must be an object.")}else i=r}}else if(typeof r<"u")throw new TypeError("Unexpected argument[1]: must be 'fetches' or 'options'.");for(let p of this.inputNames)if(typeof t[p]>"u")throw new Error(`input '${p}' is missing in 'feeds'.`);if(o)for(let p of this.outputNames)s[p]=null;let l=await this.handler.run(t,s,i),d={};for(let p in l)if(Object.hasOwnProperty.call(l,p)){let g=l[p];g instanceof Le?d[p]=g:d[p]=new Le(g.type,g.data,g.dims)}return Qe(),d}async release(){return this.handler.dispose()}static async create(t,r,a,s){tt();let i,o={};if(typeof t=="string"){if(i=t,typeof r=="object"&&r!==null)o=r;else if(typeof r<"u")throw new TypeError("'options' must be an object.")}else if(t instanceof Uint8Array){if(i=t,typeof r=="object"&&r!==null)o=r;else if(typeof r<"u")throw new TypeError("'options' must be an object.")}else if(t instanceof ArrayBuffer||typeof SharedArrayBuffer<"u"&&t instanceof SharedArrayBuffer){let g=t,f=0,y=t.byteLength;if(typeof r=="object"&&r!==null)o=r;else if(typeof r=="number"){if(f=r,!Number.isSafeInteger(f))throw new RangeError("'byteOffset' must be an integer.");if(f<0||f>=g.byteLength)throw new RangeError(`'byteOffset' is out of range [0, ${g.byteLength}).`);if(y=t.byteLength-f,typeof a=="number"){if(y=a,!Number.isSafeInteger(y))throw new RangeError("'byteLength' must be an integer.");if(y<=0||f+y>g.byteLength)throw new RangeError(`'byteLength' is out of range (0, ${g.byteLength-f}].`);if(typeof s=="object"&&s!==null)o=s;else if(typeof s<"u")throw new TypeError("'options' must be an object.")}else if(typeof a<"u")throw new TypeError("'byteLength' must be a number.")}else if(typeof r<"u")throw new TypeError("'options' must be an object.");i=new Uint8Array(g,f,y)}else throw new TypeError("Unexpected argument[0]: must be 'path' or 'buffer'.");let[l,d]=await Ld(o),p=await l.createInferenceSessionHandler(i,d);return Qe(),new sp(p)}startProfiling(){this.handler.startProfiling()}endProfiling(){this.handler.endProfiling()}get inputNames(){return this.handler.inputNames}get outputNames(){return this.handler.outputNames}}}),Ca,iy=q(()=>{ry(),Ca=np}),ay=q(()=>{}),ny=q(()=>{}),sy=q(()=>{}),oy=q(()=>{}),uy={};lr(uy,{InferenceSession:()=>Ca,TRACE:()=>Pr,TRACE_FUNC_BEGIN:()=>tt,TRACE_FUNC_END:()=>Qe,Tensor:()=>Le,env:()=>$e,registerBackend:()=>Dt});var Ze=q(()=>{Qg(),Xg(),iy(),ip(),ay(),ny(),ap(),sy(),oy()}),Ia=q(()=>{}),op={};lr(op,{default:()=>up});var yi,_i,up,ly=q(()=>{var e;cf(),At(),Ea(),yi="ort-wasm-proxy-worker",_i=((e=globalThis.self)==null?void 0:e.name)===yi,_i&&(self.onmessage=t=>{let{type:r,in:a}=t.data;try{switch(r){case"init-wasm":za(a.wasm).then(()=>{Ka(a).then(()=>{postMessage({type:r})},s=>{postMessage({type:r,err:s})})},s=>{postMessage({type:r,err:s})});break;case"init-ep":{let{epName:s,env:i}=a;Qa(i,s).then(()=>{postMessage({type:r})},o=>{postMessage({type:r,err:o})});break}case"copy-from":{let{buffer:s}=a,i=Gr(s);postMessage({type:r,out:i});break}case"create":{let{model:s,options:i}=a;Za(s,i).then(o=>{postMessage({type:r,out:o})},o=>{postMessage({type:r,err:o})});break}case"release":Xa(a),postMessage({type:r});break;case"run":{let{sessionId:s,inputIndices:i,inputs:o,outputIndices:l,options:d}=a;Ja(s,i,o,l,new Array(l.length).fill(null),d).then(p=>{p.some(g=>g[3]!=="cpu")?postMessage({type:r,err:"Proxy does not support non-cpu tensor location."}):postMessage({type:r,out:p},en([...o,...p]))},p=>{postMessage({type:r,err:p})});break}case"end-profiling":Ya(a),postMessage({type:r});break;default:}}catch(s){postMessage({type:r,err:s})}}),up=_i?null:t=>new Worker(t??Ne,{type:"module",name:yi})}),lp={};lr(lp,{default:()=>dp});var wi,bi,dp,co,dy=q(()=>{var e,t;bi=(wi=import.meta.url,async function(r={}){var uo;var a,s,i=r,o=new Promise((n,u)=>{a=n,s=u}),l=typeof window=="object",d=typeof WorkerGlobalScope<"u",p=d&&((uo=self.name)==null?void 0:uo.startsWith("em-pthread"));i.mountExternalData=(n,u)=>{n.startsWith("./")&&(n=n.substring(2)),(i.Bd||(i.Bd=new Map)).set(n,u)},i.unmountExternalData=()=>{delete i.Bd};var g=globalThis.SharedArrayBuffer??new WebAssembly.Memory({initial:0,maximum:0,shared:!0}).buffer.constructor;let f=()=>{let n=(c,h,m)=>(...x)=>{let I=Je,A=h==null?void 0:h();x=c(...x);let R=h==null?void 0:h();return A!==R&&(c=R,m(A),h=m=null),Je!=I?new Promise((U,H)=>{si={resolve:U,reject:H}}):x},u=c=>async(...h)=>{var m;try{if(i.Cd)throw Error("Session already started");let x=i.Cd={be:h[0],errors:[]},I=await c(...h);if(i.Cd!==x)throw Error("Session mismatch");(m=i.Dd)==null||m.flush();let A=x.errors;if(0<A.length){let R=await Promise.all(A);if(R=R.filter(U=>U),0<R.length)throw Error(R.join(`
`))}return I}finally{i.Cd=null}};i._OrtCreateSession=n(i._OrtCreateSession,()=>i._OrtCreateSession,c=>i._OrtCreateSession=c),i._OrtRun=u(n(i._OrtRun,()=>i._OrtRun,c=>i._OrtRun=c)),i._OrtRunWithBinding=u(n(i._OrtRunWithBinding,()=>i._OrtRunWithBinding,c=>i._OrtRunWithBinding=c)),i._OrtBindInput=n(i._OrtBindInput,()=>i._OrtBindInput,c=>i._OrtBindInput=c),f=void 0};i.jsepInit=(n,u)=>{if(f==null||f(),n==="webgpu"){[i.Dd,i.Rd,i.Vd,i.Hd,i.Ud,i.hc,i.Wd,i.Zd,i.Sd,i.Td,i.Xd]=u;let c=i.Dd;i.jsepRegisterBuffer=(h,m,x,I)=>c.registerBuffer(h,m,x,I),i.jsepGetBuffer=h=>c.getBuffer(h),i.jsepCreateDownloader=(h,m,x)=>c.createDownloader(h,m,x),i.jsepOnCreateSession=h=>{c.onCreateSession(h)},i.jsepOnReleaseSession=h=>{c.onReleaseSession(h)},i.jsepOnRunStart=h=>c.onRunStart(h),i.$d=(h,m)=>{c.upload(h,m)}}else if(n==="webnn"){[i.Dd,i.Yd,i.Id,i.jsepEnsureTensor,i.Jd,i.jsepDownloadTensor]=u,i.jsepReleaseTensorId=i.Id,i.jsepUploadTensor=i.Jd;let c=i.Dd;i.jsepOnRunStart=h=>c.onRunStart(h),i.jsepOnRunEnd=c.onRunEnd.bind(c),i.jsepRegisterMLContext=(h,m)=>{c.registerMLContext(h,m)},i.jsepOnReleaseSession=h=>{c.onReleaseSession(h)},i.jsepCreateMLTensorDownloader=(h,m)=>c.createMLTensorDownloader(h,m),i.jsepRegisterMLTensor=(h,m,x,I)=>c.registerMLTensor(h,m,x,I),i.jsepCreateMLContext=h=>c.createMLContext(h),i.jsepRegisterMLConstant=(h,m,x,I,A)=>c.registerMLConstant(h,m,x,I,A,i.Bd),i.jsepRegisterGraphInput=c.registerGraphInput.bind(c),i.jsepIsGraphInput=c.isGraphInput.bind(c),i.jsepCreateTemporaryTensor=c.createTemporaryTensor.bind(c)}};var y,_,w=Object.assign({},i),b=(n,u)=>{throw u},k="";(l||d)&&(d?k=self.location.href:typeof document<"u"&&document.currentScript&&(k=document.currentScript.src),wi&&(k=wi),k=k.startsWith("blob:")?"":k.slice(0,k.replace(/[?#].*/,"").lastIndexOf("/")+1),d&&(_=n=>{var u=new XMLHttpRequest;return u.open("GET",n,!1),u.responseType="arraybuffer",u.send(null),new Uint8Array(u.response)}),y=async n=>{if(ge(n))return new Promise((c,h)=>{var m=new XMLHttpRequest;m.open("GET",n,!0),m.responseType="arraybuffer",m.onload=()=>{m.status==200||m.status==0&&m.response?c(m.response):h(m.status)},m.onerror=h,m.send(null)});var u=await fetch(n,{credentials:"same-origin"});if(u.ok)return u.arrayBuffer();throw Error(u.status+" : "+u.url)});var v=console.log.bind(console),$=console.error.bind(console),T=v,S=$;Object.assign(i,w),w=null;var C,E,z,B,W,G,ee,ae,Z,te,J,L,de,me=i.wasmBinary,F=!1,ge=n=>n.startsWith("file://");function N(){return C.buffer!=B.buffer&&ye(),B}function V(){return C.buffer!=B.buffer&&ye(),W}function le(){return C.buffer!=B.buffer&&ye(),G}function be(){return C.buffer!=B.buffer&&ye(),ee}function D(){return C.buffer!=B.buffer&&ye(),ae}function ce(){return C.buffer!=B.buffer&&ye(),Z}function Ue(){return C.buffer!=B.buffer&&ye(),te}function Re(){return C.buffer!=B.buffer&&ye(),de}if(p){let n=function(u){try{var c=u.data,h=c.yd;if(h==="load"){let m=[];self.onmessage=x=>m.push(x),self.startWorker=()=>{postMessage({yd:"loaded"});for(let x of m)n(x);self.onmessage=n};for(let x of c.Od)i[x]&&!i[x].proxy||(i[x]=(...I)=>{postMessage({yd:"callHandler",Nd:x,args:I})},x=="print"&&(T=i[x]),x=="printErr"&&(S=i[x]));C=c.he,ye(),_t(c.ie)}else if(h==="run"){If(c.xd),di(c.xd,0,0,1,0,0),ln(),ai(c.xd),Te||(is(),Te=!0);try{Ef(c.de,c.Fd)}catch(m){if(m!="unwind")throw m}}else c.target!=="setimmediate"&&(h==="checkMailbox"?Te&&pr():h&&(S(`worker: received unknown command ${h}`),S(c)))}catch(m){throw as(),m}};var _t,Te=!1;S=function(...u){u=u.join(" "),console.error(u)},self.alert=function(...u){postMessage({yd:"alert",text:u.join(" "),fe:wr()})},self.onunhandledrejection=u=>{throw u.reason||u},self.onmessage=n}function ye(){var n=C.buffer;i.HEAP8=B=new Int8Array(n),i.HEAP16=G=new Int16Array(n),i.HEAPU8=W=new Uint8Array(n),i.HEAPU16=ee=new Uint16Array(n),i.HEAP32=ae=new Int32Array(n),i.HEAPU32=Z=new Uint32Array(n),i.HEAPF32=te=new Float32Array(n),i.HEAPF64=de=new Float64Array(n),i.HEAP64=J=new BigInt64Array(n),i.HEAPU64=L=new BigUint64Array(n)}function ot(){p?startWorker(i):P.Bb()}p||(C=new WebAssembly.Memory({initial:256,maximum:65536,shared:!0}),ye());var qt,wt=0,Vt=null;function tn(){if(--wt==0&&Vt){var n=Vt;Vt=null,n()}}function rt(n){throw S(n="Aborted("+n+")"),F=!0,n=new WebAssembly.RuntimeError(n+". Build with -sASSERTIONS for more info."),s(n),n}function rn(){return{a:{Ta:Cf,Va:Tf,W:zf,la:Af,b:Rf,u:Bf,R:Mf,Za:Nf,d:Df,pb:hn,g:Of,T:gn,Ga:yn,lb:wn,nb:bn,Ha:$n,Ea:vn,wb:xn,Da:kn,pa:Sn,mb:Tn,jb:Cn,Fa:In,kb:En,Ma:Pf,za:Uf,eb:Wf,cb:Vf,ya:Gf,V:Hf,N:Ff,db:jf,ma:em,fb:tm,zb:rm,hb:im,qb:am,ab:nm,Aa:sm,yb:ai,Ja:om,S:um,Wa:lm,$:cm,G:hm,E:mm,m:ti,H:gm,B:wm,X:bm,J:$m,v:vm,O:xm,D:km,t:Sm,A:Tm,z:Cm,w:Im,r:Em,tb:zm,ub:Am,vb:Om,rb:Ln,sb:Gn,bb:Hn,Oa:Bm,La:Nm,y:Dm,ja:Pm,Ba:Um,Ka:Mm,qa:Wm,Ia:qm,ib:Vm,U:Rm,fa:Lm,Sa:Gm,gb:Hm,Qa:Fm,Pa:jm,Ab:Qn,Ca:Zn,ob:Qr,aa:Xn,oa:Jn,xb:Yn,na:es,$a:bg,ia:Rg,sa:Pg,ga:_g,da:Tg,ua:Ng,p:gg,e:eg,c:Jm,ea:kg,f:tg,n:ig,k:cg,Y:ng,ka:hg,j:yg,wa:xg,Ra:qg,ca:Ag,Ua:Wg,P:Sg,K:og,_:zg,Q:wg,Z:Bg,x:sg,l:Ym,va:Eg,i:Xm,h:ag,ra:Ug,ta:Dg,o:rg,q:ug,s:dg,I:pg,C:mg,L:fg,xa:vg,_a:$g,F:Og,Ya:Cg,ba:Mg,M:lg,Xa:Ig,ha:Qm,a:C,Na:Kr}}}var Hr={1319426:()=>typeof wasmOffsetConverter<"u",1319483:(n,u,c,h,m)=>{if(i===void 0||!i.Bd)return 1;if((n=Se(Number(n>>>0))).startsWith("./")&&(n=n.substring(2)),!(n=i.Bd.get(n)))return 2;if(u=Number(u>>>0),c=Number(c>>>0),h=Number(h>>>0),u+c>n.byteLength)return 3;try{let x=n.subarray(u,u+c);switch(m){case 0:V().set(x,h>>>0);break;case 1:i.$d(h,x);break;default:return 4}return 0}catch{return 4}},1320198:(n,u,c)=>{i.Jd(n,V().subarray(u>>>0,u+c>>>0))},1320261:()=>i.Yd(),1320302:n=>{i.Id(n)},1320338:()=>{i.Sd()},1320369:()=>{i.Td()},1320398:()=>{i.Xd()},1320423:n=>i.Rd(n),1320456:n=>i.Vd(n),1320488:(n,u,c)=>{i.Hd(Number(n),Number(u),Number(c),!0)},1320551:(n,u,c)=>{i.Hd(Number(n),Number(u),Number(c))},1320608:n=>{i.hc("Abs",n,void 0)},1320659:n=>{i.hc("Neg",n,void 0)},1320710:n=>{i.hc("Floor",n,void 0)},1320763:n=>{i.hc("Ceil",n,void 0)},1320815:n=>{i.hc("Reciprocal",n,void 0)},1320873:n=>{i.hc("Sqrt",n,void 0)},1320925:n=>{i.hc("Exp",n,void 0)},1320976:n=>{i.hc("Erf",n,void 0)},1321027:n=>{i.hc("Sigmoid",n,void 0)},1321082:(n,u,c)=>{i.hc("HardSigmoid",n,{alpha:u,beta:c})},1321161:n=>{i.hc("Log",n,void 0)},1321212:n=>{i.hc("Sin",n,void 0)},1321263:n=>{i.hc("Cos",n,void 0)},1321314:n=>{i.hc("Tan",n,void 0)},1321365:n=>{i.hc("Asin",n,void 0)},1321417:n=>{i.hc("Acos",n,void 0)},1321469:n=>{i.hc("Atan",n,void 0)},1321521:n=>{i.hc("Sinh",n,void 0)},1321573:n=>{i.hc("Cosh",n,void 0)},1321625:n=>{i.hc("Asinh",n,void 0)},1321678:n=>{i.hc("Acosh",n,void 0)},1321731:n=>{i.hc("Atanh",n,void 0)},1321784:n=>{i.hc("Tanh",n,void 0)},1321836:n=>{i.hc("Not",n,void 0)},1321887:(n,u,c)=>{i.hc("Clip",n,{min:u,max:c})},1321956:n=>{i.hc("Clip",n,void 0)},1322008:(n,u)=>{i.hc("Elu",n,{alpha:u})},1322066:n=>{i.hc("Gelu",n,void 0)},1322118:n=>{i.hc("Relu",n,void 0)},1322170:(n,u)=>{i.hc("LeakyRelu",n,{alpha:u})},1322234:(n,u)=>{i.hc("ThresholdedRelu",n,{alpha:u})},1322304:(n,u)=>{i.hc("Cast",n,{to:u})},1322362:n=>{i.hc("Add",n,void 0)},1322413:n=>{i.hc("Sub",n,void 0)},1322464:n=>{i.hc("Mul",n,void 0)},1322515:n=>{i.hc("Div",n,void 0)},1322566:n=>{i.hc("Pow",n,void 0)},1322617:n=>{i.hc("Equal",n,void 0)},1322670:n=>{i.hc("Greater",n,void 0)},1322725:n=>{i.hc("GreaterOrEqual",n,void 0)},1322787:n=>{i.hc("Less",n,void 0)},1322839:n=>{i.hc("LessOrEqual",n,void 0)},1322898:(n,u,c,h,m)=>{i.hc("ReduceMean",n,{keepDims:!!u,noopWithEmptyAxes:!!c,axes:h?Array.from(D().subarray(Number(h)>>>0,Number(m)>>>0)):[]})},1323073:(n,u,c,h,m)=>{i.hc("ReduceMax",n,{keepDims:!!u,noopWithEmptyAxes:!!c,axes:h?Array.from(D().subarray(Number(h)>>>0,Number(m)>>>0)):[]})},1323247:(n,u,c,h,m)=>{i.hc("ReduceMin",n,{keepDims:!!u,noopWithEmptyAxes:!!c,axes:h?Array.from(D().subarray(Number(h)>>>0,Number(m)>>>0)):[]})},1323421:(n,u,c,h,m)=>{i.hc("ReduceProd",n,{keepDims:!!u,noopWithEmptyAxes:!!c,axes:h?Array.from(D().subarray(Number(h)>>>0,Number(m)>>>0)):[]})},1323596:(n,u,c,h,m)=>{i.hc("ReduceSum",n,{keepDims:!!u,noopWithEmptyAxes:!!c,axes:h?Array.from(D().subarray(Number(h)>>>0,Number(m)>>>0)):[]})},1323770:(n,u,c,h,m)=>{i.hc("ReduceL1",n,{keepDims:!!u,noopWithEmptyAxes:!!c,axes:h?Array.from(D().subarray(Number(h)>>>0,Number(m)>>>0)):[]})},1323943:(n,u,c,h,m)=>{i.hc("ReduceL2",n,{keepDims:!!u,noopWithEmptyAxes:!!c,axes:h?Array.from(D().subarray(Number(h)>>>0,Number(m)>>>0)):[]})},1324116:(n,u,c,h,m)=>{i.hc("ReduceLogSum",n,{keepDims:!!u,noopWithEmptyAxes:!!c,axes:h?Array.from(D().subarray(Number(h)>>>0,Number(m)>>>0)):[]})},1324293:(n,u,c,h,m)=>{i.hc("ReduceSumSquare",n,{keepDims:!!u,noopWithEmptyAxes:!!c,axes:h?Array.from(D().subarray(Number(h)>>>0,Number(m)>>>0)):[]})},1324473:(n,u,c,h,m)=>{i.hc("ReduceLogSumExp",n,{keepDims:!!u,noopWithEmptyAxes:!!c,axes:h?Array.from(D().subarray(Number(h)>>>0,Number(m)>>>0)):[]})},1324653:n=>{i.hc("Where",n,void 0)},1324706:(n,u,c)=>{i.hc("Transpose",n,{perm:u?Array.from(D().subarray(Number(u)>>>0,Number(c)>>>0)):[]})},1324830:(n,u,c,h)=>{i.hc("DepthToSpace",n,{blocksize:u,mode:Se(c),format:h?"NHWC":"NCHW"})},1324963:(n,u,c,h)=>{i.hc("DepthToSpace",n,{blocksize:u,mode:Se(c),format:h?"NHWC":"NCHW"})},1325096:(n,u,c,h,m,x,I,A,R,U,H,X,se,we,qe)=>{i.hc("ConvTranspose",n,{format:R?"NHWC":"NCHW",autoPad:u,dilations:[c],group:h,kernelShape:[m],pads:[x,I],strides:[A],wIsConst:()=>!!N()[U>>>0],outputPadding:H?Array.from(D().subarray(Number(H)>>>0,Number(X)>>>0)):[],outputShape:se?Array.from(D().subarray(Number(se)>>>0,Number(we)>>>0)):[],activation:Se(qe)})},1325529:(n,u,c,h,m,x,I,A,R,U,H,X,se,we)=>{i.hc("ConvTranspose",n,{format:A?"NHWC":"NCHW",autoPad:u,dilations:Array.from(D().subarray(Number(c)>>>0,2+(Number(c)>>>0)>>>0)),group:h,kernelShape:Array.from(D().subarray(Number(m)>>>0,2+(Number(m)>>>0)>>>0)),pads:Array.from(D().subarray(Number(x)>>>0,4+(Number(x)>>>0)>>>0)),strides:Array.from(D().subarray(Number(I)>>>0,2+(Number(I)>>>0)>>>0)),wIsConst:()=>!!N()[R>>>0],outputPadding:U?Array.from(D().subarray(Number(U)>>>0,Number(H)>>>0)):[],outputShape:X?Array.from(D().subarray(Number(X)>>>0,Number(se)>>>0)):[],activation:Se(we)})},1326190:(n,u,c,h,m,x,I,A,R,U,H,X,se,we,qe)=>{i.hc("ConvTranspose",n,{format:R?"NHWC":"NCHW",autoPad:u,dilations:[c],group:h,kernelShape:[m],pads:[x,I],strides:[A],wIsConst:()=>!!N()[U>>>0],outputPadding:H?Array.from(D().subarray(Number(H)>>>0,Number(X)>>>0)):[],outputShape:se?Array.from(D().subarray(Number(se)>>>0,Number(we)>>>0)):[],activation:Se(qe)})},1326623:(n,u,c,h,m,x,I,A,R,U,H,X,se,we)=>{i.hc("ConvTranspose",n,{format:A?"NHWC":"NCHW",autoPad:u,dilations:Array.from(D().subarray(Number(c)>>>0,2+(Number(c)>>>0)>>>0)),group:h,kernelShape:Array.from(D().subarray(Number(m)>>>0,2+(Number(m)>>>0)>>>0)),pads:Array.from(D().subarray(Number(x)>>>0,4+(Number(x)>>>0)>>>0)),strides:Array.from(D().subarray(Number(I)>>>0,2+(Number(I)>>>0)>>>0)),wIsConst:()=>!!N()[R>>>0],outputPadding:U?Array.from(D().subarray(Number(U)>>>0,Number(H)>>>0)):[],outputShape:X?Array.from(D().subarray(Number(X)>>>0,Number(se)>>>0)):[],activation:Se(we)})},1327284:(n,u)=>{i.hc("GlobalAveragePool",n,{format:u?"NHWC":"NCHW"})},1327375:(n,u,c,h,m,x,I,A,R,U,H,X,se,we)=>{i.hc("AveragePool",n,{format:we?"NHWC":"NCHW",auto_pad:u,ceil_mode:c,count_include_pad:h,storage_order:m,dilations:x?Array.from(D().subarray(Number(x)>>>0,Number(I)>>>0)):[],kernel_shape:A?Array.from(D().subarray(Number(A)>>>0,Number(R)>>>0)):[],pads:U?Array.from(D().subarray(Number(U)>>>0,Number(H)>>>0)):[],strides:X?Array.from(D().subarray(Number(X)>>>0,Number(se)>>>0)):[]})},1327854:(n,u)=>{i.hc("GlobalAveragePool",n,{format:u?"NHWC":"NCHW"})},1327945:(n,u,c,h,m,x,I,A,R,U,H,X,se,we)=>{i.hc("AveragePool",n,{format:we?"NHWC":"NCHW",auto_pad:u,ceil_mode:c,count_include_pad:h,storage_order:m,dilations:x?Array.from(D().subarray(Number(x)>>>0,Number(I)>>>0)):[],kernel_shape:A?Array.from(D().subarray(Number(A)>>>0,Number(R)>>>0)):[],pads:U?Array.from(D().subarray(Number(U)>>>0,Number(H)>>>0)):[],strides:X?Array.from(D().subarray(Number(X)>>>0,Number(se)>>>0)):[]})},1328424:(n,u)=>{i.hc("GlobalMaxPool",n,{format:u?"NHWC":"NCHW"})},1328511:(n,u,c,h,m,x,I,A,R,U,H,X,se,we)=>{i.hc("MaxPool",n,{format:we?"NHWC":"NCHW",auto_pad:u,ceil_mode:c,count_include_pad:h,storage_order:m,dilations:x?Array.from(D().subarray(Number(x)>>>0,Number(I)>>>0)):[],kernel_shape:A?Array.from(D().subarray(Number(A)>>>0,Number(R)>>>0)):[],pads:U?Array.from(D().subarray(Number(U)>>>0,Number(H)>>>0)):[],strides:X?Array.from(D().subarray(Number(X)>>>0,Number(se)>>>0)):[]})},1328986:(n,u)=>{i.hc("GlobalMaxPool",n,{format:u?"NHWC":"NCHW"})},1329073:(n,u,c,h,m,x,I,A,R,U,H,X,se,we)=>{i.hc("MaxPool",n,{format:we?"NHWC":"NCHW",auto_pad:u,ceil_mode:c,count_include_pad:h,storage_order:m,dilations:x?Array.from(D().subarray(Number(x)>>>0,Number(I)>>>0)):[],kernel_shape:A?Array.from(D().subarray(Number(A)>>>0,Number(R)>>>0)):[],pads:U?Array.from(D().subarray(Number(U)>>>0,Number(H)>>>0)):[],strides:X?Array.from(D().subarray(Number(X)>>>0,Number(se)>>>0)):[]})},1329548:(n,u,c,h,m)=>{i.hc("Gemm",n,{alpha:u,beta:c,transA:h,transB:m})},1329652:n=>{i.hc("MatMul",n,void 0)},1329706:(n,u,c,h)=>{i.hc("ArgMax",n,{keepDims:!!u,selectLastIndex:!!c,axis:h})},1329814:(n,u,c,h)=>{i.hc("ArgMin",n,{keepDims:!!u,selectLastIndex:!!c,axis:h})},1329922:(n,u)=>{i.hc("Softmax",n,{axis:u})},1329985:(n,u)=>{i.hc("Concat",n,{axis:u})},1330045:(n,u,c,h,m)=>{i.hc("Split",n,{axis:u,numOutputs:c,splitSizes:h?Array.from(D().subarray(Number(h)>>>0,Number(m)>>>0)):[]})},1330201:n=>{i.hc("Expand",n,void 0)},1330255:(n,u)=>{i.hc("Gather",n,{axis:Number(u)})},1330326:(n,u)=>{i.hc("GatherElements",n,{axis:Number(u)})},1330405:(n,u)=>{i.hc("GatherND",n,{batch_dims:Number(u)})},1330484:(n,u,c,h,m,x,I,A,R,U,H)=>{i.hc("Resize",n,{antialias:u,axes:c?Array.from(D().subarray(Number(c)>>>0,Number(h)>>>0)):[],coordinateTransformMode:Se(m),cubicCoeffA:x,excludeOutside:I,extrapolationValue:A,keepAspectRatioPolicy:Se(R),mode:Se(U),nearestMode:Se(H)})},1330846:(n,u,c,h,m,x,I)=>{i.hc("Slice",n,{starts:u?Array.from(D().subarray(Number(u)>>>0,Number(c)>>>0)):[],ends:h?Array.from(D().subarray(Number(h)>>>0,Number(m)>>>0)):[],axes:x?Array.from(D().subarray(Number(x)>>>0,Number(I)>>>0)):[]})},1331110:n=>{i.hc("Tile",n,void 0)},1331162:(n,u,c)=>{i.hc("InstanceNormalization",n,{epsilon:u,format:c?"NHWC":"NCHW"})},1331276:(n,u,c)=>{i.hc("InstanceNormalization",n,{epsilon:u,format:c?"NHWC":"NCHW"})},1331390:n=>{i.hc("Range",n,void 0)},1331443:(n,u)=>{i.hc("Einsum",n,{equation:Se(u)})},1331524:(n,u,c,h,m)=>{i.hc("Pad",n,{mode:u,value:c,pads:h?Array.from(D().subarray(Number(h)>>>0,Number(m)>>>0)):[]})},1331667:(n,u,c,h,m,x)=>{i.hc("BatchNormalization",n,{epsilon:u,momentum:c,spatial:!!m,trainingMode:!!h,format:x?"NHWC":"NCHW"})},1331836:(n,u,c,h,m,x)=>{i.hc("BatchNormalization",n,{epsilon:u,momentum:c,spatial:!!m,trainingMode:!!h,format:x?"NHWC":"NCHW"})},1332005:(n,u,c)=>{i.hc("CumSum",n,{exclusive:Number(u),reverse:Number(c)})},1332102:(n,u,c)=>{i.hc("DequantizeLinear",n,{axis:u,blockSize:c})},1332192:(n,u,c,h,m)=>{i.hc("GridSample",n,{align_corners:u,mode:Se(c),padding_mode:Se(h),format:m?"NHWC":"NCHW"})},1332362:(n,u,c,h,m)=>{i.hc("GridSample",n,{align_corners:u,mode:Se(c),padding_mode:Se(h),format:m?"NHWC":"NCHW"})},1332532:(n,u)=>{i.hc("ScatterND",n,{reduction:Se(u)})},1332617:(n,u,c,h,m,x,I,A,R)=>{i.hc("Attention",n,{numHeads:u,isUnidirectional:c,maskFilterValue:h,scale:m,doRotary:x,qkvHiddenSizes:I?Array.from(D().subarray(Number(A)>>>0,Number(A)+I>>>0)):[],pastPresentShareBuffer:!!R})},1332889:n=>{i.hc("BiasAdd",n,void 0)},1332944:n=>{i.hc("BiasSplitGelu",n,void 0)},1333005:n=>{i.hc("FastGelu",n,void 0)},1333061:(n,u,c,h,m,x,I,A,R,U,H,X,se,we,qe,jt)=>{i.hc("Conv",n,{format:X?"NHWC":"NCHW",auto_pad:u,dilations:c?Array.from(D().subarray(Number(c)>>>0,Number(h)>>>0)):[],group:m,kernel_shape:x?Array.from(D().subarray(Number(x)>>>0,Number(I)>>>0)):[],pads:A?Array.from(D().subarray(Number(A)>>>0,Number(R)>>>0)):[],strides:U?Array.from(D().subarray(Number(U)>>>0,Number(H)>>>0)):[],w_is_const:()=>!!N()[Number(se)>>>0],activation:Se(we),activation_params:qe?Array.from(Ue().subarray(Number(qe)>>>0,Number(jt)>>>0)):[]})},1333645:n=>{i.hc("Gelu",n,void 0)},1333697:(n,u,c,h,m,x,I,A,R)=>{i.hc("GroupQueryAttention",n,{numHeads:u,kvNumHeads:c,scale:h,softcap:m,doRotary:x,rotaryInterleaved:I,smoothSoftmax:A,localWindowSize:R})},1333914:(n,u,c,h)=>{i.hc("LayerNormalization",n,{axis:u,epsilon:c,simplified:!!h})},1334025:(n,u,c,h)=>{i.hc("LayerNormalization",n,{axis:u,epsilon:c,simplified:!!h})},1334136:(n,u,c,h,m,x)=>{i.hc("MatMulNBits",n,{k:u,n:c,accuracyLevel:h,bits:m,blockSize:x})},1334263:(n,u,c,h,m,x)=>{i.hc("MultiHeadAttention",n,{numHeads:u,isUnidirectional:c,maskFilterValue:h,scale:m,doRotary:x})},1334422:(n,u)=>{i.hc("QuickGelu",n,{alpha:u})},1334486:(n,u,c,h,m)=>{i.hc("RotaryEmbedding",n,{interleaved:!!u,numHeads:c,rotaryEmbeddingDim:h,scale:m})},1334625:(n,u,c)=>{i.hc("SkipLayerNormalization",n,{epsilon:u,simplified:!!c})},1334727:(n,u,c)=>{i.hc("SkipLayerNormalization",n,{epsilon:u,simplified:!!c})},1334829:(n,u,c,h)=>{i.hc("GatherBlockQuantized",n,{gatherAxis:u,quantizeAxis:c,blockSize:h})},1334950:n=>{i.Wd(n)},1334984:(n,u)=>i.Zd(Number(n),Number(u),i.Cd.be,i.Cd.errors)};function Tf(n,u,c){return Dn(async()=>{await i.Ud(Number(n),Number(u),Number(c))})}function Cf(){return typeof wasmOffsetConverter<"u"}class Fr{constructor(u){lo(this,"name","ExitStatus");this.message=`Program terminated with exit(${u})`,this.status=u}}var an=n=>{n.terminate(),n.onmessage=()=>{}},jr=[],nn=n=>{lt.length==0&&(pn(),dn(lt[0]));var u=lt.pop();if(!u)return 6;Lt.push(u),bt[n.xd]=u,u.xd=n.xd;var c={yd:"run",de:n.ce,Fd:n.Fd,xd:n.xd};return u.postMessage(c,n.Ld),0},ut=0,ve=(n,u,...c)=>{for(var h=2*c.length,m=ie(),x=ci(8*h),I=x>>>3,A=0;A<c.length;A++){var R=c[A];typeof R=="bigint"?(J[I+2*A]=1n,J[I+2*A+1]=R):(J[I+2*A]=0n,Re()[I+2*A+1>>>0]=R)}return n=ns(n,0,h,x,u),re(m),n};function Kr(n){if(p)return ve(0,1,n);if(z=n,!(0<ut)){for(var u of Lt)an(u);for(u of lt)an(u);lt=[],Lt=[],bt={},F=!0}b(0,new Fr(n))}function sn(n){if(p)return ve(1,0,n);Qr(n)}var Qr=n=>{if(z=n,p)throw sn(n),"unwind";Kr(n)},lt=[],Lt=[],on=[],bt={},un=n=>{var u=n.xd;delete bt[u],lt.push(n),Lt.splice(Lt.indexOf(n),1),n.xd=0,ss(u)};function ln(){on.forEach(n=>n())}var dn=n=>new Promise(u=>{n.onmessage=m=>{var x=(m=m.data).yd;if(m.Ed&&m.Ed!=wr()){var I=bt[m.Ed];I?I.postMessage(m,m.Ld):S(`Internal error! Worker sent a message "${x}" to target pthread ${m.Ed}, but that thread no longer exists!`)}else x==="checkMailbox"?pr():x==="spawnThread"?nn(m):x==="cleanupThread"?un(bt[m.ee]):x==="loaded"?(n.loaded=!0,u(n)):x==="alert"?alert(`Thread ${m.fe}: ${m.text}`):m.target==="setimmediate"?n.postMessage(m):x==="callHandler"?i[m.Nd](...m.args):x&&S(`worker sent an unknown command ${x}`)},n.onerror=m=>{throw S(`worker sent an error! ${m.filename}:${m.lineno}: ${m.message}`),m};var c,h=[];for(c of[])i.propertyIsEnumerable(c)&&h.push(c);n.postMessage({yd:"load",Od:h,he:C,ie:E})});function pn(){var n=new Worker(import.meta.url.startsWith("file:")?new URL("/assets/ort.bundle.min.mjs",import.meta.url):new URL(import.meta.url),{type:"module",workerData:"em-pthread",name:"em-pthread"});lt.push(n)}var If=n=>{ye();var u=ce()[n+52>>>2>>>0];n=ce()[n+56>>>2>>>0],ls(u,u-n),re(u)},Ef=(n,u)=>{ut=0,n=hi(n,u),0<ut?z=n:pi(n)},dr=[];function zf(n){var u=new Zr(n>>>=0);if(N()[u.wd+12>>>0]==0){var c=1;N()[u.wd+12>>>0]=c}return c=0,N()[u.wd+13>>>0]=c,dr.push(u),ps(n),hs(n)}var Rt=0,Af=()=>{ne(0,0);var n=dr.pop();ds(n.Gd),Rt=0};class Zr{constructor(u){this.Gd=u,this.wd=u-24}}function Of(n){throw Rt||(Rt=n>>>0),Rt}var Xr=n=>{var u=Rt;if(!u)return Ft(0),0;var c=new Zr(u);ce()[c.wd+16>>>2>>>0]=u;var h=ce()[c.wd+4>>>2>>>0];if(!h)return Ft(0),u;for(var m of n){if(m===0||m===h)break;if(cs(m,h,c.wd+16))return Ft(m),u}return Ft(h),u};function Rf(){return Xr([])}function Bf(n){return Xr([n>>>0])}function Mf(n,u){return Xr([n>>>0,u>>>0])}var Nf=()=>{var n=dr.pop();n||rt("no exception to throw");var u=n.Gd;if(N()[n.wd+13>>>0]==0){dr.push(n);var c=1;N()[n.wd+13>>>0]=c,c=0,N()[n.wd+12>>>0]=c}throw Rt=u};function Df(n,u,c){var h=new Zr(n>>>=0);throw u>>>=0,c>>>=0,ce()[h.wd+16>>>2>>>0]=0,ce()[h.wd+4>>>2>>>0]=u,ce()[h.wd+8>>>2>>>0]=c,Rt=n}function cn(n,u,c,h){return p?ve(2,1,n,u,c,h):hn(n,u,c,h)}function hn(n,u,c,h){if(n>>>=0,c>>>=0,h>>>=0,g===void 0)return 6;var m=[];return p&&m.length===0?cn(n,u>>>=0,c,h):(n={ce:c,xd:n,Fd:h,Ld:m},p?(n.yd="spawnThread",postMessage(n,m),0):nn(n))}var fn=typeof TextDecoder<"u"?new TextDecoder:void 0,mn=(n,u=0,c=NaN)=>{var h=(u>>>=0)+c;for(c=u;n[c]&&!(c>=h);)++c;if(16<c-u&&n.buffer&&fn)return fn.decode(n.buffer instanceof ArrayBuffer?n.subarray(u,c):n.slice(u,c));for(h="";u<c;){var m=n[u++];if(128&m){var x=63&n[u++];if((224&m)==192)h+=String.fromCharCode((31&m)<<6|x);else{var I=63&n[u++];65536>(m=(240&m)==224?(15&m)<<12|x<<6|I:(7&m)<<18|x<<12|I<<6|63&n[u++])?h+=String.fromCharCode(m):(m-=65536,h+=String.fromCharCode(55296|m>>10,56320|1023&m))}}else h+=String.fromCharCode(m)}return h},Se=(n,u)=>(n>>>=0)?mn(V(),n,u):"";function gn(n,u,c){return p?ve(3,1,n,u,c):0}function yn(n,u){if(p)return ve(4,1,n,u)}var _n=n=>{for(var u=0,c=0;c<n.length;++c){var h=n.charCodeAt(c);127>=h?u++:2047>=h?u+=2:55296<=h&&57343>=h?(u+=4,++c):u+=3}return u},Bt=(n,u,c)=>{var h=V();if(u>>>=0,0<c){var m=u;c=u+c-1;for(var x=0;x<n.length;++x){var I=n.charCodeAt(x);if(55296<=I&&57343>=I&&(I=65536+((1023&I)<<10)|1023&n.charCodeAt(++x)),127>=I){if(u>=c)break;h[u++>>>0]=I}else{if(2047>=I){if(u+1>=c)break;h[u++>>>0]=192|I>>6}else{if(65535>=I){if(u+2>=c)break;h[u++>>>0]=224|I>>12}else{if(u+3>=c)break;h[u++>>>0]=240|I>>18,h[u++>>>0]=128|I>>12&63}h[u++>>>0]=128|I>>6&63}h[u++>>>0]=128|63&I}}h[u>>>0]=0,n=u-m}else n=0;return n};function wn(n,u){if(p)return ve(5,1,n,u)}function bn(n,u,c){if(p)return ve(6,1,n,u,c)}function $n(n,u,c){return p?ve(7,1,n,u,c):0}function vn(n,u){if(p)return ve(8,1,n,u)}function xn(n,u,c){if(p)return ve(9,1,n,u,c)}function kn(n,u,c,h){if(p)return ve(10,1,n,u,c,h)}function Sn(n,u,c,h){if(p)return ve(11,1,n,u,c,h)}function Tn(n,u,c,h){if(p)return ve(12,1,n,u,c,h)}function Cn(n){if(p)return ve(13,1,n)}function In(n,u){if(p)return ve(14,1,n,u)}function En(n,u,c){if(p)return ve(15,1,n,u,c)}var zn,dt,Pf=()=>rt(""),Xe=n=>{for(var u="";V()[n>>>0];)u+=zn[V()[n++>>>0]];return u},Jr={},Yr={};function it(n,u,c={}){return function(h,m,x={}){var I=m.name;if(!h)throw new dt(`type "${I}" must have a positive integer typeid pointer`);if(Yr.hasOwnProperty(h)){if(x.Pd)return;throw new dt(`Cannot register type '${I}' twice`)}Yr[h]=m,Jr.hasOwnProperty(h)&&(m=Jr[h],delete Jr[h],m.forEach(A=>A()))}(n,u,c)}var An=(n,u,c)=>{switch(u){case 1:return c?h=>N()[h>>>0]:h=>V()[h>>>0];case 2:return c?h=>le()[h>>>1>>>0]:h=>be()[h>>>1>>>0];case 4:return c?h=>D()[h>>>2>>>0]:h=>ce()[h>>>2>>>0];case 8:return c?h=>J[h>>>3]:h=>L[h>>>3];default:throw new TypeError(`invalid integer width (${u}): ${n}`)}};function Uf(n,u,c){c>>>=0,it(n>>>=0,{name:u=Xe(u>>>0),fromWireType:h=>h,toWireType:function(h,m){if(typeof m!="bigint"&&typeof m!="number")throw m=m===null?"null":(h=typeof m)=="object"||h==="array"||h==="function"?m.toString():""+m,new TypeError(`Cannot convert "${m}" to ${this.name}`);return typeof m=="number"&&(m=BigInt(m)),m},zd:pt,readValueFromPointer:An(u,c,u.indexOf("u")==-1),Ad:null})}var pt=8;function Wf(n,u,c,h){it(n>>>=0,{name:u=Xe(u>>>0),fromWireType:function(m){return!!m},toWireType:function(m,x){return x?c:h},zd:pt,readValueFromPointer:function(m){return this.fromWireType(V()[m>>>0])},Ad:null})}var ei=[],at=[];function ti(n){9<(n>>>=0)&&--at[n+1]==0&&(at[n]=void 0,ei.push(n))}var Me=n=>{if(!n)throw new dt("Cannot use deleted val. handle = "+n);return at[n]},We=n=>{switch(n){case void 0:return 2;case null:return 4;case!0:return 6;case!1:return 8;default:let u=ei.pop()||at.length;return at[u]=n,at[u+1]=1,u}};function ri(n){return this.fromWireType(ce()[n>>>2>>>0])}var qf={name:"emscripten::val",fromWireType:n=>{var u=Me(n);return ti(n),u},toWireType:(n,u)=>We(u),zd:pt,readValueFromPointer:ri,Ad:null};function Vf(n){return it(n>>>0,qf)}var Lf=(n,u)=>{switch(u){case 4:return function(c){return this.fromWireType(Ue()[c>>>2>>>0])};case 8:return function(c){return this.fromWireType(Re()[c>>>3>>>0])};default:throw new TypeError(`invalid float width (${u}): ${n}`)}};function Gf(n,u,c){c>>>=0,it(n>>>=0,{name:u=Xe(u>>>0),fromWireType:h=>h,toWireType:(h,m)=>m,zd:pt,readValueFromPointer:Lf(u,c),Ad:null})}function Hf(n,u,c,h,m){if(n>>>=0,c>>>=0,u=Xe(u>>>0),m===-1&&(m=4294967295),m=A=>A,h===0){var x=32-8*c;m=A=>A<<x>>>x}var I=u.includes("unsigned")?function(A,R){return R>>>0}:function(A,R){return R};it(n,{name:u,fromWireType:m,toWireType:I,zd:pt,readValueFromPointer:An(u,c,h!==0),Ad:null})}function Ff(n,u,c){function h(x){var I=ce()[x>>>2>>>0];return x=ce()[x+4>>>2>>>0],new m(N().buffer,x,I)}var m=[Int8Array,Uint8Array,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array,BigInt64Array,BigUint64Array][u];it(n>>>=0,{name:c=Xe(c>>>0),fromWireType:h,zd:pt,readValueFromPointer:h},{Pd:!0})}function jf(n,u){it(n>>>=0,{name:u=Xe(u>>>0),fromWireType:function(c){for(var h,m=ce()[c>>>2>>>0],x=c+4,I=x,A=0;A<=m;++A){var R=x+A;A!=m&&V()[R>>>0]!=0||(I=Se(I,R-I),h===void 0?h=I:(h+="\0",h+=I),I=R+1)}return Ye(c),h},toWireType:function(c,h){h instanceof ArrayBuffer&&(h=new Uint8Array(h));var m=typeof h=="string";if(!(m||h instanceof Uint8Array||h instanceof Uint8ClampedArray||h instanceof Int8Array))throw new dt("Cannot pass non-string to std::string");var x=m?_n(h):h.length,I=br(4+x+1),A=I+4;if(ce()[I>>>2>>>0]=x,m)Bt(h,A,x+1);else if(m)for(m=0;m<x;++m){var R=h.charCodeAt(m);if(255<R)throw Ye(I),new dt("String has UTF-16 code units that do not fit in 8 bits");V()[A+m>>>0]=R}else for(m=0;m<x;++m)V()[A+m>>>0]=h[m];return c!==null&&c.push(Ye,I),I},zd:pt,readValueFromPointer:ri,Ad(c){Ye(c)}})}var On=typeof TextDecoder<"u"?new TextDecoder("utf-16le"):void 0,Kf=(n,u)=>{for(var c=n>>1,h=c+u/2;!(c>=h)&&be()[c>>>0];)++c;if(32<(c<<=1)-n&&On)return On.decode(V().slice(n,c));for(c="",h=0;!(h>=u/2);++h){var m=le()[n+2*h>>>1>>>0];if(m==0)break;c+=String.fromCharCode(m)}return c},Qf=(n,u,c)=>{if(c??(c=2147483647),2>c)return 0;var h=u;c=(c-=2)<2*n.length?c/2:n.length;for(var m=0;m<c;++m){var x=n.charCodeAt(m);le()[u>>>1>>>0]=x,u+=2}return le()[u>>>1>>>0]=0,u-h},Zf=n=>2*n.length,Xf=(n,u)=>{for(var c=0,h="";!(c>=u/4);){var m=D()[n+4*c>>>2>>>0];if(m==0)break;++c,65536<=m?(m-=65536,h+=String.fromCharCode(55296|m>>10,56320|1023&m)):h+=String.fromCharCode(m)}return h},Jf=(n,u,c)=>{if(u>>>=0,c??(c=2147483647),4>c)return 0;var h=u;c=h+c-4;for(var m=0;m<n.length;++m){var x=n.charCodeAt(m);if(55296<=x&&57343>=x&&(x=65536+((1023&x)<<10)|1023&n.charCodeAt(++m)),D()[u>>>2>>>0]=x,(u+=4)+4>c)break}return D()[u>>>2>>>0]=0,u-h},Yf=n=>{for(var u=0,c=0;c<n.length;++c){var h=n.charCodeAt(c);55296<=h&&57343>=h&&++c,u+=4}return u};function em(n,u,c){if(n>>>=0,u>>>=0,c=Xe(c>>>=0),u===2)var h=Kf,m=Qf,x=Zf,I=A=>be()[A>>>1>>>0];else u===4&&(h=Xf,m=Jf,x=Yf,I=A=>ce()[A>>>2>>>0]);it(n,{name:c,fromWireType:A=>{for(var R,U=ce()[A>>>2>>>0],H=A+4,X=0;X<=U;++X){var se=A+4+X*u;X!=U&&I(se)!=0||(H=h(H,se-H),R===void 0?R=H:(R+="\0",R+=H),H=se+u)}return Ye(A),R},toWireType:(A,R)=>{if(typeof R!="string")throw new dt(`Cannot pass non-string to C++ string type ${c}`);var U=x(R),H=br(4+U+u);return ce()[H>>>2>>>0]=U/u,m(R,H+4,U+u),A!==null&&A.push(Ye,H),H},zd:pt,readValueFromPointer:ri,Ad(A){Ye(A)}})}function tm(n,u){it(n>>>=0,{Qd:!0,name:u=Xe(u>>>0),zd:0,fromWireType:()=>{},toWireType:()=>{}})}function rm(n){di(n>>>0,!d,1,!l,131072,!1),ln()}var ii=n=>{if(!F)try{if(n(),!(0<ut))try{p?pi(z):Qr(z)}catch(u){u instanceof Fr||u=="unwind"||b(0,u)}}catch(u){u instanceof Fr||u=="unwind"||b(0,u)}};function ai(n){n>>>=0,typeof Atomics.ge=="function"&&(Atomics.ge(D(),n>>>2,n).value.then(pr),n+=128,Atomics.store(D(),n>>>2,1))}var pr=()=>{var n=wr();n&&(ai(n),ii(us))};function im(n,u){(n>>>=0)==u>>>0?setTimeout(pr):p?postMessage({Ed:n,yd:"checkMailbox"}):(n=bt[n])&&n.postMessage({yd:"checkMailbox"})}var ni=[];function am(n,u,c,h,m){for(u>>>=0,h/=2,ni.length=h,c=m>>>0>>>3,m=0;m<h;m++)ni[m]=J[c+2*m]?J[c+2*m+1]:Re()[c+2*m+1>>>0];return(u?Hr[u]:Zm[n])(...ni)}var nm=()=>{ut=0};function sm(n){n>>>=0,p?postMessage({yd:"cleanupThread",ee:n}):un(bt[n])}function om(n){}var cr=(n,u)=>{var c=Yr[n];if(c===void 0)throw n=rs(n),c=Xe(n),Ye(n),new dt(`${u} has unknown type ${c}`);return c},Rn=(n,u,c)=>{var h=[];return n=n.toWireType(h,c),h.length&&(ce()[u>>>2>>>0]=We(h)),n};function um(n,u,c){return u>>>=0,c>>>=0,n=Me(n>>>0),u=cr(u,"emval::as"),Rn(u,c,n)}function lm(n,u){return u>>>=0,n=Me(n>>>0),(u=cr(u,"emval::as")).toWireType(null,n)}var hr=n=>{try{n()}catch(u){rt(u)}},ct=0,Je=null,Bn=0,fr=[],Mn={},Nn={},dm=0,si=null,pm=[];function Dn(n){return function(u){if(!F){if(ct===0){var c=!1,h=!1;u((m=0)=>{if(!F&&(Bn=m,c=!0,h)){ct=2,hr(()=>so(Je)),typeof MainLoop<"u"&&MainLoop.Md&&MainLoop.resume(),m=!1;try{var x=function(){var R=D()[Je+8>>>2>>>0];return R=P[Nn[R]],--ut,R()}()}catch(R){x=R,m=!0}var I=!1;if(!Je){var A=si;A&&(si=null,(m?A.reject:A.resolve)(x),I=!0)}if(m&&!I)throw x}}),h=!0,c||(ct=1,Je=function(){var m=br(65548),x=m+12;ce()[m>>>2>>>0]=x,ce()[m+4>>>2>>>0]=x+65536,x=fr[0];var I=Mn[x];return I===void 0&&(I=dm++,Mn[x]=I,Nn[I]=x),x=I,D()[m+8>>>2>>>0]=x,m}(),typeof MainLoop<"u"&&MainLoop.Md&&MainLoop.pause(),hr(()=>ao(Je)))}else ct===2?(ct=0,hr(oo),Ye(Je),Je=null,pm.forEach(ii)):rt(`invalid state: ${ct}`);return Bn}}(u=>{n().then(u)})}function cm(n){return n>>>=0,Dn(async()=>{var u=await Me(n);return We(u)})}var mr=[];function hm(n,u,c,h){return c>>>=0,h>>>=0,(n=mr[n>>>0])(null,u=Me(u>>>0),c,h)}var fm={},gr=n=>{var u=fm[n];return u===void 0?Xe(n):u};function mm(n,u,c,h,m){return c>>>=0,h>>>=0,m>>>=0,(n=mr[n>>>0])(u=Me(u>>>0),u[c=gr(c)],h,m)}var Pn=()=>typeof globalThis=="object"?globalThis:Function("return this")();function gm(n){return(n>>>=0)==0?We(Pn()):(n=gr(n),We(Pn()[n]))}var ym=n=>{var u=mr.length;return mr.push(n),u},_m=(n,u)=>{for(var c=Array(n),h=0;h<n;++h)c[h]=cr(ce()[u+4*h>>>2>>>0],"parameter "+h);return c},Un=(n,u)=>Object.defineProperty(u,"name",{value:n});function wm(n,u,c){var h=(u=_m(n,u>>>0)).shift();n--;var m=`return function (obj, func, destructorsRef, args) {
`,x=0,I=[];c===0&&I.push("obj");for(var A=["retType"],R=[h],U=0;U<n;++U)I.push("arg"+U),A.push("argType"+U),R.push(u[U]),m+=`  var arg${U} = argType${U}.readValueFromPointer(args${x?"+"+x:""});
`,x+=u[U].zd;return m+=`  var rv = ${c===1?"new func":"func.call"}(${I.join(", ")});
`,h.Qd||(A.push("emval_returnValue"),R.push(Rn),m+=`  return emval_returnValue(retType, destructorsRef, rv);
`),A.push(m+`};
`),n=function(H){var X=Function;if(!(X instanceof Function))throw new TypeError(`new_ called with constructor type ${typeof X} which is not a function`);var se=Un(X.name||"unknownFunctionName",function(){});return se.prototype=X.prototype,se=new se,(H=X.apply(se,H))instanceof Object?H:se}(A)(...R),c=`methodCaller<(${u.map(H=>H.name).join(", ")}) => ${h.name}>`,ym(Un(c,n))}function bm(n){return n=gr(n>>>0),We(i[n])}function $m(n,u){return u>>>=0,n=Me(n>>>0),u=Me(u),We(n[u])}function vm(n){9<(n>>>=0)&&(at[n+1]+=1)}function xm(){return We([])}function km(n){n=Me(n>>>0);for(var u=Array(n.length),c=0;c<n.length;c++)u[c]=n[c];return We(u)}function Sm(n){return We(gr(n>>>0))}function Tm(){return We({})}function Cm(n){for(var u=Me(n>>>=0);u.length;){var c=u.pop();u.pop()(c)}ti(n)}function Im(n,u,c){u>>>=0,c>>>=0,n=Me(n>>>0),u=Me(u),c=Me(c),n[u]=c}function Em(n,u){return u>>>=0,n=(n=cr(n>>>0,"_emval_take_value")).readValueFromPointer(u),We(n)}function zm(n,u){n=-9007199254740992>n||9007199254740992<n?NaN:Number(n),u>>>=0,n=new Date(1e3*n),D()[u>>>2>>>0]=n.getUTCSeconds(),D()[u+4>>>2>>>0]=n.getUTCMinutes(),D()[u+8>>>2>>>0]=n.getUTCHours(),D()[u+12>>>2>>>0]=n.getUTCDate(),D()[u+16>>>2>>>0]=n.getUTCMonth(),D()[u+20>>>2>>>0]=n.getUTCFullYear()-1900,D()[u+24>>>2>>>0]=n.getUTCDay(),n=(n.getTime()-Date.UTC(n.getUTCFullYear(),0,1,0,0,0,0))/864e5|0,D()[u+28>>>2>>>0]=n}var Wn=n=>n%4==0&&(n%100!=0||n%400==0),qn=[0,31,60,91,121,152,182,213,244,274,305,335],Vn=[0,31,59,90,120,151,181,212,243,273,304,334];function Am(n,u){n=-9007199254740992>n||9007199254740992<n?NaN:Number(n),u>>>=0,n=new Date(1e3*n),D()[u>>>2>>>0]=n.getSeconds(),D()[u+4>>>2>>>0]=n.getMinutes(),D()[u+8>>>2>>>0]=n.getHours(),D()[u+12>>>2>>>0]=n.getDate(),D()[u+16>>>2>>>0]=n.getMonth(),D()[u+20>>>2>>>0]=n.getFullYear()-1900,D()[u+24>>>2>>>0]=n.getDay();var c=(Wn(n.getFullYear())?qn:Vn)[n.getMonth()]+n.getDate()-1|0;D()[u+28>>>2>>>0]=c,D()[u+36>>>2>>>0]=-60*n.getTimezoneOffset(),c=new Date(n.getFullYear(),6,1).getTimezoneOffset();var h=new Date(n.getFullYear(),0,1).getTimezoneOffset();n=0|(c!=h&&n.getTimezoneOffset()==Math.min(h,c)),D()[u+32>>>2>>>0]=n}function Om(n){n>>>=0;var u=new Date(D()[n+20>>>2>>>0]+1900,D()[n+16>>>2>>>0],D()[n+12>>>2>>>0],D()[n+8>>>2>>>0],D()[n+4>>>2>>>0],D()[n>>>2>>>0],0),c=D()[n+32>>>2>>>0],h=u.getTimezoneOffset(),m=new Date(u.getFullYear(),6,1).getTimezoneOffset(),x=new Date(u.getFullYear(),0,1).getTimezoneOffset(),I=Math.min(x,m);return 0>c?D()[n+32>>>2>>>0]=+(m!=x&&I==h):0<c!=(I==h)&&(m=Math.max(x,m),u.setTime(u.getTime()+6e4*((0<c?I:m)-h))),D()[n+24>>>2>>>0]=u.getDay(),c=(Wn(u.getFullYear())?qn:Vn)[u.getMonth()]+u.getDate()-1|0,D()[n+28>>>2>>>0]=c,D()[n>>>2>>>0]=u.getSeconds(),D()[n+4>>>2>>>0]=u.getMinutes(),D()[n+8>>>2>>>0]=u.getHours(),D()[n+12>>>2>>>0]=u.getDate(),D()[n+16>>>2>>>0]=u.getMonth(),D()[n+20>>>2>>>0]=u.getYear(),n=u.getTime(),BigInt(isNaN(n)?-1:n/1e3)}function Ln(n,u,c,h,m,x,I){return p?ve(16,1,n,u,c,h,m,x,I):-52}function Gn(n,u,c,h,m,x){if(p)return ve(17,1,n,u,c,h,m,x)}var Gt={},Rm=()=>performance.timeOrigin+performance.now();function Hn(n,u){if(p)return ve(18,1,n,u);if(Gt[n]&&(clearTimeout(Gt[n].id),delete Gt[n]),!u)return 0;var c=setTimeout(()=>{delete Gt[n],ii(()=>os(n,performance.timeOrigin+performance.now()))},u);return Gt[n]={id:c,ke:u},0}function Bm(n,u,c,h){n>>>=0,u>>>=0,c>>>=0,h>>>=0;var m=new Date().getFullYear(),x=new Date(m,0,1).getTimezoneOffset();m=new Date(m,6,1).getTimezoneOffset();var I=Math.max(x,m);ce()[n>>>2>>>0]=60*I,D()[u>>>2>>>0]=+(x!=m),n=(u=A=>{var R=Math.abs(A);return`UTC${0<=A?"-":"+"}${String(Math.floor(R/60)).padStart(2,"0")}${String(R%60).padStart(2,"0")}`})(x),u=u(m),m<x?(Bt(n,c,17),Bt(u,h,17)):(Bt(n,h,17),Bt(u,c,17))}var Mm=()=>Date.now();function Nm(n,u,c){return 0<=n&&3>=n?(n===0?n=Date.now():n=performance.timeOrigin+performance.now(),J[c>>>0>>>3]=BigInt(Math.round(1e6*n)),0):28}var oi=[],Fn=(n,u)=>{oi.length=0;for(var c;c=V()[n++>>>0];){var h=c!=105;u+=(h&=c!=112)&&u%8?4:0,oi.push(c==112?ce()[u>>>2>>>0]:c==106?J[u>>>3]:c==105?D()[u>>>2>>>0]:Re()[u>>>3>>>0]),u+=h?8:4}return oi};function Dm(n,u,c){return n>>>=0,u=Fn(u>>>0,c>>>0),Hr[n](...u)}function Pm(n,u,c){return n>>>=0,u=Fn(u>>>0,c>>>0),Hr[n](...u)}var Um=()=>{};function Wm(n,u){return S(Se(n>>>0,u>>>0))}var qm=()=>{throw ut+=1,"unwind"};function Vm(){return 4294901760}var Lm=()=>navigator.hardwareConcurrency;function Gm(){return rt("Cannot use emscripten_pc_get_function without -sUSE_OFFSET_CONVERTER"),0}function Hm(n){n>>>=0;var u=V().length;if(n<=u||4294901760<n)return!1;for(var c=1;4>=c;c*=2){var h=u*(1+.2/c);h=Math.min(h,n+100663296);e:{h=(Math.min(4294901760,65536*Math.ceil(Math.max(n,h)/65536))-C.buffer.byteLength+65535)/65536|0;try{C.grow(h),ye();var m=1;break e}catch{}m=void 0}if(m)return!0}return!1}var yr=()=>(rt("Cannot use convertFrameToPC (needed by __builtin_return_address) without -sUSE_OFFSET_CONVERTER"),0),Ht={},jn=n=>{n.forEach(u=>{yr()})};function Fm(){var n=Error().stack.toString().split(`
`);return n[0]=="Error"&&n.shift(),jn(n),Ht.Kd=yr(),Ht.ae=n,Ht.Kd}function jm(n,u,c){if(n>>>=0,u>>>=0,Ht.Kd==n)var h=Ht.ae;else(h=Error().stack.toString().split(`
`))[0]=="Error"&&h.shift(),jn(h);for(var m=3;h[m]&&yr()!=n;)++m;for(n=0;n<c&&h[n+m];++n)D()[u+4*n>>>2>>>0]=yr();return n}var ui,li={},Kn=()=>{if(!ui){var n,u={USER:"web_user",LOGNAME:"web_user",PATH:"/",PWD:"/",HOME:"/home/web_user",LANG:(typeof navigator=="object"&&navigator.languages&&navigator.languages[0]||"C").replace("-","_")+".UTF-8",_:"./this.program"};for(n in li)li[n]===void 0?delete u[n]:u[n]=li[n];var c=[];for(n in u)c.push(`${n}=${u[n]}`);ui=c}return ui};function Qn(n,u){if(p)return ve(19,1,n,u);n>>>=0,u>>>=0;var c=0;return Kn().forEach((h,m)=>{var x=u+c;for(m=ce()[n+4*m>>>2>>>0]=x,x=0;x<h.length;++x)N()[m++>>>0]=h.charCodeAt(x);N()[m>>>0]=0,c+=h.length+1}),0}function Zn(n,u){if(p)return ve(20,1,n,u);n>>>=0,u>>>=0;var c=Kn();ce()[n>>>2>>>0]=c.length;var h=0;return c.forEach(m=>h+=m.length+1),ce()[u>>>2>>>0]=h,0}function Xn(n){return p?ve(21,1,n):52}function Jn(n,u,c,h){return p?ve(22,1,n,u,c,h):52}function Yn(n,u,c,h){return p?ve(23,1,n,u,c,h):70}var Km=[null,[],[]];function es(n,u,c,h){if(p)return ve(24,1,n,u,c,h);u>>>=0,c>>>=0,h>>>=0;for(var m=0,x=0;x<c;x++){var I=ce()[u>>>2>>>0],A=ce()[u+4>>>2>>>0];u+=8;for(var R=0;R<A;R++){var U=V()[I+R>>>0],H=Km[n];U===0||U===10?((n===1?T:S)(mn(H)),H.length=0):H.push(U)}m+=A}return ce()[h>>>2>>>0]=m,0}function Qm(n){return n>>>0}p||function(){for(var n=i.numThreads-1;n--;)pn();jr.unshift(()=>{wt++,function(u){p?u():Promise.all(lt.map(dn)).then(u)}(()=>tn())})}();for(var ts=Array(256),_r=0;256>_r;++_r)ts[_r]=String.fromCharCode(_r);zn=ts,dt=i.BindingError=class extends Error{constructor(n){super(n),this.name="BindingError"}},i.InternalError=class extends Error{constructor(n){super(n),this.name="InternalError"}},at.push(0,1,void 0,1,null,1,!0,1,!1,1),i.count_emval_handles=()=>at.length/2-5-ei.length;var P,Zm=[Kr,sn,cn,gn,yn,wn,bn,$n,vn,xn,kn,Sn,Tn,Cn,In,En,Ln,Gn,Hn,Qn,Zn,Xn,Jn,Yn,es];(async function(){function n(h,m){return P=h.exports,P=function(){var x=P,I={};for(let[A,R]of Object.entries(x))I[A]=typeof R=="function"?(...U)=>{fr.push(A);try{return R(...U)}finally{F||(fr.pop(),Je&&ct===1&&fr.length===0&&(ct=0,ut+=1,hr(no),typeof Fibers<"u"&&Fibers.le()))}}:R;return I}(),P=function(){var x=P,I=R=>U=>R(U)>>>0,A=R=>()=>R()>>>0;return(x=Object.assign({},x)).Cb=I(x.Cb),x.fc=A(x.fc),x.ic=I(x.ic),x.vc=I(x.vc),x.wc=A(x.wc),x.Ac=I(x.Ac),x}(),on.push(P.jc),E=m,tn(),P}wt++;var u=rn();if(i.instantiateWasm)return new Promise(h=>{i.instantiateWasm(u,(m,x)=>{n(m,x),h(m.exports)})});if(p)return new Promise(h=>{_t=m=>{var x=new WebAssembly.Instance(m,rn());h(n(x,m))}});qt??(qt=i.locateFile?i.locateFile?i.locateFile("ort-wasm-simd-threaded.jsep.wasm",k):k+"ort-wasm-simd-threaded.jsep.wasm":new URL("/assets/ort-wasm-simd-threaded.jsep.wasm",import.meta.url).href);try{var c=await async function(h){var m=qt;if(!me&&typeof WebAssembly.instantiateStreaming=="function"&&!ge(m))try{var x=fetch(m,{credentials:"same-origin"});return await WebAssembly.instantiateStreaming(x,h)}catch(I){S(`wasm streaming compile failed: ${I}`),S("falling back to ArrayBuffer instantiation")}return async function(I,A){try{var R=await async function(U){if(!me)try{var H=await y(U);return new Uint8Array(H)}catch{}if(U==qt&&me)U=new Uint8Array(me);else{if(!_)throw"both async and sync fetching of the wasm failed";U=_(U)}return U}(I);return await WebAssembly.instantiate(R,A)}catch(U){S(`failed to asynchronously prepare wasm: ${U}`),rt(U)}}(m,h)}(u);return n(c.instance,c.module)}catch(h){return s(h),Promise.reject(h)}})();var rs=n=>(rs=P.Cb)(n),is=()=>(is=P.Db)();i._OrtInit=(n,u)=>(i._OrtInit=P.Eb)(n,u),i._OrtGetLastError=(n,u)=>(i._OrtGetLastError=P.Fb)(n,u),i._OrtCreateSessionOptions=(n,u,c,h,m,x,I,A,R,U)=>(i._OrtCreateSessionOptions=P.Gb)(n,u,c,h,m,x,I,A,R,U),i._OrtAppendExecutionProvider=(n,u)=>(i._OrtAppendExecutionProvider=P.Hb)(n,u),i._OrtAddFreeDimensionOverride=(n,u,c)=>(i._OrtAddFreeDimensionOverride=P.Ib)(n,u,c),i._OrtAddSessionConfigEntry=(n,u,c)=>(i._OrtAddSessionConfigEntry=P.Jb)(n,u,c),i._OrtReleaseSessionOptions=n=>(i._OrtReleaseSessionOptions=P.Kb)(n),i._OrtCreateSession=(n,u,c)=>(i._OrtCreateSession=P.Lb)(n,u,c),i._OrtReleaseSession=n=>(i._OrtReleaseSession=P.Mb)(n),i._OrtGetInputOutputCount=(n,u,c)=>(i._OrtGetInputOutputCount=P.Nb)(n,u,c),i._OrtGetInputName=(n,u)=>(i._OrtGetInputName=P.Ob)(n,u),i._OrtGetOutputName=(n,u)=>(i._OrtGetOutputName=P.Pb)(n,u),i._OrtFree=n=>(i._OrtFree=P.Qb)(n),i._OrtCreateTensor=(n,u,c,h,m,x)=>(i._OrtCreateTensor=P.Rb)(n,u,c,h,m,x),i._OrtGetTensorData=(n,u,c,h,m)=>(i._OrtGetTensorData=P.Sb)(n,u,c,h,m),i._OrtReleaseTensor=n=>(i._OrtReleaseTensor=P.Tb)(n),i._OrtCreateRunOptions=(n,u,c,h)=>(i._OrtCreateRunOptions=P.Ub)(n,u,c,h),i._OrtAddRunConfigEntry=(n,u,c)=>(i._OrtAddRunConfigEntry=P.Vb)(n,u,c),i._OrtReleaseRunOptions=n=>(i._OrtReleaseRunOptions=P.Wb)(n),i._OrtCreateBinding=n=>(i._OrtCreateBinding=P.Xb)(n),i._OrtBindInput=(n,u,c)=>(i._OrtBindInput=P.Yb)(n,u,c),i._OrtBindOutput=(n,u,c,h)=>(i._OrtBindOutput=P.Zb)(n,u,c,h),i._OrtClearBoundOutputs=n=>(i._OrtClearBoundOutputs=P._b)(n),i._OrtReleaseBinding=n=>(i._OrtReleaseBinding=P.$b)(n),i._OrtRunWithBinding=(n,u,c,h,m)=>(i._OrtRunWithBinding=P.ac)(n,u,c,h,m),i._OrtRun=(n,u,c,h,m,x,I,A)=>(i._OrtRun=P.bc)(n,u,c,h,m,x,I,A),i._OrtEndProfiling=n=>(i._OrtEndProfiling=P.cc)(n),i._JsepOutput=(n,u,c)=>(i._JsepOutput=P.dc)(n,u,c),i._JsepGetNodeName=n=>(i._JsepGetNodeName=P.ec)(n);var wr=()=>(wr=P.fc)(),Ye=i._free=n=>(Ye=i._free=P.gc)(n),br=i._malloc=n=>(br=i._malloc=P.ic)(n),di=(n,u,c,h,m,x)=>(di=P.kc)(n,u,c,h,m,x),as=()=>(as=P.lc)(),ns=(n,u,c,h,m)=>(ns=P.mc)(n,u,c,h,m),ss=n=>(ss=P.nc)(n),pi=n=>(pi=P.oc)(n),os=(n,u)=>(os=P.pc)(n,u),us=()=>(us=P.qc)(),ne=(n,u)=>(ne=P.rc)(n,u),Ft=n=>(Ft=P.sc)(n),ls=(n,u)=>(ls=P.tc)(n,u),re=n=>(re=P.uc)(n),ci=n=>(ci=P.vc)(n),ie=()=>(ie=P.wc)(),ds=n=>(ds=P.xc)(n),ps=n=>(ps=P.yc)(n),cs=(n,u,c)=>(cs=P.zc)(n,u,c),hs=n=>(hs=P.Ac)(n),fs=i.dynCall_iii=(n,u,c)=>(fs=i.dynCall_iii=P.Bc)(n,u,c),ms=i.dynCall_vi=(n,u)=>(ms=i.dynCall_vi=P.Cc)(n,u),hi=i.dynCall_ii=(n,u)=>(hi=i.dynCall_ii=P.Dc)(n,u),gs=i.dynCall_vii=(n,u,c)=>(gs=i.dynCall_vii=P.Ec)(n,u,c),ys=i.dynCall_iiii=(n,u,c,h)=>(ys=i.dynCall_iiii=P.Fc)(n,u,c,h),_s=i.dynCall_viii=(n,u,c,h)=>(_s=i.dynCall_viii=P.Gc)(n,u,c,h),ws=i.dynCall_iiiii=(n,u,c,h,m)=>(ws=i.dynCall_iiiii=P.Hc)(n,u,c,h,m),bs=i.dynCall_viiii=(n,u,c,h,m)=>(bs=i.dynCall_viiii=P.Ic)(n,u,c,h,m),$s=i.dynCall_viiiiii=(n,u,c,h,m,x,I)=>($s=i.dynCall_viiiiii=P.Jc)(n,u,c,h,m,x,I),vs=i.dynCall_viiiiiii=(n,u,c,h,m,x,I,A)=>(vs=i.dynCall_viiiiiii=P.Kc)(n,u,c,h,m,x,I,A),xs=i.dynCall_ji=(n,u)=>(xs=i.dynCall_ji=P.Lc)(n,u),ks=i.dynCall_v=n=>(ks=i.dynCall_v=P.Mc)(n),Ss=i.dynCall_viiiii=(n,u,c,h,m,x)=>(Ss=i.dynCall_viiiii=P.Nc)(n,u,c,h,m,x),Ts=i.dynCall_i=n=>(Ts=i.dynCall_i=P.Oc)(n),Cs=i.dynCall_fii=(n,u,c)=>(Cs=i.dynCall_fii=P.Pc)(n,u,c),Is=i.dynCall_viiiiiiii=(n,u,c,h,m,x,I,A,R)=>(Is=i.dynCall_viiiiiiii=P.Qc)(n,u,c,h,m,x,I,A,R),Es=i.dynCall_viiiiiiiiii=(n,u,c,h,m,x,I,A,R,U,H)=>(Es=i.dynCall_viiiiiiiiii=P.Rc)(n,u,c,h,m,x,I,A,R,U,H),zs=i.dynCall_jiii=(n,u,c,h)=>(zs=i.dynCall_jiii=P.Sc)(n,u,c,h),As=i.dynCall_dii=(n,u,c)=>(As=i.dynCall_dii=P.Tc)(n,u,c),Os=i.dynCall_viiiiiiiii=(n,u,c,h,m,x,I,A,R,U)=>(Os=i.dynCall_viiiiiiiii=P.Uc)(n,u,c,h,m,x,I,A,R,U),Rs=i.dynCall_viiiiiiiiiii=(n,u,c,h,m,x,I,A,R,U,H,X)=>(Rs=i.dynCall_viiiiiiiiiii=P.Vc)(n,u,c,h,m,x,I,A,R,U,H,X),Bs=i.dynCall_iiiiii=(n,u,c,h,m,x)=>(Bs=i.dynCall_iiiiii=P.Wc)(n,u,c,h,m,x),Ms=i.dynCall_iij=(n,u,c)=>(Ms=i.dynCall_iij=P.Xc)(n,u,c),Ns=i.dynCall_iiiiiiiiii=(n,u,c,h,m,x,I,A,R,U)=>(Ns=i.dynCall_iiiiiiiiii=P.Yc)(n,u,c,h,m,x,I,A,R,U),Ds=i.dynCall_iiiiiiiiiii=(n,u,c,h,m,x,I,A,R,U,H)=>(Ds=i.dynCall_iiiiiiiiiii=P.Zc)(n,u,c,h,m,x,I,A,R,U,H),Ps=i.dynCall_vij=(n,u,c)=>(Ps=i.dynCall_vij=P._c)(n,u,c),Us=i.dynCall_iiif=(n,u,c,h)=>(Us=i.dynCall_iiif=P.$c)(n,u,c,h),Ws=i.dynCall_iiij=(n,u,c,h)=>(Ws=i.dynCall_iiij=P.ad)(n,u,c,h),qs=i.dynCall_fiii=(n,u,c,h)=>(qs=i.dynCall_fiii=P.bd)(n,u,c,h),Vs=i.dynCall_viiiiiiiiiiiii=(n,u,c,h,m,x,I,A,R,U,H,X,se,we)=>(Vs=i.dynCall_viiiiiiiiiiiii=P.cd)(n,u,c,h,m,x,I,A,R,U,H,X,se,we),Ls=i.dynCall_vjiii=(n,u,c,h,m)=>(Ls=i.dynCall_vjiii=P.dd)(n,u,c,h,m),Gs=i.dynCall_vif=(n,u,c)=>(Gs=i.dynCall_vif=P.ed)(n,u,c),Hs=i.dynCall_iiiiiii=(n,u,c,h,m,x,I)=>(Hs=i.dynCall_iiiiiii=P.fd)(n,u,c,h,m,x,I),Fs=i.dynCall_iiiij=(n,u,c,h,m)=>(Fs=i.dynCall_iiiij=P.gd)(n,u,c,h,m),js=i.dynCall_iiiiiiii=(n,u,c,h,m,x,I,A)=>(js=i.dynCall_iiiiiiii=P.hd)(n,u,c,h,m,x,I,A),Ks=i.dynCall_viiiiiiiiiiii=(n,u,c,h,m,x,I,A,R,U,H,X,se)=>(Ks=i.dynCall_viiiiiiiiiiii=P.id)(n,u,c,h,m,x,I,A,R,U,H,X,se),Qs=i.dynCall_diii=(n,u,c,h)=>(Qs=i.dynCall_diii=P.jd)(n,u,c,h),Zs=i.dynCall_jiiii=(n,u,c,h,m)=>(Zs=i.dynCall_jiiii=P.kd)(n,u,c,h,m),Xs=i.dynCall_viiij=(n,u,c,h,m)=>(Xs=i.dynCall_viiij=P.ld)(n,u,c,h,m),Js=i.dynCall_fiiii=(n,u,c,h,m)=>(Js=i.dynCall_fiiii=P.md)(n,u,c,h,m),Ys=i.dynCall_viiif=(n,u,c,h,m)=>(Ys=i.dynCall_viiif=P.nd)(n,u,c,h,m),eo=i.dynCall_diiii=(n,u,c,h,m)=>(eo=i.dynCall_diiii=P.od)(n,u,c,h,m),to=i.dynCall_viiid=(n,u,c,h,m)=>(to=i.dynCall_viiid=P.pd)(n,u,c,h,m),ro=i.dynCall_iiiijii=(n,u,c,h,m,x,I)=>(ro=i.dynCall_iiiijii=P.qd)(n,u,c,h,m,x,I),io=i.dynCall_iiiiiij=(n,u,c,h,m,x,I)=>(io=i.dynCall_iiiiiij=P.rd)(n,u,c,h,m,x,I),ao=n=>(ao=P.sd)(n),no=()=>(no=P.td)(),so=n=>(so=P.ud)(n),oo=()=>(oo=P.vd)();function Xm(n,u,c){var h=ie();try{gs(n,u,c)}catch(m){if(re(h),m!==m+0)throw m;ne(1,0)}}function Jm(n,u,c){var h=ie();try{return fs(n,u,c)}catch(m){if(re(h),m!==m+0)throw m;ne(1,0)}}function Ym(n,u){var c=ie();try{ms(n,u)}catch(h){if(re(c),h!==h+0)throw h;ne(1,0)}}function eg(n,u){var c=ie();try{return hi(n,u)}catch(h){if(re(c),h!==h+0)throw h;ne(1,0)}}function tg(n,u,c,h){var m=ie();try{return ys(n,u,c,h)}catch(x){if(re(m),x!==x+0)throw x;ne(1,0)}}function rg(n,u,c,h,m){var x=ie();try{bs(n,u,c,h,m)}catch(I){if(re(x),I!==I+0)throw I;ne(1,0)}}function ig(n,u,c,h,m){var x=ie();try{return ws(n,u,c,h,m)}catch(I){if(re(x),I!==I+0)throw I;ne(1,0)}}function ag(n,u,c,h){var m=ie();try{_s(n,u,c,h)}catch(x){if(re(m),x!==x+0)throw x;ne(1,0)}}function ng(n,u,c,h,m,x,I){var A=ie();try{return Hs(n,u,c,h,m,x,I)}catch(R){if(re(A),R!==R+0)throw R;ne(1,0)}}function sg(n){var u=ie();try{ks(n)}catch(c){if(re(u),c!==c+0)throw c;ne(1,0)}}function og(n,u,c){var h=ie();try{return Ms(n,u,c)}catch(m){if(re(h),m!==m+0)throw m;ne(1,0)}}function ug(n,u,c,h,m,x){var I=ie();try{Ss(n,u,c,h,m,x)}catch(A){if(re(I),A!==A+0)throw A;ne(1,0)}}function lg(n,u,c){var h=ie();try{Ps(n,u,c)}catch(m){if(re(h),m!==m+0)throw m;ne(1,0)}}function dg(n,u,c,h,m,x,I){var A=ie();try{$s(n,u,c,h,m,x,I)}catch(R){if(re(A),R!==R+0)throw R;ne(1,0)}}function pg(n,u,c,h,m,x,I,A){var R=ie();try{vs(n,u,c,h,m,x,I,A)}catch(U){if(re(R),U!==U+0)throw U;ne(1,0)}}function cg(n,u,c,h,m,x){var I=ie();try{return Bs(n,u,c,h,m,x)}catch(A){if(re(I),A!==A+0)throw A;ne(1,0)}}function hg(n,u,c,h,m,x,I,A){var R=ie();try{return js(n,u,c,h,m,x,I,A)}catch(U){if(re(R),U!==U+0)throw U;ne(1,0)}}function fg(n,u,c,h,m,x,I,A,R,U){var H=ie();try{Os(n,u,c,h,m,x,I,A,R,U)}catch(X){if(re(H),X!==X+0)throw X;ne(1,0)}}function mg(n,u,c,h,m,x,I,A,R){var U=ie();try{Is(n,u,c,h,m,x,I,A,R)}catch(H){if(re(U),H!==H+0)throw H;ne(1,0)}}function gg(n){var u=ie();try{return Ts(n)}catch(c){if(re(u),c!==c+0)throw c;ne(1,0)}}function yg(n,u,c,h,m,x,I,A,R,U){var H=ie();try{return Ns(n,u,c,h,m,x,I,A,R,U)}catch(X){if(re(H),X!==X+0)throw X;ne(1,0)}}function _g(n,u,c){var h=ie();try{return Cs(n,u,c)}catch(m){if(re(h),m!==m+0)throw m;ne(1,0)}}function wg(n,u,c,h){var m=ie();try{return zs(n,u,c,h)}catch(x){if(re(m),x!==x+0)throw x;return ne(1,0),0n}}function bg(n,u,c){var h=ie();try{return As(n,u,c)}catch(m){if(re(h),m!==m+0)throw m;ne(1,0)}}function $g(n,u,c,h,m,x,I,A,R,U,H,X){var se=ie();try{Rs(n,u,c,h,m,x,I,A,R,U,H,X)}catch(we){if(re(se),we!==we+0)throw we;ne(1,0)}}function vg(n,u,c,h,m,x,I,A,R,U,H){var X=ie();try{Es(n,u,c,h,m,x,I,A,R,U,H)}catch(se){if(re(X),se!==se+0)throw se;ne(1,0)}}function xg(n,u,c,h,m,x,I,A,R,U,H){var X=ie();try{return Ds(n,u,c,h,m,x,I,A,R,U,H)}catch(se){if(re(X),se!==se+0)throw se;ne(1,0)}}function kg(n,u,c,h){var m=ie();try{return Us(n,u,c,h)}catch(x){if(re(m),x!==x+0)throw x;ne(1,0)}}function Sg(n,u,c,h){var m=ie();try{return Ws(n,u,c,h)}catch(x){if(re(m),x!==x+0)throw x;ne(1,0)}}function Tg(n,u,c,h){var m=ie();try{return qs(n,u,c,h)}catch(x){if(re(m),x!==x+0)throw x;ne(1,0)}}function Cg(n,u,c,h,m,x,I,A,R,U,H,X,se,we){var qe=ie();try{Vs(n,u,c,h,m,x,I,A,R,U,H,X,se,we)}catch(jt){if(re(qe),jt!==jt+0)throw jt;ne(1,0)}}function Ig(n,u,c,h,m){var x=ie();try{Ls(n,u,c,h,m)}catch(I){if(re(x),I!==I+0)throw I;ne(1,0)}}function Eg(n,u,c){var h=ie();try{Gs(n,u,c)}catch(m){if(re(h),m!==m+0)throw m;ne(1,0)}}function zg(n,u){var c=ie();try{return xs(n,u)}catch(h){if(re(c),h!==h+0)throw h;return ne(1,0),0n}}function Ag(n,u,c,h,m){var x=ie();try{return Fs(n,u,c,h,m)}catch(I){if(re(x),I!==I+0)throw I;ne(1,0)}}function Og(n,u,c,h,m,x,I,A,R,U,H,X,se){var we=ie();try{Ks(n,u,c,h,m,x,I,A,R,U,H,X,se)}catch(qe){if(re(we),qe!==qe+0)throw qe;ne(1,0)}}function Rg(n,u,c,h){var m=ie();try{return Qs(n,u,c,h)}catch(x){if(re(m),x!==x+0)throw x;ne(1,0)}}function Bg(n,u,c,h,m){var x=ie();try{return Zs(n,u,c,h,m)}catch(I){if(re(x),I!==I+0)throw I;return ne(1,0),0n}}function Mg(n,u,c,h,m){var x=ie();try{Xs(n,u,c,h,m)}catch(I){if(re(x),I!==I+0)throw I;ne(1,0)}}function Ng(n,u,c,h,m){var x=ie();try{return Js(n,u,c,h,m)}catch(I){if(re(x),I!==I+0)throw I;ne(1,0)}}function Dg(n,u,c,h,m){var x=ie();try{Ys(n,u,c,h,m)}catch(I){if(re(x),I!==I+0)throw I;ne(1,0)}}function Pg(n,u,c,h,m){var x=ie();try{return eo(n,u,c,h,m)}catch(I){if(re(x),I!==I+0)throw I;ne(1,0)}}function Ug(n,u,c,h,m){var x=ie();try{to(n,u,c,h,m)}catch(I){if(re(x),I!==I+0)throw I;ne(1,0)}}function Wg(n,u,c,h,m,x,I){var A=ie();try{return ro(n,u,c,h,m,x,I)}catch(R){if(re(A),R!==R+0)throw R;ne(1,0)}}function qg(n,u,c,h,m,x,I){var A=ie();try{return io(n,u,c,h,m,x,I)}catch(R){if(re(A),R!==R+0)throw R;ne(1,0)}}return i.stackSave=()=>ie(),i.stackRestore=n=>re(n),i.stackAlloc=n=>ci(n),i.setValue=function(n,u,c="i8"){switch(c.endsWith("*")&&(c="*"),c){case"i1":case"i8":N()[n>>>0]=u;break;case"i16":le()[n>>>1>>>0]=u;break;case"i32":D()[n>>>2>>>0]=u;break;case"i64":J[n>>>3]=BigInt(u);break;case"float":Ue()[n>>>2>>>0]=u;break;case"double":Re()[n>>>3>>>0]=u;break;case"*":ce()[n>>>2>>>0]=u;break;default:rt(`invalid type for setValue: ${c}`)}},i.getValue=function(n,u="i8"){switch(u.endsWith("*")&&(u="*"),u){case"i1":case"i8":return N()[n>>>0];case"i16":return le()[n>>>1>>>0];case"i32":return D()[n>>>2>>>0];case"i64":return J[n>>>3];case"float":return Ue()[n>>>2>>>0];case"double":return Re()[n>>>3>>>0];case"*":return ce()[n>>>2>>>0];default:rt(`invalid type for getValue: ${u}`)}},i.UTF8ToString=Se,i.stringToUTF8=Bt,i.lengthBytesUTF8=_n,function n(){if(0<wt)Vt=n;else if(p)a(i),ot();else{for(;0<jr.length;)jr.shift()(i);0<wt?Vt=n:(i.calledRun=!0,F||(ot(),a(i)))}}(),i.PTR_SIZE=4,o}),dp=bi,co=(t=(e=globalThis.self)==null?void 0:e.name)==null?void 0:t.startsWith("em-pthread"),co&&bi()}),$i,ho,Ne,pp,vr,fo,mo,vi,go,xi,cp,ki,hp,Ea=q(()=>{Ia(),$i=typeof location>"u"?void 0:location.origin,ho=()=>{var e;return(e=import.meta.url)!=null&&e.startsWith("file:")?new URL(new URL("/assets/ort.bundle.min.mjs",import.meta.url).href,$i).href:import.meta.url},Ne=ho(),pp=()=>{if(Ne&&!Ne.startsWith("blob:"))return Ne.substring(0,Ne.lastIndexOf("/")+1)},vr=(e,t)=>{try{let r=t??Ne;return(r?new URL(e,r):new URL(e)).origin===$i}catch{return!1}},fo=(e,t)=>{let r=t??Ne;try{return(r?new URL(e,r):new URL(e)).href}catch{return}},mo=(e,t)=>`${t??"./"}${e}`,vi=async e=>{let t=await(await fetch(e,{credentials:"same-origin"})).blob();return URL.createObjectURL(t)},go=async e=>(await import(e)).default,xi=(ly(),Dr(op)).default,cp=async()=>{if(!Ne)throw new Error("Failed to load proxy worker: cannot determine the script source URL.");if(vr(Ne))return[void 0,xi()];let e=await vi(Ne);return[e,xi(e)]},ki=(dy(),Dr(lp)).default,hp=async(e,t,r)=>{if(!e&&!t&&ki&&Ne&&vr(Ne))return[void 0,ki];{let a="ort-wasm-simd-threaded.jsep.mjs",s=e??fo(a,t),i=r&&s&&!vr(s,t),o=i?await vi(s):s??mo(a,t);return[i?o:void 0,await go(o)]}}}),Si,xr,Qt,Ti,yo,_o,za,Ce,At=q(()=>{Ea(),xr=!1,Qt=!1,Ti=!1,yo=()=>{if(typeof SharedArrayBuffer>"u")return!1;try{return typeof MessageChannel<"u"&&new MessageChannel().port1.postMessage(new SharedArrayBuffer(1)),WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,5,4,1,3,1,1,10,11,1,9,0,65,0,254,16,2,0,26,11]))}catch{return!1}},_o=()=>{try{return WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,10,30,1,28,0,65,0,253,15,253,12,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,253,186,1,26,11]))}catch{return!1}},za=async e=>{if(xr)return Promise.resolve();if(Qt)throw new Error("multiple calls to 'initializeWebAssembly()' detected.");if(Ti)throw new Error("previous call to 'initializeWebAssembly()' failed.");Qt=!0;let t=e.initTimeout,r=e.numThreads;if(!_o())throw new Error("WebAssembly SIMD is not supported in the current environment.");let a=yo();r>1&&!a&&(typeof self<"u"&&!self.crossOriginIsolated&&console.warn("env.wasm.numThreads is set to "+r+", but this will not work unless you enable crossOriginIsolated mode. See https://web.dev/cross-origin-isolation-guide/ for more info."),console.warn("WebAssembly multi-threading is not supported in the current environment. Falling back to single-threading."),e.numThreads=r=1);let s=e.wasmPaths,i=typeof s=="string"?s:void 0,o=s==null?void 0:s.mjs,l=(o==null?void 0:o.href)??o,d=s==null?void 0:s.wasm,p=(d==null?void 0:d.href)??d,g=e.wasmBinary,[f,y]=await hp(l,i,r>1),_=!1,w=[];if(t>0&&w.push(new Promise(b=>{setTimeout(()=>{_=!0,b()},t)})),w.push(new Promise((b,k)=>{let v={numThreads:r};if(g)v.wasmBinary=g;else if(p||i)v.locateFile=$=>p??i+$;else if(l&&l.indexOf("blob:")!==0)v.locateFile=$=>new URL($,l).href;else if(f){let $=pp();$&&(v.locateFile=T=>$+T)}y(v).then($=>{Qt=!1,xr=!0,Si=$,b(),f&&URL.revokeObjectURL(f)},$=>{Qt=!1,Ti=!0,k($)})})),await Promise.race(w),_)throw new Error(`WebAssembly backend initializing failed due to timeout: ${t}ms`)},Ce=()=>{if(xr&&Si)return Si;throw new Error("WebAssembly is not initialized yet.")}}),ze,Ur,fe,Aa=q(()=>{At(),ze=(e,t)=>{let r=Ce(),a=r.lengthBytesUTF8(e)+1,s=r._malloc(a);return r.stringToUTF8(e,s,a),t.push(s),s},Ur=(e,t,r,a)=>{if(typeof e=="object"&&e!==null){if(r.has(e))throw new Error("Circular reference in options");r.add(e)}Object.entries(e).forEach(([s,i])=>{let o=t?t+s:s;if(typeof i=="object")Ur(i,o+".",r,a);else if(typeof i=="string"||typeof i=="number")a(o,i.toString());else if(typeof i=="boolean")a(o,i?"1":"0");else throw new Error(`Can't handle extra config type: ${typeof i}`)})},fe=e=>{let t=Ce(),r=t.stackSave();try{let a=t.PTR_SIZE,s=t.stackAlloc(2*a);t._OrtGetLastError(s,s+a);let i=Number(t.getValue(s,a===4?"i32":"i64")),o=t.getValue(s+a,"*"),l=o?t.UTF8ToString(o):"";throw new Error(`${e} ERROR_CODE: ${i}, ERROR_MESSAGE: ${l}`)}finally{t.stackRestore(r)}}}),fp,py=q(()=>{At(),Aa(),fp=e=>{let t=Ce(),r=0,a=[],s=e||{};try{if((e==null?void 0:e.logSeverityLevel)===void 0)s.logSeverityLevel=2;else if(typeof e.logSeverityLevel!="number"||!Number.isInteger(e.logSeverityLevel)||e.logSeverityLevel<0||e.logSeverityLevel>4)throw new Error(`log serverity level is not valid: ${e.logSeverityLevel}`);if((e==null?void 0:e.logVerbosityLevel)===void 0)s.logVerbosityLevel=0;else if(typeof e.logVerbosityLevel!="number"||!Number.isInteger(e.logVerbosityLevel))throw new Error(`log verbosity level is not valid: ${e.logVerbosityLevel}`);(e==null?void 0:e.terminate)===void 0&&(s.terminate=!1);let i=0;return(e==null?void 0:e.tag)!==void 0&&(i=ze(e.tag,a)),r=t._OrtCreateRunOptions(s.logSeverityLevel,s.logVerbosityLevel,!!s.terminate,i),r===0&&fe("Can't create run options."),(e==null?void 0:e.extra)!==void 0&&Ur(e.extra,"",new WeakSet,(o,l)=>{let d=ze(o,a),p=ze(l,a);t._OrtAddRunConfigEntry(r,d,p)!==0&&fe(`Can't set a run config entry: ${o} - ${l}.`)}),[r,a]}catch(i){throw r!==0&&t._OrtReleaseRunOptions(r),a.forEach(o=>t._free(o)),i}}}),wo,bo,$o,vo,mp,cy=q(()=>{At(),Aa(),wo=e=>{switch(e){case"disabled":return 0;case"basic":return 1;case"extended":return 2;case"all":return 99;default:throw new Error(`unsupported graph optimization level: ${e}`)}},bo=e=>{switch(e){case"sequential":return 0;case"parallel":return 1;default:throw new Error(`unsupported execution mode: ${e}`)}},$o=e=>{e.extra||(e.extra={}),e.extra.session||(e.extra.session={});let t=e.extra.session;t.use_ort_model_bytes_directly||(t.use_ort_model_bytes_directly="1"),e.executionProviders&&e.executionProviders.some(r=>(typeof r=="string"?r:r.name)==="webgpu")&&(e.enableMemPattern=!1)},vo=(e,t,r)=>{for(let a of t){let s=typeof a=="string"?a:a.name;switch(s){case"webnn":if(s="WEBNN",typeof a!="string"){let o=a==null?void 0:a.deviceType;if(o){let l=ze("deviceType",r),d=ze(o,r);Ce()._OrtAddSessionConfigEntry(e,l,d)!==0&&fe(`Can't set a session config entry: 'deviceType' - ${o}.`)}}break;case"webgpu":if(s="JS",typeof a!="string"){let o=a;if(o!=null&&o.preferredLayout){if(o.preferredLayout!=="NCHW"&&o.preferredLayout!=="NHWC")throw new Error(`preferredLayout must be either 'NCHW' or 'NHWC': ${o.preferredLayout}`);let l=ze("preferredLayout",r),d=ze(o.preferredLayout,r);Ce()._OrtAddSessionConfigEntry(e,l,d)!==0&&fe(`Can't set a session config entry: 'preferredLayout' - ${o.preferredLayout}.`)}}break;case"wasm":case"cpu":continue;default:throw new Error(`not supported execution provider: ${s}`)}let i=ze(s,r);Ce()._OrtAppendExecutionProvider(e,i)!==0&&fe(`Can't append execution provider: ${s}.`)}},mp=e=>{let t=Ce(),r=0,a=[],s=e||{};$o(s);try{let i=wo(s.graphOptimizationLevel??"all"),o=bo(s.executionMode??"sequential"),l=typeof s.logId=="string"?ze(s.logId,a):0,d=s.logSeverityLevel??2;if(!Number.isInteger(d)||d<0||d>4)throw new Error(`log serverity level is not valid: ${d}`);let p=s.logVerbosityLevel??0;if(!Number.isInteger(p)||p<0||p>4)throw new Error(`log verbosity level is not valid: ${p}`);let g=typeof s.optimizedModelFilePath=="string"?ze(s.optimizedModelFilePath,a):0;if(r=t._OrtCreateSessionOptions(i,!!s.enableCpuMemArena,!!s.enableMemPattern,o,!!s.enableProfiling,0,l,d,p,g),r===0&&fe("Can't create session options."),s.executionProviders&&vo(r,s.executionProviders,a),s.enableGraphCapture!==void 0){if(typeof s.enableGraphCapture!="boolean")throw new Error(`enableGraphCapture must be a boolean value: ${s.enableGraphCapture}`);let f=ze("enableGraphCapture",a),y=ze(s.enableGraphCapture.toString(),a);t._OrtAddSessionConfigEntry(r,f,y)!==0&&fe(`Can't set a session config entry: 'enableGraphCapture' - ${s.enableGraphCapture}.`)}if(s.freeDimensionOverrides)for(let[f,y]of Object.entries(s.freeDimensionOverrides)){if(typeof f!="string")throw new Error(`free dimension override name must be a string: ${f}`);if(typeof y!="number"||!Number.isInteger(y)||y<0)throw new Error(`free dimension override value must be a non-negative integer: ${y}`);let _=ze(f,a);t._OrtAddFreeDimensionOverride(r,_,y)!==0&&fe(`Can't set a free dimension override: ${f} - ${y}.`)}return s.extra!==void 0&&Ur(s.extra,"",new WeakSet,(f,y)=>{let _=ze(f,a),w=ze(y,a);t._OrtAddSessionConfigEntry(r,_,w)!==0&&fe(`Can't set a session config entry: ${f} - ${y}.`)}),[r,a]}catch(i){throw r!==0&&t._OrtReleaseSessionOptions(r)!==0&&fe("Can't release session options."),a.forEach(o=>t._free(o)),i}}}),Nt,Tt,Ct,Oa,Wr,Ra,Ba,pa,Y=q(()=>{Nt=e=>{switch(e){case"int8":return 3;case"uint8":return 2;case"bool":return 9;case"int16":return 5;case"uint16":return 4;case"int32":return 6;case"uint32":return 12;case"float16":return 10;case"float32":return 1;case"float64":return 11;case"string":return 8;case"int64":return 7;case"uint64":return 13;case"int4":return 22;case"uint4":return 21;default:throw new Error(`unsupported data type: ${e}`)}},Tt=e=>{switch(e){case 3:return"int8";case 2:return"uint8";case 9:return"bool";case 5:return"int16";case 4:return"uint16";case 6:return"int32";case 12:return"uint32";case 10:return"float16";case 1:return"float32";case 11:return"float64";case 8:return"string";case 7:return"int64";case 13:return"uint64";case 22:return"int4";case 21:return"uint4";default:throw new Error(`unsupported data type: ${e}`)}},Ct=(e,t)=>{let r=[-1,4,1,1,2,2,4,8,-1,1,2,8,4,8,-1,-1,-1,-1,-1,-1,-1,.5,.5][e],a=typeof t=="number"?t:t.reduce((s,i)=>s*i,1);return r>0?Math.ceil(a*r):void 0},Oa=e=>{switch(e){case"float16":return typeof Float16Array<"u"&&Float16Array.from?Float16Array:Uint16Array;case"float32":return Float32Array;case"uint8":return Uint8Array;case"int8":return Int8Array;case"uint16":return Uint16Array;case"int16":return Int16Array;case"int32":return Int32Array;case"bool":return Uint8Array;case"float64":return Float64Array;case"uint32":return Uint32Array;case"int64":return BigInt64Array;case"uint64":return BigUint64Array;default:throw new Error(`unsupported type: ${e}`)}},Wr=e=>{switch(e){case"verbose":return 0;case"info":return 1;case"warning":return 2;case"error":return 3;case"fatal":return 4;default:throw new Error(`unsupported logging level: ${e}`)}},Ra=e=>e==="float32"||e==="float16"||e==="int32"||e==="int64"||e==="uint32"||e==="uint8"||e==="bool"||e==="uint4"||e==="int4",Ba=e=>e==="float32"||e==="float16"||e==="int32"||e==="int64"||e==="uint32"||e==="uint64"||e==="int8"||e==="uint8"||e==="bool"||e==="uint4"||e==="int4",pa=e=>{switch(e){case"none":return 0;case"cpu":return 1;case"cpu-pinned":return 2;case"texture":return 3;case"gpu-buffer":return 4;case"ml-tensor":return 5;default:throw new Error(`unsupported data location: ${e}`)}}}),Ma,gp=q(()=>{Ia(),Ma=async e=>{if(typeof e=="string"){let t=await fetch(e);if(!t.ok)throw new Error(`failed to load external data file: ${e}`);let r=t.headers.get("Content-Length"),a=r?parseInt(r,10):0;if(a<1073741824)return new Uint8Array(await t.arrayBuffer());{if(!t.body)throw new Error(`failed to load external data file: ${e}, no response body.`);let s=t.body.getReader(),i;try{i=new ArrayBuffer(a)}catch(l){if(l instanceof RangeError){let d=Math.ceil(a/65536);i=new WebAssembly.Memory({initial:d,maximum:d}).buffer}else throw l}let o=0;for(;;){let{done:l,value:d}=await s.read();if(l)break;let p=d.byteLength;new Uint8Array(i,o,p).set(d),o+=p}return new Uint8Array(i,0,a)}}else return e instanceof Blob?new Uint8Array(await e.arrayBuffer()):e instanceof Uint8Array?e:new Uint8Array(e)}}),xo,ko,So,To,Na,Co,pe,st=q(()=>{Y(),xo=["V","I","W","E","F"],ko=(e,t)=>{console.log(`[${xo[e]},${new Date().toISOString()}]${t}`)},Na=(e,t)=>{So=e,To=t},Co=(e,t)=>{let r=Wr(e),a=Wr(So);r>=a&&ko(r,typeof t=="function"?t():t)},pe=(...e)=>{To&&Co(...e)}}),Da,yp=q(()=>{Y(),Da=(e,t)=>new(Oa(t))(e)}),Pa=q(()=>{}),Ci,kr,Sr,Io,Eo,Ii,ca,zo,_p,hy=q(()=>{st(),Pa(),Ci=new Map([[64,250],[128,200],[256,200],[512,200],[2048,230],[4096,200],[8192,50],[16384,50],[32768,50],[65536,50],[131072,50],[262144,50],[524288,50],[1048576,50],[2097152,30],[4194304,20],[8388608,10],[12582912,10],[16777216,10],[26214400,15],[33554432,22],[44236800,2],[58982400,6],[67108864,6],[134217728,6],[167772160,6]]),kr=[],Sr=e=>Math.ceil(Number(e)/16)*16,Io=e=>{for(let t=0;t<kr.length;t++){let r=kr[t];if(e<=r)return r}return Math.ceil(e/16)*16},Eo=1,Ii=()=>Eo++,ca=async(e,t,r,a)=>{let s=Sr(r),i=e.device.createBuffer({size:s,usage:GPUBufferUsage.COPY_DST|GPUBufferUsage.MAP_READ});try{let o=e.getCommandEncoder();e.endComputePass(),o.copyBufferToBuffer(t,0,i,0,s),e.flush(),await i.mapAsync(GPUMapMode.READ);let l=i.getMappedRange();if(a){let d=a();return d.set(new Uint8Array(l,0,r)),d}else return new Uint8Array(l.slice(0,r))}finally{i.destroy()}},zo=class{constructor(e){this.backend=e,this.storageCache=new Map,this.freeBuffers=new Map,this.freeUniformBuffers=new Map,this.buffersPending=[],this.capturedPendingBuffers=new Map;for(let[t]of Ci)kr.push(t),this.freeBuffers.set(t,[]),this.freeUniformBuffers.set(t,[]);this.sessionCount=0}upload(e,t){let r=t.buffer,a=t.byteOffset,s=t.byteLength,i=Sr(s),o=this.storageCache.get(e);if(!o)throw new Error("gpu data for uploading does not exist");if(Number(o.originalSize)!==s)throw new Error(`inconsistent data size. gpu data size=${o.originalSize}, data size=${s}`);let l=this.backend.device.createBuffer({mappedAtCreation:!0,size:i,usage:GPUBufferUsage.MAP_WRITE|GPUBufferUsage.COPY_SRC}),d=l.getMappedRange();new Uint8Array(d).set(new Uint8Array(r,a,s)),l.unmap();let p=this.backend.device.createCommandEncoder();p.copyBufferToBuffer(l,0,o.gpuData.buffer,0,i),this.backend.device.queue.submit([p.finish()]),l.destroy(),pe("verbose",()=>`[WebGPU] GpuDataManager.upload(id=${e})`)}memcpy(e,t){let r=this.storageCache.get(e);if(!r)throw new Error("source gpu data for memcpy does not exist");let a=this.storageCache.get(t);if(!a)throw new Error("destination gpu data for memcpy does not exist");if(r.originalSize!==a.originalSize)throw new Error("inconsistent source and destination gpu data size");let s=Sr(r.originalSize),i=this.backend.getCommandEncoder();this.backend.endComputePass(),i.copyBufferToBuffer(r.gpuData.buffer,0,a.gpuData.buffer,0,s)}registerExternalBuffer(e,t,r){let a;if(r){if(a=r[0],e===r[1])return pe("verbose",()=>`[WebGPU] GpuDataManager.registerExternalBuffer(size=${t}) => id=${a}, buffer is the same, skip.`),a;if(this.backend.capturedCommandList.has(this.backend.currentSessionId))throw new Error(`Registering a different external buffer under graph capture mode is not supported yet.
             Please use the previous external buffer!`)}else a=Ii();return this.storageCache.set(a,{gpuData:{id:a,type:0,buffer:e},originalSize:t}),pe("verbose",()=>`[WebGPU] GpuDataManager.registerExternalBuffer(size=${t}) => id=${a}, registered.`),a}unregisterExternalBuffer(e){e!==void 0&&(this.storageCache.delete(e),pe("verbose",()=>`[WebGPU] GpuDataManager.unregisterExternalBuffer() => id=${e}`))}create(e,t=GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_SRC|GPUBufferUsage.COPY_DST){let r=Io(e),a,s=(t&GPUBufferUsage.STORAGE)===GPUBufferUsage.STORAGE,i=(t&GPUBufferUsage.UNIFORM)===GPUBufferUsage.UNIFORM;if(s||i){let l=(s?this.freeBuffers:this.freeUniformBuffers).get(r);l?l.length>0?a=l.pop():a=this.backend.device.createBuffer({size:r,usage:t}):a=this.backend.device.createBuffer({size:r,usage:t})}else a=this.backend.device.createBuffer({size:r,usage:t});let o={id:Ii(),type:0,buffer:a};return this.storageCache.set(o.id,{gpuData:o,originalSize:Number(e)}),pe("verbose",()=>`[WebGPU] GpuDataManager.create(size=${e}) => id=${o.id}`),o}get(e){var t;return(t=this.storageCache.get(e))==null?void 0:t.gpuData}release(e){let t=typeof e=="bigint"?Number(e):e,r=this.storageCache.get(t);if(!r){if(this.storageCache.size===0)return 0;throw new Error("releasing data does not exist")}return pe("verbose",()=>`[WebGPU] GpuDataManager.release(id=${t}), gpuDataId=${r.gpuData.id}`),this.storageCache.delete(t),this.buffersPending.push(r.gpuData.buffer),r.originalSize}async download(e,t){let r=this.storageCache.get(Number(e));if(!r)throw new Error("data does not exist");await ca(this.backend,r.gpuData.buffer,r.originalSize,t)}refreshPendingBuffers(){if(this.buffersPending.length!==0)if(this.backend.sessionStatus==="default"){for(let e of this.buffersPending){let t=Ci.get(e.size);if((e.usage&GPUBufferUsage.STORAGE)===GPUBufferUsage.STORAGE){let r=this.freeBuffers.get(e.size)||[];t===void 0||r.length>=t?e.destroy():r.push(e)}else if((e.usage&GPUBufferUsage.UNIFORM)===GPUBufferUsage.UNIFORM){let r=this.freeUniformBuffers.get(e.size)||[];t===void 0||r.length>=t?e.destroy():r.push(e)}else e.destroy()}this.buffersPending=[]}else{let e=this.capturedPendingBuffers.get(this.backend.currentSessionId);e||(e=[],this.capturedPendingBuffers.set(this.backend.currentSessionId,e));for(let t of this.buffersPending)e.push(t);this.buffersPending=[]}}dispose(){this.freeBuffers.forEach(e=>{e.forEach(t=>{t.destroy()})}),this.freeUniformBuffers.forEach(e=>{e.forEach(t=>{t.destroy()})}),this.storageCache.forEach(e=>{e.gpuData.buffer.destroy()}),this.capturedPendingBuffers.forEach(e=>{e.forEach(t=>{t.destroy()})}),this.storageCache=new Map,this.freeBuffers=new Map,this.freeUniformBuffers=new Map,this.capturedPendingBuffers=new Map}onCreateSession(){this.sessionCount+=1}onReleaseSession(e){let t=this.capturedPendingBuffers.get(e);t&&(t.forEach(r=>{r.destroy()}),this.capturedPendingBuffers.delete(e)),this.sessionCount-=1,this.sessionCount===0&&(pe("warning",()=>"[WebGPU] Clearing webgpu buffer cache"),this.storageCache.forEach(r=>{r.gpuData.buffer.destroy()}),this.storageCache=new Map)}},_p=(...e)=>new zo(...e)}),Ao,_e,ke=q(()=>{Ao=class{constructor(e){Object.assign(this,e)}get cacheKey(){return this.key||(this.key=Object.getOwnPropertyNames(this).sort().map(e=>`${this[e]}`).join(";")),this.key}},_e=e=>new Ao(e)}),Oo,Ut,O,qr,wp,bp,$p,oe=q(()=>{Oo=class{static calcMatMulShape(e,t){return e[1]!==t[0]?void 0:[e[0],t[1]]}},Ut=class{static calcShape(e,t,r=!1){let a=e.length,s=t.length;if(a===0)return t;if(s===0)return e;let i=Math.max(e.length,t.length),o=new Array(i);if(r){if(a<2||s<2)return;let l=Oo.calcMatMulShape([e[a-2],e[a-1]],[t[s-2],t[s-1]]);if(l===void 0)return;[o[i-2],o[i-1]]=l}for(let l=r?3:1;l<=i;l++){let d=a-l<0?1:e[a-l],p=s-l<0?1:t[s-l];if(d!==p&&d>1&&p>1)return;let g=Math.max(d,p);if(d&&p)o[i-l]=Math.max(d,p);else{if(g>1)return;o[i-l]=0}}return o}static isValidBroadcast(e,t){let r=e.length,a=t.length;if(r>a)return!1;for(let s=1;s<=r;s++)if(e[r-s]!==1&&e[r-s]!==t[a-s])return!1;return!0}},O=class Mr{static size(t){return Mr.getSizeFromDimensionRange(t,0,t.length)}static convertShape(t,r=4){let a=t.length;if(a===0)return[];let s=new Array(a),i=a-1;for(;i>=0;){if(t[i]%r===0){s[i]=t[i]/r;break}if(r%t[i]!==0)throw new Error("cannot convert shape");s[i]=1,r/=t[i],i--}for(i--;i>=0;i--)s[i]=t[i];return s}static sizeFromDimension(t,r){if(r<0||r>t.length)throw new Error(`invalid dimension of ${r} for sizeFromDimension as Tensor has ${t.length} dimensions.`);return Mr.getSizeFromDimensionRange(t,r,t.length)}static sizeToDimension(t,r){if(r<0||r>t.length)throw new Error(`invalid dimension of ${r} for sizeToDimension as Tensor has ${t.length} dimensions.`);return Mr.getSizeFromDimensionRange(t,0,r)}static getSizeFromDimensionRange(t,r,a){let s=1;for(let i=r;i<a;i++){if(t[i]<0)throw new Error("cannot get valid size from specified dimension range. Most likely the range contains negative values in them.");s*=Number(t[i])}return s}static computeStrides(t){let r=t.length;if(r===0)return[];if(r===1)return[1];let a=new Array(r);a[r-1]=1,a[r-2]=t[r-1];for(let s=r-3;s>=0;--s)a[s]=a[s+1]*t[s+1];return a}static normalizeAxis(t,r){if(t<-r&&t>=r)throw new Error("unsupported axis for this operation.");return t<0?t+r:t}static normalizeAxes(t,r){return t.map(a=>this.normalizeAxis(a,r??t.length))}static sortBasedOnPerm(t,r){return r?r.map(a=>t[a]):t.slice().reverse()}static padShape(t,r){let a=t.length;return t.map((s,i)=>s+r[i]+r[i+a])}static areEqual(t,r){return t.length!==r.length?!1:t.every((a,s)=>a===r[s])}},qr=class ar{static adjustPoolAttributes(t,r,a,s,i,o){if(!t&&a.length!==r.length-2)throw new Error("length of specified kernel shapes should be 2 less than length of input dimensions");if(t)for(let l=0;l<r.length-2;l++)l>=a.length?a.push(r[l+2]):a[l]=r[l+2];for(let l=0;l<a.length;l++)if(l<s.length){if(s[l]<0)throw new Error("strides should be greater than or equal to 1")}else s.push(1);for(let l=0;l<a.length;l++)if(l<i.length){if(i[l]<0)throw new Error("dilations should be greater than or equal to 1")}else i.push(1);for(let l=0;l<a.length*2;l++)if(l<o.length){if(o[l]<0)throw new Error("pad should be greater than or equal to 1")}else o.push(0);for(let l=0;l<a.length;l++){if(a[l]<=0)throw new Error("kernel shapes need to be greater than 0");if(o[l]>=a[l]||o[l+a.length]>=a[l])throw new Error("pads should be smaller than kernel")}}static adjustPadsBasedOnAutoPad(t,r,a,s,i,o,l){if(l){if(i.length!==2*(t.length-2))throw new Error("length of pads should be twice the length of data dimensions");if(r.length!==t.length-2)throw new Error("length of strides should be the length of data dimensions");if(s.length!==t.length-2)throw new Error("length of kernel shapes should be the length of data dimensions");for(let d=0;d<t.length-2;d++)ar.adjustPadAndReturnShape(t[d+(o?1:2)],r[d],a[d],s[d],i,d,d+t.length-2,l)}}static computePoolOutputShape(t,r,a,s,i,o,l){if(r.length<=0)throw new Error("input shape must be of size greater than 0");let d=[r[0],r[1]];return ar.computeShapeHelper(t,r,d,a,s,i,o,l),d}static computeConvOutputShape(t,r,a,s,i,o,l){if(t.length<=0||r.length<=0)throw new Error("invalid input tensor dims or invalid filter tensor dims");let d=[t[0],r[0]];return ar.computeShapeHelper(!1,t,d,a,s,i,o,l),d}static computeShapeHelper(t,r,a,s,i,o,l,d){if(t)for(let p=0;p<r.length-2;p++)a.push(1);else for(let p=0;p<r.length-2;p++)a.push(ar.adjustPadAndReturnShape(r[p+2],s[p],i[p],o[p],l,p,p+r.length-2,d))}static adjustPadAndReturnShape(t,r,a,s,i,o,l,d){let p=a*(s-1)+1;if(d&&d!=="NOTSET")switch(d){case"VALID":return i[o]=0,i[l]=0,Math.floor((t-p)/r+1);case"SAME_LOWER":case"SAME_UPPER":if(a!==1)throw new Error("Dilation not supported for SAME_UPPER or SAME_LOWER");{let g=((t+r-1)/r-1)*r+s-t;return i[o]=Math.floor(d==="SAME_LOWER"?(g+1)/2:g/2),i[l]=g-i[o],Math.floor((t+g-s)/r+1)}default:throw new Error("Unsupported AutoPad type")}else return Math.floor((t+i[o]+i[l]-p)/r+1)}},wp=class{static getShapeOfGemmResult(e,t,r,a,s){if(e.length!==2||r.length!==2)throw new Error("shape need to be of size 2");let i,o,l;t?(i=e[1],o=e[0]):(i=e[0],o=e[1]);let d=-1;if(a?(l=r[0],d=1):(l=r[1],d=0),r[d]!==o)throw new Error("dimension mismatch");if(i<=0||l<=0||o<=0)throw new Error("invalid shape specified");if(s&&!Ut.isValidBroadcast(s,[i,l]))throw new Error("gemm: invalid bias shape for broadcast");return[i,l,o]}},bp=-34028234663852886e22,$p=34028234663852886e22}),Wt,Tr,Ie,Ae,Q,xe,ha,Pt,gt,K,Zt,M,j,vp,Ua,Ro,xp,ue=q(()=>{Y(),oe(),Wt=64,Tr=(e,t)=>{if(t===3)throw new Error("vec3 has same alignment as vec4, use vec4 instead");switch(Number(e)){case 10:return t>1?`vec${t}<f16>`:"f16";case 1:return t>1?`vec${t}<f32>`:"f32";case 6:return t>1?`vec${t}<i32>`:"i32";case 12:return t>1?`vec${t}<u32>`:"u32";case 7:if(t>1)throw new Error("currently not supported vecX of uint64 yet");return["vec2<u32>","i32"];case 13:if(t>1)throw new Error("currently not supported vecX of uint64 yet");return["vec2<u32>","u32"];case 9:if(t!==4)throw new Error("bool must be vec4");return["u32","vec4<bool>"];case 22:return"i32";case 21:return"u32";default:throw new Error(`Unknown data type: ${e}`)}},Ie=(e,t=1)=>{let r=Tr(e,t);return typeof r=="string"?r:r[0]},Ae=(e,t=1)=>{let r=Tr(e,t);return typeof r=="string"?r:r[1]},Q=(...e)=>{let t=[];return e.forEach(r=>{r.length!==0&&t.push({type:12,data:r},{type:12,data:O.computeStrides(r)})}),t},xe=e=>e%4===0?4:e%2===0?2:1,ha=(e="f32",t,r="0")=>!t||t===1?`${e}(${r})`:`vec${t}<${e}>(${r})`,Pt=(e,t,r)=>e==="f32"?r:t===1?`f32(${r})`:`vec${t}<f32>(${r})`,gt=(e,t)=>t===4?`(${e}.x + ${e}.y + ${e}.z + ${e}.w)`:t===2?`(${e}.x + ${e}.y)`:t===3?`(${e}.x + ${e}.y + ${e}.z)`:e,K=(e,t,r,a)=>e.startsWith("uniforms.")&&r>4?typeof t=="string"?a==="f16"?`${e}[(${t}) / 8][(${t}) % 8 / 4][(${t}) % 8 % 4]`:`${e}[(${t}) / 4][(${t}) % 4]`:a==="f16"?`${e}[${Math.floor(t/8)}][${Math.floor(t%8/4)}][${t%8%4}]`:`${e}[${Math.floor(t/4)}][${t%4}]`:r>1?`${e}[${t}]`:e,Zt=(e,t,r,a,s)=>{let i=typeof r=="number",o=i?r:r.length,l=[...new Array(o).keys()],d=o<2?"u32":o<=4?`vec${o}<u32>`:`array<u32, ${o}>`,p=Tr(t,s),g=typeof p=="string"?p:p[1],f=typeof p=="string"?p:p[0],y={indices:d,value:g,storage:f,tensor:t},_=N=>typeof N=="string"?N:`${N}u`,w={offsetToIndices:!1,indicesToOffset:!1,broadcastedIndicesToOffset:!1,set:!1,setByIndices:!1,get:!1,getByIndices:!1},b=i?"uniforms.":"",k=`${b}${e}_shape`,v=`${b}${e}_strides`,$="";for(let N=0;N<o-1;N++)$+=`
    let dim${N} = current / ${K(v,N,o)};
    let rest${N} = current % ${K(v,N,o)};
    indices[${N}] = dim${N};
    current = rest${N};
    `;$+=`indices[${o-1}] = current;`;let T=o<2?"":`
  fn o2i_${e}(offset: u32) -> ${y.indices} {
    var indices: ${y.indices};
    var current = offset;
    ${$}
    return indices;
  }`,S=N=>(w.offsetToIndices=!0,o<2?N:`o2i_${e}(${N})`),C=[];if(o>=2)for(let N=o-1;N>=0;N--)C.push(`${K(v,N,o)} * (indices[${N}])`);let E=o<2?"":`
  fn i2o_${e}(indices: ${y.indices}) -> u32 {
    return ${C.join("+")};
  }`,z=N=>(w.indicesToOffset=!0,o<2?N:`i2o_${e}(${N})`),B=(...N)=>o===0?"0u":`${y.indices}(${N.map(_).join(",")})`,W=(N,V)=>o<2?`${N}`:`${K(N,V,o)}`,G=(N,V,le)=>o<2?`${N}=${le};`:`${K(N,V,o)}=${le};`,ee={},ae=(N,V)=>{w.broadcastedIndicesToOffset=!0;let le=`${V.name}broadcastedIndicesTo${e}Offset`;if(le in ee)return`${le}(${N})`;let be=[];for(let D=o-1;D>=0;D--){let ce=V.indicesGet("outputIndices",D+V.rank-o);be.push(`${W(v,D)} * (${ce} % ${W(k,D)})`)}return ee[le]=`fn ${le}(outputIndices: ${V.type.indices}) -> u32 {
             return ${be.length>0?be.join("+"):"0u"};
           }`,`${le}(${N})`},Z=(N,V)=>(()=>{if(y.storage===y.value)return`${e}[${N}]=${V};`;if(y.storage==="vec2<u32>"&&y.value==="i32")return`${e}[${N}]=vec2<u32>(u32(${V}), select(0u, 0xFFFFFFFFu, ${V} < 0));`;if(y.storage==="vec2<u32>"&&y.value==="u32")return`${e}[${N}]=vec2<u32>(u32(${V}), 0u);`;if(y.storage==="u32"&&y.value==="vec4<bool>")return`${e}[${N}]=dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(${V}));`;throw new Error(`not supported combination of storage type ${y.storage} and value type ${y.value} yet`)})(),te=N=>(()=>{if(y.storage===y.value)return`${e}[${N}]`;if(y.storage==="vec2<u32>"&&y.value==="i32")return`i32(${e}[${N}].x)`;if(y.storage==="vec2<u32>"&&y.value==="u32")return`u32(${e}[${N}].x)`;if(y.storage==="u32"&&y.value==="vec4<bool>")return`vec4<bool>(bool(${e}[${N}] & 0xFFu), bool(${e}[${N}] & 0xFF00u), bool(${e}[${N}] & 0xFF0000u), bool(${e}[${N}] & 0xFF000000u))`;throw new Error(`not supported combination of storage type ${y.storage} and value type ${y.value} yet`)})(),J=o<2?"":`
  fn get_${e}ByIndices(indices: ${y.indices}) -> ${g} {
    return ${te(`i2o_${e}(indices)`)};
  }`,L=o<2?"":(()=>{let N=l.map(le=>`d${le}: u32`).join(", "),V=l.map(le=>`d${le}`).join(", ");return`
  fn get_${e}(${N}) -> ${g} {
    return get_${e}ByIndices(${B(V)});
  }`})(),de=(...N)=>{if(N.length!==o)throw new Error(`indices length must be ${o}`);let V=N.map(_).join(",");return o===0?te("0u"):o===1?te(V[0]):(w.get=!0,w.getByIndices=!0,w.indicesToOffset=!0,`get_${e}(${V})`)},me=N=>o<2?te(N):(w.getByIndices=!0,w.indicesToOffset=!0,`get_${e}ByIndices(${N})`),F=o<2?"":`
  fn set_${e}ByIndices(indices: ${y.indices}, value: ${g}) {
    ${Z(`i2o_${e}(indices)`,"value")}
  }`,ge=o<2?"":(()=>{let N=l.map(le=>`d${le}: u32`).join(", "),V=l.map(le=>`d${le}`).join(", ");return`
  fn set_${e}(${N}, value: ${g}) {
    set_${e}ByIndices(${B(V)}, value);
  }`})();return{impl:()=>{let N=[],V=!1;return w.offsetToIndices&&(N.push(T),V=!0),w.indicesToOffset&&(N.push(E),V=!0),w.broadcastedIndicesToOffset&&(Object.values(ee).forEach(le=>N.push(le)),V=!0),w.set&&(N.push(ge),V=!0),w.setByIndices&&(N.push(F),V=!0),w.get&&(N.push(L),V=!0),w.getByIndices&&(N.push(J),V=!0),!i&&V&&N.unshift(`const ${k} = ${y.indices}(${r.join(",")});`,`const ${v} = ${y.indices}(${O.computeStrides(r).join(",")});`),N.join(`
`)},type:y,offsetToIndices:S,indicesToOffset:z,broadcastedIndicesToOffset:ae,indices:B,indicesGet:W,indicesSet:G,set:(...N)=>{if(N.length!==o+1)throw new Error(`indices length must be ${o}`);let V=N[o];if(typeof V!="string")throw new Error("value must be string");let le=N.slice(0,o).map(_).join(",");return o===0?Z("0u",V):o===1?Z(le[0],V):(w.set=!0,w.setByIndices=!0,w.indicesToOffset=!0,`set_${e}(${le}, ${V})`)},setByOffset:Z,setByIndices:(N,V)=>o<2?Z(N,V):(w.setByIndices=!0,w.indicesToOffset=!0,`set_${e}ByIndices(${N}, ${V});`),get:de,getByOffset:te,getByIndices:me,usage:a,name:e,strides:v,shape:k,rank:o}},M=(e,t,r,a=1)=>Zt(e,t,r,"input",a),j=(e,t,r,a=1)=>Zt(e,t,r,"output",a),vp=(e,t,r)=>Zt(e,t,r,"atomicOutput",1),Ua=(e,t,r,a=1)=>Zt(e,t,r,"internal",a),Ro=class{constructor(e,t){this.normalizedDispatchGroup=e,this.limits=t,this.internalVariables=[],this.variables=[],this.uniforms=[],this.variableIndex=0}guardAgainstOutOfBoundsWorkgroupSizes(e){return`if (global_idx >= ${typeof e=="number"?`${e}u`:e}) { return; }`}mainStart(e=Wt){let t=typeof e=="number"?e:e[0],r=typeof e=="number"?1:e[1],a=typeof e=="number"?1:e[2];if(t>this.limits.maxComputeWorkgroupSizeX||r>this.limits.maxComputeWorkgroupSizeY||a>this.limits.maxComputeWorkgroupSizeZ)throw new Error(`workgroup size [${t}, ${r}, ${a}] exceeds the maximum workgroup size [${this.limits.maxComputeWorkgroupSizeX}, ${this.limits.maxComputeWorkgroupSizeY}, ${this.limits.maxComputeWorkgroupSizeZ}].`);if(t*r*a>this.limits.maxComputeInvocationsPerWorkgroup)throw new Error(`workgroup size [${t}, ${r}, ${a}] exceeds the maximum workgroup invocations ${this.limits.maxComputeInvocationsPerWorkgroup}.`);let s=this.normalizedDispatchGroup[1]===1&&this.normalizedDispatchGroup[2]===1,i=s?`@builtin(global_invocation_id) global_id : vec3<u32>,
    @builtin(workgroup_id) workgroup_id : vec3<u32>,
    @builtin(local_invocation_index) local_idx : u32,
    @builtin(local_invocation_id) local_id : vec3<u32>`:`@builtin(global_invocation_id) global_id : vec3<u32>,
                                             @builtin(local_invocation_id) local_id : vec3<u32>,
    @builtin(local_invocation_index) local_idx : u32,
    @builtin(workgroup_id) workgroup_id : vec3<u32>,
    @builtin(num_workgroups) num_workgroups : vec3<u32>`,o=s?`let global_idx = global_id.x;
         let workgroup_index = workgroup_id.x;`:`let workgroup_index = workgroup_id.z * num_workgroups[0] * num_workgroups[1] +
             workgroup_id.y * num_workgroups[0] + workgroup_id.x;
         let global_idx = workgroup_index * ${t*r*a}u + local_idx;`;return`@compute @workgroup_size(${t}, ${r}, ${a})
  fn main(${i}) {
    ${o}
  `}appendVariableUniforms(e){e.rank!==0&&(e.shape.startsWith("uniforms.")&&this.uniforms.push({name:e.shape.replace("uniforms.",""),type:"u32",length:e.rank}),e.strides.startsWith("uniforms.")&&this.uniforms.push({name:e.strides.replace("uniforms.",""),type:"u32",length:e.rank}))}declareVariable(e,t){if(e.usage==="internal")throw new Error("cannot use internal variable with declareVariable(). use registerInternalVariables() instead.");this.variables.push(e),this.appendVariableUniforms(e);let r=e.usage==="input"?"read":"read_write",a=e.usage==="atomicOutput"?"atomic<i32>":e.type.storage;return`@group(0) @binding(${t}) var<storage, ${r}> ${e.name}: array<${a}>;`}declareVariables(...e){return e.map(t=>this.declareVariable(t,this.variableIndex++)).join(`
`)}registerInternalVariable(e){if(e.usage!=="internal")throw new Error("cannot use input or output variable with registerInternalVariable(). use declareVariables() instead.");this.internalVariables.push(e),this.appendVariableUniforms(e)}registerInternalVariables(...e){return e.forEach(t=>this.registerInternalVariable(t)),this}registerUniform(e,t,r=1){return this.uniforms.push({name:e,type:t,length:r}),this}registerUniforms(e){return this.uniforms=this.uniforms.concat(e),this}uniformDeclaration(){if(this.uniforms.length===0)return"";let e=[];for(let{name:t,type:r,length:a}of this.uniforms)if(a&&a>4)r==="f16"?e.push(`@align(16) ${t}:array<mat2x4<${r}>, ${Math.ceil(a/8)}>`):e.push(`${t}:array<vec4<${r}>, ${Math.ceil(a/4)}>`);else{let s=a==null||a===1?r:`vec${a}<${r}>`;e.push(`${t}:${s}`)}return`
      struct Uniforms { ${e.join(", ")} };
      @group(0) @binding(${this.variableIndex}) var<uniform> uniforms: Uniforms;`}get additionalImplementations(){return this.uniformDeclaration()+this.variables.map(e=>e.impl()).join(`
`)+this.internalVariables.map(e=>e.impl()).join(`
`)}get variablesInfo(){if(this.uniforms.length===0)return;let e=t=>[12,10,1,6][["u32","f16","f32","i32"].indexOf(t)];return this.uniforms.map(t=>[e(t.type),t.length??1])}},xp=(e,t)=>new Ro(e,t)}),Bo,Ei,Mo,No,Do,Po,Pe,kp,Sp,yt=q(()=>{Y(),oe(),ke(),ue(),Bo=(e,t)=>{if(!e||e.length!==1)throw new Error("Transpose requires 1 input.");if(t.length!==0&&t.length!==e[0].dims.length)throw new Error(`perm size ${t.length} does not match input rank ${e[0].dims.length}`)},Ei=(e,t)=>t.length!==0?t:[...new Array(e).keys()].reverse(),Mo=(e,t)=>O.sortBasedOnPerm(e,Ei(e.length,t)),No=(e,t,r,a)=>{let s=`fn perm(i: ${a.type.indices}) -> ${r.type.indices} {
    var a: ${r.type.indices};`;for(let i=0;i<t;++i)s+=`a[${e[i]}]=i[${i}];`;return s+="return a;}"},Do=(e,t)=>{let r=[],a=[];for(let s=0;s<e.length;++s)e[s]!==1&&r.push(e[s]),e[t[s]]!==1&&a.push(t[s]);return{newShape:r,newPerm:a}},Po=(e,t)=>{let r=0;for(let a=0;a<e.length;++a)if(t[e[a]]!==1){if(e[a]<r)return!1;r=e[a]}return!0},Pe=(e,t)=>{let r=e.dataType,a=e.dims.length,s=Ei(a,t),i=Mo(e.dims,s),o=e.dims,l=i,d=a<2||Po(s,e.dims),p;if(d)return p=w=>{let b=M("input",r,o,4),k=j("output",r,l,4);return`
  ${w.registerUniform("output_size","u32").declareVariables(b,k)}
  ${w.mainStart()}
    ${w.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    output[global_idx] = input[global_idx];
  }`},{name:"TransposeCopy",shaderCache:{inputDependencies:["type"]},getRunData:()=>{let w=O.size(i);return{outputs:[{dims:i,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(w/64/4)},programUniforms:[{type:12,data:Math.ceil(w/4)}]}},getShaderSource:p};let{newShape:g,newPerm:f}=Do(e.dims,s),y=O.areEqual(f,[2,3,1]),_=O.areEqual(f,[3,1,2]);if(g.length===2||y||_){o=y?[g[0],g[1]*g[2]]:_?[g[0]*g[1],g[2]]:g,l=[o[1],o[0]];let w=16;return p=b=>{let k=M("a",r,o.length),v=j("output",r,l.length);return`
  ${b.registerUniform("output_size","u32").declareVariables(k,v)}
  var<workgroup> tile : array<array<${v.type.value}, ${w+1}>, ${w}>;
  ${b.mainStart([w,w,1])}
    let stride = (uniforms.output_shape[1] - 1) / ${w} + 1;
    let workgroup_id_x = workgroup_index % stride;
    let workgroup_id_y = workgroup_index / stride;
    let input_col = workgroup_id_y * ${w}u + local_id.x;
    let input_row = workgroup_id_x * ${w}u + local_id.y;
    if (input_row < uniforms.a_shape[0] && input_col < uniforms.a_shape[1]) {
      tile[local_id.y][local_id.x] = ${k.getByIndices(`${k.type.indices}(input_row, input_col)`)};
    }
    workgroupBarrier();

    let output_col = workgroup_id_x * ${w}u + local_id.x;
    let output_row = workgroup_id_y * ${w}u + local_id.y;
    if (output_row < uniforms.output_shape[0] && output_col < uniforms.output_shape[1]) {
      ${v.setByIndices(`${v.type.indices}(output_row, output_col)`,"tile[local_id.x][local_id.y]")}
    }
  }`},{name:"TransposeShared",shaderCache:{inputDependencies:["type"]},getRunData:()=>{let b=O.size(i);return{outputs:[{dims:i,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(l[1]/w),y:Math.ceil(l[0]/w)},programUniforms:[{type:12,data:b},...Q(o,l)]}},getShaderSource:p}}return p=w=>{let b=M("a",r,o.length),k=j("output",r,l.length);return`
  ${w.registerUniform("output_size","u32").declareVariables(b,k)}

  ${No(s,a,b,k)}

  ${w.mainStart()}
    ${w.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let indices = ${k.offsetToIndices("global_idx")};
    let aIndices = perm(indices);

    ${k.setByOffset("global_idx",b.getByIndices("aIndices"))}
  }`},{name:"Transpose",shaderCache:{hint:`${t}`,inputDependencies:["rank"]},getRunData:()=>{let w=O.size(i);return{outputs:[{dims:i,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(w/64)},programUniforms:[{type:12,data:w},...Q(o,l)]}},getShaderSource:p}},kp=(e,t)=>{Bo(e.inputs,t.perm),e.compute(Pe(e.inputs[0],t.perm))},Sp=e=>_e({perm:e.perm})}),Uo,Wo,qo,Vo,Lo,Go,Ho,Fo,jo,Ko,Ge,Tp,Cp,Ip,Ep,zp,Ap,Op,Rp,Bp,Mp,fy=q(()=>{Y(),oe(),ue(),Wa(),yt(),Uo={max:"select(bestValue, candidate, candidate > bestValue)",min:"select(bestValue, candidate, candidate < bestValue)",mean:"bestValue + candidate",sum:"bestValue + candidate",prod:"bestValue * candidate",sumSquare:"bestValue + candidate * candidate",logSumExp:"bestValue + exp(candidate)",l1:"bestValue + abs(candidate)",l2:"bestValue + candidate * candidate",logSum:"bestValue + candidate"},Wo={max:"select(bestValue, candidate, candidate > bestValue)",min:"select(bestValue, candidate, candidate < bestValue)",mean:"bestValue + candidate",sum:"bestValue + candidate",prod:"bestValue * candidate",sumSquare:"bestValue + candidate",logSumExp:"bestValue + candidate",l1:"bestValue + candidate",l2:"bestValue + candidate",logSum:"bestValue + candidate"},qo={max:"_A[offset]",min:"_A[offset]",mean:"0",sum:"0",prod:"1",sumSquare:"0",logSumExp:"0",l1:"0",l2:"0",logSum:"0"},Vo={max:"bestValue",min:"bestValue",sum:"bestValue",prod:"bestValue",sumSquare:"bestValue",logSumExp:"log(bestValue)",l1:"bestValue",l2:"sqrt(bestValue)",logSum:"log(bestValue)"},Lo=(e,t)=>{let r=[];for(let a=t-e;a<t;++a)r.push(a);return r},Go=(e,t)=>{let r=[],a=e.length;for(let i=0;i<a;i++)t.indexOf(i)===-1&&r.push(e[i]);let s=t.map(i=>e[i]);return[r,s]},Ho=(e,t)=>{let r=e.length+t.length,a=[],s=0;for(let i=0;i<r;i++)t.indexOf(i)===-1?a.push(e[s++]):a.push(1);return a},Fo=(e,t)=>{for(let r=0;r<e.length;++r)if(e[e.length-r-1]!==t-1-r)return!1;return!0},jo=(e,t)=>{let r=[];if(!Fo(e,t)){for(let a=0;a<t;++a)e.indexOf(a)===-1&&r.push(a);e.forEach(a=>r.push(a))}return r},Ko=(e,t,r,a,s,i,o)=>{let l=r[0].dims,d=O.size(i),p=O.size(o),g=M("_A",r[0].dataType,l),f=j("output",s,i),y=64;d===1&&(y=256);let _=`
          var<workgroup> aBestValues : array<f32, ${y}>;
       `,w=b=>`
        ${b.registerUniform("reduceSize","u32").declareVariables(g,f)}
        ${_}
        fn DIV_CEIL(a : u32, b : u32) -> u32 {
          return ((a - 1u) / b + 1u);
         }
         ${b.mainStart(y)}

          let outputIndex = global_idx / ${y};
          let offset = outputIndex * uniforms.reduceSize;

          var bestValue = f32(${qo[a]});
          let Length = uniforms.reduceSize;
          for (var k = local_idx; k < Length; k = k + ${y}) {
           let candidate = f32(${g.getByOffset("offset + k")});
           bestValue = ${Uo[a]};
          }
          aBestValues[local_idx] = bestValue;
          workgroupBarrier();

         var reduceSize = min(Length, ${y}u);
         for (var currentSize = reduceSize / 2u; reduceSize > 1u;
             currentSize = reduceSize / 2u) {
           let interval = DIV_CEIL(reduceSize, 2u);
           if (local_idx < currentSize) {
            let candidate = aBestValues[local_idx + interval];
            bestValue = ${Wo[a]};
            aBestValues[local_idx] = bestValue;
           }
           reduceSize = interval;
           workgroupBarrier();
         }

         if (local_idx == 0u) {
          ${f.setByOffset("outputIndex",`${a==="mean"?`${f.type.storage}(bestValue / f32(uniforms.reduceSize))`:`${f.type.storage}(${Vo[a]})`}`)};
         }
        }`;return{name:e,shaderCache:{hint:`${t};${y}`,inputDependencies:["type"]},getShaderSource:w,getRunData:()=>({outputs:[{dims:i,dataType:s}],dispatchGroup:{x:d},programUniforms:[{type:12,data:p}]})}},Ge=(e,t,r,a)=>{let s=e.inputs.length===1?r:fa(e.inputs,r),i=s.axes;i.length===0&&!s.noopWithEmptyAxes&&(i=e.inputs[0].dims.map((_,w)=>w));let o=O.normalizeAxes(i,e.inputs[0].dims.length),l=o,d=e.inputs[0],p=jo(l,e.inputs[0].dims.length);p.length>0&&(d=e.compute(Pe(e.inputs[0],p),{inputs:[0],outputs:[-1]})[0],l=Lo(l.length,d.dims.length));let[g,f]=Go(d.dims,l),y=g;s.keepDims&&(y=Ho(g,o)),e.compute(Ko(t,s.cacheKey,[d],a,e.inputs[0].dataType,y,f),{inputs:[d]})},Tp=(e,t)=>{Ge(e,"ReduceMeanShared",t,"mean")},Cp=(e,t)=>{Ge(e,"ReduceL1Shared",t,"l1")},Ip=(e,t)=>{Ge(e,"ReduceL2Shared",t,"l2")},Ep=(e,t)=>{Ge(e,"ReduceLogSumExpShared",t,"logSumExp")},zp=(e,t)=>{Ge(e,"ReduceMaxShared",t,"max")},Ap=(e,t)=>{Ge(e,"ReduceMinShared",t,"min")},Op=(e,t)=>{Ge(e,"ReduceProdShared",t,"prod")},Rp=(e,t)=>{Ge(e,"ReduceSumShared",t,"sum")},Bp=(e,t)=>{Ge(e,"ReduceSumSquareShared",t,"sumSquare")},Mp=(e,t)=>{Ge(e,"ReduceLogSumShared",t,"logSum")}}),He,Qo,Vr,fa,Fe,Zo,Xo,Jo,Yo,eu,tu,ru,iu,au,nu,je,Np,Dp,Pp,Up,Wp,qp,Vp,Lp,Gp,Hp,Wa=q(()=>{Y(),oe(),ke(),ue(),fy(),He=e=>{if(!e||e.length===0||e.length>2)throw new Error("Reduce op requires 1 or 2 inputs.");if(e.length===2&&e[1].dims.length!==1)throw new Error("Invalid axes input dims.")},Qo=e=>["","",`var value = ${e.getByIndices("input_indices")};`,""],Vr=(e,t,r,a,s,i,o=!1,l=!1)=>{let d=[],p=r[0].dims,g=p.length,f=O.normalizeAxes(s,g),y=!l&&f.length===0;p.forEach((b,k)=>{y||f.indexOf(k)>=0?o&&d.push(1):d.push(b)});let _=d.length,w=O.size(d);return{name:e,shaderCache:t,getShaderSource:b=>{let k=[],v=M("_A",r[0].dataType,g),$=j("output",i,_),T=a(v,$,f),S=T[2];for(let C=0,E=0;C<g;C++)y||f.indexOf(C)>=0?(o&&E++,S=`for(var j${C}: u32 = 0; j${C} < ${p[C]}; j${C}++) {
                  ${T[2].includes("last_index")?`let last_index = j${C};`:""}
                  ${v.indicesSet("input_indices",C,`j${C}`)}
                  ${S}
                }`):(k.push(`${v.indicesSet("input_indices",C,$.indicesGet("output_indices",E))};`),E++);return`

        ${b.registerUniform("output_size","u32").declareVariables(v,$)}

        ${b.mainStart()}
          ${b.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          var input_indices: ${v.type.indices};
          let output_indices = ${$.offsetToIndices("global_idx")};

          ${k.join(`
`)}
          ${T[0]}       // init ops for reduce max/min
          ${T[1]}
          ${S}
          ${T[3]}
          ${T.length===4?$.setByOffset("global_idx","value"):T.slice(4).join(`
`)}
        }`},getRunData:()=>({outputs:[{dims:d,dataType:i}],dispatchGroup:{x:Math.ceil(w/64)},programUniforms:[{type:12,data:w},...Q(p,d)]})}},fa=(e,t)=>{let r=[];return e[1].dims[0]>0&&e[1].getBigInt64Array().forEach(a=>r.push(Number(a))),_e({axes:r,keepDims:t.keepDims,noopWithEmptyAxes:t.noopWithEmptyAxes})},Fe=(e,t,r,a)=>{let s=e.inputs,i=s.length===1?r:fa(s,r);e.compute(Vr(t,{hint:i.cacheKey,inputDependencies:["rank"]},[s[0]],i.noopWithEmptyAxes&&i.axes.length===0?Qo:a,i.axes,s[0].dataType,i.keepDims,i.noopWithEmptyAxes),{inputs:[0]})},Zo=(e,t)=>{He(e.inputs),Fe(e,"ReduceLogSum",t,(r,a)=>[`var value = ${a.type.storage}(0);`,"",`value += ${r.getByIndices("input_indices")};`,"value = log(value);"])},Xo=(e,t)=>{He(e.inputs),Fe(e,"ReduceL1",t,(r,a)=>[`var value = ${a.type.storage}(0);`,"",`value += abs(${r.getByIndices("input_indices")});`,""])},Jo=(e,t)=>{He(e.inputs),Fe(e,"ReduceL2",t,(r,a)=>[`var t = ${a.type.value}(0); var value = ${a.type.value}(0);`,"",`t = ${r.getByIndices("input_indices")}; value += (t * t);`,"value = sqrt(value);"])},Yo=(e,t)=>{He(e.inputs),Fe(e,"ReduceLogSumExp",t,(r,a)=>[`var value = ${a.type.storage}(0);`,"",`value += exp(${r.getByIndices("input_indices")});`,"value = log(value);"])},eu=(e,t)=>{He(e.inputs),Fe(e,"ReduceMax",t,(r,a,s)=>{let i=[];for(let o=0;o<r.rank;o++)(s.indexOf(o)>=0||s.length===0)&&i.push(r.indicesSet("input_indices",o,0));return[`${i.join(`
`)}`,`var value = ${r.getByIndices("input_indices")};`,`value = max(value, ${r.getByIndices("input_indices")});`,""]})},tu=(e,t)=>{He(e.inputs),Fe(e,"ReduceMean",t,(r,a,s)=>{let i=1;for(let o=0;o<r.rank;o++)(s.indexOf(o)>=0||s.length===0)&&(i*=e.inputs[0].dims[o]);return["var sum = f32(0);","",`sum += f32(${r.getByIndices("input_indices")});`,`let value = ${a.type.value}(sum / ${i});`]})},ru=(e,t)=>{He(e.inputs),Fe(e,"ReduceMin",t,(r,a,s)=>{let i=[];for(let o=0;o<r.rank;o++)(s.indexOf(o)>=0||s.length===0)&&i.push(`input_indices[${o}] = 0;`);return[`${i.join(`
`)}`,`var value = ${r.getByIndices("input_indices")};`,`value = min(value, ${r.getByIndices("input_indices")});`,""]})},iu=(e,t)=>{He(e.inputs),Fe(e,"ReduceProd",t,(r,a)=>[`var value = ${a.type.storage}(1);`,"",`value *= ${r.getByIndices("input_indices")};`,""])},au=(e,t)=>{He(e.inputs),Fe(e,"ReduceSum",t,(r,a)=>[`var value = ${a.type.storage}(0);`,"",`value += ${r.getByIndices("input_indices")};`,""])},nu=(e,t)=>{He(e.inputs),Fe(e,"ReduceSumSquare",t,(r,a)=>[`var t = ${a.type.value}(0); var value = ${a.type.value}(0);`,"",`t = ${r.getByIndices("input_indices")}; value += t * t;`,""])},je=(e,t,r)=>{if(t.length===0)return r;let a=1,s=1;for(let i=0;i<t.length;i++)t.indexOf(i)===-1?a*=e[i]:s*=e[i];return s<32&&a>1024},Np=(e,t)=>{je(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?tu(e,t):Tp(e,t)},Dp=(e,t)=>{je(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?Xo(e,t):Cp(e,t)},Pp=(e,t)=>{je(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?Jo(e,t):Ip(e,t)},Up=(e,t)=>{je(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?Yo(e,t):Ep(e,t)},Wp=(e,t)=>{je(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?eu(e,t):zp(e,t)},qp=(e,t)=>{je(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?ru(e,t):Ap(e,t)},Vp=(e,t)=>{je(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?iu(e,t):Op(e,t)},Lp=(e,t)=>{je(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?au(e,t):Rp(e,t)},Gp=(e,t)=>{je(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?nu(e,t):Bp(e,t)},Hp=(e,t)=>{je(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?Zo(e,t):Mp(e,t)}}),zi,Fp,jp,ma,my=q(()=>{Y(),ke(),Wa(),zi=e=>{if(!e||e.length===0||e.length>2)throw new Error("ArgMinMaxOp op requires 1 or 2 inputs.");if(e[0].dataType!==1)throw new Error("Invalid input type.")},Fp=(e,t)=>{zi(e.inputs);let r=(a,s,i)=>{let o=[];for(let l=0;l<a.rank;l++)(i.indexOf(l)>=0||i.length===0)&&o.push(`input_indices[${l}] = 0;`);return[`${o.join(`
`)}`,`var value = ${a.getByIndices("input_indices")};
var best_index : i32 = 0;`,`if (${a.getByIndices("input_indices")} ${t.selectLastIndex>0?"<=":"<"} value) {
         value = ${a.getByIndices("input_indices")};
         best_index = i32(last_index);
       }`,"",s.setByOffset("global_idx","best_index")]};e.compute(Vr("ArgMin",{hint:t.cacheKey,inputDependencies:["rank"]},[e.inputs[0]],r,[t.axis],7,t.keepDims),{inputs:[0]})},jp=(e,t)=>{zi(e.inputs);let r=(a,s,i)=>{let o=[];for(let l=0;l<a.rank;l++)(i.indexOf(l)>=0||i.length===0)&&o.push(`input_indices[${l}] = 0;`);return[`${o.join(`
`)}`,`var value = ${a.getByIndices("input_indices")};
var best_index : i32 = 0;`,`if (${a.getByIndices("input_indices")} ${t.selectLastIndex>0?">=":">"} value) {
         value = ${a.getByIndices("input_indices")};
         best_index = i32(last_index);
       }`,"",s.setByOffset("global_idx","best_index")]};e.compute(Vr("argMax",{hint:t.cacheKey,inputDependencies:["rank"]},[e.inputs[0]],r,[t.axis],7,t.keepDims),{inputs:[0]})},ma=e=>_e(e)}),su,Cr,ou,uu,lu,ur,du,Kp,qa=q(()=>{Y(),oe(),Pa(),ue(),su=(e,t)=>{let r=e[0],a=e[1],s=e[2],i=e[3],o=e[4],l=e[5];if(o&&l)throw new Error("Attention cannot have both past and attention_bias");if(r.dims.length!==3)throw new Error('Input "input" must have 3 dimensions');let d=r.dims[0],p=r.dims[1],g=r.dims[2];if(s.dims.length!==1)throw new Error('Input "bias" is expected to have 1 dimensions');if(a.dims.length!==2)throw new Error('Input "weights" is expected to have 2 dimensions');if(a.dims[0]!==g)throw new Error("Input 1 dimension 0 should have same length as dimension 2 of input 0");if(s.dims[0]!==a.dims[1])throw new Error('Input "bias" dimension 0 should have same length as dimension 1 of input "weights"');let f=s.dims[0]/3,y=f,_=y;if(t.qkvHiddenSizes.length>0){if(t.qkvHiddenSizes.length!==3)throw new Error("qkv_hidden_sizes attribute should have 3 elements");for(let T of t.qkvHiddenSizes)if(T%t.numHeads!==0)throw new Error("qkv_hidden_sizes should be divisible by num_heads");f=t.qkvHiddenSizes[0],y=t.qkvHiddenSizes[1],_=t.qkvHiddenSizes[2]}let w=p;if(f!==y)throw new Error("qkv_hidden_sizes first element should be same as the second");if(s.dims[0]!==f+y+_)throw new Error('Input "bias" dimension 0 should have same length as sum of Q/K/V hidden sizes');let b=0;if(o){if(y!==_)throw new Error('Input "past" expect k_hidden_size == v_hidden_size');if(o.dims.length!==5)throw new Error('Input "past" must have 5 dimensions');if(o.dims[0]!==2)throw new Error('Input "past" first dimension must be 2');if(o.dims[1]!==d)throw new Error('Input "past" second dimension must be batch_size');if(o.dims[2]!==t.numHeads)throw new Error('Input "past" third dimension must be num_heads');if(o.dims[4]!==y/t.numHeads)throw new Error('Input "past" fifth dimension must be k_hidden_size / num_heads');t.pastPresentShareBuffer||(b=o.dims[3])}let k=w+b,v=-1,$=0;if(i)throw new Error("Mask not supported");if(o)throw new Error("past is not supported");if(l){if(l.dims.length!==4)throw new Error('Input "attention_bias" must have 4 dimensions');if(l.dims[0]!==d||l.dims[1]!==t.numHeads||l.dims[2]!==p||l.dims[3]!==k)throw new Error('Expect "attention_bias" shape (batch_size, num_heads, sequence_length, total_sequence_length)')}return{batchSize:d,sequenceLength:p,pastSequenceLength:b,kvSequenceLength:w,totalSequenceLength:k,maxSequenceLength:v,inputHiddenSize:g,hiddenSize:f,vHiddenSize:_,headSize:Math.floor(f/t.numHeads),vHeadSize:Math.floor(_/t.numHeads),numHeads:t.numHeads,isUnidirectional:!1,pastPresentShareBuffer:!1,maskFilterValue:t.maskFilterValue,maskType:$,scale:t.scale,broadcastResPosBias:!1,passPastInKv:!1,qkvFormat:1}},Cr=(e,t,r)=>t&&e?`
      let total_sequence_length_input = u32(${t.getByOffset("0")});
      let present_sequence_length = max(total_sequence_length_input, uniforms.past_sequence_length);
      let is_subsequent_prompt: bool = sequence_length > 1 && sequence_length != total_sequence_length_input;
      let is_first_prompt: bool = is_subsequent_prompt == false && sequence_length == total_sequence_length_input;
      total_sequence_length = u32(${e==null?void 0:e.getByOffset("batchIdx")}) + 1;
      var past_sequence_length: u32 = 0;
      if (is_first_prompt == false) {
        past_sequence_length = total_sequence_length - sequence_length;
      }
       `:`
    ${r?"let past_sequence_length = uniforms.past_sequence_length":""};
    let present_sequence_length = total_sequence_length;
    `,ou=(e,t,r,a,s,i,o,l)=>{let d=xe(o?1:i),p=64,g=i/d;g<p&&(p=32);let f=Math.ceil(i/d/p),y=[{type:12,data:t},{type:12,data:r},{type:12,data:a},{type:12,data:s},{type:12,data:g},{type:12,data:f}],_=Ie(e.dataType,d),w=Ae(1,d),b=["type"];o&&b.push("type"),l&&b.push("type");let k=v=>{let $=j("x",e.dataType,e.dims,d),T=[$],S=o?M("seq_lens",o.dataType,o.dims):void 0;S&&T.push(S);let C=l?M("total_sequence_length_input",l.dataType,l.dims):void 0;C&&T.push(C);let E=Ae(e.dataType),z=[{name:"batch_size",type:"u32"},{name:"num_heads",type:"u32"},{name:"past_sequence_length",type:"u32"},{name:"sequence_length",type:"u32"},{name:"total_sequence_length",type:"u32"},{name:"elements_per_thread",type:"u32"}];return`
  var<workgroup> thread_max: array<f32, ${p}>;
  var<workgroup> thread_sum: array<f32, ${p}>;
  ${v.registerUniforms(z).declareVariables(...T)}
  ${v.mainStart([p,1,1])}
    let batchIdx = workgroup_id.z / uniforms.num_heads;
    let headIdx = workgroup_id.z % uniforms.num_heads;
    let sequence_length = uniforms.sequence_length;
    var total_sequence_length = uniforms.total_sequence_length;
    ${Cr(S,C,!1)}
    let local_offset = local_idx * uniforms.elements_per_thread;
    let offset = (global_idx / ${p}) * uniforms.total_sequence_length + local_offset;
    let seq_causal_length = ${o?"u32(past_sequence_length + workgroup_id.y + 1)":"total_sequence_length"};
    var thread_max_vector = ${w}(-3.402823e+38f);
    for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
      thread_max_vector = max(${w}(x[offset + i]), thread_max_vector);
    }
    thread_max[local_idx] = ${(()=>{switch(d){case 1:return"thread_max_vector";case 2:return"max(thread_max_vector.x, thread_max_vector.y)";case 4:return"max(max(thread_max_vector.x, thread_max_vector.y), max(thread_max_vector.z, thread_max_vector.w))";default:throw new Error(`Unsupported components: ${d}`)}})()};
    workgroupBarrier();

    var max_value =  f32(-3.402823e+38f);
    for (var i = 0u; i < ${p}; i++) {
      max_value = max(thread_max[i], max_value);
    }

    var sum_vector = ${w}(0);
    for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
      sum_vector += exp(${w}(x[offset + i]) - max_value);
    }
    thread_sum[local_idx] = ${(()=>{switch(d){case 1:return"sum_vector";case 2:return"sum_vector.x + sum_vector.y";case 4:return"sum_vector.x + sum_vector.y + sum_vector.z + sum_vector.w";default:throw new Error(`Unsupported components: ${d}`)}})()};
    workgroupBarrier();

    var sum: f32 = 0;
    for (var i = 0u; i < ${p}; i++) {
      sum += thread_sum[i];
    }

    if (sum == 0) {
      for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
        x[offset + i] = ${$.type.value}(${E}(1.0) / ${E}(seq_causal_length));
      }
    } else {
      for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
        var f32input = ${w}(x[offset + i]);
        x[offset + i] = ${$.type.value}(exp(f32input - max_value) / sum);
      }
    }
      ${o?`
        for (var total_seq_id: u32 = seq_causal_length; total_seq_id + local_offset < uniforms.total_sequence_length; total_seq_id++) {
          x[offset + total_seq_id] = ${$.type.value}(${E}(0));
        }`:""};
  }`};return{name:"AttentionProbsSoftmax",shaderCache:{hint:`${p};${_};${d}`,inputDependencies:b},getShaderSource:k,getRunData:()=>({outputs:[],dispatchGroup:{x:Math.ceil(i/p),y:s,z:t*r},programUniforms:y})}},uu=(e,t,r,a,s,i,o,l,d)=>{let p=o+i.kvSequenceLength,g=[i.batchSize,i.numHeads,i.sequenceLength,p],f=e>1&&a,y=i.kvNumHeads?i.kvNumHeads:i.numHeads,_=f?[i.batchSize,y,p,i.headSize]:void 0,w=i.nReps?i.nReps:1,b=i.scale===0?1/Math.sqrt(i.headSize):i.scale,k=xe(i.headSize),v=i.headSize/k,$=12,T={x:Math.ceil(p/$),y:Math.ceil(i.sequenceLength/$),z:i.batchSize*i.numHeads},S=[{type:12,data:i.sequenceLength},{type:12,data:v},{type:12,data:p},{type:12,data:i.numHeads},{type:12,data:i.headSize},{type:1,data:b},{type:12,data:o},{type:12,data:i.kvSequenceLength},{type:12,data:w}],C=f&&a&&O.size(a.dims)>0,E=["type","type"];C&&E.push("type"),s&&E.push("type"),l&&E.push("type"),d&&E.push("type");let z=[{dims:g,dataType:t.dataType,gpuDataType:0}];f&&z.push({dims:_,dataType:t.dataType,gpuDataType:0});let B=W=>{let G=M("q",t.dataType,t.dims,k),ee=M("key",r.dataType,r.dims,k),ae=[G,ee];if(C){let F=M("past_key",a.dataType,a.dims,k);ae.push(F)}s&&ae.push(M("attention_bias",s.dataType,s.dims));let Z=l?M("seq_lens",l.dataType,l.dims):void 0;Z&&ae.push(Z);let te=d?M("total_sequence_length_input",d.dataType,d.dims):void 0;te&&ae.push(te);let J=j("output",t.dataType,g),L=[J];f&&L.push(j("present_key",t.dataType,_,k));let de=Ae(1,k),me=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"alpha",type:"f32"},{name:"past_sequence_length",type:"u32"},{name:"kv_sequence_length",type:"u32"},{name:"n_reps",type:"u32"}];return`
  const TILE_SIZE = ${$}u;

  var<workgroup> tileQ: array<${G.type.storage}, ${$*$}>;
  var<workgroup> tileK: array<${G.type.storage}, ${$*$}>;
  ${W.registerUniforms(me).declareVariables(...ae,...L)}
  ${W.mainStart([$,$,1])}
    // x holds the N and y holds the M
    let headIdx = workgroup_id.z % uniforms.num_heads;
    let kvHeadIdx = ${w===1?"headIdx":"headIdx / uniforms.n_reps"};
    let kv_num_heads = ${w===1?"uniforms.num_heads":"uniforms.num_heads / uniforms.n_reps"};
    let batchIdx = workgroup_id.z / uniforms.num_heads;
    let m = workgroup_id.y * TILE_SIZE;
    let n = workgroup_id.x * TILE_SIZE;
    let sequence_length = uniforms.M;
    var total_sequence_length = uniforms.N;
    ${Cr(Z,te,!0)}
    let absKvHeadIdx = batchIdx * kv_num_heads + kvHeadIdx;
    let qOffset = workgroup_id.z * uniforms.M * uniforms.K + m * uniforms.K;
    ${C&&f?"let pastKeyOffset = absKvHeadIdx * uniforms.past_sequence_length * uniforms.K;":""};
    let kOffset = absKvHeadIdx * uniforms.kv_sequence_length * uniforms.K;
    ${f?"let presentKeyOffset = absKvHeadIdx * uniforms.N * uniforms.K;":""}
    var value = ${de}(0);
    for (var w: u32 = 0u; w < uniforms.K; w += TILE_SIZE) {
      if (global_id.y < uniforms.M && w + local_id.x < uniforms.K) {
        tileQ[TILE_SIZE * local_id.y + local_id.x] = q[qOffset + local_id.y * uniforms.K + w + local_id.x];
      }
      if (n + local_id.y < uniforms.N && w + local_id.x < uniforms.K) {
        var idx = TILE_SIZE * local_id.y + local_id.x;
      ${C&&f?`
              if (n + local_id.y < past_sequence_length) {
                tileK[idx] = past_key[pastKeyOffset + (n + local_id.y) * uniforms.K + w + local_id.x];
              } else if (n + local_id.y - past_sequence_length < uniforms.kv_sequence_length) {
                tileK[idx] = key[kOffset + (n + local_id.y - past_sequence_length) * uniforms.K + w + local_id.x];
              }`:`
          if (n + local_id.y < uniforms.kv_sequence_length) {
            tileK[idx] = key[kOffset + (n + local_id.y) * uniforms.K + w + local_id.x];
          }`}
      ${f?`if (n + local_id.y < present_sequence_length) {
        present_key[presentKeyOffset + (n + local_id.y) * uniforms.K + w + local_id.x] = tileK[idx];
      }`:""}
      }
      workgroupBarrier();

      for (var k: u32 = 0u; k < TILE_SIZE && w+k < uniforms.K; k++) {
          value += ${de}(tileQ[TILE_SIZE * local_id.y + k] * tileK[TILE_SIZE * local_id.x + k]);
      }

      workgroupBarrier();
    }

    if (global_id.y < uniforms.M && global_id.x < total_sequence_length) {
      let headOffset = workgroup_id.z * uniforms.M * uniforms.N;
      let outputIdx = headOffset + global_id.y * uniforms.N + global_id.x;
      var sum: f32 = ${(()=>{switch(k){case 1:return"value";case 2:return"value.x + value.y";case 4:return"value.x + value.y + value.z + value.w";default:throw new Error(`Unsupported components: ${k}`)}})()};
        output[outputIdx] = ${J.type.value} (sum * uniforms.alpha) + ${s?"attention_bias[outputIdx]":"0.0"};
    }
  }`};return{name:"AttentionProbs",shaderCache:{hint:`${k};${s!==void 0};${a!==void 0};${e}`,inputDependencies:E},getRunData:()=>({outputs:z,dispatchGroup:T,programUniforms:S}),getShaderSource:B}},lu=(e,t,r,a,s,i,o=void 0,l=void 0)=>{let d=i+s.kvSequenceLength,p=s.nReps?s.nReps:1,g=s.vHiddenSize*p,f=e>1&&a,y=s.kvNumHeads?s.kvNumHeads:s.numHeads,_=f?[s.batchSize,y,d,s.headSize]:void 0,w=[s.batchSize,s.sequenceLength,g],b=12,k={x:Math.ceil(s.vHeadSize/b),y:Math.ceil(s.sequenceLength/b),z:s.batchSize*s.numHeads},v=[{type:12,data:s.sequenceLength},{type:12,data:d},{type:12,data:s.vHeadSize},{type:12,data:s.numHeads},{type:12,data:s.headSize},{type:12,data:g},{type:12,data:i},{type:12,data:s.kvSequenceLength},{type:12,data:p}],$=f&&a&&O.size(a.dims)>0,T=["type","type"];$&&T.push("type"),o&&T.push("type"),l&&T.push("type");let S=[{dims:w,dataType:t.dataType,gpuDataType:0}];f&&S.push({dims:_,dataType:t.dataType,gpuDataType:0});let C=E=>{let z=M("probs",t.dataType,t.dims),B=M("v",r.dataType,r.dims),W=[z,B];$&&W.push(M("past_value",a.dataType,a.dims));let G=o?M("seq_lens",o.dataType,o.dims):void 0;o&&W.push(G);let ee=l?M("total_sequence_length_input",l.dataType,l.dims):void 0;l&&W.push(ee);let ae=[j("output",t.dataType,w)];f&&ae.push(j("present_value",t.dataType,_));let Z=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"v_hidden_size",type:"u32"},{name:"past_sequence_length",type:"u32"},{name:"kv_sequence_length",type:"u32"},{name:"n_reps",type:"u32"}];return`
  const TILE_SIZE = ${b}u;
  var<workgroup> tileQ: array<${z.type.value}, ${b*b}>;
  var<workgroup> tileV: array<${z.type.value}, ${b*b}>;
  ${E.registerUniforms(Z).declareVariables(...W,...ae)}
  ${E.mainStart([b,b,1])}
   let headIdx = workgroup_id.z % uniforms.num_heads;
   let batchIdx = workgroup_id.z / uniforms.num_heads;
   let kvHeadIdx = ${p===1?"headIdx":"headIdx / uniforms.n_reps"};
   let kv_num_heads = ${p===1?"uniforms.num_heads":"uniforms.num_heads / uniforms.n_reps"};
   let m = global_id.y;
   let n = global_id.x;
   let sequence_length = uniforms.M;
   var total_sequence_length = uniforms.K;
   ${Cr(G,ee,!0)}
   let offsetA = workgroup_id.z * uniforms.M * uniforms.K + m * uniforms.K;
   let absKvHeadIdx = batchIdx * kv_num_heads + kvHeadIdx; // kvHeadIdx is relative to the batch
   ${$&&f?"let pastValueOffset = absKvHeadIdx * uniforms.N * uniforms.past_sequence_length + n;":""};
   let vOffset = absKvHeadIdx * uniforms.N * uniforms.kv_sequence_length + n;
   ${f?"let presentValueOffset = absKvHeadIdx * uniforms.N * uniforms.K + n;":""}
   var value = ${z.type.storage}(0);
   for (var w: u32 = 0u; w < uniforms.K; w += TILE_SIZE) {
      if (m < uniforms.M && w + local_id.x < uniforms.K) {
        tileQ[TILE_SIZE * local_id.y + local_id.x] = probs[offsetA + w + local_id.x];
      }
      if (n < uniforms.N && w + local_id.y < uniforms.K) {
        var idx = TILE_SIZE * local_id.y + local_id.x;
        ${$&&f?`
        if (w + local_id.y < past_sequence_length) {
          tileV[idx] = past_value[pastValueOffset + (w + local_id.y) * uniforms.N];
        } else if (w + local_id.y - past_sequence_length < uniforms.kv_sequence_length) {
          tileV[idx] = v[vOffset + (w + local_id.y - past_sequence_length) * uniforms.N];
        }
      `:`
            if (w + local_id.y < uniforms.kv_sequence_length) {
              tileV[idx] = v[vOffset + (w + local_id.y) * uniforms.N];
            }`}
        ${f?`
            if (w + local_id.y < present_sequence_length) {
          present_value[presentValueOffset + (w + local_id.y) * uniforms.N] = tileV[idx];
        }`:""}
      }
     workgroupBarrier();
     for (var k: u32 = 0u; k < TILE_SIZE && w+k < total_sequence_length; k++) {
       value += tileQ[TILE_SIZE * local_id.y + k] * tileV[TILE_SIZE * k + local_id.x];
     }
     workgroupBarrier();
   }

   // we need to transpose output from BNSH_v to BSND_v
   if (m < uniforms.M && n < uniforms.N) {
     let outputIdx = batchIdx * uniforms.M * uniforms.v_hidden_size + m * uniforms.v_hidden_size
       + headIdx * uniforms.N + n;
     output[outputIdx] = value;
   }
  }`};return{name:"AttentionScore",shaderCache:{hint:`${a!==void 0};${e}`,inputDependencies:T},getRunData:()=>({outputs:S,dispatchGroup:k,programUniforms:v}),getShaderSource:C}},ur=(e,t,r,a,s,i,o,l,d,p,g=void 0,f=void 0)=>{let y=Math.min(e.outputCount,1+(o?1:0)+(l?1:0)),_=y>1?p.pastSequenceLength:0,w=_+p.kvSequenceLength,b=d&&O.size(d.dims)>0?d:void 0,k=[t,r];y>1&&o&&O.size(o.dims)>0&&k.push(o),b&&k.push(b),g&&k.push(g),f&&k.push(f);let v=e.compute(uu(y,t,r,o,b,p,_,g,f),{inputs:k,outputs:y>1?[-1,1]:[-1]})[0];e.compute(ou(v,p.batchSize,p.numHeads,_,p.sequenceLength,w,g,f),{inputs:g&&f?[v,g,f]:[v],outputs:[]});let $=[v,a];y>1&&l&&O.size(l.dims)>0&&$.push(l),g&&$.push(g),f&&$.push(f),e.compute(lu(y,v,a,l,p,_,g,f),{inputs:$,outputs:y>1?[0,2]:[0]})},du=(e,t)=>{let r=[t.batchSize,t.numHeads,t.sequenceLength,t.headSize],a=t.sequenceLength,s=t.inputHiddenSize,i=t.headSize,o=12,l={x:Math.ceil(t.headSize/o),y:Math.ceil(t.sequenceLength/o),z:t.batchSize*t.numHeads},d=[e.inputs[0],e.inputs[1],e.inputs[2]],p=[{type:12,data:a},{type:12,data:s},{type:12,data:i},{type:12,data:t.numHeads},{type:12,data:t.headSize},{type:12,data:t.hiddenSize},{type:12,data:t.hiddenSize+t.hiddenSize+t.vHiddenSize}],g=f=>{let y=j("output_q",d[0].dataType,r),_=j("output_k",d[0].dataType,r),w=j("output_v",d[0].dataType,r),b=M("input",d[0].dataType,d[0].dims),k=M("weight",d[1].dataType,d[1].dims),v=M("bias",d[2].dataType,d[2].dims),$=b.type.storage,T=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"hidden_size",type:"u32"},{name:"ldb",type:"u32"}];return`
  const TILE_SIZE = ${o}u;
  var<workgroup> tileInput: array<${$}, ${o*o}>;
  var<workgroup> tileWeightQ: array<${$}, ${o*o}>;
  var<workgroup> tileWeightK: array<${$}, ${o*o}>;
  var<workgroup> tileWeightV: array<${$}, ${o*o}>;
  ${f.registerUniforms(T).declareVariables(b,k,v,y,_,w)}
  ${f.mainStart([o,o,1])}
    let batchIndex = workgroup_id.z / uniforms.num_heads;
    let headNumber = workgroup_id.z % uniforms.num_heads;
    let m = global_id.y;
    let n = global_id.x;

    let inputOffset = batchIndex * (uniforms.M * uniforms.K) + m * uniforms.K;
    let biasOffsetQ = headNumber * uniforms.head_size;
    let biasOffsetK = uniforms.hidden_size + biasOffsetQ;
    let biasOffsetV = uniforms.hidden_size + biasOffsetK;

    var valueQ = ${$}(0);
    var valueK = ${$}(0);
    var valueV = ${$}(0);
    for (var w: u32 = 0u; w < uniforms.K; w += TILE_SIZE) {
      if (m < uniforms.M && w + local_id.x < uniforms.K) {
        tileInput[TILE_SIZE * local_id.y + local_id.x] = input[inputOffset + w + local_id.x];
      }
      if (n < uniforms.N && w + local_id.y < uniforms.K) {
        let offset = n + (w + local_id.y) * uniforms.ldb;
        tileWeightQ[TILE_SIZE * local_id.y + local_id.x] = weight[biasOffsetQ + offset];
        tileWeightK[TILE_SIZE * local_id.y + local_id.x] = weight[biasOffsetK + offset];
        tileWeightV[TILE_SIZE * local_id.y + local_id.x] = weight[biasOffsetV + offset];
      }
      workgroupBarrier();
      for (var k: u32 = 0u; k<TILE_SIZE && w+k < uniforms.K; k++) {
        let inputTileOffset = TILE_SIZE * local_id.y + k;
        let weightTileOffset = TILE_SIZE * k + local_id.x;
        valueQ += tileInput[inputTileOffset] * tileWeightQ[weightTileOffset];
        valueK += tileInput[inputTileOffset] * tileWeightK[weightTileOffset];
        valueV += tileInput[inputTileOffset] * tileWeightV[weightTileOffset];
      }

      workgroupBarrier();
    }

    let headOffset = (m * uniforms.N + n) % uniforms.head_size;
    valueQ += bias[headOffset + biasOffsetQ];
    valueK += bias[headOffset + biasOffsetK];
    valueV += bias[headOffset + biasOffsetV];

    let offset = workgroup_id.z * uniforms.M * uniforms.N;
    if (m < uniforms.M && n < uniforms.N) {
      let outputIdx = offset + m * uniforms.N + n;
      output_q[outputIdx] = valueQ;
      output_k[outputIdx] = valueK;
      output_v[outputIdx] = valueV;
    }
  }`};return e.compute({name:"AttentionPrepare",shaderCache:{inputDependencies:["type","type","type"]},getRunData:()=>({outputs:[{dims:r,dataType:e.inputs[0].dataType,gpuDataType:0},{dims:r,dataType:e.inputs[0].dataType,gpuDataType:0},{dims:r,dataType:e.inputs[0].dataType,gpuDataType:0}],dispatchGroup:l,programUniforms:p}),getShaderSource:g},{inputs:d,outputs:[-1,-1,-1]})},Kp=(e,t)=>{let r=su(e.inputs,t),[a,s,i]=du(e,r);return ur(e,a,s,i,e.inputs[4],void 0,void 0,void 0,e.inputs[5],r)}}),pu,cu,hu,Qp,gy=q(()=>{Ze(),Y(),oe(),ke(),ue(),pu=(e,t)=>{if(!e||e.length!==5)throw new Error("BatchNormalization requires 5 inputs");let r=(a,s,i)=>{let o=s.length;if(o!==a.length)throw new Error(`${i}: num dimensions != ${o}`);s.forEach((l,d)=>{if(l!==a[d])throw new Error(`${i}: dim[${d}] do not match`)})};if(e[0].dims.length>1){let a=t.format==="NHWC"?t.spatial?e[0].dims.slice(-1):e[0].dims.slice(-1).concat(e[0].dims.slice(1,e[0].dims.length-1)):e[0].dims.slice(1,t.spatial?2:void 0);r(e[1].dims,a,"Invalid input scale"),r(e[2].dims,a,"Invalid input B"),r(e[3].dims,a,"Invalid input mean"),r(e[4].dims,a,"Invalid input var")}else r(e[1].dims,[1],"Invalid input scale"),r(e[2].dims,[1],"Invalid input B"),r(e[3].dims,[1],"Invalid input mean"),r(e[4].dims,[1],"Invalid input var")},cu=(e,t)=>{let{epsilon:r,spatial:a,format:s}=t,i=e[0].dims,o=a?xe(i[i.length-1]):1,l=s==="NHWC"&&i.length>1?o:1,d=O.size(i)/o,p=a,g=p?i.length:i,f=M("x",e[0].dataType,e[0].dims,o),y=M("scale",e[1].dataType,e[1].dims,l),_=M("bias",e[2].dataType,e[2].dims,l),w=M("inputMean",e[3].dataType,e[3].dims,l),b=M("inputVar",e[4].dataType,e[4].dims,l),k=j("y",e[0].dataType,g,o),v=()=>{let T="";if(a)T=`let cOffset = ${i.length===1?"0u":s==="NHWC"?`outputIndices[${i.length-1}] / ${o}`:"outputIndices[1]"};`;else if(s==="NCHW")T=`
            ${k.indicesSet("outputIndices","0","0")}
            let cOffset = ${k.indicesToOffset("outputIndices")};`;else{T=`var cIndices = ${y.type.indices}(0);
                       cIndices[0] = outputIndices[${i.length-1}];`;for(let S=1;S<y.rank;S++)T+=`cIndices[${S}] = outputIndices[${S}];`;T+=`let cOffset = ${y.indicesToOffset("cIndices")};`}return T},$=T=>`
  const epsilon = ${r};
  ${T.registerUniform("outputSize","u32").declareVariables(f,y,_,w,b,k)}
  ${T.mainStart()}
  ${T.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
    var outputIndices = ${k.offsetToIndices(`global_idx * ${o}`)};
    ${v()}
    let scale = ${y.getByOffset("cOffset")};
    let bias = ${_.getByOffset("cOffset")};
    let inputMean = ${w.getByOffset("cOffset")};
    let inputVar = ${b.getByOffset("cOffset")};
    let x = ${f.getByOffset("global_idx")};
    let value = (x - inputMean) * inverseSqrt(inputVar + epsilon) * scale + bias;
    ${k.setByOffset("global_idx","value")}
  }`;return{name:"BatchNormalization",shaderCache:{hint:`${t.epsilon}_${t.format}_${a}_${o}`,inputDependencies:p?["rank","type","type","type","type"]:void 0},getShaderSource:$,getRunData:()=>({outputs:[{dims:e[0].dims,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(d/64)},programUniforms:p?[{type:12,data:d},...Q(i)]:[{type:12,data:d}]})}},hu=e=>_e(e),Qp=(e,t)=>{let{inputs:r,outputCount:a}=e,s=hu({...t,outputCount:a});if($e.webgpu.validateInputContent&&pu(r,s),t.trainingMode)throw new Error("BatchNormalization trainingMode is not supported yet.");e.compute(cu(r,s))}}),fu,mu,Zp,yy=q(()=>{oe(),ue(),fu=e=>{if(e[0].dims.length!==3)throw new Error("input should have 3 dimensions");if(![320,640,1280].includes(e[0].dims[2]))throw new Error("number of channels should be 320, 640 or 1280");if(e[1].dims.length!==1)throw new Error("bias is expected to have 1 dimensions");if(e[0].dims[2]!==e[1].dims[0])throw new Error("last dimension of input and bias are not the same")},mu=e=>{let t=e[0].dims,r=e[0].dims[2],a=O.size(t)/4,s=e[0].dataType,i=M("input",s,t,4),o=M("bias",s,[r],4),l=M("residual",s,t,4),d=j("output",s,t,4);return{name:"BiasAdd",getRunData:()=>({outputs:[{dims:t,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(a/64)}}),getShaderSource:p=>`
  const channels = ${r}u / 4;
  ${p.declareVariables(i,o,l,d)}

  ${p.mainStart()}
    ${p.guardAgainstOutOfBoundsWorkgroupSizes(a)}
    let value = ${i.getByOffset("global_idx")}
      + ${o.getByOffset("global_idx % channels")} + ${l.getByOffset("global_idx")};
    ${d.setByOffset("global_idx","value")}
  }`}},Zp=e=>{fu(e.inputs),e.compute(mu(e.inputs))}}),gu,he,Xp,Jp,Yp,ec,tc,rc,ic,ac,nc,yu,sc,oc,uc,lc,nr,dc,Nr,pc,cc,hc,fc,mc,gc,yc,_c,wc,bc,$c,vc,xc,kc,Sc,Tc,Ai,Cc,ga,ya,Ic,Ec,zc,_u,wu,Ac,Va=q(()=>{Y(),oe(),ke(),ue(),gu=(e,t,r,a,s,i,o)=>{let l=Math.ceil(t/4),d="";typeof s=="string"?d=`${s}(a)`:d=s("a");let p=M("inputData",r,[l],4),g=j("outputData",a,[l],4),f=[{name:"vec_size",type:"u32"}];return o&&f.push(...o),`
      ${e.registerUniforms(f).declareVariables(p,g)}

  ${i??""}

  ${e.mainStart()}
    ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}

    let a = ${p.getByOffset("global_idx")};
    ${g.setByOffset("global_idx",d)}
  }`},he=(e,t,r,a,s,i=e.dataType,o,l)=>{let d=[{type:12,data:Math.ceil(O.size(e.dims)/4)}];return o&&d.push(...o),{name:t,shaderCache:{hint:s,inputDependencies:["type"]},getShaderSource:p=>gu(p,O.size(e.dims),e.dataType,i,r,a,l),getRunData:p=>({outputs:[{dims:e.dims,dataType:i}],dispatchGroup:{x:Math.ceil(O.size(p[0].dims)/64/4)},programUniforms:d})}},Xp=e=>{e.compute(he(e.inputs[0],"Abs","abs"))},Jp=e=>{e.compute(he(e.inputs[0],"Acos","acos"))},Yp=e=>{e.compute(he(e.inputs[0],"Acosh","acosh"))},ec=e=>{e.compute(he(e.inputs[0],"Asin","asin"))},tc=e=>{e.compute(he(e.inputs[0],"Asinh","asinh"))},rc=e=>{e.compute(he(e.inputs[0],"Atan","atan"))},ic=e=>{e.compute(he(e.inputs[0],"Atanh","atanh"))},ac=e=>_e(e),nc=(e,t)=>{let r;switch(t.to){case 10:r="vec4<f16>";break;case 1:r="vec4<f32>";break;case 12:r="vec4<u32>";break;case 6:r="vec4<i32>";break;case 9:r="vec4<bool>";break;default:throw new RangeError(`not supported type (specified in attribute 'to' from 'Cast' operator): ${t.to}`)}e.compute(he(e.inputs[0],"Cast",r,void 0,t.cacheKey,t.to))},yu=e=>{let t,r,a=e.length>=2&&e[1].data!==0,s=e.length>=3&&e[2].data!==0;switch(e[0].dataType){case 1:t=a?e[1].getFloat32Array()[0]:-34028234663852886e22,r=s?e[2].getFloat32Array()[0]:34028234663852886e22;break;case 10:t=a?e[1].getUint16Array()[0]:64511,r=s?e[2].getUint16Array()[0]:31743;break;default:throw new Error("Unsupport data type")}return _e({min:t,max:r})},sc=(e,t)=>{let r=t||yu(e.inputs),a=Ae(e.inputs[0].dataType);e.compute(he(e.inputs[0],"Clip",s=>`clamp(${s}, vec4<${a}>(uniforms.min), vec4<${a}>(uniforms.max))`,void 0,r.cacheKey,void 0,[{type:e.inputs[0].dataType,data:r.min},{type:e.inputs[0].dataType,data:r.max}],[{name:"min",type:a},{name:"max",type:a}]),{inputs:[0]})},oc=e=>{e.compute(he(e.inputs[0],"Ceil","ceil"))},uc=e=>{e.compute(he(e.inputs[0],"Cos","cos"))},lc=e=>{e.compute(he(e.inputs[0],"Cosh","cosh"))},nr=e=>_e(e),dc=(e,t)=>{let r=Ae(e.inputs[0].dataType);e.compute(he(e.inputs[0],"Elu",a=>`elu_vf32(${a})`,`
  const elu_alpha_ = ${r}(${t.alpha});

  fn elu_f32(a: ${r}) -> ${r} {
  return select((exp(a) - 1.0) * elu_alpha_, a, a >= 0.0);
  }

  fn elu_vf32(v: vec4<${r}>) -> vec4<${r}> {
  return vec4(elu_f32(v.x), elu_f32(v.y), elu_f32(v.z), elu_f32(v.w));
  }`,t.cacheKey))},Nr=(e="f32")=>`
const r0: ${e} = 0.3275911;
const r1: ${e} = 0.254829592;
const r2: ${e} = -0.284496736;
const r3: ${e} = 1.421413741;
const r4: ${e} = -1.453152027;
const r5: ${e} = 1.061405429;

fn erf_vf32(v: vec4<${e}>) -> vec4<${e}> {
  let absv = abs(v);
  let x = 1.0 / (1.0 + r0 * absv);
  return sign(v) * (1.0 - ((((r5 * x + r4) * x + r3) * x + r2) * x + r1) * x * exp(-absv * absv));
}`,pc=e=>{let t=Ae(e.inputs[0].dataType);e.compute(he(e.inputs[0],"Erf",r=>`erf_vf32(${r})`,Nr(t)))},cc=e=>{e.compute(he(e.inputs[0],"Exp","exp"))},hc=e=>{e.compute(he(e.inputs[0],"Floor","floor"))},fc=e=>{let t=Ae(e.inputs[0].dataType);e.compute(he(e.inputs[0],"Gelu",r=>`0.5 * ${r} * (1.0 + erf_vf32(${r} * 0.7071067811865475))`,Nr(t)))},mc=(e,t)=>{let r=Ae(e.inputs[0].dataType);e.compute(he(e.inputs[0],"LeakyRelu",a=>`select(leaky_relu_alpha_ * ${a}, ${a}, ${a} >= vec4<${r}>(0.0))`,`const leaky_relu_alpha_ = ${r}(${t.alpha});`,t.cacheKey))},gc=e=>{e.compute(he(e.inputs[0],"Not",t=>`!${t}`))},yc=e=>{e.compute(he(e.inputs[0],"Neg",t=>`-${t}`))},_c=e=>{e.compute(he(e.inputs[0],"Reciprocal",t=>`1.0/${t}`))},wc=e=>{let t=Ae(e.inputs[0].dataType);e.compute(he(e.inputs[0],"Relu",r=>`select(vec4<${t}>(0.0), ${r}, ${r} > vec4<${t}>(0.0))`))},bc=e=>{e.compute(he(e.inputs[0],"Sigmoid",t=>`(1.0 / (1.0 + exp(-${t})))`))},$c=e=>_e(e),vc=(e,t)=>{let r=Ae(e.inputs[0].dataType);e.compute(he(e.inputs[0],"HardSigmoid",a=>`max(vec4<${r}>(0.0), min(vec4<${r}>(1.0), ${t.alpha} * ${a} + vec4<${r}>(${t.beta})))`,void 0,t.cacheKey))},xc=e=>{e.compute(he(e.inputs[0],"Sin","sin"))},kc=e=>{e.compute(he(e.inputs[0],"Sinh","sinh"))},Sc=e=>{e.compute(he(e.inputs[0],"Sqrt","sqrt"))},Tc=e=>{e.compute(he(e.inputs[0],"Tan","tan"))},Ai=e=>`sign(${e}) * (1 - exp(-2 * abs(${e}))) / (1 + exp(-2 * abs(${e})))`,Cc=e=>{e.compute(he(e.inputs[0],"Tanh",Ai))},ga=(e="f32")=>`
const fast_gelu_a: ${e} = 0.5;
const fast_gelu_b: ${e} = 0.7978845608028654;
const fast_gelu_c: ${e} = 0.035677408136300125;

fn tanh_v(v: vec4<${e}>) -> vec4<${e}> {
  return ${Ai("v")};
}
`,ya=e=>`(fast_gelu_a + fast_gelu_a * tanh_v(${e} * (fast_gelu_c * ${e} * ${e} + fast_gelu_b))) * ${e}`,Ic=e=>{let t=Ae(e.inputs[0].dataType);e.compute(he(e.inputs[0],"FastGelu",ya,ga(t),void 0,e.inputs[0].dataType))},Ec=(e,t)=>{let r=Ae(e.inputs[0].dataType);return e.compute(he(e.inputs[0],"ThresholdedRelu",a=>`select(vec4<${r}>(0.0), ${a}, ${a} > thresholded_relu_alpha_)`,`const thresholded_relu_alpha_ = vec4<${r}>(${t.alpha});`,t.cacheKey)),0},zc=e=>{e.compute(he(e.inputs[0],"Log","log"))},_u=(e,t)=>`
const alpha = vec4<${e}>(${t});
const one = ${e}(1.0);
const zero = ${e}(0.0);

fn quick_gelu_impl(x: vec4<${e}>) -> vec4<${e}> {
  let v = x *alpha;
  var x1 : vec4<${e}>;
  for (var i = 0; i < 4; i = i + 1) {
    if (v[i] >= zero) {
      x1[i] = one / (one + exp(-v[i]));
    } else {
      x1[i] = one - one / (one + exp(v[i]));
    }
  }
  return x * x1;
}
`,wu=e=>`quick_gelu_impl(${e})`,Ac=(e,t)=>{let r=Ae(e.inputs[0].dataType);e.compute(he(e.inputs[0],"QuickGelu",wu,_u(r,t.alpha),t.cacheKey,e.inputs[0].dataType))}}),bu,$u,Oc,_y=q(()=>{oe(),ue(),Va(),bu=e=>{if(e[0].dims.length!==3)throw new Error("input should have 3 dimensions");if(![2560,5120,10240].includes(e[0].dims[2]))throw new Error("hidden state should be 2560, 5120 or 10240");if(e[1].dims.length!==1)throw new Error("bias is expected to have 1 dimensions");if(e[0].dims[2]!==e[1].dims[0])throw new Error("last dimension of input and bias are not the same")},$u=e=>{let t=e[0].dims.slice();t[2]=t[2]/2;let r=M("input",e[0].dataType,e[0].dims,4),a=M("bias",e[0].dataType,[e[0].dims[2]],4),s=j("output",e[0].dataType,t,4),i=O.size(t)/4,o=Ie(e[0].dataType);return{name:"BiasSplitGelu",getRunData:()=>({outputs:[{dims:t,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(i/64)}}),getShaderSource:l=>`
  const M_SQRT2 = sqrt(2.0);
  const halfChannels = ${e[0].dims[2]/4/2}u;

  ${l.declareVariables(r,a,s)}

  ${Nr(o)}

  ${l.mainStart()}
    ${l.guardAgainstOutOfBoundsWorkgroupSizes(i)}
    let biasIdx = global_idx % halfChannels;
    let batchIndex = global_idx / halfChannels;
    let inputOffset = biasIdx + batchIndex * halfChannels * 2;
    let valueLeft = input[inputOffset] + bias[biasIdx];
    let valueRight = input[inputOffset + halfChannels] + bias[biasIdx + halfChannels];
    let geluRight = valueRight * 0.5 * (erf_vf32(valueRight / M_SQRT2) + 1);

    ${s.setByOffset("global_idx","valueLeft * geluRight")}
  }`}},Oc=e=>{bu(e.inputs),e.compute($u(e.inputs))}}),vu,xu,Ke,Rc,Bc,Mc,Nc,Dc,Pc,Uc,Wc,qc,Vc,wy=q(()=>{Y(),oe(),ue(),vu=(e,t,r,a,s,i,o,l,d,p,g,f)=>{let y,_;typeof l=="string"?y=_=($,T)=>`${l}((${$}),(${T}))`:typeof l=="function"?y=_=l:(y=l.scalar,_=l.vector);let w=j("outputData",g,a.length,4),b=M("aData",d,t.length,4),k=M("bData",p,r.length,4),v;if(s)if(i){let $=O.size(t)===1,T=O.size(r)===1,S=t.length>0&&t[t.length-1]%4===0,C=r.length>0&&r[r.length-1]%4===0;$||T?v=w.setByOffset("global_idx",_($?`${b.type.value}(${b.getByOffset("0")}.x)`:b.getByOffset("global_idx"),T?`${k.type.value}(${k.getByOffset("0")}.x)`:k.getByOffset("global_idx"))):v=`
            let outputIndices = ${w.offsetToIndices("global_idx * 4u")};
            let offsetA = ${b.broadcastedIndicesToOffset("outputIndices",w)};
            let offsetB = ${k.broadcastedIndicesToOffset("outputIndices",w)};
            ${w.setByOffset("global_idx",_(o||S?b.getByOffset("offsetA / 4u"):`${b.type.value}(${b.getByOffset("offsetA / 4u")}[offsetA % 4u])`,o||C?k.getByOffset("offsetB / 4u"):`${k.type.value}(${k.getByOffset("offsetB / 4u")}[offsetB % 4u])`))}
          `}else v=w.setByOffset("global_idx",_(b.getByOffset("global_idx"),k.getByOffset("global_idx")));else{if(!i)throw new Error("no necessary to use scalar implementation for element-wise binary op implementation.");let $=(T,S,C="")=>{let E=`aData[indexA${S}][componentA${S}]`,z=`bData[indexB${S}][componentB${S}]`;return`
            let outputIndices${S} = ${w.offsetToIndices(`global_idx * 4u + ${S}u`)};
            let offsetA${S} = ${b.broadcastedIndicesToOffset(`outputIndices${S}`,w)};
            let offsetB${S} = ${k.broadcastedIndicesToOffset(`outputIndices${S}`,w)};
            let indexA${S} = offsetA${S} / 4u;
            let indexB${S} = offsetB${S} / 4u;
            let componentA${S} = offsetA${S} % 4u;
            let componentB${S} = offsetB${S} % 4u;
            ${T}[${S}] = ${C}(${y(E,z)});
          `};g===9?v=`
            var data = vec4<u32>(0);
            ${$("data",0,"u32")}
            ${$("data",1,"u32")}
            ${$("data",2,"u32")}
            ${$("data",3,"u32")}
            outputData[global_idx] = dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(data));`:v=`
            ${$("outputData[global_idx]",0)}
            ${$("outputData[global_idx]",1)}
            ${$("outputData[global_idx]",2)}
            ${$("outputData[global_idx]",3)}
          `}return`
        ${e.registerUniform("vec_size","u32").declareVariables(b,k,w)}

        ${f??""}

        ${e.mainStart()}
        ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
        ${v}
      }`},xu=(e,t,r,a,s,i,o=r.dataType)=>{let l=r.dims.map(b=>Number(b)??1),d=a.dims.map(b=>Number(b)??1),p=!O.areEqual(l,d),g=l,f=O.size(l),y=!1,_=!1,w=[p];if(p){let b=Ut.calcShape(l,d,!1);if(!b)throw new Error("Can't perform binary op on the given tensors");g=b.slice(),f=O.size(g);let k=O.size(l)===1,v=O.size(d)===1,$=l.length>0&&l[l.length-1]%4===0,T=d.length>0&&d[d.length-1]%4===0;w.push(k),w.push(v),w.push($),w.push(T);let S=1;for(let C=1;C<g.length;C++){let E=l[l.length-C],z=d[d.length-C];if(E===z)S*=E;else break}S%4===0?(_=!0,y=!0):(k||v||$||T)&&(y=!0)}else y=!0;return w.push(y),{name:e,shaderCache:{hint:t+w.map(b=>b.toString()).join("_"),inputDependencies:["rank","rank"]},getShaderSource:b=>vu(b,l,d,g,y,p,_,s,r.dataType,a.dataType,o,i),getRunData:()=>({outputs:[{dims:g,dataType:o}],dispatchGroup:{x:Math.ceil(f/64/4)},programUniforms:[{type:12,data:Math.ceil(O.size(g)/4)},...Q(l,d,g)]})}},Ke=(e,t,r,a,s,i)=>{e.compute(xu(t,s??"",e.inputs[0],e.inputs[1],r,a,i))},Rc=e=>{Ke(e,"Add",(t,r)=>`${t}+${r}`)},Bc=e=>{Ke(e,"Div",(t,r)=>`${t}/${r}`)},Mc=e=>{Ke(e,"Equal",{scalar:(t,r)=>`u32(${t}==${r})`,vector:(t,r)=>`vec4<u32>(${t}==${r})`},void 0,void 0,9)},Nc=e=>{Ke(e,"Mul",(t,r)=>`${t}*${r}`)},Dc=e=>{let t=M("input",e.inputs[0].dataType,e.inputs[0].dims).type.value;Ke(e,"Pow",{scalar:(r,a)=>`pow_custom(${r},${a})`,vector:(r,a)=>`pow_vector_custom(${r},${a})`},`
    fn pow_custom(a : ${t}, b : ${t}) -> ${t} {
      if (b == ${t}(0.0)) {
        return ${t}(1.0);
      } else if (a < ${t}(0.0) && f32(b) != floor(f32(b))) {
        return ${t}(pow(f32(a), f32(b))); // NaN
      }
      return select(sign(a), ${t}(1.0), round(f32(abs(b) % ${t}(2.0))) != 1.0) * ${t}(${t==="i32"?"round":""}(pow(f32(abs(a)), f32(b))));
    }
    fn pow_vector_custom(a : vec4<${t}>, b : vec4<${t}>) -> vec4<${t}> {
      // TODO: implement vectorized pow
      return vec4<${t}>(pow_custom(a.x, b.x), pow_custom(a.y, b.y), pow_custom(a.z, b.z), pow_custom(a.w, b.w));
    }
      `)},Pc=e=>{Ke(e,"Sub",(t,r)=>`${t}-${r}`)},Uc=e=>{Ke(e,"Greater",{scalar:(t,r)=>`u32(${t}>${r})`,vector:(t,r)=>`vec4<u32>(${t}>${r})`},void 0,void 0,9)},Wc=e=>{Ke(e,"Less",{scalar:(t,r)=>`u32(${t}<${r})`,vector:(t,r)=>`vec4<u32>(${t}<${r})`},void 0,void 0,9)},qc=e=>{Ke(e,"GreaterOrEqual",{scalar:(t,r)=>`u32(${t}>=${r})`,vector:(t,r)=>`vec4<u32>(${t}>=${r})`},void 0,void 0,9)},Vc=e=>{Ke(e,"LessOrEqual",{scalar:(t,r)=>`u32(${t}<=${r})`,vector:(t,r)=>`vec4<u32>(${t}<=${r})`},void 0,void 0,9)}}),ku,Su,Tu,Cu,Lc,Gc,by=q(()=>{Y(),oe(),ke(),ue(),ku=(e,t)=>{if(!e||e.length<1)throw new Error("too few inputs");let r=0,a=e[r],s=a.dataType,i=a.dims.length;e.forEach((o,l)=>{if(l!==r){if(o.dataType!==s)throw new Error("input tensors should be one type");if(o.dims.length!==i)throw new Error("input tensors should have the same shape");o.dims.forEach((d,p)=>{if(p!==t&&d!==a.dims[p])throw new Error("non concat dimensions must match")})}})},Su=(e,t)=>`
  fn calculateInputIndex(index: u32) -> u32 {
    let sizeInConcatAxis = array<u32, ${e}u>(${t});
    for (var i: u32 = 0u; i < ${e}; i += 1u ) {
      if (index < sizeInConcatAxis[i]) {
        return i;
      }
    }
    return ${e}u;
  }`,Tu=(e,t)=>{let r=e.length,a=[];for(let s=0;s<r;++s){let i=t.setByOffset("global_idx",e[s].getByIndices("indices"));r===1?a.push(i):s===0?a.push(`if (inputIndex == ${s}u) { ${i} }`):s===r-1?a.push(`else { ${i} }`):a.push(`else if (inputIndex == ${s}) { ${i} }`)}return a.join(`
`)},Cu=(e,t,r,a)=>{let s=O.size(r),i=new Array(e.length),o=new Array(e.length),l=0,d=[],p=[],g=[{type:12,data:s}];for(let b=0;b<e.length;++b)l+=e[b].dims[t],i[b]=l,p.push(e[b].dims.length),o[b]=M(`input${b}`,a,p[b]),d.push("rank"),g.push({type:12,data:i[b]});for(let b=0;b<e.length;++b)g.push(...Q(e[b].dims));g.push(...Q(r));let f=j("output",a,r.length),y=f.indicesGet("indices",t),_=Array.from(Array(i.length).keys()).map(b=>`uniforms.sizeInConcatAxis${b}`).join(","),w=b=>`

  ${(()=>{b.registerUniform("outputSize","u32");for(let k=0;k<e.length;k++)b.registerUniform(`sizeInConcatAxis${k}`,"u32");return b.declareVariables(...o,f)})()}

  ${Su(i.length,_)}

  ${b.mainStart()}
    ${b.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

    var indices = ${f.offsetToIndices("global_idx")};

    let inputIndex = calculateInputIndex(${y});
    if (inputIndex != 0u) {
      let sizeInConcatAxis = array<u32, ${i.length}u>(${_});
      ${y} -= sizeInConcatAxis[inputIndex - 1u];
    }

    ${Tu(o,f)}
  }`;return{name:"Concat",shaderCache:{hint:`${t}`,inputDependencies:d},getRunData:()=>({outputs:[{dims:r,dataType:a}],dispatchGroup:{x:Math.ceil(s/64)},programUniforms:g}),getShaderSource:w}},Lc=(e,t)=>{let r=e.inputs,a=r[0].dims,s=O.normalizeAxis(t.axis,a.length);ku(r,s);let i=a.slice();i[s]=r.reduce((l,d)=>l+(d.dims.length>s?d.dims[s]:0),0);let o=r.filter(l=>O.size(l.dims)>0);e.compute(Cu(o,s,i,r[0].dataType),{inputs:o})},Gc=e=>_e({axis:e.axis})}),It,Et,zt,La,Ot=q(()=>{Y(),oe(),It=(e,t,r="f32")=>{switch(e.activation){case"Relu":return`value = max(value, ${t}(0.0));`;case"Sigmoid":return`value = (${t}(1.0) / (${t}(1.0) + exp(-value)));`;case"Clip":return`value = clamp(value, ${t}(${r}(uniforms.clip_min)), ${t}(${r}(uniforms.clip_max)));`;case"HardSigmoid":return`value = max(${t}(0.0), min(${t}(1.0), ${r}(uniforms.alpha) * value + ${r}(uniforms.beta)));`;case"LeakyRelu":return`value = select(${r}(uniforms.alpha) * value, value, value >= ${t}(0.0));`;case"Tanh":return`let e2x = exp(-2.0 * abs(value));
              value = sign(value) * (1.0 - e2x) / (1.0 + e2x);
        `;case"":return"";default:throw new Error(`Unsupported activation ${e.activation}`)}},Et=(e,t)=>{e.activation==="Clip"?t.push({type:1,data:e.clipMax},{type:1,data:e.clipMin}):e.activation==="HardSigmoid"?t.push({type:1,data:e.alpha},{type:1,data:e.beta}):e.activation==="LeakyRelu"&&t.push({type:1,data:e.alpha})},zt=(e,t)=>{e.activation==="Clip"?t.push({name:"clip_max",type:"f32"},{name:"clip_min",type:"f32"}):e.activation==="HardSigmoid"?t.push({name:"alpha",type:"f32"},{name:"beta",type:"f32"}):e.activation==="LeakyRelu"&&t.push({name:"alpha",type:"f32"})},La=e=>{let t=(e==null?void 0:e.activation)||"";if(t==="HardSigmoid"){let[r,a]=(e==null?void 0:e.activation_params)||[.2,.5];return{activation:t,alpha:r,beta:a}}else if(t==="Clip"){let[r,a]=(e==null?void 0:e.activation_params)||[bp,$p];return{activation:t,clipMax:a,clipMin:r}}else if(t==="LeakyRelu"){let[r]=(e==null?void 0:e.activation_params)||[.01];return{activation:t,alpha:r}}return{activation:t}}}),Ee,Hc,Ga=q(()=>{Ee=(e,t)=>{switch(e){case 1:return t;case 2:return`vec2<${t}>`;case 3:return`vec3<${t}>`;case 4:return`vec4<${t}>`;default:throw new Error(`${e}-component is not supported.`)}},Hc=e=>`
      ${e?"value = value + getBiasByOutputCoords(coords);":""}
      `}),Fc,$y=q(()=>{Fc=e=>`
fn getIndexFromCoords4D(coords : vec4<i32>, shape : vec4<i32>) -> i32 {
  return dot(coords, vec4<i32>(
      shape.y * shape.z * shape.w, shape.z * shape.w, shape.w, 1));
}
fn getOutputIndexFromCoords(coords : vec4<i32>) -> i32 {
  return dot(coords, vec4<i32>(
    i32(${e}.x), i32(${e}.y), i32(${e}.z), 1));
}
`}),or,Ha,Fa=q(()=>{Y(),oe(),ue(),Ot(),or=(e,t,r,a,s)=>{let i=a-r;return`
      ${Array.from({length:r}).map((o,l)=>`
      if (${K(t.shape,l,t.rank)} != 1) {
        ${t.indicesSet(e,l,K(s,l+i,a))}
      } else {
        ${t.indicesSet(e,l,0)}
      }`).join("")}
`},Ha=(e,t,r,a,s=!1,i)=>{let o=e[0].dims,l=e[1].dims,d=o[o.length-2],p=l[l.length-1],g=o[o.length-1],f=xe(p),y=xe(g),_=xe(d),w=O.size(r)/f/_,b=e.length>2,k=a?a.slice(0,-2):r.slice(0,-2),v=[O.size(k),d,p],$=[{type:12,data:w},{type:12,data:d},{type:12,data:p},{type:12,data:g}];Et(t,$),$.push(...Q(k,o,l)),b&&$.push(...Q(e[2].dims)),$.push(...Q(v));let T=S=>{let C=Ua("batch_dims",e[0].dataType,k.length),E=M("a",e[0].dataType,o.length,y),z=M("b",e[1].dataType,l.length,f),B=j("output",e[0].dataType,v.length,f),W=Ie(B.type.tensor),G=It(t,B.type.value,W),ee=[E,z],ae="";if(b){let J=s?f:1;ee.push(M("bias",e[2].dataType,e[2].dims.length,J)),ae=`${s?`value += bias[col / ${J}];`:`value += ${B.type.value}(bias[row + i]);`}`}let Z=[{name:"output_size",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"}];zt(t,Z);let te=()=>{let J=`var a_data: ${E.type.value};`;for(let L=0;L<y;L++)J+=`
              let b_data${L} = b[(b_offset + (k + ${L}) * uniforms.N + col) / ${f}];`;for(let L=0;L<_;L++){J+=`a_data = a[(a_offset + (row + ${L}) * uniforms.K + k) / ${y}];`;for(let de=0;de<y;de++)J+=`
            values[${L}] = fma(${z.type.value}(a_data${y===1?"":`[${de}]`}), b_data${de}, values[${L}]);
`}return J};return`
  ${S.registerUniforms(Z).registerInternalVariables(C).declareVariables(...ee,B)}
  ${S.mainStart()}
    ${S.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let col = (global_idx % (uniforms.N / ${f})) * ${f};
    var index1 = global_idx / (uniforms.N / ${f});
    let stride1 = uniforms.M / ${_};
    let row = (index1 % stride1) * ${_};
    let batch = index1 / stride1;

    ${r.length===2?"":`let batch_indices = ${C.offsetToIndices("batch")};`}

    var a_indices: ${E.type.indices};
    ${or("a_indices",E,E.rank-2,C.rank,"batch_indices")}
    ${E.indicesSet("a_indices",E.rank-2,0)}
    ${E.indicesSet("a_indices",E.rank-1,0)}
    let a_offset = ${E.indicesToOffset("a_indices")};

    var b_indices: ${z.type.indices};
    ${or("b_indices",z,z.rank-2,C.rank,"batch_indices")}
    ${z.indicesSet("b_indices",z.rank-2,0)}
    ${z.indicesSet("b_indices",z.rank-1,0)}
    let b_offset = ${z.indicesToOffset("b_indices")};
    var values: array<${B.type.value}, ${_}>;
    for (var k: u32 = 0u; k < uniforms.K; k = k + ${y}) {
      ${te()}
    }
    for (var i = 0u; i < ${_}u; i++) {
      var value = values[i];
      ${ae}
      ${G}
      let cur_indices = ${B.type.indices}(batch, row + i, col);
      let offset = ${B.indicesToOffset("cur_indices")};
      ${B.setByOffset(`offset / ${f}`,"value")};
    }
  }
  `};return{name:"MatMulNaive",shaderCache:{hint:`${t.activation};${f};${y};${_};${s}`,inputDependencies:b?["rank","rank","rank"]:["rank","rank"]},getRunData:()=>({outputs:[{dims:i?i(r):r,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(w/64)},programUniforms:$}),getShaderSource:T}}}),Iu,Eu,_a,Oi,zu,wa,Au,Lr,ja=q(()=>{Y(),oe(),ue(),Ot(),Fa(),Ga(),Iu=(e,t)=>e?`
        mm_Asub[inputRow][inputCol] = mm_readA(batch,
          kStart + inputRow,
          globalRowStart / innerElementSize + inputCol${t?", batchIndices":""});
        `:`
        mm_Asub[inputRow][inputCol] = mm_readA(batch,
          globalRow + innerRow,
          kStart / innerElementSize + inputCol${t?", batchIndices":""});
        `,Eu=(e,t)=>e?`
        let ACached0 = mm_Asub[k * innerElementSize][localRow];
        let ACached1 = mm_Asub[k * innerElementSize + 1][localRow];
        let ACached2 = mm_Asub[k * innerElementSize + 2][localRow];
        ${t===3?"":"let ACached3 = mm_Asub[k * innerElementSize + 3][localRow];"}
        for (var i = 0; i < rowPerThread; i = i + 1) {
          acc[i] = BCached0 * ACached0[i] + acc[i];
          acc[i] = BCached1 * ACached1[i] + acc[i];
          acc[i] = BCached2 * ACached2[i] + acc[i];
          ${t===3?"":"acc[i] = BCached3 * ACached3[i] + acc[i];"}
        }`:`
        for (var i = 0; i < rowPerThread; i = i + 1) {
          let ACached = mm_Asub[tileRow + i][k];
          acc[i] = BCached0 * ACached.x + acc[i];
          acc[i] = BCached1 * ACached.y + acc[i];
          acc[i] = BCached2 * ACached.z + acc[i];
          ${t===3?"":"acc[i] = BCached3 * ACached.w + acc[i];"}
        }`,_a=(e,t,r="f32",a,s=!1,i=32,o=!1,l=32)=>{let d=t[1]*e[1],p=t[0]*e[0],g=s?d:i,f=s?i:d,y=g/t[0],_=i/t[1];if(!((s&&y===4&&e[1]===4||!s&&(y===3||y===4))&&g%t[0]===0&&i%t[1]===0&&e[0]===4))throw new Error(`If transposeA ${s} is true, innerElementSize ${y} and workPerThread[1] ${e[1]} must be 4.
      Otherwise, innerElementSize ${y} must be 3 or 4.
  tileAWidth ${g} must be divisible by workgroupSize[0]${t[0]}. tileInner ${i} must be divisible by workgroupSize[1] ${t[1]}. colPerThread ${e[0]} must be 4.`);return`
var<workgroup> mm_Asub: array<array<vec${y}<${r}>, ${g/y}>, ${f}>;
var<workgroup> mm_Bsub: array<array<vec4<${r}>, ${p/e[0]}>, ${i}>;

const rowPerThread = ${e[1]};
const colPerThread = ${e[0]};
const innerElementSize = ${y};
const tileInner = ${i};

@compute @workgroup_size(${t[0]}, ${t[1]}, ${t[2]})
fn main(@builtin(local_invocation_id) localId : vec3<u32>,
        @builtin(global_invocation_id) globalId : vec3<u32>,
        @builtin(workgroup_id) workgroupId : vec3<u32>) {
  let localRow = i32(localId.y);
  let tileRow = localRow * rowPerThread;
  let tileCol = i32(localId.x);

  let globalRow =i32(globalId.y) * rowPerThread;
  let globalCol = i32(globalId.x);
  let batch = ${o?"0":"i32(globalId.z)"};
  ${a?`let batchIndices = ${a.offsetToIndices("u32(batch)")};`:""}
  let globalRowStart = i32(workgroupId.y) * ${d};

  let num_tiles = ${o?`${Math.ceil(l/i)}`:"(uniforms.dim_inner - 1) / tileInner + 1"};
  var kStart = ${o?`i32(globalId.z) * ${l}`:"0"};

  var acc: array<vec4<${r}>, rowPerThread>;

  // Loop over shared dimension.
  let tileRowB = localRow * ${_};
  for (var t = 0; t < num_tiles; t = t + 1) {
      // Load one tile of A into local memory.
      for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
          let inputRow = tileRow + innerRow;
          let inputCol = tileCol;
          ${Iu(s,a)}
      }

      // Load one tile of B into local memory.
      for (var innerRow = 0; innerRow < ${_}; innerRow = innerRow + 1) {
          let inputRow = tileRowB + innerRow;
          let inputCol = tileCol;
          mm_Bsub[inputRow][inputCol] = mm_readB(batch, kStart + inputRow, globalCol${a?", batchIndices":""});
      }
      kStart = kStart + tileInner;
      workgroupBarrier();

      // Compute acc values for a single thread.
      for (var k = 0; k < tileInner / innerElementSize; k = k + 1) {
          let BCached0 = mm_Bsub[k * innerElementSize][tileCol];
          let BCached1 = mm_Bsub[k * innerElementSize + 1][tileCol];
          let BCached2 = mm_Bsub[k * innerElementSize + 2][tileCol];
          ${y===3?"":"let BCached3 = mm_Bsub[k * innerElementSize + 3][tileCol];"}

          ${Eu(s,y)}
      }

      workgroupBarrier();
  }

  for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
      mm_write(batch, globalRow + innerRow, globalCol, acc[innerRow]);
  }
}`},Oi=(e,t)=>e?`
            mm_Asub[inputRow][inputCol] = mm_readA(batch,
              kStart + inputRow,
              globalRowStart + inputCol${t?", batchIndices":""});
            `:`
            mm_Asub[inputRow][inputCol] = mm_readA(batch,
              globalRowStart + inputRow,
              kStart + inputCol${t?", batchIndices":""});
            `,zu=e=>e?"let ACached = mm_Asub[k][tileRow + innerRow];":"let ACached = mm_Asub[tileRow + innerRow][k];",wa=(e,t,r="f32",a,s=!1,i=32,o=!1,l=32,d=!1)=>{let p=e[1]*t[1],g=e[0]*t[0],f=s?p:i,y=s?i:p;if(!(y%t[1]===0&&f%t[0]===0&&i%t[1]===0))throw new Error(`tileAHight ${y} must be divisible by workgroupSize[1]${t[1]}, tileAWidth ${f} must be divisible by workgroupSize[0]${t[0]}, tileInner ${i} must be divisible by workgroupSize[1]${t[1]}`);let _=y/t[1],w=f/t[0],b=i/t[1],k=d?`
    let localRow = i32(localId.y);
    let localCol = i32(localId.x);
    let globalRowStart = i32(workgroupId.y) * ${p};
    let globalColStart = i32(workgroupId.x) * ${g};

    // Loop over shared dimension.
    for (var t = 0; t < num_tiles; t = t + 1) {
      // Load one tile of A into local memory.
      for (var inputRow = localRow; inputRow < ${y}; inputRow = inputRow + ${t[1]}) {
        for (var inputCol = localCol; inputCol < ${f}; inputCol = inputCol + ${t[0]}) {
          ${Oi(s,a)}
        }
      }
      // Load one tile of B into local memory.
      for (var inputRow = localRow; inputRow < ${i}; inputRow = inputRow + ${t[1]}) {
            for (var inputCol = localCol; inputCol < ${g}; inputCol = inputCol + ${t[0]}) {
          mm_Bsub[inputRow][inputCol] = mm_readB(batch,
            kStart + inputRow,
            globalColStart + inputCol${a?", batchIndices":""});
        }
      }
      kStart = kStart + tileInner;
      workgroupBarrier();

      // Compute acc values for a single thread.
      var BCached : array<${r}, colPerThread>;
      for (var k = 0; k < tileInner; k = k + 1) {
        for (var inner = 0; inner < colPerThread; inner = inner + 1) {
          BCached[inner] = mm_Bsub[k][localCol + inner * ${t[0]}];
        }
        for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
          let ACached = ${s?`mm_Asub[k][localRow + innerRow * ${t[1]}];`:`mm_Asub[localRow + innerRow * ${t[1]}][k];`}
          for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
            acc[innerRow][innerCol] = acc[innerRow][innerCol] +
                ACached * BCached[innerCol];
          }
        }
      }
      workgroupBarrier();
    }
    for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
      let gRow = globalRowStart + localRow + innerRow * ${t[1]};
      for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
        let gCol = globalColStart + localCol + innerCol * ${t[0]};
        mm_write(batch, gRow, gCol, acc[innerRow][innerCol]);
      }
    }
    `:`
let tileRow = i32(localId.y) * rowPerThread;
let tileCol = i32(localId.x) * colPerThread;

let globalRow = i32(globalId.y) * rowPerThread;
let globalCol = i32(globalId.x) * colPerThread;
let globalRowStart = i32(workgroupId.y) * ${p};

let tileRowA = i32(localId.y) * ${_};
let tileColA = i32(localId.x) * ${w};
let tileRowB = i32(localId.y) * ${b};
// Loop over shared dimension.
for (var t = 0; t < num_tiles; t = t + 1) {
  // Load one tile of A into local memory.
  for (var innerRow = 0; innerRow < ${_}; innerRow = innerRow + 1) {
    for (var innerCol = 0; innerCol < ${w}; innerCol = innerCol + 1) {
      let inputRow = tileRowA + innerRow;
      let inputCol = tileColA + innerCol;
      ${Oi(s,a)}
    }
  }

  // Load one tile of B into local memory.
  for (var innerRow = 0; innerRow < ${b}; innerRow = innerRow + 1) {
    for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
      let inputRow = tileRowB + innerRow;
      let inputCol = tileCol + innerCol;
      mm_Bsub[inputRow][inputCol] = mm_readB(batch,
        kStart + inputRow,
        globalCol + innerCol${a?", batchIndices":""});
    }
  }
  kStart = kStart + tileInner;
  workgroupBarrier();

  // Compute acc values for a single thread.
  var BCached : array<${r}, colPerThread>;
  for (var k = 0; k < tileInner; k = k + 1) {
    for (var inner = 0; inner < colPerThread; inner = inner + 1) {
      BCached[inner] = mm_Bsub[k][tileCol + inner];
    }

    for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
      ${zu(s)}
      for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
        acc[innerRow][innerCol] = acc[innerRow][innerCol] + ACached * BCached[innerCol];
      }
    }
  }

  workgroupBarrier();
}

for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
  for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
    mm_write(batch, globalRow + innerRow, globalCol + innerCol,
        acc[innerRow][innerCol]);
  }
}
`;return`
  var<workgroup> mm_Asub : array<array<${r}, ${f}>, ${y}>;
  var<workgroup> mm_Bsub : array<array<${r}, ${g}>, ${i}>;
  const rowPerThread = ${e[1]};
  const colPerThread = ${e[0]};
  const tileInner = ${i};

@compute @workgroup_size(${t[0]}, ${t[1]}, ${t[2]})
fn main(@builtin(local_invocation_id) localId : vec3<u32>,
        @builtin(global_invocation_id) globalId : vec3<u32>,
        @builtin(workgroup_id) workgroupId : vec3<u32>) {
    let batch = ${o?"0":"i32(globalId.z)"};
    ${a?`let batchIndices = ${a.offsetToIndices("u32(batch)")};`:""}
    let num_tiles = ${o?`${Math.ceil(l/i)}`:"(uniforms.dim_inner - 1) / tileInner + 1"};
    var kStart = ${o?`i32(globalId.z) * ${l}`:"0"};

    var acc : array<array<${r}, colPerThread>, rowPerThread>;
    ${k}
  }
`},Au=(e,t,r,a,s=!1)=>{let[i,o,l,d]=a,p=Ie(a[0].type.tensor);return`
    fn mm_readA(batch: i32, row: i32, colIn: i32, batchIndices: ${i.type.indices}) -> ${Ee(e,p)} {
      var value = ${Ee(e,p)}(0.0);
      let col = colIn * ${e};
      if(row < uniforms.dim_a_outer && col < uniforms.dim_inner)
      {
        var aIndices: ${o.type.indices};
        ${or("aIndices",o,o.rank-2,i.rank,"batchIndices")}
        ${o.indicesSet("aIndices",o.rank-2,"u32(row)")}
        ${o.indicesSet("aIndices",o.rank-1,"u32(colIn)")}
        value = ${o.getByIndices("aIndices")};
      }
      return value;
    }

    fn mm_readB(batch: i32, row: i32, colIn: i32, batchIndices: ${i.type.indices}) -> ${Ee(e,p)} {
      var value = ${Ee(e,p)}(0.0);
      let col = colIn * ${e};
      if(row < uniforms.dim_inner && col < uniforms.dim_b_outer)
      {
        var bIndices: ${l.type.indices};
        ${or("bIndices",l,l.rank-2,i.rank,"batchIndices")}
        ${l.indicesSet("bIndices",l.rank-2,"u32(row)")}
        ${l.indicesSet("bIndices",l.rank-1,"u32(colIn)")}
        value = ${l.getByIndices("bIndices")};
      }
      return value;
    }

    fn mm_write(batch: i32, row: i32, colIn: i32, valueIn: ${Ee(e,p)}) {
      let col = colIn * ${e};
      if (row < uniforms.dim_a_outer && col < uniforms.dim_b_outer) {
        var value = valueIn;
        let coords = vec3<i32>(batch, row, colIn);
        ${t?`value = value + ${s?"bias[colIn]":`${Ee(e,p)}(bias[row])`};`:""}
        ${r}
        ${d.setByIndices("vec3<u32>(coords)","value")}
      }
    }
    `},Lr=(e,t,r,a,s=!1,i)=>{let o=e[0].dims,l=e[1].dims,d=o.slice(0,-2),p=l.slice(0,-2),g=a?a.slice(0,-2):r.slice(0,-2),f=O.size(g),y=o[o.length-2],_=o[o.length-1],w=l[l.length-1],b=_%4===0&&w%4===0,k=y<=8?[4,1,1]:[4,4,1],v=[8,8,1],$=[Math.ceil(w/v[0]/k[0]),Math.ceil(y/v[1]/k[1]),Math.ceil(f/v[2]/k[2])],T=b?4:1,S=[...d,y,_/T],C=S.length,E=[...p,_,w/T],z=E.length,B=[f,y,w/T],W=[{type:6,data:y},{type:6,data:w},{type:6,data:_}];Et(t,W),W.push(...Q(g,S,E));let G=["rank","rank"],ee=e.length>2;ee&&(W.push(...Q(e[2].dims)),G.push("rank")),W.push(...Q(B));let ae=Z=>{let te=g.length,J=Ua("batchDims",e[0].dataType,te,1),L=Ie(e[0].dataType),de=M("a",e[0].dataType,C,T),me=M("b",e[1].dataType,z,T),F=j("result",e[0].dataType,B.length,T),ge=[de,me];if(ee){let D=s?T:1;ge.push(M("bias",e[2].dataType,e[2].dims.length,D))}let N=[{name:"dim_a_outer",type:"i32"},{name:"dim_b_outer",type:"i32"},{name:"dim_inner",type:"i32"}];zt(t,N);let V=Ie(F.type.tensor),le=It(t,F.type.value,V),be=Au(T,ee,le,[J,de,me,F],s);return`
  ${Z.registerUniforms(N).registerInternalVariables(J).declareVariables(...ge,F)}
  ${be}
  ${b?_a(k,v,L,J):wa(k,v,L,J)}
                   `};return{name:"MatMul",shaderCache:{hint:`${k};${t.activation};${b};${s}`,inputDependencies:G},getRunData:()=>({outputs:[{dims:i?i(r):r,dataType:e[0].dataType}],dispatchGroup:{x:$[0],y:$[1],z:$[2]},programUniforms:W}),getShaderSource:ae}}}),Ou,jc,vy=q(()=>{Y(),st(),ue(),Ot(),Ga(),$y(),ja(),Ou=(e,t,r,a,s=!1,i,o=4,l=4,d=4,p="f32")=>{let g=W=>{switch(W){case 1:return"resData = x[xIndex];";case 3:return`resData = vec3<${p}>(x[xIndex], x[xIndex + 1], x[xIndex + 2]);`;case 4:return"resData = x[xIndex / 4];";default:throw new Error(`innerElementSize ${W} is not supported.`)}},f=W=>{switch(W){case 1:return"return w[row * i32(uniforms.w_shape[3]) + colIn];";case 4:return"return w[row * i32(uniforms.w_shape[3]) / 4 + colIn];";default:throw new Error(`innerElementSize ${W} is not supported.`)}},y=e?`
    let coord = vec4<i32>(batch, xRow, xCol, xCh);
    `:`
    let coord = vec4<i32>(batch, xCh, xRow, xCol);
    `,_=e?`
    let coords = vec4<i32>(
      batch,
      row / outWidth,
      row % outWidth,
      col);
    `:`
    let coords = vec4<i32>(
      batch,
      row,
      col / outWidth,
      col % outWidth);
    `,w=e?"i32(uniforms.x_shape[1])":"i32(uniforms.x_shape[2])",b=e?"i32(uniforms.x_shape[2])":"i32(uniforms.x_shape[3])",k=e?"row":"col",v=e?"col":"row",$=`
    let inChannels = i32(uniforms.w_shape[2]);
    let outWidth = ${e?"i32(uniforms.result_shape[2])":"i32(uniforms.result_shape[3])"};
    let outRow = ${k} / outWidth;
    let outCol = ${k} % outWidth;

    let WRow = ${v} / (i32(uniforms.w_shape[1]) * inChannels);
    let WCol = ${v} / inChannels % i32(uniforms.w_shape[1]);
    let xRow = outRow * uniforms.stride[0] + uniforms.dilation[0] * WRow - uniforms.pad[0];
    let xCol = outCol * uniforms.stride[1] + uniforms.dilation[1] * WCol - uniforms.pad[1];
    let xCh = ${v} % inChannels;
    var resData = ${Ee(o,p)}(0.0);
    // The bounds checking is always needed since we use it to pad zero for
    // the 'same' padding type.
    if (xRow >= 0 && xRow < ${w} && xCol >= 0 && xCol < ${b}) {
      ${y}
      let xIndex = getIndexFromCoords4D(coord, vec4<i32>(uniforms.x_shape));
      ${g(o)}
    }
    return resData;`,T=e?t&&a?`
    let col = colIn * ${o};
    ${$}`:`
    let col = colIn * ${o};
    if (row < uniforms.dim_a_outer && col < uniforms.dim_inner) {
      ${$}
    }
    return ${Ee(o,p)}(0.0);`:a&&r?`
    let col = colIn * ${o};
    ${$}`:`
    let col = colIn * ${o};
    if (row < uniforms.dim_inner && col < uniforms.dim_b_outer) {
      ${$}
    }
    return ${Ee(o,p)}(0.0);`,S=e?a&&r?f(l):`
    let col = colIn * ${l};
    if (row < uniforms.dim_inner && col < uniforms.dim_b_outer) {
      ${f(l)}
    }
    return ${Ee(l,p)}(0.0);`:`
    let col = colIn * ${l};
    if (row < uniforms.dim_inner && col < uniforms.dim_a_outer) {
      ${f(l)}
    }
    return ${Ee(l,p)}(0.0);`,C=Ee(d,p),E=Ee(e?o:l,p),z=Ee(e?l:o,p),B=It(i,C,p);return`
    fn mm_readA(batch: i32, row : i32, colIn : i32) -> ${E} {
      ${e?T:S}
    }

    fn mm_readB(batch: i32, row : i32, colIn : i32) -> ${z} {
      ${e?S:T}
    }

    fn mm_write(batch: i32, row : i32, colIn : i32, valueIn : ${C}) {
      let col = colIn * ${d};
      if (row < uniforms.dim_a_outer && col < uniforms.dim_b_outer)
      {
      var value = valueIn;
      let outWidth = ${e?"i32(uniforms.result_shape[2])":"i32(uniforms.result_shape[3])"};
      ${_}
      ${Hc(s)}
      ${B}
      setOutputAtCoords(coords[0], coords[1], coords[2], coords[3], value);
      }
    }`},jc=(e,t,r,a,s,i,o,l,d)=>{let p=t.format==="NHWC",g=p?e[0].dims[3]:e[0].dims[1],f=r[0],y=p?r[2]:r[3],_=p?r[1]:r[2],w=p?r[3]:r[1],b=p&&(g%4===0||g%3===0)&&w%4===0,k=p?w:y*_,v=p?y*_:w,$=[8,8,1],T=a<=8?[4,1,1]:[4,4,1],S=[Math.ceil(k/$[0]/T[0]),Math.ceil(v/$[1]/T[1]),Math.ceil(f/$[2]/T[2])];pe("verbose",()=>`[conv2d_mm_webgpu] dispatch = ${S}`);let C=b?p&&g%4!==0?3:4:1,E=$[1]*T[1],z=$[0]*T[0],B=Math.max($[0]*C,$[1]),W=a%E===0,G=s%z===0,ee=i%B===0,ae=b?[C,4,4]:[1,1,1],Z=[{type:6,data:a},{type:6,data:s},{type:6,data:i},{type:6,data:[t.pads[0],t.pads[1]]},{type:6,data:t.strides},{type:6,data:t.dilations}];Et(t,Z),Z.push(...Q(e[0].dims,e[1].dims));let te=["rank","rank"];o&&(Z.push(...Q(e[2].dims)),te.push("rank")),Z.push(...Q(r));let J=L=>{let de=[{name:"dim_a_outer",type:"i32"},{name:"dim_b_outer",type:"i32"},{name:"dim_inner",type:"i32"},{name:"pad",type:"i32",length:2},{name:"stride",type:"i32",length:2},{name:"dilation",type:"i32",length:2}];zt(t,de);let me=b?4:1,F=Ie(e[0].dataType),ge=`
      fn setOutputAtIndex(flatIndex : i32, value : ${b?`vec4<${F}>`:F}) {
        result[flatIndex] = ${b?`vec4<${F}>`:F}(value);
      }
      fn setOutputAtCoords(d0 : i32, d1 : i32, d2 : i32, d3 : i32, value : ${b?`vec4<${F}>`:F}) {
        let flatIndex = getOutputIndexFromCoords(vec4<i32>(d0, d1, d2, d3));
        setOutputAtIndex(flatIndex ${b?"/ 4":""}, value);
      }`,N=M("x",e[0].dataType,e[0].dims.length,C===3?1:C),V=M("w",e[1].dataType,e[1].dims.length,me),le=[N,V],be=j("result",e[0].dataType,r.length,me);if(o){let D=M("bias",e[2].dataType,e[2].dims.length,me);le.push(D),ge+=`
        fn getBiasByOutputCoords(coords : vec4<i32>) -> ${b?`vec4<${F}>`:F} {
          return bias[coords.${p?"w":"y"}${b?"/ 4":""}];
        }`}return`
        ${Fc("uniforms.result_strides")}
        //struct Uniforms { xShape : vec4<i32>, wShape : vec4<i32>, outShape : vec4<i32>,
        //  outShapeStrides: vec3<i32>, filterDims : vec2<i32>, pad : vec2<i32>, stride : vec2<i32>,
        //  dilation : vec2<i32>, dimAOuter : i32, dimBOuter : i32, dimInner : i32 };
        ${L.registerUniforms(de).declareVariables(...le,be)}
        ${ge}
        ${Ou(p,W,G,ee,o,t,ae[0],ae[1],ae[2],F)}
        ${b?_a(T,$,F,void 0,!p,B):wa(T,$,F,void 0,!p,B,!1,void 0,l)}`};return{name:"Conv2DMatMul",shaderCache:{hint:`${t.cacheKey};${C};${b};${W};${G};${ee};${E};${z};${B}`,inputDependencies:te},getRunData:()=>({outputs:[{dims:d?d(r):r,dataType:e[0].dataType}],dispatchGroup:{x:S[0],y:S[1],z:S[2]},programUniforms:Z}),getShaderSource:J}}}),Ru,Ri,Xt,Bu,Bi,Mu,Kc,Qc,xy=q(()=>{Y(),st(),oe(),ue(),Ot(),Ga(),Ru=e=>{let t=1;for(let r=0;r<e.length;r++)t*=e[r];return t},Ri=e=>typeof e=="number"?[e,e,e]:e,Xt=(e,t)=>t<=1?e:e+(e-1)*(t-1),Bu=(e,t,r,a=1)=>{let s=Xt(t,a);return Math.floor((e[0]*(r-1)-r+s)/2)},Bi=(e,t,r,a,s)=>{s==null&&(s=Bu(e,t[0],a[0]));let i=[0,0,0,r];for(let o=0;o<3;o++)e[o]+2*s>=t[o]&&(i[o]=Math.trunc((e[o]-t[o]+2*s)/a[o]+1));return i},Mu=(e,t,r,a,s,i,o,l,d,p)=>{let g,f,y,_;if(e==="VALID"&&(e=0),typeof e=="number"){g={top:e,bottom:e,left:e,right:e,front:e,back:e};let w=Bi([t,r,a,1],[l,d,p],1,[s,i,o],e);f=w[0],y=w[1],_=w[2]}else if(Array.isArray(e)){if(!e.every((b,k,v)=>b===v[0]))throw Error(`Unsupported padding parameter: ${e}`);g={top:e[0],bottom:e[1],left:e[2],right:e[3],front:e[4],back:e[5]};let w=Bi([t,r,a,1],[l,d,p],1,[s,i,o],e[0]);f=w[0],y=w[1],_=w[2]}else if(e==="SAME_UPPER"){f=Math.ceil(t/s),y=Math.ceil(r/i),_=Math.ceil(a/o);let w=(f-1)*s+l-t,b=(y-1)*i+d-r,k=(_-1)*o+p-a,v=Math.floor(w/2),$=w-v,T=Math.floor(b/2),S=b-T,C=Math.floor(k/2),E=k-C;g={top:T,bottom:S,left:C,right:E,front:v,back:$}}else throw Error(`Unknown padding parameter: ${e}`);return{padInfo:g,outDepth:f,outHeight:y,outWidth:_}},Kc=(e,t,r,a,s,i=!1,o="channelsLast")=>{let l,d,p,g,f;if(o==="channelsLast")[l,d,p,g,f]=e;else if(o==="channelsFirst")[l,f,d,p,g]=e;else throw new Error(`Unknown dataFormat ${o}`);let[y,,_,w,b]=t,[k,v,$]=Ri(r),[T,S,C]=Ri(a),E=Xt(_,T),z=Xt(w,S),B=Xt(b,C),{padInfo:W,outDepth:G,outHeight:ee,outWidth:ae}=Mu(s,d,p,g,k,v,$,E,z,B),Z=i?y*f:y,te=[0,0,0,0,0];return o==="channelsFirst"?te=[l,Z,G,ee,ae]:o==="channelsLast"&&(te=[l,G,ee,ae,Z]),{batchSize:l,dataFormat:o,inDepth:d,inHeight:p,inWidth:g,inChannels:f,outDepth:G,outHeight:ee,outWidth:ae,outChannels:Z,padInfo:W,strideDepth:k,strideHeight:v,strideWidth:$,filterDepth:_,filterHeight:w,filterWidth:b,effectiveFilterDepth:E,effectiveFilterHeight:z,effectiveFilterWidth:B,dilationDepth:T,dilationHeight:S,dilationWidth:C,inShape:e,outShape:te,filterShape:t}},Qc=(e,t,r,a,s,i)=>{let o=i==="channelsLast";o?e[0].dims[3]:e[0].dims[1];let l=[64,1,1],d={x:r.map((k,v)=>v)},p=[Math.ceil(Ru(d.x.map(k=>r[k]))/l[0]),1,1];pe("verbose",()=>`[conv3d_naive_webgpu] dispatch = ${p}`);let g=1,f=O.size(r),y=[{type:12,data:f},{type:12,data:a},{type:12,data:s},{type:12,data:t.strides},{type:12,data:t.dilations}];Et(t,y),y.push(...Q(e[0].dims,e[1].dims));let _=["rank","rank"],w=e.length===3;w&&(y.push(...Q(e[2].dims)),_.push("rank")),y.push(...Q(r));let b=k=>{let v=[{name:"output_size",type:"u32"},{name:"filter_dims",type:"u32",length:a.length},{name:"pads",type:"u32",length:s.length},{name:"strides",type:"u32",length:t.strides.length},{name:"dilations",type:"u32",length:t.dilations.length}];zt(t,v);let $=1,T=Ie(e[0].dataType),S=M("x",e[0].dataType,e[0].dims.length,g),C=M("W",e[1].dataType,e[1].dims.length,$),E=[S,C],z=j("result",e[0].dataType,r.length,$),B="";if(w){let ee=M("bias",e[2].dataType,e[2].dims.length,$);E.push(ee),B+=`
        fn getBiasByOutputCoords(coords : array<u32, 5>) -> ${T} {
          return bias[${o?K("coords",4,5):K("coords",1,5)}];
        }`}let W=Ee(g,T),G=It(t,W,T);return`
            ${B}
            fn getX(d0 : u32, d1 : u32, d2 : u32, d3 : u32, d4 : u32) -> f32 {
              let aIndices = array<u32, 5>(d0, d1, d2, d3, d4);
              return ${S.getByIndices("aIndices")};
            }
            fn getW(d0 : u32, d1 : u32, d2 : u32, d3 : u32, d4 : u32) -> f32 {
              let aIndices = array<u32, 5>(d0, d1, d2, d3, d4);
              return ${C.getByIndices("aIndices")};
            }
          ${k.registerUniforms(v).declareVariables(...E,z)}
          ${k.mainStart()}
          ${k.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
              let coords = ${z.offsetToIndices("global_idx")};
              let batch = ${K("coords",0,S.rank)};
              let d2 = ${o?K("coords",S.rank-1,S.rank):K("coords",1,S.rank)};
              let xFRCCorner = vec3<u32>(${o?K("coords",1,S.rank):K("coords",2,S.rank)},
              ${o?K("coords",2,S.rank):K("coords",3,S.rank)},
              ${o?K("coords",3,S.rank):K("coords",4,S.rank)}) * uniforms.strides - uniforms.pads;
              let xFCorner = xFRCCorner.x;
              let xRCorner = xFRCCorner.y;
              let xCCorner = xFRCCorner.z;
              let xShapeY = ${o?K("uniforms.x_shape",1,S.rank):K("uniforms.x_shape",2,S.rank)};
              let xShapeZ = ${o?K("uniforms.x_shape",2,S.rank):K("uniforms.x_shape",3,S.rank)};
              let xShapeW = ${o?K("uniforms.x_shape",3,S.rank):K("uniforms.x_shape",4,S.rank)};
              let xShapeU = ${o?K("uniforms.x_shape",4,S.rank):K("uniforms.x_shape",1,S.rank)};
              let inputDepthNearestVec4 = (xShapeU / 4) * 4;
              let inputDepthVec4Remainder = xShapeU % 4;

              var value = 0.0;
              for (var wF = 0u; wF < uniforms.filter_dims[0]; wF++) {
                let xF = xFCorner + wF * uniforms.dilations[0];
                if (xF < 0 || xF >= xShapeY) {
                  continue;
                }

                for (var wR = 0u; wR < uniforms.filter_dims[1]; wR++) {
                  let xR = xRCorner + wR * uniforms.dilations[1];
                  if (xR < 0 || xR >= xShapeZ) {
                    continue;
                  }

                  for (var wC = 0u; wC < uniforms.filter_dims[2]; wC++) {
                    let xC = xCCorner + wC * uniforms.dilations[2];
                    if (xC < 0 || xC >= xShapeW) {
                      continue;
                    }

                    for (var d1 = 0u; d1 < inputDepthNearestVec4; d1 += 4) {
                      ${o?`let xValues = vec4<f32>(
                               getX(batch, xF, xR, xC, d1),
                               getX(batch, xF, xR, xC, d1 + 1),
                               getX(batch, xF, xR, xC, d1 + 2),
                               getX(batch, xF, xR, xC, d1 + 3));
                            `:`let xValues = vec4<f32>(
                               getX(batch, d1, xF, xR, xC),
                               getX(batch, d1 + 1, xF, xR, xC),
                               getX(batch, d1 + 2, xF, xR, xC),
                               getX(batch, d1 + 3, xF, xR, xC));
                            `}
                            let wValues = vec4<f32>(
                              getW(d2, d1, wF, wR, wC),
                              getW(d2, d1 + 1, wF, wR, wC),
                              getW(d2, d1 + 2, wF, wR, wC),
                              getW(d2, d1 + 3, wF, wR, wC));
                      value += dot(xValues, wValues);
                    }
                    if (inputDepthVec4Remainder == 1) {
                        ${o?`value += getX(batch, xF, xR, xC, inputDepthNearestVec4)
                          * getW(d2, inputDepthNearestVec4, wF, wR, wC);`:`value += getX(batch, inputDepthNearestVec4, xF, xR, xC)
                          * getW(d2, inputDepthNearestVec4, wF, wR, wC);`}
                    } else if (inputDepthVec4Remainder == 2) {
                      ${o?`let xValues = vec2<f32>(
                        getX(batch, xF, xR, xC, inputDepthNearestVec4),
                        getX(batch, xF, xR, xC, inputDepthNearestVec4 + 1));
                      `:`let xValues = vec2<f32>(
                        getX(batch, inputDepthNearestVec4, xF, xR, xC),
                        getX(batch, inputDepthNearestVec4 + 1, xF, xR, xC));
                    `}
                    let wValues = vec2<f32>(
                      getW(d2, inputDepthNearestVec4, wF, wR, wC),
                      getW(d2, inputDepthNearestVec4 + 1, wF, wR, wC));
                      value += dot(xValues, wValues);
                    } else if (inputDepthVec4Remainder == 3) {
                      ${o?`let xValues = vec3<f32>(
                        getX(batch, xF, xR, xC, inputDepthNearestVec4),
                        getX(batch, xF, xR, xC, inputDepthNearestVec4 + 1),
                        getX(batch, xF, xR, xC, inputDepthNearestVec4 + 2));
                      `:`let xValues = vec3<f32>(
                        getX(batch, inputDepthNearestVec4, xF, xR, xC),
                        getX(batch, inputDepthNearestVec4 + 1, xF, xR, xC),
                        getX(batch, inputDepthNearestVec4 + 2, xF, xR, xC));
                    `}
                    let wValues = vec3<f32>(
                      getW(d2, inputDepthNearestVec4, wF, wR, wC),
                      getW(d2, inputDepthNearestVec4 + 1, wF, wR, wC),
                      getW(d2, inputDepthNearestVec4 + 2, wF, wR, wC));
                      value += dot(xValues, wValues);
                    }
                  }
                }
              }
              ${w?"value = value + getBiasByOutputCoords(coords)":""};
              ${G}
              result[global_idx] = f32(value);
          }`};return{name:"Conv3DNaive",shaderCache:{hint:`${t.cacheKey};${o};${g};${w}`,inputDependencies:_},getRunData:()=>({outputs:[{dims:r,dataType:e[0].dataType}],dispatchGroup:{x:p[0],y:p[1],z:p[2]},programUniforms:y}),getShaderSource:b}}}),Zc,Xc,ky=q(()=>{Y(),oe(),ue(),Ot(),Zc=(e,t,r,a)=>{let s=e.length>2,i=s?"value += b[output_channel];":"",o=e[0].dims,l=e[1].dims,d=t.format==="NHWC",p=d?r[3]:r[1],g=p/t.group,f=d&&g>=4?xe(p):1,y=O.size(r)/f,_=[{type:12,data:y},{type:12,data:t.dilations},{type:12,data:[t.strides[0],t.strides[1]]},{type:12,data:[t.pads[0],t.pads[1]]},{type:12,data:g}];Et(t,_),_.push(...Q(o,[l[0],l[1],l[2],l[3]/f]));let w=s?["rank","rank","rank"]:["rank","rank"];_.push(...Q([r[0],r[1],r[2],r[3]/f]));let b=k=>{let v=j("output",e[0].dataType,r.length,f),$=Ie(v.type.tensor),T=It(t,v.type.value,$),S=M("x",e[0].dataType,o.length),C=M("w",e[1].dataType,l.length,f),E=[S,C];s&&E.push(M("b",e[2].dataType,e[2].dims,f));let z=[{name:"output_size",type:"u32"},{name:"dilations",type:"u32",length:t.dilations.length},{name:"strides",type:"u32",length:2},{name:"pads",type:"u32",length:2},{name:"output_channels_per_group",type:"u32"}];zt(t,z);let B=d?`
      for (var wHeight: u32 = 0u; wHeight < uniforms.w_shape[0]; wHeight++) {
        let xHeight = xRCCorner.x + wHeight * uniforms.dilations[0];

        if (xHeight < 0u || xHeight >= uniforms.x_shape[1]) {
          continue;
        }

        for (var wWidth: u32 = 0u; wWidth < uniforms.w_shape[1]; wWidth++) {
          let xWidth = xRCCorner.y + wWidth * uniforms.dilations[1];
          if (xWidth < 0u || xWidth >= uniforms.x_shape[2]) {
            continue;
          }

          for (var wInChannel: u32 = 0u; wInChannel < uniforms.w_shape[2]; wInChannel++) {
            let input_channel = in_channel_offset + wInChannel;
            let xVal = ${S.get("batch","xHeight","xWidth","input_channel")};
            let wVal = ${C.get("wHeight","wWidth","wInChannel","output_channel")};
            value += xVal * wVal;
          }
        }
      }
      `:`
      for (var wInChannel: u32 = 0u; wInChannel < uniforms.w_shape[1]; wInChannel++) {
        let input_channel = in_channel_offset + wInChannel;
        for (var wHeight: u32 = 0u; wHeight < uniforms.w_shape[2]; wHeight++) {
          let xHeight = xRCCorner.x + wHeight * uniforms.dilations[0];

          if (xHeight < 0u || xHeight >= uniforms.x_shape[2]) {
            continue;
          }

          for (var wWidth: u32 = 0u; wWidth < uniforms.w_shape[3]; wWidth++) {
            let xWidth = xRCCorner.y + wWidth * uniforms.dilations[1];
            if (xWidth < 0u || xWidth >= uniforms.x_shape[3]) {
              continue;
            }

            let xVal = ${S.get("batch","input_channel","xHeight","xWidth")};
            let wVal = ${C.get("output_channel","wInChannel","wHeight","wWidth")};
            value += xVal * wVal;
          }
        }
      }
      `;return`
  ${k.registerUniforms(z).declareVariables(...E,v)}

  ${k.mainStart()}
    ${k.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let outputIndices = ${v.offsetToIndices("global_idx")};
    let batch: u32 = outputIndices[0];
    let output_channel: u32 = outputIndices[${d?3:1}];
    let xRCCorner: vec2<u32> = vec2<u32>(outputIndices[${d?1:2}], outputIndices[${d?2:3}]) * uniforms.strides - uniforms.pads;
    let group_id: u32 = output_channel * ${f} / uniforms.output_channels_per_group;
    var in_channel_offset = group_id * uniforms.w_shape[${d?2:1}];

    var value: ${v.type.value} = ${v.type.value}(0);
    ${B}
    ${i}
    ${T}
    ${v.setByOffset("global_idx","value")}
  }`};return{name:"GroupedConv",shaderCache:{hint:`${t.cacheKey}_${f}`,inputDependencies:w},getRunData:()=>({outputs:[{dims:a?a(r):r,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(y/64)},programUniforms:_}),getShaderSource:b}},Xc=(e,t,r,a)=>{let s=e.length>2,i=xe(r[3]),o=xe(r[2]),l=O.size(r)/i/o,d=[e[0].dims[0],e[0].dims[1],e[0].dims[2],e[0].dims[3]/i],p=[e[1].dims[0],e[1].dims[1],e[1].dims[2],e[1].dims[3]/i],g=[r[0],r[1],r[2],r[3]/i],f=[{type:12,data:l},{type:6,data:[t.strides[0],t.strides[1]]},{type:6,data:[t.pads[0],t.pads[1]]}];Et(t,f),f.push(...Q(d,p,g));let y=(o-1)*t.strides[1]+p[1],_=w=>{let b=j("output",e[0].dataType,g.length,i),k=Ie(b.type.tensor),v=It(t,b.type.value,k),$=M("x",e[0].dataType,d.length,i),T=M("w",e[1].dataType,p.length,i),S=[$,T];s&&S.push(M("b",e[2].dataType,e[2].dims,i));let C=s?"value += b[output_channel];":"",E=[{name:"output_size",type:"u32"},{name:"strides",type:"i32",length:2},{name:"pads",type:"i32",length:2}];return zt(t,E),`
  ${w.registerUniforms(E).declareVariables(...S,b)}
  ${w.mainStart()}
    ${w.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let width0 = uniforms.output_shape[3];
    let output_channel = global_idx % width0;
    var index1 = global_idx / width0;
    let width1 = uniforms.output_shape[2] / ${o}u;
    let col = (index1 % width1) * ${o}u;
    index1 = index1 / width1;
    let row = index1 % uniforms.output_shape[1];
    let batch = index1 / uniforms.output_shape[1];

    let x_corner = vec2<i32>(i32(row), i32(col)) * uniforms.strides - uniforms.pads;

    var x_vals: array<${$.type.value}, ${y}>;
    var values: array<${b.type.value}, ${o}>;
    let input_channel = output_channel;
    // Use constant instead of uniform can give better performance for w's height/width.
    for (var w_height: u32 = 0u; w_height < ${p[0]}; w_height++) {
      let x_height = x_corner.x + i32(w_height);
      if (x_height >= 0 && u32(x_height) < uniforms.x_shape[1]) {
        for (var i = 0; i < ${y}; i++) {
          let x_width = x_corner.y + i;
          if (x_width >= 0 && u32(x_width) < uniforms.x_shape[2]) {
            x_vals[i] = ${$.get("batch","u32(x_height)","u32(x_width)","input_channel")};
          } else {
            x_vals[i] = ${$.type.value}(0);
          }
        }
        for (var w_width: u32 = 0u; w_width < ${p[1]}; w_width++) {
          let w_val = ${T.get("w_height","w_width","0","output_channel")};
          for (var i = 0u; i < ${o}u; i++) {
            values[i] = fma(x_vals[i * u32(uniforms.strides[1]) + w_width], w_val, values[i]);
          }
        }
      }
    }

    for (var i = 0u; i < ${o}u; i++) {
      var value = values[i];
      ${C}
      ${v}
      ${b.set("batch","row","col + i","output_channel","value")};
    }
  }`};return{name:"GroupedConv-Vectorize",shaderCache:{hint:`${t.cacheKey};${i};${o};${y};${p[0]};${p[1]}`,inputDependencies:s?["rank","rank","type"]:["rank","rank"]},getRunData:()=>({outputs:[{dims:a?a(r):r,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(l/64)},programUniforms:f}),getShaderSource:_}}}),Nu,Ir,Du,Er,ba,Mi,Pu,Uu,$a,Sy=q(()=>{oe(),vy(),xy(),ja(),ky(),Ot(),Fa(),yt(),Nu=(e,t,r,a,s,i)=>{let o=e[0],l=e.slice(i?1:2,i?3:4),d=l.length,p=t[0],g=t.slice(2).map((y,_)=>y+(y-1)*(r[_]-1)),f=l.map((y,_)=>y+a[_]+a[_+d]).map((y,_)=>Math.floor((y-g[_]+s[_])/s[_]));return f.splice(0,0,o),f.splice(i?3:1,0,p),f},Ir=[2,3,1,0],Du=(e,t)=>{if(!e||e.length!==2&&e.length!==3)throw new Error("Conv requires 2 or 3 inputs");if(e[0].dims.length>5)throw new Error("greater than 5D is not supported");if(e[0].dims.length!==e[1].dims.length)throw new Error("filter does not have same dimension as input");let r=e[0].dims[t.format==="NHWC"?e[0].dims.length-1:1],a=e[1].dims[1]*t.group;if(r!==a)throw new Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");if(e.length===3&&(e[2].dims.length!==1||e[1].dims[0]!==e[2].dims[0]))throw new Error("invalid bias");let s=e[0].dims.length-2;if(t.dilations.length!==s)throw new Error(`dilations should be ${s}D`);if(t.strides.length!==s)throw new Error(`strides should be ${s}D`);if(t.pads.length!==s*2)throw new Error(`pads should be ${s*2}D`);if(t.kernelShape.length!==0&&t.kernelShape.length!==e[1].dims.length-2)throw new Error("invalid kernel shape")},Er=(e,t)=>{let r=e.kernelShape.slice();r.length<t[1].dims.length-2&&r.push(...Array(t[1].dims.length-2-r.length).fill(0));for(let i=2;i<t[1].dims.length;++i)r[i-2]===0&&(r[i-2]=t[1].dims[i]);let a=e.pads.slice();qr.adjustPadsBasedOnAutoPad(t[0].dims,e.strides,e.dilations,r,a,e.format==="NHWC",e.autoPad);let s=Object.assign({},e);return Object.assign(s,{kernelShape:r,pads:a}),s},ba=e=>{let t=La(e),r=e.format,a=["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][e.auto_pad],s=e.dilations,i=e.group,o=e.kernel_shape,l=e.pads,d=e.strides,p=e.w_is_const();return{autoPad:a,format:r,dilations:s,group:i,kernelShape:o,pads:l,strides:d,wIsConst:p,...t,cacheKey:`${e.format};${t.activation};`}},Mi=(e,t,r,a)=>{let s=r.format==="NHWC",i=Nu(t[0].dims,t[1].dims,r.dilations,r.pads,r.strides,s);if(r.group!==1){let E=[t[0]];if(s){let z=e.kernelCustomData.wT??e.compute(Pe(t[1],Ir),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];r.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=z),E.push(z)}else E.push(t[1]);t.length===3&&E.push(t[2]),!e.adapterInfo.isArchitecture("ampere")&&s&&t[1].dims[0]===r.group&&t[1].dims[1]===1&&r.dilations[0]===1&&r.dilations[1]===1?e.compute(Xc(E,r,i,a),{inputs:E}):e.compute(Zc(E,r,i,a),{inputs:E});return}let o=t.length===3,l=t[0].dims[s?1:2],d=t[0].dims[s?2:3],p=t[0].dims[s?3:1],g=t[1].dims[2],f=t[1].dims[3],y=i[s?1:2],_=i[s?2:3],w=i[s?3:1],b=s&&g===l&&f===d&&r.pads[0]===0&&r.pads[1]===0;if(b||g===1&&f===1&&r.dilations[0]===1&&r.dilations[1]===1&&r.strides[0]===1&&r.strides[1]===1&&r.pads[0]===0&&r.pads[1]===0){let E=i[0],z,B,W,G=[];if(s){let Z=e.kernelCustomData.wT??e.compute(Pe(t[1],Ir),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];if(r.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=Z),b){let te=l*d*p;z=t[0].reshape([1,E,te]),B=Z.reshape([1,te,w]),W=[1,E,w]}else z=t[0].reshape([E,l*d,p]),B=Z.reshape([1,p,w]),W=[E,y*_,w];G.push(z),G.push(B)}else z=t[0].reshape([E,p,l*d]),B=t[1].reshape([1,w,p]),W=[E,w,y*_],G.push(B),G.push(z);o&&G.push(t[2]);let ee=W[2],ae=G[0].dims[G[0].dims.length-1];ee<8&&ae<8?e.compute(Ha(G,r,i,W,s,a),{inputs:G}):e.compute(Lr(G,r,i,W,s,a),{inputs:G});return}let k=!0,v=e.kernelCustomData.wT??e.compute(Pe(t[1],Ir),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];r.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=v);let $=[t[0],v];o&&$.push(t[2]);let T=s?y*_:w,S=s?w:y*_,C=g*f*p;e.compute(jc($,r,i,T,S,C,o,k,a),{inputs:$})},Pu=(e,t)=>{let r=t.format==="NHWC",a=[e.inputs[0].reshape(r?[e.inputs[0].dims[0],1,e.inputs[0].dims[1],e.inputs[0].dims[2]]:[e.inputs[0].dims[0],e.inputs[0].dims[1],1,e.inputs[0].dims[2]]),e.inputs[1].reshape([e.inputs[1].dims[0],e.inputs[1].dims[1],1,e.inputs[1].dims[2]])];e.inputs.length===3&&a.push(e.inputs[2]);let s=[0,t.pads[0],0,t.pads[1]],i=[1].concat(t.strides),o=[1].concat(t.dilations),l=[1].concat(t.kernelShape),d=Er({...t,pads:s,strides:i,dilations:o,kernelShape:l},a);Mi(e,a,d,p=>r?[p[0],p[2],p[3]]:[p[0],p[1],p[3]])},Uu=(e,t,r)=>{let a=r.format==="NHWC"?"channelsLast":"channelsFirst",s=Er(r,t),i=r.autoPad==="NOTSET"?r.pads:r.autoPad,o=Kc(t[0].dims,t[1].dims,r.strides,r.dilations,i,!1,a);e.compute(Qc(t,s,o.outShape,[o.filterDepth,o.filterHeight,o.filterWidth],[o.padInfo.front,o.padInfo.top,o.padInfo.left],a))},$a=(e,t)=>{if(Du(e.inputs,t),e.inputs[0].dims.length===3)Pu(e,t);else if(e.inputs[0].dims.length===5)Uu(e,e.inputs,t);else{let r=Er(t,e.inputs);Mi(e,e.inputs,r)}}}),Jc,Ty=q(()=>{Y(),st(),oe(),ue(),Jc=(e,t,r)=>{let a=e.length>2,s=t.outputShape,i=t.format==="NHWC",o=t.group,l=e[1].dims,d=l[2]/o,p=l[3],g=i?xe(d):1,f=i?xe(p):1,y=i?p===1?g:f:1,_=O.size(s)/f,w=[Math.ceil(_/64),1,1];pe("verbose",()=>`[conv2d_backprop_webgpu] dispatch = ${w}`);let b=["rank","rank"],k=[t.strides[0],t.strides[1]],v=[t.kernelShape[i?1:2],t.kernelShape[i?2:3]],$=[t.dilations[0],t.dilations[1]],T=[v[0]+(t.dilations[0]<=1?0:(t.kernelShape[i?1:2]-1)*(t.dilations[0]-1)),v[1]+(t.dilations[1]<=1?0:(t.kernelShape[i?2:3]-1)*(t.dilations[1]-1))],S=[T[0]-1-Math.floor((t.pads[0]+t.pads[2])/2),T[1]-1-Math.floor((t.pads[1]+t.pads[3])/2)],C=[{type:12,data:_},{type:12,data:k},{type:12,data:v},{type:12,data:$},{type:12,data:T},{type:6,data:S},{type:12,data:d},{type:12,data:p},...Q(e[0].dims,e[1].dims)];a&&(C.push(...Q(e[2].dims)),b.push("rank")),C.push(...Q(s));let E=z=>{let B=[{name:"output_size",type:"u32"},{name:"strides",type:"u32",length:k.length},{name:"filter_dims",type:"u32",length:v.length},{name:"dilations",type:"u32",length:v.length},{name:"effective_filter_dims",type:"u32",length:T.length},{name:"pads",type:"i32",length:S.length},{name:"input_channels_per_group",type:"u32"},{name:"output_channels_per_group",type:"u32"}],W=Ie(e[0].dataType),G=i?1:2,ee=i?2:3,ae=i?3:1,Z=M("W",e[1].dataType,e[1].dims.length,y),te=M("Dy",e[0].dataType,e[0].dims.length,g),J=[te,Z];a&&J.push(M("bias",e[2].dataType,[s[ae]].length,f));let L=j("result",e[0].dataType,s.length,f),de=()=>{let F="";if(g===1)F+=`
        let w_offset = ${Z.indicesToOffset(`${Z.type.indices}(u32(wRPerm), u32(wCPerm), inputChannel, wOutChannel)`)};
        let wValue = ${Z.getByOffset(`w_offset / ${y}`)};
        dotProd = dotProd + xValue * wValue;`;else if(p===1)F+=`
          let wValue = ${Z.getByOffset(`${Z.indicesToOffset(`${Z.type.indices}(u32(wRPerm), u32(wCPerm), inputChannel, wOutChannel)`)} / ${y}`)};
          dotProd = dotProd + dot(xValue, wValue);`;else for(let ge=0;ge<g;ge++)F+=`
            let wValue${ge} = ${Z.getByOffset(`${Z.indicesToOffset(`${Z.type.indices}(u32(wRPerm), u32(wCPerm), inputChannel + ${ge}, wOutChannel)`)} / ${y}`)};
            dotProd = dotProd + xValue[${ge}] * wValue${ge};`;return F},me=`
            let outputIndices = ${L.offsetToIndices(`global_idx * ${f}`)};
            let batch = ${L.indicesGet("outputIndices",0)};
            let d1 = ${L.indicesGet("outputIndices",ae)};
            let r = ${L.indicesGet("outputIndices",G)};
            let c = ${L.indicesGet("outputIndices",ee)};
            let dyCorner = vec2<i32>(i32(r), i32(c)) - uniforms.pads;
            let dyRCorner = dyCorner.x;
            let dyCCorner = dyCorner.y;
            let groupId = d1 / uniforms.output_channels_per_group;
            let wOutChannel = d1 - groupId * uniforms.output_channels_per_group;
            // Convolve dy(?, ?, d2) with w(:, :, d1, d2) to compute dx(xR, xC, d1).
            // ? = to be determined. : = across all values in that axis.
            var dotProd = ${L.type.value}(0.0);
            var wR: u32 = 0;
            if (uniforms.dilations.x == 1) {
              // Minimum wR >= 0 that satisfies (dyRCorner + wR) % (uniforms.strides.x) == 0
              wR = u32(((dyRCorner + i32(uniforms.strides.x) - 1) / i32(uniforms.strides.x)) * i32(uniforms.strides.x) - dyRCorner);
            }
            for (; wR < uniforms.effective_filter_dims.x; wR = wR + 1) {
              if (wR % uniforms.dilations.x != 0) {
                continue;
              }
              let dyR = (${W}(dyRCorner) + ${W}(wR)) / ${W}(uniforms.strides[0]);
              let wRPerm = uniforms.filter_dims.x - 1 - wR / uniforms.dilations.x;
              if (dyR < 0.0 || dyR >= ${W}(uniforms.Dy_shape[${G}]) || fract(dyR) > 0.0 ||
                  wRPerm < 0) {
                continue;
              }
              let idyR: u32 = u32(dyR);
              var wC: u32 = 0;
              if (uniforms.dilations.y == 1) {
                // Minimum wC >= 0 that satisfies (dyCCorner + wC) % (uniforms.strides.y) == 0
                wC = u32(((dyCCorner + i32(uniforms.strides.y) - 1) / i32(uniforms.strides.y)) * i32(uniforms.strides.y) - dyCCorner);
              }

              for (; wC < uniforms.effective_filter_dims.y; wC = wC + 1) {
                if (wC % uniforms.dilations.y != 0) {
                  continue;
                }
                let dyC = (${W}(dyCCorner) + ${W}(wC)) / ${W}(uniforms.strides.y);
                let wCPerm = uniforms.filter_dims.y - 1 - wC / uniforms.dilations.y;
                if (dyC < 0.0 || dyC >= ${W}(uniforms.Dy_shape[${ee}]) ||
                    fract(dyC) > 0.0 || wCPerm < 0) {
                  continue;
                }
                let idyC: u32 = u32(dyC);
                var inputChannel = groupId * uniforms.input_channels_per_group;
                for (var d2: u32 = 0; d2 < uniforms.input_channels_per_group; d2 = d2 + ${g}) {
                  let xValue = ${i?te.getByOffset(`${te.indicesToOffset(`${te.type.indices}(batch, idyR, idyC, inputChannel)`)} / ${g}`):te.get("batch","inputChannel","idyR","idyC")};
                  ${de()}
                  inputChannel = inputChannel + ${g};
                }
                wC = wC + uniforms.strides.y - 1;
              }
              wR = wR + uniforms.strides[0] - 1;
            }
            let value = dotProd${a?` + bias[d1 / ${f}]`:""};
            ${L.setByOffset("global_idx","value")};
          `;return`
    ${z.registerUniforms(B).declareVariables(...J,L)}
      ${z.mainStart()}
      ${z.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")};
    ${me}}`};return{name:"ConvTranspose2D",shaderCache:{hint:`${t.cacheKey};${g}${y}${f}${p===1}`,inputDependencies:b},getRunData:()=>({dispatchGroup:{x:w[0],y:w[1],z:w[2]},outputs:[{dims:r?r(s):s,dataType:e[0].dataType}],programUniforms:C}),getShaderSource:E}}}),Wu,qu,Vu,Ni,Yc,Lu,Di,Gu,eh,Cy=q(()=>{Ty(),Ot(),yt(),Wu=(e,t,r,a,s,i)=>(e-1)*t+r+(a-1)*s+1-i,qu=(e,t,r,a,s)=>{let i=Math.floor(e/2);t==="SAME_UPPER"?(r[a]=i,r[s]=e-i):t==="SAME_LOWER"&&(r[a]=e-i,r[s]=i)},Vu=(e,t,r,a,s,i,o,l,d,p)=>{let g=e.length-2,f=p.length===0;d.length<g&&d.push(...Array(g-d.length).fill(0));let y=e[0],_=t[l?3:1]*s;for(let w=0,b=e.length-g-(l?1:0);w<g;++w,++b){let k=e[b],v=f?k*o[w]:p[w],$=Wu(k,o[w],i[w],t[b],r[w],v);qu($,a,i,w,w+g),f&&p.push(o[w]*(k-1)+d[w]+(t[b]-1)*r[w]+1-i[w]-i[w+g])}p.splice(0,0,y),p.splice(l?3:1,0,_)},Ni=(e,t)=>{let r=e.kernelShape.slice();if(e.kernelShape.length===0||e.kernelShape.reduce((f,y)=>f*y,1)===0){r.length=0;for(let f=2;f<t[1].dims.length;++f)r.push(t[1].dims[f])}let a=e.format==="NHWC";r.splice(0,0,t[1].dims[0]),r.splice(a?3:1,0,t[1].dims[1]);let s=e.pads.slice(),i=e.outputShape.slice(),o=e.outputPadding.slice(),l=t[0].dims,d=e.dilations.slice();if(d.reduce((f,y)=>f+y,0)===0){let f=t[0].dims.length-2;d=new Array(f).fill(1)}let p=e.strides.slice();if(p.reduce((f,y)=>f+y,0)===0){let f=t[0].dims.length-2;p=new Array(f).fill(1)}Vu(l,r,d,e.autoPad,e.group,s,p,a,o,i);let g=Object.assign({},e);return Object.assign(g,{kernelShape:r,pads:s,outputPadding:o,outputShape:i,dilations:d,strides:p}),g},Yc=e=>{let t=La(e),r=e.format,a=["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][typeof e.autoPad>"u"?0:e.autoPad],s=e.dilations,i=e.group,o=e.kernelShape,l=e.pads,d=e.strides,p=e.wIsConst(),g=e.outputPadding,f=e.outputShape;return{autoPad:a,format:r,dilations:s,group:i,kernelShape:o,outputPadding:g,outputShape:f,pads:l,strides:d,wIsConst:p,...t,cacheKey:`${e.format};${t.activation};`}},Lu=(e,t)=>{if(!e||e.length!==2&&e.length!==3)throw new Error("Conv requires 2 or 3 inputs");if(e[0].dims.length!==4&&e[0].dims.length!==3)throw new Error("currently only support 2-dimensional conv");if(e[0].dims.length!==e[1].dims.length)throw new Error("filter does not have same dimension as input");let r=e[0].dims[t.format==="NHWC"?e[0].dims.length-1:1],a=e[1].dims[0];if(r!==a)throw new Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");let s=e[1].dims[1]*t.group;if(e.length===3&&(e[2].dims.length!==1||e[2].dims[0]!==s))throw new Error("invalid bias");let i=e[0].dims.length-2;if(t.dilations.reduce((o,l)=>o+l,0)>0&&t.dilations.length!==i)throw new Error(`dilations should be ${i}D`);if(t.strides.reduce((o,l)=>o+l,0)>0&&t.strides.length!==i)throw new Error(`strides should be ${i}D`);if(t.pads.reduce((o,l)=>o+l,0)>0&&t.pads.length!==i*2)throw new Error(`pads should be ${i*2}D`);if(t.outputPadding.length!==i&&t.outputPadding.length!==0)throw new Error(`output_padding should be ${i}D`);if(t.kernelShape.reduce((o,l)=>o+l,0)>0&&t.kernelShape.length!==0&&t.kernelShape.length!==e[1].dims.length-2)throw new Error("invalid kernel shape");if(t.outputShape.length!==0&&t.outputShape.length!==e[0].dims.length-2)throw new Error("invalid output shape")},Di=(e,t,r,a)=>{let s=e.kernelCustomData.wT??e.compute(Pe(t[1],[2,3,0,1]),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];r.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=s);let i=[t[0],s];t.length===3&&i.push(t[2]),e.compute(Jc(i,r,a),{inputs:i})},Gu=(e,t)=>{let r=t.format==="NHWC",a=[e.inputs[0].reshape(r?[e.inputs[0].dims[0],1,e.inputs[0].dims[1],e.inputs[0].dims[2]]:[e.inputs[0].dims[0],e.inputs[0].dims[1],1,e.inputs[0].dims[2]]),e.inputs[1].reshape([e.inputs[1].dims[0],e.inputs[1].dims[1],1,e.inputs[1].dims[2]])];e.inputs.length===3&&a.push(e.inputs[2]);let s=t.kernelShape;(s.length===0||s[0]===0)&&(s=[e.inputs[1].dims[2]]);let i=t.dilations;(i.length===0||i[0]===0)&&(i=[1]);let o=t.strides;(o.length===0||o[0]===0)&&(o=[1]);let l=t.pads;l.length===0&&(l=[0,0]),l=[0,l[0],0,l[1]],o=[1].concat(o),i=[1].concat(i),s=[1].concat(s);let d=t.outputPadding;d=[0].concat(d);let p=Ni({...t,pads:l,strides:o,dilations:i,kernelShape:s,outputPadding:d},a);Di(e,a,p,g=>r?[g[0],g[2],g[3]]:[g[0],g[1],g[3]])},eh=(e,t)=>{if(Lu(e.inputs,t),e.inputs[0].dims.length===3)Gu(e,t);else{let r=Ni(t,e.inputs);Di(e,e.inputs,r)}}}),Hu,th,rh,Iy=q(()=>{Y(),oe(),ke(),ue(),Hu=(e,t,r,a)=>{let s=O.size(t),i=t.length,o=M("input",e,i),l=j("output",e,i),d=r.dataType===6?r.getInt32Array()[0]:Number(r.getBigInt64Array()[0]),p=O.normalizeAxis(d,i),g=f=>{let y=` i32(${o.indicesGet("inputIndices","uniforms.axis")}) `,_=K("uniforms.input_shape","uniforms.axis",i),w=a.reverse?y+(a.exclusive?" + 1":""):"0",b=a.reverse?_:y+(a.exclusive?"":" + 1");return`
                ${f.registerUniform("outputSize","u32").registerUniform("axis","u32").declareVariables(o,l)}
                ${f.mainStart()}
                  ${f.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
                  var inputIndices = ${l.offsetToIndices("global_idx")};
                  var sum = ${l.type.value}(0);
                  let first : i32 = ${w};
                  let last : i32 = ${b};
                  for (var i : i32 = first; i < last; i++) {
                    ${o.indicesSet("inputIndices","uniforms.axis","u32(i)")};
                    sum = sum + ${o.getByIndices("inputIndices")};
                  }
                  ${l.setByOffset("global_idx","sum")};
                }`};return{name:"CumSum",shaderCache:{hint:a.cacheKey,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:t,dataType:e}],dispatchGroup:{x:Math.ceil(s/64)},programUniforms:[{type:12,data:s},{type:12,data:p},...Q(t,t)]}),getShaderSource:g}},th=(e,t)=>{let r=e.inputs[0].dims,a=e.inputs[0].dataType,s=e.inputs[1];e.compute(Hu(a,r,s,t),{inputs:[0]})},rh=e=>{let t=e.exclusive===1,r=e.reverse===1;return _e({exclusive:t,reverse:r})}}),Fu,ju,Ku,ih,ah,Ey=q(()=>{Y(),oe(),ke(),ue(),Fu=e=>{if(!e||e.length!==1)throw new Error("DepthToSpace requires 1 input.");if(e[0].dims.length!==4)throw new Error("DepthToSpace requires 4D input.")},ju=(e,t,r,a)=>{let s=[];s.push(`fn perm(i: ${a.type.indices}) -> ${r.type.indices} {
    var a: ${r.type.indices};`);for(let i=0;i<t;++i)s.push(r.indicesSet("a",e[i],`i[${i}]`));return s.push("return a;}"),s.join(`
`)},Ku=(e,t)=>{let r,a,s,i,o,l,d=t.format==="NHWC",p=t.blocksize,g=t.mode==="DCR";d?([r,a,s,i]=e.dims,o=g?[r,a,s,p,p,i/p**2]:[r,a,s,i/p**2,p,p],l=g?[0,1,3,2,4,5]:[0,1,4,2,5,3]):([r,a,s,i]=[e.dims[0],e.dims[2],e.dims[3],e.dims[1]],o=g?[r,p,p,i/p**2,a,s]:[r,i/p**2,p,p,a,s],l=g?[0,3,4,1,5,2]:[0,1,4,2,5,3]);let f=e.reshape(o),y=f.dims.length,_=e.dataType,w=M("a",_,y),b=j("output",_,y),k=v=>`
  ${v.registerUniform("output_size","u32").declareVariables(w,b)}

  ${ju(l,y,w,b)}

  ${v.mainStart()}
    ${v.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let indices = ${b.offsetToIndices("global_idx")};
    let aIndices = perm(indices);

    ${b.setByOffset("global_idx",w.getByIndices("aIndices"))}
  }`;return{name:"DepthToSpace",shaderCache:{hint:`${e.dims};${t.blocksize};${t.mode}`,inputDependencies:["rank"]},getRunData:v=>{let $=d?[r,a*p,s*p,i/p**2]:[r,i/p**2,a*p,s*p],T=O.size($),S=f.dims,C=O.sortBasedOnPerm(S,l);return{outputs:[{dims:$,dataType:v[0].dataType}],dispatchGroup:{x:Math.ceil(T/64)},programUniforms:[{type:12,data:T},...Q(S,C)]}},getShaderSource:k}},ih=(e,t)=>{Fu(e.inputs),e.compute(Ku(e.inputs[0],t))},ah=e=>_e({blocksize:e.blocksize,mode:e.mode,format:e.format})}),zr,Jt,Pi,Qu,Zu,Xu,Ju,Ui,Yu,nh,sh,zy=q(()=>{Y(),oe(),ke(),ue(),zr="[a-zA-Z]|\\.\\.\\.",Jt="("+zr+")+",Pi="^"+Jt+"$",Qu="("+Jt+",)*"+Jt,Zu="^"+Qu+"$",Xu=class{constructor(e=-1){this.symbolToIndices=new Map,this.inputIndex=e}addSymbol(e,t){let r=this.symbolToIndices.get(e);r===void 0?r=[t]:r.push(t),this.symbolToIndices.set(e,r)}},Ju=class{constructor(e,t){var s;this.equation=t,this.hasEllipsis=!1,this.symbolToInfo=new Map,this.lhs=new Array,this.outputDims=[];let[r,a]=t.includes("->")?t.split("->",2):[t,""];if(!r.match(RegExp(Zu)))throw new Error("Invalid LHS term");if(r.split(",").forEach((i,o)=>{let l=e[o].dims.slice();if(!i.match(RegExp(Pi)))throw new Error("Invalid LHS term");let d=this.processTerm(i,!0,l,o);this.lhs.push(d)}),a==="")a+=[...this.symbolToInfo.entries()].filter(([i,o])=>o.count===1||i==="...").map(([i])=>i).join("");else if(!a.match(RegExp(Jt)))throw new Error("Invalid RHS");(s=a.match(RegExp(zr,"g")))==null||s.forEach(i=>{if(i==="...")this.outputDims=this.outputDims.concat(this.ellipsisDims);else{let o=this.symbolToInfo.get(i);if(o===void 0)throw new Error("Invalid RHS symbol");this.outputDims.push(o.dimValue)}}),this.rhs=this.processTerm(a,!1,this.outputDims)}addSymbol(e,t,r){let a=this.symbolToInfo.get(e);if(a!==void 0){if(a.dimValue!==t&&a.count!==1)throw new Error("Dimension mismatch");a.count++,a.inputIndices.push(r)}else a={count:1,dimValue:t,inputIndices:[r]};this.symbolToInfo.set(e,a)}processTerm(e,t,r,a=-1){let s=r.length,i=!1,o=[],l=0;if(!e.match(RegExp(Pi))&&!t&&e!=="")throw new Error("Invalid LHS term");let d=e.match(RegExp(zr,"g")),p=new Xu(a);return d==null||d.forEach((g,f)=>{if(g==="..."){if(i)throw new Error("Only one ellipsis is allowed per input term");i=!0;let y=s-d.length+1;if(y<0)throw new Error("Ellipsis out of bounds");if(o=r.slice(l,l+y),this.hasEllipsis){if(this.ellipsisDims.length!==o.length||this.ellipsisDims.toString()!==o.toString())throw new Error("Ellipsis dimensions mismatch")}else if(t)this.hasEllipsis=!0,this.ellipsisDims=o;else throw new Error("Ellipsis must be specified in the LHS");for(let _=0;_<o.length;_++){let w=String.fromCharCode(48+_);p.addSymbol(w,f+_),this.addSymbol(w,r[l++],a)}}else p.addSymbol(g,f+(this.hasEllipsis?this.ellipsisDims.length-1:0)),this.addSymbol(g,r[l++],a)}),p}},Ui=e=>e+"_max",Yu=(e,t,r,a)=>{let s=e.map(p=>p.length).map((p,g)=>M(`input${g}`,t,p)),i=O.size(a),o=j("output",t,a.length),l=[...r.symbolToInfo.keys()].filter(p=>!r.rhs.symbolToIndices.has(p)),d=p=>{let g=[],f="var prod = 1.0;",y="var sum = 0.0;",_="sum += prod;",w=[],b=[],k=[],v=[],$=r.symbolToInfo.size===r.rhs.symbolToIndices.size;r.symbolToInfo.forEach((S,C)=>{var E;if(r.rhs.symbolToIndices.has(C)){let z=(E=r.rhs.symbolToIndices.get(C))==null?void 0:E[0];z!==void 0&&r.lhs.forEach((B,W)=>{if(S.inputIndices.includes(W)){let G=B.symbolToIndices.get(C);if(G===void 0)throw new Error("Invalid symbol error");G.forEach(ee=>{g.push(`${s[W].indicesSet(`input${W}Indices`,ee,o.indicesGet("outputIndices",z))}`)})}})}else r.lhs.forEach((z,B)=>{if(S.inputIndices.includes(B)){let W=z.symbolToIndices.get(C);if(W===void 0)throw new Error("Invalid symbol error");W.forEach(G=>{w.push(`${s[B].indicesSet(`input${B}Indices`,G,`${C}`)}`)}),v.push(`prod *= ${s[B].getByIndices(`input${B}Indices`)};`)}}),b.push(`for(var ${C}: u32 = 0; ${C} < uniforms.${Ui(C)}; ${C}++) {`),k.push("}")});let T=$?[...g,`let sum = ${s.map((S,C)=>S.getByIndices(`input${C}Indices`)).join(" * ")};`]:[...g,y,...b,...w,f,...v,_,...k];return`
            ${p.registerUniforms(l.map(S=>({name:`${Ui(S)}`,type:"u32"}))).registerUniform("outputSize","u32").declareVariables(...s,o)}

            ${p.mainStart()}
            ${p.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
            var outputIndices = ${o.offsetToIndices("global_idx")};
            ${s.map((S,C)=>`var input${C}Indices: ${s[C].type.indices};`).join(`
`)}
            ${T.join(`
`)};
            ${o.setByOffset("global_idx","sum")};
          }`};return{name:"Einsum",shaderCache:{hint:r.equation,inputDependencies:e.map(()=>"rank")},getRunData:()=>{let p=l.filter(f=>r.symbolToInfo.has(f)).map(f=>{var y;return{type:12,data:((y=r.symbolToInfo.get(f))==null?void 0:y.dimValue)||0}});p.push({type:12,data:i});let g=e.map((f,y)=>[...Q(f)]).reduce((f,y)=>f.concat(y),p);return g.push(...Q(a)),{outputs:[{dims:a,dataType:t}],dispatchGroup:{x:Math.ceil(i/64)},programUniforms:g}},getShaderSource:d}},nh=(e,t)=>{let r=new Ju(e.inputs,t.equation),a=r.outputDims,s=e.inputs.map((i,o)=>i.dims);e.compute(Yu(s,e.inputs[0].dataType,r,a))},sh=e=>{let t=e.equation.replace(/\s+/g,"");return _e({equation:t})}}),el,Wi,tl,rl,oh,Ay=q(()=>{Y(),oe(),ue(),el=e=>{if(!e||e.length!==2)throw new Error("Expand requires 2 input.");let t=e[0].dims,r=Array.from(e[1].getBigInt64Array(),Number),a=r.length<t.length?0:r.length-t.length,s=t.length<r.length?0:t.length-r.length;for(;a<r.length&&s<t.length;++a,++s)if(r[a]!==t[s]&&r[a]!==1&&t[s]!==1)throw new Error("Expand requires shape to be broadcastable to input")},Wi=(e,t)=>{let r=e.length-t.length,a=[];for(let s=0;s<r;++s)a.push(e[s]);for(let s=0;s<t.length;++s)a.push(t[s]===1?e[s+r]:t[s]);return a},tl=(e,t)=>e.length>t.length?Wi(e,t):Wi(t,e),rl=e=>{let t=e[0].dims,r=Array.from(e[1].getBigInt64Array(),Number),a=tl(t,r),s=e[0].dataType,i=s===9||O.size(t)===1,o=s===9||t.length>0&&t[t.length-1]%4===0?4:1,l=i||a.length>0&&a[a.length-1]%4===0?4:1,d=Math.ceil(O.size(a)/l),p=f=>{let y=M("input",s,t.length,o),_=j("output",s,a.length,l),w;if(s===9){let b=(k,v,$="")=>`
          let outputIndices${v} = ${_.offsetToIndices(`outputOffset + ${v}u`)};
          let offset${v} = ${y.broadcastedIndicesToOffset(`outputIndices${v}`,_)};
          let index${v} = offset${v} / 4u;
          let component${v} = offset${v} % 4u;
          ${k}[${v}] = ${$}(${y.getByOffset(`index${v}`)}[component${v}]);
        `;w=`
        let outputOffset = global_idx * ${l};
        var data = vec4<u32>(0);
        ${b("data",0,"u32")}
        ${b("data",1,"u32")}
        ${b("data",2,"u32")}
        ${b("data",3,"u32")}
        ${_.setByOffset("global_idx","data")}
      }`}else w=`
        let outputIndices = ${_.offsetToIndices(`global_idx * ${l}`)};
        let inputOffset = ${y.broadcastedIndicesToOffset("outputIndices",_)};
        let data = ${_.type.value}(${y.getByOffset(`inputOffset / ${o}`)});
        ${_.setByOffset("global_idx","data")}
      }`;return`
    ${f.registerUniform("vec_size","u32").declareVariables(y,_)}
    ${f.mainStart()}
    ${f.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
    ${w}`},g=[{type:12,data:d},...Q(t,a)];return{name:"Expand",shaderCache:{hint:`${a.length};${o}${l}`,inputDependencies:["rank"]},getShaderSource:p,getRunData:()=>({outputs:[{dims:a,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(d/64)},programUniforms:g})}},oh=e=>{el(e.inputs),e.compute(rl(e.inputs),{inputs:[0]})}}),il,uh,Oy=q(()=>{Y(),oe(),ue(),Va(),il=e=>{let t=e[0].dataType,r=O.size(e[0].dims),a=O.size(e[1].dims),s=a%4===0,i=o=>{let l=M("x",t,[1],4),d=M("bias",t,[1],4),p=j("y",t,[1],4),g=[{name:"output_vec_size",type:"u32"},{name:"bias_size",type:"u32"}],f=_=>`
      let bias${_}_offset: u32 = (global_idx * 4 + ${_}) % uniforms.bias_size;
      let bias${_} = ${d.getByOffset(`bias${_}_offset / 4`)}[bias${_}_offset % 4];`,y=s?`
      let bias = ${d.getByOffset("global_idx % (uniforms.bias_size / 4)")};`:`${f(0)}${f(1)}${f(2)}${f(3)}
      let bias = ${l.type.value}(bias0, bias1, bias2, bias3);`;return`${o.registerUniforms(g).declareVariables(l,d,p)}

    ${ga(Ae(t))}

    ${o.mainStart(Wt)}
      ${o.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_vec_size")}

      let x = ${l.getByOffset("global_idx")};
      ${y}
      let x_in = x + bias;
      ${p.setByOffset("global_idx",ya("x_in"))}
    }`};return{name:"FastGeluWithBias",shaderCache:{hint:`${s}`,inputDependencies:["type","type"]},getShaderSource:i,getRunData:o=>({outputs:[{dims:o[0].dims,dataType:o[0].dataType}],programUniforms:[{type:12,data:Math.ceil(r/4)},{type:12,data:a}],dispatchGroup:{x:Math.ceil(r/Wt/4)}})}},uh=e=>{e.inputs.length<2||O.size(e.inputs[1].dims)===0?Ic(e):e.compute(il(e.inputs))}}),al,nl,lh,dh,Ry=q(()=>{Y(),oe(),ke(),ue(),al=e=>{if(!e||e.length!==2)throw new Error("Gather requires 2 inputs.")},nl=(e,t)=>{let r=e[0].dims,a=e[1].dims,s=r.length,i=O.normalizeAxis(t.axis,s),o=r.slice(0);o.splice(i,1,...a);let l=r[i],d=e[0].dataType===9?4:1,p=Math.ceil(O.size(o)/d),g=[{type:12,data:p},{type:6,data:l},{type:12,data:i},...Q(e[0].dims,e[1].dims,o)],f=y=>{let _=M("data",e[0].dataType,e[0].dims.length,d),w=M("inputIndices",e[1].dataType,e[1].dims.length),b=j("output",e[0].dataType,o.length,d),k=$=>{let T=a.length,S=`var indicesIndices${$}  = ${w.type.indices}(0);`;for(let C=0;C<T;C++)S+=`${T>1?`indicesIndices${$}[${C}]`:`indicesIndices${$}`} = ${o.length>1?`outputIndices${$}[uniforms.axis + ${C}]`:`outputIndices${$}`};`;S+=`
          var idx${$} = ${w.getByIndices(`indicesIndices${$}`)};
          if (idx${$} < 0) {
            idx${$} = idx${$} + uniforms.axisDimLimit;
          }
          var dataIndices${$} : ${_.type.indices};
        `;for(let C=0,E=0;C<s;C++)C===i?(S+=`${s>1?`dataIndices${$}[${C}]`:`dataIndices${$}`} = u32(idx${$});`,E+=T):(S+=`${s>1?`dataIndices${$}[${C}]`:`dataIndices${$}`} = ${o.length>1?`outputIndices${$}[${E}]`:`outputIndices${$}`};`,E++);return S},v;if(e[0].dataType===9){let $=(T,S,C="")=>`
          let outputIndices${S} = ${b.offsetToIndices(`outputOffset + ${S}u`)};
          ${k(S)};
          let offset${S} = ${_.indicesToOffset(`dataIndices${S}`)};
          let index${S} = offset${S} / 4u;
          let component${S} = offset${S} % 4u;
          ${T}[${S}] = ${C}(${_.getByOffset(`index${S}`)}[component${S}]);
        `;v=`
        let outputOffset = global_idx * ${d};
        var value = vec4<u32>(0);
        ${$("value",0,"u32")}
        ${$("value",1,"u32")}
        ${$("value",2,"u32")}
        ${$("value",3,"u32")}
        ${b.setByOffset("global_idx","value")}
      `}else v=`
      let outputIndices = ${b.offsetToIndices("global_idx")};
      ${k("")};
      let value = ${_.getByIndices("dataIndices")};
      ${b.setByOffset("global_idx","value")};
      `;return`
      ${y.registerUniform("outputSize","u32").registerUniform("axisDimLimit","i32").registerUniform("axis","u32").declareVariables(_,w,b)}
      ${y.mainStart()}
        ${y.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
        ${v}
      }`};return{name:"Gather",shaderCache:{hint:t.cacheKey,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:o,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(p/64)},programUniforms:g}),getShaderSource:f}},lh=e=>_e({axis:e.axis}),dh=(e,t)=>{let r=e.inputs;al(r),e.compute(nl(e.inputs,t))}}),sl,ph,ch,By=q(()=>{Y(),oe(),ue(),sl=(e,t,r,a,s,i,o,l,d)=>{let p=[{type:12,data:i},{type:12,data:a},{type:12,data:s},{type:12,data:r},{type:12,data:o},{type:12,data:l},{type:12,data:d}],g=[i];p.push(...Q(t.dims,g));let f=y=>{let _=M("indices_data",t.dataType,t.dims.length),w=j("input_slice_offsets_data",12,1,1),b=[_,w],k=[{name:"output_size",type:"u32"},{name:"batch_dims",type:"u32"},{name:"input_dims",type:"u32",length:s.length},{name:"sizes_from_slice_dims_data",type:"u32",length:r.length},{name:"num_slices_per_batch",type:"u32"},{name:"input_batch_stride",type:"u32"},{name:"num_slice_dims",type:"u32"}];return`
  ${y.registerUniforms(k).declareVariables(...b)}
  ${y.mainStart()}
    ${y.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let batch_idx = global_idx / uniforms.num_slices_per_batch;
    let base_offset = batch_idx * uniforms.input_batch_stride;

    let slice_indices_base_offset = global_idx * uniforms.num_slice_dims;
    var relative_slice_offset = 0;
    for (var dim_idx = 0u; dim_idx < uniforms.num_slice_dims; dim_idx ++) {
      var index = i32(indices_data[dim_idx + slice_indices_base_offset].x);
      let input_dim_idx = uniforms.batch_dims + dim_idx;
      if (index < 0) {
        ${s.length===1?"index += i32(uniforms.input_dims);":"index += i32(uniforms.input_dims[input_dim_idx]);"}
      }
      ${r.length===1?"relative_slice_offset += index * i32(uniforms.sizes_from_slice_dims_data);":"relative_slice_offset += index * i32(uniforms.sizes_from_slice_dims_data[dim_idx]);"}
    }

    input_slice_offsets_data[global_idx] =  base_offset + u32(relative_slice_offset);
  }`};return e.compute({name:"computeSliceOffsets",shaderCache:{hint:`${s.length}_${r.length}`,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:g,dataType:e.inputs[1].dataType}],dispatchGroup:{x:Math.ceil(i/64)},programUniforms:p}),getShaderSource:f},{inputs:[t],outputs:[-1]})[0]},ph=(e,t)=>{let r=e.inputs,a=r[0].dims,s=r[0].dataType,i=r[1].dims,o=i[i.length-1],l=O.sizeToDimension(i,i.length-1),d=O.sizeFromDimension(a,t.batchDims+o),p=O.sizeToDimension(a,t.batchDims),g=O.sizeFromDimension(a,t.batchDims),f=l/p,y=new Array(o),_=d;for(let S=0;S<o;++S)y[o-1-S]=_,_*=a[t.batchDims+o-1-S];let w=sl(e,r[1],y,t.batchDims,a,l,f,g,o),b=t.batchDims+o;if(b>a.length)throw new Error("last dimension of indices must not be larger than rank of input tensor");let k=i.slice(0,-1).concat(a.slice(b)),v=O.size(k),$=[{type:12,data:v},{type:12,data:d},...Q(r[0].dims,w.dims,k)],T=S=>{let C=M("data",r[0].dataType,r[0].dims.length),E=M("slice_offsets",12,w.dims.length),z=j("output",r[0].dataType,k.length);return`
          ${S.registerUniform("output_size","u32").registerUniform("slice_size","u32").declareVariables(C,E,z)}
            ${S.mainStart()}
            ${S.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          let slice_offset = slice_offsets[global_idx / uniforms.slice_size];
          output[global_idx] = data[u32(slice_offset) + global_idx % uniforms.slice_size];
        }`};e.compute({name:"GatherND",shaderCache:{hint:t.cacheKey,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:k,dataType:s}],dispatchGroup:{x:Math.ceil(v/64)},programUniforms:$}),getShaderSource:T},{inputs:[r[0],w]})},ch=e=>({batchDims:e.batch_dims,cacheKey:""})}),ol,ul,hh,fh,My=q(()=>{Y(),oe(),ke(),ue(),ol=(e,t)=>{if(e.length<3||e.length>4)throw new Error("GatherBlockQuantized requires 3 or 4 inputs.");let r=O.normalizeAxis(t.quantizeAxis,e[0].dims.length),a=t.blockSize,s=e[0],i=e[2],o=e.length===4?e[3]:void 0;if(i.dims.length!==s.dims.length||!s.dims.map((l,d)=>d===r?Math.ceil(l/a)===i.dims[d]:l===i.dims[d]).reduce((l,d)=>l&&d,!0))throw new Error("Scales must have the same rank as the input tensor and the dims should match except on gatherAxis.");if(o){if(o.dataType!==s.dataType)throw new Error("Zero point must have the same data type as the input tensor.");if(o.dims.length!==i.dims.length||!o.dims.map((l,d)=>l===i.dims[d]).reduce((l,d)=>l&&d,!0))throw new Error("Zero point must have the same rank as the input tensor and the dims should match except on quantizeAxis.")}},ul=(e,t)=>{let r=e[0].dims,a=e[1].dims,s=r.length,i=O.normalizeAxis(t.gatherAxis,s),o=O.normalizeAxis(t.quantizeAxis,s),l=r.slice(0);l.splice(i,1,...a);let d=O.size(l),p=e[2].dataType,g=e[0].dataType===22,f=[{type:12,data:d},{type:12,data:o},{type:12,data:i},{type:12,data:t.blockSize},...Q(...e.map((_,w)=>_.dims),l)],y=_=>{let w=M("data",e[0].dataType,e[0].dims.length),b=M("inputIndices",e[1].dataType,e[1].dims.length),k=M("scales",e[2].dataType,e[2].dims.length),v=e.length>3?M("zeroPoint",e[3].dataType,e[3].dims.length):void 0,$=j("output",p,l.length),T=[w,b,k];v&&T.push(v);let S=[{name:"output_size",type:"u32"},{name:"quantize_axis",type:"u32"},{name:"gather_axis",type:"u32"},{name:"block_size",type:"u32"}];return`
        ${_.registerUniforms(S).declareVariables(...T,$)}
        ${_.mainStart()}
        let output_indices = ${$.offsetToIndices("global_idx")};
        var indices_indices = ${b.type.indices}(0);
        ${a.length>1?`
          for (var i: u32 = 0; i < ${a.length}; i++) {
            let index = ${$.indicesGet("output_indices","uniforms.gather_axis + i")};
            ${b.indicesSet("indices_indices","i","index")};
          }`:`indices_indices = ${$.indicesGet("output_indices","uniforms.gather_axis")};`};
        var data_indices = ${w.type.indices}(0);
        for (var i: u32 = 0; i < uniforms.gather_axis; i++) {
          let index = ${$.indicesGet("output_indices","i")};
          ${w.indicesSet("data_indices","i","index")};
        }
        var index_from_indices = ${b.getByIndices("indices_indices")};
        if (index_from_indices < 0) {
          index_from_indices += ${r[i]};
        }
        ${w.indicesSet("data_indices","uniforms.gather_axis","u32(index_from_indices)")};
        for (var i = uniforms.gather_axis + 1; i < ${l.length}; i++) {
          let index = ${$.indicesGet("output_indices",`i + ${a.length} - 1`)};
          ${w.indicesSet("data_indices","i","index")};
        }
        let data_offset = ${w.indicesToOffset("data_indices")};
        let data_index = data_offset % 8;
        // Convert 4-bit packed data to 8-bit packed data.
        let packed_4bit_quantized_data = ${w.getByOffset("data_offset / 8")};
        let packed_8bit_quantized_data = (packed_4bit_quantized_data >> (4 * (data_index % 2))) & 0x0f0f0f0f;
        let quantized_data_vec = ${g?"unpack4xI8":"unpack4xU8"}(u32(packed_8bit_quantized_data));
        let quantized_data = quantized_data_vec[data_index / 2];
        var scale_indices = data_indices;
        let quantize_axis_index = ${k.indicesGet("data_indices","uniforms.quantize_axis")} / uniforms.block_size;
        ${k.indicesSet("scale_indices","uniforms.quantize_axis","quantize_axis_index")};
        var scale = ${k.getByIndices("scale_indices")};
        ${v?`
              let zero_point_indices = scale_indices;
              let zero_point_offset = ${v.indicesToOffset("zero_point_indices")};
              let zero_point_index = zero_point_offset % 8;
              let packed_4bit_zero_points = ${v.getByOffset("zero_point_offset / 8")};
              let packed_8bit_zero_points = (packed_4bit_zero_points >> (4 * (zero_point_index % 2))) & 0x0f0f0f0f;
              let zero_point_vec = ${g?"unpack4xI8":"unpack4xU8"}(u32(packed_8bit_zero_points));
              let zero_point = zero_point_vec[zero_point_index / 2];`:"var zero_point = 0"};
        let dequantized_data = ${Ae(p)}(quantized_data - zero_point) * scale;
        ${$.setByOffset("global_idx","dequantized_data")};
    }`};return{name:"GatherBlockQuantized",shaderCache:{hint:`${t.cacheKey};${e.filter((_,w)=>w!==1).map(_=>_.dims.join("_")).join(";")}`,inputDependencies:Array.from({length:e.length},(_,w)=>"rank")},getRunData:()=>({outputs:[{dims:l,dataType:p}],dispatchGroup:{x:Math.ceil(d/64)},programUniforms:f}),getShaderSource:y}},hh=(e,t)=>{let r=e.inputs;ol(r,t),e.compute(ul(e.inputs,t))},fh=e=>_e({blockSize:e.blockSize,gatherAxis:e.gatherAxis,quantizeAxis:e.quantizeAxis})}),ll,dl,mh,gh,Ny=q(()=>{Y(),oe(),ke(),ue(),ll=e=>{if(!e||e.length!==2)throw new Error("GatherElements requires 2 inputs.");if(e[0].dims.length<1)throw new Error("GatherElements requires that the data input be rank >= 1.");if(e[0].dims.length!==e[1].dims.length)throw new Error(`GatherElements requires that the data input and
                     indices input tensors be of same rank.`)},dl=(e,t)=>{let r=e[0].dims,a=e[0].dataType,s=r.length,i=e[1].dims,o=e[1].dataType,l=O.normalizeAxis(t.axis,s),d=r[l],p=i.slice(0),g=O.size(p),f=M("input",a,s),y=M("indicesInput",o,i.length),_=j("output",a,p.length),w=[{type:12,data:g},{type:6,data:d},{type:12,data:l}];return w.push(...Q(r,i,p)),{name:"GatherElements",shaderCache:{inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:p,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(g/64)},programUniforms:w}),getShaderSource:b=>`
      ${b.registerUniform("outputSize","u32").registerUniform("axisDimLimit","i32").registerUniform("axis","u32").declareVariables(f,y,_)}
      ${b.mainStart()}
      ${b.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

      let outputIndices = ${_.offsetToIndices("global_idx")};

      var idx = ${y.getByOffset("global_idx")};
      if (idx < 0) {
        idx = idx + uniforms.axisDimLimit;
      }
      var inputIndices = ${f.type.indices}(outputIndices);
      ${f.indicesSet("inputIndices","uniforms.axis","u32(idx)")};
      let value = ${f.getByIndices("inputIndices")};

      ${_.setByOffset("global_idx","value")};
  }`}},mh=e=>_e({axis:e.axis}),gh=(e,t)=>{let r=e.inputs;ll(r),e.compute(dl(e.inputs,t))}}),pl,cl,yh,_h,Dy=q(()=>{Y(),oe(),ue(),pl=e=>{if(!e)throw new Error("Input is missing");if(e.length<2||e.length>3)throw new Error("Invaid input number.");if(e.length===3&&e[2].dims.length>2)throw new Error("Invalid input shape of C");if(e[0].dataType!==e[1].dataType||e.length===3&&e[0].dataType!==e[2].dataType)throw new Error("Input types are mismatched")},cl=(e,t)=>{let r=e[0].dims.slice(),a=e[1].dims.slice(),[s,i,o]=wp.getShapeOfGemmResult(r,t.transA,a,t.transB,e.length===3?e[2].dims:void 0),l=[s,i];if(!l)throw new Error("Can't use gemm on the given tensors");let d=16,p=Math.ceil(i/d),g=Math.ceil(s/d),f=!0,y=O.size(l),_=[{type:12,data:f?p:y},{type:12,data:s},{type:12,data:i},{type:12,data:o},{type:1,data:t.alpha},{type:1,data:t.beta}],w=["type","type"];e.length===3&&(_.push(...Q(e[2].dims)),w.push("rank")),_.push(...Q(l));let b=v=>{let $="";t.transA&&t.transB?$="value += a[k * uniforms.M + m] * b[n * uniforms.K + k];":t.transA&&!t.transB?$="value += a[k * uniforms.M + m] * b[k * uniforms.N + n];":!t.transA&&t.transB?$="value += a[m * uniforms.K + k] * b[n * uniforms.K + k];":!t.transA&&!t.transB&&($="value += a[m * uniforms.K + k] * b[k * uniforms.N + n];");let T=t.alpha===1?"":"value *= uniforms.alpha;",S=M("a",e[0].dataType,e[0].dims),C=M("b",e[1].dataType,e[1].dims),E=S.type.value,z=null,B=[S,C];e.length===3&&(z=M("c",e[2].dataType,e[2].dims.length),B.push(z));let W=j("output",e[0].dataType,l.length);B.push(W);let G=[{name:"output_size",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"},{name:"alpha",type:"f32"},{name:"beta",type:"f32"}];return`
  ${v.registerUniforms(G).declareVariables(...B)}

  ${v.mainStart()}
    ${v.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let m = global_idx / uniforms.N;
    let n = global_idx % uniforms.N;

    var value = ${E}(0);
    for (var k: u32 = 0u; k < uniforms.K; k++) {
      ${$}
    }

    ${T}
    ${z!=null?`let cOffset = ${z.broadcastedIndicesToOffset("vec2(m, n)",W)}; value += ${E}(uniforms.beta) * ${z.getByOffset("cOffset")};`:""}
    output[global_idx] = value;
  }`},k=v=>{let $=M("a",e[0].dataType,e[0].dims),T=M("b",e[1].dataType,e[1].dims),S=null,C=[$,T];e.length===3&&(S=M("c",e[2].dataType,e[2].dims.length),C.push(S));let E=j("output",e[0].dataType,l.length);C.push(E);let z=[{name:"num_tile_n",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"},{name:"alpha",type:"f32"},{name:"beta",type:"f32"}],B="",W="";t.transA&&t.transB?(W=`
      var col = tile_row_start + local_id.x;
      var row = k_start + local_id.y;
      if (col < uniforms.M && row < uniforms.K) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.M + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${$.type.value}(0);
      }

      col = k_start + local_id.x;
      row = tile_col_start + local_id.y;
      if (col < uniforms.K && row < uniforms.N) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.K + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${T.type.value}(0);
      }
      `,B="value += tile_a[k][local_id.y] * tile_b[local_id.x][k];"):t.transA&&!t.transB?(W=`
      var col = tile_row_start + local_id.x;
      var row = k_start + local_id.y;
      if (col < uniforms.M && row < uniforms.K) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.M + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${$.type.value}(0);
      }

      col = tile_col_start + local_id.x;
      row = k_start + local_id.y;
      if (col < uniforms.N && row < uniforms.K) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.N + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${T.type.value}(0);
      }
      `,B="value += tile_a[k][local_id.y] * tile_b[k][local_id.x];"):!t.transA&&t.transB?(W=`
      var col = k_start + local_id.x;
      var row = tile_row_start + local_id.y;
      if (col < uniforms.K && row < uniforms.M) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.K + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${$.type.value}(0);
      }

      col = k_start + local_id.x;
      row = tile_col_start + local_id.y;
      if (col < uniforms.K && row < uniforms.N) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.K + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${T.type.value}(0);
      }
      `,B="value += tile_a[local_id.y][k] * tile_b[local_id.x][k];"):!t.transA&&!t.transB&&(W=`
      var col = k_start + local_id.x;
      var row = tile_row_start + local_id.y;
      if (col < uniforms.K && row < uniforms.M) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.K + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${$.type.value}(0);
      }

      col = tile_col_start + local_id.x;
      row = k_start + local_id.y;
      if (col < uniforms.N && row < uniforms.K) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.N + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${T.type.value}(0);
      }
      `,B="value += tile_a[local_id.y][k] * tile_b[k][local_id.x];");let G=t.alpha===1?"":"value *= uniforms.alpha;";return`
  ${v.registerUniforms(z).declareVariables(...C)}
  var<workgroup> tile_a: array<array<${$.type.storage}, ${d}>, ${d}>;
  var<workgroup> tile_b: array<array<${T.type.storage}, ${d}>, ${d}>;
  ${v.mainStart([d,d,1])}
    let tile_col_start = (workgroup_index % uniforms.num_tile_n) * ${d};
    let tile_row_start = (workgroup_index / uniforms.num_tile_n) * ${d};
    let num_tiles = (uniforms.K - 1) / ${d} + 1;
    var k_start = 0u;
    var value = ${E.type.value}(0);
    for (var t: u32 = 0u; t < num_tiles; t++) {
      ${W}
      k_start = k_start + ${d};
      workgroupBarrier();

      for (var k: u32 = 0u; k < ${d}; k++) {
        ${B}
      }
      workgroupBarrier();
    }

    ${G}
    let m = tile_row_start + local_id.y;
    let n = tile_col_start + local_id.x;
    ${S!=null?`let cOffset = ${S.broadcastedIndicesToOffset("vec2(m, n)",E)}; value += ${E.type.value}(uniforms.beta) * ${S.getByOffset("cOffset")};`:""}
    if (m < uniforms.M && n < uniforms.N) {
      output[m * uniforms.N + n] = value;
    }
  }`};return f?{name:"GemmShared",shaderCache:{hint:`${t.cacheKey}`,inputDependencies:w},getRunData:()=>({outputs:[{dims:l,dataType:e[0].dataType}],dispatchGroup:{x:p*g},programUniforms:_}),getShaderSource:k}:{name:"Gemm",shaderCache:{hint:`${t.cacheKey}`,inputDependencies:w},getRunData:()=>({outputs:[{dims:l,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(y/64)},programUniforms:_}),getShaderSource:b}},yh=e=>{let t=e.transA,r=e.transB,a=e.alpha,s=e.beta;return{transA:t,transB:r,alpha:a,beta:s,cacheKey:`${e.transA};${e.transB};${e.alpha===1}`}},_h=(e,t)=>{pl(e.inputs),e.compute(cl(e.inputs,t))}}),et,nt,$t,vt,hl,fl,ml,gl,yl,_l,wl,bl,wh,bh,Py=q(()=>{Y(),oe(),ke(),ue(),[et,nt,$t,vt]=[0,1,2,3],hl=e=>{if(e[0].dims.length!==4)throw new Error("only 4-D tensor is supported.");if(e[0].dims.length!==e[1].dims.length)throw new Error("input dimensions must be equal to grid dimensions");if(e[0].dims.length-2!==e[1].dims[e[1].dims.length-1])throw new Error(`last dimension of grid must be equal to ${e[0].dims.length-2}`);if(e[0].dims[0]!==e[1].dims[0])throw new Error("grid batch size must match input batch size")},fl=`
  fn gs_get_cubic_coeffs(x: f32) -> vec4<f32> {
    let cubic_alpha = -0.75f;
    let x_abs = abs(x);
    var coeffs: vec4<f32>;
    coeffs[0] = (((cubic_alpha * (x_abs + 1) - 5 * cubic_alpha) * (x_abs + 1) + 8 * cubic_alpha) * (x_abs + 1) - 4 * cubic_alpha);
    coeffs[1] = (((cubic_alpha + 2) * x_abs - (cubic_alpha + 3)) * x_abs * x_abs + 1);
    coeffs[2] = (((cubic_alpha + 2) * (1 - x_abs) - (cubic_alpha + 3)) * (1 - x_abs) * (1 - x_abs) + 1);
    coeffs[3] = (((cubic_alpha * (2 - x_abs) - 5 * cubic_alpha) * (2 - x_abs) + 8 * cubic_alpha) * (2 - x_abs) - 4 * cubic_alpha);
    return coeffs;
  }
`,ml=e=>`
  fn gs_bicubic_interpolate(p: mat4x4<${e}>, x: f32, y: f32) -> ${e} {
    var v: vec4<f32>;
    var coeffs = gs_get_cubic_coeffs(x);
    for (var i = 0; i < 4; i++) {
      v[i] = coeffs[0] * p[i][0] + coeffs[1] * p[i][1] + coeffs[2] * p[i][2] + coeffs[3] * p[i][3];
    }
    coeffs = gs_get_cubic_coeffs(y);
    let pixel = ${e}(coeffs[0] * v[0] + coeffs[1] * v[1] + coeffs[2] * v[2] + coeffs[3] * v[3]);
    return pixel;
  }
`,gl=e=>`
  fn gs_denormalize(n: f32, length: i32) -> f32 {
    ${e.alignCorners===0?`
    // alignCorners: false => [-1, 1] to [-0.5, length - 0.5]
    return ((n + 1.0) * f32(length) - 1.0) / 2.0;
    `:`
    // alignCorners: true => [-1, 1] to [0, length - 1]
    return (n + 1.0) / 2.0 * (f32(length - 1));
    `}
  }
`,yl=e=>`
  ${e.paddingMode==="reflection"?`
      fn gs_reflect(x: i32, x_min: f32, x_max: f32) -> u32 {
        var dx = 0.0;
        var fx = f32(x);
        let range = x_max - x_min;
        if (fx < x_min) {
          dx = x_min - fx;
          let n = u32(dx / range);
          let r = dx - f32(n) * range;
          if (n % 2 == 0) {
            fx = x_min + r;
          } else {
            fx = x_max - r;
          }
        } else if (fx > x_max) {
          dx = fx - x_max;
          let n = u32(dx / range);
          let r = dx - f32(n) * range;
          if (n % 2 == 0) {
            fx = x_max - r;
          } else {
            fx = x_min + r;
          }
        }
        return u32(fx);
      }`:""}
`,_l=(e,t,r)=>`
  fn pixel_at_grid(r: i32, c: i32, H: i32, W: i32, batch: u32, channel: u32, border: vec4<f32>) -> ${t} {
     var pixel = ${t}(0);
     var indices = vec4<u32>(0);
     indices[${et}] = batch;
     indices[${nt}] = channel;`+(()=>{switch(r.paddingMode){case"zeros":return`
          if (r >= 0 && r < H && c >=0 && c < W) {
            indices[${$t}] = u32(r);
            indices[${vt}] = u32(c);
          }
        `;case"border":return`
          indices[${$t}] = u32(clamp(r, 0, H - 1));
          indices[${vt}] = u32(clamp(c, 0, W - 1));
        `;case"reflection":return`
          indices[${$t}] = gs_reflect(r, border[1], border[3]);
          indices[${vt}] = gs_reflect(c, border[0], border[2]);
        `;default:throw new Error(`padding mode ${r.paddingMode} is not supported`)}})()+`
    return ${e.getByIndices("indices")};
  }
`,wl=(e,t,r)=>(()=>{switch(r.mode){case"nearest":return`
          let result = pixel_at_grid(i32(round(y)), i32(round(x)), H_in, W_in, indices[${et}], indices[${nt}], border);
        `;case"bilinear":return`
          let x1 = i32(floor(x));
          let y1 = i32(floor(y));
          let x2 = x1 + 1;
          let y2 = y1 + 1;

          let p11 = pixel_at_grid(y1, x1, H_in, W_in, indices[${et}], indices[${nt}], border);
          let p12 = pixel_at_grid(y1, x2, H_in, W_in, indices[${et}], indices[${nt}], border);
          let p21 = pixel_at_grid(y2, x1, H_in, W_in, indices[${et}], indices[${nt}], border);
          let p22 = pixel_at_grid(y2, x2, H_in, W_in, indices[${et}], indices[${nt}], border);

          let dx2 = ${t}(f32(x2) - x);
          let dx1 = ${t}(x - f32(x1));
          let dy2 = ${t}(f32(y2) - y);
          let dy1 = ${t}(y - f32(y1));
          let result = dy2 * (dx2 * p11 + dx1 * p12) + dy1 * (dx2 * p21 + dx1 * p22);
        `;case"bicubic":return`
          let x0 = i32(floor(x)) - 1;
          let y0 = i32(floor(y)) - 1;
          var p: mat4x4<${t}>;
          for (var h = 0; h < 4; h++) {
            for (var w = 0; w < 4; w++) {
              p[h][w] = pixel_at_grid(h + y0, w + x0, H_in, W_in, indices[${et}], indices[${nt}], border);
            }
          }

          let dx = x - f32(x0 + 1);
          let dy = y - f32(y0 + 1);
          let result = gs_bicubic_interpolate(p, dx, dy);
        `;default:throw new Error(`mode ${r.mode} is not supported`)}})()+`${e.setByOffset("global_idx","result")}`,bl=(e,t)=>{let r=M("x",e[0].dataType,e[0].dims.length),a=[e[1].dims[0],e[1].dims[1],e[1].dims[2]],s=M("grid",e[1].dataType,a.length,2),i=[e[0].dims[0],e[0].dims[1],e[1].dims[1],e[1].dims[2]];t.format==="NHWC"&&(i=[e[0].dims[0],e[1].dims[1],e[1].dims[2],e[0].dims[3]],[et,nt,$t,vt]=[0,3,1,2]);let o=j("output",e[0].dataType,i.length),l=r.type.value,d=O.size(i),p=[{type:12,data:d},...Q(e[0].dims,a,i)],g=f=>`
  ${f.registerUniform("output_size","u32").declareVariables(r,s,o)}
  ${fl}
  ${ml(l)}
  ${gl(t)}
  ${yl(t)}
  ${_l(r,l,t)}

  ${f.mainStart()}
    ${f.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let H_in = i32(uniforms.x_shape[${$t}]);
      let W_in = i32(uniforms.x_shape[${vt}]);

      ${t.alignCorners===0?`
      let x_min = -0.5;
      let x_max = f32(W_in) - 0.5;
      let y_min = -0.5;
      let y_max = f32(H_in) - 0.5;
      `:`
      let x_min = 0.0;
      let x_max = f32(W_in) - 1.0;
      let y_min = 0.0;
      let y_max = f32(H_in) - 1.0;
      `};
      let border = vec4<f32>(x_min, y_min, x_max, y_max);

      let indices = ${o.offsetToIndices("global_idx")};
      var grid_indices = vec3<u32>(indices[${et}], indices[${$t}], indices[${vt}]);
      let nxy = ${s.getByIndices("grid_indices")};
      var x = gs_denormalize(f32(nxy[0]), W_in);
      var y = gs_denormalize(f32(nxy[1]), H_in);

      ${wl(o,l,t)}
  }`;return{name:"GridSample",shaderCache:{hint:`${t.cacheKey}`,inputDependencies:["type","type"]},getRunData:f=>{let y=O.size(i);return{outputs:[{dims:i,dataType:f[0].dataType}],dispatchGroup:{x:Math.ceil(y/64)},programUniforms:p}},getShaderSource:g}},wh=(e,t)=>{hl(e.inputs),e.compute(bl(e.inputs,t))},bh=e=>_e({alignCorners:e.align_corners,mode:e.mode,paddingMode:e.padding_mode,format:e.format})}),Oe,$l,$h,qi,vl,sr,vh,xh=q(()=>{Y(),oe(),ke(),Pa(),qa(),ue(),yt(),Oe=(e,t)=>e.length>t&&e[t].dims.length>0?e[t]:void 0,$l=(e,t)=>{let r=e[0],a=Oe(e,1),s=Oe(e,2),i=Oe(e,3),o=Oe(e,4),l=Oe(e,5),d=Oe(e,6),p=Oe(e,7);if(r.dims.length!==3&&r.dims.length!==5)throw new Error("Input query is expected to have 3 or 5 dimensions");let g=r.dims[0],f=r.dims[1],y=r.dims.length===3?r.dims[2]:t.numHeads*r.dims[4],_=f,w=0,b=0,k=Math.floor(y/t.numHeads);if(d&&p&&O.size(d.dims)&&O.size(p.dims)){if(d.dims.length!==4)throw new Error('Input "past_key" is expected to have 4 dimensions');if(d.dims[0]!==g||d.dims[1]!==t.numHeads||d.dims[3]!==k)throw new Error('Input "past_key" shape (batch_size, num_heads, past_sequence_length, head_size)');if(p.dims[0]!==g||p.dims[1]!==t.numHeads||p.dims[3]!==k)throw new Error('Input "past_value" shape (batch_size, num_heads, past_sequence_length, head_size)');if(d.dims[2]!==p.dims[2])throw new Error('Input "past_key" and "past_value" shall have same dim 2 (past_sequence_length)');if(p.dims.length!==4)throw new Error('Input "past_value" is expected to have 4 dimensions');w=d.dims[2],b=d.dims[2]}else if(d&&O.size(d.dims)||p&&O.size(p.dims))throw new Error('Input "past_key" and "past_value" shall be both present or both absent');let v;if(a&&O.size(a.dims)>0){if(r.dims.length!==3)throw new Error('Input "query" is expected to have 3 dimensions when key is given');if(a.dims.length<3||a.dims.length>5)throw new Error('Input "key" is expected to have 3, 4, or 5 dimensions');if(r.dims[0]!==a.dims[0])throw new Error('Input "query" and "key" shall have same dim 0 (batch size)');if(a.dims.length===3){if(a.dims[2]!==r.dims[2])throw new Error('Input "query" and "key" shall have same dim 2 (hidden_size)');v=2,_=a.dims[1]}else if(a.dims.length===5){if(a.dims[2]!==t.numHeads||a.dims[3]!==2||a.dims[4]!==k)throw new Error('Expect "key" shape (batch_size, kv_sequence_length, num_heads, 2, head_size) for packed kv');if(s)throw new Error('Expect "value" be none when "key" has packed kv format.');v=5,_=a.dims[1]}else{if(a.dims[1]!==t.numHeads||a.dims[3]!==k)throw new Error('Expect "key" shape (batch_size, num_heads, kv_sequence_length, head_size) for past_key');v=0,_=a.dims[2]}}else{if(r.dims.length!==5)throw new Error('Input "query" is expected to have 5 dimensions when key is empty');if(r.dims[2]!==t.numHeads||r.dims[3]!==3)throw new Error('Expect "query" shape (batch_size, kv_sequence_length, num_heads, 3, head_size) for packed kv');v=3}if(i&&O.size(i.dims)>0){if(i.dims.length!==1)throw new Error('Input "bias" is expected to have 1 dimension');if(a&&a.dims.length===5&&a.dims[3]===2)throw new Error("bias is not allowed for packed kv.")}let $=w+_,T=0;if(o&&O.size(o.dims)>0){T=8;let z=o.dims;throw z.length===1?z[0]===g?T=1:z[0]===3*g+2&&(T=3):z.length===2&&z[0]===g&&z[1]===$&&(T=5),T===8?new Error('Input "key_padding_mask" shape shall be (batch_size) or (batch_size, total_sequence_length)'):new Error("Mask not supported")}let S=!1,C=y;if(s&&O.size(s.dims)>0){if(s.dims.length!==3&&s.dims.length!==4)throw new Error('Input "value" is expected to have 3 or 4 dimensions');if(r.dims[0]!==s.dims[0])throw new Error('Input "query" and "value" shall have same dim 0 (batch_size)');if(s.dims.length===3){if(_!==s.dims[1])throw new Error('Input "key" and "value" shall have the same dim 1 (kv_sequence_length)');C=s.dims[2]}else{if(_!==s.dims[2])throw new Error('Input "key" and "value" shall have the same dim 2 (kv_sequence_length)');C=s.dims[1]*s.dims[3],S=!0}}let E=!1;if(o&&O.size(o.dims)>0)throw new Error("Key padding mask is not supported");if(l&&O.size(l.dims)>0){if(l.dims.length!==4)throw new Error('Input "attention_bias" is expected to have 4 dimensions');if(l.dims[0]!==g||l.dims[1]!==t.numHeads||l.dims[2]!==f||l.dims[3]!==$)throw new Error('Expect "attention_bias" shape (batch_size, num_heads, sequence_length, total_sequence_length)')}return{batchSize:g,sequenceLength:f,pastSequenceLength:w,kvSequenceLength:_,totalSequenceLength:$,maxSequenceLength:b,inputHiddenSize:0,hiddenSize:y,vHiddenSize:C,headSize:k,vHeadSize:Math.floor(C/t.numHeads),numHeads:t.numHeads,isUnidirectional:!1,pastPresentShareBuffer:!1,maskFilterValue:t.maskFilterValue,maskType:T,scale:t.scale,broadcastResPosBias:E,passPastInKv:S,qkvFormat:v}},$h=e=>_e({...e}),qi=_e({perm:[0,2,1,3]}),vl=(e,t,r,a,s,i,o)=>{let l=[a,s,i],d=O.size(l),p=[{type:12,data:d},{type:12,data:o},{type:12,data:i}],g=f=>{let y=j("qkv_with_bias",t.dataType,l),_=M("qkv",t.dataType,l),w=M("bias",r.dataType,l),b=[{name:"output_size",type:"u32"},{name:"bias_offset",type:"u32"},{name:"hidden_size",type:"u32"}];return`
  ${f.registerUniforms(b).declareVariables(_,w,y)}
  ${f.mainStart()}
    ${f.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let bias_offset_idx = (global_idx % uniforms.hidden_size) + uniforms.bias_offset;

    qkv_with_bias[global_idx] = qkv[global_idx] + bias[bias_offset_idx];
  }`};return e.compute({name:"MultiHeadAttentionAddBias",shaderCache:{inputDependencies:["type","type"]},getRunData:()=>({outputs:[{dims:l,dataType:t.dataType,gpuDataType:0}],dispatchGroup:{x:Math.ceil(d/64)},programUniforms:p}),getShaderSource:g},{inputs:[t,r],outputs:[-1]})[0]},sr=(e,t,r,a,s,i,o,l)=>{let d=i;if(o&&O.size(o.dims)>0){if(a===1)throw new Error("AddBiasReshape is not implemented. Please export your model with packed QKV or KV");return d=vl(e,i,o,t,a,r*s,l),d=d.reshape([t,a,r,s]),r===1||a===1?d:e.compute(Pe(d,qi.perm),{inputs:[d],outputs:[-1]})[0]}else return i.dims.length===3&&(d=i.reshape([t,a,r,s])),r===1||a===1?d:e.compute(Pe(d,qi.perm),{inputs:[d],outputs:[-1]})[0]},vh=(e,t)=>{let r=$l(e.inputs,t),a=e.inputs[0],s=Oe(e.inputs,1),i=Oe(e.inputs,2),o=Oe(e.inputs,3),l=Oe(e.inputs,4),d=Oe(e.inputs,5),p=Oe(e.inputs,6),g=Oe(e.inputs,7);if(a.dims.length===5)throw new Error("Packed QKV is not implemented");if((s==null?void 0:s.dims.length)===5)throw new Error("Packed KV is not implemented");let f=s&&i&&s.dims.length===4&&i.dims.length===4,y=sr(e,r.batchSize,r.numHeads,r.sequenceLength,r.headSize,a,o,0);if(f)return ur(e,y,s,i,l,void 0,p,g,d,r);if(!s||!i)throw new Error("key and value must be provided");let _=sr(e,r.batchSize,r.numHeads,r.kvSequenceLength,r.headSize,s,o,r.hiddenSize),w=sr(e,r.batchSize,r.numHeads,r.kvSequenceLength,r.vHeadSize,i,o,2*r.hiddenSize);ur(e,y,_,w,l,void 0,p,g,d,r)}}),xl,kl,Sl,Tl,va,kh,Sh,Th=q(()=>{Y(),oe(),ke(),ue(),xl=e=>{if(!e||e.length<1)throw new Error("too few inputs")},kl=(e,t)=>{let r=[],a=t.numOutputs;return e[1].dims[0]>0&&(e[1].getBigInt64Array().forEach(s=>r.push(Number(s))),a=r.length),_e({numOutputs:a,axis:t.axis,splitSizes:r})},Sl=e=>`
fn calculateOutputIndex(index: u32) -> u32 {
    for (var i: u32 = 0u; i < ${e}u; i += 1u ) {
    if (index < ${K("uniforms.size_in_split_axis","i",e)}) {
        return i;
    }
    }
    return ${e}u;
}`,Tl=e=>{let t=e.length,r=[];for(let a=0;a<t;++a){let s=e[a].setByIndices("indices","input[global_idx]");t===1?r.push(s):a===0?r.push(`if (output_number == ${a}u) { ${s} }`):a===t-1?r.push(`else { ${s} }`):r.push(`else if (output_number == ${a}) { ${s} }`)}return`
      fn writeBufferData(output_number: u32, indices: ${e[0].type.indices}, global_idx: u32) {
        ${r.join(`
`)}
      }`},va=(e,t)=>{let r=e[0].dims,a=O.size(r),s=e[0].dataType,i=O.normalizeAxis(t.axis,r.length),o=new Array(t.numOutputs),l=M("input",s,r.length),d=new Array(t.numOutputs),p=[],g=[],f=0,y=[{type:12,data:a}];for(let w=0;w<t.numOutputs;w++){f+=t.splitSizes[w],d[w]=f;let b=r.slice();b[i]=t.splitSizes[w],g.push(b),o[w]=j(`output${w}`,s,b.length),p.push({dims:g[w],dataType:e[0].dataType})}y.push({type:12,data:d},...Q(r,...g));let _=w=>`
  ${w.registerUniform("input_size","u32").registerUniform("size_in_split_axis","u32",d.length).declareVariables(l,...o)}
  ${Sl(d.length)}
  ${Tl(o)}

  ${w.mainStart()}
    ${w.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.input_size")}

    var indices = ${l.offsetToIndices("global_idx")};
    var index = ${l.indicesGet("indices",i)};
    let output_number = calculateOutputIndex(index);
    if (output_number != 0) {
      index -= ${K("uniforms.size_in_split_axis","output_number - 1u",d.length)};
      ${l.indicesSet("indices",i,"index")};
    }
    writeBufferData(output_number, indices, global_idx);
  }`;return{name:"Split",shaderCache:{hint:t.cacheKey,inputDependencies:["rank"]},getShaderSource:_,getRunData:()=>({outputs:p,dispatchGroup:{x:Math.ceil(a/64)},programUniforms:y})}},kh=(e,t)=>{xl(e.inputs);let r=e.inputs.length===1?t:kl(e.inputs,t);e.compute(va(e.inputs,r),{inputs:[0]})},Sh=e=>{let t=e.axis,r=e.splitSizes,a=e.numOutputs<0?r.length:e.numOutputs;if(a!==r.length)throw new Error("numOutputs and splitSizes lengh must be equal");return _e({axis:t,numOutputs:a,splitSizes:r})}}),Cl,Il,Vi,Ch,Uy=q(()=>{ke(),qa(),xh(),Th(),yt(),Cl=(e,t)=>{if(t.doRotary)throw new Error("GroupQuerryAttention do_rotary attribute is not supported");if(t.doRotary&&e.length<=7)throw new Error("cos_cache and sin_cache inputs are required if do_rotary is specified");let r=e[0],a=e[1],s=e[2],i=e[3],o=e[4];if(t.localWindowSize!==-1)throw new Error("Local attention is not supported");if(t.softcap!==0)throw new Error("Softcap is not supported");if(t.rotaryInterleaved!==0)throw new Error("Rotary interleaved is not supported");if(t.smoothSoftmax)throw new Error("Smooth softmax is not supported");if(r.dims.length!==3&&r.dims.length!==5)throw new Error("Input query is expected to have 3 or 5 dimensions");let l=!1,d=r.dims[0],p=r.dims[1],g=r.dims.length===3?l?r.dims[2]/3:r.dims[2]:t.numHeads*r.dims[4],f=p,y=0,_=!a||a.dims.length===0,w=Math.floor(_?g/(t.numHeads+2*t.kvNumHeads):g/t.numHeads);_&&(g=w*t.numHeads);let b=i&&i.dims.length!==0,k=o&&o.dims.length!==0;if(b&&i.dims.length===4&&i.dims[0]===d&&i.dims[1]!==t.kvNumHeads&&i.dims[2]===t.kvNumHeads&&i.dims[3]===w)throw new Error("BSNH pastKey/pastValue is not supported");if(b&&k){if(i.dims.length!==4)throw new Error('Input "past_key" is expected to have 4 dimensions');if(o.dims.length!==4)throw new Error('Input "past_value" is expected to have 4 dimensions');y=i.dims[2]}else if(b||k)throw new Error('Input "past_key" and "past_value" shall be both present or both absent');let v=1;if(a&&a.dims.length>0){if(r.dims.length!==3)throw new Error('Input "query" is expected to have 3 dimensions when key is given');if(a.dims.length<3||a.dims.length>5)throw new Error('Input "key" is expected to have 3, 4, or 5 dimensions');if(r.dims[0]!==a.dims[0])throw new Error('Input "query" and "key" shall have same dim 0 (batch size)');if(a.dims.length===3){if(r.dims[2]%a.dims[2]!==0)throw new Error('Dimension 2 of "query" should be a multiple of "key"');f=a.dims[1]}else if(a.dims.length===5){if(a.dims[2]!==t.numHeads||a.dims[3]!==2||a.dims[4]!==w)throw new Error('Expect "key" shape (batch_size, kv_sequence_length, num_heads, 2, head_size) for packed kv');if(s)throw new Error('Expect "value" be none when "key" has packed kv format.');f=a.dims[1]}else{if(a.dims[1]!==t.numHeads||a.dims[3]!==w)throw new Error('Expect "key" shape (batch_size, num_heads, kv_sequence_length, head_size) for past_key');f=a.dims[2]}}else{if(r.dims.length!==3&&r.dims.length!==5)throw new Error('Input "query" is expected to have 3 or 5 dimensions when key is empty');if(r.dims.length===5&&(r.dims[2]!==t.numHeads||r.dims[3]!==3))throw new Error('Expect "query" shape (batch_size, kv_sequence_length, num_heads, 3, head_size) for packed kv');v=3}let $=0,T=!1,S=t.kvNumHeads?w*t.kvNumHeads:g;if(s&&s.dims.length>0){if(s.dims.length!==3&&s.dims.length!==4)throw new Error('Input "value" is expected to have 3 or 4 dimensions');if(r.dims[0]!==s.dims[0])throw new Error('Input "query" and "value" shall have same dim 0 (batch_size)');if(s.dims.length===3){if(f!==s.dims[1])throw new Error('Input "key" and "value" shall have the same dim 1 (kv_sequence_length)');S=s.dims[2]}else{if(f!==s.dims[2])throw new Error('Input "past_key" and "past_value" shall have the same dim 2 (kv_sequence_length)');S=s.dims[1]*s.dims[3],T=!0}}let C=e.length>4?e[5]:void 0;if(C&&C.dims.length!==1&&C.dims[0]!==d)throw new Error('Input "seqlens" is expected to have 1 dimension and the same dim 0 as batch_size');return{batchSize:d,sequenceLength:p,pastSequenceLength:y,kvSequenceLength:f,totalSequenceLength:-1,maxSequenceLength:-1,inputHiddenSize:0,hiddenSize:g,vHiddenSize:S,headSize:w,vHeadSize:Math.floor(S/t.kvNumHeads),numHeads:t.numHeads,kvNumHeads:t.kvNumHeads,nReps:t.numHeads/t.kvNumHeads,pastPresentShareBuffer:!1,maskType:$,scale:t.scale,broadcastResPosBias:!1,passPastInKv:T,qkvFormat:v}},Il=_e({perm:[0,2,1,3]}),Vi=(e,t,r)=>{let a=t,s=r.kvNumHeads;return t.dims.length===3&&r.kvSequenceLength!==0&&(a=t.reshape([r.batchSize,r.kvSequenceLength,s,r.headSize]),a=e.compute(Pe(a,Il.perm),{inputs:[a],outputs:[-1]})[0]),a},Ch=(e,t)=>{var k;let r=Cl(e.inputs,t);if(e.inputs[0].dims.length===5)throw new Error("Packed QKV is not implemented");if(((k=e.inputs[1])==null?void 0:k.dims.length)===5)throw new Error("Packed KV is not implemented");let a=e.inputs[0],s=e.inputs[1]&&e.inputs[1].dims.length>0?e.inputs[1]:void 0,i=e.inputs[2]&&e.inputs[2].dims.length>0?e.inputs[2]:void 0,o=e.inputs[3]&&e.inputs[3].dims.length!==0?e.inputs[3]:void 0,l=e.inputs[4]&&e.inputs[4].dims.length!==0?e.inputs[4]:void 0,d=e.inputs.length>4?e.inputs[5]:void 0,p=e.inputs.length>5?e.inputs[6]:void 0,g=r.kvNumHeads?r.kvNumHeads:r.numHeads,f=_e({axis:2,numOutputs:3,splitSizes:[r.numHeads*r.headSize,g*r.headSize,g*r.headSize]}),[y,_,w]=!s&&!i?e.compute(va([a],f),{inputs:[a],outputs:[-1,-1,-1]}):[a,s,i],b=sr(e,r.batchSize,r.numHeads,r.sequenceLength,r.headSize,y,void 0,0);ur(e,b,Vi(e,_,r),Vi(e,w,r),void 0,void 0,o,l,void 0,r,d,p)}}),Li,El,zl,Ih,Wy=q(()=>{Y(),oe(),yt(),ue(),Li=(e,t,r,a,s,i,o,l)=>{let d=xe(i),p=d===1?"f32":`vec${d}f`,g=d===1?"vec2f":`mat2x${d}f`,f=s*o,y=64;f===1&&(y=256);let _=[s,o,i/d],w=[s,o,2],b=["rank","type","type"],k=[];k.push(...Q(_,w));let v=$=>{let T=M("x",t.dataType,3,d),S=M("scale",r.dataType,r.dims),C=M("bias",a.dataType,a.dims),E=j("output",1,3,2),z=[T,S,C,E];return`
  var<workgroup> workgroup_shared : array<${g}, ${y}>;
  const workgroup_size = ${y}u;
  ${$.declareVariables(...z)}
  ${$.mainStart(y)}
    let batch = workgroup_index / uniforms.x_shape[1];
    let channel = workgroup_index % uniforms.x_shape[1];
    let hight = uniforms.x_shape[2];
    // initialize workgroup memory
    var sum = ${p}(0);
    var squared_sum = ${p}(0);
    for (var h = local_idx; h < hight; h += workgroup_size) {
      let value = ${p}(${T.get("batch","channel","h")});
      sum += value;
      squared_sum += value * value;
    }
    workgroup_shared[local_idx] = ${g}(sum, squared_sum);
    workgroupBarrier();

    for (var currSize = workgroup_size >> 1;  currSize > 0; currSize = currSize >> 1) {
      if (local_idx < currSize) {
        workgroup_shared[local_idx] = workgroup_shared[local_idx] + workgroup_shared[local_idx + currSize];
      }
      workgroupBarrier();
    }
    if (local_idx == 0) {
      let sum_final = ${gt("workgroup_shared[0][0]",d)} / f32(hight * ${d});
      let squared_sum_final = ${gt("workgroup_shared[0][1]",d)} / f32(hight * ${d});

      let inv_std_dev = inverseSqrt(squared_sum_final - sum_final * sum_final + f32(${l}));
      let channel_scale = inv_std_dev * f32(scale[channel]);
      let channel_shift = f32(bias[channel]) - sum_final * channel_scale;
      output[workgroup_index] = vec2f(channel_scale, channel_shift);
    }
  }`};return e.compute({name:"InstanceNormComputeChannelScaleShift",shaderCache:{hint:`${d};${l};${y}`,inputDependencies:b},getRunData:()=>({outputs:[{dims:w,dataType:1}],dispatchGroup:{x:f},programUniforms:k}),getShaderSource:v},{inputs:[t,r,a],outputs:[-1]})[0]},El=(e,t,r)=>{let a=t[0].dims,s=a,i=2,o=a[0],l=a[1],d=O.sizeFromDimension(a,i),p=xe(d),g=O.size(s)/p,f=Li(e,t[0],t[1],t[2],o,d,l,r.epsilon),y=[o,l,d/p],_=[o,l],w=["type","none"],b=k=>{let v=M("x",t[0].dataType,y.length,p),$=M("scale_shift",1,_.length,2),T=j("output",t[0].dataType,y.length,p),S=[v,$,T];return`
  ${k.registerUniform("output_size","u32").declareVariables(...S)}
  ${k.mainStart()}
  ${k.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let outputIndices = ${T.offsetToIndices("global_idx")};
      let batch = outputIndices[0];
      let channel = outputIndices[1];
      let scale_shift = ${$.getByIndices("vec2<u32>(batch, channel)")};
      let value = ${v.getByOffset("global_idx")} * ${T.type.value}(scale_shift.x) + ${T.type.value}(scale_shift.y);
      ${T.setByOffset("global_idx","value")};
  }`};e.compute({name:"InstanceNormalization",shaderCache:{hint:`${p}`,inputDependencies:w},getRunData:()=>({outputs:[{dims:s,dataType:t[0].dataType}],dispatchGroup:{x:Math.ceil(g/64)},programUniforms:[{type:12,data:g},...Q(y,_,y)]}),getShaderSource:b},{inputs:[t[0],f]})},zl=(e,t,r)=>{let a=t[0].dims,s=a,i=a[0],o=a[a.length-1],l=O.sizeFromDimension(a,1)/o,d=xe(o),p=O.size(s)/d,g=[{type:12,data:l},{type:12,data:Math.floor(o/d)}],f=["type","type"],y=!1,_=[0,a.length-1];for(let v=0;v<a.length-2;v++)y=y||a[v+1]!==1,_.push(v+1);y=y&&a[a.length-1]!==1;let w=y?e.compute(Pe(e.inputs[0],_),{inputs:[e.inputs[0]],outputs:[-1]})[0]:e.inputs[0].reshape(Array.from({length:a.length},(v,$)=>a[_[$]])),b=Li(e,w,t[1],t[2],i,l,o,r.epsilon),k=v=>{let $=Ie(t[0].dataType),T=d===1?"vec2f":`mat${d}x2f`,S=z=>{let B=z===0?"x":"y",W=d===1?"f32":`vec${d}f`;switch(d){case 1:return`${$}(${W}(scale.${B}))`;case 2:return`vec2<${$}>(${W}(scale[0].${B}, scale[1].${B}))`;case 4:return`vec4<${$}>(${W}(scale[0].${B}, scale[1].${B}, scale[2].${B}, scale[3].${B}))`;default:throw new Error(`Not supported compoents ${d}`)}},C=M("input",t[0].dataType,t[0].dims,d),E=j("output",t[0].dataType,s,d);return`
  @group(0) @binding(0) var<storage, read> input : array<${C.type.storage}>;
  @group(0) @binding(1) var<storage, read> scale_input : array<${T}>;
  @group(0) @binding(2) var<storage, read_write> output : array<${E.type.storage}>;
  struct Uniforms {H: u32, C : u32};
  @group(0) @binding(3) var<uniform> uniforms: Uniforms;

  ${v.mainStart()}
    let current_image_number = global_idx / (uniforms.C * uniforms.H);
    let current_channel_number = global_idx % uniforms.C;

    let scale_offset = current_image_number * uniforms.C + current_channel_number;
    let scale = scale_input[scale_offset];
    output[global_idx] = fma(input[global_idx], ${S(0)}, ${S(1)});
  }`};e.compute({name:"InstanceNormalizationNHWC",shaderCache:{hint:`${d}`,inputDependencies:f},getRunData:()=>({outputs:[{dims:s,dataType:t[0].dataType}],dispatchGroup:{x:Math.ceil(p/64)},programUniforms:g}),getShaderSource:k},{inputs:[t[0],b]})},Ih=(e,t)=>{t.format==="NHWC"?zl(e,e.inputs,t):El(e,e.inputs,t)}}),Al,Ol,Eh,qy=q(()=>{Y(),oe(),ue(),Al=e=>{if(!e||e.length<2)throw new Error("layerNorm requires at least 2 inputs.")},Ol=(e,t,r)=>{let a=t.simplified,s=e[0].dims,i=e[1],o=!a&&e[2],l=s,d=O.normalizeAxis(t.axis,s.length),p=O.sizeToDimension(s,d),g=O.sizeFromDimension(s,d),f=O.size(i.dims),y=o?O.size(o.dims):0;if(f!==g||o&&y!==g)throw new Error(`Size of X.shape()[axis:] == ${g}.
       Size of scale and bias (if provided) must match this.
       Got scale size of ${f} and bias size of ${y}`);let _=[];for(let C=0;C<s.length;++C)C<d?_.push(s[C]):_.push(1);let w=xe(g),b=["type","type"],k=[{type:12,data:p},{type:1,data:g},{type:12,data:Math.floor(g/w)},{type:1,data:t.epsilon}];o&&b.push("type");let v=r>1,$=r>2,T=C=>{let E=Ie(e[0].dataType),z=[M("x",e[0].dataType,e[0].dims,w),M("scale",i.dataType,i.dims,w)];o&&z.push(M("bias",o.dataType,o.dims,w)),z.push(j("output",e[0].dataType,l,w)),v&&z.push(j("mean_data_output",1,_)),$&&z.push(j("inv_std_output",1,_));let B=[{name:"norm_count",type:"u32"},{name:"norm_size",type:"f32"},{name:"norm_size_vectorized",type:"u32"},{name:"epsilon",type:"f32"}];return`
  ${C.registerUniforms(B).declareVariables(...z)}
  ${C.mainStart()}
    ${C.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.norm_count")}
    let offset = global_idx * uniforms.norm_size_vectorized;
    var mean_vector = ${ha("f32",w)};
    var mean_square_vector = ${ha("f32",w)};

    for (var h: u32 = 0u; h < uniforms.norm_size_vectorized; h++) {
      let value = ${Pt(E,w,"x[h + offset]")};
      mean_vector += value;
      mean_square_vector += value * value;
    }
    let mean = ${gt("mean_vector",w)} / uniforms.norm_size;
    let inv_std_dev = inverseSqrt(${gt("mean_square_vector",w)} / uniforms.norm_size ${a?"":"- mean * mean"} + uniforms.epsilon);

    for (var j: u32 = 0; j < uniforms.norm_size_vectorized; j++) {
      let f32input = ${Pt(E,w,"x[j + offset]")};
      let f32scale = ${Pt(E,w,"scale[j]")};
      output[j + offset] = ${z[0].type.value}((f32input ${a?"":"- mean"}) * inv_std_dev * f32scale
        ${o?`+ ${Pt(E,w,"bias[j]")}`:""}
      );
    }

    ${v?"mean_data_output[global_idx] = mean":""};
    ${$?"inv_std_output[global_idx] = inv_std_dev":""};
  }`},S=[{dims:l,dataType:e[0].dataType}];return v&&S.push({dims:_,dataType:1}),$&&S.push({dims:_,dataType:1}),{name:"LayerNormalization",shaderCache:{hint:`${w};${r};${a}`,inputDependencies:b},getRunData:()=>({outputs:S,dispatchGroup:{x:Math.ceil(p/64)},programUniforms:k}),getShaderSource:T}},Eh=(e,t)=>{Al(e.inputs),e.compute(Ol(e.inputs,t,e.outputCount))}}),Rl,zh,Vy=q(()=>{oe(),Fa(),ja(),Rl=e=>{if(!e||e.length!==2)throw new Error("MatMul requires 2 inputs.");if(e[0].dims[e[0].dims.length-1]!==e[1].dims[e[1].dims.length-2])throw new Error("shared dimension does not match.")},zh=e=>{Rl(e.inputs);let t=Ut.calcShape(e.inputs[0].dims,e.inputs[1].dims,!0);if(!t)throw new Error("Can't use matmul on the given tensors");let r=t[t.length-1],a=e.inputs[0].dims[e.inputs[0].dims.length-1];if(r<8&&a<8)e.compute(Ha(e.inputs,{activation:""},t));else{let s=t[t.length-2],i=O.size(e.inputs[0].dims.slice(0,-2)),o=O.size(e.inputs[1].dims.slice(0,-2));if(i!==1&&s===1&&o===1){let l=e.inputs[0].reshape([1,i,a]),d=e.inputs[1].reshape([1,a,r]),p=[1,i,r],g=[l,d];e.compute(Lr(g,{activation:""},t,p),{inputs:g})}else e.compute(Lr(e.inputs,{activation:""},t))}}}),Bl,Ml,Nl,Ah,Oh,Ly=q(()=>{Y(),oe(),ke(),ue(),Bl=(e,t)=>{if(e.length<3||e.length>4)throw new Error("MatMulNBits requires 3 or 4 inputs");let r=e[0],a=r.dims.length;if(r.dims[a-1]!==t.k)throw new Error("The last dim of input shape does not match the k value");let s=Math.floor((t.k+t.blockSize-1)/t.blockSize),i=t.blockSize/8*t.bits,o=e[1];if(!O.areEqual(o.dims,[t.n,s,i]))throw new Error("The second inputs must be 3D tensor with shape N X nBlocksPerCol X blobSize");let l=e[2].dims;if(O.size(l)!==t.n*s)throw new Error("scales input size error.");if(e.length===4){let d=e[3].dims,p=t.bits>4?t.n*s:t.n*Math.floor((s+1)/2);if(O.size(d)!==p)throw new Error("zeroPoints input size error.")}},Ml=(e,t)=>{let r=e[0].dims,a=r.length,s=r[a-2],i=t.k,o=t.n,l=r.slice(0,a-2),d=O.size(l),p=e[1].dims[2]/4,g=e[0].dataType,f=xe(t.k),y=xe(p),_=xe(o),w=l.concat([s,o]),b=s>1&&o/_%2===0?2:1,k=O.size(w)/_/b,v=64,$=[],T=[d,s,i/f],S=O.convertShape(e[1].dims).slice();S.splice(-1,1,p/y),$.push(...Q(T)),$.push(...Q(S)),$.push(...Q(e[2].dims)),e.length===4&&$.push(...Q(O.convertShape(e[3].dims)));let C=[d,s,o/_];$.push(...Q(C));let E=z=>{let B=T.length,W=M("a",e[0].dataType,B,f),G=M("b",12,S.length,y),ee=M("scales",e[2].dataType,e[2].dims.length),ae=[W,G,ee],Z=e.length===4?M("zero_points",12,e[3].dims.length):void 0;Z&&ae.push(Z);let te=C.length,J=j("output",e[0].dataType,te,_),L=Ie(e[0].dataType),de=(()=>{switch(f){case 1:return`array<${L}, 8>`;case 2:return`mat4x2<${L}>`;case 4:return`mat2x4<${L}>`;default:throw new Error(`${f}-component is not supported.`)}})(),me=()=>{let N=`
          // reuse a data
            var input_offset = ${W.indicesToOffset(`${W.type.indices}(batch, row, word_offset)`)};
            var a_data: ${de};
            for (var j: u32 = 0; j < ${8/f}; j++) {
              a_data[j] = ${W.getByOffset("input_offset")};
              input_offset++;
            }
          `;for(let V=0;V<_*b;V++)N+=`
            b_value = ${y===1?`b${V}_data`:`b${V}_data[i]`};
            b_value_lower = unpack4xU8(b_value & b_mask);
            b_value_upper = unpack4xU8((b_value >> 4) & b_mask);
            b_quantized_values = ${de}(${Array.from({length:4},(le,be)=>`${L}(b_value_lower[${be}]), ${L}(b_value_upper[${be}])`).join(", ")});
            b_dequantized_values = ${f===1?`${de}(${Array.from({length:8},(le,be)=>`(b_quantized_values[${be}] - ${Z?`zero_point${V}`:"zero_point"}) * scale${V}`).join(", ")});`:`(b_quantized_values - ${de}(${Array(8).fill(`${Z?`zero_point${V}`:"zero_point"}`).join(",")})) * scale${V};`};
            workgroup_shared[local_id.x * ${b} + ${Math.floor(V/_)}]${_>1?`[${V%_}]`:""} += ${Array.from({length:8/f},(le,be)=>`${f===1?`a_data[${be}] * b_dequantized_values[${be}]`:`dot(a_data[${be}], b_dequantized_values[${be}])`}`).join(" + ")};
          `;return N},F=()=>{let N=`
            var col_index = col * ${_};
            ${Z?`
            let zero_point_bytes_per_col = (nBlocksPerCol + 1) / 2;
            var zero_point_byte_count: u32;
            var zero_point_word_index: u32;
            var zero_point_byte_offset: u32;
            let zero_point_nibble_offset: u32 = block & 0x1u;
            var zero_point_bits_offset: u32;
            var zero_point_word: u32;`:`
            // The default zero point is 8 for unsigned 4-bit quantization.
            let zero_point = ${L}(8);`}
            `;for(let V=0;V<_*b;V++)N+=`
            let scale${V} = ${ee.getByOffset("col_index * nBlocksPerCol + block")};
            ${Z?`
            zero_point_byte_count = col_index * zero_point_bytes_per_col + (block >> 0x1u);
            zero_point_word_index = zero_point_byte_count >> 0x2u;
            zero_point_byte_offset = zero_point_byte_count & 0x3u;
            zero_point_bits_offset = (zero_point_byte_offset << 3) + (zero_point_nibble_offset << 2);
            zero_point_word = ${Z.getByOffset("zero_point_word_index")} >> zero_point_bits_offset;
            let zero_point${V} = ${L}((zero_point_word) & 0xFu);`:""}
            col_index += 1;`;return N},ge=()=>{let N=`col_index = col * ${_};`;for(let V=0;V<_*b;V++)N+=`
            let b${V}_data = ${G.getByIndices(`${G.type.indices}(col_index, block, word)`)};
            col_index += 1;`;return N+=`
            var b_value: u32;
            let b_mask: u32 = 0x0F0F0F0Fu;
            var b_value_lower: vec4<u32>;
            var b_value_upper: vec4<u32>;
            var b_quantized_values: ${de};
            var b_dequantized_values: ${de};`,N};return`
        var<workgroup> workgroup_shared: array<${J.type.value}, ${b*v}>;
        ${z.declareVariables(...ae,J)}
        ${z.mainStart([v,1,1])}
          let output_indices = ${J.offsetToIndices(`(global_idx / ${v}) * ${b}`)};
          let col = output_indices[2];
          let row = output_indices[1];
          let batch = output_indices[0];
          let nBlocksPerCol = uniforms.b_shape[1];

          for (var block = local_id.x; block < nBlocksPerCol; block += ${v}) {
            //process one block
            var word_offset: u32 = block * ${t.blockSize/f};
            ${F()}
            for (var word: u32 = 0; word < ${p}; word += ${y}) {
              ${ge()}
              for (var i: u32 = 0; i < ${y}; i++) {
                ${me()}
                word_offset += ${8/f};
              }
            }
          }
          workgroupBarrier();

          if (local_id.x < ${b}) {
            var output_value: ${J.type.value} = ${J.type.value}(0);
            var workgroup_shared_offset: u32 = local_id.x;
            for (var b: u32 = 0u; b < ${v}u; b++) {
              output_value += workgroup_shared[workgroup_shared_offset];
              workgroup_shared_offset += ${b};
            }
            ${J.setByIndices(`${J.type.indices}(batch, row, col + local_id.x)`,"output_value")};
          }
        }`};return{name:"MatMulNBits",shaderCache:{hint:`${t.blockSize};${t.bits};${f};${y};${_};${b};${v}`,inputDependencies:Array(e.length).fill("rank")},getRunData:()=>({outputs:[{dims:w,dataType:g}],dispatchGroup:{x:k},programUniforms:$}),getShaderSource:E}},Nl=(e,t)=>{let r=e[0].dims,a=r.length,s=r[a-2],i=t.k,o=t.n,l=r.slice(0,a-2),d=O.size(l),p=e[1].dims[2]/4,g=e[0].dataType,f=xe(t.k),y=xe(p),_=l.concat([s,o]),w=128,b=o%8===0?8:o%4===0?4:1,k=w/b,v=k*y*8,$=v/f,T=v/t.blockSize,S=O.size(_)/b,C=[],E=[d,s,i/f],z=O.convertShape(e[1].dims).slice();z.splice(-1,1,p/y),C.push(...Q(E)),C.push(...Q(z)),C.push(...Q(e[2].dims)),e.length===4&&C.push(...Q(O.convertShape(e[3].dims)));let B=[d,s,o];C.push(...Q(B));let W=G=>{let ee=E.length,ae=M("a",e[0].dataType,ee,f),Z=M("b",12,z.length,y),te=M("scales",e[2].dataType,e[2].dims.length),J=[ae,Z,te],L=e.length===4?M("zero_points",12,e[3].dims.length):void 0;L&&J.push(L);let de=B.length,me=j("output",e[0].dataType,de),F=Ie(e[0].dataType),ge=()=>{switch(f){case 1:return`
          let a_data0 = vec4<${F}>(sub_a[word_offset], sub_a[word_offset + 1], sub_a[word_offset + 2], sub_a[word_offset + 3]);
          let a_data1 = vec4<${F}>(sub_a[word_offset + 4], sub_a[word_offset + 5], sub_a[word_offset + 6], sub_a[word_offset + 7]);`;case 2:return`
          let a_data0 = vec4<${F}>(sub_a[word_offset], sub_a[word_offset + 1]);
          let a_data1 = vec4<${F}>(sub_a[word_offset + 2], sub_a[word_offset + 3]);`;case 4:return`
          let a_data0 = sub_a[word_offset];
          let a_data1 = sub_a[word_offset + 1];`;default:throw new Error(`${f}-component is not supported.`)}};return`
        var<workgroup> sub_a: array<${ae.type.value}, ${$}>;
        var<workgroup> inter_results: array<array<${me.type.value}, ${k}>, ${b}>;
        ${G.declareVariables(...J,me)}
        ${G.mainStart([k,b,1])}
          let output_indices = ${me.offsetToIndices(`workgroup_index * ${b}`)};
          let col = output_indices[2];
          let row = output_indices[1];
          let batch = output_indices[0];
          let n_blocks_per_col = uniforms.b_shape[1];
          let num_tiles =  (n_blocks_per_col - 1) / ${T} + 1;

          // Loop over shared dimension.
          for (var tile: u32 = 0; tile < num_tiles; tile += 1) {
            let a_col_start = tile * ${$};
            // load one tile A data into shared memory.
            for (var a_offset = local_idx; a_offset < ${$}; a_offset += ${w})
            {
              let a_col = a_col_start + a_offset;
              if (a_col < uniforms.a_shape[2])
              {
                sub_a[a_offset] = ${ae.getByIndices(`${ae.type.indices}(batch, row, a_col)`)};
              } else {
                sub_a[a_offset] = ${ae.type.value}(0);
              }
            }
            workgroupBarrier();

            // each thread process one block
            let b_row = col + local_id.y;
            let block = tile * ${T} + local_id.x;
            ${L?`
            let zero_point_bytes_per_col = (n_blocks_per_col + 1) / 2;
            let zero_point_byte_count = b_row * zero_point_bytes_per_col + (block >> 0x1u);
            let zero_point_word_index = zero_point_byte_count >> 0x2u;
            let zero_point_byte_offset = zero_point_byte_count & 0x3u;
            let zero_point_nibble_offset: u32 = block & 0x1u;
            let zero_point_bits_offset = (zero_point_byte_offset << 3) + (zero_point_nibble_offset << 2);
            let zero_point_word = ${L.getByOffset("zero_point_word_index")} >> zero_point_bits_offset;
            let zero_point = ${F}((zero_point_word) & 0xFu);`:`
            // The default zero point is 8 for unsigned 4-bit quantization.
            let zero_point = ${F}(8);`}
            let scale = ${te.getByOffset("b_row * n_blocks_per_col + block")};
            let b_data = ${Z.getByIndices(`${Z.type.indices}(b_row, block, 0)`)};
            var word_offset = local_id.x * ${t.blockSize/f};
            for (var i: u32 = 0; i < ${y}; i++) {
              ${ge()}
              let b_value = ${y===1?"b_data":"b_data[i]"};
              let b_value_lower = unpack4xU8(b_value & 0x0F0F0F0Fu);
              let b_value_upper = unpack4xU8((b_value >> 4) & 0x0F0F0F0Fu);
              let b_quantized_values = mat2x4<${F}>(${Array.from({length:4},(N,V)=>`${F}(b_value_lower[${V}]), ${F}(b_value_upper[${V}])`).join(", ")});
              let b_dequantized_values = (b_quantized_values - mat2x4<${F}>(${Array(8).fill("zero_point").join(",")})) * scale;
              inter_results[local_id.y][local_id.x] += ${Array.from({length:2},(N,V)=>`${`dot(a_data${V}, b_dequantized_values[${V}])`}`).join(" + ")};
              word_offset += ${8/f};
            }
            workgroupBarrier();
          }

          if (local_idx < ${b}) {
            var output_value: ${me.type.value} = ${me.type.value}(0);
            for (var b = 0u; b < ${k}; b++) {
              output_value += inter_results[local_idx][b];
            }
            if (col + local_idx < uniforms.output_shape[2])
            {
              ${me.setByIndices(`${me.type.indices}(batch, row, col + local_idx)`,"output_value")}
            }
          }
        }`};return{name:"BlockwiseMatMulNBits32",shaderCache:{hint:`${t.blockSize};${f};${y};${k};${b}`,inputDependencies:Array(e.length).fill("rank")},getRunData:()=>({outputs:[{dims:_,dataType:g}],dispatchGroup:{x:S},programUniforms:C}),getShaderSource:W}},Ah=(e,t)=>{Bl(e.inputs,t),t.blockSize===32&&e.adapterInfo.isVendor("intel")&&e.adapterInfo.isArchitecture("gen-12lp")?e.compute(Nl(e.inputs,t)):e.compute(Ml(e.inputs,t))},Oh=e=>_e(e)}),Dl,Pl,Ul,Wl,ql,Vl,Ll,Gl,Rh,Gy=q(()=>{Y(),oe(),ue(),Dl=e=>{if(!e||e.length<1)throw new Error("Too few inputs");if(e[0].dataType!==1&&e[0].dataType!==10)throw new Error("Input type must be float or float16.");if(e.length>=2){let t=e[0].dims.length*2===e[1].dims[0];if(e.length===4&&(t=e[3].dims[0]*2===e[1].dims[0]),!t)throw new Error("The pads should be a 1D tensor of shape [2 * input_rank] or [2 * num_axes].")}},Pl=(e,t,r)=>{let a="";for(let s=t-1;s>=0;--s)a+=`
            k = i32(${e.indicesGet("indices",s)}) - ${K("uniforms.pads",s,r)};
            if (k < 0) {
              break;
            }
            if (k >= i32(${K("uniforms.x_shape",s,t)})) {
              break;
            }
            offset += k * i32(${K("uniforms.x_strides",s,t)});
        `;return`
          value = ${e.type.value}(uniforms.constant_value);
          for (var i = 0; i < 1; i++) {
            var offset = 0;
            var k = 0;
            ${a}
            value = x[offset];
          }
      `},Ul=(e,t,r)=>{let a="";for(let s=t-1;s>=0;--s)a+=`
                k = i32(${e.indicesGet("indices",s)}) - ${K("uniforms.pads",s,r)};
                if (k < 0) {
                  k = -k;
                }
                {
                  let _2n_1 = 2 * (i32(${K("uniforms.x_shape",s,t)}) - 1);
                  k = k % _2n_1;
                  if(k >= i32(${K("uniforms.x_shape",s,t)})) {
                    k = _2n_1 - k;
                  }
                }
                offset += k * i32(${K("uniforms.x_strides",s,t)});
            `;return`
              var offset = 0;
              var k = 0;
              ${a}
              value = x[offset];
          `},Wl=(e,t,r)=>{let a="";for(let s=t-1;s>=0;--s)a+=`
                k = i32(${e.indicesGet("indices",s)}) - ${K("uniforms.pads",s,r)};
                if (k < 0) {
                  k = 0;
                }
                if (k >= i32(${K("uniforms.x_shape",s,t)})) {
                  k = i32(${K("uniforms.x_shape",s,t)}) - 1;
                }
                offset += k * i32(${K("uniforms.x_strides",s,t)});
            `;return`
              var offset = 0;
              var k = 0;
              ${a}
              value = x[offset];
          `},ql=(e,t,r)=>{let a="";for(let s=t-1;s>=0;--s)a+=`
                k = i32(${e.indicesGet("indices",s)}) - ${K("uniforms.pads",s,r)};
                if (k < 0)  {
                  k += i32(${K("uniforms.x_shape",s,t)}]);
                }
                if (k >= i32(${K("uniforms.x_shape",s,t)})) {
                  k -= i32(${K("uniforms.x_shape",s,t)});
                }
                offset += k * i32(${K("uniforms.x_strides",s,t)});
            `;return`
              var offset = 0;
              var k = 0;
              ${a}
              value = x[offset];
          `},Vl=(e,t,r)=>{switch(r.mode){case 0:return Pl(e,t,r.pads.length);case 1:return Ul(e,t,r.pads.length);case 2:return Wl(e,t,r.pads.length);case 3:return ql(e,t,r.pads.length);default:throw new Error("Invalid mode")}},Ll=(e,t)=>{let r=O.padShape(e[0].dims.slice(),t.pads),a=e[0].dims,s=O.size(r),i=[{type:12,data:s},{type:6,data:t.pads}],o=e.length>=3&&e[2].data;t.mode===0&&i.push({type:o?e[2].dataType:1,data:t.value}),i.push(...Q(e[0].dims,r));let l=["rank"],d=p=>{let g=j("output",e[0].dataType,r.length),f=M("x",e[0].dataType,a.length),y=f.type.value,_=Vl(g,a.length,t),w=[{name:"output_size",type:"u32"},{name:"pads",type:"i32",length:t.pads.length}];return t.mode===0&&w.push({name:"constant_value",type:o?y:"f32"}),`
            ${p.registerUniforms(w).declareVariables(f,g)}
            ${p.mainStart()}
            ${p.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

            let indices = ${g.offsetToIndices("global_idx")};

            var value = ${y}(0);
            ${_}
            output[global_idx] = value;
        }`};return{name:"Pad",shaderCache:{hint:`${t.mode}${o}`,inputDependencies:l},getRunData:()=>({outputs:[{dims:r,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(O.size(r)/64)},programUniforms:i}),getShaderSource:d}},Gl=(e,t)=>{if(e.length>1){let r=e[1].getBigInt64Array(),a=e.length>=3&&e[2].data?e[2].dataType===10?e[2].getUint16Array()[0]:e[2].getFloat32Array()[0]:0,s=e[0].dims.length,i=new Int32Array(2*s).fill(0);if(e.length>=4){let l=e[3].getBigInt64Array();for(let d=0;d<l.length;d++)i[Number(l[d])]=Number(r[d]),i[Number(l[d])+s]=Number(r[d+l.length])}else r.forEach((l,d)=>i[Number(d)]=Number(l));let o=[];return i.forEach(l=>o.push(l)),{mode:t.mode,value:a,pads:o}}else return t},Rh=(e,t)=>{Dl(e.inputs);let r=Gl(e.inputs,t);e.compute(Ll(e.inputs,r),{inputs:[0]})}}),Yt,Gi,Hi,Fi,ji,Hl,Fl,Ki,Qi,Bh,Mh,Zi,Nh,Dh,Xi,Ph,Uh,Wh,qh,Hy=q(()=>{Ze(),Y(),oe(),ue(),Yt=e=>{if($e.webgpu.validateInputContent&&(!e||e.length!==1))throw new Error("Pool ops requires 1 input.")},Gi=(e,t,r)=>{let a=t.format==="NHWC",s=e.dims.slice();a&&s.splice(1,0,s.pop());let i=Object.hasOwnProperty.call(t,"dilations"),o=t.kernelShape.slice(),l=t.strides.slice(),d=i?t.dilations.slice():[],p=t.pads.slice();qr.adjustPoolAttributes(r,s,o,l,d,p);let g=qr.computePoolOutputShape(r,s,l,d,o,p,t.autoPad),f=Object.assign({},t);i?Object.assign(f,{kernelShape:o,strides:l,pads:p,dilations:d,cacheKey:t.cacheKey}):Object.assign(f,{kernelShape:o,strides:l,pads:p,cacheKey:t.cacheKey});let y=g.slice();return y.push(y.splice(1,1)[0]),[f,a?y:g]},Hi=(e,t)=>{let r=t.format==="NHWC",a=O.size(e),s=O.size(t.kernelShape),i=[{type:12,data:a},{type:12,data:s}],o=[{name:"outputSize",type:"u32"},{name:"kernelSize",type:"u32"}];if(t.kernelShape.length<=2){let l=t.kernelShape[t.kernelShape.length-1],d=t.strides[t.strides.length-1],p=t.pads[t.pads.length/2-1],g=t.pads[t.pads.length-1],f=!!(p+g);i.push({type:12,data:l},{type:12,data:d},{type:12,data:p},{type:12,data:g}),o.push({name:"kw",type:"u32"},{name:"sw",type:"u32"},{name:"pwStart",type:"u32"},{name:"pwEnd",type:"u32"});let y=!1;if(t.kernelShape.length===2){let _=t.kernelShape[t.kernelShape.length-2],w=t.strides[t.strides.length-2],b=t.pads[t.pads.length/2-2],k=t.pads[t.pads.length-2];y=!!(b+k),i.push({type:12,data:_},{type:12,data:w},{type:12,data:b},{type:12,data:k}),o.push({name:"kh",type:"u32"},{name:"sh",type:"u32"},{name:"phStart",type:"u32"},{name:"phEnd",type:"u32"})}return[i,o,!0,f,y]}else{if(r)throw new Error("Pooling with kernelShape.length > 2 is not supported for NHWC format.");let l=O.computeStrides(t.kernelShape);i.push({type:12,data:l},{type:12,data:t.pads},{type:12,data:t.strides}),o.push({name:"kernelStrides",type:"u32",length:l.length},{name:"pads",type:"u32",length:t.pads.length},{name:"strides",type:"u32",length:t.strides.length});let d=t.pads.reduce((p,g)=>p+g);return[i,o,!!d,!1,!1]}},Fi=(e,t,r,a,s,i,o,l,d,p,g,f)=>{let y=s.format==="NHWC",_=t.type.value,w=j("output",t.type.tensor,a);if(s.kernelShape.length<=2){let b="",k="",v="",$=r-(y?2:1);if(g?b=`
                for (var i: u32 = 0u; i < uniforms.kw; i++) {
                  xIndices[${$}] = indices[${$}] * uniforms.sw - uniforms.pwStart + i;
                  if (xIndices[${$}] < 0 || xIndices[${$}]
                      >= uniforms.x_shape[${$}]) {
                    pad++;
                    continue;
                  }
                  let x_val = x[${t.indicesToOffset("xIndices")}];
                  ${i}
                }`:b=`
                for (var i: u32 = 0u; i < uniforms.kw; i++) {
                  xIndices[${$}] = indices[${$}] * uniforms.sw - uniforms.pwStart + i;
                  let x_val = x[${t.indicesToOffset("xIndices")}];
                  ${i}
                }`,s.kernelShape.length===2){let T=r-(y?3:2);f?k=`
                for (var j: u32 = 0u; j < uniforms.kh; j++) {
                  xIndices[${T}] = indices[${T}] * uniforms.sh - uniforms.phStart + j;
                  if (xIndices[${T}] < 0 || xIndices[${T}] >= uniforms.x_shape[${T}]) {
                    pad += i32(uniforms.kw);
                    continue;
                  }
              `:k=`
                for (var j: u32 = 0u; j < uniforms.kh; j++) {
                  xIndices[${T}] = indices[${T}] * uniforms.sh - uniforms.phStart + j;
                `,v=`
              }
            `}return`
            ${e.registerUniforms(d).declareVariables(t,w)}

            ${e.mainStart()}
              ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

              let indices = ${w.offsetToIndices("global_idx")};
              var xIndices = ${w.offsetToIndices("global_idx")};

              var value = ${_}(${l});
              var pad = 0;
              ${k}
              ${b}
              ${v}
              ${o}

              output[global_idx] = value;
            }`}else{if(y)throw new Error("Pooling with kernelShape.length > 2 is not supported for NHWC format.");let b=s.kernelShape.length,k=s.pads.length,v="";return p?v=`
                if (xIndices[j] >= uniforms.x_shape[j]) {
                  pad++;
                  isPad = true;
                  break;
                }
              }
              if (!isPad) {
                let x_val = x[${t.indicesToOffset("xIndices")}];
                ${i}
              }`:v=`
              }
              let x_val = x[${t.indicesToOffset("xIndices")}];
              ${i}
            `,`
            ${e.registerUniforms(d).declareVariables(t,w)}

            ${e.mainStart()}
              ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
              let indices = ${w.offsetToIndices("global_idx")};
              var xIndices = ${w.offsetToIndices("global_idx")};

              var offsets: array<u32, ${b}>;

              var value = ${_}(${l});
              var pad = 0;
              var isPad = false;

              for (var i: u32 = 0u; i < uniforms.kernelSize; i++) {
                var offset = i;
                for (var j = 0u; j < ${b-1}u; j++) {
                  offsets[j] = offset / ${K("uniforms.kernelStrides","j",b)};
                  offset -= offsets[j] * ${K("uniforms.kernelStrides","j",b)};
                }
                offsets[${b-1}] = offset;

                isPad = false;
                for (var j = ${r-b}u; j < ${r}u; j++) {
                  xIndices[j] = indices[j] * ${K("uniforms.strides",`j - ${r-b}u`,b)}
                    + offsets[j - ${r-b}u] - ${K("uniforms.pads","j - 2u",k)};
                  ${v}
              }
              ${o}

              output[global_idx] = value;
            }`}},ji=e=>`${e.format};${e.ceilMode};${e.autoPad};${e.kernelShape.length}`,Hl=e=>`${ji(e)};${e.countIncludePad}`,Fl=e=>`${ji(e)};${e.storageOrder};${e.dilations}`,Ki=e=>({format:e.format,autoPad:["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][e.auto_pad],ceilMode:e.ceil_mode,kernelShape:e.kernel_shape,strides:e.strides,pads:e.pads}),Qi=(e,t,r,a)=>{let[s,i]=Gi(t,a,r),o=M("x",t.dataType,t.dims.length),l=o.type.value,d="value += x_val;",p="";s.countIncludePad?p+=`value /= ${l}(uniforms.kernelSize);`:p+=`value /= ${l}(i32(uniforms.kernelSize) - pad);`;let[g,f,y,_,w]=Hi(i,s);g.push(...Q(t.dims,i));let b=["rank"];return{name:e,shaderCache:{hint:`${a.cacheKey};${y};${_};${w}`,inputDependencies:b},getRunData:()=>({outputs:[{dims:i,dataType:t.dataType}],dispatchGroup:{x:Math.ceil(O.size(i)/64)},programUniforms:g}),getShaderSource:k=>Fi(k,o,t.dims.length,i.length,s,d,p,0,f,y,_,w)}},Bh=e=>{let t=e.count_include_pad!==0,r=Ki(e);if(r.ceilMode!==0)throw new Error("using ceil() in shape computation is not yet supported for AveragePool");let a={countIncludePad:t,...r,cacheKey:""};return{...a,cacheKey:Hl(a)}},Mh=(e,t)=>{Yt(e.inputs),e.compute(Qi("AveragePool",e.inputs[0],!1,t))},Zi={autoPad:"",ceilMode:0,countIncludePad:!1,kernelShape:[],strides:[],pads:[],storageOrder:0,dilations:[]},Nh=e=>{let t=e.format;return{format:t,...Zi,cacheKey:t}},Dh=(e,t)=>{Yt(e.inputs),e.compute(Qi("GlobalAveragePool",e.inputs[0],!0,t))},Xi=(e,t,r,a)=>{let[s,i]=Gi(t,a,r),o=`
      value = max(x_val, value);
    `,l="",d=M("x",t.dataType,t.dims.length),p=["rank"],[g,f,y,_,w]=Hi(i,s);return g.push(...Q(t.dims,i)),{name:e,shaderCache:{hint:`${a.cacheKey};${y};${_};${w}`,inputDependencies:p},getRunData:()=>({outputs:[{dims:i,dataType:t.dataType}],dispatchGroup:{x:Math.ceil(O.size(i)/64)},programUniforms:g}),getShaderSource:b=>Fi(b,d,t.dims.length,i.length,s,o,l,t.dataType===10?-65504:-1e5,f,y,_,w)}},Ph=(e,t)=>{Yt(e.inputs),e.compute(Xi("MaxPool",e.inputs[0],!1,t))},Uh=e=>{let t=e.storage_order,r=e.dilations,a=Ki(e);if(t!==0)throw new Error("column major storage order is not yet supported for MaxPool");if(a.ceilMode!==0)throw new Error("using ceil() in shape computation is not yet supported for MaxPool");let s={storageOrder:t,dilations:r,...a,cacheKey:""};return{...s,cacheKey:Fl(s)}},Wh=e=>{let t=e.format;return{format:t,...Zi,cacheKey:t}},qh=(e,t)=>{Yt(e.inputs),e.compute(Xi("GlobalMaxPool",e.inputs[0],!0,t))}}),jl,Kl,Vh,Lh,Fy=q(()=>{Y(),oe(),ke(),ue(),jl=(e,t)=>{if(e.length<2||e.length>3)throw new Error("DequantizeLinear requires 2 or 3 inputs.");if(e.length===3&&e[1].dims===e[2].dims)throw new Error("x-scale and x-zero-point must have the same shape.");if(e.length===3&&e[0].dataType!==e[2].dataType)throw new Error("x and x-zero-point must have the same data type.");if(e[0].dataType===6&&e.length>2)throw new Error("In the case of dequantizing int32 there is no zero point.");if(e[1].dims.length!==0&&e[1].dims.length!==1&&e[1].dims.length!==e[0].dims.length)throw new Error("scale input must be a scalar, a 1D tensor, or have the same rank as the input tensor.");if(e.length>2){if(e[0].dataType!==e[2].dataType)throw new Error("x and x-zero-point must have the same data type.");if(e[1].dims.length!==e[2].dims.length)throw new Error("scale and zero-point inputs must have the same rank.");if(!e[1].dims.map((r,a)=>r===e[2].dims[a]).reduce((r,a)=>r&&a,!0))throw new Error("scale and zero-point inputs must have the same shape.")}if(t.blockSize>0){if(e[1].dims.length===0||e[1].dims.length===1&&e[1].dims[0]===1)throw new Error("blockSize must be set only for block quantization.");if(!e[1].dims.map((s,i)=>i===t.axis||s===e[0].dims[i]).reduce((s,i)=>s&&i,!0))throw new Error("For block qunatization, scale input shape to match the input shape except for the axis");if(e[1].dims.length!==e[0].dims.length)throw new Error("For block qunatization the scale input rank must be the same as the x rank.");let r=e[0].dims[t.axis],a=e[1].dims[t.axis];if(t.blockSize<Math.ceil(r/a)||t.blockSize>Math.ceil(r/(a-1)-1))throw new Error("blockSize must be with in the range [ceil(dI / Si), ceil(dI / (Si - 1) - 1)].")}},Kl=(e,t)=>{let r=O.normalizeAxis(t.axis,e[0].dims.length),a=e[0].dataType,s=a===3,i=e[0].dims,o=e[1].dataType,l=O.size(i),d=a===3||a===2,p=d?[Math.ceil(O.size(e[0].dims)/4)]:e[0].dims,g=e[1].dims,f=e.length>2?e[2]:void 0,y=f?d?[Math.ceil(O.size(f.dims)/4)]:f.dims:void 0,_=g.length===0||g.length===1&&g[0]===1,w=_===!1&&g.length===1,b=xe(l),k=_&&(!d||b===4),v=k?b:1,$=k&&!d?b:1,T=M("input",d?12:a,p.length,$),S=M("scale",o,g.length),C=f?M("zero_point",d?12:a,y.length):void 0,E=j("output",o,i.length,v),z=[T,S];C&&z.push(C);let B=[p,g];f&&B.push(y);let W=[{type:12,data:l/v},{type:12,data:r},{type:12,data:t.blockSize},...Q(...B,i)],G=ee=>{let ae=[{name:"output_size",type:"u32"},{name:"axis",type:"u32"},{name:"block_size",type:"u32"}];return`
      ${ee.registerUniforms(ae).declareVariables(...z,E)}
      ${ee.mainStart()}
          ${ee.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          let output_indices = ${E.offsetToIndices("global_idx")};

          // Set input x
          ${d?`
            let input = ${T.getByOffset("global_idx / 4")};
            let x_vec = ${s?"unpack4xI8(input)":"unpack4xU8(input)"};
            let x_value = ${v===1?"x_vec[global_idx % 4]":"x_vec"};`:`let x_value = ${T.getByOffset("global_idx")};`};

          // Set scale input
          ${_?`let scale_value= ${S.getByOffset("0")}`:w?`
            let scale_index = ${E.indicesGet("output_indices","uniforms.axis")};
            let scale_value= ${S.getByOffset("scale_index")};`:`
            var scale_indices: ${S.type.indices} = output_indices;
            let index = ${S.indicesGet("scale_indices","uniforms.axis")} / uniforms.block_size;
            ${S.indicesSet("scale_indices","uniforms.axis","index")};
            let scale_value= ${S.getByIndices("scale_indices")};`};

          // Set zero-point input
          ${C?_?d?`
                let zero_point_input = ${C.getByOffset("0")};
                let zero_point_vec =  ${s?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value= zero_point_vec[0]`:`let zero_point_value = ${C.getByOffset("0")}`:w?d?`
                let zero_point_index = ${E.indicesGet("output_indices","uniforms.axis")};
                let zero_point_input = ${C.getByOffset("zero_point_index / 4")};
                let zero_point_vec =  ${s?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value = zero_point_vec[zero_point_index % 4]`:`
                let zero_point_index = ${E.indicesGet("output_indices","uniforms.axis")};
                let zero_point_value = ${C.getByOffset("zero_point_index")};`:d?`
                let zero_point_offset = ${S.indicesToOffset("scale_indices")};
                let zero_point_input = ${C.getByOffset("zero_point_offset / 4")};
                let zero_point_vec = ${s?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value = zero_point_vec[zero_point_offset % 4];`:`let zero_point_value = ${C.getByIndices("scale_indices")};`:`let zero_point_value = ${d?s?"i32":"u32":T.type.value}(0);`};
      // Compute and write output
      ${E.setByOffset("global_idx",`${E.type.value}(x_value - zero_point_value) * scale_value`)};
      }`};return{name:"DequantizeLinear",shaderCache:{hint:t.cacheKey,inputDependencies:C?["rank","rank","rank"]:["rank","rank"]},getShaderSource:G,getRunData:()=>({outputs:[{dims:i,dataType:o}],dispatchGroup:{x:Math.ceil(l/v/64),y:1,z:1},programUniforms:W})}},Vh=(e,t)=>{jl(e.inputs,t),e.compute(Kl(e.inputs,t))},Lh=e=>_e({axis:e.axis,blockSize:e.blockSize})}),Ql,Zl,Gh,jy=q(()=>{Ze(),Y(),ue(),Ql=(e,t,r)=>{let a=e===t,s=e<t&&r<0,i=e>t&&r>0;if(a||s||i)throw new Error("Range these inputs' contents are invalid.")},Zl=(e,t,r,a)=>{let s=Math.abs(Math.ceil((t-e)/r)),i=[s],o=s,l=[{type:12,data:o},{type:a,data:e},{type:a,data:r},...Q(i)],d=p=>{let g=j("output",a,i.length),f=g.type.value,y=[{name:"outputSize",type:"u32"},{name:"start",type:f},{name:"delta",type:f}];return`
        ${p.registerUniforms(y).declareVariables(g)}
        ${p.mainStart()}
        ${p.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
        output[global_idx] = uniforms.start + ${f}(global_idx) * uniforms.delta;
      }`};return{name:"Range",shaderCache:{hint:`${a}`},getShaderSource:d,getRunData:()=>({outputs:[{dims:i,dataType:a}],dispatchGroup:{x:Math.ceil(o/64)},programUniforms:l})}},Gh=e=>{let t=0,r=0,a=0;e.inputs[0].dataType===6?(t=e.inputs[0].getInt32Array()[0],r=e.inputs[1].getInt32Array()[0],a=e.inputs[2].getInt32Array()[0]):e.inputs[0].dataType===1&&(t=e.inputs[0].getFloat32Array()[0],r=e.inputs[1].getFloat32Array()[0],a=e.inputs[2].getFloat32Array()[0]),$e.webgpu.validateInputContent&&Ql(t,r,a),e.compute(Zl(t,r,a,e.inputs[0].dataType),{inputs:[]})}}),Xl,Jl,Hh,Fh,Ky=q(()=>{Y(),oe(),ke(),ue(),Xl=(e,t,r,a)=>{if(e!=="none"&&a!=="i32"&&a!=="u32"&&a!=="f32")throw new Error(`Input ${a} is not supported with reduction ${e}.`);let s=`{
                var oldValue = 0;
                loop {
                  let newValueF32 =`,i=`;
                  let newValue = bitcast<i32>(newValueF32);
                  let res = atomicCompareExchangeWeak(&${t}, oldValue, newValue);
                  if res.exchanged {
                    break;
                  }
                  oldValue = res.old_value;
                }
              }`;switch(e){case"none":return`${t}=${r};`;case"add":return a==="i32"||a==="u32"?`atomicAdd(&${t}, bitcast<${a}>(${r}));`:`
              ${s}bitcast<${a}>(oldValue) + (${r})${i}`;case"max":return a==="i32"||a==="u32"?`atomicMax(&${t}, bitcast<${a}>(${r}));`:`
                ${s}max(bitcast<f32>(oldValue), (${r}))${i}`;case"min":return a==="i32"||a==="u32"?`atomicMin(&${t}, bitcast<${a}>(${r}));`:`${s}min(bitcast<${a}>(oldValue), (${r}))${i}`;case"mul":return`${s}(bitcast<${a}>(oldValue) * (${r}))${i}`;default:throw new Error(`Reduction ${e} is not supported.`)}},Jl=(e,t)=>{let r=e[0].dims,a=e[1].dims,s=r,i=1,o=Math.ceil(O.size(a)/i),l=a[a.length-1],d=O.sizeFromDimension(r,l),p=[{type:12,data:o},{type:12,data:l},{type:12,data:d},...Q(e[1].dims,e[2].dims,s)],g=f=>{let y=M("indices",e[1].dataType,e[1].dims.length),_=M("updates",e[2].dataType,e[2].dims.length,i),w=t.reduction!=="none"&&t.reduction!==""?vp("output",e[0].dataType,s.length):j("output",e[0].dataType,s.length,i);return`
      ${f.registerUniform("output_size","u32").registerUniform("last_index_dimension","u32").registerUniform("num_updates_elements","u32").declareVariables(y,_,w)}
      ${f.mainStart()}
        ${f.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
  var hasDuplicates = false;
  if (${t.reduction==="none"}) {
    let n = ${O.size(a)};
    for (var i = 0; i < n; i = i + 1) {
      for (var j = i + 1; j < n; j = j + 1) {
        var index_i = i32(indices[i].x);
        var index_j = i32(indices[j].x);
        if (index_i == index_j) {
          hasDuplicates = true;
          break;
        }
      }
      if (hasDuplicates) {
        break;
      }
    }
  }

  var data_offset = 0u;
  var indices_start = uniforms.last_index_dimension * global_idx;
  if (${t.reduction==="none"} && hasDuplicates) {
    if (global_idx != 0u) {
      return;
    }
    indices_start = 0u;
  }
  let indices_end = indices_start + uniforms.last_index_dimension;
  for (var i = indices_start; i < indices_end; i++) {
    var index = i32(indices[i].x);
    ${e[0].dims.length===1?`
    let element_count_dim = uniforms.output_strides;
    let dim_value = uniforms.output_shape;`:`
    let element_count_dim = uniforms.output_strides[i - indices_start];
    let dim_value = uniforms.output_shape[i - indices_start + uniforms.last_index_dimension];`}
    if (index >= 0) {
      if (index >= i32(dim_value)) {
        index = i32(dim_value - 1);
      }
    } else {
      if (index < -i32(dim_value)) {
        index = 0;
      } else {
        index += i32(dim_value);
      }
    }
    data_offset += u32((u32(index) * element_count_dim));
  }

  for (var i = 0u; i < uniforms.num_updates_elements; i++) {
    let value = updates[uniforms.num_updates_elements * global_idx + i];
    ${Xl(t.reduction,"output[data_offset + i]","value",w.type.value)}
  }

      }`};return{name:"ScatterND",shaderCache:{hint:`${t.cacheKey}_${t.reduction}`,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:s,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(o/64)},programUniforms:p}),getShaderSource:g}},Hh=e=>_e({reduction:e.reduction}),Fh=(e,t)=>{e.compute(Jl(e.inputs,t),{inputs:[e.inputs[1],e.inputs[2]],outputs:[]})}}),Yl,ed,td,Ji,rd,id,ad,nd,sd,od,ud,ld,Yi,dd,pd,cd,hd,fd,jh,Kh,Qy=q(()=>{Y(),oe(),ke(),ue(),Yl=(e,t)=>{if(e.every(r=>r>0||(()=>{throw new Error("Resize requires scales input values to be positive")})),e.length>0){if(t.mode==="linear"){if(!(e.length===2||e.length===3||e.length===4&&e[0]===1&&e[1]===1||e.length===4&&e[0]===1&&e[3]===1||e.length===5&&e[0]===1&&e[1]===1))throw new Error(`For linear mode, Resize requires scales to be 2D, 3D, 4D with either two outermost or one innermost and
            one outermost scale values equal to 1, or 5D with two outermost scale values equal to 1`)}else if(t.mode==="cubic"&&!(e.length===2||e.length===4&&e[0]===1&&e[1]===1||e.length===4&&e[0]===1&&e[3]===1))throw new Error("Resize requires scales input size to be 2 or 4 for cubic mode")}},ed=(e,t,r)=>{t.every(s=>s>=0&&s<r||(()=>{throw new Error("Resize requires axes input values to be positive and less than rank")}));let a=new Array(r).fill(1);return t.forEach((s,i)=>a[s]=e[i]),a},td=(e,t,r,a,s,i)=>{let[o,l,d]=r>10?[1,2,3]:[-1,e.length>1?1:-1,-1],p=e[0].dims.length;if(o>0&&e.length>o&&e[o].dims.length>0)e[o].getFloat32Array().forEach(g=>i.push(g));else if(t.coordinateTransformMode==="tf_crop_and_resize")throw new Error("Resize requires RoI input to be specified when coordinateTransformMode is tfCropAndResize");if(l>0&&e.length>l&&e[l].dims.length===1&&e[l].dims[0]>0){if(e[l].getFloat32Array().forEach(g=>a.push(g)),a.length!==0&&a.length!==p&&r>=18&&a.length!==t.axes.length)throw new Error("Resize requires scales input size to be same as input rank or axes size for opset 18 and up");Yl(a,t),t.axes.length>0&&ed(a,t.axes,p).forEach((g,f)=>a[f]=g)}if(d>0&&e.length>d&&e[d].dims.length===1&&e[d].dims[0]>0&&(e[d].getBigInt64Array().forEach(g=>s.push(Number(g))),s.length!==0&&s.length!==p&&r>=18&&s.length!==t.axes.length))throw new Error("Resize requires sizes input size to be same as input rank or axes size for opset 18 and up");if(t.axes.length>0){if(a.length!==0&&a.length!==t.axes.length)throw new Error('Resize requires "scales" input size to be of axes rank when axes attributes is specified');if(s.length!==0&&s.length!==t.axes.length)throw new Error('Resize requires "sizes" input size to be of rank axes rank when axes attributes is specified')}if(typeof a<"u"&&typeof s<"u"&&a.length>0&&s.length>p)throw new Error("Resize requires only of scales or sizes to be specified")},Ji=(e,t,r,a)=>`
  // The whole part and the fractional part are calculated separately due to inaccuracy of floating
  // point division. As an example, f32(21) / f32(7) may evaluate to 2.99... instead of 3, causing an
  // offset-by-one error later in floor().
  let big = (${e}) * (${t});
  let whole = ${a}(big / (${r}));
  let fract = ${a}(big % (${r})) / ${a}(${r});
  return whole + fract;
`,rd=(e,t)=>`fn getOriginalCoordinateFromResizedCoordinate(xResized: u32, xScale: f32, lengthResized: u32,
     lengthOriginal: u32, roiStart: f32, roiEnd: f32) -> ${t} { `+(()=>{switch(e){case"asymmetric":return`
          if (xScale < 1.0 || floor(xScale) != xScale) {
            return ${t}(xResized) / ${t}(xScale);
          } else {
            ${Ji("xResized","lengthOriginal","lengthResized",t)}
          }
        `;case"pytorch_half_pixel":return`if (lengthResized > 1) {
                    return (${t}(xResized) + 0.5) / ${t}(xScale) - 0.5;
                  } else {
                    return 0.0;
                  }`;case"tf_half_pixel_for_nn":return`return (${t}(xResized) + 0.5) / ${t}(xScale);`;case"align_corners":return`if (lengthResized == 1) {
                    return 0.0;
                  } else {
                    ${Ji("xResized","lengthOriginal - 1","lengthResized - 1",t)}
                  }`;case"tf_crop_and_resize":return`if (lengthResized > 1) {
                    return ${t}(roiStart) * ${t}(lengthOriginal - 1) +
                        (${t}(xResized) * ${t}(roiEnd - roiStart) * ${t}(lengthOriginal - 1)) /
                        ${t}(lengthResized - 1);
                  } else {
                    return 0.5 * ${t}(roiStart + roiEnd) * ${t}(lengthOriginal - 1);
                  }`;case"half_pixel_symmetric":return`const outputWidth = ${t}xScale * ${t}(lengthResized);
                  const adjustment = ${t}(lengthResized) / outputWidth;
                  const center = ${t}(lengthOriginal) / 2;
                  const offset = center * (1 - adjustment);
                  return offset + ((${t}(xResized) + 0.5) / ${t}(xScale)) - 0.5;`;case"half_pixel":return`return ((${t}(xResized) + 0.5) / ${t}(xScale)) - 0.5;`;default:throw new Error(`Coordinate transform mode ${e} is not supported`)}})()+"}",id=(e,t,r)=>`fn getNearestPixelFromOriginal(xOriginal: ${r}, isDownSample: bool) -> ${r} {`+(()=>{switch(e){case"round_prefer_ceil":return"if (fract(xOriginal) == 0.5) {             return ceil(xOriginal);           } else {             return round(xOriginal);           }";case"floor":return"return floor(xOriginal);";case"ceil":return"return ceil(xOriginal);";case"round_prefer_floor":return"if (fract(xOriginal) == 0.5) {                     return floor(xOriginal);                   } else {                     return round(xOriginal);                   }";case"simple":default:if(t<11)return"if (isDownSample)                     {                       return ceil(xOriginal);                     } else {                       return xOriginal;                     }";throw new Error(`Nearest mode ${e} is not supported`)}})()+"}",ad=(e,t,r)=>{let a=new Array(r).fill(0).concat(new Array(r).fill(1)),s=e.length===0?a:e.slice();return t.length>0?(t.forEach((i,o)=>{a[i]=s[o],a[o+r]=s[t.length+o]}),a):s},nd=(e,t,r,a)=>{let s=[];if(r.length>0)if(a.length>0){if(e.forEach(i=>s.push(i)),Math.max(...a)>e.length)throw new Error("axes is out of bound");a.forEach((i,o)=>s[i]=r[o])}else r.forEach(i=>s.push(i));else{if(t.length===0)throw new Error("Resize requires either scales or sizes.");s=e.map((i,o)=>Math.round(i*t[o]))}return s},sd=(e,t,r)=>{let a=(()=>{switch(r.keepAspectRatioPolicy){case"not_larger":return r.axes.length>0?Math.min(...r.axes.map(i=>t[i]),Number.MAX_VALUE):Math.min(...t,Number.MAX_VALUE);case"not_smaller":return r.axes.length>0?Math.max(...r.axes.map(i=>t[i]),Number.MIN_VALUE):Math.max(...t,Number.MIN_VALUE);default:throw new Error(`Keep aspect ratio policy ${r.keepAspectRatioPolicy} is not supported`)}})();t.fill(1,0,t.length);let s=e.slice();return r.axes.length>0?(r.axes.forEach(i=>t[i]=a),r.axes.forEach(i=>s[i]=Math.round(e[i]*t[i]))):(t.fill(a,0,t.length),s.forEach((i,o)=>s[o]=Math.round(i*t[o]))),s},od=(e,t,r,a,s)=>`
    fn calculateOriginalIndicesFromOutputIndices(output_indices: ${e.type.indices}) -> array<${e.type.value}, ${r.length}> {
      var original_indices: array<${e.type.value}, ${r.length}>;
      for (var i:u32 = 0; i < ${r.length}; i++) {
        var output_index = ${e.indicesGet("output_indices","i")};
        var scale = ${K("uniforms.scales","i",a)};
        var roi_low = ${K("uniforms.roi","i",s)};
        var roi_hi = ${K("uniforms.roi",`i + ${t.length}`,s)};
        if (scale == 1.0) {
          original_indices[i] = ${e.type.value}(output_index);
        } else {
          var input_shape_i = ${K("uniforms.input_shape","i",t.length)};
          var output_shape_i = ${K("uniforms.output_shape","i",r.length)};
          original_indices[i] = getOriginalCoordinateFromResizedCoordinate(output_index, scale, output_shape_i,
                                                                           input_shape_i, roi_low, roi_hi);
        }
      }
      return original_indices;
    }`,ud=(e,t,r,a,s,i,o)=>`
    fn calculateInputIndicesFromOutputIndices(output_indices: ${t.type.indices}) -> ${e.type.indices} {
      var input_indices: ${e.type.indices};
      for (var i:u32 = 0; i < ${a.length}; i++) {
        var output_index = ${t.indicesGet("output_indices","i")};
        var input_index: u32;
        var scale = ${K("uniforms.scales","i",s)};
        if (scale == 1.0) {
          input_index = output_index;
        } else {
          var roi_low = ${K("uniforms.roi","i",i)};
          var roi_hi = ${K("uniforms.roi",`i + ${r.length}`,i)};
          var input_shape_i = ${K("uniforms.input_shape","i",r.length)};
          var output_shape_i = ${K("uniforms.output_shape","i",a.length)};
          var original_idx = getOriginalCoordinateFromResizedCoordinate(output_index, scale, output_shape_i,
                                                                        input_shape_i, roi_low, roi_hi);
          if (!${o} || (original_idx >= 0 && original_idx < ${t.type.value}(input_shape_i))) {
            if (original_idx < 0) {
              input_index = 0;
            } else if (original_idx > ${t.type.value}(input_shape_i - 1)) {
              input_index = input_shape_i - 1;
            } else {
              input_index = u32(getNearestPixelFromOriginal(original_idx, scale < 1));
            }
          } else {
            input_index = u32(original_idx);
          }
        }
        ${e.indicesSet("input_indices","i","input_index")}
      }
      return input_indices;
    }`,ld=(e,t)=>`
    fn checkInputIndices(input_indices: ${e.type.indices}) -> bool {
      for (var i:u32 = 0; i < ${t.length}; i++) {
        var input_index = ${e.indicesGet("input_indices","i")};
        if (input_index < 0 || input_index >= ${K("uniforms.input_shape","i",t.length)}) {
          return false;
        }
      }
      return true;
    }`,Yi=(e,t,r,a)=>e.rank>a?`
    ${e.indicesSet("input_indices",t,"channel")};
    ${e.indicesSet("input_indices",r,"batch")};
`:"",dd=(e,t,r,a,s)=>{let[i,o,l,d]=r.length===2?[-1,0,1,-1]:[0,2,3,1],p=e.type.value;return`
    fn getInputValue(batch: u32, channel: u32, row: u32, col: u32) -> ${p} {
      var input_indices: ${e.type.indices};
      ${e.indicesSet("input_indices",o,`max(0, min(row, ${r[o]} - 1))`)};
      ${e.indicesSet("input_indices",l,`max(0, min(col, ${r[l]} - 1))`)};
      ${Yi(e,d,i,2)}
      return ${e.getByIndices("input_indices")};
    }

    fn bilinearInterpolation(output_indices: ${t.type.indices}) -> ${p} {
      var originalIndices = calculateOriginalIndicesFromOutputIndices(output_indices);
      var row:${p} = originalIndices[${o}];
      var col:${p} = originalIndices[${l}];
      ${a?`if (row < 0 || row > (${r[o]} - 1) || col < 0 || col > (${r[l]} - 1)) {
        return ${s};
      }`:""};
      row = max(0, min(row, ${r[o]} - 1));
      col = max(0, min(col, ${r[l]} - 1));
      var row1: u32 = u32(row);
      var col1: u32 = u32(col);
      var row2: u32 = u32(row + 1);
      var col2: u32 = u32(col + 1);
      var channel: u32 = ${r.length>2?`u32(originalIndices[${d}])`:"0"};
      var batch: u32 =  ${r.length>2?`u32(originalIndices[${i}])`:"0"};
      var x11: ${p} = getInputValue(batch, channel, row1, col1);
      var x12: ${p} = getInputValue(batch, channel, row1, col2);
      var x21: ${p} = getInputValue(batch, channel, row2, col1);
      var x22: ${p} = getInputValue(batch, channel, row2, col2);
      var dx1: ${p} = abs(row - ${p}(row1));
      var dx2: ${p} = abs(${p}(row2) - row);
      var dy1: ${p} = abs(col - ${p}(col1));
      var dy2: ${p} = abs(${p}(col2) - col);
      if (row1 == row2) {
        dx1 = 0.5;
        dx2 = 0.5;
      }
      if (col1 == col2) {
        dy1 = 0.5;
        dy2 = 0.5;
      }
      return (x11 * dx2 * dy2 + x12 * dx2 * dy1 + x21 * dx1 * dy2 + x22 * dx1 * dy1);
    }`},pd=(e,t,r,a,s,i,o,l,d,p)=>{let g=r.length===2,[f,y]=g?[0,1]:[2,3],_=e.type.value,w=b=>{let k=b===f?"row":"col";return`
      fn ${k}CubicInterpolation(input_indices: ${e.type.indices}, output_indices: ${t.type.indices}) -> ${_} {
        var output_index = ${t.indicesGet("output_indices",b)};
        var originalIdx: ${_} = getOriginalCoordinateFromResizedCoordinate(output_index, ${s[b]},
        ${a[b]}, ${r[b]}, ${i[b]}, ${i[b]} + ${r.length});
        var fractOriginalIdx: ${_} = originalIdx - floor(originalIdx);
        var coefs = getCubicInterpolationCoefs(fractOriginalIdx);

        if (${l} && (originalIdx < 0 || originalIdx > (${r[b]} - 1))) {
          return ${d};
        }
        var data: array<${_}, 4> = array<${_}, 4>(0.0, 0.0, 0.0, 0.0);
        for (var i: i32 = -1; i < 3; i++) {
          var ${k}: ${_} = originalIdx + ${_}(i);
          if (${k} < 0 || ${k} >= ${r[b]}) {
            ${p?`coefs[i + 1] = 0.0;
                        continue;`:l?`return ${d};`:`${k} = max(0, min(${k}, ${r[b]} - 1));`};
          }
        var input_indices_copy: ${e.type.indices} = input_indices;
          ${e.indicesSet("input_indices_copy",b,`u32(${k})`)};
          data[i + 1] = ${b===f?e.getByIndices("input_indices_copy"):"rowCubicInterpolation(input_indices_copy, output_indices)"};
        }
        return cubicInterpolation1D(data, coefs);
      }`};return`
    ${w(f)};
    ${w(y)};
  fn getCubicInterpolationCoefs(s: ${_}) -> array<${_}, 4> {
    var absS = abs(s);
    var coeffs: array<${_}, 4> = array<${_}, 4>(0.0, 0.0, 0.0, 0.0);
    var oneMinusAbsS: ${_} = 1.0 - absS;
    var twoMinusAbsS: ${_} = 2.0 - absS;
    var onePlusAbsS: ${_} = 1.0 + absS;
    coeffs[0] = ((${o} * onePlusAbsS - 5 * ${o}) * onePlusAbsS + 8 * ${o}) * onePlusAbsS - 4 * ${o};
    coeffs[1] = ((${o} + 2) * absS - (${o} + 3)) * absS * absS + 1;
    coeffs[2] = ((${o} + 2) * oneMinusAbsS - (${o} + 3)) * oneMinusAbsS * oneMinusAbsS + 1;
    coeffs[3] = ((${o} * twoMinusAbsS - 5 * ${o}) * twoMinusAbsS + 8 * ${o}) * twoMinusAbsS - 4 * ${o};
    return coeffs;
  }

  fn cubicInterpolation1D(x: array<${_}, 4>, coefs: array<${_}, 4>) -> ${_} {
    var coefsSum: ${_} = coefs[0] + coefs[1] + coefs[2] + coefs[3];
    return (x[0] * coefs[0] + x[1] * coefs[1]+ x[2] * coefs[2]+ x[3] * coefs[3]) / coefsSum;
  }

  fn bicubicInterpolation(output_indices: ${t.type.indices}) -> ${_} {
    var input_indices: ${e.type.indices} = output_indices;
    return colCubicInterpolation(input_indices, output_indices);
  }
    `},cd=(e,t,r,a,s)=>{let[i,o,l,d,p]=r.length===3?[-1,0,1,2,-1]:[0,2,3,4,1],g=e.type.value;return`
    fn getInputValue(batch: u32, channel: u32, depth:u32, height: u32, width: u32) -> ${g} {
      var input_indices: ${e.type.indices};
      ${e.indicesSet("input_indices",o,`max(0, min(depth, ${r[o]} - 1))`)};
      ${e.indicesSet("input_indices",l,`max(0, min(height, ${r[l]} - 1))`)};
      ${e.indicesSet("input_indices",d,`max(0, min(width, ${r[d]} - 1))`)};
      ${Yi(e,p,i,3)}
      return ${e.getByIndices("input_indices")};
    }

    fn trilinearInterpolation(output_indices: ${t.type.indices}) -> ${g} {
      var originalIndices = calculateOriginalIndicesFromOutputIndices(output_indices);
      var depth:${g} = originalIndices[${o}];
      var height:${g} = originalIndices[${l}];
      var width:${g} = originalIndices[${d}];
      ${a?`if (depth < 0 || depth > (${r[o]} - 1) || height < 0 || height > (${r[l]} - 1) || width < 0 || (width > ${r[d]} - 1)) {
      return ${s};
        }`:""};

    depth = max(0, min(depth, ${r[o]} - 1));
      height = max(0, min(height, ${r[l]} - 1));
      width = max(0, min(width, ${r[d]} - 1));
      var depth1: u32 = u32(depth);
      var height1: u32 = u32(height);
      var width1: u32 = u32(width);
      var depth2: u32 = u32(depth + 1);
      var height2: u32 = u32(height + 1);
      var width2: u32 = u32(width + 1);
      var channel: u32 = ${r.length>3?`u32(originalIndices[${p}])`:"0"};
      var batch: u32 =  ${r.length>3?`u32(originalIndices[${i}])`:"0"};

      var x111: ${g} = getInputValue(batch, channel, depth1, height1, width1);
      var x112: ${g} = getInputValue(batch, channel, depth1, height1, width2);
      var x121: ${g} = getInputValue(batch, channel, depth1, height2, width1);
      var x122: ${g} = getInputValue(batch, channel, depth1, height2, width2);
      var x211: ${g} = getInputValue(batch, channel, depth2, height1, width1);
      var x212: ${g} = getInputValue(batch, channel, depth2, height1, width2);
      var x221: ${g} = getInputValue(batch, channel, depth2, height2, width1);
      var x222: ${g} = getInputValue(batch, channel, depth2, height2, width2);
      var dx1: ${g} = abs(depth - ${g}(depth1));
      var dx2: ${g} = abs(${g}(depth2) - depth);
      var dy1: ${g} = abs(height - ${g}(height1));
      var dy2: ${g} = abs(${g}(height2) - height);
      var dz1: ${g} = abs(width - ${g}(width1));
      var dz2: ${g} = abs(${g}(width2) - width);
      if (depth1 == depth2) {
        dx1 = 0.5;
        dx2 = 0.5;
      }
      if (height1 == height2) {
        dy1 = 0.5;
        dy2 = 0.5;
      }
      if (width1 == width2) {
        dz1 = 0.5;
        dz2 = 0.5;
      }
      return (x111 * dx2 * dy2 * dz2 + x112 * dx2 * dy2 * dz1 + x121 * dx2 * dy1 *dz2 + x122 * dx2 * dy1 * dz1 +
              x211 * dx1 * dy2 * dz2 + x212 * dx1 * dy2 * dz1 + x221 * dx1 * dy1 *dz2 + x222 * dx1 * dy1 * dz1);
    }`},hd=(e,t,r,a,s,i)=>{let o=e.dims,l=ad(i,t.axes,o.length),d=nd(o,a,s,t.axes),p=a.slice();a.length===0&&(p=o.map(($,T)=>$===0?1:d[T]/$),t.keepAspectRatioPolicy!=="stretch"&&(d=sd(o,p,t)));let g=j("output",e.dataType,d.length),f=M("input",e.dataType,o.length),y=O.size(d),_=o.length===d.length&&o.every(($,T)=>$===d[T]),w=t.coordinateTransformMode==="tf_crop_and_resize",b=t.extrapolationValue,k=f.type.value,v=$=>`
      ${_?"":`
      ${rd(t.coordinateTransformMode,k)};
      ${(()=>{switch(t.mode){case"nearest":return`
              ${ld(f,o)};
              ${id(t.nearestMode,r,k)};
              ${ud(f,g,o,d,p.length,l.length,w)};
              `;case"linear":return`
              ${od(g,o,d,p.length,l.length)};
              ${(()=>{if(o.length===2||o.length===4)return`${dd(f,g,o,w,b)}`;if(o.length===3||o.length===5)return`${cd(f,g,o,w,b)}`;throw Error("Linear mode only supports input dims 2, 3, 4 and 5 are supported in linear mode.")})()};
            `;case"cubic":return`
            ${(()=>{if(o.length===2||o.length===4)return`${pd(f,g,o,d,p,l,t.cubicCoeffA,w,t.extrapolationValue,t.excludeOutside)}`;throw Error("Cubic mode only supports input dims 2 and 4 are supported in linear mode.")})()};
            `;default:throw Error("Invalid resize mode")}})()};
      `}
      ${$.registerUniform("output_size","u32").registerUniform("scales","f32",p.length).registerUniform("roi","f32",l.length).declareVariables(f,g)}
      ${$.mainStart()}
        ${$.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
        ${_?"output[global_idx] = input[global_idx];":`
        let output_indices = ${g.offsetToIndices("global_idx")};
        var input_indices: ${f.type.indices};
        ${(()=>{switch(t.mode){case"nearest":return`input_indices = calculateInputIndicesFromOutputIndices(output_indices);
                if (checkInputIndices(input_indices)) {
                  output[global_idx] = ${f.getByIndices("input_indices")};
                } else {
                  output[global_idx] = ${t.extrapolationValue};
                }`;case"linear":return`output[global_idx] = ${o.length===2||o.length===4?"bilinearInterpolation":"trilinearInterpolation"}(output_indices);`;case"cubic":return"output[global_idx] = bicubicInterpolation(output_indices);";default:throw Error(`Unsupported resize mode: ${t.mode}`)}})()};
`}
      }`;return{name:"Resize",shaderCache:{hint:`${t.cacheKey}|${r}|${p.length>0?t.mode==="cubic"?p:p.length:""}|${s.length>0?s:""}|${l.length>0?l:""}|${_}|${t.mode==="nearest"?o.length:o}`,inputDependencies:["rank"]},getShaderSource:v,getRunData:()=>({outputs:[{dims:d,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(y/64)},programUniforms:[{type:12,data:y},{type:1,data:p},{type:1,data:l},...Q(o,d)]})}},fd=e=>{let t=e.customDataBuffer;return new Uint32Array(t,t.byteOffset,1)[0]},jh=(e,t)=>{let r=[],a=[],s=[],i=fd(e);if(t.antialias!==0)throw Error("Only default value (0) for Antialias attribute is supported");td(e.inputs,t,i,r,a,s),e.compute(hd(e.inputs[0],t,i,r,a,s),{inputs:[0]})},Kh=e=>{let t=e.antialias,r=e.axes,a=e.coordinateTransformMode,s=e.cubicCoeffA,i=e.excludeOutside!==0,o=e.extrapolationValue,l=e.keepAspectRatioPolicy,d=e.mode,p=e.nearestMode===""?"simple":e.nearestMode;return _e({antialias:t,axes:r,coordinateTransformMode:a,cubicCoeffA:s,excludeOutside:i,extrapolationValue:o,keepAspectRatioPolicy:l,mode:d,nearestMode:p})}}),md,gd,Qh,Zy=q(()=>{Y(),oe(),ke(),ue(),md=(e,t)=>{let[r,a,s,i]=e,{numHeads:o,rotaryEmbeddingDim:l}=t;if(r.dims.length!==3&&r.dims.length!==4)throw new Error(`Input 'x' is expected to have 3 or 4 dimensions, got ${r.dims.length}`);if(!O.areEqual(a.dims,[])&&!O.areEqual(a.dims,[1])&&a.dims.length!==2)throw new Error(`Input 'position_ids' is expected to have 0, 1, or 2 dimensions, got ${a.dims.length}`);if(s.dims.length!==2)throw new Error(`Input 'cos_cache' is expected to have 2 dimensions, got ${s.dims.length}`);if(i.dims.length!==2)throw new Error(`Input 'sin_cache' is expected to have 2 dimensions, got ${i.dims.length}`);if(!O.areEqual(s.dims,i.dims))throw new Error("Inputs 'cos_cache' and 'sin_cache' are expected to have the same shape");if(l>0&&o===0)throw new Error("num_heads must be provided if rotary_embedding_dim is specified");let d=r.dims[0],p=r.dims[r.dims.length-2],g=s.dims[0],f=O.sizeFromDimension(r.dims,1)/p,y=l===0?s.dims[1]*2:f/o;if(l>y)throw new Error("rotary_embedding_dim must be less than or equal to head_size");if(a.dims.length===2){if(d!==a.dims[0])throw new Error(`Input 'position_ids' dimension 0 should be of size batch_size, got ${a.dims[0]}`);if(p!==a.dims[1])throw new Error(`Input 'position_ids' dimension 1 should be of size sequence_length, got ${a.dims[1]}`)}if(y/2!==s.dims[1]&&l/2!==s.dims[1])throw new Error(`Input 'cos_cache' dimension 1 should be same as head_size / 2 or rotary_embedding_dim / 2, got ${s.dims[1]}`);if(p>g)throw new Error("Updating cos_cache and sin_cache in RotaryEmbedding is not currently supported")},gd=(e,t)=>{let{interleaved:r,numHeads:a,rotaryEmbeddingDim:s,scale:i}=t,o=e[0].dims[0],l=O.sizeFromDimension(e[0].dims,1),d=e[0].dims[e[0].dims.length-2],p=l/d,g=e[2].dims[1],f=s===0?g*2:p/a,y=new Array(o,d,p/f,f-g),_=O.computeStrides(y),w=[{type:1,data:i},{type:12,data:y},{type:12,data:_},...e[0].dims.length===3?new Array({type:12,data:[l,p,f,1]}):[],...e[0].dims.length===4?new Array({type:12,data:[l,f,d*f,1]}):[],...Q(e[0].dims,e[1].dims,e[2].dims,e[3].dims,e[0].dims)],b=k=>{let v=M("input",e[0].dataType,e[0].dims.length),$=M("position_ids",e[1].dataType,e[1].dims.length),T=M("cos_cache",e[2].dataType,e[2].dims.length),S=M("sin_cache",e[3].dataType,e[3].dims.length),C=j("output",e[0].dataType,e[0].dims.length);return k.registerUniforms([{name:"scale",type:"f32"},{name:"global_shape",type:"u32",length:y.length},{name:"global_strides",type:"u32",length:_.length},{name:"input_output_strides",type:"u32",length:_.length}]),`
        ${k.declareVariables(v,$,T,S,C)}

        ${k.mainStart(Wt)}
          let half_rotary_emb_dim = uniforms.${T.name}_shape[1];
          let bsnh = global_idx / uniforms.global_strides % uniforms.global_shape;
          let size = uniforms.global_shape[0] * uniforms.global_strides[0];
          ${k.guardAgainstOutOfBoundsWorkgroupSizes("size")}

          if (bsnh[3] < half_rotary_emb_dim) {
            let position_ids_idx =
                ${$.broadcastedIndicesToOffset("bsnh.xy",j("",$.type.tensor,2))};
            let position_id =
                u32(${$.getByOffset("position_ids_idx")}) + select(0, bsnh[1], position_ids_idx == 0);
            let i = dot(bsnh, uniforms.input_output_strides) + select(0, bsnh[3], ${r});
            let j = i + select(half_rotary_emb_dim, 1, ${r});
            let re = ${v.getByOffset("i")} * ${T.get("position_id","bsnh[3]")} -
                ${v.getByOffset("j")} * ${S.get("position_id","bsnh[3]")};
            ${C.setByOffset("i","re")}
            let im = ${v.getByOffset("i")} * ${S.get("position_id","bsnh[3]")} +
                ${v.getByOffset("j")} * ${T.get("position_id","bsnh[3]")};
            ${C.setByOffset("j","im")}
          } else {
            let k = dot(bsnh, uniforms.input_output_strides) + half_rotary_emb_dim;
            ${C.setByOffset("k",v.getByOffset("k"))}
          }
        }`};return{name:"RotaryEmbedding",shaderCache:{hint:_e({interleaved:r}).cacheKey,inputDependencies:["rank","rank","rank","rank"]},getShaderSource:b,getRunData:()=>({outputs:[{dims:e[0].dims,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(O.size(y)/Wt)},programUniforms:w})}},Qh=(e,t)=>{md(e.inputs,t),e.compute(gd(e.inputs,t))}}),yd,_d,Zh,Xy=q(()=>{Y(),oe(),ue(),yd=e=>{if(!e||e.length<3)throw new Error("layerNorm requires at least 3 inputs.");let t=e[0],r=e[1],a=e[2];if(t.dataType!==r.dataType||t.dataType!==a.dataType)throw new Error("All inputs must have the same data type");if(t.dims.length!==3&&t.dims.length!==2)throw new Error("Input must be 2D or 3D");if(r.dims.length!==3&&r.dims.length!==2)throw new Error("Skip must be 2D or 3D");let s=t.dims[t.dims.length-1],i=t.dims[t.dims.length-2];if(r.dims[r.dims.length-1]!==s)throw new Error("Skip must have the same hidden size as input");if(r.dims[r.dims.length-2]!==i)throw new Error("Skip must have the same sequence length as input");if(a.dims.length!==1)throw new Error("Gamma must be 1D");if(a.dims[a.dims.length-1]!==s)throw new Error("Gamma must have the same hidden size as input");if(e.length>3){let o=e[3];if(o.dims.length!==1)throw new Error("Beta must be 1D");if(o.dims[o.dims.length-1]!==s)throw new Error("Beta must have the same hidden size as input")}if(e.length>4){let o=e[4];if(o.dims.length!==1)throw new Error("Bias must be 1D");if(o.dims[o.dims.length-1]!==s)throw new Error("Bias must have the same hidden size as input")}},_d=(e,t,r,a)=>{let s=t.simplified,i=e[0].dims,o=O.size(i),l=i,d=o,p=i.slice(-1)[0],g=a?i.slice(0,-1).concat(1):[],f=!s&&e.length>3,y=e.length>4,_=a&&r>1,w=a&&r>2,b=r>3,k=64,v=xe(p),$=[{type:12,data:d},{type:12,data:v},{type:12,data:p},{type:1,data:t.epsilon}],T=C=>{let E=[{name:"output_size",type:"u32"},{name:"components",type:"u32"},{name:"hidden_size",type:"u32"},{name:"epsilon",type:"f32"}],z=[M("x",e[0].dataType,e[0].dims,v),M("skip",e[1].dataType,e[1].dims,v),M("gamma",e[2].dataType,e[2].dims,v)];f&&z.push(M("beta",e[3].dataType,e[3].dims,v)),y&&z.push(M("bias",e[4].dataType,e[4].dims,v)),z.push(j("output",e[0].dataType,l,v)),_&&z.push(j("mean_output",1,g)),w&&z.push(j("inv_std_output",1,g)),b&&z.push(j("input_skip_bias_sum",e[0].dataType,l,v));let B=Ie(e[0].dataType),W=Ie(1,v);return`

      ${C.registerUniforms(E).declareVariables(...z)}
      var<workgroup> sum_shared : array<${W}, ${k}>;
      var<workgroup> sum_squared_shared : array<${W}, ${k}>;

      ${C.mainStart([k,1,1])}
        let ix = local_id.x;
        let iy = global_id.x / ${k};

        let hidden_size_vectorized: u32 = uniforms.hidden_size / uniforms.components;
        var stride = hidden_size_vectorized / ${k};
        let offset = ix * stride + iy * hidden_size_vectorized;
        let offset1d = stride * ix;
        if (ix == ${k-1}) {
          stride = hidden_size_vectorized - stride * ix;
        }
        for (var i: u32 = 0; i < stride; i++) {
          let skip_value = skip[offset + i];
          let bias_value = ${y?"bias[offset1d + i]":B+"(0.0)"};
          let input_value = x[offset + i];
          let value = input_value + skip_value + bias_value;
          ${b?"input_skip_bias_sum[offset + i] = value;":""}
          output[offset + i] = value;
          let f32_value = ${Pt(B,v,"value")};
          sum_shared[ix] += f32_value;
          sum_squared_shared[ix] += f32_value * f32_value;
        }
        workgroupBarrier();

        var reduce_size : u32 = ${k};
        for (var curr_size = reduce_size >> 1;  curr_size > 0; curr_size = reduce_size >> 1) {
          reduce_size = curr_size + (reduce_size & 1);
          if (ix < curr_size) {
            sum_shared[ix] += sum_shared[ix + reduce_size];
            sum_squared_shared[ix] += sum_squared_shared[ix + reduce_size];
          }
          workgroupBarrier();
        }

        let sum = sum_shared[0];
        let square_sum = sum_squared_shared[0];
        let mean = ${gt("sum",v)} / f32(uniforms.hidden_size);
        let inv_std_dev = inverseSqrt(${gt("square_sum",v)} / f32(uniforms.hidden_size) ${s?"":"- mean * mean"} + uniforms.epsilon);
        ${_?"mean_output[global_idx] = mean;":""}
        ${w?"inv_std_output[global_idx] = inv_std_dev;":""}

        for (var i: u32 = 0; i < stride; i++) {
          output[offset + i] = (output[offset + i] ${s?"":`- ${B}(mean)`}) *
            ${B}(inv_std_dev) * gamma[offset1d + i]
            ${f?"+ beta[offset1d + i]":""};
        }
      }`},S=[{dims:l,dataType:e[0].dataType}];return r>1&&S.push({dims:g,dataType:1}),r>2&&S.push({dims:g,dataType:1}),r>3&&S.push({dims:i,dataType:e[0].dataType}),{name:"SkipLayerNormalization",shaderCache:{hint:`${v};${_};${w};${b}`,inputDependencies:e.map((C,E)=>"type")},getShaderSource:T,getRunData:()=>({outputs:S,dispatchGroup:{x:Math.ceil(d/p)},programUniforms:$})}},Zh=(e,t)=>{yd(e.inputs);let r=[0];e.outputCount>1&&r.push(-3),e.outputCount>2&&r.push(-3),e.outputCount>3&&r.push(3),e.compute(_d(e.inputs,t,e.outputCount,!1),{outputs:r})}}),wd,er,bd,ea,$d,vd,Xh,Jh,Jy=q(()=>{Y(),oe(),ke(),ue(),wd=(e,t)=>{if(!e||e.length<1)throw new Error("too few inputs");if(t.axes.length!==0){if(t.axes.length!==t.starts.length||t.axes.length!==t.ends.length)throw new Error("axes, starts and ends must have the same length")}else if(t.starts.length!==t.ends.length)throw new Error("starts and ends must have the same length");e.slice(1).forEach((r,a)=>{if(e[a+1].dataType!==6&&e[a+1].dataType!==7)throw new Error(`Input ${a} must be an array of int32 or int64`)})},er=(e,t)=>{let r=[];if(e.length>t)if(e[t].dataType===7)e[t].getBigInt64Array().forEach(a=>r.push(Number(a)));else if(e[t].dataType===6)e[t].getInt32Array().forEach(a=>r.push(Number(a)));else throw new Error(`Input ${t} must be an array of int32 or int64`);return r},bd=(e,t)=>{if(e.length>1){let r=er(e,1),a=er(e,2),s=er(e,3);return s.length===0&&(s=[...Array(e[0].dims.length).keys()]),_e({starts:r,ends:a,axes:s})}else return t},ea=(e,t,r,a,s)=>{let i=e;return e<0&&(i+=r[a[t]]),s[t]<0?Math.max(0,Math.min(i,r[a[t]]-1)):Math.max(0,Math.min(i,r[a[t]]))},$d=(e,t,r)=>`fn calculateInputIndices(output_indices: ${t.type.indices}) -> ${e.type.indices} {
          var input_indices: ${e.type.indices};
          var carry = 0u;
          for (var i = ${r.length}; i >= 0; i--) {
            let input_shape_i = ${K("uniforms.input_shape","i",r.length)};
            let steps_i = ${K("uniforms.steps","i",r.length)};
            let signs_i = ${K("uniforms.signs","i",r.length)};
            let starts_i = ${K("uniforms.starts","i",r.length)};
            var output_index = ${t.indicesGet("output_indices","i")};
            var input_index = output_index * steps_i + starts_i + carry;
            carry = input_index / input_shape_i;
            input_index = input_index % input_shape_i;
            if (signs_i < 0) {
              input_index = input_shape_i - input_index - 1u + starts_i;
            }
            ${e.indicesSet("input_indices","i","input_index")};
          }
          return input_indices;
      }`,vd=(e,t)=>{let r=e[0].dims,a=O.size(r),s=t.axes.length>0?O.normalizeAxes(t.axes,r.length):[...Array(r.length).keys()],i=er(e,4);i.forEach(v=>v!==0||(()=>{throw new Error("step cannot be 0")})),i.length===0&&(i=Array(s.length).fill(1));let o=t.starts.map((v,$)=>ea(v,$,r,s,i)),l=t.ends.map((v,$)=>ea(v,$,r,s,i));if(s.length!==o.length||s.length!==l.length)throw new Error("start, ends and axes should have the same number of elements");if(s.length!==r.length)for(let v=0;v<r.length;++v)s.includes(v)||(o.splice(v,0,0),l.splice(v,0,r[v]),i.splice(v,0,1));let d=i.map(v=>Math.sign(v));i.forEach((v,$,T)=>{if(v<0){let S=(l[$]-o[$])/v,C=o[$],E=C+S*i[$];o[$]=E,l[$]=C,T[$]=-v}});let p=r.slice(0);s.forEach((v,$)=>{p[v]=Math.ceil((l[v]-o[v])/i[v])});let g={dims:p,dataType:e[0].dataType},f=j("output",e[0].dataType,p.length),y=M("input",e[0].dataType,e[0].dims.length),_=O.size(p),w=[{name:"outputSize",type:"u32"},{name:"starts",type:"u32",length:o.length},{name:"signs",type:"i32",length:d.length},{name:"steps",type:"u32",length:i.length}],b=[{type:12,data:_},{type:12,data:o},{type:6,data:d},{type:12,data:i},...Q(e[0].dims,p)],k=v=>`
      ${v.registerUniforms(w).declareVariables(y,f)}
        ${$d(y,f,r)}
        ${v.mainStart()}
          ${v.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
          let output_indices = ${f.offsetToIndices("global_idx")};
          let input_indices = calculateInputIndices(output_indices);
          ${f.setByOffset("global_idx",y.getByIndices("input_indices"))}
      }`;return{name:"Slice",shaderCache:{hint:`${d.length}_${o.length}_${i.length}`,inputDependencies:["rank"]},getShaderSource:k,getRunData:()=>({outputs:[g],dispatchGroup:{x:Math.ceil(a/64)},programUniforms:b})}},Xh=(e,t)=>{wd(e.inputs,t);let r=bd(e.inputs,t);e.compute(vd(e.inputs,r),{inputs:[0]})},Jh=e=>{let t=e.starts,r=e.ends,a=e.axes;return _e({starts:t,ends:r,axes:a})}}),xd,kd,Yh,ef,Yy=q(()=>{Y(),oe(),ke(),yt(),ue(),xd=e=>{if(!e||e.length!==1)throw new Error("Softmax op requires 1 input.")},kd=(e,t)=>{let r=e.inputs[0],a=r.dims,s=O.size(a),i=a.length,o=O.normalizeAxis(t.axis,i),l=o<a.length-1,d,p=[];l?(p=Array.from({length:i},(z,B)=>B),p[o]=i-1,p[i-1]=o,d=e.compute(Pe(r,p),{inputs:[r],outputs:[-1]})[0]):d=r;let g=d.dims,f=g[i-1],y=s/f,_=xe(f),w=f/_,b=64;y===1&&(b=256);let k=(z,B)=>B===4?`max(max(${z}.x, ${z}.y), max(${z}.z, ${z}.w))`:B===2?`max(${z}.x, ${z}.y)`:B===3?`max(max(${z}.x, ${z}.y), ${z}.z)`:z,v=M("x",d.dataType,d.dims,_),$=j("result",d.dataType,d.dims,_),T=v.type.value,S=Ie(d.dataType)==="f32"?`var threadMax = ${T}(-3.402823e+38f);`:`var threadMax = ${T}(-65504.0h);`,C=z=>`
      var<workgroup> rowMaxShared : ${T};
      var<workgroup> rowSumShared : ${T};
      var<workgroup> threadShared : array<${T}, ${b}>;

      fn getValue(row: i32, col: i32, row_stride: i32) -> ${T} {
        let index = row * row_stride + col;
        return x[index];
      }

      fn setValue(row: i32, col: i32, row_stride: i32, value: ${T}) {
        let index = row * row_stride + col;
        result[index] = value;
      }
      ${z.registerUniform("packedCols","i32").declareVariables(v,$)}
      ${z.mainStart(b)}
        let gindex = i32(global_idx);
        let lindex = i32(local_idx);
        const wg = ${b};
        let row = gindex / wg;
        let cols = uniforms.packedCols;
        let row_stride : i32 = uniforms.packedCols;

        // find the rows max
        ${S}
        for (var col = lindex; col < cols; col += wg) {
          let value = getValue(row, col, row_stride);
          threadMax = max(threadMax, value);
        }
        if (lindex < cols) {
          threadShared[lindex] = threadMax;
        }
        workgroupBarrier();

        var reduceSize = min(cols, wg);
        for (var currSize = reduceSize >> 1;  currSize > 0; currSize = reduceSize >> 1) {
          reduceSize = currSize + (reduceSize & 1);
          if (lindex < currSize) {
            threadShared[lindex] = max(threadShared[lindex], threadShared[lindex + reduceSize]);
          }
          workgroupBarrier();
        }
        if (lindex == 0) {
          rowMaxShared = ${T}(${k("threadShared[0]",_)});
        }
        workgroupBarrier();

        // find the rows sum
        var threadSum = ${T}(0.0);
        for (var col = lindex; col < cols; col += wg) {
          let subExp = exp(getValue(row, col, row_stride) - rowMaxShared);
          threadSum += subExp;
        }
        threadShared[lindex] = threadSum;
        workgroupBarrier();

        for (var currSize = wg >> 1;  currSize > 0; currSize = currSize >> 1) {
          if (lindex < currSize) {
            threadShared[lindex] = threadShared[lindex] + threadShared[lindex + currSize];
          }
          workgroupBarrier();
        }
        if (lindex == 0) {
          rowSumShared = ${T}(${gt("threadShared[0]",_)});
        }
        workgroupBarrier();

        // calculate final value for each element in the row
        for (var col = lindex; col < cols; col += wg) {
          let value = exp(getValue(row, col, row_stride) - rowMaxShared) / rowSumShared;
          setValue(row, col, row_stride, value);
        }
      }`,E=e.compute({name:"Softmax",shaderCache:{hint:`${_};${b}`,inputDependencies:["type"]},getRunData:()=>({outputs:[{dims:g,dataType:d.dataType}],dispatchGroup:{x:y},programUniforms:[{type:6,data:w}]}),getShaderSource:C},{inputs:[d],outputs:[l?-1:0]})[0];l&&e.compute(Pe(E,p),{inputs:[E]})},Yh=(e,t)=>{xd(e.inputs),kd(e,t)},ef=e=>_e({axis:e.axis})}),ta,Sd,Td,Cd,tf,e0=q(()=>{Y(),oe(),ue(),ta=e=>Array.from(e.getBigInt64Array(),Number),Sd=e=>{if(!e||e.length!==2)throw new Error("Tile requires 2 inputs.");if(e[0].dataType!==1&&e[0].dataType!==10&&e[0].dataType!==6&&e[0].dataType!==12)throw new Error("Tile only support float, float16, int32, and uint32 data types");if(e[1].dataType!==7)throw new Error("Tile `repeats` input should be of int64 data type");if(e[1].dims.length!==1)throw new Error("Tile `repeats` input should be 1-D");if(ta(e[1]).length!==e[0].dims.length)throw new Error("Tile `repeats` input should have same number of elements as rank of input data tensor")},Td=(e,t)=>{let r=[];for(let a=0;a<e.length;++a)r.push(e[a]*t[a]);return r},Cd=(e,t)=>{let r=e[0].dims,a=t??ta(e[1]),s=Td(r,a),i=O.size(s),o=e[0].dataType,l=M("input",o,r.length),d=j("output",o,s.length),p=g=>`
      const inputShape = ${l.indices(...r)};
      ${g.registerUniform("output_size","u32").declareVariables(l,d)}
      ${g.mainStart()}
      ${g.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let output_indices = ${d.offsetToIndices("global_idx")};
      var input_indices: ${l.type.indices};
      for (var i = 0; i < ${r.length}; i++) {
        let input_dim_i = ${l.indicesGet("uniforms.input_shape","i")};
        let input_dim_value = ${d.indicesGet("output_indices","i")}  % input_dim_i;

        ${l.indicesSet("input_indices","i","input_dim_value")}
      }
      ${d.setByOffset("global_idx",l.getByIndices("input_indices"))}
    }`;return{name:"Tile",shaderCache:{hint:`${a}`,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:s,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(i/64)},programUniforms:[{type:12,data:i},...Q(e[0].dims,s)]}),getShaderSource:p}},tf=e=>{Sd(e.inputs),e.compute(Cd(e.inputs),{inputs:[0]})}}),Id,Ed,rf,t0=q(()=>{Y(),oe(),ue(),Id=(e,t,r,a,s)=>{let i=j("output_data",s,r.length,4),o=M("a_data",t[1].dataType,t[1].dims.length,4),l=M("b_data",t[2].dataType,t[2].dims.length,4),d=M("c_data",t[0].dataType,t[0].dims.length,4),p,g=(f,y,_)=>`select(${y}, ${f}, ${_})`;if(!a)p=i.setByOffset("global_idx",g(o.getByOffset("global_idx"),l.getByOffset("global_idx"),d.getByOffset("global_idx")));else{let f=(y,_,w="")=>{let b=`a_data[index_a${_}][component_a${_}]`,k=`b_data[index_b${_}][component_b${_}]`,v=`bool(c_data[index_c${_}] & (0xffu << (component_c${_} * 8)))`;return`
            let output_indices${_} = ${i.offsetToIndices(`global_idx * 4u + ${_}u`)};
            let offset_a${_} = ${o.broadcastedIndicesToOffset(`output_indices${_}`,i)};
            let offset_b${_} = ${l.broadcastedIndicesToOffset(`output_indices${_}`,i)};
            let offset_c${_} = ${d.broadcastedIndicesToOffset(`output_indices${_}`,i)};
            let index_a${_} = offset_a${_} / 4u;
            let index_b${_} = offset_b${_} / 4u;
            let index_c${_} = offset_c${_} / 4u;
            let component_a${_} = offset_a${_} % 4u;
            let component_b${_} = offset_b${_} % 4u;
            let component_c${_} = offset_c${_} % 4u;
            ${y}[${_}] = ${w}(${g(b,k,v)});
          `};s===9?p=`
            var data = vec4<u32>(0);
            ${f("data",0,"u32")}
            ${f("data",1,"u32")}
            ${f("data",2,"u32")}
            ${f("data",3,"u32")}
            output_data[global_idx] = dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(data));`:p=`
            ${f("output_data[global_idx]",0)}
            ${f("output_data[global_idx]",1)}
            ${f("output_data[global_idx]",2)}
            ${f("output_data[global_idx]",3)}
          `}return`
        ${e.registerUniform("vec_size","u32").declareVariables(d,o,l,i)}
        ${e.mainStart()}
        ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
        ${p}
      }`},Ed=e=>{let t=e[1].dims,r=e[2].dims,a=e[0].dims,s=e[1].dataType,i=!(O.areEqual(t,r)&&O.areEqual(r,a)),o=t,l=O.size(t);if(i){let p=Ut.calcShape(Ut.calcShape(t,r,!1),a,!1);if(!p)throw new Error("Can't perform where op on the given tensors");o=p,l=O.size(o)}let d=Math.ceil(l/4);return{name:"Where",shaderCache:{inputDependencies:["rank","rank","rank"]},getShaderSource:p=>Id(p,e,o,i,s),getRunData:()=>({outputs:[{dims:o,dataType:s}],dispatchGroup:{x:Math.ceil(l/64/4)},programUniforms:[{type:12,data:d},...Q(a,t,r,o)]})}},rf=e=>{e.compute(Ed(e.inputs))}}),af,r0=q(()=>{my(),qa(),gy(),yy(),_y(),wy(),by(),Sy(),Cy(),Iy(),Ey(),zy(),Ay(),Oy(),Ry(),By(),My(),Ny(),Dy(),Py(),Uy(),Wy(),qy(),Vy(),Ly(),xh(),Gy(),Hy(),Fy(),jy(),Ky(),Wa(),Qy(),Zy(),Xy(),Jy(),Yy(),Th(),e0(),yt(),Va(),t0(),af=new Map([["Abs",[Xp]],["Acos",[Jp]],["Acosh",[Yp]],["Add",[Rc]],["ArgMax",[jp,ma]],["ArgMin",[Fp,ma]],["Asin",[ec]],["Asinh",[tc]],["Atan",[rc]],["Atanh",[ic]],["Attention",[Kp]],["AveragePool",[Mh,Bh]],["BatchNormalization",[Qp]],["BiasAdd",[Zp]],["BiasSplitGelu",[Oc]],["Cast",[nc,ac]],["Ceil",[oc]],["Clip",[sc]],["Concat",[Lc,Gc]],["Conv",[$a,ba]],["ConvTranspose",[eh,Yc]],["Cos",[uc]],["Cosh",[lc]],["CumSum",[th,rh]],["DepthToSpace",[ih,ah]],["DequantizeLinear",[Vh,Lh]],["Div",[Bc]],["Einsum",[nh,sh]],["Elu",[dc,nr]],["Equal",[Mc]],["Erf",[pc]],["Exp",[cc]],["Expand",[oh]],["FastGelu",[uh]],["Floor",[hc]],["FusedConv",[$a,ba]],["Gather",[dh,lh]],["GatherElements",[gh,mh]],["GatherBlockQuantized",[hh,fh]],["GatherND",[ph,ch]],["Gelu",[fc]],["Gemm",[_h,yh]],["GlobalAveragePool",[Dh,Nh]],["GlobalMaxPool",[qh,Wh]],["Greater",[Uc]],["GreaterOrEqual",[qc]],["GridSample",[wh,bh]],["GroupQueryAttention",[Ch]],["HardSigmoid",[vc,$c]],["InstanceNormalization",[Ih]],["LayerNormalization",[Eh]],["LeakyRelu",[mc,nr]],["Less",[Wc]],["LessOrEqual",[Vc]],["Log",[zc]],["MatMul",[zh]],["MatMulNBits",[Ah,Oh]],["MaxPool",[Ph,Uh]],["Mul",[Nc]],["MultiHeadAttention",[vh,$h]],["Neg",[yc]],["Not",[gc]],["Pad",[Rh]],["Pow",[Dc]],["QuickGelu",[Ac,nr]],["Range",[Gh]],["Reciprocal",[_c]],["ReduceMin",[qp]],["ReduceMean",[Np]],["ReduceMax",[Wp]],["ReduceSum",[Lp]],["ReduceProd",[Vp]],["ReduceL1",[Dp]],["ReduceL2",[Pp]],["ReduceLogSum",[Hp]],["ReduceLogSumExp",[Up]],["ReduceSumSquare",[Gp]],["Relu",[wc]],["Resize",[jh,Kh]],["RotaryEmbedding",[Qh]],["ScatterND",[Fh,Hh]],["Sigmoid",[bc]],["Sin",[xc]],["Sinh",[kc]],["Slice",[Xh,Jh]],["SkipLayerNormalization",[Zh]],["Split",[kh,Sh]],["Sqrt",[Sc]],["Softmax",[Yh,ef]],["Sub",[Pc]],["Tan",[Tc]],["Tanh",[Cc]],["ThresholdedRelu",[Ec,nr]],["Tile",[tf]],["Transpose",[kp,Sp]],["Where",[rf]]])}),nf,i0=q(()=>{Ze(),st(),ue(),nf=class{constructor(e){this.backend=e,this.repo=new Map,this.attributesBound=!1}getArtifact(e){return this.repo.get(e)}setArtifact(e,t){this.repo.set(e,t)}run(e,t,r,a,s){tt(e.programInfo.name);let i=this.backend.device,o=this.backend.getComputePassEncoder();this.backend.writeTimestamp(this.backend.pendingDispatchNumber*2);let l=[];for(let p of t)l.push({binding:l.length,resource:{buffer:p.buffer}});for(let p of r)l.push({binding:l.length,resource:{buffer:p.buffer}});s&&l.push({binding:l.length,resource:s});let d=i.createBindGroup({layout:e.computePipeline.getBindGroupLayout(0),entries:l,label:e.programInfo.name});if(this.backend.sessionStatus==="capturing"){let p={kernelId:this.backend.currentKernelId,computePipeline:e.computePipeline,bindGroup:d,dispatchGroup:a};this.backend.capturedCommandList.get(this.backend.currentSessionId).push(p)}o.setPipeline(e.computePipeline),o.setBindGroup(0,d),o.dispatchWorkgroups(...a),this.backend.writeTimestamp(this.backend.pendingDispatchNumber*2+1),this.backend.pendingDispatchNumber++,(this.backend.pendingDispatchNumber>=this.backend.maxDispatchNumber||this.backend.queryType==="at-passes")&&this.backend.endComputePass(),this.backend.pendingDispatchNumber>=this.backend.maxDispatchNumber&&this.backend.flush(),Qe(e.programInfo.name)}dispose(){}build(e,t){tt(e.name);let r=this.backend.device,a=[];[{feature:"shader-f16",extension:"f16"},{feature:"subgroups",extension:"subgroups"},{feature:"subgroups-f16",extension:"subgroups_f16"}].forEach(p=>{r.features.has(p.feature)&&a.push(`enable ${p.extension};`)});let s=xp(t,this.backend.device.limits),i=e.getShaderSource(s),o=`${a.join(`
`)}
${s.additionalImplementations}
${i}`,l=r.createShaderModule({code:o,label:e.name});pe("verbose",()=>`[WebGPU] ${e.name} shader code: ${o}`);let d=r.createComputePipeline({compute:{module:l,entryPoint:"main"},layout:"auto",label:e.name});return Qe(e.name),{programInfo:e,computePipeline:d,uniformVariablesInfo:s.variablesInfo}}normalizeDispatchGroupSize(e){let t=typeof e=="number"?e:e.x,r=typeof e=="number"?1:e.y||1,a=typeof e=="number"?1:e.z||1,s=this.backend.device.limits.maxComputeWorkgroupsPerDimension;if(t<=s&&r<=s&&a<=s)return[t,r,a];let i=t*r*a,o=Math.ceil(Math.sqrt(i));if(o>s){if(o=Math.ceil(Math.cbrt(i)),o>s)throw new Error("Total dispatch size exceeds WebGPU maximum.");return[o,o,o]}else return[o,o,1]}}}),zd,Ad,Od,Rd,sf,a0=q(()=>{Ze(),Y(),st(),yp(),hy(),r0(),i0(),zd=(e,t)=>{if(t.length!==e.length)throw new Error(`inputDependencies length ${t.length} is not equal to inputTensors length ${e.length}.`);let r=[];for(let a=0;a<e.length;++a){let s=e[a].dataType;switch(t[a]){case"none":{r.push("");break}case"type":{r.push(`${s}`);break}case"rank":{let i=e[a].dims.length;r.push(`${s};${i}`);break}case"dims":{let i=e[a].dims.join(",");r.push(`${s};${i}`);break}default:throw new Error(`unsupported input dependency: ${t[a]}`)}}return r.join("|")},Ad=(e,t,r)=>{var s,i;let a=e.name;return(s=e.shaderCache)!=null&&s.hint&&(a+="["+e.shaderCache.hint+"]"),a+=":"+r+`:${zd(t,((i=e.shaderCache)==null?void 0:i.inputDependencies)??new Array(t.length).fill("dims"))}`,a},Od=class{constructor(e){e&&(this.architecture=e.architecture,this.vendor=e.vendor)}isArchitecture(e){return this.architecture===e}isVendor(e){return this.vendor===e}},Rd=class{constructor(e){this.subgroupsSupported=e.features.has("subgroups"),this.subgroupsF16Supported=e.features.has("subgroups");let t=e.limits;!this.subgroupsSupported||!t.minSubgroupSize||!t.maxSubgroupSize?this.subgroupSizeRange=void 0:this.subgroupSizeRange=[t.minSubgroupSize,t.maxSubgroupSize]}},sf=class{constructor(){this.currentSessionId=null,this.currentKernelId=null,this.commandEncoder=null,this.computePassEncoder=null,this.maxDispatchNumber=16,this.pendingDispatchNumber=0,this.pendingKernels=[],this.pendingQueries=new Map,this.sessionStatus="default",this.capturedCommandList=new Map,this.capturedPendingKernels=new Map,this.sessionExternalDataMapping=new Map}get currentKernelCustomData(){if(this.currentKernelId===null)throw new Error("currentKernelCustomData(): currentKernelId is null. (should not happen)");let e=this.kernelCustomData.get(this.currentKernelId);return e||(e={},this.kernelCustomData.set(this.currentKernelId,e)),e}async initialize(e,t){this.env=e;let r=[],a={requiredLimits:{maxComputeWorkgroupStorageSize:t.limits.maxComputeWorkgroupStorageSize,maxComputeWorkgroupsPerDimension:t.limits.maxComputeWorkgroupsPerDimension,maxStorageBufferBindingSize:t.limits.maxStorageBufferBindingSize,maxBufferSize:t.limits.maxBufferSize,maxComputeInvocationsPerWorkgroup:t.limits.maxComputeInvocationsPerWorkgroup,maxComputeWorkgroupSizeX:t.limits.maxComputeWorkgroupSizeX,maxComputeWorkgroupSizeY:t.limits.maxComputeWorkgroupSizeY,maxComputeWorkgroupSizeZ:t.limits.maxComputeWorkgroupSizeZ},requiredFeatures:r},s=i=>t.features.has(i)&&r.push(i)&&!0;s("chromium-experimental-timestamp-query-inside-passes")||s("timestamp-query"),s("shader-f16"),s("subgroups")&&s("subgroups-f16"),this.device=await t.requestDevice(a),this.deviceInfo=new Rd(this.device),this.adapterInfo=new Od(t.info||await t.requestAdapterInfo()),this.gpuDataManager=_p(this),this.programManager=new nf(this),this.kernels=new Map,this.kernelPersistentData=new Map,this.kernelCustomData=new Map,Na(e.logLevel,!!e.debug),this.device.onuncapturederror=i=>{i.error instanceof GPUValidationError&&console.error(`An uncaught WebGPU validation error was raised: ${i.error.message}`)},Object.defineProperty(this.env.webgpu,"device",{value:this.device,writable:!1,enumerable:!0,configurable:!1}),Object.defineProperty(this.env.webgpu,"adapter",{value:t,writable:!1,enumerable:!0,configurable:!1}),this.setQueryType()}dispose(){typeof this.querySet<"u"&&this.querySet.destroy(),this.gpuDataManager.dispose()}getCommandEncoder(){return this.commandEncoder||(this.commandEncoder=this.device.createCommandEncoder()),this.commandEncoder}getComputePassEncoder(){if(!this.computePassEncoder){let e=this.getCommandEncoder(),t={};this.queryType==="at-passes"&&(t.timestampWrites={querySet:this.querySet,beginningOfPassWriteIndex:this.pendingDispatchNumber*2,endOfPassWriteIndex:this.pendingDispatchNumber*2+1}),this.computePassEncoder=e.beginComputePass(t)}return this.computePassEncoder}endComputePass(){this.computePassEncoder&&(this.computePassEncoder.end(),this.computePassEncoder=null)}flush(){if(!this.commandEncoder)return;tt(),this.endComputePass();let e;this.queryType!=="none"&&(this.commandEncoder.resolveQuerySet(this.querySet,0,this.pendingDispatchNumber*2,this.queryResolveBuffer,0),e=this.device.createBuffer({size:this.pendingDispatchNumber*2*8,usage:GPUBufferUsage.MAP_READ|GPUBufferUsage.COPY_DST}),this.pendingQueries.set(e,this.pendingKernels),this.pendingKernels=[],this.commandEncoder.copyBufferToBuffer(this.queryResolveBuffer,0,e,0,this.pendingDispatchNumber*2*8)),this.device.queue.submit([this.commandEncoder.finish()]),this.gpuDataManager.refreshPendingBuffers(),this.commandEncoder=null,this.pendingDispatchNumber=0,this.queryType!=="none"&&e.mapAsync(GPUMapMode.READ).then(()=>{var a;let t=new BigUint64Array(e.getMappedRange()),r=this.pendingQueries.get(e);for(let s=0;s<t.length/2;s++){let i=r[s],o=i.kernelId,l=this.kernels.get(o),d=l.kernelType,p=l.kernelName,g=i.programName,f=i.inputTensorViews,y=i.outputTensorViews,_=t[s*2],w=t[s*2+1];typeof this.queryTimeBase>"u"&&(this.queryTimeBase=_);let b=Number(_-this.queryTimeBase),k=Number(w-this.queryTimeBase);if(!Number.isSafeInteger(b)||!Number.isSafeInteger(k))throw new RangeError("incorrect timestamp range");if((a=this.env.webgpu.profiling)!=null&&a.ondata)this.env.webgpu.profiling.ondata({version:1,inputsMetadata:f.map(v=>({dims:v.dims,dataType:Tt(v.dataType)})),outputsMetadata:y.map(v=>({dims:v.dims,dataType:Tt(v.dataType)})),kernelId:o,kernelType:d,kernelName:p,programName:g,startTime:b,endTime:k});else{let v="";f.forEach((T,S)=>{v+=`input[${S}]: [${T.dims}] | ${Tt(T.dataType)}, `});let $="";y.forEach((T,S)=>{$+=`output[${S}]: [${T.dims}] | ${Tt(T.dataType)}, `}),console.log(`[profiling] kernel "${o}|${d}|${p}|${g}" ${v}${$}execution time: ${k-b} ns`)}Pr("GPU",`${g}::${_}::${w}`)}e.unmap(),this.pendingQueries.delete(e)}),Qe()}run(e,t,r,a,s,i){tt(e.name);let o=[];for(let $=0;$<t.length;++$){let T=t[$].data;if(T===0)continue;let S=this.gpuDataManager.get(T);if(!S)throw new Error(`no GPU data for input: ${T}`);o.push(S)}let{outputs:l,dispatchGroup:d,programUniforms:p}=e.getRunData(t),g=r.length===0?l.map(($,T)=>T):r;if(g.length!==l.length)throw new Error(`Output size ${g.length} must be equal to ${l.length}.`);let f=[],y=[];for(let $=0;$<l.length;++$){if(!Number.isInteger(g[$])||g[$]<-3||g[$]>=i)throw new Error(`Invalid output index: ${g[$]}`);if(g[$]===-3)continue;let T=g[$]===-1,S=g[$]===-2,C=T||S?s(l[$].dataType,l[$].dims):a(g[$],l[$].dataType,l[$].dims);if(f.push(C),C.data===0)continue;let E=this.gpuDataManager.get(C.data);if(!E)throw new Error(`no GPU data for output: ${C.data}`);if(T&&this.temporaryData.push(E),S){let z=this.kernelPersistentData.get(this.currentKernelId);z||(z=[],this.kernelPersistentData.set(this.currentKernelId,z)),z.push(E)}y.push(E)}if(o.length!==t.length||y.length!==f.length){if(y.length===0)return Qe(e.name),f;throw new Error(`Program ${e.name} has zero-sized tensor(s) in inputs or outputs. This is not supported now.`)}let _;if(p){let $=0,T=[];p.forEach(z=>{let B=typeof z.data=="number"?[z.data]:z.data;if(B.length===0)return;let W=z.type===10?2:4,G,ee;z.type===10?(ee=B.length>4?16:B.length>2?8:B.length*W,G=B.length>4?16:W*B.length):(ee=B.length<=2?B.length*W:16,G=16),$=Math.ceil($/ee)*ee,T.push($);let ae=z.type===10?8:4;$+=B.length>4?Math.ceil(B.length/ae)*G:B.length*W});let S=16;$=Math.ceil($/S)*S;let C=new ArrayBuffer($);p.forEach((z,B)=>{let W=T[B],G=typeof z.data=="number"?[z.data]:z.data;if(z.type===6)new Int32Array(C,W,G.length).set(G);else if(z.type===12)new Uint32Array(C,W,G.length).set(G);else if(z.type===10)new Uint16Array(C,W,G.length).set(G);else if(z.type===1)new Float32Array(C,W,G.length).set(G);else throw new Error(`Unsupported uniform type: ${Tt(z.type)}`)});let E=this.gpuDataManager.create($,GPUBufferUsage.COPY_DST|GPUBufferUsage.UNIFORM);this.device.queue.writeBuffer(E.buffer,0,C,0,$),this.gpuDataManager.release(E.id),_={offset:0,size:$,buffer:E.buffer}}let w=this.programManager.normalizeDispatchGroupSize(d),b=w[1]===1&&w[2]===1,k=Ad(e,t,b),v=this.programManager.getArtifact(k);if(v||(v=this.programManager.build(e,w),this.programManager.setArtifact(k,v),pe("info",()=>`[artifact] key: ${k}, programName: ${e.name}`)),p&&v.uniformVariablesInfo){if(p.length!==v.uniformVariablesInfo.length)throw new Error(`Uniform variables count mismatch: expect ${v.uniformVariablesInfo.length}, got ${p.length} in program "${v.programInfo.name}".`);for(let $=0;$<p.length;$++){let T=p[$],S=T.type,C=typeof T.data=="number"?1:T.data.length,[E,z]=v.uniformVariablesInfo[$];if(S!==E||C!==z)throw new Error(`Uniform variable ${$} mismatch: expect type ${E} with size ${z}, got type ${S} with size ${C} in program "${v.programInfo.name}".`)}}if(pe("info",()=>`[ProgramManager] run "${e.name}" (key=${k}) with ${w[0]}x${w[1]}x${w[2]}`),this.queryType!=="none"||this.sessionStatus==="capturing"){let $={kernelId:this.currentKernelId,programName:v.programInfo.name,inputTensorViews:t,outputTensorViews:f};this.pendingKernels.push($),this.sessionStatus==="capturing"&&this.capturedPendingKernels.get(this.currentSessionId).push($)}return this.programManager.run(v,o,y,w,_),Qe(e.name),f}upload(e,t){this.gpuDataManager.upload(e,t)}memcpy(e,t){this.gpuDataManager.memcpy(e,t)}async download(e,t){await this.gpuDataManager.download(e,t)}alloc(e){return this.gpuDataManager.create(e).id}free(e){return this.gpuDataManager.release(e)}createKernel(e,t,r,a){let s=af.get(e);if(!s)throw new Error(`kernel not implemented: ${e}`);let i={kernelType:e,kernelName:a,kernelEntry:s[0],attributes:[s[1],r]};this.kernels.set(t,i)}releaseKernel(e){let t=this.kernelPersistentData.get(e);if(t){for(let r of t)this.gpuDataManager.release(r.id);this.kernelPersistentData.delete(e)}this.kernelCustomData.delete(e),this.kernels.delete(e)}computeKernel(e,t,r){let a=this.kernels.get(e);if(!a)throw new Error(`kernel not created: ${e}`);let s=a.kernelType,i=a.kernelName,o=a.kernelEntry,l=a.attributes;if(this.currentKernelId!==null)throw new Error(`kernel "[${s}] ${i}" is not allowed to be called recursively`);this.currentKernelId=e,l[0]&&(l[1]=l[0](l[1]),l[0]=void 0),pe("info",()=>`[WebGPU] Start to run kernel "[${s}] ${i}"...`);let d=this.env.debug;this.temporaryData=[];try{return d&&this.device.pushErrorScope("validation"),o(t,l[1]),0}catch(p){return r.push(Promise.resolve(`[WebGPU] Kernel "[${s}] ${i}" failed. ${p}`)),1}finally{d&&r.push(this.device.popErrorScope().then(p=>p?`GPU validation error for kernel "[${s}] ${i}": ${p.message}`:null));for(let p of this.temporaryData)this.gpuDataManager.release(p.id);this.temporaryData=[],this.currentKernelId=null}}registerBuffer(e,t,r,a){let s=this.sessionExternalDataMapping.get(e);s||(s=new Map,this.sessionExternalDataMapping.set(e,s));let i=s.get(t),o=this.gpuDataManager.registerExternalBuffer(r,a,i);return s.set(t,[o,r]),o}unregisterBuffers(e){let t=this.sessionExternalDataMapping.get(e);t&&(t.forEach(r=>this.gpuDataManager.unregisterExternalBuffer(r[0])),this.sessionExternalDataMapping.delete(e))}getBuffer(e){let t=this.gpuDataManager.get(e);if(!t)throw new Error(`no GPU data for buffer: ${e}`);return t.buffer}createDownloader(e,t,r){return async()=>{let a=await ca(this,e,t);return Da(a.buffer,r)}}writeTimestamp(e){this.queryType==="inside-passes"&&this.computePassEncoder.writeTimestamp(this.querySet,e)}setQueryType(){var e;this.queryType="none",(((e=this.env.webgpu.profiling)==null?void 0:e.mode)==="default"||(typeof this.env.trace>"u"?this.env.wasm.trace:this.env.trace))&&(this.device.features.has("chromium-experimental-timestamp-query-inside-passes")?this.queryType="inside-passes":this.device.features.has("timestamp-query")&&(this.queryType="at-passes"),this.queryType!=="none"&&typeof this.querySet>"u"&&(this.querySet=this.device.createQuerySet({type:"timestamp",count:this.maxDispatchNumber*2}),this.queryResolveBuffer=this.device.createBuffer({size:this.maxDispatchNumber*2*8,usage:GPUBufferUsage.COPY_SRC|GPUBufferUsage.QUERY_RESOLVE})))}captureBegin(){pe("info","captureBegin"),this.capturedCommandList.get(this.currentSessionId)||this.capturedCommandList.set(this.currentSessionId,[]),this.capturedPendingKernels.get(this.currentSessionId)||this.capturedPendingKernels.set(this.currentSessionId,[]),this.flush(),this.sessionStatus="capturing"}captureEnd(){pe("info","captureEnd"),this.flush(),this.sessionStatus="default"}replay(){pe("info","replay"),this.sessionStatus="replaying";let e=this.capturedCommandList.get(this.currentSessionId),t=this.capturedPendingKernels.get(this.currentSessionId),r=e.length;this.pendingKernels=[];for(let a=0;a<r;a++){let s=this.getComputePassEncoder(),i=e[a];this.writeTimestamp(this.pendingDispatchNumber*2),s.setPipeline(i.computePipeline),s.setBindGroup(0,i.bindGroup),s.dispatchWorkgroups(...i.dispatchGroup),this.writeTimestamp(this.pendingDispatchNumber*2+1),this.pendingDispatchNumber++,this.queryType!=="none"&&this.pendingKernels.push(t[a]),(this.pendingDispatchNumber>=this.maxDispatchNumber||this.queryType==="at-passes")&&this.endComputePass(),this.pendingDispatchNumber>=this.maxDispatchNumber&&this.flush()}this.flush(),this.sessionStatus="default"}onCreateSession(){this.gpuDataManager.onCreateSession()}onReleaseSession(e){this.unregisterBuffers(e),this.capturedCommandList.has(e)&&this.capturedCommandList.delete(e),this.capturedPendingKernels.has(e)&&this.capturedPendingKernels.delete(e),this.gpuDataManager.onReleaseSession(e)}onRunStart(e){this.currentSessionId=e,this.setQueryType()}}}),Bd,ra,Md,ia,aa,na,Nd,of,n0=q(()=>{st(),Bd=1,ra=()=>Bd++,Md=new Map([["float32",32],["float16",16],["int32",32],["uint32",32],["int64",64],["uint64",64],["int8",8],["uint8",8],["int4",4],["uint4",4]]),ia=(e,t)=>{let r=Md.get(e);if(!r)throw new Error("Unsupported data type.");return t.length>0?Math.ceil(t.reduce((a,s)=>a*s)*r/8):0},aa=class{constructor(e){this.sessionId=e.sessionId,this.mlContext=e.context,this.mlTensor=e.tensor,this.dataType=e.dataType,this.tensorShape=e.shape}get tensor(){return this.mlTensor}get type(){return this.dataType}get shape(){return this.tensorShape}get byteLength(){return ia(this.dataType,this.tensorShape)}destroy(){pe("verbose",()=>"[WebNN] TensorWrapper.destroy"),this.mlTensor.destroy()}write(e){this.mlContext.writeTensor(this.mlTensor,e)}async read(e){return e?this.mlContext.readTensor(this.mlTensor,e):this.mlContext.readTensor(this.mlTensor)}canReuseTensor(e,t,r){return this.mlContext===e&&this.dataType===t&&this.tensorShape.length===r.length&&this.tensorShape.every((a,s)=>a===r[s])}},na=class{constructor(e,t){this.tensorManager=e,this.wrapper=t}get tensorWrapper(){return this.wrapper}releaseTensor(){this.tensorWrapper&&(this.tensorManager.releaseTensor(this.tensorWrapper),this.wrapper=void 0)}async ensureTensor(e,t,r,a){let s=this.tensorManager.getMLContext(e);if(this.wrapper){if(this.wrapper.canReuseTensor(s,t,r))return this.wrapper.tensor;if(a){if(this.wrapper.byteLength!==ia(t,r))throw new Error("Unable to copy data to tensor with different size.");this.activeUpload=new Uint8Array(await this.wrapper.read())}this.tensorManager.releaseTensor(this.wrapper)}let i=typeof MLTensorUsage>"u"?void 0:MLTensorUsage.READ|MLTensorUsage.WRITE;return this.wrapper=await this.tensorManager.getCachedTensor(e,t,r,i,!0,!0),a&&this.activeUpload&&(this.wrapper.write(this.activeUpload),this.activeUpload=void 0),this.wrapper.tensor}upload(e){if(this.wrapper)if(e.byteLength===this.wrapper.byteLength){this.wrapper.write(e);return}else pe("verbose",()=>"Data size does not match tensor size. Releasing tensor."),this.releaseTensor();this.activeUpload?this.activeUpload.set(e):this.activeUpload=new Uint8Array(e)}async download(e){if(this.activeUpload)if(e){e instanceof ArrayBuffer?new Uint8Array(e).set(this.activeUpload):new Uint8Array(e.buffer,e.byteOffset,e.byteLength).set(this.activeUpload);return}else return this.activeUpload.buffer;if(!this.wrapper)throw new Error("Tensor has not been created.");return e?this.wrapper.read(e):this.wrapper.read()}},Nd=class{constructor(e){this.backend=e,this.tensorTrackersById=new Map,this.freeTensors=[],this.externalTensors=new Set}getMLContext(e){let t=this.backend.getMLContext(e);if(!t)throw new Error("MLContext not found for session.");return t}reserveTensorId(){let e=ra();return this.tensorTrackersById.set(e,new na(this)),e}releaseTensorId(e){let t=this.tensorTrackersById.get(e);t&&(this.tensorTrackersById.delete(e),t.tensorWrapper&&this.releaseTensor(t.tensorWrapper))}async ensureTensor(e,t,r,a,s){pe("verbose",()=>`[WebNN] TensorManager.ensureTensor {tensorId: ${t}, dataType: ${r}, shape: ${a}, copyOld: ${s}}`);let i=this.tensorTrackersById.get(t);if(!i)throw new Error("Tensor not found.");return i.ensureTensor(e,r,a,s)}upload(e,t){let r=this.tensorTrackersById.get(e);if(!r)throw new Error("Tensor not found.");r.upload(t)}async download(e,t){pe("verbose",()=>`[WebNN] TensorManager.download {tensorId: ${e}, dstBuffer: ${t==null?void 0:t.byteLength}}`);let r=this.tensorTrackersById.get(e);if(!r)throw new Error("Tensor not found.");return r.download(t)}releaseTensorsForSession(e){for(let t of this.freeTensors)t.sessionId===e&&t.destroy();this.freeTensors=this.freeTensors.filter(t=>t.sessionId!==e)}registerTensor(e,t,r,a){let s=this.getMLContext(e),i=ra(),o=new aa({sessionId:e,context:s,tensor:t,dataType:r,shape:a});return this.tensorTrackersById.set(i,new na(this,o)),this.externalTensors.add(o),i}async getCachedTensor(e,t,r,a,s,i){let o=this.getMLContext(e);for(let[d,p]of this.freeTensors.entries())if(p.canReuseTensor(o,t,r)){pe("verbose",()=>`[WebNN] Reusing tensor {dataType: ${t}, shape: ${r}}`);let g=this.freeTensors.splice(d,1)[0];return g.sessionId=e,g}pe("verbose",()=>`[WebNN] MLContext.createTensor {dataType: ${t}, shape: ${r}}`);let l=await o.createTensor({dataType:t,shape:r,dimensions:r,usage:a,writable:s,readable:i});return new aa({sessionId:e,context:o,tensor:l,dataType:t,shape:r})}releaseTensor(e){this.externalTensors.has(e)&&this.externalTensors.delete(e),this.freeTensors.push(e)}},of=(...e)=>new Nd(...e)}),Ar,Dd,uf,s0=q(()=>{Y(),At(),yp(),n0(),st(),Ar=new Map([[1,"float32"],[10,"float16"],[6,"int32"],[12,"uint32"],[7,"int64"],[13,"uint64"],[22,"int4"],[21,"uint4"],[3,"int8"],[2,"uint8"],[9,"uint8"]]),Dd=(e,t)=>{if(e===t)return!0;if(e===void 0||t===void 0)return!1;let r=Object.keys(e).sort(),a=Object.keys(t).sort();return r.length===a.length&&r.every((s,i)=>s===a[i]&&e[s]===t[s])},uf=class{constructor(e){this.tensorManager=of(this),this.mlContextBySessionId=new Map,this.sessionIdsByMLContext=new Map,this.mlContextCache=[],this.sessionGraphInputs=new Map,this.temporaryGraphInputs=[],this.temporarySessionTensorIds=new Map,Na(e.logLevel,!!e.debug)}get currentSessionId(){if(this.activeSessionId===void 0)throw new Error("No active session");return this.activeSessionId}onRunStart(e){pe("verbose",()=>`[WebNN] onRunStart {sessionId: ${e}}`),this.activeSessionId=e}onRunEnd(e){pe("verbose",()=>`[WebNN] onRunEnd {sessionId: ${e}}`);let t=this.temporarySessionTensorIds.get(e);if(t){for(let r of t)pe("verbose",()=>`[WebNN] releasing temporary tensor {tensorId: ${r}}`),this.tensorManager.releaseTensorId(r);this.temporarySessionTensorIds.delete(e),this.activeSessionId=void 0}}async createMLContext(e){if(e instanceof GPUDevice){let r=this.mlContextCache.findIndex(a=>a.gpuDevice===e);if(r!==-1)return this.mlContextCache[r].mlContext;{let a=await navigator.ml.createContext(e);return this.mlContextCache.push({gpuDevice:e,mlContext:a}),a}}else if(e===void 0){let r=this.mlContextCache.findIndex(a=>a.options===void 0&&a.gpuDevice===void 0);if(r!==-1)return this.mlContextCache[r].mlContext;{let a=await navigator.ml.createContext();return this.mlContextCache.push({mlContext:a}),a}}let t=this.mlContextCache.findIndex(r=>Dd(r.options,e));if(t!==-1)return this.mlContextCache[t].mlContext;{let r=await navigator.ml.createContext(e);return this.mlContextCache.push({options:e,mlContext:r}),r}}registerMLContext(e,t){this.mlContextBySessionId.set(e,t);let r=this.sessionIdsByMLContext.get(t);r||(r=new Set,this.sessionIdsByMLContext.set(t,r)),r.add(e),this.temporaryGraphInputs.length>0&&(this.sessionGraphInputs.set(e,this.temporaryGraphInputs),this.temporaryGraphInputs=[])}onReleaseSession(e){this.sessionGraphInputs.delete(e);let t=this.mlContextBySessionId.get(e);if(!t)return;this.tensorManager.releaseTensorsForSession(e),this.mlContextBySessionId.delete(e);let r=this.sessionIdsByMLContext.get(t);if(r.delete(e),r.size===0){this.sessionIdsByMLContext.delete(t);let a=this.mlContextCache.findIndex(s=>s.mlContext===t);a!==-1&&this.mlContextCache.splice(a,1)}}getMLContext(e){return this.mlContextBySessionId.get(e)}reserveTensorId(){return this.tensorManager.reserveTensorId()}releaseTensorId(e){pe("verbose",()=>`[WebNN] releaseTensorId {tensorId: ${e}}`),this.tensorManager.releaseTensorId(e)}async ensureTensor(e,t,r,a,s){let i=Ar.get(r);if(!i)throw new Error(`Unsupported ONNX data type: ${r}`);return this.tensorManager.ensureTensor(e??this.currentSessionId,t,i,a,s)}async createTemporaryTensor(e,t,r){pe("verbose",()=>`[WebNN] createTemporaryTensor {onnxDataType: ${t}, shape: ${r}}`);let a=Ar.get(t);if(!a)throw new Error(`Unsupported ONNX data type: ${t}`);let s=this.tensorManager.reserveTensorId();await this.tensorManager.ensureTensor(e,s,a,r,!1);let i=this.temporarySessionTensorIds.get(e);return i?i.push(s):this.temporarySessionTensorIds.set(e,[s]),s}uploadTensor(e,t){if(!Ce().shouldTransferToMLTensor)throw new Error("Trying to upload to a MLTensor while shouldTransferToMLTensor is false");pe("verbose",()=>`[WebNN] uploadTensor {tensorId: ${e}, data: ${t.byteLength}}`),this.tensorManager.upload(e,t)}async downloadTensor(e,t){return this.tensorManager.download(e,t)}createMLTensorDownloader(e,t){return async()=>{let r=await this.tensorManager.download(e);return Da(r,t)}}registerMLTensor(e,t,r,a){let s=Ar.get(r);if(!s)throw new Error(`Unsupported ONNX data type: ${r}`);let i=this.tensorManager.registerTensor(e,t,s,a);return pe("verbose",()=>`[WebNN] registerMLTensor {tensor: ${t}, dataType: ${s}, dimensions: ${a}} -> {tensorId: ${i}}`),i}registerMLConstant(e,t,r,a,s,i){if(!i)throw new Error("External mounted files are not available.");let o=e;e.startsWith("./")&&(o=e.substring(2));let l=i.get(o);if(!l)throw new Error(`File with name ${o} not found in preloaded files.`);if(t+r>l.byteLength)throw new Error("Out of bounds: data offset and length exceed the external file data size.");let d=l.slice(t,t+r).buffer,p;switch(s.dataType){case"float32":p=new Float32Array(d);break;case"float16":p=new Uint16Array(d);break;case"int32":p=new Int32Array(d);break;case"uint32":p=new Uint32Array(d);break;case"int64":p=new BigInt64Array(d);break;case"uint64":p=new BigUint64Array(d);break;case"int8":p=new Int8Array(d);break;case"int4":case"uint4":case"uint8":p=new Uint8Array(d);break;default:throw new Error(`Unsupported data type: ${s.dataType} in creating WebNN Constant from external data.`)}return pe("verbose",()=>`[WebNN] registerMLConstant {dataType: ${s.dataType}, shape: ${s.shape}}}`),a.constant(s,p)}registerGraphInput(e){this.temporaryGraphInputs.push(e)}isGraphInput(e,t){let r=this.sessionGraphInputs.get(e);return r?r.includes(t):!1}flush(){}}}),lf={};lr(lf,{init:()=>df});var Or,Pd,df,o0=q(()=>{Y(),a0(),st(),oe(),s0(),Or=class pf{constructor(t,r,a,s){this.module=t,this.dataType=r,this.data=a,this.dims=s}getFloat32Array(){if(this.dataType!==1)throw new Error("Invalid data type");let t=O.size(this.dims);return t===0?new Float32Array:new Float32Array(this.module.HEAP8.buffer,this.data,t)}getBigInt64Array(){if(this.dataType!==7)throw new Error("Invalid data type");let t=O.size(this.dims);return t===0?new BigInt64Array:new BigInt64Array(this.module.HEAP8.buffer,this.data,t)}getInt32Array(){if(this.dataType!==6)throw new Error("Invalid data type");let t=O.size(this.dims);return t===0?new Int32Array:new Int32Array(this.module.HEAP8.buffer,this.data,t)}getUint16Array(){if(this.dataType!==10&&this.dataType!==4)throw new Error("Invalid data type");let t=O.size(this.dims);return t===0?new Uint16Array:new Uint16Array(this.module.HEAP8.buffer,this.data,t)}reshape(t){if(O.size(t)!==O.size(this.dims))throw new Error("Invalid new shape");return new pf(this.module,this.dataType,this.data,t)}},Pd=class{constructor(e,t,r){this.module=e,this.backend=t,this.customDataOffset=0,this.customDataSize=0,this.adapterInfo=t.adapterInfo,this.deviceInfo=t.deviceInfo;let a=e.PTR_SIZE,s=r/e.PTR_SIZE,i=a===4?"i32":"i64";this.opKernelContext=Number(e.getValue(a*s++,i));let o=Number(e.getValue(a*s++,i));this.outputCount=Number(e.getValue(a*s++,i)),this.customDataOffset=Number(e.getValue(a*s++,"*")),this.customDataSize=Number(e.getValue(a*s++,i));let l=[];for(let d=0;d<o;d++){let p=Number(e.getValue(a*s++,i)),g=Number(e.getValue(a*s++,"*")),f=Number(e.getValue(a*s++,i)),y=[];for(let _=0;_<f;_++)y.push(Number(e.getValue(a*s++,i)));l.push(new Or(e,p,g,y))}this.inputs=l}get kernelCustomData(){return this.backend.currentKernelCustomData}get customDataBuffer(){return this.module.HEAPU8.subarray(this.customDataOffset,this.customDataOffset+this.customDataSize)}compute(e,t){var o;let r=((o=t==null?void 0:t.inputs)==null?void 0:o.map(l=>typeof l=="number"?this.inputs[l]:l))??this.inputs,a=(t==null?void 0:t.outputs)??[],s=(l,d,p)=>new Or(this.module,d,this.output(l,p),p),i=(l,d)=>{let p=Ct(l,d);if(!p)throw new Error(`Unsupported data type: ${l}`);let g=p>0?this.backend.gpuDataManager.create(p).id:0;return new Or(this.module,l,g,d)};return this.backend.run(e,r,a,s,i,this.outputCount)}output(e,t){let r=this.module.stackSave();try{let a=this.module.PTR_SIZE,s=a===4?"i32":"i64",i=this.module.stackAlloc((1+t.length)*a);this.module.setValue(i,t.length,s);for(let o=0;o<t.length;o++)this.module.setValue(i+a*(o+1),t[o],s);return this.module._JsepOutput(this.opKernelContext,e,i)}catch(a){throw new Error(`Failed to generate kernel's output[${e}] with dims [${t}]. If you are running with pre-allocated output, please make sure the output type/dims are correct. Error: ${a}`)}finally{this.module.stackRestore(r)}}},df=async(e,t,r,a)=>{let s=t.jsepInit;if(!s)throw new Error("Failed to initialize JSEP. The WebAssembly module is not built with JSEP support.");if(e==="webgpu"){let i=new sf;await i.initialize(r,a),s("webgpu",[i,o=>i.alloc(Number(o)),o=>i.free(o),(o,l,d,p=!1)=>{if(p)pe("verbose",()=>`[WebGPU] jsepCopyGpuToGpu: src=${Number(o)}, dst=${Number(l)}, size=${Number(d)}`),i.memcpy(Number(o),Number(l));else{pe("verbose",()=>`[WebGPU] jsepCopyCpuToGpu: dataOffset=${Number(o)}, gpuDataId=${Number(l)}, size=${Number(d)}`);let g=t.HEAPU8.subarray(Number(o>>>0),Number(o>>>0)+Number(d));i.upload(Number(l),g)}},async(o,l,d)=>{pe("verbose",()=>`[WebGPU] jsepCopyGpuToCpu: gpuDataId=${o}, dataOffset=${l}, size=${d}`),await i.download(Number(o),()=>t.HEAPU8.subarray(Number(l)>>>0,Number(l+d)>>>0))},(o,l,d)=>i.createKernel(o,Number(l),d,t.UTF8ToString(t._JsepGetNodeName(Number(l)))),o=>i.releaseKernel(o),(o,l,d,p)=>{pe("verbose",()=>`[WebGPU] jsepRun: sessionHandle=${d}, kernel=${o}, contextDataOffset=${l}`);let g=new Pd(t,i,Number(l));return i.computeKernel(Number(o),g,p)},()=>i.captureBegin(),()=>i.captureEnd(),()=>i.replay()])}else{let i=new uf(r);s("webnn",[i,()=>i.reserveTensorId(),o=>i.releaseTensorId(o),async(o,l,d,p,g)=>i.ensureTensor(o,l,d,p,g),(o,l)=>{i.uploadTensor(o,l)},async(o,l)=>i.downloadTensor(o,l)])}}}),Ud,Ka,Qa,ft,Wd,Gr,Za,Xa,sa,Ja,Ya,en,cf=q(()=>{py(),cy(),Y(),At(),Aa(),gp(),Ud=(e,t)=>{Ce()._OrtInit(e,t)!==0&&fe("Can't initialize onnxruntime.")},Ka=async e=>{Ud(e.wasm.numThreads,Wr(e.logLevel))},Qa=async(e,t)=>{{let r=(o0(),Dr(lf)).init;if(t==="webgpu"){if(typeof navigator>"u"||!navigator.gpu)throw new Error("WebGPU is not supported in current environment");let a=e.webgpu.adapter;if(a){if(typeof a.limits!="object"||typeof a.features!="object"||typeof a.requestDevice!="function")throw new Error("Invalid GPU adapter set in `env.webgpu.adapter`. It must be a GPUAdapter object.")}else{let s=e.webgpu.powerPreference;if(s!==void 0&&s!=="low-power"&&s!=="high-performance")throw new Error(`Invalid powerPreference setting: "${s}"`);let i=e.webgpu.forceFallbackAdapter;if(i!==void 0&&typeof i!="boolean")throw new Error(`Invalid forceFallbackAdapter setting: "${i}"`);if(a=await navigator.gpu.requestAdapter({powerPreference:s,forceFallbackAdapter:i}),!a)throw new Error('Failed to get GPU adapter. You may need to enable flag "--enable-unsafe-webgpu" if you are using Chrome.')}await r("webgpu",Ce(),e,a)}if(t==="webnn"){if(typeof navigator>"u"||!navigator.ml)throw new Error("WebNN is not supported in current environment");await r("webnn",Ce(),e)}}},ft=new Map,Wd=e=>{let t=Ce(),r=t.stackSave();try{let a=t.PTR_SIZE,s=t.stackAlloc(2*a);t._OrtGetInputOutputCount(e,s,s+a)!==0&&fe("Can't get session input/output count.");let i=a===4?"i32":"i64";return[Number(t.getValue(s,i)),Number(t.getValue(s+a,i))]}finally{t.stackRestore(r)}},Gr=e=>{let t=Ce(),r=t._malloc(e.byteLength);if(r===0)throw new Error(`Can't create a session. failed to allocate a buffer of size ${e.byteLength}.`);return t.HEAPU8.set(e,r),[r,e.byteLength]},Za=async(e,t)=>{var f,y,_;let r,a,s=Ce();Array.isArray(e)?[r,a]=e:e.buffer===s.HEAPU8.buffer?[r,a]=[e.byteOffset,e.byteLength]:[r,a]=Gr(e);let i=0,o=0,l=0,d=[],p=[],g=[];try{if([o,d]=mp(t),(t==null?void 0:t.externalData)&&s.mountExternalData){let C=[];for(let E of t.externalData){let z=typeof E=="string"?E:E.path;C.push(Ma(typeof E=="string"?E:E.data).then(B=>{s.mountExternalData(z,B)}))}await Promise.all(C)}for(let C of(t==null?void 0:t.executionProviders)??[])if((typeof C=="string"?C:C.name)==="webnn"){if(s.shouldTransferToMLTensor=!1,typeof C!="string"){let E=C,z=E==null?void 0:E.context,B=E==null?void 0:E.gpuDevice,W=E==null?void 0:E.deviceType,G=E==null?void 0:E.powerPreference;z?s.currentContext=z:B?s.currentContext=await s.jsepCreateMLContext(B):s.currentContext=await s.jsepCreateMLContext({deviceType:W,powerPreference:G})}else s.currentContext=await s.jsepCreateMLContext();break}i=await s._OrtCreateSession(r,a,o),i===0&&fe("Can't create a session."),(f=s.jsepOnCreateSession)==null||f.call(s),s.currentContext&&(s.jsepRegisterMLContext(i,s.currentContext),s.currentContext=void 0,s.shouldTransferToMLTensor=!0);let[w,b]=Wd(i),k=!!(t!=null&&t.enableGraphCapture),v=[],$=[],T=[];for(let C=0;C<w;C++){let E=s._OrtGetInputName(i,C);E===0&&fe("Can't get an input name."),p.push(E),v.push(s.UTF8ToString(E))}for(let C=0;C<b;C++){let E=s._OrtGetOutputName(i,C);E===0&&fe("Can't get an output name."),g.push(E);let z=s.UTF8ToString(E);$.push(z);{if(k&&(t==null?void 0:t.preferredOutputLocation)===void 0){T.push("gpu-buffer");continue}let B=typeof(t==null?void 0:t.preferredOutputLocation)=="string"?t.preferredOutputLocation:((y=t==null?void 0:t.preferredOutputLocation)==null?void 0:y[z])??"cpu";if(B!=="cpu"&&B!=="cpu-pinned"&&B!=="gpu-buffer"&&B!=="ml-tensor")throw new Error(`Not supported preferred output location: ${B}.`);if(k&&B!=="gpu-buffer")throw new Error(`Not supported preferred output location: ${B}. Only 'gpu-buffer' location is supported when enableGraphCapture is true.`);T.push(B)}}let S=null;return T.some(C=>C==="gpu-buffer"||C==="ml-tensor")&&(l=s._OrtCreateBinding(i),l===0&&fe("Can't create IO binding."),S={handle:l,outputPreferredLocations:T,outputPreferredLocationsEncoded:T.map(C=>pa(C))}),ft.set(i,[i,p,g,S,k,!1]),[i,v,$]}catch(w){throw p.forEach(b=>s._OrtFree(b)),g.forEach(b=>s._OrtFree(b)),l!==0&&s._OrtReleaseBinding(l)!==0&&fe("Can't release IO binding."),i!==0&&s._OrtReleaseSession(i)!==0&&fe("Can't release session."),w}finally{s._free(r),o!==0&&s._OrtReleaseSessionOptions(o)!==0&&fe("Can't release session options."),d.forEach(w=>s._free(w)),(_=s.unmountExternalData)==null||_.call(s)}},Xa=e=>{var d;let t=Ce(),r=ft.get(e);if(!r)throw new Error(`cannot release session. invalid session id: ${e}`);let[a,s,i,o,l]=r;o&&(l&&t._OrtClearBoundOutputs(o.handle)!==0&&fe("Can't clear bound outputs."),t._OrtReleaseBinding(o.handle)!==0&&fe("Can't release IO binding.")),(d=t.jsepOnReleaseSession)==null||d.call(t,e),s.forEach(p=>t._OrtFree(p)),i.forEach(p=>t._OrtFree(p)),t._OrtReleaseSession(a)!==0&&fe("Can't release session."),ft.delete(e)},sa=async(e,t,r,a,s,i=!1)=>{if(!e){t.push(0);return}let o=Ce(),l=o.PTR_SIZE,d=e[0],p=e[1],g=e[3],f=g,y,_;if(d==="string"&&(g==="gpu-buffer"||g==="ml-tensor"))throw new Error("String tensor is not supported on GPU.");if(i&&g!=="gpu-buffer")throw new Error(`External buffer must be provided for input/output index ${s} when enableGraphCapture is true.`);if(g==="gpu-buffer"){let k=e[2].gpuBuffer;_=Ct(Nt(d),p);let v=o.jsepRegisterBuffer;if(!v)throw new Error('Tensor location "gpu-buffer" is not supported without using WebGPU.');y=v(a,s,k,_)}else if(g==="ml-tensor"){let k=e[2].mlTensor;_=Ct(Nt(d),p);let v=o.jsepRegisterMLTensor;if(!v)throw new Error('Tensor location "ml-tensor" is not supported without using WebNN.');y=v(a,k,Nt(d),p)}else{let k=e[2];if(Array.isArray(k)){_=l*k.length,y=o._malloc(_),r.push(y);for(let v=0;v<k.length;v++){if(typeof k[v]!="string")throw new TypeError(`tensor data at index ${v} is not a string`);o.setValue(y+v*l,ze(k[v],r),"*")}}else{let v=o.jsepIsGraphInput;if(d!=="string"&&v){let $=o._OrtGetInputName(a,s),T=o.UTF8ToString($);if(v(a,T)){let S=Nt(d);_=Ct(S,p),f="ml-tensor";let C=o.jsepCreateTemporaryTensor,E=o.jsepUploadTensor;if(!C||!E)throw new Error('Tensor location "ml-tensor" is not supported without using WebNN.');let z=await C(a,S,p);E(z,new Uint8Array(k.buffer,k.byteOffset,k.byteLength)),y=z}else _=k.byteLength,y=o._malloc(_),r.push(y),o.HEAPU8.set(new Uint8Array(k.buffer,k.byteOffset,_),y)}else _=k.byteLength,y=o._malloc(_),r.push(y),o.HEAPU8.set(new Uint8Array(k.buffer,k.byteOffset,_),y)}}let w=o.stackSave(),b=o.stackAlloc(4*p.length);try{p.forEach((v,$)=>o.setValue(b+$*l,v,l===4?"i32":"i64"));let k=o._OrtCreateTensor(Nt(d),y,_,b,p.length,pa(f));k===0&&fe(`Can't create tensor for input/output. session=${a}, index=${s}.`),t.push(k)}finally{o.stackRestore(w)}},Ja=async(e,t,r,a,s,i)=>{var ee,ae,Z;let o=Ce(),l=o.PTR_SIZE,d=ft.get(e);if(!d)throw new Error(`cannot run inference. invalid session id: ${e}`);let p=d[0],g=d[1],f=d[2],y=d[3],_=d[4],w=d[5],b=t.length,k=a.length,v=0,$=[],T=[],S=[],C=[],E=o.stackSave(),z=o.stackAlloc(b*l),B=o.stackAlloc(b*l),W=o.stackAlloc(k*l),G=o.stackAlloc(k*l);try{[v,$]=fp(i);for(let L=0;L<b;L++)await sa(r[L],T,C,e,t[L],_);for(let L=0;L<k;L++)await sa(s[L],S,C,e,b+a[L],_);for(let L=0;L<b;L++)o.setValue(z+L*l,T[L],"*"),o.setValue(B+L*l,g[t[L]],"*");for(let L=0;L<k;L++)o.setValue(W+L*l,S[L],"*"),o.setValue(G+L*l,f[a[L]],"*");if(y&&!w){let{handle:L,outputPreferredLocations:de,outputPreferredLocationsEncoded:me}=y;if(g.length!==b)throw new Error(`input count from feeds (${b}) is expected to be always equal to model's input count (${g.length}).`);for(let F=0;F<b;F++){let ge=t[F];await o._OrtBindInput(L,g[ge],T[F])!==0&&fe(`Can't bind input[${F}] for session=${e}.`)}for(let F=0;F<k;F++){let ge=a[F];(ee=s[F])!=null&&ee[3]?o._OrtBindOutput(L,f[ge],S[F],0)!==0&&fe(`Can't bind pre-allocated output[${F}] for session=${e}.`):o._OrtBindOutput(L,f[ge],0,me[ge])!==0&&fe(`Can't bind output[${F}] to ${de[F]} for session=${e}.`)}ft.set(e,[p,g,f,y,_,!0])}(ae=o.jsepOnRunStart)==null||ae.call(o,p);let te;y?te=await o._OrtRunWithBinding(p,y.handle,k,W,v):te=await o._OrtRun(p,B,z,b,G,k,W,v),te!==0&&fe("failed to call OrtRun().");let J=[];for(let L=0;L<k;L++){let de=Number(o.getValue(W+L*l,"*"));if(de===S[L]){J.push(s[L]);continue}let me=o.stackSave(),F=o.stackAlloc(4*l),ge=!1,N,V=0;try{o._OrtGetTensorData(de,F,F+l,F+2*l,F+3*l)!==0&&fe(`Can't access output tensor data on index ${L}.`);let le=l===4?"i32":"i64",be=Number(o.getValue(F,le));V=o.getValue(F+l,"*");let D=o.getValue(F+l*2,"*"),ce=Number(o.getValue(F+l*3,le)),Ue=[];for(let Te=0;Te<ce;Te++)Ue.push(Number(o.getValue(D+Te*l,le)));o._OrtFree(D)!==0&&fe("Can't free memory for tensor dims.");let Re=Ue.reduce((Te,ye)=>Te*ye,1);N=Tt(be);let _t=y==null?void 0:y.outputPreferredLocations[a[L]];if(N==="string"){if(_t==="gpu-buffer"||_t==="ml-tensor")throw new Error("String tensor is not supported on GPU.");let Te=[];for(let ye=0;ye<Re;ye++){let ot=o.getValue(V+ye*l,"*"),qt=o.getValue(V+(ye+1)*l,"*"),wt=ye===Re-1?void 0:qt-ot;Te.push(o.UTF8ToString(ot,wt))}J.push([N,Ue,Te,"cpu"])}else if(_t==="gpu-buffer"&&Re>0){let Te=o.jsepGetBuffer;if(!Te)throw new Error('preferredLocation "gpu-buffer" is not supported without using WebGPU.');let ye=Te(V),ot=Ct(be,Re);if(ot===void 0||!Ra(N))throw new Error(`Unsupported data type: ${N}`);ge=!0,J.push([N,Ue,{gpuBuffer:ye,download:o.jsepCreateDownloader(ye,ot,N),dispose:()=>{o._OrtReleaseTensor(de)!==0&&fe("Can't release tensor.")}},"gpu-buffer"])}else if(_t==="ml-tensor"&&Re>0){let Te=o.jsepEnsureTensor;if(!Te)throw new Error('preferredLocation "ml-tensor" is not supported without using WebNN.');if(Ct(be,Re)===void 0||!Ba(N))throw new Error(`Unsupported data type: ${N}`);let ye=await Te(e,V,be,Ue,!1);ge=!0,J.push([N,Ue,{mlTensor:ye,download:o.jsepCreateMLTensorDownloader(V,N),dispose:()=>{o.jsepReleaseTensorId(V),o._OrtReleaseTensor(de)}},"ml-tensor"])}else{let Te=Oa(N),ye=new Te(Re);new Uint8Array(ye.buffer,ye.byteOffset,ye.byteLength).set(o.HEAPU8.subarray(V,V+ye.byteLength)),J.push([N,Ue,ye,"cpu"])}}finally{o.stackRestore(me),N==="string"&&V&&o._free(V),ge||o._OrtReleaseTensor(de),(Z=o.jsepOnRunEnd)==null||Z.call(o,p)}}return y&&!_&&(o._OrtClearBoundOutputs(y.handle)!==0&&fe("Can't clear bound outputs."),ft.set(e,[p,g,f,y,_,!1])),J}finally{o.stackRestore(E),T.forEach(te=>o._OrtReleaseTensor(te)),S.forEach(te=>o._OrtReleaseTensor(te)),C.forEach(te=>o._free(te)),v!==0&&o._OrtReleaseRunOptions(v),$.forEach(te=>o._free(te))}},Ya=e=>{let t=Ce(),r=ft.get(e);if(!r)throw new Error("invalid session id");let a=r[0],s=t._OrtEndProfiling(a);s===0&&fe("Can't get an profile file name."),t._OrtFree(s)},en=e=>{let t=[];for(let r of e){let a=r[2];!Array.isArray(a)&&"buffer"in a&&t.push(a.buffer)}return t}}),mt,Be,Mt,tr,rr,Rr,oa,Br,xt,kt,qd,hf,ff,mf,gf,yf,_f,wf,bf=q(()=>{Ze(),cf(),At(),Ea(),mt=()=>!!$e.wasm.proxy&&typeof document<"u",Mt=!1,tr=!1,rr=!1,Br=new Map,xt=(e,t)=>{let r=Br.get(e);r?r.push(t):Br.set(e,[t])},kt=()=>{if(Mt||!tr||rr||!Be)throw new Error("worker not ready")},qd=e=>{switch(e.data.type){case"init-wasm":Mt=!1,e.data.err?(rr=!0,oa[1](e.data.err)):(tr=!0,oa[0]()),Rr&&(URL.revokeObjectURL(Rr),Rr=void 0);break;case"init-ep":case"copy-from":case"create":case"release":case"run":case"end-profiling":{let t=Br.get(e.data.type);e.data.err?t.shift()[1](e.data.err):t.shift()[0](e.data.out);break}}},hf=async()=>{if(!tr){if(Mt)throw new Error("multiple calls to 'initWasm()' detected.");if(rr)throw new Error("previous call to 'initWasm()' failed.");if(Mt=!0,mt())return new Promise((e,t)=>{Be==null||Be.terminate(),cp().then(([r,a])=>{var s;try{Be=a,Be.onerror=o=>t(o),Be.onmessage=qd,oa=[e,t];let i={type:"init-wasm",in:$e};!i.in.wasm.wasmPaths&&(r||(s=import.meta.url)!=null&&s.startsWith("file:"))&&(i.in.wasm.wasmPaths={wasm:new URL("/assets/ort-wasm-simd-threaded.jsep.wasm",import.meta.url).href}),Be.postMessage(i),Rr=r}catch(i){t(i)}},t)});try{await za($e.wasm),await Ka($e),tr=!0}catch(e){throw rr=!0,e}finally{Mt=!1}}},ff=async e=>{if(mt())return kt(),new Promise((t,r)=>{xt("init-ep",[t,r]);let a={type:"init-ep",in:{epName:e,env:$e}};Be.postMessage(a)});await Qa($e,e)},mf=async e=>mt()?(kt(),new Promise((t,r)=>{xt("copy-from",[t,r]);let a={type:"copy-from",in:{buffer:e}};Be.postMessage(a,[e.buffer])})):Gr(e),gf=async(e,t)=>{if(mt()){if(t!=null&&t.preferredOutputLocation)throw new Error('session option "preferredOutputLocation" is not supported for proxy.');return kt(),new Promise((r,a)=>{xt("create",[r,a]);let s={type:"create",in:{model:e,options:{...t}}},i=[];e instanceof Uint8Array&&i.push(e.buffer),Be.postMessage(s,i)})}else return Za(e,t)},yf=async e=>{if(mt())return kt(),new Promise((t,r)=>{xt("release",[t,r]);let a={type:"release",in:e};Be.postMessage(a)});Xa(e)},_f=async(e,t,r,a,s,i)=>{if(mt()){if(r.some(o=>o[3]!=="cpu"))throw new Error("input tensor on GPU is not supported for proxy.");if(s.some(o=>o))throw new Error("pre-allocated output tensor is not supported for proxy.");return kt(),new Promise((o,l)=>{xt("run",[o,l]);let d=r,p={type:"run",in:{sessionId:e,inputIndices:t,inputs:d,outputIndices:a,options:i}};Be.postMessage(p,en(d))})}else return Ja(e,t,r,a,s,i)},wf=async e=>{if(mt())return kt(),new Promise((t,r)=>{xt("end-profiling",[t,r]);let a={type:"end-profiling",in:e};Be.postMessage(a)});Ya(e)}}),ua,Vd,$f,u0=q(()=>{Ze(),bf(),Y(),Ia(),gp(),ua=(e,t)=>{switch(e.location){case"cpu":return[e.type,e.dims,e.data,"cpu"];case"gpu-buffer":return[e.type,e.dims,{gpuBuffer:e.gpuBuffer},"gpu-buffer"];case"ml-tensor":return[e.type,e.dims,{mlTensor:e.mlTensor},"ml-tensor"];default:throw new Error(`invalid data location: ${e.location} for ${t()}`)}},Vd=e=>{switch(e[3]){case"cpu":return new Le(e[0],e[2],e[1]);case"gpu-buffer":{let t=e[0];if(!Ra(t))throw new Error(`not supported data type: ${t} for deserializing GPU tensor`);let{gpuBuffer:r,download:a,dispose:s}=e[2];return Le.fromGpuBuffer(r,{dataType:t,dims:e[1],download:a,dispose:s})}case"ml-tensor":{let t=e[0];if(!Ba(t))throw new Error(`not supported data type: ${t} for deserializing MLTensor tensor`);let{mlTensor:r,download:a,dispose:s}=e[2];return Le.fromMLTensor(r,{dataType:t,dims:e[1],download:a,dispose:s})}default:throw new Error(`invalid data location: ${e[3]}`)}},$f=class{async fetchModelAndCopyToWasmMemory(e){return mf(await Ma(e))}async loadModel(e,t){tt();let r;typeof e=="string"?r=await this.fetchModelAndCopyToWasmMemory(e):r=e,[this.sessionId,this.inputNames,this.outputNames]=await gf(r,t),Qe()}async dispose(){return yf(this.sessionId)}async run(e,t,r){tt();let a=[],s=[];Object.entries(e).forEach(f=>{let y=f[0],_=f[1],w=this.inputNames.indexOf(y);if(w===-1)throw new Error(`invalid input '${y}'`);a.push(_),s.push(w)});let i=[],o=[];Object.entries(t).forEach(f=>{let y=f[0],_=f[1],w=this.outputNames.indexOf(y);if(w===-1)throw new Error(`invalid output '${y}'`);i.push(_),o.push(w)});let l=a.map((f,y)=>ua(f,()=>`input "${this.inputNames[s[y]]}"`)),d=i.map((f,y)=>f?ua(f,()=>`output "${this.outputNames[o[y]]}"`):null),p=await _f(this.sessionId,s,l,o,d,r),g={};for(let f=0;f<p.length;f++)g[this.outputNames[o[f]]]=i[f]??Vd(p[f]);return Qe(),g}startProfiling(){}endProfiling(){wf(this.sessionId)}}}),vf={};lr(vf,{OnnxruntimeWebAssemblyBackend:()=>ka,initializeFlags:()=>xa,wasmBackend:()=>xf});var xa,ka,xf,l0=q(()=>{Ze(),bf(),u0(),xa=()=>{if((typeof $e.wasm.initTimeout!="number"||$e.wasm.initTimeout<0)&&($e.wasm.initTimeout=0),$e.wasm.simd===!1&&console.warn('Deprecated property "env.wasm.simd" is set to false. non-SIMD build is no longer provided, and this setting will be ignored.'),typeof $e.wasm.proxy!="boolean"&&($e.wasm.proxy=!1),typeof $e.wasm.trace!="boolean"&&($e.wasm.trace=!1),typeof $e.wasm.numThreads!="number"||!Number.isInteger($e.wasm.numThreads)||$e.wasm.numThreads<=0)if(typeof self<"u"&&!self.crossOriginIsolated)$e.wasm.numThreads=1;else{let e=typeof navigator>"u"?jg("node:os").cpus().length:navigator.hardwareConcurrency;$e.wasm.numThreads=Math.min(4,Math.ceil((e||1)/2))}},ka=class{async init(e){xa(),await hf(),await ff(e)}async createInferenceSessionHandler(e,t){let r=new $f;return await r.loadModel(e,t),Promise.resolve(r)}},xf=new ka});Ze();Ze();Ze();var d0="1.21.0";{let e=(l0(),Dr(vf)).wasmBackend;Dt("webgpu",e,5),Dt("webnn",e,5),Dt("cpu",e,10),Dt("wasm",e,10)}Object.defineProperty($e.versions,"web",{value:d0,enumerable:!0});/**
* @license
* Copyright 2021 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*//**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 *//**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function p0(e,t,r){const{vocab:a,specialTokens:s,maxTokenLength:i}=t,{maxLength:o}=r,l=s["<s>"],d=s["</s>"],p=s["<pad>"],g=e.toLowerCase().split(/\s+/);let f=[];f.push(l);for(const _ of g){if(a[_]!==void 0)f.push(a[_]);else for(const w of _)f.push(a[w]||a["<unk>"]);if(f.length>=o-1)break}f.push(d),f.length>o&&(f=f.slice(0,o));const y=new Array(f.length).fill(1);{const _=o-f.length;if(_>0){const w=new Array(_).fill(p);f=[...f,...w],y.push(...new Array(_).fill(0))}}return{inputIds:f,attentionMask:y}}const c0=/[\u3000-\u303f\u3040-\u309f\u30a0-\u30ff\uff00-\uff9f\u4e00-\u9faf]/;let la=null,da=null;function h0(e){if(c0.test(e)){const t=e.match(/[a-zA-Z]/g);return t&&t.length>3?"mixed":"ja"}return"en"}async function f0(){if(la)return la;$e.wasm.wasmPaths=chrome.runtime.getURL("models/");try{const e=chrome.runtime.getURL("models/flaming_risk_model_quantized.onnx"),t=await fetch(e).then(s=>s.arrayBuffer()),r={executionProviders:["wasm"],graphOptimizationLevel:"all",enableCpuMemArena:!0,enableMemPattern:!0},a=await Ca.create(t,r);return la=a,console.log("モデル読み込み完了"),a}catch(e){throw console.error("モデル初期化エラー:",e),new Error("モデル初期化に失敗しました")}}async function kf(){if(da)return da;try{const e=chrome.runtime.getURL("models/tokenizer.json"),t=await fetch(e).then(r=>r.json());return da=t,t}catch(e){throw console.error("トークナイザー初期化エラー:",e),new Error("トークナイザー初期化に失敗しました")}}async function m0(e){const t=await kf(),r=p0(e,t,{maxLength:128});return{inputIds:r.inputIds,attentionMask:r.attentionMask}}function g0(e,t){const r=["馬鹿","バカ","アホ","死ね","クソ","殺す","消えろ","害児","害人","在日","土人","人種","民族","ブス"],a=["idiot","stupid","fool","hate","kill","die","ugly","racist","sexist","bigot","trash","shut up"];let s=e;const i=h0(e);return(i==="ja"?r:i==="en"?a:[...r,...a]).forEach(l=>{if(e.toLowerCase().includes(l.toLowerCase())){const d=new RegExp(l,"gi");s=s.replace(d,'<span class="underline text-red-600">$&</span>')}}),s}async function y0(e){try{const[t]=await Promise.all([f0(),kf()]),{inputIds:r,attentionMask:a}=await m0(e),s=new Le("int64",new BigInt64Array(r.map(BigInt)),[1,r.length]),i=new Le("int64",new BigInt64Array(a.map(BigInt)),[1,a.length]),o={input_ids:s,attention_mask:i};console.log("モデル推論実行中...");const l=performance.now(),d=await t.run(o),p=performance.now();console.log(`推論時間: ${(p-l).toFixed(2)}ms`);const g=d.logits.data,f=_0(Array.from(g)),y=Math.round(f[1]*100),_=g0(e,f);return{score:y,highlightedText:_}}catch(t){throw console.error("推論エラー:",t),new Error("テキスト評価に失敗しました")}}function _0(e){const t=Math.max(...e),r=e.map(s=>Math.exp(s-t)),a=r.reduce((s,i)=>s+i,0);return r.map(s=>s/a)}chrome.runtime.onMessage.addListener((e,t,r)=>{if(e.action==="evaluateText")return(async()=>{try{console.log("Service Worker: テキスト評価リクエスト受信");const a=await y0(e.text);r({score:a.score,highlightedText:a.highlightedText})}catch(a){console.error("Service Worker: 評価エラー",a),r({error:a.message||"評価に失敗しました"})}})(),!0});chrome.runtime.onInstalled.addListener(async e=>{e.reason==="install"&&(await chrome.storage.sync.set({enabledPlatforms:{twitter:!0,x:!0,facebook:!0,threads:!0,linkedin:!0},riskThresholds:{low:30,high:70},language:"auto",showNotification:!0}),chrome.runtime.openOptionsPage())});const Sf=()=>{console.log("Service Worker: 活性維持"),setTimeout(Sf,2e4)};Sf();
