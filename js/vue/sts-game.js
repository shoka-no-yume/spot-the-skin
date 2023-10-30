const STS_GAME = {
    emits: ['gameFinished'],
    data(){
        return {
            deck: [],
            remainingCards: null,
            tableCard: null,
            playerCard: null,
            animationCard: null,
            tableCardRotations: {
                skins: null,
                card: null,
            },
            playerCardRotations: {
                skins: null,
                card: null,
            },
            animationCardRotations: {
                skins: null,
                card: null,
            },
            animationPlaying: false,
            mistakes: 0,
        }
    },
    methods: {
        setUpRotations(player=true, table=true){
            if(table){
                this.tableCardRotations['skins'] = [];
                this.tableCardRotations['card'] = Math.floor(Math.random() * 360);
            }
            if(player){
                this.playerCardRotations['skins'] = [];
                this.playerCardRotations['card'] = Math.floor(Math.random() * 360);
            }

            for(let i=0; i<6; i++){
                if(table){
                    let degTable = Math.floor(Math.random() * 360);
                    this.tableCardRotations['skins'].push(`translate(-50%, -50%) rotate(${degTable}deg)`);
                }
                if(player){
                    let degPlayer = Math.floor(Math.random() * 360);
                    this.playerCardRotations['skins'].push(`translate(-50%, -50%) rotate(${degPlayer}deg)`);
                }
            }
        },
        copyPlayerRotationsForAnimation(){
            this.animationCardRotations['skins'] = [...this.playerCardRotations['skins']];
            this.animationCardRotations['card'] = this.playerCardRotations['card'];
        },
        copyAnimationRotationsForTable(){
            this.tableCardRotations['skins'] = [...this.animationCardRotations['skins']];
            this.tableCardRotations['card'] = this.animationCardRotations['card'];
        },
        startNewGame(){
            this.mistakes = 0;

            this.deck = structuredClone(this.orderedDeck);
            shuffleArrayOfArrays(this.deck);
            this.remainingCards = 30;
            this.tableCard = this.deck[0];
            this.playerCard = this.deck[1];
            this.animationCard = this.playerCard;

            this.setUpRotations();
            this.copyPlayerRotationsForAnimation();
            
            setTimeout(this.adjustAnimatedCardHolder, 0);

            this.startedGame = Date.now();
        },
        adjustAnimatedCardHolder(){
            const pos = getOffset(this.$refs.tableCardHolder);
            this.$refs.animationCardHolder.style.top = (pos.top-15)+'px';
            this.$refs.animationCardHolder.style.left = pos.left+'px';

            const tableCardHolderSize = this.$refs.tableCardHolder.getBoundingClientRect();
            this.$refs.animationCardHolder.style.width = tableCardHolderSize.width+'px';
            this.$refs.animationCardHolder.style.height = tableCardHolderSize.height+'px';
        },
        animationEnded(){
            this.tableCard = this.deck[30 - this.remainingCards];
            this.copyAnimationRotationsForTable();
            this.animationPlaying = false;
            if(this.remainingCards == 0){
                this.remainingCards = null;
                while(this.deck.length){this.deck.pop();}
                const finishedGame = Date.now();
                this.$emit('gameFinished', {
                    'time': finishedGame - this.startedGame,
                    'mistakes': this.mistakes,
                })
            }
        },
        skinClicked(i){
            if(this.animationPlaying) return;
            const correctAnswer = this.deck[30-this.remainingCards].filter(element => this.deck[31-this.remainingCards].includes(element))[0];
            if(correctAnswer != i){
                this.mistakes += 1;
                return;
            }
            
            const posStart = getOffset(this.$refs.playerCardHolder);
            this.$refs.animationCardHolder.style.top = (posStart.top-15)+'px';
            this.$refs.animationCardHolder.style.left = posStart.left+'px';

            const tableCardHolderSize = this.$refs.tableCardHolder.getBoundingClientRect();
            this.$refs.animationCardHolder.style.width = tableCardHolderSize.width+'px';
            this.$refs.animationCardHolder.style.height = tableCardHolderSize.height+'px';

            const posEnd = getOffset(this.$refs.tableCardHolder);

            this.copyPlayerRotationsForAnimation();
            this.animationCard = [...this.playerCard];

            this.animationPlaying = true;

            this.remainingCards -= 1;
            if(this.remainingCards>0){
                this.playerCard = this.deck[31 - this.remainingCards];
                this.setUpRotations(true, false);
            }

            let animation = this.$refs.animationCardHolder.animate([
                // keyframes
                {
                    top: (posStart.top-15)+'px',
                },
                {
                    top: (posEnd.top-15)+'px',
                }
            ], {
                // sync options
                duration: 500,
                iterations: 1,
            });

            const self = this;

            animation.finished.then((value) => {
                self.animationEnded();
            });

        }
    },
    created(){
        this.orderedDeck = [
            [0, 1, 2, 3, 4, 5],
            [0, 6, 7, 8, 9, 10],
            [0, 11, 12, 13, 14, 15],
            [0, 16, 17, 18, 19, 20],
            [0, 21, 22, 23, 24, 25],
            [0, 26, 27, 28, 29, 30],
            [1, 6, 11, 16, 21, 26],
            [1, 7, 12, 17, 22, 27],
            [1, 8, 13, 18, 23, 28],
            [1, 9, 14, 19, 24, 29],
            [1, 10, 15, 20, 25, 30],
            [2, 6, 12, 18, 24, 30],
            [2, 7, 13, 19, 25, 26],
            [2, 8, 14, 20, 21, 27],
            [2, 9, 15, 16, 22, 28],
            [2, 10, 11, 17, 23, 29],
            [3, 6, 13, 20, 22, 29],
            [3, 7, 14, 16, 23, 30],
            [3, 8, 15, 17, 24, 26],
            [3, 9, 11, 18, 25, 27],
            [3, 10, 12, 19, 21, 28],
            [4, 6, 14, 17, 25, 28],
            [4, 7, 15, 18, 21, 29],
            [4, 8, 11, 19, 22, 30],
            [4, 9, 12, 20, 23, 26],
            [4, 10, 13, 16, 24, 27],
            [5, 6, 15, 19, 23, 27],
            [5, 7, 11, 20, 24, 28],
            [5, 8, 12, 16, 25, 29],
            [5, 9, 13, 17, 21, 30],
            [5, 10, 14, 18, 22, 26],
        ];
        this.startedGame = null;
    },
    template: /*html*/ `
        <div v-if="deck.length && Number.isInteger(remainingCards) && remainingCards >= 0">
            <h3>
                <span>Remaining cards: {{remainingCards}}</span>&emsp;
                <span style="color: var(--magenta);">Mistakes: {{mistakes}}</span>
            </h3>
            <div>
                <div ref="tableCardHolder">
                    <sts-card
                        :skins="tableCard"
                        :rotation-data="tableCardRotations"
                    ></sts-card>
                </div>
                <div ref="playerCardHolder" v-if="remainingCards>0">
                    <sts-card
                        :skins="playerCard"
                        :rotation-data="playerCardRotations"
                        :interactive-card="true"
                        @skin-clicked="skinClicked"
                    ></sts-card>
                </div>
                <div class="animation-card-holder" :class="[animationPlaying ? '' : 'hidden']" ref="animationCardHolder">
                    <sts-card
                        :skins="animationCard"
                        :rotation-data="animationCardRotations"
                    ></sts-card>
                </div>
            </div>
        </div>
    `,
};