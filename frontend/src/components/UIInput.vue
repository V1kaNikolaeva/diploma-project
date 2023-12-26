<template>
    <component :is="multiline ? 'textarea' : 'input'">

    </component>
</template>

<script>
export default {
    name: 'UIInput',

    props: {
        multiline: {
            type: Boolean,
        }
    },

    data() {
        return {

        }
    }
}
</script>