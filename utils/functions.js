export const compareJsonNumberFights = (a, b) => {
    return b.NumberFights - a.NumberFights;
}

export const compareJsonWins = (a, b) => {
    return b.WinPercentage - a.WinPercentage;
}

export const getSeparateKoPercentage = (item) => {

    const indexSpace = item.indexOf(" ");

    if (indexSpace !== -1) {
        return item.substring(0, indexSpace); // Récupère les caractères avant le premier espace
    }
}

export const compareJsonKoWins = (a, b) => {
    return b.WinsKoTko - a.WinsKoTko;
}

export const compareJsonSubWins = (a, b) => {
    return b.SubWins - a.SubWins;
}