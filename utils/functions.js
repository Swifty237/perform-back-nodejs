export const compareJsonNumberFights = (a, b) => {
    return b.NumberFights - a.NumberFights;
}

export const compareJsonWins = (a, b) => {
    return parseInt(b.WinPercentage) - parseInt(a.WinPercentage);
}

export const getSeparatePercentage = (item) => {

    const indexSpace = item.indexOf(" ");

    if (indexSpace !== -1) {
        return item.substring(0, indexSpace); // Récupère les caractères avant le premier espace
    }
}

export const compareJsonKoWins = (a, b) => {
    return b.KoTkoPercentage - a.KoTkoPercentage;
}

export const compareJsonSubWins = (a, b) => {
    return parseInt(b.SubWinsPercentage) - parseInt(a.SubWinsPercentage);
}

export const compareJsonStriking = (a, b) => {
    return parseInt(b.StrikingAcc) - parseInt(a.StrikingAcc);
}

export const compareJsonStrikingRatio = (a, b) => {
    return parseInt(b.StrikingRatio) - parseInt(a.StrikingRatio);
}

export const compareJsonTakedown = (a, b) => {
    return parseInt(b.TakedownAcc) - parseInt(a.TakedownAcc);
}

export const compareJsonTakedownDefense = (a, b) => {
    return parseInt(b.TakedownDef) - parseInt(a.TakedownDef);
}

export const compareJsonTkdownsRatio = (a, b) => {
    return parseInt(b.TkdownsRatio) - parseInt(a.TkdownsRatio);
}