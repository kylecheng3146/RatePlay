<template >
    <b-col cols="12" sm="12" md="12" >
        <b-card v-for="item in items"
            :title = "item.title"
            :tag = "article"
            :class = "item.cardClass"
            >
            <b-card-text> {{ item.text1 }} </b-card-text>
        </b-card>
    </b-col>
</template>

<script>
export default {
    data () {
        return {
            items: [
                {
                    title: "當月生產完成量",
                    cardClass:'card-detail',
                    text1 :"3,009,009"
                },
                {
                    title: "當月包裝量",
                    cardClass:'card-detail',
                    text1 :"3,002,009"
                },
                {
                    title: "當月出貨量",
                    cardClass:'card-detail',
                    text1 :"3,000,000"
                },
                {
                    title: "當天上線人數",
                    cardClass:'card-detail',
                    text1 :"105"
                }
            ]
        }
    }
}
</script>
