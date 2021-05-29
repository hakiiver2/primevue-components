(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-9ab8615c"],{"1fb9":function(e,t,n){"use strict";n("3cbb")},"3cbb":function(e,t,n){var l=n("7d55");l.__esModule&&(l=l.default),"string"===typeof l&&(l=[[e.i,l,""]]),l.locals&&(e.exports=l.locals);var o=n("499e").default;o("356fa826",l,!0,{sourceMap:!1,shadowMode:!1})},"7d55":function(e,t,n){var l=n("24fb");t=l(!1),t.push([e.i,"button[data-v-f4f4adf0]{min-width:15rem}.product-image[data-v-f4f4adf0]{width:50px;-webkit-box-shadow:0 3px 6px rgba(0,0,0,.16),0 3px 6px rgba(0,0,0,.23);box-shadow:0 3px 6px rgba(0,0,0,.16),0 3px 6px rgba(0,0,0,.23)}",""]),e.exports=t},b6a9:function(e,t,n){"use strict";n.r(t);n("b0c0");var l=n("7a23"),o=Object(l["Y"])("data-v-f4f4adf0");Object(l["F"])("data-v-f4f4adf0");var c={class:"content-section introduction"},a=Object(l["m"])("div",{class:"feature-intro"},[Object(l["m"])("h1",null,"OverlayPanel"),Object(l["m"])("p",null,"OverlayPanel is a container component positioned as connected to its target.")],-1),r={class:"content-section implementation"},s={class:"card"};Object(l["D"])();var u=o((function(e,t,n,u,d,i){var b=Object(l["K"])("AppDemoActions"),m=Object(l["K"])("Button"),p=Object(l["K"])("Column"),O=Object(l["K"])("DataTable"),j=Object(l["K"])("OverlayPanel"),h=Object(l["K"])("OverlayPanelDoc");return Object(l["C"])(),Object(l["h"])("div",null,[Object(l["m"])("div",c,[a,Object(l["m"])(b)]),Object(l["m"])("div",r,[Object(l["m"])("div",s,[Object(l["m"])(m,{type:"button",icon:"pi pi-search",label:d.selectedProduct?d.selectedProduct.name:"Select a Product",onClick:i.toggle,"aria:haspopup":"true","aria-controls":"overlay_panel"},null,8,["label","onClick"]),Object(l["m"])(j,{ref:"op",appendTo:"body",showCloseIcon:!0,id:"overlay_panel",style:{width:"450px"},breakpoints:{"960px":"75vw"}},{default:o((function(){return[Object(l["m"])(O,{value:d.products,selection:d.selectedProduct,"onUpdate:selection":t[1]||(t[1]=function(e){return d.selectedProduct=e}),selectionMode:"single",paginator:!0,rows:5,onRowSelect:i.onProductSelect},{default:o((function(){return[Object(l["m"])(p,{field:"name",header:"Name",sortable:"",style:{width:"50%"}}),Object(l["m"])(p,{header:"Image",style:{width:"20%"}},{body:o((function(e){return[Object(l["m"])("img",{src:"demo/images/product/"+e.data.image,alt:e.data.image,class:"product-image"},null,8,["src","alt"])]})),_:1}),Object(l["m"])(p,{field:"price",header:"Price",sortable:"",style:{width:"30%"}},{body:o((function(e){return[Object(l["l"])(Object(l["O"])(i.formatCurrency(e.data.price)),1)]})),_:1})]})),_:1},8,["value","selection","onRowSelect"])]})),_:1},512)])]),Object(l["m"])(h)])})),d=n("e9c0"),i=Object(l["m"])("h5",null,"Import",-1),b=Object(l["m"])("code",null,"\nimport OverlayPanel from 'primevue/overlaypanel';\n\n",-1),m=Object(l["m"])("h5",null,"Getting Started",-1),p=Object(l["m"])("p",null,"OverlayPanel is accessed via its reference where visibility is controlled using toggle, show and hide methods.",-1),O=Object(l["m"])("code",null,'\n<Button type="button" label="Toggle" @click="toggle" />\n\n<OverlayPanel ref="op">\n\t<img src="demo/images/nature/nature1.jpg" alt="Nature Image">\n</OverlayPanel>\n\n',-1),j=Object(l["m"])("code",null,"\ntoggle(event) {\n    this.$refs.op.toggle(event);\n}\n\n",-1),h=Object(l["m"])("h5",null,"Dismissable and CloseIcon",-1),v=Object(l["m"])("p",null,[Object(l["l"])("Clicking outside the overlay hides the panel, setting "),Object(l["m"])("i",null,"dismissable"),Object(l["l"])(" to false disables this behavior. Additionally enabling "),Object(l["m"])("i",null,"showCloseIcon"),Object(l["l"])(" property displays a close icon at the top right corner to close the panel.")],-1),f=Object(l["m"])("code",null,'\n<OverlayPanel ref="op" :showCloseIcon="true" :dismissable="true">\n\t<img src="demo/images/nature/nature1.jpg" alt="Nature Image">\n</OverlayPanel>\n\n',-1),g=Object(l["m"])("h5",null,"Responsive",-1),y=Object(l["m"])("p",null,[Object(l["l"])("OverlayPanel width can be adjusted per screen size with the "),Object(l["m"])("i",null,"breakpoints"),Object(l["l"])(" option. In example below, default width is set to 450px and below 961px, width would be 75vw and finally below 641px width becomes 100%. The value of "),Object(l["m"])("i",null,"breakpoints"),Object(l["l"])(" should be an object literal whose keys are the maximum screen sizes and values are the widths per screen.")],-1),w=Object(l["m"])("code",null,"\n<OverlayPanel ref=\"op\" :breakpoints=\"{'960px': '75vw', '640px': '100vw'}\" :style=\"{width: '450px'}\">\n\tContent\n</OverlayPanel>\n\n",-1),P=Object(l["m"])("h5",null,"Properties",-1),S=Object(l["m"])("div",{class:"doc-tablewrapper"},[Object(l["m"])("table",{class:"doc-table"},[Object(l["m"])("thead",null,[Object(l["m"])("tr",null,[Object(l["m"])("th",null,"Name"),Object(l["m"])("th",null,"Type"),Object(l["m"])("th",null,"Default"),Object(l["m"])("th",null,"Description")])]),Object(l["m"])("tbody",null,[Object(l["m"])("tr",null,[Object(l["m"])("td",null,"dismissable"),Object(l["m"])("td",null,"boolean"),Object(l["m"])("td",null,"true"),Object(l["m"])("td",null,"Enables to hide the overlay when outside is clicked.")]),Object(l["m"])("tr",null,[Object(l["m"])("td",null,"showCloseIcon"),Object(l["m"])("td",null,"boolean"),Object(l["m"])("td",null,"false"),Object(l["m"])("td",null,"When enabled, displays a close icon at top right corner.")]),Object(l["m"])("tr",null,[Object(l["m"])("td",null,"appendTo"),Object(l["m"])("td",null,"string"),Object(l["m"])("td",null,"body"),Object(l["m"])("td",null,"A valid query selector or an HTMLElement to specify where the overlay gets attached.")]),Object(l["m"])("tr",null,[Object(l["m"])("td",null,"baseZIndex"),Object(l["m"])("td",null,"number"),Object(l["m"])("td",null,"0"),Object(l["m"])("td",null,"Base zIndex value to use in layering.")]),Object(l["m"])("tr",null,[Object(l["m"])("td",null,"autoZIndex"),Object(l["m"])("td",null,"boolean"),Object(l["m"])("td",null,"true"),Object(l["m"])("td",null,"Whether to automatically manage layering.")]),Object(l["m"])("tr",null,[Object(l["m"])("td",null,"ariaCloseLabel"),Object(l["m"])("td",null,"string"),Object(l["m"])("td",null,"close"),Object(l["m"])("td",null,"Aria label of the close icon.")]),Object(l["m"])("tr",null,[Object(l["m"])("td",null,"breakpoints"),Object(l["m"])("td",null,"object"),Object(l["m"])("td",null,"null"),Object(l["m"])("td",null,"Object literal to define widths per screen size.")])])])],-1),x=Object(l["m"])("h5",null,"Methods",-1),C=Object(l["m"])("div",{class:"doc-tablewrapper"},[Object(l["m"])("table",{class:"doc-table"},[Object(l["m"])("thead",null,[Object(l["m"])("tr",null,[Object(l["m"])("th",null,"Name"),Object(l["m"])("th",null,"Parameters"),Object(l["m"])("th",null,"Description")])]),Object(l["m"])("tbody",null,[Object(l["m"])("tr",null,[Object(l["m"])("td",null,"toggle"),Object(l["m"])("td",null,"event: Browser event"),Object(l["m"])("td",null,"Toggles the visibility of the overlay.")]),Object(l["m"])("tr",null,[Object(l["m"])("td",null,"show"),Object(l["m"])("td",null,[Object(l["l"])("event: Browser event "),Object(l["m"])("br"),Object(l["l"])(" target: Optional target if event.target should not be used")]),Object(l["m"])("td",null,"Shows the overlay.")]),Object(l["m"])("tr",null,[Object(l["m"])("td",null,"hide"),Object(l["m"])("td",null,"-"),Object(l["m"])("td",null,"Hides the overlay.")])])])],-1),k=Object(l["m"])("h5",null,"Styling",-1),D=Object(l["l"])("Following is the list of structural style classes, for theming classes visit "),I=Object(l["l"])("theming"),T=Object(l["l"])(" page."),_=Object(l["m"])("div",{class:"doc-tablewrapper"},[Object(l["m"])("table",{class:"doc-table"},[Object(l["m"])("thead",null,[Object(l["m"])("tr",null,[Object(l["m"])("th",null,"Name"),Object(l["m"])("th",null,"Element")])]),Object(l["m"])("tbody",null,[Object(l["m"])("tr",null,[Object(l["m"])("td",null,"p-overlaypanel"),Object(l["m"])("td",null,"Container element.")]),Object(l["m"])("tr",null,[Object(l["m"])("td",null,"p-overlaypanel-content"),Object(l["m"])("td",null,"Content of the panel.")]),Object(l["m"])("tr",null,[Object(l["m"])("td",null,"p-overlaypanel-close"),Object(l["m"])("td",null,"Close icon.")])])])],-1),N=Object(l["m"])("h5",null,"Dependencies",-1),M=Object(l["m"])("p",null,"None.",-1);function U(e,t,n,o,c,a){var r=Object(l["K"])("router-link"),s=Object(l["K"])("AppDoc"),u=Object(l["L"])("code");return Object(l["C"])(),Object(l["h"])(s,{name:"OverlayPanelDemo",sources:c.sources,service:["ProductService"],data:["products-small"],github:"overlaypanel/OverlayPanelDemo.vue"},{default:Object(l["U"])((function(){return[i,Object(l["V"])(Object(l["m"])("pre",null,[b],512),[[u,void 0,void 0,{script:!0}]]),m,p,Object(l["V"])(Object(l["m"])("pre",null,[O],512),[[u]]),Object(l["V"])(Object(l["m"])("pre",null,[j],512),[[u,void 0,void 0,{script:!0}]]),h,v,Object(l["V"])(Object(l["m"])("pre",null,[f],512),[[u]]),g,y,Object(l["V"])(Object(l["m"])("pre",null,[w],512),[[u]]),P,S,x,C,k,Object(l["m"])("p",null,[D,Object(l["m"])(r,{to:"/theming"},{default:Object(l["U"])((function(){return[I]})),_:1}),T]),_,N,M]})),_:1},8,["sources"])}var A={data:function(){return{sources:{"options-api":{tabName:"Options API Source",content:'\n<template>\n    <div>\n        <Toast />\n\n        <Button type="button" icon="pi pi-search" :label="selectedProduct ? selectedProduct.name : \'Select a Product\'" @click="toggle" aria:haspopup="true" aria-controls="overlay_panel" />\n\n        <OverlayPanel ref="op" appendTo="body" :showCloseIcon="true" id="overlay_panel" style="width: 450px" :breakpoints="{\'960px\': \'75vw\'}">\n            <DataTable :value="products" v-model:selection="selectedProduct" selectionMode="single" :paginator="true" :rows="5" @rowSelect="onProductSelect" responsiveLayout="scroll" >\n                <Column field="name" header="Name" sortable style="width: 50%"></Column>\n                <Column header="Image" style="width: 20%">\n                    <template #body="slotProps">\n                        <img src="https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png" :alt="slotProps.data.image" class="product-image" />\n                    </template>\n                </Column>\n                <Column field="price" header="Price" sortable style="width: 30%">\n                    <template #body="slotProps">\n                        {{formatCurrency(slotProps.data.price)}}\n                    </template>\n                </Column>\n            </DataTable>\n        </OverlayPanel>\n    </div>\n</template>\n\n<script>\nimport ProductService from \'./service/ProductService\';\n\nexport default {\n    data() {\n        return {\n            products: null,\n            selectedProduct: null\n        }\n    },\n    productService: null,\n    created() {\n        this.productService = new ProductService();\n    },\n    mounted() {\n        this.productService.getProductsSmall().then(data => this.products = data);\n    },\n    methods: {\n        toggle(event) {\n            this.$refs.op.toggle(event);\n        },\n        formatCurrency(value) {\n            return value.toLocaleString(\'en-US\', {style: \'currency\', currency: \'USD\'});\n        },\n        onProductSelect(event) {\n            this.$refs.op.hide();\n            this.$toast.add({severity:\'info\', summary: \'Product Selected\', detail: event.data.name, life: 3000});\n        }\n    }\n}\n<\\/script>\n\n<style lang="scss" scoped>\nbutton {\n    min-width: 15rem;\n}\n\n.product-image {\n    width: 50px;\n    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)\n}\n</style>'},"composition-api":{tabName:"Composition API Source",content:'\n<template>\n    <div>\n        <Toast />\n\n        <Button type="button" icon="pi pi-search" :label="selectedProduct ? selectedProduct.name : \'Select a Product\'" @click="toggle" aria:haspopup="true" aria-controls="overlay_panel" />\n\n        <OverlayPanel ref="op" appendTo="body" :showCloseIcon="true" id="overlay_panel" style="width: 450px" :breakpoints="{\'960px\': \'75vw\'}">\n            <DataTable :value="products" v-model:selection="selectedProduct" selectionMode="single" :paginator="true" :rows="5" @rowSelect="onProductSelect" responsiveLayout="scroll" >\n                <Column field="name" header="Name" sortable style="width: 50%"></Column>\n                <Column header="Image" style="width: 20%">\n                    <template #body="slotProps">\n                        <img src="https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png" :alt="slotProps.data.image" class="product-image" />\n                    </template>\n                </Column>\n                <Column field="price" header="Price" sortable style="width: 30%">\n                    <template #body="slotProps">\n                        {{formatCurrency(slotProps.data.price)}}\n                    </template>\n                </Column>\n            </DataTable>\n        </OverlayPanel>\n    </div>\n</template>\n\n<script>\nimport { ref, onMounted } from \'vue\';\nimport { useToast } from \'primevue/usetoast\';\nimport ProductService from \'./service/ProductService\';\n\nexport default {\n    setup() {\n        onMounted(() => {\n            productService.value.getProductsSmall().then(data => products.value = data);\n        })\n\n        const toast = useToast();\n        const op = ref();\n        const productService = ref(new ProductService());\n        const products = ref();\n        const selectedProduct = ref();\n        const toggle = (event) => {\n            op.value.toggle(event);\n        };\n        const formatCurrency = (value) => {\n            return value.toLocaleString(\'en-US\', {style: \'currency\', currency: \'USD\'});\n        };\n        const onProductSelect = (event) => {\n            op.value.hide();\n            toast.add({severity:\'info\', summary: \'Product Selected\', detail: event.data.name, life: 3000});\n        };\n\n        return { op, productService, products, selectedProduct, toggle, formatCurrency, onProductSelect}\n    }\n}\n<\\/script>\n\n<style lang="scss" scoped>\nbutton {\n    min-width: 15rem;\n}\n\n.product-image {\n    width: 50px;\n    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)\n}\n</style>'}}}}};A.render=U;var K=A,L={data:function(){return{products:null,selectedProduct:null}},productService:null,created:function(){this.productService=new d["a"]},mounted:function(){var e=this;this.productService.getProductsSmall().then((function(t){return e.products=t}))},methods:{toggle:function(e){this.$refs.op.toggle(e)},formatCurrency:function(e){return e.toLocaleString("en-US",{style:"currency",currency:"USD"})},onProductSelect:function(e){this.$refs.op.hide(),this.$toast.add({severity:"info",summary:"Product Selected",detail:e.data.name,life:3e3})}},components:{OverlayPanelDoc:K}};n("1fb9");L.render=u,L.__scopeId="data-v-f4f4adf0";t["default"]=L},e9c0:function(e,t,n){"use strict";n.d(t,"a",(function(){return r}));var l=n("d4ec"),o=n("bee2"),c=n("bc3a"),a=n.n(c),r=function(){function e(){Object(l["a"])(this,e)}return Object(o["a"])(e,[{key:"getProductsSmall",value:function(){return a.a.get("demo/data/products-small.json").then((function(e){return e.data.data}))}},{key:"getProducts",value:function(){return a.a.get("demo/data/products.json").then((function(e){return e.data.data}))}},{key:"getProductsWithOrdersSmall",value:function(){return a.a.get("demo/data/products-orders-small.json").then((function(e){return e.data.data}))}}]),e}()}}]);