let blacklist: Set<string> = new Set()
// prettier-ignore
const tld = RegExp(`(${[".cf", ".ga", ".gq", ".ml", ".nl", ".nz", ".tk", ".icu", ".online", ".click"].map((tld) => `\\${tld}`).join("|")})$`, "i")

export function isBlacklisted(url: string) {
    if (tld.test(url)) return true
    if (blacklist.has(url)) return true
    return false
}

fetch("https://big.oisd.nl/domainswild2")
    .then((buffer) => buffer.text())
    .then((x) => {
        const list = x.split("\n")
        for (const element of list) {
            if (!element || element.startsWith("#")) continue
            blacklist.add(element.split("/")[0])
        }
    })

fetch("https://nsfw.oisd.nl/domainswild2")
    .then((buffer) => buffer.text())
    .then((x) => {
        const list = x.split("\n")
        for (const element of list) {
            if (!element || element.startsWith("#")) continue
            blacklist.add(element.split("/")[0])
        }
        console.log(blacklist)
    })
