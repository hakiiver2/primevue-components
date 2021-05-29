(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-63a06f52"],{"82f4":function(e,n,t){"use strict";t.d(n,"a",(function(){return d}));var r=t("d4ec"),o=t("bee2"),l=t("bc3a"),a=t.n(l),d=function(){function e(){Object(r["a"])(this,e)}return Object(o["a"])(e,[{key:"getTreeTableNodes",value:function(){return a.a.get("demo/data/treetablenodes.json").then((function(e){return e.data.root}))}},{key:"getTreeNodes",value:function(){return a.a.get("demo/data/treenodes.json").then((function(e){return e.data.root}))}}]),e}()},ef31:function(e,n,t){"use strict";t.r(n);var r=t("7a23"),o={class:"content-section introduction"},l=Object(r["m"])("div",{class:"feature-intro"},[Object(r["m"])("h1",null,[Object(r["l"])("TreeTable "),Object(r["m"])("span",null,"Sort")]),Object(r["m"])("p",null,"TreeTable supports both single column and multiple column sorting..")],-1),a={class:"content-section implementation"},d={class:"card"},i=Object(r["m"])("h5",null,"Single Column Sorting",-1),u={class:"card"},s=Object(r["m"])("h5",null,"Multiple Column Sorting",-1),c={class:"card"},m=Object(r["m"])("h5",null,"Removable Sort",-1);function b(e,n,t,b,v,p){var f=Object(r["K"])("AppDemoActions"),h=Object(r["K"])("Column"),T=Object(r["K"])("TreeTable"),C=Object(r["K"])("AppDoc");return Object(r["C"])(),Object(r["h"])("div",null,[Object(r["m"])("div",o,[l,Object(r["m"])(f)]),Object(r["m"])("div",a,[Object(r["m"])("div",d,[i,Object(r["m"])(T,{value:v.nodes,sortMode:"single"},{default:Object(r["U"])((function(){return[Object(r["m"])(h,{field:"name",header:"Name",expander:!0,sortable:!0}),Object(r["m"])(h,{field:"size",header:"Size",sortable:!0}),Object(r["m"])(h,{field:"type",header:"Type",sortable:!0})]})),_:1},8,["value"])]),Object(r["m"])("div",u,[s,Object(r["m"])(T,{value:v.nodes,sortMode:"multiple"},{default:Object(r["U"])((function(){return[Object(r["m"])(h,{field:"name",header:"Name",expander:!0,sortable:!0}),Object(r["m"])(h,{field:"size",header:"Size",sortable:!0}),Object(r["m"])(h,{field:"type",header:"Type",sortable:!0})]})),_:1},8,["value"])]),Object(r["m"])("div",c,[m,Object(r["m"])(T,{value:v.nodes,sortMode:"single",removableSort:""},{default:Object(r["U"])((function(){return[Object(r["m"])(h,{field:"name",header:"Name",expander:!0,sortable:!0}),Object(r["m"])(h,{field:"size",header:"Size",sortable:!0}),Object(r["m"])(h,{field:"type",header:"Type",sortable:!0})]})),_:1},8,["value"])])]),Object(r["m"])(C,{name:"TreeTableSortDemo",sources:v.sources,service:["NodeService"],data:["treetablenodes"],github:"treetable/TreeTableSortDemo.vue"},null,8,["sources"])])}var v=t("82f4"),p={data:function(){return{nodes:null,sources:{"options-api":{tabName:"Options API Source",content:'\n<template>\n    <div>\n        <div class="card">\n            <h5>Single Column Sorting</h5>\n            <TreeTable :value="nodes" sortMode="single">\n                <Column field="name" header="Name" :expander="true" :sortable="true"></Column>\n                <Column field="size" header="Size" :sortable="true"></Column>\n                <Column field="type" header="Type" :sortable="true"></Column>\n            </TreeTable>\n        </div>\n\n        <div class="card">\n            <h5>Multiple Column Sorting</h5>\n            <TreeTable :value="nodes" sortMode="multiple">\n                <Column field="name" header="Name" :expander="true" :sortable="true"></Column>\n                <Column field="size" header="Size" :sortable="true"></Column>\n                <Column field="type" header="Type" :sortable="true"></Column>\n            </TreeTable>\n        </div>\n\n        <div class="card">\n            <h5>Removable Sort</h5>\n            <TreeTable :value="nodes" sortMode="single" removableSort>\n                <Column field="name" header="Name" :expander="true" :sortable="true"></Column>\n                <Column field="size" header="Size" :sortable="true"></Column>\n                <Column field="type" header="Type" :sortable="true"></Column>\n            </TreeTable>\n        </div>\n    </div>                    \n</template>\n\n<script>\nimport NodeService from \'./service/NodeService\';\n\nexport default {\n    data() {\n        return {\n            nodes: null\n        }\n    },\n    nodeService: null,\n    created() {\n        this.nodeService = new NodeService();\n    },\n    mounted() {\n        this.nodeService.getTreeTableNodes().then(data => this.nodes = data);\n    }\n}\n<\\/script>\n'},"composition-api":{tabName:"Composition API Source",content:'\n<template>\n    <div>\n        <div class="card">\n            <h5>Single Column Sorting</h5>\n            <TreeTable :value="nodes" sortMode="single">\n                <Column field="name" header="Name" :expander="true" :sortable="true"></Column>\n                <Column field="size" header="Size" :sortable="true"></Column>\n                <Column field="type" header="Type" :sortable="true"></Column>\n            </TreeTable>\n        </div>\n\n        <div class="card">\n            <h5>Multiple Column Sorting</h5>\n            <TreeTable :value="nodes" sortMode="multiple">\n                <Column field="name" header="Name" :expander="true" :sortable="true"></Column>\n                <Column field="size" header="Size" :sortable="true"></Column>\n                <Column field="type" header="Type" :sortable="true"></Column>\n            </TreeTable>\n        </div>\n\n        <div class="card">\n            <h5>Removable Sort</h5>\n            <TreeTable :value="nodes" sortMode="single" removableSort>\n                <Column field="name" header="Name" :expander="true" :sortable="true"></Column>\n                <Column field="size" header="Size" :sortable="true"></Column>\n                <Column field="type" header="Type" :sortable="true"></Column>\n            </TreeTable>\n        </div>\n    </div>                  \n</template>\n\n<script>\nimport { ref, onMounted } from \'vue\';\nimport NodeService from \'./service/NodeService\';\n\nexport default {\n    setup() {\n        onMounted(() => {\n            nodeService.value.getTreeTableNodes().then(data => nodes.value = data);\n        })\n\n        const nodes = ref();\n        const nodeService = ref(new NodeService());\n\n        return { nodes, nodeService }\n    }\n}\n<\\/script>\n'}}}},nodeService:null,created:function(){this.nodeService=new v["a"]},mounted:function(){var e=this;this.nodeService.getTreeTableNodes().then((function(n){return e.nodes=n}))}};p.render=b;n["default"]=p}}]);