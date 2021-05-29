(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-1fece4f5"],{"3fbf":function(e,t,n){"use strict";n("98d4")},"98d4":function(e,t,n){var a=n("9aac");a.__esModule&&(a=a.default),"string"===typeof a&&(a=[[e.i,a,""]]),a.locals&&(e.exports=a.locals);var o=n("499e").default;o("18a723ca",a,!0,{sourceMap:!1,shadowMode:!1})},"9aac":function(e,t,n){var a=n("24fb");t=a(!1),t.push([e.i,"button[data-v-14321cea]{margin-right:.5rem}[data-v-14321cea] .p-tree a{color:#2196f3}",""]),e.exports=t},e6cf6:function(e,t,n){"use strict";n.r(t);var a=n("7a23"),o=Object(a["Y"])("data-v-14321cea");Object(a["F"])("data-v-14321cea");var s={class:"content-section introduction"},l=Object(a["m"])("div",{class:"feature-intro"},[Object(a["m"])("h1",null,[Object(a["l"])("Tree "),Object(a["m"])("span",null,"Templating")]),Object(a["m"])("p",null,"Tree is used to display hierarchical data.")],-1),r={class:"content-section implementation"},p={class:"card"};Object(a["D"])();var d=o((function(e,t,n,d,u,i){var c=Object(a["K"])("AppDemoActions"),v=Object(a["K"])("Tree"),m=Object(a["K"])("AppDoc");return Object(a["C"])(),Object(a["h"])("div",null,[Object(a["m"])("div",s,[l,Object(a["m"])(c)]),Object(a["m"])("div",r,[Object(a["m"])("div",p,[Object(a["m"])(v,{value:u.nodes},{default:o((function(e){return[Object(a["m"])("b",null,Object(a["O"])(e.node.label),1)]})),url:o((function(e){return[Object(a["m"])("a",{href:e.node.data},Object(a["O"])(e.node.label),9,["href"])]})),_:1},8,["value"])])]),Object(a["m"])(m,{name:"TreeTemplatingDemo",sources:u.sources,service:["NodeService"],data:["treenodes"],github:"tree/TreeTemplatingDemo.vue"},null,8,["sources"])])})),u={data:function(){return{nodes:[{key:"0",label:"Introduction",children:[{key:"0-0",label:"What is Vue.js?",data:"https://vuejs.org/v2/guide/#What-is-Vue-js",type:"url"},{key:"0-1",label:"Getting Started",data:"https://vuejs.org/v2/guide/#Getting-Started",type:"url"},{key:"0-2",label:"Declarative Rendering",data:"https://vuejs.org/v2/guide/#Declarative-Rendering",type:"url"},{key:"0-3",label:"Conditionals and Loops",data:"https://vuejs.org/v2/guide/#Conditionals-and-Loops",type:"url"}]},{key:"1",label:"Components In-Depth",children:[{key:"1-0",label:"Component Registration",data:"https://vuejs.org/v2/guide/components-registration.html",type:"url"},{key:"1-1",label:"Props",data:"https://vuejs.org/v2/guide/components-props.html",type:"url"},{key:"1-2",label:"Custom Events",data:"https://vuejs.org/v2/guide/components-custom-events.html",type:"url"},{key:"1-3",label:"Slots",data:"https://vuejs.org/v2/guide/components-slots.html",type:"url"}]}],sources:{"options-api":{tabName:"Options API Source",content:"\n<template>\n    <div>\n        <Tree :value=\"nodes\">\n            <template #default=\"slotProps\">\n                <b>{{slotProps.node.label}}</b>\n            </template>\n            <template #url=\"slotProps\">\n                <a :href=\"slotProps.node.data\">{{slotProps.node.label}}</a>\n            </template>\n        </Tree>\n    </div>                  \n</template>\n\n<script>\nexport default {\n    data() {\n        return {\n            nodes: [\n                {\n                    key: '0',\n                    label: 'Introduction',\n                    children: [\n                        {key: '0-0', label: 'What is Vue.js?', data:'https://vuejs.org/v2/guide/#What-is-Vue-js', type: 'url'},\n                        {key: '0-1', label: 'Getting Started', data: 'https://vuejs.org/v2/guide/#Getting-Started', type: 'url'},\n                        {key: '0-2', label: 'Declarative Rendering', data:'https://vuejs.org/v2/guide/#Declarative-Rendering', type:'url'},\n                        {key: '0-3', label: 'Conditionals and Loops', data: 'https://vuejs.org/v2/guide/#Conditionals-and-Loops', type: 'url'}\n                    ]\n                },\n                {\n                    key: '1',\n                    label: 'Components In-Depth',\n                    children: [\n                        {key: '1-0', label: 'Component Registration', data: 'https://vuejs.org/v2/guide/components-registration.html', type: 'url'},\n                        {key: '1-1', label: 'Props', data: 'https://vuejs.org/v2/guide/components-props.html', type: 'url'},\n                        {key: '1-2', label: 'Custom Events', data: 'https://vuejs.org/v2/guide/components-custom-events.html', type: 'url'},\n                        {key: '1-3', label: 'Slots', data: 'https://vuejs.org/v2/guide/components-slots.html', type: 'url'}\n                    ]\n                }\n            ]\n        }\n    }\n}\n<\\/script>\n\n<style scoped lang=\"scss\">\nbutton {\n    margin-right: .5rem;\n}\n\n::v-deep(.p-tree) {\n    a {\n        color: #2196f3;\n        text-decoration: none;\n    }\n}\n</style>"},"composition-api":{tabName:"Composition API Source",content:"\n<template>\n    <div>\n        <Tree :value=\"nodes\">\n            <template #default=\"slotProps\">\n                <b>{{slotProps.node.label}}</b>\n            </template>\n            <template #url=\"slotProps\">\n                <a :href=\"slotProps.node.data\">{{slotProps.node.label}}</a>\n            </template>\n        </Tree>\n    </div>                  \n</template>\n\n<script>\nimport { ref } from 'vue';\n\nexport default {\n    setup() {\n        const nodes = ref([\n            {\n                key: '0',\n                label: 'Introduction',\n                children: [\n                    {key: '0-0', label: 'What is Vue.js?', data:'https://vuejs.org/v2/guide/#What-is-Vue-js', type: 'url'},\n                    {key: '0-1', label: 'Getting Started', data: 'https://vuejs.org/v2/guide/#Getting-Started', type: 'url'},\n                    {key: '0-2', label: 'Declarative Rendering', data:'https://vuejs.org/v2/guide/#Declarative-Rendering', type:'url'},\n                    {key: '0-3', label: 'Conditionals and Loops', data: 'https://vuejs.org/v2/guide/#Conditionals-and-Loops', type: 'url'}\n                ]\n            },\n            {\n                key: '1',\n                label: 'Components In-Depth',\n                children: [\n                    {key: '1-0', label: 'Component Registration', data: 'https://vuejs.org/v2/guide/components-registration.html', type: 'url'},\n                    {key: '1-1', label: 'Props', data: 'https://vuejs.org/v2/guide/components-props.html', type: 'url'},\n                    {key: '1-2', label: 'Custom Events', data: 'https://vuejs.org/v2/guide/components-custom-events.html', type: 'url'},\n                    {key: '1-3', label: 'Slots', data: 'https://vuejs.org/v2/guide/components-slots.html', type: 'url'}\n                ]\n            }\n        ]);\n\n        return { nodes }\n    }\n}\n<\\/script>\n\n<style scoped lang=\"scss\">\nbutton {\n    margin-right: .5rem;\n}\n\n::v-deep(.p-tree) {\n    a {\n        color: #2196f3;\n        text-decoration: none;\n    }\n}\n</style>"}}}}};n("3fbf");u.render=d,u.__scopeId="data-v-14321cea";t["default"]=u}}]);