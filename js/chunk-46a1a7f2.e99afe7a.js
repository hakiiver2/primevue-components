(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-46a1a7f2"],{"16f5":function(e,l,t){"use strict";t("e323")},"4c85":function(e,l,t){var n=t("24fb");l=n(!1),l.push([e.i,".p-inputtext[data-v-3ec9f9f7],.p-slider-horizontal[data-v-3ec9f9f7]{width:14rem}.p-slider-vertical[data-v-3ec9f9f7]{height:14rem}",""]),e.exports=l},"9b66":function(e,l,t){"use strict";t.r(l);var n=t("7a23"),u=Object(n["Y"])("data-v-3ec9f9f7");Object(n["F"])("data-v-3ec9f9f7");var a={class:"content-section introduction"},c=Object(n["m"])("div",{class:"feature-intro"},[Object(n["m"])("h1",null,"Slider"),Object(n["m"])("p",null,"Slider is an input component to provide a numerical input.")],-1),r={class:"content-section implementation"},o={class:"card"};Object(n["D"])();var d=u((function(e,l,t,u,d,m){var i=Object(n["K"])("AppDemoActions"),b=Object(n["K"])("Slider"),O=Object(n["K"])("InputText"),j=Object(n["K"])("SliderDoc");return Object(n["C"])(),Object(n["h"])("div",null,[Object(n["m"])("div",a,[c,Object(n["m"])(i)]),Object(n["m"])("div",r,[Object(n["m"])("div",o,[Object(n["m"])("h5",null,"Basic: "+Object(n["O"])(d.value1),1),Object(n["m"])(b,{modelValue:d.value1,"onUpdate:modelValue":l[1]||(l[1]=function(e){return d.value1=e})},null,8,["modelValue"]),Object(n["m"])("h5",null,"Input: "+Object(n["O"])(d.value2),1),Object(n["m"])(O,{modelValue:d.value2,"onUpdate:modelValue":l[2]||(l[2]=function(e){return d.value2=e}),modelModifiers:{number:!0}},null,8,["modelValue"]),Object(n["m"])(b,{modelValue:d.value2,"onUpdate:modelValue":l[3]||(l[3]=function(e){return d.value2=e})},null,8,["modelValue"]),Object(n["m"])("h5",null,"Step: "+Object(n["O"])(d.value3),1),Object(n["m"])(b,{modelValue:d.value3,"onUpdate:modelValue":l[4]||(l[4]=function(e){return d.value3=e}),step:20},null,8,["modelValue"]),Object(n["m"])("h5",null,"Decimal Step: "+Object(n["O"])(d.value4),1),Object(n["m"])(b,{modelValue:d.value4,"onUpdate:modelValue":l[5]||(l[5]=function(e){return d.value4=e}),step:.5},null,8,["modelValue","step"]),Object(n["m"])("h5",null,"Range: "+Object(n["O"])(d.value5),1),Object(n["m"])(b,{modelValue:d.value5,"onUpdate:modelValue":l[6]||(l[6]=function(e){return d.value5=e}),range:!0},null,8,["modelValue"]),Object(n["m"])("h5",null,"Vertical: "+Object(n["O"])(d.value6),1),Object(n["m"])(b,{modelValue:d.value6,"onUpdate:modelValue":l[7]||(l[7]=function(e){return d.value6=e}),orientation:"vertical"},null,8,["modelValue"])])]),Object(n["m"])(j)])})),m=Object(n["m"])("h5",null,"Import",-1),i=Object(n["m"])("code",null,"\nimport Slider from 'primevue/slider';\n\n",-1),b=Object(n["m"])("h5",null,"Getting Started",-1),O=Object(n["m"])("p",null,"Two-way binding is defined using the standard v-model directive.",-1),j=Object(n["m"])("code",null,'\n<Slider v-model="value" />\n\n',-1),s=Object(n["m"])("h5",null,"Range",-1),v=Object(n["m"])("p",null,[Object(n["l"])("Range slider provides two handles to define two values. Enable "),Object(n["m"])("i",null,"range"),Object(n["l"])(" property and bind an array to implement a range slider.")],-1),p=Object(n["m"])("code",null,'\n<Slider v-model="value" :range="true" />\n\n',-1),h=Object(n["m"])("code",null,"\nexport default {\n\tdata() {\n\t\treturn {\n\t\t\tvalue: [20,80]\n\t\t}\n\t}\n}\n\n",-1),f=Object(n["m"])("h5",null,"Orientation",-1),S=Object(n["m"])("p",null,[Object(n["l"])("Default layout of slider is horizontal, use "),Object(n["m"])("i",null,"orientation"),Object(n["l"])(" property for the alternative vertical mode.")],-1),g=Object(n["m"])("code",null,'\n<Slider v-model="value" orientation="vertical" />\n\n',-1),V=Object(n["m"])("h5",null,"Step",-1),w=Object(n["m"])("p",null,[Object(n["l"])("Step factor is 1 by default and can be customized with "),Object(n["m"])("i",null,"step"),Object(n["l"])(" option.")],-1),y=Object(n["m"])("code",null,'\n<Slider v-model="value" :step="20" />\n\n',-1),x=Object(n["m"])("h5",null,"Min-Max",-1),D=Object(n["m"])("p",null,"Boundaries are specified with min and max attributes.",-1),I=Object(n["m"])("code",null,'\n<Slider v-model="value" :step="20" :min="50" :max="200" />\n\n',-1),k=Object(n["m"])("h5",null,"Properties",-1),U=Object(n["m"])("p",null,"Any property as style and class are passed to the main container element. Following are the additional properties to configure the component.",-1),M=Object(n["m"])("div",{class:"doc-tablewrapper"},[Object(n["m"])("table",{class:"doc-table"},[Object(n["m"])("thead",null,[Object(n["m"])("tr",null,[Object(n["m"])("th",null,"Name"),Object(n["m"])("th",null,"Type"),Object(n["m"])("th",null,"Default"),Object(n["m"])("th",null,"Description")])]),Object(n["m"])("tbody",null,[Object(n["m"])("tr",null,[Object(n["m"])("td",null,"modelValue"),Object(n["m"])("td",null,"number"),Object(n["m"])("td",null,"0"),Object(n["m"])("td",null,"Value of the component.")]),Object(n["m"])("tr",null,[Object(n["m"])("td",null,"min"),Object(n["m"])("td",null,"number"),Object(n["m"])("td",null,"0"),Object(n["m"])("td",null,"Mininum boundary value.")]),Object(n["m"])("tr",null,[Object(n["m"])("td",null,"max"),Object(n["m"])("td",null,"number"),Object(n["m"])("td",null,"100"),Object(n["m"])("td",null,"Maximum boundary value.")]),Object(n["m"])("tr",null,[Object(n["m"])("td",null,"orientation"),Object(n["m"])("td",null,"string"),Object(n["m"])("td",null,"horizontal"),Object(n["m"])("td",null,"Orientation of the slider, valid values are horizontal and vertical.")]),Object(n["m"])("tr",null,[Object(n["m"])("td",null,"step"),Object(n["m"])("td",null,"number"),Object(n["m"])("td",null,"1"),Object(n["m"])("td",null,"Step factor to increment/decrement the value.")]),Object(n["m"])("tr",null,[Object(n["m"])("td",null,"range"),Object(n["m"])("td",null,"boolean"),Object(n["m"])("td",null,"false"),Object(n["m"])("td",null,"When speficed, allows two boundary values to be picked.")]),Object(n["m"])("tr",null,[Object(n["m"])("td",null,"disabled"),Object(n["m"])("td",null,"boolean"),Object(n["m"])("td",null,"false"),Object(n["m"])("td",null,"When present, it specifies that the component should be disabled.")]),Object(n["m"])("tr",null,[Object(n["m"])("td",null,"ariaLabelledBy"),Object(n["m"])("td",null,"string"),Object(n["m"])("td",null,"null"),Object(n["m"])("td",null,"Establishes relationships between the component and label(s) where its value should be one or more element IDs.")])])])],-1),z=Object(n["m"])("h5",null,"Events",-1),N=Object(n["m"])("div",{class:"doc-tablewrapper"},[Object(n["m"])("table",{class:"doc-table"},[Object(n["m"])("thead",null,[Object(n["m"])("tr",null,[Object(n["m"])("th",null,"Name"),Object(n["m"])("th",null,"Parameters"),Object(n["m"])("th",null,"Description")])]),Object(n["m"])("tbody",null,[Object(n["m"])("tr",null,[Object(n["m"])("td",null,"change"),Object(n["m"])("td",null,"value: Selected option value "),Object(n["m"])("td",null,"Callback to invoke on value change.")]),Object(n["m"])("tr",null,[Object(n["m"])("td",null,"slideend"),Object(n["m"])("td",null,[Object(n["l"])("event.originalEvent: Original event "),Object(n["m"])("br"),Object(n["l"])(" event.value: New value. ")]),Object(n["m"])("td",null,"Callback to invoke when slide ends.")])])])],-1),A=Object(n["m"])("h5",null,"Styling",-1),C=Object(n["l"])("Following is the list of structural style classes, for theming classes visit "),K=Object(n["l"])("theming"),_=Object(n["l"])(" page."),B=Object(n["m"])("div",{class:"doc-tablewrapper"},[Object(n["m"])("table",{class:"doc-table"},[Object(n["m"])("thead",null,[Object(n["m"])("tr",null,[Object(n["m"])("th",null,"Name"),Object(n["m"])("th",null,"Element")])]),Object(n["m"])("tbody",null,[Object(n["m"])("tr",null,[Object(n["m"])("td",null,"p-slider"),Object(n["m"])("td",null,"Container element")]),Object(n["m"])("tr",null,[Object(n["m"])("td",null,"p-slider-handle"),Object(n["m"])("td",null,"Handle element.")])])])],-1),E=Object(n["m"])("h5",null,"Dependencies",-1),R=Object(n["m"])("p",null,"None.",-1);function T(e,l,t,u,a,c){var r=Object(n["K"])("router-link"),o=Object(n["K"])("AppDoc"),d=Object(n["L"])("code");return Object(n["C"])(),Object(n["h"])(o,{name:"SliderDemo",sources:a.sources,github:"slider/SliderDemo.vue"},{default:Object(n["U"])((function(){return[m,Object(n["V"])(Object(n["m"])("pre",null,[i],512),[[d,void 0,void 0,{script:!0}]]),b,O,Object(n["V"])(Object(n["m"])("pre",null,[j],512),[[d]]),s,v,Object(n["V"])(Object(n["m"])("pre",null,[p],512),[[d]]),Object(n["V"])(Object(n["m"])("pre",null,[h],512),[[d,void 0,void 0,{script:!0}]]),f,S,Object(n["V"])(Object(n["m"])("pre",null,[g],512),[[d]]),V,w,Object(n["V"])(Object(n["m"])("pre",null,[y],512),[[d]]),x,D,Object(n["V"])(Object(n["m"])("pre",null,[I],512),[[d]]),k,U,M,z,N,A,Object(n["m"])("p",null,[C,Object(n["m"])(r,{to:"/theming"},{default:Object(n["U"])((function(){return[K]})),_:1}),_]),B,E,R]})),_:1},8,["sources"])}var P={data:function(){return{sources:{"options-api":{tabName:"Options API Source",content:'\n<template>\n    <div>\n        <h5>Basic: {{value1}}</h5>\n        <Slider v-model="value1" />\n\n        <h5>Input: {{value2}}</h5>\n        <InputText v-model.number="value2" />\n        <Slider v-model="value2" />\n\n        <h5>Step: {{value3}}</h5>\n        <Slider v-model="value3" :step="20" />\n\n        <h5>Decimal Step: {{value4}}</h5>\n        <Slider v-model="value4" :step="0.5" />\n\n        <h5>Range: {{value5}}</h5>\n        <Slider v-model="value5" :range="true" />\n\n        <h5>Vertical: {{value6}}</h5>\n        <Slider v-model="value6" orientation="vertical" />\n    </div>\n</template>\n\n<script>\nexport default {\n    data() {\n        return {\n            value1: null,\n            value2: 50,\n            value3: 20,\n            value4: 30.5,\n            value5: [20,80],\n            value6: 50\n        }\n    }\n}\n<\\/script>\n\n<style scoped>\n.p-slider-horizontal, .p-inputtext {\n    width: 14rem;\n}\n.p-slider-vertical {\n     height: 14rem;\n}\n</style>'},"composition-api":{tabName:"Composition API Source",content:'\n<template>\n    <div>\n        <h5>Basic: {{value1}}</h5>\n        <Slider v-model="value1" />\n\n        <h5>Input: {{value2}}</h5>\n        <InputText v-model.number="value2" />\n        <Slider v-model="value2" />\n\n        <h5>Step: {{value3}}</h5>\n        <Slider v-model="value3" :step="20" />\n\n        <h5>Decimal Step: {{value4}}</h5>\n        <Slider v-model="value4" :step="0.5" />\n\n        <h5>Range: {{value5}}</h5>\n        <Slider v-model="value5" :range="true" />\n\n        <h5>Vertical: {{value6}}</h5>\n        <Slider v-model="value6" orientation="vertical" />\n    </div>\n</template>\n\n<script>\nimport { ref } from \'vue\';\n\nexport default {\n    setup() {\n        const value1 = ref(null);\n        const value2 = ref(50);\n        const value3 = ref(20);\n        const value4 = ref(30.5);\n        const value5 = ref([20,80]);\n        const value6 = ref(50);\n\n        return { value1, value2, value3, value4, value5, value6 }\n    }\n}\n<\\/script>\n\n<style scoped>\n.p-slider-horizontal, .p-inputtext {\n    width: 14rem;\n}\n.p-slider-vertical {\n     height: 14rem;\n}\n</style>'}}}}};P.render=T;var F=P,J={data:function(){return{value1:null,value2:50,value3:20,value4:30.5,value5:[20,80],value6:50}},components:{SliderDoc:F}};t("16f5");J.render=d,J.__scopeId="data-v-3ec9f9f7";l["default"]=J},e323:function(e,l,t){var n=t("4c85");n.__esModule&&(n=n.default),"string"===typeof n&&(n=[[e.i,n,""]]),n.locals&&(e.exports=n.locals);var u=t("499e").default;u("6d13d7ac",n,!0,{sourceMap:!1,shadowMode:!1})}}]);