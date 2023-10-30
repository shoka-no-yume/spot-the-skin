const STS_CARD = {
    emits: ['skinClicked'],
    props: {
        skins: Array,
        rotationData: Object,
        interactiveCard: {
            type: Boolean,
            default: false,
        }
    },
    methods: {
        skinClicked(i){
            if(!this.interactiveCard) return;
            this.$emit('skinClicked', this.skins[i]);
        }
    },
    created(){
        this.skin_names = ['angel', 'banana', 'beachball', 'bomb', 'botroyale', 'cat',
                           'cherry', 'citrus', 'cobra', 'coconut', 'devil', 'discoball',
                           'egg', 'floater', 'frankie', 'ghost', 'moneybag', 'moon',
                           'mummy', 'ninja', 'owl', 'pizza', 'potion', 'royman',
                           'saturn', 'spy', 'target', 'virus', 'waffle', 'watermelon', 'wheeee'];
    },
    template: /*html*/ `
        <div class="sts-card front-card" :style="{transform: 'rotate(' + rotationData.card + 'deg)'}">
            <div
                v-for="n in 6" :key="n"
                class="card-skin"
                :class="[skin_names[skins[n-1]], 'card-skin-'+n, interactiveCard ? 'interactive-skin' : '']"
                :style="{transform: rotationData.skins[n-1]}"
                @click="skinClicked(n-1)"
            ></div>
        </div>
    `,
};