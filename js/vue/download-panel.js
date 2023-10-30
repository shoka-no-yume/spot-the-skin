const DOWNLOAD_PANEL = {
    props: ['title', 'titleColor', 'waitingTime', 'downloadLink', 'thankYouMessage'],
    data(){
        return {
            secondsToDownload: this.waitingTime,
            rttm: [116,103,34,59,56,119,29,17,19,2,122,37,117,23,22,20,105,126,99,81,100],
            scrt: ':&ltg#RNGJ?z8XYZJGQaP',
            counter: false,
            interval: null,
        }
    },
    computed: {
        nttm(){
            let o = [];
            for(let i=0; i<this.rttm.length; i++){
                o.push(this.scrt.charCodeAt(i) ^ this.rttm[i]);
            }
            return String.fromCharCode(...o).split('#')[0].toLowerCase();
        },
        countDownMessage(){
            if(this.secondsToDownload>1){
                return `Your download will start in <b>${this.secondsToDownload}</b> seconds...`;
            } else if(this.secondsToDownload==1){
                return `Your download will start in <b>1</b> second...`;
            } else {
                return `Your download should have started... If not, try this 
                <a download id='download_${this.linkId}' target='_blank' href='${this.downloadLink}'>link</a>.`
            }
        }
    },
    methods: {
        startTimer(){
            this.interval = setInterval(this.countDown, 1000);
            this.counter = true;
        },
        countDown() {
            if (!this.counter) {
                this.counter = true;
            } else if (this.secondsToDownload > 0) {
                this.secondsToDownload -= 1;
            } else {
                clearInterval(this.interval);
                this.counter = false;
                document.getElementById('download_'+this.linkId).click();
            }
        },
    },
    created(){
        this.linkId = randomUUID();
    },
    mounted(){
        this.startTimer();
    },
    template: /*html*/ `
        <div class='download-panel'>
            <h2 :style="'color: var(--'+titleColor+')'">{{title}}</h2>
            <p v-html="countDownMessage"></p>
            <p>{{thankYouMessage}}</p>
            <p>If you like my work feel free to donate / tip any amount in one of below ways.<br />Thank you for your support <img width="24" src="/img/love.webp" /></p>

            <table>
                <tr>
                    <th style="padding-bottom: 11px;">ROY</th>
                </tr>
                <tr class="text-payment">
                    <td>/tip <span class="tooltip" :title="nttm">@ROY_TO_THE_MOON</span> &lt;amount&gt;<br>(on Crypto Royale Discord Server)</td>
                </tr>
            </table>

            <table>
                <tr>
                    <th>NANO</th>
                </tr>
                <tr>
                    <td><img class='qr-address' src="/img/nano.png" /></td>
                </tr>
            </table>

            <table>
                <tr>
                    <th>MONERO</th>
                </tr>
                <tr>
                    <td><img class='qr-address' src="/img/xmr.png" /></td>
                </tr>
            </table>

        </div>
    `
};