function shuffleArray(array){
    let currentIndex = array.length,  randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex > 0) {

        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }

    return array;
}

function shuffleArrayOfArrays(array){
    for(const el of array){
        shuffleArray(el);
    }
    shuffleArray(array);
}

function randomUUID(){
    return "80000000-4000-4000-4000-120000000000".replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
}

function getOffset(el){
    const rect = el.getBoundingClientRect();
    return {
        left: rect.left + window.scrollX,
        top: rect.top + window.scrollY
    };
}

function millisToFormattedString(time){
    const oneHour = 1*60*60*1000;
    const oneMinute = 1*60*1000;
    const oneSecond = 1*1000;
    const hours = Math.floor(time/oneHour);
    const minutes = Math.floor((time%oneHour)/oneMinute);
    const seconds = Math.floor((time%oneMinute)/oneSecond);
    const miliseconds = time%oneSecond;
    let text = "";
    if(hours > 0) text += `${hours} hour${hours>=2 ? 's' : ''} `;
    if(minutes > 0) text += `${minutes} minute${minutes>=2 ? 's' : ''} `;
    if(seconds > 0) text += `${seconds} second${seconds>=2 ? 's' : ''} `;
    text += `${miliseconds} ms`;
    text = text.trim();
    return text;
}