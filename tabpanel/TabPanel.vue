<template>
    <slot></slot>
</template>

<script>
export default {
    name: 'TabPanel',
    props: {
        header: null,
        headerStyle: null,
        headerClass: null,
        headerProps: null,
        headerActionProps: null,
        contentStyle: null,
        contentClass: null,
        contentProps: null,
        disabled: Boolean
    }
}
</script>
