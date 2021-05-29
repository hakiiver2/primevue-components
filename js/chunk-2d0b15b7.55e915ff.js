(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0b15b7"],{2003:function(e,t,n){"use strict";n.r(t);n("b0c0");var l=n("7a23"),c={class:"content-section introduction"},a=Object(l["m"])("div",{class:"feature-intro"},[Object(l["m"])("h1",null,"RadioButton"),Object(l["m"])("p",null,"RadioButton is an extension to standard radio button element with theming.")],-1),o={class:"content-section implementation"},i={class:"card"},d=Object(l["m"])("h5",null,"Basic",-1),u={class:"p-field-radiobutton"},r=Object(l["m"])("label",{for:"city1"},"Chicago",-1),b={class:"p-field-radiobutton"},m=Object(l["m"])("label",{for:"city2"},"Los Angeles",-1),s={class:"p-field-radiobutton"},y=Object(l["m"])("label",{for:"city3"},"New York",-1),O={class:"p-field-radiobutton"},j=Object(l["m"])("label",{for:"city4"},"San Francisco",-1),v=Object(l["m"])("h5",null,"Dynamic Values, Preselection, Value Binding and Disabled Option",-1);function p(e,t,n,p,g,f){var h=Object(l["K"])("AppDemoActions"),k=Object(l["K"])("RadioButton"),R=Object(l["K"])("RadioButtonDoc");return Object(l["C"])(),Object(l["h"])("div",null,[Object(l["m"])("div",c,[a,Object(l["m"])(h)]),Object(l["m"])("div",o,[Object(l["m"])("div",i,[d,Object(l["m"])("div",u,[Object(l["m"])(k,{id:"city1",name:"city",value:"Chicago",modelValue:g.city,"onUpdate:modelValue":t[1]||(t[1]=function(e){return g.city=e})},null,8,["modelValue"]),r]),Object(l["m"])("div",b,[Object(l["m"])(k,{id:"city2",name:"city",value:"Los Angeles",modelValue:g.city,"onUpdate:modelValue":t[2]||(t[2]=function(e){return g.city=e})},null,8,["modelValue"]),m]),Object(l["m"])("div",s,[Object(l["m"])(k,{id:"city3",name:"city",value:"New York",modelValue:g.city,"onUpdate:modelValue":t[3]||(t[3]=function(e){return g.city=e})},null,8,["modelValue"]),y]),Object(l["m"])("div",O,[Object(l["m"])(k,{id:"city4",name:"city",value:"San Francisco",modelValue:g.city,"onUpdate:modelValue":t[4]||(t[4]=function(e){return g.city=e})},null,8,["modelValue"]),j]),v,(Object(l["C"])(!0),Object(l["h"])(l["a"],null,Object(l["I"])(g.categories,(function(e){return Object(l["C"])(),Object(l["h"])("div",{key:e.key,class:"p-field-radiobutton"},[Object(l["m"])(k,{id:e.key,name:"category",value:e,modelValue:g.selectedCategory,"onUpdate:modelValue":t[5]||(t[5]=function(e){return g.selectedCategory=e}),disabled:"R"===e.key},null,8,["id","value","modelValue","disabled"]),Object(l["m"])("label",{for:e.key},Object(l["O"])(e.name),9,["for"])])})),128))])]),Object(l["m"])(R)])}var g=Object(l["m"])("h5",null,"Import",-1),f=Object(l["m"])("code",null,"\nimport RadioButton from 'primevue/radiobutton';\n\n",-1),h=Object(l["m"])("h5",null,"Getting Started",-1),k=Object(l["m"])("p",null,"Two-way value binding is defined using the standard v-model directive.",-1),R=Object(l["m"])("code",null,'\n<RadioButton name="city" value="Chicago" v-model="city" />\n<RadioButton name="city" value="Los Angeles" v-model="city" />\n\n',-1),V=Object(l["m"])("code",null,"\nexport default {\n\tdata() {\n\t\treturn {\n\t\t\tcity: null\n\t\t}\n\t}\n}\n\n",-1),B=Object(l["m"])("p",null,"As model is two-way binding enabled, giving a default value to the model is enough to display a radio button as checked by default.",-1),C=Object(l["m"])("code",null,"\nexport default {\n\tdata() {\n\t\treturn {\n\t\t\tcity: 'Chicago'\n\t\t}\n\t}\n}\n\n",-1),w=Object(l["m"])("h5",null,"Properties",-1),A=Object(l["m"])("p",null,"Any property such as name and autofocus are passed to the underlying input element. Following is the additional property to configure the component.",-1),D=Object(l["m"])("div",{class:"doc-tablewrapper"},[Object(l["m"])("table",{class:"doc-table"},[Object(l["m"])("thead",null,[Object(l["m"])("tr",null,[Object(l["m"])("th",null,"Name"),Object(l["m"])("th",null,"Type"),Object(l["m"])("th",null,"Default"),Object(l["m"])("th",null,"Description")])]),Object(l["m"])("tbody",null,[Object(l["m"])("tr",null,[Object(l["m"])("td",null,"value"),Object(l["m"])("td",null,"any"),Object(l["m"])("td",null,"null"),Object(l["m"])("td",null,"Value of the checkbox.")]),Object(l["m"])("tr",null,[Object(l["m"])("td",null,"modelValue"),Object(l["m"])("td",null,"any"),Object(l["m"])("td",null,"null"),Object(l["m"])("td",null,"Value binding of the checkbox.")])])])],-1),P=Object(l["m"])("h5",null,"Events",-1),N=Object(l["m"])("p",null,"Any valid event such as focus and blur.",-1),S=Object(l["m"])("h5",null,"Styling",-1),L=Object(l["l"])("Following is the list of structural style classes, for theming classes visit "),x=Object(l["l"])("theming"),F=Object(l["l"])(" page."),U=Object(l["m"])("div",{class:"doc-tablewrapper"},[Object(l["m"])("table",{class:"doc-table"},[Object(l["m"])("thead",null,[Object(l["m"])("tr",null,[Object(l["m"])("th",null,"Name"),Object(l["m"])("th",null,"Element")])]),Object(l["m"])("tbody",null,[Object(l["m"])("tr",null,[Object(l["m"])("td",null,"p-radiobutton"),Object(l["m"])("td",null,"Container element")]),Object(l["m"])("tr",null,[Object(l["m"])("td",null,"p-radiobutton-box"),Object(l["m"])("td",null,"Container of icon.")]),Object(l["m"])("tr",null,[Object(l["m"])("td",null,"p-radiobutton-icon"),Object(l["m"])("td",null,"Icon element.")]),Object(l["m"])("tr",null,[Object(l["m"])("td",null,"p-radiobutton-label"),Object(l["m"])("td",null,"Label element.")])])])],-1),M=Object(l["m"])("h5",null,"Dependencies",-1),Y=Object(l["m"])("p",null,"None.",-1);function I(e,t,n,c,a,o){var i=Object(l["K"])("router-link"),d=Object(l["K"])("AppDoc"),u=Object(l["L"])("code");return Object(l["C"])(),Object(l["h"])(d,{name:"RadioButtonDemo",sources:a.sources,github:"radiobutton/RadioButtonDemo.vue"},{default:Object(l["U"])((function(){return[g,Object(l["V"])(Object(l["m"])("pre",null,[f],512),[[u,void 0,void 0,{script:!0}]]),h,k,Object(l["V"])(Object(l["m"])("pre",null,[R],512),[[u]]),Object(l["V"])(Object(l["m"])("pre",null,[V],512),[[u,void 0,void 0,{script:!0}]]),B,Object(l["V"])(Object(l["m"])("pre",null,[C],512),[[u,void 0,void 0,{script:!0}]]),w,A,D,P,N,S,Object(l["m"])("p",null,[L,Object(l["m"])(i,{to:"/theming"},{default:Object(l["U"])((function(){return[x]})),_:1}),F]),U,M,Y]})),_:1},8,["sources"])}var K={data:function(){return{sources:{"options-api":{tabName:"Options API Source",content:'\n<template>\n    <div>\n        <h5>Basic</h5>\n        <div class="p-field-radiobutton">\n            <RadioButton id="city1" name="city" value="Chicago" v-model="city" />\n            <label for="city1">Chicago</label>\n        </div>\n        <div class="p-field-radiobutton">\n            <RadioButton id="city2" name="city" value="Los Angeles" v-model="city" />\n            <label for="city2">Los Angeles</label>\n        </div>\n        <div class="p-field-radiobutton">\n            <RadioButton id="city3" name="city" value="New York" v-model="city" />\n            <label for="city3">New York</label>\n        </div>\n        <div class="p-field-radiobutton">\n            <RadioButton id="city4" name="city" value="San Francisco" v-model="city" />\n            <label for="city4">San Francisco</label>\n        </div>\n\n        <h5>Dynamic Values, Preselection, Value Binding and Disabled Option</h5>\n        <div v-for="category of categories" :key="category.key" class="p-field-radiobutton">\n            <RadioButton :id="category.key" name="category" :value="category" v-model="selectedCategory" :disabled="category.key === \'R\'" />\n            <label :for="category.key">{{category.name}}</label>\n        </div>\n    </div>\n</template>\n\n<script>\nexport default {\n    data() {\n        return {\n            city: null,\n            categories: [\n                {name: \'Accounting\', key: \'A\'}, \n                {name: \'Marketing\', key: \'M\'}, \n                {name: \'Production\', key: \'P\'}, \n                {name: \'Research\', key: \'R\'}\n            ],\n            selectedCategory: null\n        }\n    },\n    created() {\n        this.selectedCategory = this.categories[1];\n    }\n}\n<\\/script>\n'},"composition-api":{tabName:"Composition API Source",content:'\n<template>\n    <div>\n        <h5>Basic</h5>\n        <div class="p-field-radiobutton">\n            <RadioButton id="city1" name="city" value="Chicago" v-model="city" />\n            <label for="city1">Chicago</label>\n        </div>\n        <div class="p-field-radiobutton">\n            <RadioButton id="city2" name="city" value="Los Angeles" v-model="city" />\n            <label for="city2">Los Angeles</label>\n        </div>\n        <div class="p-field-radiobutton">\n            <RadioButton id="city3" name="city" value="New York" v-model="city" />\n            <label for="city3">New York</label>\n        </div>\n        <div class="p-field-radiobutton">\n            <RadioButton id="city4" name="city" value="San Francisco" v-model="city" />\n            <label for="city4">San Francisco</label>\n        </div>\n\n        <h5>Dynamic Values, Preselection, Value Binding and Disabled Option</h5>\n        <div v-for="category of categories" :key="category.key" class="p-field-radiobutton">\n            <RadioButton :id="category.key" name="category" :value="category" v-model="selectedCategory" :disabled="category.key === \'R\'" />\n            <label :for="category.key">{{category.name}}</label>\n        </div>\n    </div>\n</template>\n\n<script>\nimport { ref } from \'vue\';\n\nexport default {\n    setup() {\n        const city = ref();\n        const categories = ref([\n            {name: \'Accounting\', key: \'A\'}, \n            {name: \'Marketing\', key: \'M\'}, \n            {name: \'Production\', key: \'P\'}, \n            {name: \'Research\', key: \'R\'}\n        ]);\n        const selectedCategory = ref(categories.value[1]);\n\n        return { city, categories, selectedCategory }\n    }\n}\n<\\/script>\n'}}}}};K.render=I;var E=K,J={data:function(){return{city:null,categories:[{name:"Accounting",key:"A"},{name:"Marketing",key:"M"},{name:"Production",key:"P"},{name:"Research",key:"R"}],selectedCategory:null}},created:function(){this.selectedCategory=this.categories[1]},components:{RadioButtonDoc:E}};J.render=p;t["default"]=J}}]);