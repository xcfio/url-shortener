let blacklist: Set<string> = new Set()
// prettier-ignore
const tld = RegExp(`(${[".cf", ".ga", ".gq", ".ml", ".nl", ".nz", ".tk", ".icu", ".online", ".click"].map((tld) => `\\${tld}`).join("|")})$`, "i")

export async function isBlacklisted(url: string) {
    if (!blacklist.size) {
        const big = await fetch("https://big.oisd.nl/domainswild2")
        const nsfw = await fetch("https://nsfw.oisd.nl/domainswild2")

        const bigText = await big.text()
        const nsfwText = await nsfw.text()

        const bigList = bigText.split("\n")
        const nsfwList = nsfwText.split("\n")

        for (const element of bigList) {
            if (!element || element.startsWith("#")) continue
            blacklist.add(element.split("/")[0])
        }
        for (const element of nsfwList) {
            if (!element || element.startsWith("#")) continue
            blacklist.add(element.split("/")[0])
        }
    }
    if (tld.test(url)) return true
    if (blacklist.has(url)) return true
    return false
}
