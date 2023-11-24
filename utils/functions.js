export const compareJsonNumberFights = (a, b) => {
    return b.NumberFights - a.NumberFights;
}

export const compareJsonWins = (a, b) => {
    return parseInt(b.WinPercentage) - parseInt(a.WinPercentage);
}

export const getSeparatePercentage = (item) => {

    if (item === null) {
        return null;
    }

    const indexP = item.indexOf("%");

    if (indexP) {
        return item.substring(0, indexP); // Récupère les caractères avant le premier espace
    } else {
        return item;
    }
}

export const compareJsonKoWins = (a, b) => {
    return b.KoTkoPercentage - a.KoTkoPercentage;
}

export const compareJsonSubWins = (a, b) => {
    return parseInt(b.SubWinsPercentage) - parseInt(a.SubWinsPercentage);
}

export const compareJsonStriking = (a, b) => {
    return parseInt(getSeparatePercentage(b.StrikingAcc)) - parseInt(getSeparatePercentage(a.StrikingAcc));
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

export const duplicateFilter = (tab, id, name) => {
    const uniqueIds = [];
    const uniqueNames = [];
    const uniqueObjects = [];

    tab.forEach(obj => {

        const idValue = obj[id];
        const nameValue = obj[name];

        if (!uniqueIds.includes(idValue)) {

            uniqueIds.push(idValue);

            if (!uniqueNames.includes(nameValue)) {
                uniqueObjects.push(obj);
            }
        }
    });

    return uniqueObjects;
} 